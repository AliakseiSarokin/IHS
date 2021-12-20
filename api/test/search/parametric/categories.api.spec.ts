import {Parametric} from "../../../logicLayer/search/parametric";
import {user} from "../../../testData/global";

describe(`[API] Parametric Search - /categories endpoint, GET method`, ()=>{

    it(`should be error handler on sending empty query for /categories`, async ()=>{
       const categoriesList:any = await Parametric.getCategoriesList(user.userAdmin, '');
       await expect(categoriesList.body).toEqual({ errorMessage: 'Missing Category Search Value' })
    });

});
