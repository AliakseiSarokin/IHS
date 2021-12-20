import {browser} from "protractor";
import {commonSearch} from "../../../../../testData/search";
import {CplSearchLogic} from "../../../../../bussinesLayer/search/cplSearchLogic";
import {Login} from "../../../../../components/login";
import {meganavItems} from "../../../../../testData/global";
import {Meganav} from "../../../../../components/meganav";
import {searchElements} from "../../../../../elements/elements";
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";

const cplSearchLogic:CplSearchLogic = new CplSearchLogic();
const login: Login = new Login();
const meganav:Meganav = new Meganav();
const searchLogic: SearchLogic = new SearchLogic();

describe('Left Nav - CPL Search ', () => {

    it('should be left nav subitems - CPL Search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await searchLogic.perform5Searches(commonSearch.searchArray, 4, cplSearchLogic.performCplSearchWithRefine);
    });

    it('should be popover when hover on search - CPL Search', async () => {
        await searchLogic.toolTipChecking("CPL");
    });

    it('should go and change order by searches in the left nav - CPL Search', async () => {
        await searchLogic.goBySearchesInTheLeftNav(commonSearch.searchArray);
        // await login.logout();
    });

});