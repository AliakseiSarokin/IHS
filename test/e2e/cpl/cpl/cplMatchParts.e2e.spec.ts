import {browser} from "protractor";
import {buttonNames, meganavItems, modalTitles, tooltips, columnHeaders} from "../../../../testData/global";
import {
    dropdownElements,
    gridElements,
    matchingElements,
    searchElements,
    toolbarElements
} from "../../../../elements/elements";
import {cplData} from "../../../../testData/cpl";
import {Button} from "../../../../components/simple/button";
import {CommonMatchingLogic} from "../../../../bussinesLayer/matching/commonMatchingLogic";
import {Dropdown} from "../../../../components/dropdown";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Grid} from "../../../../components/grid";
import {Input} from "../../../../components/simple/input";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {Toolbar} from "../../../../components/toolbar";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {kbData} from "../../../../testData/knowledgeBase";
import {JasmineTimeout} from "../../../../helper/jasmineTimeout";
import {Growlers} from "../../../../components/growlers";
import {CplSearchLogic} from "../../../../bussinesLayer/search/cplSearchLogic";
import {CplDetailsLogic} from "../../../../bussinesLayer/cpl/cpl/cplDetailsLogic";
import {Waiters as w} from "../../../../helper/waiters";

const cplDetailsLogic = new CplDetailsLogic();
const cplSearchLogic = new CplSearchLogic();
const button: Button = new Button();
const commonMatchingLogic: CommonMatchingLogic = new CommonMatchingLogic();
const elementAttributes: ElementAttributes = new ElementAttributes();
const instructionPanel: InstructionPanel = new InstructionPanel();
const grid: Grid = new Grid();
const input: Input = new Input();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const partDetailsLogic = new PartDetailsLogic();
const helpLogic: HelpLogic = new HelpLogic();

