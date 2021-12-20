import {user} from "../../testData/global";
import {bomsModel, getDataFromBoms} from "../../models/boms/boms";
import {Boms} from "../../logicLayer/boms";

describe('boms endpoint - post method', () => {

    it("check fields on data types", async () => {
        const boms = await Boms.getBomsList(user.userAdmin);
        await getDataFromBoms(boms);
        await expect(typeof (bomsModel.id[0])).toEqual('number');
        await expect(typeof (bomsModel.type[0])).toEqual('string');
        await expect(typeof (bomsModel.BM_HDR_REL_INFO[0])).toEqual('string');
        await expect(typeof (bomsModel.BM_BOM_NAME[0])).toEqual('string');
        await expect(typeof (bomsModel.BM_NUM_OF_ROWS[0])).toEqual('number');
        await expect(typeof (bomsModel.BM_USR_ID[0])).toEqual('string');
        await expect(typeof (bomsModel.S_USR_NAME[0])).toEqual('string');
        await expect(typeof (bomsModel.BM_STATUS[0])).toEqual('string');
        await expect(typeof (bomsModel.BM_MFR_EXCEPT[0])).toEqual('number');
        await expect(typeof (bomsModel.BM_PART_EXCEPT[0])).toEqual('number');
        await expect(typeof (bomsModel.BM_MOD_DATE[0])).toEqual('string');
        await expect(typeof (bomsModel.BM_FILENAME[0])).toEqual('string');
        // await expect(typeof (bomsModel.BM_DESC[0])).toEqual('string');
        await expect(typeof (bomsModel.BM_NHA[0])).toEqual('string');
        await expect(typeof (bomsModel.OBJ_ID[0])).toEqual('number');
        await expect(typeof (bomsModel.BM_TYPE[0])).toEqual('string');
        await expect(typeof (bomsModel.BM_CNT_ASMBLY[0])).toEqual('number');
        await expect(typeof (bomsModel.BM_GRP_ID[0])).toEqual('number');
    });

});