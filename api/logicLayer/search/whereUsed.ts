import {requestBody} from "../../testData/bodyList";
import {endpoints} from "../../testData/endpointList";
import {HttpMethods} from "../../../utils/httpMethods";
import {allureStep} from "../../../helper/allure/allureSteps";
import {IUserLogin} from "../../testData/global";

export class WhereUsed {

    public static async getSearchPartsListBySingleFiledOperatorAndValue (user:IUserLogin, field:string, operator:string, value:string): Promise<any> {
        let whereUsedSearch: any;
        await allureStep(`[API] Perform Where Used search for ${JSON.stringify(user)} with option: ${field}, ${operator}, ${value}`, async() =>{
            whereUsedSearch = (await HttpMethods.post(user, endpoints.search.whereUsed.whereUsed,
                requestBody.search.whereUsed.whereUsedByFieldOperatorAndValue(field, operator, value))).body;
        });
        return whereUsedSearch;
    };
}