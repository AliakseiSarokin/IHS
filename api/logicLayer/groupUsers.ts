import {HttpMethods} from "../../utils/httpMethods";
import {endpoints} from "../testData/endpointList";
import {requestBody} from "../testData/bodyList";
import {IUserLogin} from "../testData/global";
import {allureStep} from "../../helper/allure/allureSteps";

export class GroupUsers {
    public static async getUsersList (user:IUserLogin): Promise<any> {
        let userList: any;
        await allureStep(`[API] Get User list for ${JSON.stringify(user)}`, async() =>{
            userList = (await HttpMethods.post(user, endpoints.users.users, requestBody.users.users)).body;
        });
        return userList;
    };

    public static async returnUserByKeyValue (user:IUserLogin, key:string, value: any): Promise<any> {
        let filteredUser: any;
        await allureStep(`[API] Get User by "${key}" and "${value} for ${JSON.stringify(user)}"`, async() =>{
            const userList:any = await this.getUsersList(user);
            filteredUser = await userList.filter((index)=>{
                return index[key] === value;
            });
        });
        return filteredUser;
    };
}