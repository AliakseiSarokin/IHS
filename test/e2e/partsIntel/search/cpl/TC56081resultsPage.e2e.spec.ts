import {browser} from "protractor";
import {cplSearchConst} from "../../../../../testData/search";
import {CplSearchLogic} from "../../../../../bussinesLayer/search/cplSearchLogic";
import {Grid} from "../../../../../components/grid";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {columnHeaders, meganavItems} from "../../../../../testData/global";
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";
import {StringArray} from "../../../../../utils/stringArray";
import {searchElements, gridElements, commonElements} from "../../../../../elements/elements";
import {JasmineTimeout} from "../../../../../helper/jasmineTimeout";

const cplSearchLogic: CplSearchLogic = new CplSearchLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const searchLogic: SearchLogic = new SearchLogic();
const stringArray: StringArray = new StringArray();

describe('TC56081 CPL Search - results page', () => {
    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(260000);
    });

    afterAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it('should perform CPL Search and display results grid', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
        await expect(gridElements.newGridRows.count()).toBeGreaterThan(0);
    });

    it('should be CPL Search Criteria Accordion', async () => {
        await searchLogic.searchCriteriaOnResultsPageChecking('CPL Search Criteria');
    });

    it('should be View Search Criteria link and it should shows search criteria', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverB.get(0).getText()).toEqual(cplSearchConst.searchCriteria);
    });

    it('should be Refine Search Criteria link and should return to search page', async () => {
        await searchLogic.refineLinkChecking()
    });

    it('should be pagination attributes', async () => {
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
        await grid.newGridPaginationChecking();
    });

    it('should be option to go to Last and First pages', async () => {
        await grid.goToLastFirstPages();
    });

    it('should be be column headers', async () => {
        await grid.newGridCheckingColumnHeaders( columnHeaders.search.cpl);
    });

    it('should be search with contain filled criteria', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
        const ipnCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.cpl[6]);
        await expect(stringArray.checkIfArrayOptionsContainOneValue(ipnCells, cplSearchConst.searchCriteria)).toBeTruthy();
    });

    it('should be view search criteria filled criteria', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverDiv.get(0).getText())
            .toEqual(cplSearchConst.viewSearchCriteriaParams + cplSearchConst.searchCriteria);
    });
});