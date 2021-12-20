import {buttonNames, meganavItems, modalTitles, exportOptions, columnHeaders} from "../../../../testData/global";
import {browser} from "protractor";
import {commonSearch, whereUsedSearchConst} from "../../../../testData/search";
import {Button} from "../../../../components/simple/button";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {Grid} from "../../../../components/grid";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {Input} from "../../../../components/simple/input";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {RadioButton} from "../../../../components/simple/radioButton";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {StringArray} from "../../../../utils/stringArray";
import {searchElements, gridElements, commonElements} from "../../../../elements/elements";
import {Toolbar} from "../../../../components/toolbar";
import {WhereUsedSearchLogic} from "../../../../bussinesLayer/search/whereUsedSearchLogic";
import {GetPerformanceLogs} from "../../../../utils/getPerformanceLogs";
import {IRequestInfoType} from "../../../../testData/getPerformLogsInterfaces";
import {endpoints} from "../../../../api/testData/endpointList";
import {requestBody} from "../../../../api/testData/bodyList";
import {WhereUsed} from "../../../../api/logicLayer/search/whereUsed";
import {user} from "../../../../api/testData/global";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const helpLogic: HelpLogic = new HelpLogic();
const input: Input = new Input();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const radioButton: RadioButton = new RadioButton();
const searchLogic: SearchLogic = new SearchLogic();
const stringArray: StringArray = new StringArray();
const toolbar: Toolbar = new Toolbar();
const whereUsedSearchLogic = new WhereUsedSearchLogic();

describe('TC54757 Where Used Search - Search Results Control Panel Buttons ', () => {

    it('should perform Where Used Search and display results grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
    });

    it('should be unhide button with dropdown list - Where Used Search results page', async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column - Where Used Search results page', async () => {
        await grid.newGridHideColumnByName('Internal Part Number');
        await toolbar.displayHiddenColumnInDropdonwToolbar('Internal Part Number')
    });

    it('should unhide the column with Unhide All - Where Used Search results page', async () => {
        await toolbar.unhideCellNameWithUnhideAll('Internal Part Number');
    });

    it('should be export modal attributes - Where Used Search results page', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.exportParts);
        await modal.exportModalAttributes(exportOptions.search.whereUsed.labels, exportOptions.search.whereUsed.options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should be export modal attributes - Where Used Search results page, open help panel and check title', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await helpLogic.openAndCheckHelpPanelTitle('data grid features');
        await modal.closeModalWithXButton();
    });

    it('should open single research request modal - Where Used Search results page', async () => {
        await grid.newMechanismCheckboxRangeChecking(1, 2);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
        await modal.closeModalWithXButton();
    });

    it('should open multiple research request modal - Where Used Search results page', async () => {
        await grid.newMechanismCheckboxRangeChecking(2, 3);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
        await modal.closeModalWithXButton();
    });

    it('should open save search modal, should be save search modal attributes - Where Used Search results page', async () => {
        await searchLogic.openSaveSearchModal();
    });

    it('should not be active save button when fill name filed with spaces - Where Used Search results page', async () => {
        await input.fillFieldWithValue(searchElements.saveSearchNameField, commonSearch.spacesValue);
        await expect(button.returnButtonByText(buttonNames.saveAndReturnToResults).isEnabled()).toBeFalsy()
    });

    it('should save where used search', async () => {
        await searchLogic.saveSearch();
    });

    it('should display saved search in recall searches dropdown - Where Used Search', async () => {
        await searchLogic.displaySaveSearchInRecall()
    });

    it('should display saved Where Used Search in saved searches', async () => {
        await searchLogic.displaySaveSearchInSavedSearches();
    });

    it('should go to search result grid with contain saved criteria from saved searches - Where Used Search', async () => {
        await searchLogic.goToSearchFromSavedSearches();
        const importedMfrPNCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.whereUsed[3]);
        await expect(stringArray.checkIfArrayOptionsMatchWithOneValue(importedMfrPNCells, whereUsedSearchConst.searchCriteria)).toBeTruthy();
    });

    it('should be view search criteria from saved search value', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(whereUsedSearchConst.fullColumnNames[1]+':');
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(whereUsedSearchConst.dropdownValues[0] +': '+ whereUsedSearchConst.searchCriteria);
    });

    it('should display saved search in recall searches dropdown and should apply saved value in search field through refine search criteria', async () => {
        await searchLogic.refineLinkChecking();
        await expect(await elementAttributes.getElementAttribute(searchElements.whereUsedSearchField.get(2),'value'))
            .toEqual(whereUsedSearchConst.searchCriteria);
        await expect(await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown,'value'))
            .toEqual(commonSearch.savedSearchName);
    });

    it('should delete saved Where Used searches', async () => {
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
        await login.logout();
    });

    it("should export xls file for all parts", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.whereUsed.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.whereUsed.exportAllByFormat(exportOptions.fileFormat[0]));
    });


    it("should export csv file for all parts", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.whereUsed.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.whereUsed.exportAllByFormat(exportOptions.fileFormat[1]));
    });

    it("should export txt file for all users", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[4]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.whereUsed.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.whereUsed.exportAllByFormat(exportOptions.fileFormat[2]));
    });

    it("should export xls file for selected parts", async () =>{
        const whereUsedSearch: any = await WhereUsed.getSearchPartsListBySingleFiledOperatorAndValue(user.userAdmin,
            "BM_MFR_PRT", "equals", "1");
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.whereUsed.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.whereUsed.exportBySelectedItemByFormat(exportOptions.fileFormat[0],
            whereUsedSearch[0].id.toString()));
    });

    it("should export csv file for selected parts", async () =>{
        const whereUsedSearch: any = await WhereUsed.getSearchPartsListBySingleFiledOperatorAndValue(user.userAdmin,
            "BM_MFR_PRT", "equals", "1");
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.search.common.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.whereUsed.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.whereUsed.exportBySelectedItemByFormat(exportOptions.fileFormat[1],
            whereUsedSearch[0].id.toString()));
    });

    it("should export txt file for selected parts", async () =>{
        const whereUsedSearch: any = await WhereUsed.getSearchPartsListBySingleFiledOperatorAndValue(user.userAdmin,
            "BM_MFR_PRT", "equals", "1");
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.search.common.options[4]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.whereUsed.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.whereUsed.exportBySelectedItemByFormat(exportOptions.fileFormat[2],
            whereUsedSearch[0].id.toString()));
    });
});
