import {IUserLogin} from "../testData/global";
import {allureStep} from "../../helper/allure/allureSteps";
import {endpoints} from "../testData/endpointList";
import {HttpMethods} from "../../utils/httpMethods";
import {requestBody} from "../testData/bodyList";

export class Knowledgebase {

    public static async getMfrList(user: IUserLogin): Promise<any> {
        let mfrList: any;
        await allureStep(`[API] Get Mfr Knowldgebase List ${JSON.stringify(user)}`, async() =>{
            mfrList = (await HttpMethods.post(user, endpoints.knowledgebase.mfr, requestBody.knowledgebase.mfr)).body;
        });
        return mfrList;
    }

    public static async getPartsList(user: IUserLogin): Promise<any> {
        let partsList: any;
        await allureStep(`[API] Get Parts Knowldgebase List ${JSON.stringify(user)}`, async() =>{
            partsList = (await HttpMethods.post(user, endpoints.knowledgebase.parts, requestBody.knowledgebase.parts)).body;
        });
        return partsList;
    }
}