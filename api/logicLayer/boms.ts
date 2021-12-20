import {HttpMethods, IResponse} from "../../utils/httpMethods";
import {endpoints} from "../testData/endpointList";
import {requestBody} from "../testData/bodyList";
import {IUserLogin} from "../testData/global";
import {allureStep} from "../../helper/allure/allureSteps";

export class Boms {

   public static async getBomsList (user:IUserLogin): Promise<any> {
       let bomList;
       await allureStep(`[APi] Get Bom list for ${JSON.stringify(user)}`, async () => {
           bomList = (await HttpMethods.post(user, endpoints.boms.boms, requestBody.boms.boms)).body;
           bomList = bomList.filter(item => item.BM_TYPE !== 'F')
       });
        return bomList
    };

    public static async getBomsListSortedAsk (user:IUserLogin): Promise<any> {
        let bomListSortedAsk;
        await allureStep(`[APi] Get Bom list with ASK sorting for ${JSON.stringify(user)}`, async () => {
            bomListSortedAsk = (await HttpMethods.post(user, endpoints.boms.boms, requestBody.boms.bomsSortedAsk)).body;
        });
        return bomListSortedAsk;
    };

    public static async getBomsListSortedDesc (user:IUserLogin): Promise<any> {
        let bomListSortedDesk;
        await allureStep(`[APi] Get Bom list with Desc sorting for ${JSON.stringify(user)}`, async () => {
            bomListSortedDesk = (await HttpMethods.post(user, endpoints.boms.boms, requestBody.boms.bomsSortedDesc)).body;
        });
        return bomListSortedDesk;
    };

    public static async returnSingleBomByKeyValue (user:IUserLogin, key:string, value: any):Promise<any> {
        let filteredBomList: any;
        await allureStep(`[APi] Get Bom list with sorting by "${key}" and "${value} for ${JSON.stringify(user)}"`, async () => {
            const bomList:any = await this.getBomsList(user);
            filteredBomList = await bomList.filter((index)=>{
                return index[key] === value;
            });
        });
        return filteredBomList;
    };

    public static async getBomById(user:IUserLogin, id:string): Promise<IResponse>{
        let bom:IResponse;
        await allureStep(`[APi] Get Bom for ${JSON.stringify(user)}`, async () => {
            bom = (await HttpMethods.get(user, endpoints.boms.bomById(id)));
        });
        return bom
    }

    public static async getBomByIdPostMethod(user:IUserLogin, id:string): Promise<IResponse>{
        let bom:IResponse;
        await allureStep(`[APi] Get Bom by ${id} ${JSON.stringify(user)} with `, async () => {
            bom = (await HttpMethods.post(user, endpoints.boms.bomById(id),{}));
        });
        return bom
   }

    public static async updateBomById(user:IUserLogin, id:string, updateData:any): Promise<IResponse>{
        let bom:IResponse;
        await allureStep(`[APi] Update Bom by ${id} ${JSON.stringify(user)} with `, async () => {
            bom = (await HttpMethods.put(user, endpoints.boms.bomById(id),updateData));
        });
        return bom
    };

    public static async getBomChildrenById(user:IUserLogin, id:string): Promise<IResponse>{
        let bomChildren:IResponse;
        await allureStep(`[APi] Get Children Bom list by ${id} ${JSON.stringify(user)}`, async () => {
            bomChildren = (await HttpMethods.get(user, endpoints.boms.bomChildrenById(id)));
        });
        return bomChildren
    }

    public static async getBomChildrenByIdWIthPostMethod(user:IUserLogin, id:string): Promise<IResponse>{
        let bomChildren:IResponse;
        await allureStep(`[APi] Get Children Bom list by ${id} for ${JSON.stringify(user)}`, async () => {
            bomChildren = (await HttpMethods.post(user, endpoints.boms.bomChildrenById(id),{}));
        });
        return bomChildren
    };

