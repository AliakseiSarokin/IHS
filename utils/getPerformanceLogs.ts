import {browser} from "protractor";
import {envs} from "../api/testData/global"

export class GetPerformanceLogs {

    public static async getAllData():Promise<any>{
        const logDate:any = await browser.manage().logs().get('performance');
        return logDate;
    }

    public static async getResponseData() {
        const logData: any = await this.getAllData();
        let resArr = [];
        return new Promise((resolve, reject) => {
            logData.forEach((logData) => {
                const message = JSON.parse(logData.message).message;
                if (message.method == 'Network.responseReceived') {
                    resArr.push(message);
                }
            });
            resolve(resArr)

        });
    };

    public static async getRequestData(): Promise<any> {
        const logData:any = await this.getAllData();
        let resArr = [];
        logData.forEach((logData) => {
            const message = JSON.parse(logData.message).message;
            if (message.method == 'Network.requestWillBeSent') {
                resArr.push(message);
            }
        });
        return resArr;
    }

    public static async getUrlData():Promise<any>{
        const logData:any = await this.getAllData();
        let resArr = [];
        return new Promise((resolve, reject) => {
            logData.forEach((item) => {
                const message = JSON.parse(item.message).message;
                if (message.method == 'Network.requestWillBeSent') {
                    resArr.push(message.params.request.url);
                }
            });
            resolve(resArr)
        });
    };

    public static async getUrlAmountInRequest(url: string, url1?:string):Promise<number> {
        const urlsArr: any = await GetPerformanceLogs.getUrlData();
        let count: number = 0;
        for (let i: number = 0; i < urlsArr.length; i++) {
            if (urlsArr[i] == envs.apiBaseUrl + url || urlsArr[i] == envs.apiBaseUrl + url1) {
                count = count + 1;
            }
        }
        return count;

    };
}