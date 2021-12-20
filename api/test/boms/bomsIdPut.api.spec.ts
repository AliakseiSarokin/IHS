import {user} from "../../testData/global";
import {getDataFromBoms} from "../../models/boms/boms";
import {Boms} from "../../logicLayer/boms";
import {Random} from "../../../utils/random";
const random: Random = new Random();

describe('{API] boms/{id} endpoint PUT', () => {

    it("should show BOM by id", async () => {
        const boms = await Boms.getBomsList(user.userAdmin);
        await getDataFromBoms(boms);
        const bomById: any = await Boms.getBomById(user.userAdmin, boms[0].id);
        const updatedObject: any = bomById.body;
        updatedObject.BM_DESC = random.randomTextGenerator(10);
        const updatedBom = await Boms.updateBomById(user.userAdmin, boms[0].id, updatedObject);
        updatedObject.BM_MOD_DATE = updatedBom.body.BM_MOD_DATE;
        await expect(updatedBom.body).toEqual(updatedObject);
       });

    it("should be an error for non existed bom id", async () => {
        const nonExistedID: string = '00000000';
        const boms = await Boms.getBomsList(user.userAdmin);
        await getDataFromBoms(boms);
        const bomById: any = await Boms.getBomById(user.userAdmin, boms[0].id);
        const updatedObject: any = bomById.body;
        updatedObject.BM_DESC = random.randomTextGenerator(10);
        const nonExitedBomById = await Boms.updateBomById(user.userAdmin, nonExistedID, updatedObject);
        await expect(nonExitedBomById.status).toEqual(404);
        await expect(nonExitedBomById.body).toEqual({ errorMessage: `Could not find item: ${nonExistedID}` });

    });

    it("should be an error for non valid bom id", async () => {
        const notValidID: string = 'sdfsdfds';
        const boms = await Boms.getBomsList(user.userAdmin);
        await getDataFromBoms(boms);
        const bomById: any = await Boms.getBomById(user.userAdmin, boms[0].id);
        const updatedObject: any = bomById.body;
        updatedObject.BM_DESC = random.randomTextGenerator(10);
        const nonExitedBomById = await Boms.updateBomById(user.userAdmin, notValidID, notValidID);
        await expect(nonExitedBomById.status).toEqual(500);
        //there is a defect, not handler for not valid type of BOM
        // await expect(nonExitedBomById.body).toEqual({ errorMessage: `Value not a number for Object ID : ${notValidID}` });
    });
});