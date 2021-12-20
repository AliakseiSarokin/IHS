import {user} from "../../testData/global";
import {Boms} from "../../logicLayer/boms";

describe('{API] boms/{id}/children endpoint GET', () => {

    it("should show BOM children by id if existed", async () => {
        const boms = await Boms.getBomsList(user.userAdmin);
        const assemblyBoms:any = boms.filter(item => item.BM_CNT_ASMBLY >= 1);
        const bomChildren: any = await Boms.getBomChildrenById(user.userAdmin, assemblyBoms[0].id);
        await expect(bomChildren.status).toEqual(200);
        await expect(bomChildren.body.length).toBeGreaterThan(0);
    });

    it("should show only folders", async () => {
        const bomsRoot:any = await Boms.getBomRootFolders(user.userAdmin);
        await expect(bomsRoot).toBeGreaterThan(0);
    });

    it("should be an error for non existed bom id", async () => {
        const nonExistedID: string = '00000000';
        const bomChildrenNonExisted: any = await Boms.getBomChildrenById(user.userAdmin, nonExistedID);
        await expect(bomChildrenNonExisted.status).toEqual(404);
        await expect(bomChildrenNonExisted.body).toEqual({ errorMessage: `Could not find item: ${nonExistedID}` });
    });

    it("should be an error for non valid bom id", async () => {
        const notValidID: string = 'sdfsdfds';
        const bomChildrenNonExisted: any = await Boms.getBomChildrenById(user.userAdmin, notValidID);
        await expect(bomChildrenNonExisted.status).toEqual(500);
        await expect(bomChildrenNonExisted.body).toEqual({ errorMessage: `Value not a number for Parent ID : ${notValidID}` });
    });
});