describe('CPL Match Parts tab ', () => {

    it('should go CPL Match Parts', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplMatchParts, gridElements.grid);
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('CPL Match Parts');
    });

    it('should be presented tooltip for Search for Match button if more than one part is selected, DE111576', async () => {
        await expect(await elementAttributes.getElementAttribute(button.returnButtonByText(buttonNames.searchForMatch), 'title')).toEqual('');
        await grid.checkCheckboxRangeNewGrid(0, 1);
        await expect(await elementAttributes.getElementAttribute(button.returnButtonByText(buttonNames.searchForMatch), 'title')).toEqual('');
        await grid.checkCheckboxRangeNewGrid(1, 2);
        await expect(await elementAttributes.getElementAttribute(button.returnButtonByText(buttonNames.searchForMatch), 'title')).toEqual(tooltips.searchForMatchToolbarButton);
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('CPL match parts');
    });

    it('should be ASC sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Imported Manufacturer Part');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 0,
            'Imported Manufacturer Part', true);
    });

    it('should remove filtering with clear all', async () => {
        await toolbar.clearFilteringWithClearAll();
    });

    it('should be DESC sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Imported Manufacturer Part');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[2], gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 0,
            'Imported Manufacturer Part', true);
    });

    it('should remove filtering with clear all X', async () => {
        await toolbar.clearFilteringWithX();
    });

    it('should have unhide button with dropdown list  - c Match Parts', async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column -  CPL Match Parts', async () => {
        await grid.newGridHideColumnByName('Imported Manufacturer Part');

    });

    it('should unhide the column with Unhode All - CPL Match Parts', async () => {
        await toolbar.unhideCellNameWithUnhideAll('Imported Manufacturer Part');
    });

    it('should be filters - CPL Match Parts', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(cplData.matchParts.filterOptions);
        await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);
    });

    it('should select filter categories option and display tag - CPL Match Parts', async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter)
    });

    it('should display one tag filter categories - CPL Match Parts', async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove filter categories tag with clear all - CPL Match Parts', async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove filter categories tag with X - CPL Match Parts', async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it('should open/close export modal - CPL Match Parts', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toEqual('Export Parts');
        const labels = ['Select which Parts to include in the Export:', 'Select Export format:'];
        const options = ['Selected Parts Only', 'All Parts', 'Excel Spreadsheet (XLS) - ' +
        'Limited to the first 10,000 rows', 'Comma-Separated Values (CSV)',
            'Tab-Delimited Text (TXT)'];
        await modal.exportModalAttributes(labels, options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it("should open/close export modal - CPL Match Parts, open help panel and check opened subitem", async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Export matches');
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should export a file - CPL Match Parts', async () => {
        await modal.checkingExportFile(buttonNames.export, buttonNames.export, gridElements.grid,
            'IHS_CPLParts.txt');
    });

    it('should open View Suggested matches modal - CPL Match Parts', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[3]);
        await grid.newGridOpenFilterBoxByName('Imported Manufacturer Part');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[2], gridElements.newGridRows.get(0));
        await commonMatchingLogic.openViewAllSuggestMatchesShadeParts();
    });

    it('should apply View Suggested match and highlight - CPL Match Parts', async () => {
        await commonMatchingLogic.applyMatchAndHighlight(buttonNames.applySelectedPartMatch, false);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it("should be warning modal on leaving CPL match parts page, US275243", async () => {
        await modal.openModalWithLinkName(meganavItems.home);
        await expect(await modal.modalTitle.getText()).toEqual('Leave this page?');
        await expect(await modal.modalBody.getText()).toContain('You have accepted matches but have not saved them yet. Are you sure you want to leave without saving your changes?');
        await modal.closeModalWithXButton();
        await modal.openModalWithLinkName(meganavItems.home);
        await modal.closeModalWithButton(buttonNames.returnToMatching)
    });

    it('should display View Suggestion matches in the save changes modal - CPL Match Parts ', async () => {
        await commonMatchingLogic.saveChangesForViewSuggestAcceptMatchParts();
        await modal.closeModalWithXButton();
        await toolbar.clearFilteringWithX();
    });

    it('should undo view suggested matches - CPL Match Parts', async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for View Suggestion Match - CPL Match Parts', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[3]);
        await grid.newGridOpenFilterBoxByName('Imported Manufacturer Part');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[2], gridElements.newGridRows.get(0));
        await commonMatchingLogic.openViewAllSuggestMatchesShadeParts();
        await commonMatchingLogic.applyMatchAndHighlight(buttonNames.applySelectedPartMatch, false);
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it('should open part details modal link - CPL Match Parts', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplMatchParts, gridElements.grid);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[2]);
        await partDetailsLogic.openPartDetModalLinkNewGrid(0, 1);
        await modal.closeModalWithXButton();
    });

    it("should open part details modal link - CPL Match Parts, open help panel and check title", async () => {
        await partDetailsLogic.openPartDetModalLinkNewGrid(0, 1);
        await helpLogic.openAndCheckHelpPanelTitle('View part details');
        await modal.closeModalWithXButton();
    });

    it('should open search for match modal after clicking on the try search link', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[4]);
        await commonMatchingLogic.openSearchForMatchModal();
    });

    it('should be highlighted row when save after search for match -  Match Parts', async () => {
        await commonMatchingLogic.searchForMatchTypeAhead();
    });

    it('should clear all link in search for match modal -  Match Parts', async () => {
        await commonMatchingLogic.clearAllChecking();
    });

    it('should perform no results search in search for match modal -  Match Parts', async () => {
        await commonMatchingLogic.performNoResultsSearch();
    });

    it('should perform search in search for match modal -  Match Parts', async () => {
        await commonMatchingLogic.clearAllChecking();
        await commonMatchingLogic.performSearch();
    });

    it('should search for match and highlight', async () => {
        await commonMatchingLogic.searchForMatchModalAndHighlight(true);
    });

    it('should display search for match in the save changes modal ', async () => {
        await commonMatchingLogic.saveChangesForViewSuggestAcceptMatchParts();
        await modal.closeModalWithXButton();
    });

    it('should undo search for match changes', async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for search for match', async () => {
        await commonMatchingLogic.openSearchForMatchModal();
        await commonMatchingLogic.performSearch();
        await commonMatchingLogic.searchForMatchModalAndHighlight(true);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should be discard changes for search for match', async () => {
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it('should be active/inactive Accept Match button', async () => {
        await modal.closeModalIfPresent();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplMatchParts, gridElements.checkboxSelector.get(1));
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[4],
            gridElements.checkboxSelector.get(1));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await expect(button.returnButtonByText(buttonNames.acceptMatch).isEnabled()).toBeFalsy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[3],
            gridElements.checkboxSelector.get(1));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await expect(button.returnButtonByText(buttonNames.acceptMatch).isEnabled()).toBeFalsy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[2],
            gridElements.checkboxSelector.get(1));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await expect(button.returnButtonByText(buttonNames.acceptMatch).isEnabled()).toBeTruthy();
    });

    it('should be Accept Match modal', async () => {
        await commonMatchingLogic.openAcceptMatchParts();
        await modal.closeModalWithButton(buttonNames.stopGoBackToTheList);
        await commonMatchingLogic.openAcceptMatchParts();
        await modal.closeModalWithXButton();
    });

    it('should open Accept Match modal, open help panel and check opened subitem', async () => {
        await commonMatchingLogic.openAcceptMatchParts();
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Accept or ignore a match');
        await modal.closeModalWithXButton();
    });

    it('should accept match and highlight accepted row ', async () => {
        await commonMatchingLogic.openAcceptMatchParts();
        await commonMatchingLogic.newGridAcceptMatchHighlight(buttonNames.yesItOkToAcceptThem, false);
    });

    it('should display accepted matches in the save changes modal ', async () => {
        await commonMatchingLogic.saveChangesForViewSuggestAcceptMatchParts();
        await modal.closeModalWithXButton();
    });

    it('should undo accepted changes', async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for Accept Match', async () => {
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await commonMatchingLogic.openAcceptMatchParts();
        await commonMatchingLogic.newGridAcceptMatchHighlight(buttonNames.yesItOkToAcceptThem, false);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should be discard changes for Accept Match', async () => {
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });
    
    it('should be active/inactive Ignore Match button', async () => {
        await modal.closeModalIfPresent();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplMatchParts, gridElements.checkboxSelector.get(1));
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[4],
            gridElements.checkboxSelector.get(1));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[3],
            gridElements.checkboxSelector.get(1));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[2],
            gridElements.checkboxSelector.get(1));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeTruthy();
    });

    it('should be Ignore Match modal', async () => {
        await commonMatchingLogic.newGridOpenIgnoreMatchParts();
        await modal.closeModalWithXButton();
        await commonMatchingLogic.newGridOpenIgnoreMatchParts();
        await modal.closeModalWithButton(buttonNames.stopGoBackToTheList);
    });

    it('should open Ignore Match modal, open help panel and check opened subitem', async () => {
        await commonMatchingLogic.newGridOpenIgnoreMatchParts();
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Accept or ignore a match');
        await modal.closeModalWithXButton();
    });

    it('should accept match and highlight ignored row', async () => {
        await commonMatchingLogic.newGridOpenIgnoreMatchParts();
        await commonMatchingLogic.newGridIgnoreMatchHighlight(false);
    });

    it('should display ignored matches in the save changes modal', async () => {
        await commonMatchingLogic.saveChangesForViewSuggestIgnoreMatchParts();
        await modal.closeModalWithXButton()
    });

    it('should undo ignored changes', async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight()
    });

    it('should be leave modal for Ignore Match', async () => {
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await commonMatchingLogic.newGridOpenIgnoreMatchParts();
        await commonMatchingLogic.newGridIgnoreMatchHighlight(false);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal()
    });

    it('should be discard changes for Ignore Match', async () => {
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it('should open search for match modal after clicking on the search for match', async () => {
        await modal.closeModalIfPresent();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplMatchParts, gridElements.grid);
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await commonMatchingLogic.openSearchForMatchModalFromToolbar();
    });

    it('should search for match and highlight', async () => {
        await commonMatchingLogic.performSearch();
        await commonMatchingLogic.searchForMatchModalAndHighlight(false);
    });

    it('should open search for a match - CPL Match Parts, open help panel and check opened subitem', async () => {
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await commonMatchingLogic.openSearchForMatchModalFromToolbar();
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Search for a match');
        await modal.closeModalWithXButton();
        await grid.newMechanismCheckboxRangeChecking(0, 1);
    });

    it('should display search for match in the save changes modal ', async () => {
        await commonMatchingLogic.saveChangesForViewSuggestAcceptMatchParts();
        await modal.closeModalWithXButton();
    });

    it('should undo search for match changes', async () => {
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
    });

    it('should be leave modal for search for match', async () => {
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await await commonMatchingLogic.openSearchForMatchModalFromToolbar();
        await commonMatchingLogic.performSearch();
        await commonMatchingLogic.searchForMatchModalAndHighlight(false);
        await commonMatchingLogic.notLeaveWithoutSaveChangesAcceptModal();
    });

    it('should be discard changes for search for match', async () => {
        await commonMatchingLogic.leaveWithoutSaveChanges();
    });

    it('should open research request modal by clicking on the research request button - CPL Match Parts',
        async () => {
            await modal.closeModalIfPresent();
            await login.loginWithDirectLink(browser.params.groupAdminUrl);
            await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
                meganavItems.cplSublinks.cplMatchParts, gridElements.checkboxSelector.get(1));
            await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
            await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[2], gridElements.checkboxSelector.get(1));
            await grid.newMechanismCheckboxRangeChecking(0, 1);
            await modal.openModalWithButtonByName(buttonNames.resRequest);
            await expect(await modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
            await modal.closeModalWithXButton();
        });

    it('should open research request modal, open help panel and check opened subitem', async () => {
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await helpLogic.openAndCheckHelpPanelTitle('Research requests');
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Submit research requests for specific parts');
        await modal.closeModalWithXButton();
    });

    it('should open multiple research request modal - CPL Match Parts', async () => {
        await grid.newMechanismCheckboxRangeChecking(1, 2);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
        await modal.closeModalWithXButton();
    });

    it('should open multiple research request modal, open help panel and check opened subitem', async () => {
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Submit research requests for multiple parts');
    });

    it('should be retained applied column filters after closing "View all suggested Parts" shade, DE124603 ',
        async () => {
            await modal.closeModalIfPresent();
            await login.loginWithDirectLink(browser.params.groupAdminUrl);
            await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
                meganavItems.cplSublinks.cplMatchParts, gridElements.grid);
            await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'Imported Manufacturer Part',
                false);
            const filteringTerms: string = (await grid.newGridReturnCellValuesByColumnName(0,
                'Imported Manufacturer Part'))[0].slice(0, 2);
            await grid.newGridOpenFilterBoxByName('Imported Manufacturer Part');
            await input.fillFieldWithValue(gridElements.columnsSort.input, filteringTerms);
            await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
            await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'Imported Manufacturer Part',
                true);
            await grid.newMechanismCheckboxRangeChecking(0, 1);
            await modal.openModalWithButtonByName(buttonNames.searchForMatch);
            await commonMatchingLogic.performSearch();
            await grid.newMechanismCheckboxRangeChecking(0, 1);
            await button.clickByButtonNameAndWait(buttonNames.yesUseThisMatchingPart, gridElements.newGridOpenHeaderSortButton.get(0));
            await grid.newGridOpenFilterBoxByName('Imported Manufacturer Part');
            await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.input, 'value'))
                .toEqual(filteringTerms);
            await grid.newGridCloseFilterBoxIfPresent();
            await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'Imported Manufacturer Part',
                true);
        });
 });


