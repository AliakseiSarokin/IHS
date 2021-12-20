import {requestBody} from "../../testData/bodyList";
import {endpoints} from "../../testData/endpointList";
import {HttpMethods} from "../../../utils/httpMethods";
import {allureStep} from "../../../helper/allure/allureSteps";
import {IUserLogin} from "../../testData/global";

export class Documents {

    public static async getSearchDefaultPartsListByQuery (user:IUserLogin, query:string): Promise<any> {
        let docSearch: any;
        await allureStep(`[API] Perform default Documents search for ${JSON.stringify(user)} with query: ${query}`, async() =>{
            docSearch = (await HttpMethods.post(user, endpoints.search.documents.documents,
                requestBody.search.documents.defaultSearchByQuery(query))).body;
        });
        return docSearch;
    };

    public static async getViewRelatedPartsListById (user:IUserLogin, id:string): Promise<any> {
        let viewRelatedParts: any;
        await allureStep(`[API] Get View Related Parts List ${JSON.stringify(user)} with part id: ${id}`, async() =>{
            viewRelatedParts = (await HttpMethods.post(user, endpoints.search.documents.viewRelatedPartsById(id),
                requestBody.search.documents.viewRelatedParts)).body;
        });
        return viewRelatedParts;
    };
}