import {browser} from "protractor";
import {gridIconLinks, meganavItems} from "../../../../testData/global";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {ParametricSearchLogic} from "../../../../bussinesLayer/search/parametricSearchLogic";
import {searchElements} from "../../../../elements/elements";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();

// defect
describe('Parametric Search - Result Page - Reference Design icon', () => {

    beforeAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.maxElementWaitTime;
    });

    afterAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.defaultElementWaitTime;
    });

    it('result grid should displays parts only with Reference Design icon', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performExactParametricSearch(3, 1);
        await parametricSearchLogic.iconLinkChecking(gridIconLinks.search.parametric.titles[3]);
    })
});
