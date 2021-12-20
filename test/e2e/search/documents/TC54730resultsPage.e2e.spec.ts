import {browser} from "protractor";
import {columnHeaders, meganavItems} from "../../../../testData/global";
import {commonElements, gridElements, searchElements} from "../../../../elements/elements";
import {DocumentsSearchLogic} from "../../../../bussinesLayer/search/documentsSearchLogic";
import {docSearchConst} from "../../../../testData/search";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {StringArray} from "../../../../utils/stringArray";
import {TypeAhead} from "../../../../components/typeAhead";

const documentsSearchLogic: DocumentsSearchLogic = new DocumentsSearchLogic();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const searchLogic: SearchLogic = new SearchLogic();
const stringArray: StringArray = new StringArray();
const typeAhead: TypeAhead = new TypeAhead();
let searchCriteriaTypeAhead: string;

describe('TC54730 Documents Search - results page', () => {

    it('should perform Documents Search and display results grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        await expect(gridElements.newGridRows.count()).toBeGreaterThan(0);
    });

    it('should be Documents Search Criteria Accordion', async () => {
        await searchLogic.searchCriteriaOnResultsPageChecking('Document Search Results');
    });

    it('should be View Search Criteria link and it should shows search criteria', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverI.get(0).getText()).toEqual(docSearchConst.searchCriteria);
    });

    it('should be Refine Search Criteria link and should return to search page', async () => {
        await searchLogic.refineLinkChecking()
    });

    it('should be pagination attributes', async () => {
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        await grid.newGridPaginationChecking();
    });

    it('should be option to go to Last and First pages', async () => {
        await grid.goToLastFirstPages();
    });

    it('should be be column headers', async () => {
        await grid.newGridCheckingColumnHeaders( columnHeaders.search.document);
    });

    it('should be search with contain filled Manufacturer Name', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, 'ROCHESTER');
        searchCriteriaTypeAhead = await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value');
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        const mfrNameCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.document[3]);
        await expect(stringArray.checkIfArrayOptionsMatchWithOneValue(mfrNameCells,
            searchCriteriaTypeAhead.substring(0, searchCriteriaTypeAhead.indexOf('/')))).toBeTruthy();
    });

    it('should be view search criteria all existing search conditions', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(docSearchConst.searchCriteriasLabels[0]);
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(docSearchConst.searchCriteria);
        await expect(await commonElements.popoverStrong.get(1).getText()).toEqual(docSearchConst.searchCriteriasLabels[4]);
        await expect(await commonElements.popoverI.get(1).getText())
            .toEqual('-' + searchCriteriaTypeAhead);
        await expect(await commonElements.popoverStrong.get(2).getText()).toEqual(docSearchConst.searchCriteriasLabels[1]);
        await expect(await commonElements.popoverI.get(2).getText())
            .toEqual('-' + docSearchConst.searchCheckboxLabels[0]);
        await expect(await commonElements.popoverI.get(3).getText())
            .toEqual('-Notices');
    });
});