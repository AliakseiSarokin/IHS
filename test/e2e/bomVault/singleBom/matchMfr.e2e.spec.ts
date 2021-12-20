import {browser} from "protractor";
import {buttonNames, meganavItems, columnHeaders, modalTitles} from "../../../../testData/global";
import {dropdownElements, gridElements, toolbarElements} from "../../../../elements/elements";
import {cplData} from "../../../../testData/cpl";
import {Button} from "../../../../components/simple/button";
import {CommonMatchingLogic} from "../../../../bussinesLayer/matching/commonMatchingLogic";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Login} from "../../../../components/login";
import {MatchMfrLogic} from "../../../../bussinesLayer/bomVault/matchMfrLogic";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Toolbar} from "../../../../components/toolbar";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {ElementAttributes} from "../../../../utils/elementAttributes";

const button: Button = new Button();
const commonMatchingLogic: CommonMatchingLogic = new CommonMatchingLogic();
const grid: Grid = new Grid();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const matchMfrLogic: MatchMfrLogic = new MatchMfrLogic();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const toolbar: Toolbar = new Toolbar();
const helpLogic: HelpLogic = new HelpLogic();
const elementAttributes: ElementAttributes = new ElementAttributes();

describe('Match Mfrs Tab', () => {

    it('should go to Match Mfr Details',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await matchMfrLogic.goToMatchMfr();
    });

    it('should be filter options, US296605', async () => {
        await grid.newGridOpenFilterBoxByName('Imported Manufacturer Name');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.newGridDropdownInput,
            'value')).toEqual(columnHeaders.bom.filterOptions2[0]);
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.newGridDropdownInput);
        await expect(await gridElements.newGridOpenFilterOptions.getText()).toEqual(columnHeaders.bom.filterOptions2);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be reset options, US274769', async () => {
        await grid.newGridHideColumnsRange(['Imported Manufacturer Name']);
        await button.clickOnTheElementAndWaitNotDisplayed(await toolbarElements.customFilterBadgeXbutton, await toolbarElements.customFilterBadgeXbutton);
        await button.clickByButtonNameAndWait(buttonNames.reset, await toolbarElements.customFilterBadgeXbutton);
        await expect(await gridElements.newGridHeaderByName('Imported Manufacturer Name').isDisplayed()).toBeTruthy();
    });

    it('should be instruction panel with option to hide/unhide - Single BOM Match Mfrs Tab',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Match Manufacturers');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Match manufacturers');
    });

    it("should be pagination controls", async () => {
        await grid.newGridPaginationChecking();
    });

    it('should be correct column headers - Single BOM Match Mfrs Tab',  async () => {
        const lockedTable = [ 'Imported Manufacturer Name', 'Number of Parts' ];
        const unlockedTable = [ 'Matched Manufacturer Name', 'Manufacturer Full Name', 'CAGE Code', 'Match Type',
            'Matched On', 'Manufacturer Support', 'Business Type', 'Manufacturer Web Site'];
        await grid.newGridCheckingColumnHeaders(lockedTable.concat(unlockedTable));
        await toolbar.unhideCellNameWithUnhideAll('Number of Parts');
    });

    it('should be #parts link - CPL Match Mfrs Tab',  async () => {
        await commonMatchingLogic.newGridPartsLinksChecking();
    });

    it('should open the modal by clicking on #parts link, should be modal title',  async () => {
        await commonMatchingLogic.newGridOpenBomPartsModal('BOM Parts Imported for ');
    });

    it('should not be links in the #parts modal grid',  async () => {
        await commonMatchingLogic.notLinksInModalChecking();
    });

    it('should close the modal',  async () => {
        await modal.closeModalWithButton(buttonNames.okay);
        await commonMatchingLogic.newGridOpenBomPartsModal('BOM Parts Imported for ');
        await modal.closeModalWithXButton();
    });

    it('should have unhide button with dropdown list - Single BOM Match Mfrs Tab',  async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column - Single BOM Match Mfrs Tab',  async () => {
        await grid.newGridHideColumnByName('Imported Manufacturer Name');
    });

    it('should unhide the column with Unhide All - Single BOM Match Mfrs Tab',  async () => {
        await toolbar.unhideCellNameWithUnhideAll('Imported Manufacturer Name');
    });

    it('should have filters - Single BOM Match Mfrs Tab',  async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(cplData.matchMfr.filterOptions);
        await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);
    });

    it('should select filter categories option and display tag - Single BOM Match Mfrs Tab',  async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter)
    });

    it('should display one tag filter categories - Single BOM Match Mfrs Tab',  async () => {
        await toolbar.removeWithClearAll();
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove filter categories tag with clear all - Single BOM Match Mfrs Tab',  async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove filter categories tag with X - Single BOM Match Mfrs Tab',  async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });


    it ( 'should open export modal - Match Manufacturers' , async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toEqual('Export Manufacturers');
        const labels = [ 'Select which Manufacturers to include in the Export:', 'Select Export format:'];
        const options =[ 'Selected Manufacturers Only', 'All Manufacturers',
            'Excel Spreadsheet (XLS) - ' +
            'Limited to the first 10,000 rows', 'Comma-Separated Values (CSV)',
            'Tab-Delimited Text (TXT)' ];
        await modal.exportModalAttributes(labels, options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should export a file - Match Manufacturers', async () => {
        await modal.checkingExportFile(buttonNames.export, buttonNames.export,
            gridElements.grid, 'IHS_BOMMfrExceptions.txt')
    });

    it('should open View Suggested matches modal',  async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[4]);
        await commonMatchingLogic.openViewAllSuggestMatchesModal();
    });

    it('should apply View Suggested match and highlight',  async () => {
        await commonMatchingLogic.newGridApplyMatchAndHighlight(buttonNames.applySelectedManufacturerMarch, true);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should display View Suggestion matches in the save changes modal ',  async () => {
        await commonMatchingLogic.newGridsaveChangesForViewSuggestAcceptMatch();
        await modal.closeModalWithXButton();
    });

    it('should undo view suggested matches',  async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for View Suggestion Match',  async () => {
        await commonMatchingLogic.openViewAllSuggestMatchesModal();
        await commonMatchingLogic.newGridApplyMatchAndHighlight(buttonNames.applySelectedManufacturerMarch, true);
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it('should be Manufacurer Infromation',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await matchMfrLogic.goToMatchMfr();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[3]);
        await commonMatchingLogic.newGridManufacurerInformationModalChecking();
    });

    it('should open search for match shade after clicking on the try search link',  async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await browser.waitForAngularEnabled(false);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[5]);
        await browser.waitForAngularEnabled(false);
        await modal.openModalWithElement(await gridElements.newGridCellLinkByRowIndexAndCellNumber(0,2));
        await expect(await modal.modalTitle.getText()).toEqual('Search for Matching Manufacturer(s)')
    });

    //skip test because of the defect with help panel
    xit(" should open help panel and check opened subitem ", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Search for a match');
    });

    it('should highlighted row when save after search for match',  async () => {
        await commonMatchingLogic.searchForMatchTypeAhead();
        await commonMatchingLogic.searchForMatchMfrModalAndHighlight(true);
    });

    it('should display accepted matches in the save changes modal ',  async () => {
        await commonMatchingLogic.newGridsaveChangesForViewSuggestAcceptMatch();
        await modal.closeModalWithXButton();
    });

    it('should undo search for match changes',  async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });


    it('should be leave modal for Search for  Match',  async () => {
        await modal.openModalWithElement(await gridElements.newGridCellLinkByRowIndexAndCellNumber(0,2));
        await commonMatchingLogic.searchForMatchTypeAhead();
        await browser.waitForAngularEnabled(false);
        await commonMatchingLogic.searchForMatchMfrModalAndHighlight(true);
        await browser.waitForAngularEnabled(false);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should be discard changes for Search for  Match',  async () => {
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });


    it('should be active/inactive Accept Match button',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await matchMfrLogic.goToMatchMfr();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[5]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.acceptMatch).isEnabled()).toBeFalsy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[4]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.acceptMatch).isEnabled()).toBeFalsy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[3]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(await button.returnButtonByText(buttonNames.acceptMatch).isEnabled()).toBeTruthy();
    });

    it('should be  Accept Match modal',  async () => {
        await commonMatchingLogic.newGridOpenAcceptMatch();
        await modal.closeModalWithXButton();
        await commonMatchingLogic.newGridOpenAcceptMatch();
        await modal.closeModalWithButton(buttonNames.cancelDoNotAccept);
    });

    it('should accept match and highlight accepted row ',  async () => {
        await commonMatchingLogic.newGridOpenAcceptMatch();
        await commonMatchingLogic.newGridAcceptMatchHighlight(buttonNames.acceptTheseMfrs, true);
    });

    it('should display accepted matches in the save changes modal ',  async () => {
        await commonMatchingLogic.newGridsaveChangesForViewSuggestAcceptMatch();
        await modal.closeModalWithXButton();
    });

    it('should undo accepted changes',  async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for Accept Match',  async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await commonMatchingLogic.newGridOpenAcceptMatch();
        await commonMatchingLogic.newGridAcceptMatchHighlight(buttonNames.acceptTheseMfrs, true);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should be discard changes for Accept Match',  async () => {
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it('should be active/inactive Ignore Match button',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await matchMfrLogic.goToMatchMfr();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[1]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[2]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[3]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[4]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[5]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
    });

    it('should be  Ignore Match modal',  async () => {
        await commonMatchingLogic.newGridOpenIgnoreMatch();
        await modal.closeModalWithXButton();
        await commonMatchingLogic.newGridOpenIgnoreMatch();
        await modal.closeModalWithButton(buttonNames.stopGoBackToTheList);
    });

    it('should accept match and highlight ignored row ',  async () => {
        await commonMatchingLogic.newGridOpenIgnoreMatch();
        await commonMatchingLogic.ignoreMatchHighlight(true);
    });

    it('should display ignored matches in the save changes modal ',  async () => {
        await commonMatchingLogic.newGridSaveChangesForViewSuggestIgnoreMatch();
        await modal.closeModalWithXButton();
    });

    it('should undo ignored changes',  async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for Ignore Match',  async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await commonMatchingLogic.newGridOpenIgnoreMatch();
        await commonMatchingLogic.ignoreMatchHighlight(true);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should be discard changes for Ignore Match',  async () => {
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it('should be active/inactive Search for Match button',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await matchMfrLogic.goToMatchMfr();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[1]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(await button.returnButtonByText(buttonNames.searchForMatch).isEnabled()).toBeTruthy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[2]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(await button.returnButtonByText(buttonNames.searchForMatch).isEnabled()).toBeTruthy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[3]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(await button.returnButtonByText(buttonNames.searchForMatch).isEnabled()).toBeTruthy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[4]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(await button.returnButtonByText(buttonNames.searchForMatch).isEnabled()).toBeTruthy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[5]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(await button.returnButtonByText(buttonNames.searchForMatch).isEnabled()).toBeTruthy();
    });

    it('should open  Search for Match shade',  async () => {
        await modal.openModalWithButtonByName(buttonNames.searchForMatch);

    });

    it('should be highlighted row when save after search for match',  async () => {
        await commonMatchingLogic.searchForMatchTypeAhead();
        await commonMatchingLogic.searchForMatchMfrModalAndHighlight(true);
    });

    it('should undo search for match changes',  async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });


    it('should be leave modal for Search for  Match',  async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithButtonByName(buttonNames.searchForMatch);
        await commonMatchingLogic.searchForMatchTypeAhead();
        await commonMatchingLogic.searchForMatchMfrModalAndHighlight(true);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should be discard changes for Search for  Match',  async () => {
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it ( 'should open research request modal by clicking on the research request button - CPL Match Mfr' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await matchMfrLogic.goToMatchMfr();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[3]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithElement(await toolbar.returnToolbarButtonByValue(buttonNames.resRequest));
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
        await modal.closeModalWithXButton();
    });

    it("should open research request modal, open help panel and check title ", async () => {
        await modal.openModalWithElement(await toolbar.returnToolbarButtonByValue(buttonNames.resRequest));
        await helpLogic.openAndCheckHelpPanelTitle('Research requests');
        await modal.closeModalWithXButton();
    });

    it(" should open help panel and check opened subitem ", async () => {
        await modal.openModalWithElement(await toolbar.returnToolbarButtonByValue(buttonNames.resRequest));
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Submit research requests for specific parts');
        await modal.closeModalWithXButton();
    });

    it('should open multiple research request modal - CPL Match Mfr', async () => {
        await grid.newMechanismCheckboxRangeChecking(1,2);
        await modal.openModalWithElement(await toolbar.returnToolbarButtonByValue(buttonNames.resRequest));
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
        await modal.closeModalWithXButton();
    });

   //skip test because of the defect with help panel
    xit(" should open help panel and check opened subitem ", async () => {
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Submit research requests for multiple parts');
        await modal.closeModalWithXButton();
    });

});