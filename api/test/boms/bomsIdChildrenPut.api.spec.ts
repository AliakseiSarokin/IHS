import {user} from "../../testData/global";
import {Boms} from "../../logicLayer/boms";
import {StringArray} from "../../../utils/stringArray";

describe('{API] boms/{id}/children endpoint PUT - move folders', () => {

    it("should move one folder under another", async () => {
        //get IDs for moving folder
        const folders:any = await Boms.getBomRootFolders(user.userAdmin);
        const nonRestrictedFolders: any = folders.filter(item => item.S_USR_NAME !== 'b4testrestricted');
        const bomsRoot: number = (await Boms.getBomRoot(user.userAdmin)).body.id;
        const insertedFolderId:number = nonRestrictedFolders[0].id;
        const movedFolderId:number = nonRestrictedFolders[1].id;
        //move folder
        const moveFolderResponse:any = await Boms.moveFolderByIds(user.userAdmin,insertedFolderId, [movedFolderId]);
        await expect(moveFolderResponse.status).toEqual(200);
        const updatedFolderIdsList:any = StringArray.getArrayByValueFromObjectList((await Boms.getBomRootFolders(user.userAdmin)),
        'id');
        await expect(updatedFolderIdsList.includes(movedFolderId)).toEqual(false, 'verify if moved folder is not under Vault');
        const getInsertedFolderChildren: any = await await Boms.getBomChildrenById(user.userAdmin, insertedFolderId.toString());
        const getInsertedFolderChildrenIdsList: any  = StringArray.getArrayByValueFromObjectList(getInsertedFolderChildren.body,
            'id');
        await expect(getInsertedFolderChildrenIdsList.includes(movedFolderId)).toEqual(true, 'verify if moved folder is not under Inserted folder');
        //return folder to initial state
        const returnFolderUnderVault:any = await Boms.moveFolderByIds(user.userAdmin, bomsRoot, [movedFolderId]);
    });

    it("should not move restricted user folder", async () => {
        //get IDs for moving folder
        const folders:any = await Boms.getBomRootFolders(user.userAdmin);
        const restrictedFolders: any = folders.filter(item => item.S_USR_NAME === 'b4testrestricted');
        const nonRestrictedFolders: any = folders.filter(item => item.S_USR_NAME === 'b4testrestricted');
        const insertdFolderId:number = nonRestrictedFolders[0].id;
        const movedFolderId:number = restrictedFolders[0].id;
        //move folder
        const moveFolderResponse:any = await Boms.moveFolderByIds(user.userAdmin,insertdFolderId, [movedFolderId]);
        await expect(moveFolderResponse.status).toEqual(500);
        await expect(moveFolderResponse.body).toEqual({ errorMessage: 'Restricted User folder cannot be moved.' });
    });

    it("should not move Vault folder", async () => {
        //get IDs for moving folder
        const folders:any = await Boms.getBomRootFolders(user.userAdmin);
        const bomsRoot: number = (await Boms.getBomRoot(user.userAdmin)).body.id;
        const insertdFolderId:number = folders[0].id;
        //move folder
        const moveFolderResponse:any = await Boms.moveFolderByIds(user.userAdmin,insertdFolderId, [bomsRoot]);
        await expect(moveFolderResponse.status).toEqual(500);
        await expect(moveFolderResponse.body).toEqual({ errorMessage: 'Cannot move the Vault folder' });
    });

    it("should not move folder to non existed folder", async () => {
        //get IDs for moving folder
        const folders:any = await Boms.getBomRootFolders(user.userAdmin);
        const nonRestrictedFolders: any = folders.filter(item => item.S_USR_NAME === 'b4testrestricted');
        const movedFolderId:number = nonRestrictedFolders[0].id;
        const nonExistedFolder:number = 999999999;
        //move folder
        const moveFolderResponse:any = await Boms.moveFolderByIds(user.userAdmin, nonExistedFolder, [movedFolderId]);
        await expect(moveFolderResponse.status).toEqual(500);
        await expect(moveFolderResponse.body)
            .toEqual({ errorMessage: 'Requested destination node does not exist or not a folder. Please provide a valid folder Id.' });
    });

    it("should not move non existed folder id", async () => {
        //get IDs for moving folder
        const folders:any = await Boms.getBomRootFolders(user.userAdmin);
        const nonRestrictedFolders: any = folders.filter(item => item.S_USR_NAME === 'b4testrestricted');
        const insertedFolderId:number = nonRestrictedFolders[0].id;
        const nonExistedFolder:number = 999999999;
        //move folder
        const moveFolderResponse:any = await Boms.moveFolderByIds(user.userAdmin, insertedFolderId, [nonExistedFolder]);
        await expect(moveFolderResponse.status).toEqual(500);
        await expect(moveFolderResponse.body)
            .toEqual({ errorMessage: 'Invalid BOM Ids are found in the BOMs list. Please provide a valid BOM Ids.' });
    });

    it("should be error for empty object", async () => {
        //get IDs for moving folder
        const folders:any = await Boms.getBomRootFolders(user.userAdmin);
        const nonRestrictedFolders: any = folders.filter(item => item.S_USR_NAME === 'b4testrestricted');
        const insertedFolderId:number = nonRestrictedFolders[0].id;
        //move folder
        const moveFolderResponse:any = await Boms.moveFolderByIds(user.userAdmin, insertedFolderId, []);
        await expect(moveFolderResponse.status).toEqual(500);
        await expect(moveFolderResponse.body)
            .toEqual({ errorMessage: 'Missing list of BOM Ids.' });
    });
});

describe('{API] boms/{id}/children endpoint PUT - move boms', () => {

    it("should move one bom under any folder", async () => {
        //get IDs for moving boms
        const folders:any = await Boms.getBomRootFolders(user.userAdmin);
        const boms: any = await Boms.getBomsList(user.userAdmin);
        const bomsUnderVault: any = boms.filter(item => !item.BM_NHA.includes('>'));
        const bomsRoot: number = (await Boms.getBomRoot(user.userAdmin)).body.id;
        const insertedFolderId:number = folders[0].id;
        const movedBomId:number = bomsUnderVault[0].id;
        //move bom
        const moveFolderResponse:any = await Boms.moveFolderByIds(user.userAdmin,insertedFolderId, [movedBomId]);
        await expect(moveFolderResponse.status).toEqual(200);
        const updatedRootChildrenList:any = StringArray.getArrayByValueFromObjectList((await Boms.getBomRootChildren(user.userAdmin)).body,
            'id');
        await expect(updatedRootChildrenList.includes(movedBomId)).toEqual(false, 'verify if moved bom is not under Vault');
        const getInsertedFolderChildren: any = await await Boms.getBomChildrenById(user.userAdmin, insertedFolderId.toString());
        const getInsertedFolderChildrenIdsList: any  = StringArray.getArrayByValueFromObjectList(getInsertedFolderChildren.body,
            'id');
        await expect(getInsertedFolderChildrenIdsList.includes(movedBomId)).toEqual(true, 'verify if moved bom is not under Inserted folder');
        //return folder to initial state
        const returnFolderUnderVault:any = await Boms.moveFolderByIds(user.userAdmin, bomsRoot, [movedBomId]);
    });
});