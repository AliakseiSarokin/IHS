import {browser} from "protractor";
import {buttonNames, linksNames, meganavItems, titles} from "../../../../testData/global";
import {commonElements, dropdownElements, gridElements, pageTitles, viewMfrPref} from "../../../../elements/elements";
import {Dropdown} from "../../../../components/dropdown";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Grid} from "../../../../components/grid";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {Toolbar} from "../../../../components/toolbar";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";

const instructionPanel: InstructionPanel = new InstructionPanel();
const grid: Grid = new Grid();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const partDetailsLogic = new PartDetailsLogic();
const helpLogic: HelpLogic = new HelpLogic();

describe(' CPL Alerts tab ',  () => {

    it ( 'should go to view single bom - cpl alerts' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement('CPL Alerts', gridElements.grid)
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('CPL Alerts');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('CPL alerts');
    });

    it('should have unhide button with dropdown list  - CPL Alerts',  async () => {
        await toolbar.unhideDropdown();
    });

    it('should be filter categories',  async () => {
        await toolbar.removeWithClearAll();
        await browser.sleep(2000);
        const expectedFilterOptions = [ 'All categories', 'Discontinued', 'End of Life (EOL)', 'PCN/PFN', 'Reinstated'];
        await Dropdown.openDropdownByClickOnElement(toolbar.filterCategories);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await Dropdown.closeDropdownByClickOnElement(toolbar.filterCategories);
    });

    it('should select filter categories option and display tag - CPL Alerts',  async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filterCategories);
    });

    it('should display one tag filter categories - CPL Alerts',  async () => {
        await toolbar.checkingTagBust(buttonNames.filterCategories);
    });

    it('should remove filter categories tag with clear all - CPL Alerts',  async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove filter categories tag with X - CPL Alerts',  async () => {
        await browser.sleep(2000);
        await toolbar.removeTagWithX(buttonNames.filterCategories);
    });

    it('should have filter alerts',  async () => {
        let expectedFilterOptions = ['View All Alerts', "View Today's Alerts",
            'View Alerts Last 7 Days', 'View Alerts Last 30 Days', 'View Alerts Last 6 Months', 'View Alerts Last Year' ];
        await Dropdown.openDropdownByClickOnElement(toolbar.filterByDate);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await Dropdown.closeDropdownByClickOnElement(toolbar.filterByDate);
    });

    it ( 'should open export modal - CPL Alerts' , async () => {
        const labels = ['Select which Alerts to include in the Export:',
            'Select Export format:'];
        const options = [ 'Selected Alerts Only', 'All Alerts',
            'Excel Spreadsheet (XLS)', 'Comma-Separated Values (CSV)',
            'Tab-Delimited Text (TXT)'] ;
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toEqual('Export CPL Alerts');
        await modal.exportModalAttributes(labels, options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should export a file - CPL Alerts', async () => {
        await modal.checkingExportFile(buttonNames.export, buttonNames.export,
            gridElements.grid, 'IHS_CPLAlerts.txt')
    });

    it ( 'should open Part Details Modal by clicking on the Match Mfr Part Number link  - CPL Alerts' , async () => {
        await partDetailsLogic.openPartDetModalLinkNewGrid(0,2);
        await modal.closeModalWithXButton();
    });

    it ( 'should open Part Details Modal by clicking on the Match Mfr Name link  - CPL Alerts' , async () => {
        await partDetailsLogic.openPartDetModalLinkAndSetPNNewGrid(0,3, 0,2);
        await modal.closeModalWithXButton();

    });

    it ( 'should open Part Details Modal by clicking on the Alert Type Number link  - CPL Alerts' , async () => {
        await partDetailsLogic.openPartDetModalLinkAndSetPNNewGrid(1,0, 0,2);
        await modal.closeModalWithXButton();
    });
});