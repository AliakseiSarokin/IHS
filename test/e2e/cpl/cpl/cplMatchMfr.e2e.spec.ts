import {browser} from "protractor";
import {buttonNames, linksNames, meganavItems, modalTitles, titles, tooltips} from "../../../../testData/global";
import {
    commonElements,
    cplElements,
    dropdownElements,
    gridElements, growler,
    matchingElements,
    pageTitles,
    searchElements,
    toolbarElements,
    viewMfrPref
} from "../../../../elements/elements";
import {cplData} from "../../../../testData/cpl";
import {AddCorpPartSliderLogic} from "../../../../bussinesLayer/cpl/cpl/addCorpPartSliderLogic";
import {Button} from "../../../../components/simple/button";
import {CommonMatchingLogic} from "../../../../bussinesLayer/matching/commonMatchingLogic";
import {Dropdown} from "../../../../components/dropdown";
import {CplDetailsLogic} from "../../../../bussinesLayer/cpl/cpl/cplDetailsLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Grid} from "../../../../components/grid";
import {Input} from "../../../../components/simple/input";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {Toolbar} from "../../../../components/toolbar";
import {Shade} from "../../../../components/shade";
import {Slider} from "../../../../components/slider";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {JasmineTimeout} from "../../../../helper/jasmineTimeout";
import {Growlers} from "../../../../components/growlers";
import {kbData} from "../../../../testData/knowledgeBase";
import {CplSearchLogic} from "../../../../bussinesLayer/search/cplSearchLogic";
import {Waiters as w} from "../../../../helper/waiters";

const cplDetailsLogic = new CplDetailsLogic();
const cplSearchLogic = new CplSearchLogic();
new AddCorpPartSliderLogic();
const button: Button = new Button();
const commonMatchingLogic: CommonMatchingLogic = new CommonMatchingLogic();
new CplDetailsLogic();
const elementAttributes: ElementAttributes = new ElementAttributes();
const instructionPanel: InstructionPanel = new InstructionPanel();
const grid: Grid = new Grid();
const input: Input = new Input();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const partDetailsLogic = new PartDetailsLogic();
const slider: Slider = new Slider();
const helpLogic: HelpLogic = new HelpLogic();

