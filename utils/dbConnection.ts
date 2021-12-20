import {allureStep} from "../helper/allure/allureSteps";

const oracledb = require('oracledb');

export class OracleDbConnection {

    public  static async returnValueFromDb ({dbName, user, password, connectionString}, query: string): Promise<any> {
        let dbResult: any;
        await allureStep(`Select to '${dbName}' and the following query '${query}'`, async() => {
            dbResult =  new Promise(async (resolve, reject) => {
                let conn: any;
                try {
                    conn = await oracledb.getConnection({
                        user,
                        password,
                        connectString: connectionString
                    });
                    let result = await conn.execute(query);
                    resolve(result);

                } catch (err) {
                    reject(this.dbErrorText(err.message, dbName));
                } finally {
                    if (conn) {
                        try {
                            await conn.release();
                        } catch (e) {
                            await console.error(e + `\n data base: ${dbName}`);
                        }
                    }
                }
            });
        });
        return dbResult;

    };

    public  static async updateDb(user:string, password:string, connectionString: string, dbName:string, query: string, params:any): Promise<any> {
        let dbResult: any;
        await allureStep(`Update'${dbName}' and the following query  '${query}'`, async() => {
            dbResult = new Promise(async function(resolve, reject) {
                let conn: any;
                try {
                    conn = await oracledb.getConnection({
                        user: user,
                        password: password,
                        connectString: connectionString
                    });

                    let result: any = await conn.execute(
                        query,
                        params,
                        {autoCommit: true}
                    );
                    resolve(result);

                } catch (err) { // catches errors in getConnection and the query
                    reject(this.dbErrorText(err.message, dbName));
                } finally {
                    if (conn) {   // the conn assignment worked, must release
                        try {
                            await conn.release();
                        } catch (e) {
                            await console.error(e + `\n data base: ${dbName}`);
                        }
                    }
                }
            });
        });
        return dbResult;
    };

    public static dbErrorText(errorText: string, dbName:string):string{
        let errorTranslate: string;
        if (errorText.includes("ORA-00028")) {
            errorTranslate = `Your session has been killed \n error: ${errorText} \n data base: ${dbName}`;
        }else if(errorText.includes("ORA-00030")){
            errorTranslate = `A user session with the specified ID does not exist\n error: ${errorText} \n data base: ${dbName}`;
        }else if(errorText.includes("ORA-06512")){
            errorTranslate = `Session marked for destruction\n error: ${errorText} \n data base: ${dbName}`;
        }else {
            errorTranslate = `error while working with bd: ${errorText} \n data base: ${dbName}`;
        }
        return errorTranslate;
    }

}
