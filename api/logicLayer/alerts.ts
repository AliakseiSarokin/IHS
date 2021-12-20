import {HttpMethods} from "../../utils/httpMethods";
import {endpoints} from "../testData/endpointList";
import {requestBody} from "../testData/bodyList";
import {IUserLogin} from "../testData/global";
import {allureStep} from "../../helper/allure/allureSteps";

export class Alerts {

    public static async getAlertsList (user:IUserLogin): Promise<any> {
        let alertsList: any;
        await allureStep(`[API] Get Alerts list for ${JSON.stringify(user)}`, async() =>{
            alertsList = (await HttpMethods.post(user, endpoints.alerts.alerts, requestBody.alerts.alerts)).body;
        });
        return alertsList;
    };

    public static async returnAlertByKeyValue (user:IUserLogin, key:string, value: any): Promise<any> {
        let filterAlerts: any;
        await allureStep(`[API] Get Alerts by "${key}" and "${value} for ${JSON.stringify(user)}"`, async() =>{
            const alertsList:any = await this.getAlertsList(user);
            filterAlerts = await alertsList.filter((index)=>{
                return index[key] === value;
            });
        });
        return filterAlerts;
    };

    public static async getAllAlertsListByDays (user:IUserLogin, days: number): Promise<any> {
        let alertsList: any;
        await allureStep(`[API] Get Alerts list for ${JSON.stringify(user)}`, async() =>{
            alertsList = (await HttpMethods.post(user, endpoints.alerts.all.all, requestBody.alerts.all.allByDays(days))).body;
        });
        return alertsList;
    };
}
