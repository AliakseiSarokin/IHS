import {browser} from "protractor";
import {buttonNames, meganavItems, columnHeaders} from "../../../../testData/global";
import {dropdownElements, gridElements} from "../../../../elements/elements";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Toolbar} from "../../../../components/toolbar";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {AddAPartLogic} from "../../../../bussinesLayer/bomVault/addAPartLogic";

const addAPartLogic = new AddAPartLogic();
const grid: Grid = new Grid();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const link: Link = new Link();
const meganav: Meganav = new Meganav();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();
const helpLogic: HelpLogic = new HelpLogic();

describe('Change History State ', () => {

    it ( 'should go to view single bom - Change History' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openSingleBomByName('Automation_BOM');
        await link.clickOnTheLinkByNameAndWaitForElement('Change History', gridElements.newGridRows.get(1));
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Change history');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Change History');
    });

    it('should be column headers',  async () => {
        await grid.newGridCheckingColumnHeaders(columnHeaders.bom.changeHistoryTab.columns);
        await toolbar.unhideCellNameWithUnhideAll('Operation');
    });

    it('should be pagination attributes',  async () => {
        await grid.newGridPaginationChecking();
    });

    it('should be option to go to Last and First Pages',  async () => {
        await grid.goToLastFirstPages();
    });

    it('should be pagination',  async () => {
        await grid.newGridPaginationChecking();
    });

    it('should be filters - Change History',  async () => {
        const expectedFilterOptions = [ 'Show All Changes', 'Show Edits', 'Show Adds', 'Show Deletes'];
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);
    });

    it('should select filter categories option and display tag - Change History',  async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter)
    });

    it('should display one tag filter categories - Change History',  async () => {
        await toolbar.removeWithClearAll();
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove filter categories tag with clear all - Change History',  async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove filter categories tag with X - Change History',  async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it ( 'should export a file - Change History' , async () => {
        // await modal.checkingExportFile(buttons.exportButton, 'nothing',
        //     elements.grid, exportOptions.bom.workspaceBOMs.fileName);
    });

});


describe('Change History tab should reflect proper date for change in part, Defect 369141', () => {

    it('should go to view single bom - and add a part to BOM, the added details must reflect in change history tab with date', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openSingleBomByName('Automation_BOM');
        await addAPartLogic.addAPart();
        await link.clickOnTheLinkByNameAndWaitForElement('Change History', gridElements.newGridRows.get(1));
        let dateArray:string[] = await grid.returnCellValuesByColumnName(1,'Date/Time');
        let date:Date = new Date();
        expect(dateArray[0]).toContain(date.getDate().toString());
        await link.clickOnTheLinkByNameAndWaitForElement('BOM Details', gridElements.newGridRows.get(0));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await addAPartLogic.deleteAPart();
    });
});