describe('Verify CPL Matched Parts are updated once user deletes manufacturer from Knowledge base, Defect 363339', () => {

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
    let ImportedPartN: string ='';

    it('should go CPL Match Parts, search for a match and save changes and reprocess the CPL', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplMatchParts, gridElements.grid);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[4],
            gridElements.checkboxSelector.get(1));
        await modal.openModalWithElement(gridElements.newGridCellLinksById('P3900000128').get(0));
        await commonMatchingLogic.clearAllChecking();
        await commonMatchingLogic.performSearch();
        await browser.sleep(4000);
        ImportedPartN= await matchingElements.searchForMatchModalInfoValues.get(0).getText();
        await grid.newMechanismCheckboxRangeChecking(0, 1);

        await button.clickByButtonName(buttonNames.yesUseThisMatchingPart);
        browser.sleep(1500); //grid refreshes twice
        await modal.openModalWithButtonByName(buttonNames.saveChanges);
        await modal.closeModalWithButton(buttonNames.confirmAllChangesAndReprocessTheCPL);
        await Growlers.waitUntilCPLGrowlerIsReady();
        browser.sleep(1500);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(ImportedPartN);
        await grid.newGridHideColumnsRange(['Matched P/N', 'Matched Mfr', 'Corp P/N', 'Corp Name', 'Mfr P/N', 'Mfr Name', 'Corp P/N Desc']);
        expect(await grid.getCellValuesByCellId('P8000000151')).toContain('KB')

    });

    it('should go KB delete the last accepted match and verify same is reflected in CPL ', async () => {

        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.checkboxSelector.get(1));
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(kbData.partsFilters[3], gridElements.checkboxSelector.get(1));
        await expect((toolbarElements.tagByName(kbData.partsFilters[3])).isDisplayed()).toBeTruthy();
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await button.clickByButtonNameAndWait(buttonNames.yesDeleteSelectedItems, gridElements.gridWrapper);

        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.grid);

        await cplDetailsLogic.reprocessCplWithoutWaitingForProcessedStatus();
        await Growlers.waitUntilCPLGrowlerIsReady();
        browser.sleep(1500);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(ImportedPartN);
        await grid.newGridHideColumnsRange(['Matched P/N', 'Matched Mfr', 'Corp P/N', 'Corp Name', 'Mfr P/N', 'Mfr Name', 'Corp P/N Desc']);
        expect(await grid.getCellValuesByCellId('P8000000151')).not.toContain('KB')

    });

});