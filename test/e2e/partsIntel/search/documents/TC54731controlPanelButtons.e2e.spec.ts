import {Button} from "../../../../../components/simple/button";
import {buttonNames, columnHeaders, exportOptions, meganavItems, modalTitles} from "../../../../../testData/global";
import {browser} from "protractor";
import {commonElements, gridElements, searchElements} from "../../../../../elements/elements";
import {commonSearch, docSearchConst} from "../../../../../testData/search";
import {DocumentsSearchLogic} from "../../../../../bussinesLayer/search/documentsSearchLogic";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {Grid} from "../../../../../components/grid";
import {HelpLogic} from "../../../../../bussinesLayer/help/helpLogic";
import {Input} from "../../../../../components/simple/input";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Modal} from "../../../../../components/modal";
import {RadioButton} from "../../../../../components/simple/radioButton";
import {Toolbar} from "../../../../../components/toolbar";
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";
import {StringArray} from "../../../../../utils/stringArray";
import {GetPerformanceLogs} from "../../../../../utils/getPerformanceLogs";
import {IRequestInfoType} from "../../../../../testData/getPerformLogsInterfaces";
import {endpoints} from "../../../../../api/testData/endpointList";
import {requestBody} from "../../../../../api/testData/bodyList";
import {user} from "../../../../../api/testData/global";
import {Documents} from "../../../../../api/logicLayer/search/documents";

const button: Button = new Button();
const documentsSearchLogic:DocumentsSearchLogic = new DocumentsSearchLogic();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid:Grid = new Grid();
const helpLogic: HelpLogic = new HelpLogic();
const input: Input = new Input();
const login: Login = new Login();
const meganav:Meganav = new Meganav();
const modal:Modal = new Modal();
const radioButton: RadioButton = new RadioButton();
const searchLogic: SearchLogic = new SearchLogic();
const stringArray: StringArray = new StringArray();
const toolbar: Toolbar = new Toolbar();

