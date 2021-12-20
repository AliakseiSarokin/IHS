import {user} from "../../testData/global";
import {getDataFromBoms} from "../../models/boms/boms";
import {Boms} from "../../logicLayer/boms";

describe('{API] boms/{id} endpoint POST', () => {

    it("should show BOM by id", async () => {
        const boms = await Boms.getBomsList(user.userAdmin);
        await getDataFromBoms(boms);
        const existedBom: any = await Boms.getBomByIdPostMethod(user.userAdmin, boms[0].id);
        await expect(existedBom.status).toEqual(200);
        await expect(existedBom.body.id).toEqual(boms[0].id);
    });

    it("should be an error for non existed bom id", async () => {
        const nonExistedID: string = '00000000';
        const nonExitedBomById:any = await Boms.getBomByIdPostMethod(user.userAdmin,nonExistedID);
        await expect(nonExitedBomById.status).toEqual(404);
        await expect(nonExitedBomById.body).toEqual({ errorMessage: `Could not find item: ${nonExistedID}` });

    });

    it("should be an error for non valid bom id", async () => {
        const notValidID: string = 'sdfsdfds';
        const nonExitedBomById:any = await Boms.getBomByIdPostMethod(user.userAdmin,notValidID);
        await expect(nonExitedBomById.status).toEqual(500);
        await expect(nonExitedBomById.body).toEqual({ errorMessage: `Value not a number for Object ID : ${notValidID}` });

    });
});