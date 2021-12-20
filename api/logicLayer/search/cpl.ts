import {HttpMethods} from "../../../utils/httpMethods";
import {allureStep} from "../../../helper/allure/allureSteps";
import {endpoints} from "../../testData/endpointList";
import {requestBody} from "../../testData/bodyList";
import {IUserLogin} from "../../testData/global";

export class Cpl {
    public static async cplSearchByQuery (user:IUserLogin, query: string): Promise<any> {
        let cplSearch: any;
        await allureStep(`[API] Perform Where Used search for ${JSON.stringify(user)} with query: ${query}`, async() =>{
            cplSearch = (await HttpMethods.post(user, endpoints.search.cpl.cpl,
                requestBody.search.cpl.cplByQuery(query))).body;
        });
        return cplSearch;
    };
}