describe('TC54731 Document Search - Search Results Control Panel Buttons',  () => {

    it('should perform Document Search and display results grid', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
    });

    it('should be unhide button with dropdown list  - Documents Search results page',  async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column - Documents Search results page',  async () => {
        await grid.newGridHideColumnByName('Document Type');
        await toolbar.displayHiddenColumnInDropdonwToolbar('Document Type')
    });

    it('should unhide the column with Unhide All - Documents Search results Page',  async () => {
        await toolbar.unhideCellNameWithUnhideAll('Document Type');
    });

    it('should be export modal attributes - Documents Search results page', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.exportDocumentsSearchResults);
        await modal.exportModalAttributes(exportOptions.search.doc.labels, exportOptions.search.doc.options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should be export modal attributes - Documents Search results page, open help panel and check title', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await helpLogic.openAndCheckHelpPanelTitle('Datagrid features');
        await modal.closeModalWithXButton();
    });



    it('should go to view related parts', async () => {
        await documentsSearchLogic.goToViewRelatedParts();
    });

    it('should return to Documents Search results page', async () => {
        await documentsSearchLogic.returnToDocSearch();
    });

    it('should open save search modal, should be save search modal attributes - Documents Search results page', async () => {
        await searchLogic.openSaveSearchModal();
    });

    it('should not be active save button when fill name filed with spaces - Documents Search results page', async () => {
        await input.fillFieldWithValue(searchElements.saveSearchNameField, commonSearch.spacesValue);
        await expect(button.returnButtonByText(buttonNames.saveAndReturnToResults).isEnabled()).toBeFalsy()
    });

    it('should save documents search', async () => {
        await searchLogic.saveSearch();
    });

    it('should display saved Documents Search in saved searches', async () => {
        await searchLogic.displaySaveSearchInSavedSearches();
    });

    it('should go to search results grid with contain saved criteria from saved searches - Documents Search', async () => {
        await searchLogic.goToSearchFromSavedSearches();
        const ipnCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.document[1]);
        await expect(stringArray.checkIfArrayOptionsContainOneValue(ipnCells, docSearchConst.searchCriteria)).toBeTruthy();
    });

    it('should be view search criteria from saved search value', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual(docSearchConst.searchCriteriasLabels[0]);
        await expect(await commonElements.popoverI.get(0).getText())
            .toEqual(docSearchConst.searchCriteria);
        await expect(await commonElements.popoverStrong.get(1).getText()).toEqual(docSearchConst.searchCriteriasLabels[1]);
        await expect(await commonElements.popoverI.get(1).getText())
            .toEqual('-' + docSearchConst.searchCheckboxLabels[0]);
        await expect(await commonElements.popoverI.get(2).getText())
            .toEqual('-Notices');
    });

    it('should display saved search in recall searches dropdown and should apply saved value in search field through refine search criteria', async () => {
        await searchLogic.refineLinkChecking();
        await expect(await elementAttributes.getElementAttribute(searchElements.searchField, 'value'))
            .toEqual(docSearchConst.searchCriteria);
        await expect(await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))
            .toEqual(commonSearch.savedSearchName);
    });

    it('should delete saved Documents searches', async () => {
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
        await login.logout();
    });

    it("should export xls file for all parts", async () =>{
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.documents.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.documents.exportDefaultSearchByFormatAndQuery(exportOptions.fileFormat[0],
            docSearchConst.searchCriteria));
    });

    it("should export csv file for all parts", async () =>{
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.documents.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.documents.exportDefaultSearchByFormatAndQuery(exportOptions.fileFormat[1],
            docSearchConst.searchCriteria));
    });

    it("should export txt file for all parts", async () =>{
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[4]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.documents.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.documents.exportDefaultSearchByFormatAndQuery(exportOptions.fileFormat[2],
            docSearchConst.searchCriteria));
    });

    it("should export xls file for all view related parts", async () =>{
        const docSearchList:any = await Documents.getSearchDefaultPartsListByQuery(user.userAdmin, docSearchConst.searchCriteria);
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        await documentsSearchLogic.goToViewRelatedParts();
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr,
            endpoints.search.documents.exportViewRelatedPartsById(docSearchList[0].id),
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.documents.exportViewRelatedPartsByFormat(exportOptions.fileFormat[0]));
    });

    it("should export csv file for all view related parts", async () =>{
        const docSearchList:any = await Documents.getSearchDefaultPartsListByQuery(user.userAdmin, docSearchConst.searchCriteria);
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        await documentsSearchLogic.goToViewRelatedParts();
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr,
            endpoints.search.documents.exportViewRelatedPartsById(docSearchList[0].id),
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.documents.exportViewRelatedPartsByFormat(exportOptions.fileFormat[1]));
    });

    it("should export txt file for all view related parts", async () =>{
        const docSearchList:any = await Documents.getSearchDefaultPartsListByQuery(user.userAdmin, docSearchConst.searchCriteria);
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        await documentsSearchLogic.goToViewRelatedParts();
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[4]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr,
            endpoints.search.documents.exportViewRelatedPartsById(docSearchList[0].id),
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.documents.exportViewRelatedPartsByFormat(exportOptions.fileFormat[2]));
    });

    it("should export xls file for selected view related parts", async () =>{
        const docSearchList:any = await Documents.getSearchDefaultPartsListByQuery(user.userAdmin, docSearchConst.searchCriteriaWithViewReatedParts);
        const viewRelatedPartsList: any = await Documents.getViewRelatedPartsListById(user.userAdmin, docSearchList[0].id);
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteriaWithViewReatedParts);
        await documentsSearchLogic.goToViewRelatedParts();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr,
            endpoints.search.documents.exportViewRelatedPartsById(docSearchList[0].id),
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.documents.exportViewRelatedPartsByFormatById(exportOptions.fileFormat[0],
            [viewRelatedPartsList[0].id.toString()]));
    });

    it("should export csv file for selected view related parts", async () =>{
        const docSearchList:any = await Documents.getSearchDefaultPartsListByQuery(user.userAdmin, docSearchConst.searchCriteriaWithViewReatedParts);
        const viewRelatedPartsList: any = await Documents.getViewRelatedPartsListById(user.userAdmin, docSearchList[0].id);
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteriaWithViewReatedParts);
        await documentsSearchLogic.goToViewRelatedParts();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr,
            endpoints.search.documents.exportViewRelatedPartsById(docSearchList[0].id),
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.documents.exportViewRelatedPartsByFormatById(exportOptions.fileFormat[1],
            [viewRelatedPartsList[0].id.toString()]));
    });

    it("should export txt file for selected view related parts", async () =>{
        const docSearchList:any = await Documents.getSearchDefaultPartsListByQuery(user.userAdmin, docSearchConst.searchCriteriaWithViewReatedParts);
        const viewRelatedPartsList: any = await Documents.getViewRelatedPartsListById(user.userAdmin, docSearchList[0].id);
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteriaWithViewReatedParts);
        await documentsSearchLogic.goToViewRelatedParts();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[4]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr,
            endpoints.search.documents.exportViewRelatedPartsById(docSearchList[0].id),
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.documents.exportViewRelatedPartsByFormatById(exportOptions.fileFormat[2],
            [viewRelatedPartsList[0].id.toString()]));
    });
});
