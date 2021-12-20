import {Parametric} from "../../../logicLayer/search/parametric";
import {user} from "../../../testData/global";
import {StringArray} from "../../../../utils/stringArray";
import {DbQueryLogic} from "../../../dbQueryLogic";
import {dbQueryData} from "../../../../testData/sqlQueries";

describe(`[API] Parametric Search - /categories/root/children endpoint, GET method`, ()=>{

    it(`should get list of part types by commodity`, async ()=>{
        const commoditiesList:any = await Parametric.getCommoditiesList(user.userAdmin);
        const listOfCommIds: number[] = StringArray.getArrayByValueFromObjectList(commoditiesList.body, 'id');
        const listOfCommNames: number[] = StringArray.getArrayByValueFromObjectList(commoditiesList.body, 'name');
        for(let i: number = 0; i < listOfCommIds.length; i++) {
            let partTypeList:any = await Parametric.getPartTypeListByCommoditiesId(user.userAdmin, listOfCommIds[i]);
            let expectedPartTypesNames:string[] = StringArray.getArrayByValueFromObjectList(partTypeList.body, 'name');
            let partTypeByCommoditie:string[] =
                await DbQueryLogic.getPartTypesByCommodity(dbQueryData.parametric.selectPartTypesByCommodity(listOfCommNames[i]));
            await expect(commoditiesList.status).toEqual(200);
            await expect(partTypeByCommoditie.sort()).toEqual(expectedPartTypesNames.sort())
        }
    });

});
