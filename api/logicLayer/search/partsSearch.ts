import {allureStep} from "../../../helper/allure/allureSteps";
import {HttpMethods} from "../../../utils/httpMethods";
import {IUserLogin} from "../../testData/global";

export class PartsSearch {
    public static async getPartsSearchResult(user:IUserLogin, endpoint: string, data: any) {
        let partSearchResults: any;
        await allureStep(`return part search response body`, async()=>{
           partSearchResults = (await HttpMethods.post(user, endpoint, data)).body;
        });
        return partSearchResults;
    }
}