import {user} from "../../testData/global";
import {Boms} from "../../logicLayer/boms";
import {IResponse} from "../../../utils/httpMethods";
import {requestBody} from "../../testData/bodyList";

describe('{API] boms/{id}/details endpoint POST', () => {

    it("should show BOM children by id if existed", async () => {
        const boms = await Boms.getBomsList(user.userAdmin);
        const bomDetails: IResponse = await Boms.getBomDetailsByIdWithPost(user.userAdmin, boms[0].id, requestBody.boms.bomIdDetails.default);
        await expect(bomDetails.status).toEqual(200, 'verify status code');
        for(let i:number = 0; i<bomDetails.body.length; i++) {
            expect(bomDetails.body[i].BM_HDR_PTR).toEqual(boms[0].id.toString())
        }
    });

        it("should be an error for non existed bom id", async () => {
        const nonExistedID: number = 99999999;
        const bomDetailsNonExisted: IResponse = await Boms.getBomDetailsByIdWithPost(user.userAdmin, nonExistedID,
            requestBody.boms.bomIdDetails.default);
        await expect(bomDetailsNonExisted.status).toEqual(404);
        await expect(bomDetailsNonExisted.body).toEqual({ errorMessage: `Could not find BOM: ${nonExistedID}` });
    });
});