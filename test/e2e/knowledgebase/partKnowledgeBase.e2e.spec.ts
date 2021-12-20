import {Login} from "../../../components/login";

const login: Login = new Login();
import {Meganav} from "../../../components/meganav";

const meganav: Meganav = new Meganav();
import {
    buttonNames, meganavItems, titles, exportOptions, modalTitles, columnHeaders,
    fieldStatuses
} from "../../../testData/global";
import {pageTitles, gridElements, commonElements, dropdownElements, toolbarElements} from "../../../elements/elements";
import {browser} from "protractor";
import {InstructionPanel} from "../../../components/instructionPanel";

const instructionPanel: InstructionPanel = new InstructionPanel();
import {Toolbar} from "../../../components/toolbar";

const toolbar: Toolbar = new Toolbar();
import {Modal} from "../../../components/modal";
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";

const modal: Modal = new Modal();
import {kbData} from "../../../testData/knowledgeBase";
import {Dropdown} from "../../../components/dropdown";
import {Grid} from "../../../components/grid";

const grid: Grid = new Grid();
import {KnowledgeBaseLogic} from "../../../bussinesLayer/knowledgeBase/knowledgeBaseLogic";
import {CheckBox} from "../../../components/simple/checkBox";

const checkBox: CheckBox = new CheckBox();
import {GetPerformanceLogs} from "../../../utils/getPerformanceLogs";
import {IRequestInfoType} from "../../../testData/getPerformLogsInterfaces";
import {RadioButton} from "../../../components/simple/radioButton";

const radioButton: RadioButton = new RadioButton();
import {StringArray} from "../../../utils/stringArray";
import {requestBody} from "../../../api/testData/bodyList";
import {endpoints} from "../../../api/testData/endpointList";
import {Knowledgebase} from "../../../api/logicLayer/knowledgebase";
import {user} from "../../../api/testData/global";
import {BeforeAfter} from "../../../helper/beforeAfter";
import {allureStep} from "../../../helper/allure/allureSteps";

const knowledgeBaseLogic: KnowledgeBaseLogic = new KnowledgeBaseLogic();
const helpLogic: HelpLogic = new HelpLogic();

describe(' Part Knowledge Base', () => {

    it(" should go to Parts Knowledge Base", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.grid);
        await expect(await pageTitles.pageTitleShim.getText()).toEqual(titles.partsKnowledgeBase);
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Knowledge base');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Knowledge base management');
    });

    it('should clear checkbox selections applying toolbar filter, DE111473', async () => {
        await grid.checkCheckboxRangeNewGrid(0, 1);
        await expect(browser.executeScript('document.querySelectorAll("[row-index] .grid-checkbox-item")[0].checked'));
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(kbData.partsFilters[1], gridElements.checkboxSelector.get(1));
        await expect((toolbarElements.tagByName(kbData.partsFilters[1])).isDisplayed()).toBeTruthy();
        await checkBox.checkCheckboxesStatus(gridElements.newGridCheckboxSelector, fieldStatuses.emptyField);
    });

    it('should be tag label for columns filtering - sort A to Z ', async () => {
        await toolbar.filterAllColumnsAZ();
    });

    it('should remove filtering with clear all', async () => {
        await toolbar.clearFilteringWithClearAll();
    });

    it(" should have Mfr Knowledge Base active in the left nav  ", async () => {
        await expect(await commonElements.activeLeftNav.getText()).toEqual(titles.partsKnowledgeBase);
    });

    it('should have unhide button with dropdown list  -  Manufacturer Knowledge Base', async () => {
        await toolbar.unhideDropdown();
    });


    it('should be filters - Parts Knowledge Base ', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(kbData.partsFilters);
        await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);
    });

    it('should select option and display tag - Parts Knowledge Base', async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter);
    });

    it('should display one tag - Parts Knowledge Base', async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove tag by clicking on clear all tags link - Parts Knowledge Base', async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove tag by clicking on X - Parts Knowledge Base', async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it('should open export modal, should be export modal attributes - Manufacturer Knowledge Base', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.exportPartsKB);
        await modal.exportModalAttributes(exportOptions.knowledgeBase.parts.labels, exportOptions.knowledgeBase.parts.options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    //skip test because of the defect with help panel
    xit("should open export modal, open help panel and check opened subitem", async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Export Part knowledge base details');
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

    it('should be column heraders for Parts Knowledge Base', async () => {
        await grid.newGridCheckingColumnHeaders(columnHeaders.partsKnowledgeBase.all);
        await toolbar.unhideCellNameWithUnhideAll(columnHeaders.partsKnowledgeBase.all[0])
    });

    it('should be pagination attributes', async () => {
        await grid.newGridPaginationChecking();
    });

    it('should be option to go to Last and First Pages', async () => {
        await grid.goToLastFirstPages();
    });

    it('should be links in Accepted P/N column', async () => {
        await knowledgeBaseLogic.checkingLinksInColumn(1);
    });

    it('should open part details modal by clicking on the Accepted P/N link', async () => {
        await knowledgeBaseLogic.openAcceptedPN('Part Details');
    });

    it('should be links in Accepted Mfr column', async () => {
        await knowledgeBaseLogic.checkingLinksInColumn(2);
    });

    it('should open part details modal by clicking on the Accepted Mfr  link', async () => {
        await knowledgeBaseLogic.openAcceptedMfr('Part Details');
    });

    it('should check "View Ignored Part Exceptions" filter value, US280236', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(buttonNames.viewIgnoredPartExceptions);
        const acceptedMfrNames: any[] = await grid.newGridReturnCellValuesByColumnName(1,
            columnHeaders.partsKnowledgeBase.all[3]);
        await acceptedMfrNames.forEach(item => expect(item).toBe(''))
    });
});

describe(' Part Knowledge Base export', () => {

    beforeEach(async () => {
        await BeforeAfter.clearCacheCookiesWithLogin(browser.params.userAdminUrl);
    });

    it('should export xls file for  all Parts Knowledge Base', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.checkboxSelector.get(0));
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType = await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.knowledgebase.partsExport,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.knowledgebase.exportPartsByFormat(exportOptions.fileFormat[0]));
    });

    it('should export csv file for selected Parts Knowledge Base', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.checkboxSelector.get(0));
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType = await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.knowledgebase.partsExport,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.knowledgebase.exportPartsByFormat(exportOptions.fileFormat[1]));
    });


    it('should export xls file for selected Parts Knowledge Base', async () => {
        const knowledgebasePartsList: any = await Knowledgebase.getPartsList(user.userAdmin);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.checkboxSelector.get(0));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType = await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.knowledgebase.partsExport,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.knowledgebase.exportPartsByFormByIdList(exportOptions.fileFormat[0],
            [knowledgebasePartsList[0].id.toString()]));
    });

    it('should export csv file for selected Parts Knowledge Base', async () => {
        const knowledgebasePartsList: any = await Knowledgebase.getPartsList(user.userAdmin);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.checkboxSelector.get(0));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType = await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.knowledgebase.partsExport,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.knowledgebase.exportPartsByFormByIdList(exportOptions.fileFormat[1],
            [knowledgebasePartsList[0].id.toString()]));
    });

});