    public static async getBomRoot(user:IUserLogin): Promise<IResponse>{
        let bomRoot: IResponse;
        await allureStep(`[APi] Get Boms root`, async () => {
            bomRoot = (await HttpMethods.get(user, endpoints.boms.boomsRoot));
        });
        return bomRoot
    };

    public static async getBomRootWithPost(user:IUserLogin): Promise<IResponse>{
        let bomRoot: IResponse;
        await allureStep(`[APi] Get Boms root`, async () => {
            bomRoot = (await HttpMethods.post(user, endpoints.boms.boomsRoot,{}) );
        });
        return bomRoot
    };

    public static async getBomRootChildren(user:IUserLogin): Promise<any>{
        let listOfRootChildrens: any;
        await allureStep(`[APi] Get Boms root children`, async () => {
            const bomsRoot:any = await Boms.getBomRoot(user);
            listOfRootChildrens = await Boms.getBomChildrenById(user, bomsRoot.body.id);
        });
        return listOfRootChildrens
    };

    public static async getBomRootFolders(user:IUserLogin): Promise<any>{
        let listOfRootFolders;
        await allureStep(`[APi] Get Boms root folders`, async () => {
            const bomsRoot:any = await Boms.getBomRoot(user);
            const bomRootChildren: any = await Boms.getBomChildrenById(user, bomsRoot.body.id);
            listOfRootFolders = bomRootChildren.body.filter(item => item.BM_TYPE === 'F')
        });
        return listOfRootFolders
    };

    public static async moveFolderByIds(user:IUserLogin, folderId: number, movedFolderId: number[]): Promise<IResponse>{
        let movedFolder: IResponse;
        await allureStep(`[APi] Move folder ${folderId} to another folder ${movedFolderId}`, async () => {
            movedFolder = (await HttpMethods.put(user, endpoints.boms.bomChildrenById(folderId.toString()), {OBJ_ID: movedFolderId}));
        });
        return movedFolder
    };

    public static async getBomDetailsById(user:IUserLogin, id: number): Promise<IResponse>{
        let movedFolder: IResponse;
        await allureStep(`[APi] Get BOM details with id ${id}`, async () => {
            movedFolder = await HttpMethods.get(user, endpoints.boms.bomDetailsById(id.toString()));
        });
        return movedFolder
    };

    public static async getBomDetailsByIdWithPost(user:IUserLogin, id: number, requestBody: any): Promise<IResponse>{
        let movedFolder: IResponse;
        await allureStep(`[APi] Get BOM details with id ${id}`, async () => {
            movedFolder = await HttpMethods.post(user, endpoints.boms.bomDetailsById(id.toString()), requestBody);
        });
        return movedFolder
    };

    public static async addPartsToBom(user:IUserLogin, id: number, requestBody: any): Promise<IResponse>{
        let movedFolder: IResponse;
        await allureStep(`[APi] Add parts to BOM with id ${id}`, async () => {
            movedFolder = await HttpMethods.put(user, endpoints.boms.bomDetailsById(id.toString()), requestBody);
        });
        return movedFolder
    };

    public static async deletePartInBom(user:IUserLogin, id: number, requestBody: any): Promise<IResponse>{
        let deletePart: IResponse;
        await allureStep(`[APi] Delete part ${JSON.stringify(requestBody)} from  BOM with id ${id}`, async () => {
            deletePart = await HttpMethods.delete(user, endpoints.boms.bomDetailsById(id.toString()), requestBody);
        });
        return deletePart
    };

    public static async getVaultSummary(user:IUserLogin): Promise<IResponse>{
        let movedFolder: IResponse;
        await allureStep(`[APi] Get Vault summary`, async () => {
            movedFolder = await HttpMethods.get(user, endpoints.boms.vaultSummary);
        });
        return movedFolder
    };

    public static async getVaultSummaryWithPost(user:IUserLogin): Promise<IResponse>{
        let movedFolder: IResponse;
        await allureStep(`[APi] Get Vault summary`, async () => {
            movedFolder = await HttpMethods.post(user, endpoints.boms.vaultSummary, {});
        });
        return movedFolder
    };

}
