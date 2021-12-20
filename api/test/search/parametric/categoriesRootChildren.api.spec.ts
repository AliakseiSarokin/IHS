import {Parametric} from "../../../logicLayer/search/parametric";
import {user} from "../../../testData/global";
import {StringArray} from "../../../../utils/stringArray";

describe(`[API] Parametric Search - /categories/root/children endpoint, GET method`, ()=>{

    it(`should get list of commodities`, async ()=>{
        const commoditiesList:any = await Parametric.getCommoditiesList(user.userAdmin);
        const listOfCommNames: string[] = StringArray.getArrayByValueFromObjectList(commoditiesList.body, 'name');
        await expect(commoditiesList.status).toEqual(200);
        await expect(listOfCommNames)
            .toEqual( [ 'Electromechanicals', 'Fasteners/Hardware', 'Interconnects', 'Miscellaneous', 'Passives', 'Semiconductors' ])
    });

});
