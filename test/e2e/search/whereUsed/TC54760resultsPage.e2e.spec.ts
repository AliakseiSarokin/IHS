import {commonElements, gridElements, searchElements} from "../../../../elements/elements";
import {columnHeaders, meganavItems} from "../../../../testData/global";
import {whereUsedSearchConst} from "../../../../testData/search";
import {browser} from "protractor";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {StringArray} from "../../../../utils/stringArray";
import {TypeAhead} from "../../../../components/typeAhead";
import {WhereUsedSearchLogic} from "../../../../bussinesLayer/search/whereUsedSearchLogic";

const grid: Grid = new Grid();
const login: Login = new Login();
const elementAttirbutes: ElementAttributes = new ElementAttributes();
const meganav: Meganav = new Meganav();
const searchLogic: SearchLogic = new SearchLogic();
const stringArray: StringArray = new StringArray();
const typeAhead: TypeAhead = new TypeAhead();
const whereUsedSearchLogic = new WhereUsedSearchLogic();
let searchCriteriaTypeAhead: string;

describe('TC54760 Where Used Search - results page', () => {

    it('should perform Where Used Search and display results grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
        await expect(gridElements.newGridRows.count()).toBeGreaterThan(0);
    });

    it('should be Where Used Search Criteria Accordion',  async () => {
        await searchLogic.searchCriteriaOnResultsPageChecking('Where Used Search Criteria');
    });

    it('should be View Search Criteria link and it should shows search criteria', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverI.get(0).getText()).toContain(whereUsedSearchConst.searchCriteria);
    });

    it('should be Refine Search Criteria link and should return to search page', async () => {
        await searchLogic.refineLinkChecking()
    });

    it('should be pagination attributes',  async () => {
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
        await grid.newGridPaginationChecking();
    });

    it('should be option to go to Last and First pages',  async () => {
        await grid.goToLastFirstPages();
    });

    it('should be be column headers',  async () => {
        await grid.newGridCheckingColumnHeaders( columnHeaders.search.whereUsed);
    });

    it('should be exact search with filled one Internal Part Number field', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria, 0);
        const ipnCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[0]);
        await expect(stringArray.checkIfArrayOptionsMatchWithOneValue(ipnCells, whereUsedSearchConst.searchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for exact Internal Part Number field', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(columnHeaders.search.whereUsed[0]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[0] +': '+ whereUsedSearchConst.searchCriteria);
    });

    it('should be exact search with filled two Internal Part Number fields', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(0);
        await whereUsedSearchLogic.performWhereUsedSearchWithFillingSeveralFieds(whereUsedSearchConst.exactIpnTwoFieldsSearchCriteria,
            [0,1]);
        const ipnCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[0]);
        await expect(stringArray.checkIfArrayOptionsMatchWithValuesFromArray(ipnCells, whereUsedSearchConst.exactIpnTwoFieldsSearchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for two exact Internal Part Number fields', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(columnHeaders.search.whereUsed[0]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[0] +': '+ whereUsedSearchConst.exactIpnTwoFieldsSearchCriteria[0]+', '
        + whereUsedSearchConst.exactIpnTwoFieldsSearchCriteria[1]);
    });

    it('should be starts with search with filled one Internal Part Number field', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(0);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(whereUsedSearchConst.dropdownValues[1]);
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria,
            0);
        const ipnCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[0]);
        await expect(stringArray.checkIfArrayOptionsStartsWithOneValue(ipnCells, whereUsedSearchConst.searchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for one starts with Internal Part Number field', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(columnHeaders.search.whereUsed[0]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[1] +': '+ whereUsedSearchConst.searchCriteria);
    });

    it('should be starts with search with filled two Internal Part Number fields', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(0);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(whereUsedSearchConst.dropdownValues[1]);
        await whereUsedSearchLogic.performWhereUsedSearchWithFillingSeveralFieds(whereUsedSearchConst.exactIpnTwoFieldsSearchCriteria,
            [0,1]);
        const ipnCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[0]);
        await expect(stringArray.checkIfArrayOptionsStartsWithValuesFromArray(ipnCells, whereUsedSearchConst.exactIpnTwoFieldsSearchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for two starts with Internal Part Number fields', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(columnHeaders.search.whereUsed[0]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[1] +': '+ whereUsedSearchConst.exactIpnTwoFieldsSearchCriteria[0]+', '
        + whereUsedSearchConst.exactIpnTwoFieldsSearchCriteria[1]);
    });


    it('should be exact search with filled one Matched Mfr P/N field', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria, 1);
        const matchedMfrPNCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[1]);
        await expect(stringArray.checkIfArrayOptionsMatchWithOneValue(matchedMfrPNCells, whereUsedSearchConst.searchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for exact Matched Mfr P/N field', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(whereUsedSearchConst.fullColumnNames[0]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[0] +': '+ whereUsedSearchConst.searchCriteria);
    });

    it('should be exact search with filled two Matched Mfr P/N fields', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(1);
        await whereUsedSearchLogic.performWhereUsedSearchWithFillingSeveralFieds(whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria,
            [1,2]);
        const matchedMfrPNCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[1]);
        await expect(stringArray.checkIfArrayOptionsMatchWithValuesFromArray(matchedMfrPNCells, whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for two exact Matched Mfr P/N fields', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(whereUsedSearchConst.fullColumnNames[0]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[0] +': '+ whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria[0]+', '
                + whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria[1]);
    });


    it('should be starts with search with filled one Matched Mfr P/N field', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(1);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(whereUsedSearchConst.dropdownValues[1]);
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria,
            1);
        const matchedMfrPNCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[1]);
        await expect(stringArray.checkIfArrayOptionsStartsWithOneValue(matchedMfrPNCells, whereUsedSearchConst.searchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for one starts with Matched Mfr P/N field', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(whereUsedSearchConst.fullColumnNames[0]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[1] +': '+ whereUsedSearchConst.searchCriteria);
    });


    it('should be starts with search with filled two Matched Mfr P/N fields', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(1);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(whereUsedSearchConst.dropdownValues[1]);
        await whereUsedSearchLogic.performWhereUsedSearchWithFillingSeveralFieds(whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria,
            [1,2]);
        const matchedMfrPNCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[1]);
        await expect(stringArray.checkIfArrayOptionsStartsWithValuesFromArray(matchedMfrPNCells, whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for two starts with Matched Mfr P/N fields', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(whereUsedSearchConst.fullColumnNames[0]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[1] +': '+ whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria[0]+', '
                + whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria[1]);
    });

    it('should be search with one Matched Mfr Name field', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, whereUsedSearchConst.searchCriteria2);
        searchCriteriaTypeAhead = await elementAttirbutes.getElementAttribute(commonElements.commonTypeAheadInput, 'value');
        await searchLogic.performSearch();
        const matchedMfrNameCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[2]);
        await expect(stringArray.checkIfArrayOptionsMatchWithOneValue(matchedMfrNameCells,
            searchCriteriaTypeAhead.substring(0, searchCriteriaTypeAhead.indexOf('/')))).toBeTruthy();
    });

    it('should be view search criteria for one Matched Mfr Name field', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(whereUsedSearchConst.fullColumnNames[3]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(searchCriteriaTypeAhead);
    });

    it('should be exact search with filled one Imported Mfr P/N field', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
        const importedMfrPNCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[3]);
        await expect(stringArray.checkIfArrayOptionsMatchWithOneValue(importedMfrPNCells, whereUsedSearchConst.searchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for exact Imported Mfr P/N field', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(whereUsedSearchConst.fullColumnNames[1]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[0] +': '+ whereUsedSearchConst.searchCriteria);
    });

    it('should be exact search with filled two Imported Mfr P/N fields', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(2);
        await whereUsedSearchLogic.performWhereUsedSearchWithFillingSeveralFieds(whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria,
            [2,3]);
        const importedMfrPNCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[3]);
        await expect(stringArray.checkIfArrayOptionsMatchWithValuesFromArray(importedMfrPNCells, whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for two exact Imported Mfr P/N fields', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(whereUsedSearchConst.fullColumnNames[1]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[0] +': '+ whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria[0]+', '
                + whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria[1]);
    });

    it('should be starts with search with filled one Imported Mfr P/N field', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(2);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(whereUsedSearchConst.dropdownValues[1]);
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria,
            2);
        const importedMfrPNCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[3]);
        await expect(stringArray.checkIfArrayOptionsStartsWithOneValue(importedMfrPNCells, whereUsedSearchConst.searchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for one starts with Imported Mfr P/N field', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(whereUsedSearchConst.fullColumnNames[1]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[1] +': '+ whereUsedSearchConst.searchCriteria);
    });

    it('should be starts with search with filled two Imported Mfr P/N fields', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(2);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(whereUsedSearchConst.dropdownValues[1]);
        await whereUsedSearchLogic.performWhereUsedSearchWithFillingSeveralFieds(whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria,
            [2,3]);
        const importedMfrPNCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[3]);
        await expect(stringArray.checkIfArrayOptionsStartsWithValuesFromArray(importedMfrPNCells, whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for two starts with Imported Mfr P/N fields', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(whereUsedSearchConst.fullColumnNames[1]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[1] +': '+ whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria[0]+', '
                + whereUsedSearchConst.exactMatchMfrPNTwoFieldsSearchCriteria[1]);
    });

    it('should be exact search with filled one Imported Mfr Name field', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria, 3);
        const importedMfrNameCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[4]);
        await expect(stringArray.checkIfArrayOptionsMatchWithOneValue(importedMfrNameCells, whereUsedSearchConst.searchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for exact Imported Mfr Name field', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(whereUsedSearchConst.fullColumnNames[2]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[0] +': '+ whereUsedSearchConst.searchCriteria);
    });

    it('should be exact search with filled two Imported Mfr Name fields', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(3);
        await whereUsedSearchLogic.performWhereUsedSearchWithFillingSeveralFieds(whereUsedSearchConst.exactIportedMfrNameTwoFieldsSearchCriteria,
            [3,4]);
        const importedMfrNameCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[4]);
        await expect(stringArray.checkIfArrayOptionsMatchWithValuesFromArray(importedMfrNameCells, whereUsedSearchConst.exactIportedMfrNameTwoFieldsSearchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for two exact Imported Mfr Name fields', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(whereUsedSearchConst.fullColumnNames[2]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[0] +': '+ whereUsedSearchConst.exactIportedMfrNameTwoFieldsSearchCriteria[0]+', '
                + whereUsedSearchConst.exactIportedMfrNameTwoFieldsSearchCriteria[1]);
    });

    it('should be starts with search with filled one Imported Mfr Name field', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(3);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(whereUsedSearchConst.dropdownValues[1]);
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria,
            3);
        const importedMfrNameCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[4]);
        await expect(stringArray.checkIfArrayOptionsStartsWithOneValue(importedMfrNameCells, whereUsedSearchConst.searchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for one starts with Imported Mfr Name field', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(whereUsedSearchConst.fullColumnNames[2]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[1] +': '+ whereUsedSearchConst.searchCriteria);
    });

    it('should be starts with search with filled two Imported Mfr Name fields', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(3);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(whereUsedSearchConst.dropdownValues[1]);
        await whereUsedSearchLogic.performWhereUsedSearchWithFillingSeveralFieds(whereUsedSearchConst.exactIportedMfrNameTwoFieldsSearchCriteria,
            [3,4]);
        const importedMfrNameCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[4]);
        await expect(stringArray.checkIfArrayOptionsStartsWithValuesFromArray(importedMfrNameCells, whereUsedSearchConst.exactIportedMfrNameTwoFieldsSearchCriteria)).toBeTruthy();
    });

    it('should be view search criteria for two starts with Imported Mfr Name fields', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(whereUsedSearchConst.fullColumnNames[2]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[1] +': '+ whereUsedSearchConst.exactIportedMfrNameTwoFieldsSearchCriteria[0]+', '
                + whereUsedSearchConst.exactIportedMfrNameTwoFieldsSearchCriteria[1]);
    });
});