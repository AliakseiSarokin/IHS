import {user} from "../../testData/global";
import {Boms} from "../../logicLayer/boms";
import {IResponse} from "../../../utils/httpMethods";
import {requestBody} from "../../testData/bodyList";
import {endpoints} from "../../testData/endpointList";
import {PartsSearch} from "../../logicLayer/search/partsSearch";
import {Random} from "../../../utils/random";
const random: Random = new Random();

describe('{API] boms/{id}/details endpoint PUT', () => {

    it("should add a part to BOM", async () => {
        //prepare test data
        const partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        const bomsList:any = await Boms.getBomsList(user.userAdmin);
        //small bom
        const smallBomsList: any = bomsList.filter(item => item.BM_NUM_OF_ROWS<10);
        const updateBomId: number = smallBomsList[0].id;
        const initialBom: IResponse = await Boms.getBomDetailsById(user.userAdmin, updateBomId);
        const initialNumberOfParts: number = initialBom.body.length;
        //add part to BOM
        const ipn:string = random.randomTextGenerator(5);
        const mfr:string = random.randomTextGenerator(5);
        const addAPartToBom: IResponse = await Boms.addPartsToBom(user.userAdmin, updateBomId,
            requestBody.boms.bomIdDetails.addSingleStatic(ipn, mfr));
        await expect(addAPartToBom.status).toEqual(200, 'verify status code');
       //verify if part was added
        const updatedBom: IResponse = await Boms.getBomDetailsById(user.userAdmin, updateBomId);
        await expect(updatedBom.body.length).toEqual(initialNumberOfParts+1);
        //delete part
        const addedPartIPN:number = updatedBom.body.findIndex(item => item.BM_IPN == ipn);
        const deletePart: IResponse = await Boms.deletePartInBom(user.userAdmin, updateBomId,
            requestBody.boms.bomIdDetails.deleteParts([updatedBom.body[addedPartIPN].OBJ_ID-1]));
        await expect(deletePart.status).toEqual(200, 'verify status code');
        await expect(deletePart.body).toEqual({});

    });

    it("should be an error when you try to add a part to non existed BOM", async () => {
        const nonExistedID: number = 99999999;
        const ipn:string = random.randomTextGenerator(5);
        const mfr:string = random.randomTextGenerator(5);
        const addAPartToBom: IResponse = await Boms.addPartsToBom(user.userAdmin, nonExistedID,
            requestBody.boms.bomIdDetails.addSingleStatic(ipn, mfr));
        await expect(addAPartToBom.status).toEqual(404, 'verify status code');
        await expect(addAPartToBom.body).toEqual(({ errorMessage: `Could not find item: ${nonExistedID}`}));
    });

    it("should be an error when you try to add a part with empty body", async () => {
        const bomsList:any = await Boms.getBomsList(user.userAdmin);
        const smallBomsList: any = bomsList.filter(item => item.BM_NUM_OF_ROWS<10);
        const updateBomId: number = smallBomsList[0].id;
        const addAPartToBom: IResponse = await Boms.addPartsToBom(user.userAdmin, updateBomId,
            {});
        await expect(addAPartToBom.status).toEqual(500, 'verify status code');
        await expect(addAPartToBom.body).toEqual(({ errorMessage: 'Value for Imported Mfr P/N is mandatory' }))
    });


    it("should not add parts to BOM for read only user", async () => {
        const bomsList:any = await Boms.getBomsList(user.readonly);
        const updateBomId: number = bomsList[0].id;
        const ipn:string = random.randomTextGenerator(5);
        const mfr:string = random.randomTextGenerator(5);
        const addAPartToBom: IResponse = await Boms.addPartsToBom(user.readonly, updateBomId,
            requestBody.boms.bomIdDetails.addSingleStatic(ipn, mfr));
        await expect(addAPartToBom.status).toEqual(401, 'verify status code');
        await expect(addAPartToBom.body)
            .toEqual({ errorMessage: 'You do not have adequate permissions to add the part.', returnUrl: 'https://loginsqa.ihserc.com/login/erc' });
    });

    it("should not add parts to BOM for user that is not owned a BOM", async () => {
        const bomsList:any = await Boms.getBomsList(user.regural);
        const adminBoms: any = bomsList.filter(item => item.S_USR_NAME === user.groupAdmin.username);
        const bomId: number = adminBoms[0].id;
        const ipn:string = random.randomTextGenerator(5);
        const mfr:string = random.randomTextGenerator(5);
        const addAPartToBom: IResponse = await Boms.addPartsToBom(user.regural, bomId,
            requestBody.boms.bomIdDetails.addSingleStatic(ipn, mfr));
        await expect(addAPartToBom.status).toEqual(401, 'verify status code');
        await expect(addAPartToBom.body)
            .toEqual({ errorMessage: 'You do not have adequate permissions to add the part.', returnUrl: 'https://loginsqa.ihserc.com/login/erc' });
    });

    it("should not be option to add parts to bom that restricted user is not owned", async () => {
        const bomsList:any = await Boms.getBomsList(user.userAdmin);
        const nonRestictedBoms: any = bomsList.filter(item => item.BM_NHA !== user.restricted.username
            && !item.BM_NHA.includes('b4testrestricted'));
        const bomId: number = nonRestictedBoms[0].id;
        const ipn:string = random.randomTextGenerator(5);
        const mfr:string = random.randomTextGenerator(5);
        const addAPartToBom: IResponse = await Boms.addPartsToBom(user.restricted, bomId,
            requestBody.boms.bomIdDetails.addSingleStatic(ipn, mfr));
        await expect(addAPartToBom.status).toEqual(401, 'verify status code');
        await expect(addAPartToBom.body)
            .toEqual({ errorMessage: 'You do not have adequate permissions to add the part.', returnUrl: 'https://loginsqa.ihserc.com/login/erc' });
    });
});