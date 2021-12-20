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

describe('CPL Change History Tab ', () => {

    it('should go to view single bom - CPL Change History', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.grid);
        await link.clickOnTheLinkByNameAndWaitForElement('Change History', gridElements.newGridRows.last());
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('CPL Change History');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('View CPL Change History');
    });

    it('should be column headers', async () => {
        const epxetedColumns = ['Date/Time', 'Corp P/N', 'Corp Name', 'Mfr P/N', 'Mfr Name',
            'Operation', 'Changed By', 'Change Description'];
        await grid.newGridCheckingUnlockedColumnHeaders(epxetedColumns);
    });

    it('should not be column sorting', async () => {
        await grid.notBeSortingPartDetails();
    });

    it('should be pagination', async () => {
        await grid.newGridPaginationCheckingInPanel();
    });

    it('should be filters - CPL Change History', async () => {
        const expectedFilterOptions = ['Show All Changes', 'Show Edits', 'Show Adds', 'Show Deletes'];
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);
    });

    it('should select filter categories option and display tag - Change History', async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter)
    });

    it('should display one tag filter categories - Change History', async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove filter categories tag with clear all - Change History', async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove filter categories tag with X - Change History', async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it('should export a file - CPL Change History', async () => {
        await modal.checkingExportFile(buttonNames.export, 'nothing',
            gridElements.gridWrapper, 'CPL_change_history.txt');
    });

});
