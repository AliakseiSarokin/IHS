import {browser} from "protractor";
import {buttonNames, meganavItems, columnHeaders, modalTitles} from "../../../../testData/global";
import {
    bomElements, commonElements, dropdownElements, gridElements,
    partDetailsElements
} from "../../../../elements/elements";
import {Grid} from "../../../../components/grid";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {MultiSelectDropdown} from "../../../../components/multiSelectDropdown";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {RadioButtonDropdown} from "../../../../components/radioButtonDropdown";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Toolbar} from "../../../../components/toolbar";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {AlertsByIdSlderLogic} from "../../../../bussinesLayer/alerts/alertsByIdSlderLogic";
import {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic"
import {JasmineTimeout} from "./../../../../helper/jasmineTimeout"
import {AmlLogic} from "../../../../bussinesLayer/bomVault/amlLogic";


const bomTreeLogic:BomTreeLogic = new BomTreeLogic();
const alertsByIdSlderLogic:AlertsByIdSlderLogic = new AlertsByIdSlderLogic();
const grid: Grid = new Grid();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const link: Link = new Link();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const multiSelectDropdown: MultiSelectDropdown = new MultiSelectDropdown();
const partDetailsLogic: PartDetailsLogic = new PartDetailsLogic();
const radioButtonDropdown: RadioButtonDropdown = new RadioButtonDropdown();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();
const helpLogic: HelpLogic = new HelpLogic();
const amlLogic: AmlLogic = new AmlLogic();

describe(' Part Alerts tab ',  () => {

    it ( 'should go to view single bom - part alerts' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0));
        await singleBomLogic.openSingleBomByName('AML_IPN_ON');
        await link.clickOnTheLinkByNameAndWaitForElement('Part Alerts', gridElements.newGridCheckboxSelectorByIndex(0))
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Part Alerts');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('View Alerts by BOM');
    });

    it('should be tag label for columns filtering - sort A to Z ',  async () => {
        await grid.newGridOpenFilterBoxByName('Internal P/N');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
    });

    it('should remove filtering with clear all',  async () => {
        await toolbar.clearFilteringWithClearAll();
    });

    it('should be tag label for columns filtering - sort Z to A',  async () => {
        await grid.newGridOpenFilterBoxByName('Internal P/N');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.last());
    });

    it('should remove filtering with clear all X',  async () => {
        await toolbar.clearFilteringWithX();
    });

    it('should be column headers for Part Alerts',  async () => {
        const lockColumnHeader = ['Internal P/N', 'LC Risk', 'AML Risk', 'Matched P/N',
            'Matched Mfr'];
        await grid.newGridCheckingLockedColumnHeaders(lockColumnHeader);
    });

    it('should be pagination attributes',  async () => {
        await grid.newGridPaginationCheckingInPanel();
    });

    it('should be option to go to Last and First Pages',  async () => {
        await grid.goToLastFirstPages();
    });


    it('should be filter categories',  async () => {
        const expectedFilterOptions:string[] = [ 'All categories', 'Discontinued', 'End of Life (EOL)', 'PCN/PFN', 'Reinstated'];
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filterCategories);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.filterCategories);
    });

    it('should select filter categories option and display tag - Part Alerts',  async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filterCategories);
    });

    it('should display one tag filter categories - Part Alerts',  async () => {
        await toolbar.checkingTagBust(buttonNames.filterCategories);
    });

    it('should remove filter categories tag with clear all - Part Alerts',  async () => {
        await toolbar.removeWithClearAll();

    });

    it('should remove filter categories tag with X - Part Alerts',  async () => {
        await browser.sleep(2000);
        await toolbar.removeTagWithX(buttonNames.filterCategories);
    });

    it('should have filter alerts',  async () => {
        let expectedFilterOptions:string[] = ['View All Alerts', "View Today's Alerts",
            'View Alerts Last 7 Days', 'View Alerts Last 30 Days', 'View Alerts Last 6 Months', 'View Alerts Last Year' ];
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filterAlerts);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.filterAlerts);
    });

    it('should select filter categories option and display tag Filter Alerts- Part Alerts',  async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filterAlerts);
        await toolbar.removeWithClearAll();

    });

    it('should have be Filter by Status',  async () => {
        await browser.sleep(2000);
        const filterByTypeOptions:string[] =['New', 'Open' , 'Reviewed', 'Archived'];
        await multiSelectDropdown.openMultiSelectDropdownByName(buttonNames.filterByStatus);
        await expect(await partDetailsElements.filterCheckboxLabel.getText()).toEqual(filterByTypeOptions);
        await multiSelectDropdown.closeMultiSelectDropdownByName(buttonNames.filterByStatus);
    });


    it('should be active inactive Apply button in the  Filter by Status',  async () => {
        await multiSelectDropdown.openMultiSelectDropdownByName(buttonNames.filterByStatus);
        await multiSelectDropdown.applyButtonChecking()
    });

    it('should apply filter with one value  Filter by Type',  async () => {
        await multiSelectDropdown.singleSelection(buttonNames.filterByStatus, bomElements.partAlerts.alertStatusCells);
    });

    it('should select several values and apply filter by status',  async () => {
        await multiSelectDropdown.openMultiSelectDropdownByName(buttonNames.filterByStatus);
        await multiSelectDropdown.multipleFilterChecking(buttonNames.filterByStatus);
    });


    it ( 'should be Set Alert Status dropdwon with values - Part Alerts' , async () => {
        await toolbar.removeWithClearAll();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        const filterByTypeOptions:string[] =['New', 'Open' , 'Reviewed', 'Archived'];
        await radioButtonDropdown.openSetAlertStatusDropDown();
        await expect(await commonElements.radioButtonLabel.getText()).toEqual(filterByTypeOptions);
        await radioButtonDropdown.closeSetAlertStatusDropDown();
    });

    it ( 'should be active inactive Apply Alert Sstatus Button - Part Alerts' , async () => {
        await radioButtonDropdown.openSetAlertStatusDropDown();
        await radioButtonDropdown.applyButtonChecking()
    });

    it ( 'should close confirm modal - Part Alerts' , async () => {
        await modal.openModalWithButtonByName(buttonNames.applyAlertStatus);
        await expect(await modal.modalTitle.getText()).toEqual('Confirm Alert Status Change');
        await expect(await modal.modalBody.getText())
            .toEqual('Are you sure that you want to change the status of the 1 selected alert(s)?');
        await modal.closeModalWithXButton();
        await radioButtonDropdown.openSetAlertStatusDropDown();
        await radioButtonDropdown.applyButtonChecking();
        await modal.openModalWithButtonByName(buttonNames.applyAlertStatus);
        await modal.closeModalWithButton(buttonNames.cancel);
    });


    it ( 'should apply part to selected status - Part Alerts' , async () => {
        await radioButtonDropdown.openSetAlertStatusDropDown();
        await radioButtonDropdown.setStatus('Archived', gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0));
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await radioButtonDropdown.openSetAlertStatusDropDown();
        await radioButtonDropdown.setStatus('Open',  gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0));
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await radioButtonDropdown.openSetAlertStatusDropDown();
        await radioButtonDropdown.setStatus('Reviewed',  gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0));
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await radioButtonDropdown.openSetAlertStatusDropDown();
        await radioButtonDropdown.setStatus('New',  gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0));
    });

    it ( 'should open/close export modal - Part Alerts' , async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toEqual('Export Part Alerts');
        const labels:string[] = ['Select which Alerts to include in the Export:',
            'Select Export format:'];
        const options:string[] = ['Selected Alerts Only', 'All Alerts',
            'Excel Spreadsheet (XLS) - ' +
            'Limited to the first 10,000 rows', 'Comma-Separated Values (CSV)',
            'Tab-Delimited Text (TXT)'];
        await modal.exportModalAttributes(labels, options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });


    it ( 'should export a file - Part Alerts' , async () => {
        await modal.checkingExportFile(buttonNames.export, buttonNames.export , gridElements.grid,
            'IHS_BOMAlertDetails.txt');
    });

    it ( 'should open research request modal by clicking on the research request button - Part Alerts' , async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
        await modal.closeModalWithXButton();
    });

    it('should open multiple research request modal - Part Alerts', async () => {
        await grid.newMechanismCheckboxRangeChecking(1,2);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
        await modal.closeModalWithXButton();
    });

    it ( 'should open Risk Modal  - Part Alerts' , async () => {
        await grid.openRiskModal(0,1);
    });

    it ( 'should open Part Details Modal by clicking on the Match Mfr Part Number link  - Part Alerts' , async () => {
        await partDetailsLogic.openPartDetModalLinkNewGrid(0,3);
        await modal.closeModalWithXButton();
    });

    it ( 'should open Part Details Modal by clicking on the Match Mfr Name link  - Part Alerts' , async () => {
        await partDetailsLogic.openPartDetModalLinkAndSetPNNewGrid(0,4,0,3);
        await modal.closeModalWithXButton();
    });

    it ( 'should open Part Details Modal by clicking on the Alert Type Number link  - Part Alerts' , async () => {
        await partDetailsLogic.openPartDetModalLinkAndSetPNNewGrid(1,1,0,3);
        await modal.closeModalWithXButton();
    });

});

