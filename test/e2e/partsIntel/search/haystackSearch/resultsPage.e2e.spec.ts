import {meganavItems} from "../../../../../testData/global";
import {browser} from "protractor";
import {Meganav} from "../../../../../components/meganav";
const meganav:Meganav = new Meganav();
import {searchElements} from "../../../../../elements/elements";
import {HaystackSearchLogic} from "../../../../../bussinesLayer/search/haystackSearchLogic";
const haystackSearchLogic = new HaystackSearchLogic();
import {Login} from "../../../../../components/login";
const login: Login = new Login();
import {Toolbar} from "../../../../../components/toolbar";
const toolbar: Toolbar = new Toolbar();
import {haystackSearchConst} from "../../../../../testData/search";
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";
const searchLogic: SearchLogic = new SearchLogic();
import {Grid} from "../../../../../components/grid";
const grid:Grid = new Grid();
describe('Haystack Search -  Results Page', () => {

    it('should perform Parts Search and display results grid', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await haystackSearchLogic.performHaystackSearch(haystackSearchConst.searchValue)
    });

    it('should be pagination attributes',  async () => {
        await grid.newGridPaginationChecking();
    });

    it('should be Haystack Search Criteria Accordion',  async () => {
        await searchLogic.searchCriteriaOnResultsPageChecking('Haystack Search Criteria');
    });

    it('should be View Search Criteria link and should show search criteria - Haystack Search',  async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await haystackSearchLogic.viewSearchCriteriaParams();
    });

    it('should be Refine Search Criteria link and should return to search page - Haystack Search',  async () => {
        await searchLogic.refineLinkChecking()
    });

    it('should be View Search Criteria for just NSN field - Haystack Search',  async () => {
        await haystackSearchLogic.viewSearchCriteriaNsn();
    });

    xit('should be View Search Criteria for Part Number and Vendor fields - Haystack Search',  async () => {
        await searchLogic.refineLinkChecking();
        await haystackSearchLogic.viewSearchCriteriaPartNumberWithVendor();
    });

    xit('should be View Search Criteria for Vendor field - Haystack Search',  async () => {
        await searchLogic.refineLinkChecking();
        await haystackSearchLogic.viewSearchCriteriaVendor();
    });
});
