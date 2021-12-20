import {allureStep} from "../../../helper/allure/allureSteps";
import {HttpMethods} from "../../../utils/httpMethods";
import {endpoints} from "../../testData/endpointList";
import {IUserLogin} from "../../testData/global";

export class Parametric {

    public static async getCategoriesList(user:IUserLogin, query:string): Promise<any> {
        let categoriesList: any;
        await allureStep(`Get list of categories`, async () => {
            categoriesList = await HttpMethods.get(user, endpoints.search.parametric.categories(query))
        });
        return categoriesList
    };

    public static async getCommoditiesList(user:IUserLogin): Promise<any> {
        let commoditiesList: any;
        await allureStep(`Get list of commodities`, async () => {
            commoditiesList = await HttpMethods.get(user, endpoints.search.parametric.categoriesRootChildren)
        });
        return commoditiesList
    };

    public static async getPartTypeListByCommoditiesId(user:IUserLogin, commoditieId: number): Promise<any> {
        let partTypeList: any;
        await allureStep(`Get part type list by commoditie id`, async () => {
            partTypeList = await HttpMethods.get(user, endpoints.search.parametric.categoriesChildrenById(commoditieId))
        });
        return partTypeList
    }
}