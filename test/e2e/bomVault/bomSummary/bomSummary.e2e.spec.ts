import {
    buttonNames, columnHeaders, meganavItems, modalTitles, titles, exportOptions
} from "../../../../testData/global";
import {dropdownElements, gridElements, pageTitles} from "../../../../elements/elements";
import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";
import {Button} from "../../../../components/simple/button";
import {browser} from "protractor";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Toolbar} from "../../../../components/toolbar";
import {GetPerformanceLogs} from "../../../../utils/getPerformanceLogs";
import {IRequestInfoType} from "../../../../testData/getPerformLogsInterfaces";
import {StringArray} from "../../../../utils/stringArray";
import {endpoints} from "../../../../api/testData/endpointList";
import {requestBody} from "../../../../api/testData/bodyList";
import {Boms} from "../../../../api/logicLayer/boms";
import {user} from "../../../../api/testData/global";
import {BeforeAfter} from "../../../../helper/beforeAfter";

const bomVaultLogic: BomVaultLogic = new BomVaultLogic();
const button: Button = new Button;
const grid = new Grid();
const helpLogic: HelpLogic = new HelpLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();

describe('BOM Summary', () => {

    it('should go to BOM Summary', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.grid);
        await expect(await pageTitles.pageTitle.getText()).toEqual(titles.bomSummary);
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking(titles.bomSummary);
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('View BOM Summary');
    });

    it('should have locked column headers', async () => {
        await grid.newGridCheckingLockedColumnHeaders(columnHeaders.bom.bomSummary.columns);
    });

    it('should have add button with dropdown list', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(button.returnButtonByText(buttonNames.addToWorksapce).isDisplayed()).toBeTruthy();
    });

    it('should have unhide button with dropdown list', async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column', async () => {
        await grid.newGridHideColumnByName(columnHeaders.bom.bomSummary.columns[0]);
        await toolbar.displayHiddenColumnInDropdonwToolbar(columnHeaders.bom.bomSummary.columns[0])
    });

    it('should unhide the column with Unhode All', async () => {
        await toolbar.unhideCellNameWithUnhideAll(columnHeaders.bom.bomSummary.columns[0]);
    });

    it('should have filters', async () => {
        const expectedFilterOptions = ['Clear Filter', 'View Only My BOMs', 'View BOMs Imported/Modified Today',
            'View BOMs Imported/Modified Yesterday', 'View BOMs Imported/Modified in the Last 7 days',
            'View BOMS that have not been modified in the last 30 days',
            'View BOMs that have not been modified in the last 60 days',
            'View Only BOMs that Have Been Edited (History)', 'View Only BOMs with Part Exceptions',
            'View Only BOMs with Manufacturer Exceptions'];
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);
    });

    it('should select option and display tag', async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter)
    });

    it('should display one tag', async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove tag by clicking on clear all tags link', async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove tag by clicking on X', async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it('should open export modal', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.exportBoms);
        await modal.closeModalWithButton(buttonNames.cancel);
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithXButton();
    });

    it('should go to Generate Report Page without selecting files', async () => {
        await bomVaultLogic.goToGenerateReportWithoutSelecting();
    });

    it('should go to generate a report page when select a bom and click on the gen rep button', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.checkboxSelector.get(1));
        await bomVaultLogic.goToGenerateReportPage();
    });

    it('should go to generate a report page when select several boms and click on the gen rep button', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.checkboxSelector.get(1));
        await bomVaultLogic.goToGenerateReportPageMultipleSelection();
    });

    it('should open, close reprocess modal', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.checkboxSelector.get(1));
        await bomVaultLogic.reprocessModalChecking();
    });

    it('should open, close delete  modal', async () => {
        await bomVaultLogic.deleteModalChecking();
    });

    it("should open delete modal, open help panel and check opened subitem", async () => {
        await grid.newMechanismCheckboxRangeChecking(0, 2);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Delete BOMs');
    });
});

describe('BOM Summary export', () => {
    afterEach(async () =>{
        await BeforeAfter.clearCacheCookiesWithLogin(browser.params.userAdminUrl);
    });

    it("should export file with all BOMs for BOM Summary", async ()=>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridCheckboxSelectorByIndex(1));
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.boms.export, 'POST');
        await expect(requestData.postData).toEqual(requestBody.boms.bomSummaryAllExportBody);
    });

    it("should export file with selected BOMs for BOM Summary", async ()=>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridCheckboxSelectorByIndex(1));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        const bomNameArray: string[] = await grid.newGridReturnCellValuesByColumnName(0, 'BOM Name');
        const bomName: string = bomNameArray[0];
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.export);
        //currently all types are any
        const reqArr:any = await GetPerformanceLogs.getRequestData();
        const singleBom:any = await Boms.returnSingleBomByKeyValue(user.groupAdmin, 'BM_BOM_NAME', bomName);
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.boms.export, 'POST');
        await expect(requestData.postData).toEqual(requestBody.boms.bomSummaryExportBodyById(singleBom[0].id.toString()));
    });
});
