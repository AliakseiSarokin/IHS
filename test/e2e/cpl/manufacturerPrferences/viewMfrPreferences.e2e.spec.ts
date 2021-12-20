import {browser} from "protractor";
import {buttonNames, meganavItems, titles} from "../../../../testData/global";
import {
    commonElements,
    dropdownElements,
    gridElements,
    pageTitles,
    shadeElements,
    viewMfrPref
} from "../../../../elements/elements";
import {Dropdown} from "../../../../components/dropdown";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Shade} from "../../../../components/shade";
import {Toolbar} from "../../../../components/toolbar";
import {TypeAhead} from "../../../../components/typeAhead";
import {ViewMfrPrefLogic} from "../../../../bussinesLayer/cpl/viewMfrPref/viewMfrPrefLogic";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";


const instructionPanel: InstructionPanel = new InstructionPanel();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const typeAhead: TypeAhead = new TypeAhead();
const viewMfrPrefLogic:ViewMfrPrefLogic = new ViewMfrPrefLogic();
const helpLogic: HelpLogic = new HelpLogic();
describe('View Manufacturer Preferences', () => {

    it('should go to View Manufacturer Preferences from Meganav',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewMfrPref, gridElements.checkboxSelector.get(1));
        expect(await pageTitles.pageTitleShim2.getText()).toEqual(titles.viewMfrPref);
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('View Manufacturer Preferences');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Manufacturer Preferences');
    });

    it('should open New Manufacturer shade',  async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Shade.openShadeWithButton(buttonNames.newMfr);
    });

    it('should open help panel and check opened subitem',  async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Add Manufacturer');
    });

    it('should be field labels in New Manufacturer shade',  async () => {
        const expectedLabels =[ 'Imported Manufacturer ID:', 'Matched Manufacturer Name:',
            'Imported Manufacturer Name:' ];
        await expect(await viewMfrPref.mfrPref.fieldLabels.getText()).toEqual(expectedLabels);
    });

    it('should be type ahead in New Manufacturer shade',  async () => {
        await typeAhead.typeAheadChecking(viewMfrPref.mfrPref.matchMfrName, 'test');
    });

    it('should be radio buttons in New Manufacturer shade',  async () => {
        const expectedRadioButtonsLabels:string[] = [ 'Approved', 'Approval Required', 'Not Approved', 'Do Not Use', 'Other' ];
        await expect(await commonElements.radioButtonLabel.getText()).toEqual(expectedRadioButtonsLabels);
    });

    it('should be comments text field for New Manufacturer shade',  async () => {
        await viewMfrPrefLogic.commentsFieldChecking();
    });

    it('should be option to select radio buttons in New Manufacturer shade',  async () => {
        await viewMfrPrefLogic.optionToSelectRadioButtons();
    });

    it('should add New Manufacturer',  async () => {
        await viewMfrPrefLogic.addNewMfr();
    });

    it('should open delete modal',  async () => {
        await toolbar.removeWithClearAll();
        await viewMfrPrefLogic.openDeleteModal();
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.doNotDeleteSelectedItemsButton);
    });

    it('should delete Mfr Pref',  async () => {
        await modal.openModalWithButtonByName(buttonNames.delete);
        await viewMfrPrefLogic.deleteMfrPref();
        await toolbar.removeWithClearAll();
    });

    it('should open Set Preferred shade',  async () => {
        await grid.checkCheckboxRange(1,2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Shade.openShadeWithButton(buttonNames.setPreference);
    });

    it('should open help panel and check opened subitem',  async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('View Manufacturer Preferences');
    });

    it('should be radio buttons for Set Preferred shade',  async () => {
        await viewMfrPrefLogic.optionToSelectRadioButtons();
    });

    it('should be comments text field for Set Preferred shade',  async () => {
        await viewMfrPrefLogic.commentsFieldChecking();
    });

    it('should be leave modal',  async () => {
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await expect(await modal.modalTitle.getText()).toEqual('Discard Change?');
        await modal.closeModalWithXButton();
    });

    it('should set preffered',  async () => {
        await viewMfrPrefLogic.modifyMfr();
    });

    it('should have unhide button with dropdown list  - View Manufacturer Preferences',  async () => {
        await toolbar.unhideDropdown();
    });

    it('should be filters - View Manufacturer Preferences ',  async () => {
        const expectedFilterOptions = [ 'Clear Filter', 'Show matched manufacturers',
            'Show all unmatched manufacturers', 'Show manufacturers with 1 possible match found',
            'Show manufacturers with multiple possible matches found', 'Show manufacturers with no matches' ];
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);
    });

    it('should select option and display tag - View Manufacturer Preferences ',  async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter);
    });

    it('should display one tag - View Manufacturer Preferences ',  async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove tag by clicking on clear all tags link - View Manufacturer Preferences',  async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove tag by clicking on X - View Manufacturer Preferences',  async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it('should be active/inactive Search for Match button',  async () => {
        await viewMfrPrefLogic.searchForMatchButtonChecking();
    });

    it('should open  Search for Match shade',  async () => {
        await Shade.openShadeWithButton(buttonNames.searchForMatch);
        await expect(await shadeElements.shadeTitle.getText()).toEqual('Search for Matching Manufacturer(s)');
    });

    it('should open help panel and check opened subitem',  async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('View Manufacturer Preferences');
    });

    it('should check  Search for Match shade',  async () => {
        await viewMfrPrefLogic.shadeChecking();
    });

    it('should close Search for Match shade',  async () => {
        await Shade.closeShadeWithElement(shadeElements.shadeCancelButton);
    });

    it('should be highlighted row when save after search for match',  async () => {
        await grid.checkCheckboxRangeNewGrid(1,2);
        await Shade.openShadeWithButton(buttonNames.searchForMatch);
        await viewMfrPrefLogic.shadeChecking();
        await viewMfrPrefLogic.highlightAfterSearchChecking();
    });

});