import {browser} from "protractor";
import {envs, IUserLogin} from "../api/testData/global";
import {allureStep} from "../helper/allure/allureSteps";
import * as  fs from "fs";
import * as  unirest from "unirest";
import {decode} from "punycode";
const regexp = /filename=\"(.*)\"/gi;
export interface IResponse {
    status: number,
    headers: any,
    body: any
}

export interface IResponseJustBody {
    body: any
}

export class HttpMethods {

    public static async getCookie(user: IUserLogin) {
        return new Promise(async (resolve,reject) =>{
            await unirest.post(envs.apiBaseUrl + 'login')
                .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
                .send(user)
                .end( async (response) => {
                    const jsessionid:string = response.headers["set-cookie"][0].split(';')[0].split('=')[1];
                    await resolve (jsessionid)
                });
        })
    };

    public static async getAuthToken(user: IUserLogin) {
        return new Promise(async (resolve,reject) =>{
            await unirest.post(envs.apiBaseUrl + 'login')
                .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
                .send(user)
                .end( async (response) => {
                    const authToken:string = response.headers.authorization;
                    await resolve (authToken)
                });
        })
    };

    public static async get(user: IUserLogin, endpoint:string): Promise<any> {
        let response: any;
        await allureStep(`[API] Send GET to endpoint: "${endpoint}", for user: ${JSON.stringify(user)}`, async() => {
            const authToken  = await this.getAuthToken(user);
            response = new Promise(async (resolve,reject) => {
                await unirest.get(envs.apiBaseUrl + endpoint)
                    .headers({'Accept': 'application/json', 'Content-Type': 'application/json',
                        'Authorization': authToken})
                    .send(user)
                    .end((response) => {
                        resolve ({
                            status: response.status,
                            headers: response.headers,
                            body:response.body
                        })
                    });
            });
        });
        return response
    };

    public static async post(user: IUserLogin, endpoint:string, data: any): Promise<any> {
        let response: any;
        await allureStep(`[API] Send POST to endpoint: "${endpoint}" with request body: ${JSON.stringify(data)}
         for user ${JSON.stringify(user)}`, async() => {
            // const cookie  = await this.getCookie(user);
            const authToken  = await this.getAuthToken(user);
            response = new Promise(async (resolve,reject) =>{
                await unirest.post(envs.apiBaseUrl + endpoint)
                    .headers({'Accept': 'application/json', 'Content-Type': 'application/json',
                        'Authorization': authToken})
                    .send(data)
                    .end((response) => {
                        resolve ({
                            status: response.status,
                            headers: response.headers,
                            body:response.body})
                    });
            });
        });
        return response
    };

    public static async postDownloadFile(user: IUserLogin, endpoint:string, data: any): Promise<any> {
        let response: any;
        await allureStep(`[API] Send POST to endpoint: "${endpoint}" with request body: ${JSON.stringify(data)}
         for user ${JSON.stringify(user)} and download a file`, async() => {
            const authToken  = await this.getAuthToken(user);
            await unirest.post(envs.apiBaseUrl + endpoint)
                .headers({'Accept': 'application/json', 'Content-Type': 'application/json',
                    'Authorization': authToken})
                .send(data)
                .end(async (response) => {
                    const fileNameHeader:string = (((response.headers['content-disposition']).split(';'))[1]).slice();
                    const fileName:string = fileNameHeader.slice(fileNameHeader.indexOf('=')+1);
                    await fs.writeFile('./' + fileName, response.body, "UTF-8", (err) => {
                        console.log(err)
                    });
                });
        });

    };

    public static async put(user: IUserLogin, endpoint:string, data: any): Promise<any> {
        let response: any;
        await allureStep(`[API] Send PUT to endpoint: "${endpoint}" with request body: ${JSON.stringify(data)}
         for user ${JSON.stringify(user)}`, async() => {
            const authToken  = await this.getAuthToken(user);
            response =  new Promise(async (resolve,reject) =>{
                await unirest.put(envs.apiBaseUrl + endpoint)
                    .headers({'Accept': 'application/json', 'Content-Type': 'application/json',
                        'Authorization': authToken})
                    .send(data)
                    .end((response) => {
                        resolve ({
                            status: response.status,
                            headers: response.headers,
                            body:response.body})
                    });
            });
        });
        return response
    }

    public static async delete(user: IUserLogin, endpoint:string, data: any): Promise<any> {
        let response: any;
        await allureStep(`[API] Send DELETE to endpoint: "${endpoint}", for user: ${JSON.stringify(user)}`, async() => {
            const authToken  = await this.getAuthToken(user);
            response =  new Promise(async (resolve,reject) =>{
                await unirest.delete(envs.apiBaseUrl + endpoint)
                    .headers({'Accept': 'application/json', 'Content-Type': 'application/json',
                        'Authorization': authToken})
                    .send(data)
                    .end((response) => {
                        resolve ({
                            status: response.status,
                            headers: response.headers,
                            body:response.body})
                    });
            });
        });
        return response
    }
}