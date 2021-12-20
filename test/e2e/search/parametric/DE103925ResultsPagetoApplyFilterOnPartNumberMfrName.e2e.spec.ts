import {browser} from "protractor";
import {columnHeaders, meganavItems} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {ParametricSearchLogic} from "../../../../bussinesLayer/search/parametricSearchLogic";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {searchElements} from "../../../../elements/elements";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();
const searchLogic: SearchLogic = new SearchLogic();

//no actual in the new grid
xdescribe('Parametric Search - Result Page - apply filter on Part Number or Mfr Name', () => {

    beforeAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.maxElementWaitTime;
    });

    afterAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.defaultElementWaitTime;
    });

    it('should input all search criteria and sort result grid by Mfr Name column', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.selectCommodities(4);
        await parametricSearchLogic.selectPartTypes(6);
        await parametricSearchLogic.selectCategoriesDesiredByValue(1);
        await parametricSearchLogic.fillDesiredByValue('1000');
        await parametricSearchLogic.goToAttributes('Resistance (ohm)');
        await parametricSearchLogic.selectAttributeValue();
        await searchLogic.performSearch();
        await grid.newGridOpenFilterBoxByName(columnHeaders.search.parametric[6]);

        // await grid.filterColumnByValue(columnHeaders.search.parametric[6], 'A');
    })
});