// defect is not fixed
describe("DE126586 - IPN Hyperlink not working in View Single BOM Part Alerts",()=> {

    it('should open AML modal by clicking on the IPN link - BOM Part Alerts', async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0));
        await singleBomLogic.openSingleBomByName('AML_IPN_ON');
        await link.clickOnTheLinkByNameAndWaitForElement('Part Alerts', gridElements.newGridCheckboxSelectorByIndex(0));
        await amlLogic.openAmlModalPN();
    });

    it('should be subtitle for AML modal - BOM Part Alerts', async () => {
        await amlLogic.amlModalSubtitle();
    });

    it('should have exect column headers for AML modal - BOM Part Alerts', async () => {
        await amlLogic.rightColumnHeaders();
    });

    it('should have tooltips for attributes AML modal - BOM Part Alerts', async () => {
        await amlLogic.tooltipsChecking();
    });

    it('should close AML modal - BOM Part Alerts', async () => {
        await modal.closeModalWithXButton();
        await amlLogic.openAmlModalPN();
        await modal.closeModalWithButton(buttonNames.close);
    });
});

//DE120145
describe('Alert Navigation from bomTree',async ()=>{

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(300000);
    });

    afterAll(async() => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it('Verify the user is navigated to the required alert when clicked on alert link',async() =>{

        const FilterOptions:string[] = [ 'Discontinued', 'End of Life (EOL)', 'PCN/PFN', 'Reinstated'];
        const clickOnLink:string[] = ['Part Status Change','End of Life Notice','Product Change Notice','Part Status Change']
        const ExpectedAlertType:string[] = ['PSC','EOL','PCN','PSC']

        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,meganavItems.bomsSubItems.bomTree, gridElements.grid);
        await bomTreeLogic.expandFolderBomTreeWithName('AUTOMATION_FOLDER_DO_NOT_DELETE_1_1_1');
        await singleBomLogic.openSingleBomByName('Automation_BOM');
        await link.clickOnTheLinkByNameAndWaitForElement('Part Alerts', await gridElements.newGridCheckboxSelectorByIndex(0))

        for(let i:number=0;i<FilterOptions.length;i++) {
            await toolbar.openToolbarDropdownByButtonName(buttonNames.filterCategories);
            await link.clickOnTheLinkByNameAndWaitForElement(FilterOptions[i], await gridElements.newGridCheckboxSelectorByIndex(0));
            await link.clickOnTheLinksByNameAndIndex(clickOnLink[i], 0);
            await alertsByIdSlderLogic.verifyAlertTabIsOpened(ExpectedAlertType[i]);
            await modal.closeModalWithXButton();
        }
    })

});