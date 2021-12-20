import {HttpMethods} from "../../utils/httpMethods";
import {endpoints} from "../testData/endpointList";
import {requestBody} from "../testData/bodyList";
import {IWorkspacesPartsResponse} from "../models/workspaces/parts";
import {IWorkspacesBomsResponse} from "../models/workspaces/boms";
import {Boms} from "./boms";

export class WorkspaceBoms {

    public static async addBomToWorkspace (user, bomId) {
        return (await HttpMethods.put(user, endpoints.workspaces.workspacesBoms, bomId));
    };

    public static async addPartToWorkspace (user, partId) {
        return (await HttpMethods.put(user, endpoints.workspaces.workspacesParts, partId));
    };

    public static async deleteWorkspaceBom (user, deletedObjIdBody) {
        return (await HttpMethods.delete(user, endpoints.workspaces.workspacesBoms, deletedObjIdBody));
    };

    public static async editWorkspaceBomComment (user, bomId, comment) {
        return (await HttpMethods.put(user, bomId, comment));
    };

    public static async getWorkspaceBomList (user): Promise<IWorkspacesBomsResponse[]> {
        return (await HttpMethods.post(user, endpoints.workspaces.workspacesBoms, requestBody.boms.boms)).body;
    };

    public static async getWorkspacePartsList (user): Promise<IWorkspacesPartsResponse[]> {
        return (await HttpMethods.post(user, endpoints.workspaces.workspacesParts, requestBody.parts.parts)).body;
    };


    public static async addABomToWorkspaceIfNotAdded(user){
        const bomssList:IWorkspacesBomsResponse[] = await this.getWorkspaceBomList(user);
        if(bomssList.length <= 0) {
            const boms = await Boms.getBomsList(user);
            await this.addBomToWorkspace(user, requestBody.workspaces.boms(boms[0].id))

        }
    }

    public static async addAPartToWorkspaceIfNotAdded(user){
        const partsList:IWorkspacesPartsResponse[] = await this.getWorkspacePartsList(user);
        if(partsList.length <= 0) {
            await this.addPartToWorkspace(user, requestBody.workspaces.parts(1542424196))

        }
    }
}