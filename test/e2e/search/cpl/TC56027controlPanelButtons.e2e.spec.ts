import {Button} from "../../../../components/simple/button";
import {buttonNames, columnHeaders, exportOptions, meganavItems, modalTitles} from "../../../../testData/global";
import {browser} from "protractor";
import {CplSearchLogic} from "../../../../bussinesLayer/search/cplSearchLogic";
import {commonSearch, cplSearchConst} from "../../../../testData/search";
import {commonElements, gridElements, searchElements} from "../../../../elements/elements";
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
import {Toolbar} from "../../../../components/toolbar";
import {endpoints} from "../../../../api/testData/endpointList";
import {IRequestInfoType} from "../../../../testData/getPerformLogsInterfaces";
import {GetPerformanceLogs} from "../../../../utils/getPerformanceLogs";
import {requestBody} from "../../../../api/testData/bodyList";
import {Cpl} from "../../../../api/logicLayer/search/cpl";
import {user} from "../../../../api/testData/global";

const button: Button = new Button();
const cplSearchLogic: CplSearchLogic = new CplSearchLogic();
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

describe('TC56027 CPL Search - Search Results Control Panel Buttons', () => {

    it('should perform CPL Search and display results grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
    });

    it('should be unhide button with dropdown list  - CPL Search results page', async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column - CPL Search results page', async () => {
        await grid.newGridHideColumnByName('Corp P/N');
        await toolbar.displayHiddenColumnInDropdonwToolbar('Corp P/N')
    });

    it('should unhide the column with Unhide All - CPL Search results page', async () => {
        await toolbar.unhideCellNameWithUnhideAll('Corp P/N');
    });

    it('should be export modal attributes - CPL Search results page', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.exportParts);
        await modal.exportModalAttributes(exportOptions.search.common.labels, exportOptions.search.common.options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should be export modal attributes - CPL Search results page, open help panel and check title', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await helpLogic.openAndCheckHelpPanelTitle('data grid features');
        await modal.closeModalWithXButton();
    });

    it("should export xls file for all parts", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.cpl.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.cpl.exportAllByFormatByQuery(exportOptions.fileFormat[0],
            cplSearchConst.searchCriteria));
    });


    it("should export csv file for all parts", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.cpl.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.cpl.exportAllByFormatByQuery(exportOptions.fileFormat[1],
            cplSearchConst.searchCriteria));
    });


    it("should export txt file for all users", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[4]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.cpl.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.cpl.exportAllByFormatByQuery(exportOptions.fileFormat[2],
            cplSearchConst.searchCriteria));
    });

    it("should export xls file for selected parts", async () =>{
        const cplSearch: any = await Cpl.cplSearchByQuery(user.userAdmin,
            cplSearchConst.searchCriteria);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.cpl.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.cpl.exportSelectedByPartIdFormatAndQuery((cplSearch[0].OBJ_ID).toString().split(),
            exportOptions.fileFormat[0],
            cplSearchConst.searchCriteria));
    });

    it("should export csv file for selected parts", async () =>{
        const cplSearch: any = await Cpl.cplSearchByQuery(user.userAdmin,
            cplSearchConst.searchCriteria);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.cpl.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.cpl.exportSelectedByPartIdFormatAndQuery((cplSearch[0].OBJ_ID).toString().split(),
            exportOptions.fileFormat[1],
            cplSearchConst.searchCriteria));
    });

    it("should export txt file for selected parts", async () =>{
        const cplSearch: any = await Cpl.cplSearchByQuery(user.userAdmin,
            cplSearchConst.searchCriteria);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[4]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.cpl.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.cpl.exportSelectedByPartIdFormatAndQuery((cplSearch[0].OBJ_ID).toString().split(),
            exportOptions.fileFormat[2],
            cplSearchConst.searchCriteria));
    });

    it('should open save search modal, should be save search modal attributes - CPL Search results page', async () => {
        await searchLogic.openSaveSearchModal();
    });

    it('should not be active save button when fill name filed with spaces - CPL Search results page', async () => {
        await input.fillFieldWithValue(searchElements.saveSearchNameField, commonSearch.spacesValue);
        await expect(button.returnButtonByText(buttonNames.saveAndReturnToResults).isEnabled()).toBeFalsy()
    });

    it('should save cpl search', async () => {
        await searchLogic.saveSearch();
    });

    it('should display saved search in recall searches dropdown - CPL Search', async () => {
        await searchLogic.displaySaveSearchInRecall();
    });

    it('should display saved CPL Search in saved searches', async () => {
        await searchLogic.displaySaveSearchInSavedSearches();
    });

    it('should go to search result grid with contain saved criteria from saved searches - CPL Search', async () => {
        await searchLogic.goToSearchFromSavedSearches();
        const ipnCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.cpl[7]);
        await expect(stringArray.checkIfArrayOptionsContainOneValue(ipnCells, cplSearchConst.searchCriteria)).toBeTruthy();
    });

    it('should be view search criteria from saved search value', async () => {
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverDiv.get(0).getText())
            .toEqual(cplSearchConst.viewSearchCriteriaParams + cplSearchConst.searchCriteria);
    });

    it('should display saved search in recall searches dropdown and should apply saved value in search field through refine search criteria', async () => {
        await searchLogic.refineLinkChecking();
        await expect(await elementAttributes.getElementAttribute(searchElements.cplSearchField, 'value'))
            .toEqual(cplSearchConst.searchCriteria);
        await expect(await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))
            .toEqual(commonSearch.savedSearchName);
    });

    it('should delete saved CPL searches', async () => {
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
        // await login.logout();
    });
});