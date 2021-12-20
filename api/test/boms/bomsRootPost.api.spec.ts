import {user} from "../../testData/global";
import {Boms} from "../../logicLayer/boms";

describe('{API] boms/root endpoint POST', () => {

    it("should show BOM by id", async () => {
        const bomsRoot:any = await Boms.getBomRootWithPost(user.userAdmin);
        await expect(bomsRoot.status).toEqual(200);
        await expect(bomsRoot.body.BM_BOM_NAME).toEqual('Vault');
    });

});