describe('CPL Match Mfrs Tab', () => {

    it('should go to CPL Match Mfr Details',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplMatchMfr, gridElements.grid);
    });

    it('should be instruction panel with option to hide/unhide - CPL Match Mfrs Tab',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('CPL Match Manufacturers');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('CPL match manufacturers');
    });

    it('should be correct column headers - CPL Match Mfrs Tab',  async () => {
        const lockedTable = [ 'Imported Mfr Name', '# Parts' ];
        const unlockedTable = [ 'Matched Manufacturer Name', 'Manufacturer Full Name', 'CAGE Code', 'Match Type',
            'Matched On', 'Manufacturer Support','Business Type' ];
        await grid.newGridCheckingLockedColumnHeaders(lockedTable);
        await grid.newGridCheckingUnlockedColumnHeaders(unlockedTable);
    });

    it('should be #parts link - CPL Match Mfrs Tab',  async () => {
        await commonMatchingLogic.partsLinksChecking();
    });

    it('should be presented tooltip for Search for Match button if more than one part is selected, DE111576', async () => {
        await expect(await elementAttributes.getElementAttribute(button.returnButtonByText(buttonNames.searchForMatch), 'title')).toEqual('');
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(await elementAttributes.getElementAttribute(button.returnButtonByText(buttonNames.searchForMatch), 'title')).toEqual('');
        await grid.newMechanismCheckboxRangeChecking(1,2);
        await expect(await elementAttributes.getElementAttribute(button.returnButtonByText(buttonNames.searchForMatch), 'title')).toEqual(tooltips.searchForMatchToolbarButton);
    });

    it('should open the modal by clicking on #parts link, should be modal title',  async () => {
        await commonMatchingLogic.newGridOpenBomPartsModalCPL('CPL Parts Imported for ');
    });

    it('should not be links in the #parts modal grid',  async () => {
        await commonMatchingLogic.notLinksInModalChecking()
    });

    it('should close the modal',  async () => {
        await modal.closeModalWithButton(buttonNames.okay);
        await commonMatchingLogic.newGridOpenBomPartsModalCPL('CPL Parts Imported for ');
        await modal.closeModalWithXButton();
    });

    it('should have filters - CPL Match Mfrs Tab',  async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(cplData.matchMfr.filterOptions);
        await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);
    });

    it('should select filter categories option and display tag - CPL Match Mfrs Tab',  async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter)
    });

    it('should display one tag filter categories - CPL Match Mfrs Tab',  async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove filter categories tag with clear all - CPL Match Mfrs Tab',  async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove filter categories tag with X - CPL Match Mfrs Tab',  async () => {
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

    it('should open export modal - Match Manufacturers, open help panel and check opened subitem',  async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Export matches');
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should export a file - Match Manufacturers', async () => {
        await modal.checkingExportFile(buttonNames.export, buttonNames.export, gridElements.grid,
            'IHS_CPLManufacturers.txt');
    });

    it('should open View Suggested matches modal',  async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[4]);
        await commonMatchingLogic.openViewAllSuggestMatchesShade();
});

    it('should apply View Suggested match and highlight',  async () => {
        await commonMatchingLogic.newGridApplyMatchAndHighlight(buttonNames.applySelectedManufacturerMarch,false);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should display View Suggestion matches in the save changes modal ',  async () => {
       await commonMatchingLogic.newGridSaveChangesForViewSuggestAcceptMatch();
       await modal.closeModalWithXButton();
    });

    it("should be warning modal on leaving CPL match manufacturers page, US275243", async () => {
        await modal.openModalWithLinkName(meganavItems.home);
        await expect(await modal.modalTitle.getText()).toEqual('Leave this page?');
        await expect(await modal.modalBody.getText()).toContain('You have accepted matches but have not saved them yet. Are you sure you want to leave without saving your changes?');
        await modal.closeModalWithXButton();
        await modal.openModalWithLinkName(meganavItems.home);
        await modal.closeModalWithButton(buttonNames.returnToMatching)
    });

    it('should undo view suggested matches',  async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for View Suggestion Match',  async () => {
        await commonMatchingLogic.openViewAllSuggestMatchesShade();
        await commonMatchingLogic.newGridApplyMatchAndHighlight(buttonNames.applySelectedManufacturerMarch, false);
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it('should be Manufacturer Information',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplMatchMfr, gridElements.grid);
        await commonMatchingLogic.manufacurerInformationModalChecking();
    });

    it('should open search for match shade after clicking on the try search link',  async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[5]);
        await Shade.openShadeWithLinkByRow(cplData.noMatchesTry);
    });

    it('should highlighted row when save after search for match',  async () => {
        await commonMatchingLogic.searchForMatchTypeAhead();
        await commonMatchingLogic.searchForMatchAndHighlight();
    });

    it('should display accepted matches in the save changes modal ',  async () => {
        await commonMatchingLogic.newGridSaveChangesForViewSuggestAcceptMatch();
        await modal.closeModalWithXButton();
    });

    it('should undo search for match changes',  async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for Search for  Match',  async () => {
        await Shade.openShadeWithLinkByRow(cplData.noMatchesTry);
        await commonMatchingLogic.searchForMatchTypeAhead();
        await commonMatchingLogic.searchForMatchAndHighlight();
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should be discard changes for Search for  Match',  async () => {
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it('should be active/inactive Accept Match button',  async () => {
        await modal.closeModalIfPresent();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplMatchMfr, gridElements.newGridCheckboxSelector.get(1));
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[5],
            gridElements.newGridCheckboxSelector.get(0));
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.acceptMatch).isEnabled()).toBeFalsy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[4],
            gridElements.newGridCheckboxSelector.get(0));
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.acceptMatch).isEnabled()).toBeFalsy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[3],
            gridElements.newGridCheckboxSelector.get(0));
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.acceptMatch).isEnabled()).toBeTruthy();
    });

    it('should be  Accept Match modal',  async () => {
        await commonMatchingLogic.newGridOpenAcceptMatchCpl();
        await modal.closeModalWithXButton();
        await commonMatchingLogic.newGridOpenAcceptMatchCpl();
        await modal.closeModalWithButton(buttonNames.cancelDoNotAccept);
    });

    it('should accept match and highlight accepted row ',  async () => {
        await commonMatchingLogic.newGridOpenAcceptMatchCpl();
        await commonMatchingLogic.newGridAcceptMatchHighlight(buttonNames.acceptTheseMfrs, false);
    });

    it('should display accepted matches in the save changes modal ',  async () => {
        await commonMatchingLogic.newGridSaveChangesForViewSuggestAcceptMatch();
        await modal.closeModalWithXButton();
    });

    it('should undo accepted changes',  async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for Accept Match',  async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await commonMatchingLogic.newGridOpenAcceptMatchCpl();
        await commonMatchingLogic.newGridAcceptMatchHighlight(buttonNames.acceptTheseMfrs, false);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should be discard changes for Accept Match',  async () => {
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it('should be active/inactive Ignore Match button',  async () => {
        await modal.closeModalIfPresent();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplMatchMfr, gridElements.grid);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[1]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
        //temp
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[2]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
        //temp
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[3]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
        //temp
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[4]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
        //temp
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[5]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
    });

    it('should be Ignore Match modal',  async () => {
        await commonMatchingLogic.newGridOpenIgnoreMatchCpl();
        await modal.closeModalWithXButton();
        await commonMatchingLogic.newGridOpenIgnoreMatchCpl();
        await modal.closeModalWithButton(buttonNames.stopGoBackToTheList);
    });

    it('should accept match and highlight ignored row ',  async () => {
        await commonMatchingLogic.newGridOpenIgnoreMatchCpl();
        await commonMatchingLogic.newGridIgnoreMatchHighlight(false);
    });

    it('should display ignored matches in the save changes modal ',  async () => {
        await commonMatchingLogic.newGridSaveChangesForViewSuggestIgnoreMatchCpl();
        await modal.closeModalWithXButton();
    });

    it('should undo ignored changes',  async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for Ignore Match',  async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await commonMatchingLogic.newGridOpenIgnoreMatchCpl();
        await commonMatchingLogic.newGridIgnoreMatchHighlight(false);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should be discard changes for Ignore Match',  async () => {
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it('should be active/inactive Search for Match button',  async () => {
        await modal.closeModalIfPresent();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplMatchMfr, gridElements.grid);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[1]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.searchForMatch).isEnabled()).toBeTruthy();
        //temp
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[2]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.searchForMatch).isEnabled()).toBeTruthy();
        //temp
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[3]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.searchForMatch).isEnabled()).toBeTruthy();
        //temp
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[4]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.searchForMatch).isEnabled()).toBeTruthy();
        //temp
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[5]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.searchForMatch).isEnabled()).toBeTruthy();
    });

    it('should open  Search for Match shade',  async () => {
        await Shade.openShadeWithButton(buttonNames.searchForMatch);
    });

    it('should be highlighted row when save after search for match',  async () => {
        await commonMatchingLogic.searchForMatchTypeAhead();
        await commonMatchingLogic.searchForMatchAndHighlight();
    });

    it('should undo search for match changes',  async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for Search for  Match',  async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await Shade.openShadeWithButton(buttonNames.searchForMatch);
        await commonMatchingLogic.searchForMatchTypeAhead();
        await commonMatchingLogic.searchForMatchAndHighlight();
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should be discard changes for Search for  Match',  async () => {
       await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it ( 'should open research request modal by clicking on the research request button - CPL Match Mfr' , async () => {
        await modal.closeModalIfPresent();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplMatchMfr, gridElements.checkboxSelector.get(0));
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[3], gridElements.checkboxSelector.get(1));
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
        await modal.closeModalWithXButton();
    });

    it("should open research request modal, open help panel and check opened subitem", async () => {
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Submit research requests for specific parts');
        await modal.closeModalWithXButton();
    });

    it('should open multiple research request modal - CPL Match Mfr', async () => {
        await grid.newMechanismCheckboxRangeChecking(1,2);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
        await modal.closeModalWithXButton();
    });

    it('should be retained applied column filters after closing "View all suggested Manufacturers" shade, DE124603 ',  async () => {
        await modal.closeModalIfPresent();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplMatchMfr, gridElements.grid);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[5]);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'Imported Mfr Name',
            false);
        const filteringTerms: string = (await grid.newGridReturnCellValuesByColumnName(0,
            'Imported Mfr Name'))[0].slice(0, 2);
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await input.fillFieldWithValue(gridElements.columnsSort.input, filteringTerms);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'Imported Mfr Name',
            true);
        await Shade.openShadeWithLinkByRow(cplData.noMatchesTry);
        await modal.closeModalWithButton('Cancel');
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.input, 'value'))
            .toEqual(filteringTerms);
        await grid.newGridCloseFilterBoxIfPresent();
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'Imported Mfr Name',
            true);
    });
});

