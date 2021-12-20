import {browser} from "protractor";
import {commonSearch} from "../../../../testData/search";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {meganavItems} from "../../../../testData/global";
import {searchElements} from "../../../../elements/elements";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {WhereUsedSearchLogic} from "../../../../bussinesLayer/search/whereUsedSearchLogic";

const login: Login = new Login();
const meganav:Meganav = new Meganav();
const searchLogic: SearchLogic = new SearchLogic();
const whereUsedSearchLogic = new WhereUsedSearchLogic();

describe('Left Nav - Where Used Search ', () => {

    it('should be left nav subitems - Where Used Search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await searchLogic.perform5Searches(commonSearch.searchArray, 3, whereUsedSearchLogic.performWhereUsedSearchWithRefine)
    });

    it('should be popover when hover on search - Where Used Search', async () => {
        await searchLogic.toolTipChecking("Where Used");
    });

    it('should go and change order by searches in the left nav - Where Used Search', async () => {
        await searchLogic.goBySearchesInTheLeftNav(commonSearch.searchArray);
        await login.logout();
    });

});