import {user} from "../../testData/global";
import {Boms} from "../../logicLayer/boms";
import {IResponse} from "../../../utils/httpMethods";
import {requestBody} from "../../testData/bodyList";


describe('{API] boms/{id}/details endpoint DELETE', () => {

    it("should be an error when you try to delete non-existed part", async () => {
        const nonExistedID: number = 99999999;
        const bomsList:any = await Boms.getBomsList(user.userAdmin);
        const smallBomsList: any = bomsList.filter(item => item.BM_NUM_OF_ROWS<10);
        const updateBomId: number = smallBomsList[0].id;
        const deletePart: IResponse = await Boms.deletePartInBom(user.userAdmin, updateBomId,
            requestBody.boms.bomIdDetails.deleteParts([nonExistedID]));
        await expect(deletePart.status).toEqual(404, 'verify status code');
        await expect(deletePart.body).toEqual(({ errorMessage: `Could not find part ID: ${nonExistedID} in BOM: ${updateBomId}` }))
    });

    it("should be an error when you try to delete part in non existed bom", async () => {
        const nonExistedID: number = 99999999;
        const bomsList:any = await Boms.getBomsList(user.userAdmin);
        const smallBomsList: any = bomsList.filter(item => item.BM_NUM_OF_ROWS<10);
        const updateBomId: number = smallBomsList[0].id;
        const deletePart: IResponse = await Boms.deletePartInBom(user.userAdmin, nonExistedID,
            requestBody.boms.bomIdDetails.deleteParts([nonExistedID]));
        await expect(deletePart.status).toEqual(404, 'verify status code');
        await expect(deletePart.body).toEqual(({ errorMessage: `Could not find item: ${nonExistedID}` }))
    });

    it("should not be option to delete parts for read only user", async () => {
        const bomsList:any = await Boms.getBomsList(user.readonly);
        const bomId: number = bomsList[0].id;
        const initialBom: IResponse = await Boms.getBomDetailsById(user.readonly, bomId);

        const deletePart: IResponse = await Boms.deletePartInBom(user.readonly, bomId,
            requestBody.boms.bomIdDetails.deleteParts([initialBom.body[0].id]));
        await expect(deletePart.status).toEqual(401, 'verify status code');
        await expect(deletePart.body).toEqual({ errorMessage: 'You do not have adequate permissions to delete the part',
            returnUrl: 'https://loginsqa.ihserc.com/login/erc' })
    });

    it("should not be option to delete parts from bom that user is not owned", async () => {
        const bomsList:any = await Boms.getBomsList(user.regural);
        const adminBoms: any = bomsList.filter(item => item.S_USR_NAME === user.groupAdmin.username);
        const bomId: number = adminBoms[0].id;
        const initialBom: IResponse = await Boms.getBomDetailsById(user.regural, bomId);

        const deletePart: IResponse = await Boms.deletePartInBom(user.regural, bomId,
            requestBody.boms.bomIdDetails.deleteParts([initialBom.body[0].id]));
        await expect(deletePart.status).toEqual(401, 'verify status code');
        await expect(deletePart.body).toEqual({ errorMessage: 'You do not have adequate permissions to delete the part',
            returnUrl: 'https://loginsqa.ihserc.com/login/erc' })
    });


    it("should not be option to delete parts from bom that restricted user is not owned", async () => {
        const bomsList:any = await Boms.getBomsList(user.userAdmin);
        const nonRestictedBoms: any = bomsList.filter(item => item.BM_NHA !== user.restricted.username
            && !item.BM_NHA.includes('b4testrestricted'));
        const bomId: number = nonRestictedBoms[0].id;
        const initialBom: IResponse = await Boms.getBomDetailsById(user.userAdmin, bomId);
        const deletePart: IResponse = await Boms.deletePartInBom(user.restricted, bomId,
            requestBody.boms.bomIdDetails.deleteParts([initialBom.body[0].id]));
        await expect(deletePart.status).toEqual(401, 'verify status code');
        await expect(deletePart.body).toEqual({ errorMessage: 'You do not have adequate permissions to delete the part',
            returnUrl: 'https://loginsqa.ihserc.com/login/erc' })
    });




});