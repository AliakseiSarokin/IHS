import {Login} from "../../../components/login";
const login: Login = new Login();
import {Meganav} from "../../../components/meganav";
const meganav:Meganav = new Meganav();
import {buttonNames, meganavItems, titles, exportOptions, modalTitles, columnHeaders} from "../../../testData/global";
import {pageTitles, gridElements, commonElements, dropdownElements} from "../../../elements/elements";
import {browser} from "protractor";
import {InstructionPanel} from "../../../components/instructionPanel";
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
const instructionPanel:InstructionPanel = new InstructionPanel();
import {Toolbar} from "../../../components/toolbar";
const toolbar: Toolbar = new Toolbar();
import {Modal} from "../../../components/modal";
const modal:Modal = new Modal();
import {kbData} from "../../../testData/knowledgeBase";
import {Dropdown} from "../../../components/dropdown";
import {Grid} from "../../../components/grid";
const grid:Grid = new Grid();
import {KnowledgeBaseLogic} from "../../../bussinesLayer/knowledgeBase/knowledgeBaseLogic";
const knowledgeBaseLogic: KnowledgeBaseLogic = new KnowledgeBaseLogic();
const helpLogic: HelpLogic = new HelpLogic();
import {RadioButton} from "../../../components/simple/radioButton";
import {GetPerformanceLogs} from "../../../utils/getPerformanceLogs";
import {IRequestInfoType} from "../../../testData/getPerformLogsInterfaces";
import {endpoints} from "../../../api/testData/endpointList";
import {StringArray} from "../../../utils/stringArray";
import {requestBody} from "../../../api/testData/bodyList";
import {Knowledgebase} from "../../../api/logicLayer/knowledgebase";
import {user} from "../../../api/testData/global";
import {BeforeAfter} from "../../../helper/beforeAfter";
const radioButton: RadioButton = new RadioButton();

describe(' Manufacturer Knowledge Base', () => {

    it(" should go to Manufacturer Knowledge Base ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.mfrKnowledgeBase, gridElements.grid);
        await expect(await pageTitles.pageTitleShim.getText()).toEqual(titles.mfrKnowledgeBase);
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Knowledge base');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Knowledge base management');
    });

    it('should be tag label for columns filtering - sort A to Z ', async () => {
        await toolbar.filterAllColumnsAZ();
    });

    it('should remove filtering with clear all', async () => {
        await toolbar.clearFilteringWithClearAll();
    });


    it(" should have Mfr Knowledge Base active in the left nav  ", async () => {
        await expect(await commonElements.activeLeftNav.getText()).toEqual(titles.mfrKnowledgeBase);
    });

    it('should have unhide button with dropdown list  -  Manufacturer Knowledge Base', async () => {
        await toolbar.unhideDropdown();
    });

    it('should be filters - Manufacturer Knowledge Base ', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(kbData.mfrFilters);
        await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);
    });

    it('should select option and display tag - Manufacturer Knowledge Base ', async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter);
    });

    it('should display one tag - Manufacturer Knowledge Base ', async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove tag by clicking on clear all tags link - Manufacturer Knowledge Base ', async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove tag by clicking on X - Manufacturer Knowledge Base ', async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it('should open export modal, should be export modal attributes - Manufacturer Knowledge Base', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.exportMfrKB);
        await modal.exportModalAttributes(exportOptions.knowledgeBase.labels, exportOptions.knowledgeBase.options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it("should open export modal, open help panel and check opened subitem", async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Export Manufacturer knowledge base details');
        await modal.closeModalWithXButton();
    });

    it(" should open and close delete modal for Mfr Knowledge Base ", async () => {
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.confirmDelete);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.doNotDeleteSelectedItemsButton);
    });

    it('should be column heraders for Mfr Knowledge Base', async () => {
        await grid.newGridCheckingColumnHeaders(columnHeaders.mfrKnowledgeBase.all);
        await toolbar.unhideCellNameWithUnhideAll(columnHeaders.mfrKnowledgeBase.all[0]);
    });

    it('should be pagination attributes', async () => {
        await grid.newGridPaginationChecking();
    });

    it('should be option to go to Last and First Pages', async () => {
        await grid.goToLastFirstPages();
    });

    it('should be links in Accepted Mfr Name column', async () => {
        await knowledgeBaseLogic.checkingLinksInColumn(0);
    });

    it('should open mfr information modal by clicking on the Accepted Mfr  link', async () => {
        await knowledgeBaseLogic.openAcceptedPN('Manufacturer Information');
    });

    it('should have links in BOM Path column for Mfr Knowledge base', async () => {
        await knowledgeBaseLogic.checkingLinksInColumn(4);
    });

    it('should check "View Ignored Manufacturer Exceptions" filter value, US280236', async () => {
            await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
            await Dropdown.selectValueInDropdownByValueName(buttonNames.viewIgnoredManufacturerExceptions);
            const acceptedMfrNames: any[] = await grid.newGridReturnCellValuesByColumnName(1,
                columnHeaders.mfrKnowledgeBase.all[1]);
            await acceptedMfrNames.forEach(item => expect(item).toBe(''))
    });

});

describe(' Manufacturer Knowledge Base export', () => {

    beforeEach(async () =>{
        await BeforeAfter.clearCacheCookiesWithLogin(browser.params.userAdminUrl);
    });

    it('should export xls file for  all Manufacturer Knowledge Base', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.mfrKnowledgeBase, gridElements.grid);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.knowledgebase.mfrExport,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.knowledgebase.exportMfrByFormat(exportOptions.fileFormat[0]));
    });

    it('should export csv file for all Manufacturer Knowledge Base', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.mfrKnowledgeBase, gridElements.grid);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.knowledgebase.mfrExport,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.knowledgebase.exportMfrByFormat(exportOptions.fileFormat[1]));
    });

    it('should export xls file for selected Manufacturer Knowledge Base', async () => {
        const knowledgebaseMfrList: any = await Knowledgebase.getMfrList(user.userAdmin);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.mfrKnowledgeBase, gridElements.checkboxSelector.get(0));
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.knowledgebase.mfrExport,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.knowledgebase.exportMfrByFormByIdList(exportOptions.fileFormat[0],
            [knowledgebaseMfrList[0].id.toString()]));
    });

    it('should export csv file for selected Manufacturer Knowledge Base', async () => {
        const knowledgebaseMfrList: any = await Knowledgebase.getMfrList(user.userAdmin);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.mfrKnowledgeBase, gridElements.checkboxSelector.get(0));
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.knowledgebase.mfrExport,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.knowledgebase.exportMfrByFormByIdList(exportOptions.fileFormat[1],
            [knowledgebaseMfrList[0].id.toString()]));
    });


});