describe('Verify CPL Matched Manufacturers are updated once user deletes manufacturer from Knowledge base, Defect 222140', () => {

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(920000);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await w.waitUntilWorkingModalNotDisplayed();
        Growlers.muteGrowlersNotifications(false);
    });

    afterAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
        Growlers.muteGrowlersNotifications(true);
    });
    let ImportedMfrN:string;

    it('should go CPL Match Mfrs, search for a match and save changes and reprocess the CPL', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplMatchMfr, gridElements.grid);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await Shade.openShadeWithButton(buttonNames.searchForMatch);
        await commonMatchingLogic.searchForMatchTypeAhead();
        await commonMatchingLogic.searchForMatchAndHighlight();
        ImportedMfrN = (await grid.newGridReturnCellValuesByColumnName(0,
            'Imported Mfr Name'))[0].slice(0, 7);

        await modal.openModalWithButtonByName(buttonNames.saveChanges);
        await modal.closeModalWithButton(buttonNames.confirmAllChangesAndReprocessTheCPL);
        await Growlers.waitUntilCPLGrowlerIsReady();

        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl, meganavItems.cplSublinks.cplMatchMfr, gridElements.grid);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[1], gridElements.checkboxSelector.get(1));
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await input.fillFieldWithValue(gridElements.columnsSort.input, ImportedMfrN);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'Imported Mfr Name',
            true);
        expect(await grid.newGridReturnCellValuesByColumnName(1,
            'Match Type')).toContain('KB')

    });

    it('should go KB delete the last accepted match and verify same is reflected in CPL ', async () => {

        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.mfrKnowledgeBase, gridElements.checkboxSelector.get(1));
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(kbData.mfrFilters[3], gridElements.checkboxSelector.get(1));
        await expect((toolbarElements.tagByName(kbData.mfrFilters[3])).isDisplayed()).toBeTruthy();
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await button.clickByButtonNameAndWait(buttonNames.yesDeleteSelectedItems, gridElements.gridWrapper);

        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.grid);

        await cplDetailsLogic.reprocessCplWithoutWaitingForProcessedStatus();
        await Growlers.waitUntilCPLGrowlerIsReady();

        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl, meganavItems.cplSublinks.cplMatchMfr, gridElements.grid);
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await input.fillFieldWithValue(gridElements.columnsSort.input, ImportedMfrN);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'Imported Mfr Name',
            true);
        expect(await grid.newGridReturnCellValuesByColumnName(1,
            'Match Type')).not.toContain('KB')

    });

});