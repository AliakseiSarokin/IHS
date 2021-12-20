import {dbConn} from "../testData/global";
import {OracleDbConnection} from "../utils/dbConnection";

export interface IDB {
    outBinds: any,
    rowsAffected: string,
    metaData: any[],
    rows: any[],
    resultSet: string
}

export class DbQueryLogic {

    static nullResult(data: any, qwery: string){
        if(data.length == 0 || data == null || data == undefined || Object.keys(data).length == 0){
            throw `Query results are empty:\n ${qwery}`
        }
    }

    public static async getPartTypesByCommodity(queryString: string, num:number = 0): Promise<any>  {
        const conn: IDB = <IDB>(await OracleDbConnection.returnValueFromDb(dbConn.BMDEVHAData, queryString));
        await this.nullResult(conn.rows, queryString);
        const rows: Array<string> = conn.rows;
        return rows.map(item => item.toString())
    };
}