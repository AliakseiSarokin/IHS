import {allureStep} from "../../../helper/allure/allureSteps";
import {HttpMethods} from "../../../utils/httpMethods";
import {IUserLogin} from "../../testData/global";
import {endpoints} from "../../testData/endpointList";

export class SearchSetting {
    public static async getSearchSettings (user: IUserLogin) {
        let searchSettingList: any;
        await allureStep(`get search settings for ${user}`, async() =>{
            searchSettingList = (await HttpMethods.get(user, endpoints.settings.search)).body;
        });
        return searchSettingList;
    };

    public static async switchSearchSetting (user: IUserLogin, endpoint, data) {
        let searchSettingList;
        await allureStep(`change data in search settings for ${user}`, async() =>{
            searchSettingList = await HttpMethods.put(user, endpoint, data);
        });
        return searchSettingList;
    };
}