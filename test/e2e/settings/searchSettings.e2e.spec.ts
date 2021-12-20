import {Header} from "../../../components/header";

import {Login} from "../../../components/login";
import {browser} from "protractor";

const login: Login = new Login();
import {fieldStatuses, headerItems, meganavItems, titles} from "../../../testData/global";
import {
    commonElements,
    dropdownElements, gridElements, headerElements, pageTitles, partDetailsElements, searchElements,
    transposeElements
} from "../../../elements/elements";
import {InstructionPanel} from "../../../components/instructionPanel";
import {Waiters} from "../../../helper/waiters";

const instructionPanel: InstructionPanel = new InstructionPanel();
import {settings} from "../../../elements/elements";
import {SettingsLogic} from "../../../bussinesLayer/settings/settingsLogic";
import {Modal} from "../../../components/modal";

const modal: Modal = new Modal();
const settingsLogic = new SettingsLogic();
import {SearchSettingsLogic} from "../../../bussinesLayer/settings/searchSettingsLogic";

const searchSettingsLogic = new SearchSettingsLogic();
import {Button} from "../../../components/simple/button";

const button = new Button();
import {buttonNames} from "../../../testData/global";
import {SearchLogic} from "../../../bussinesLayer/search/searchLogic";

const searchLogic = new SearchLogic();
import {Toolbar} from "../../../components/toolbar";

const toolbar = new Toolbar();
import {Dropdown} from "../../../components/dropdown";

import {commonSearch} from "../../../testData/search";
import {QuickSearch} from "../../../components/quickSearch";

const quickSearch = new QuickSearch();
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
import {VideoSliderLogic} from "../../../bussinesLayer/home/videoSliderLogic";
import {RadioButton} from "../../../components/simple/radioButton";

import {Grid} from "../../../components/grid";

const grid: Grid = new Grid();

import {ParametricSearchLogic} from "../../../bussinesLayer/search/parametricSearchLogic";

const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();
import {Link} from "../../../components/simple/link";

const link: Link = new Link();
import {Meganav} from "../../../components/meganav";

const meganav: Meganav = new Meganav();

const radioButton: RadioButton = new RadioButton();
const helpLogic: HelpLogic = new HelpLogic();
import {ImportLogic} from "../../../bussinesLayer/import/importLogic";

const importLogic: ImportLogic = new ImportLogic();

import {CplSearchLogic} from "../../../bussinesLayer/search/cplSearchLogic";
import {JsScripts} from "../../../utils/jsScripts";

const cplSearchLogic = new CplSearchLogic();


describe('Search Settings - Simple and Advanced Part Search Type', () => {

    it('should open Search Settings', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await expect(pageTitles.moduleSettingsTitle.getText()).toEqual(titles.searchSettings);
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Search settings');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Search settings');
    });


    it('should open Video slider, and be Custom Search Results Layouts link', async () => {
        await VideoSliderLogic.openVideoSlider();
        await VideoSliderLogic.playingVideoChecking();
    });

    it('should open the video on the new browser tab and close it', async () => {
        await VideoSliderLogic.openVideoInTheNewBrowserTab();
        await VideoSliderLogic.closeVideoSlider();
    });

    it('should be two sections: Search Results and Search ', async () => {
        const expectedLabels = 'Simple and Advanced Part Search Type';
        await expect(await settings.searchSettings.moduleLabel.get(0).getText()).toEqual(expectedLabels);
    });

    it('should uncheck ignore spec char and be the same in advanced parts search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.ignoreSpecCharInPartsSearch(fieldStatuses.emptyField);
    });

    it('should check ignore spec char and be the same in advanced parts search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.ignoreSpecCharInPartsSearch(fieldStatuses.fillField);
    });

    it('should uncheck ignore spec char and be the same in quick search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.ignoreSpecCharInQuickSearch(fieldStatuses.emptyField);
    });

    it('should check ignore spec char and be the same in quick search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.ignoreSpecCharInQuickSearch(fieldStatuses.fillField);
    });


    it('should select Parts Starts With and display checked radio button in quick search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.checkingSearchTypeQuickSearch('Part # Starts With');
    });


    it('should select Part # Contains and display checked radio button in quick search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.checkingSearchTypeQuickSearch('Part # Contains');
    });

    it('should select  Exact Part # and display checked radio button in quick search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.checkingSearchTypeQuickSearch('Exact Part #');
    });

    it('should select Part # Contains and display checked radio button in quick search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.checkingSearchTypeAdvancedSearch('Part # Contains');
    });

    it('should select  Exact Part # and display checked radio button in quick search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.checkingSearchTypeAdvancedSearch('Exact Part #');
    });

    it('should select Parts Starts With and display checked radio button in quick search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.checkingSearchTypeAdvancedSearch('Part # Starts With');
    });

    it('should select All Keyword Match Type and display checked radio button in quick search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.checkingKeywordQuickSearch('All');
    });

    it('should select Part # Contains and display checked radio button in quick search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.checkingKeywordQuickSearch('Any');
    });

    it('should select  Exact Part # and display checked radio button in quick search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.checkingKeywordQuickSearch('Exact');
    });

    it('should select All Keyword Match Type and display checked radio button in quick search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.checkingKeywordAdvancedPartsSearch('All');
    });

    it('should select Part # Contains and display checked radio button in quick search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.checkingKeywordAdvancedPartsSearch('Any');
    });

    it('should select  Exact Part # and display checked radio button in quick search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.checkingKeywordAdvancedPartsSearch('Exact');
    });

    it('should select All Qualifications checkboxes and display them in advanced parts search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.checkCheckedQualifications(fieldStatuses.fillField, true);
    });

    it('should deselect All Qualifications checkboxes and display them in advanced parts search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.checkCheckedQualifications(fieldStatuses.fillField, false);
        // await searchSettingsLogic.checkCheckedQualifications(fieldStatuses.email, null);
    });

});

describe('Search Settings - Search Results ', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
    });

    it('should be titles for Search Results', async () => {
        await expect(await settings.searchSettings.sectionHeader.getText())
            .toEqual(['Results Grid Type:', 'Pagination', 'CPL Search Results:', 'Distributor Information'])
    });


    it('should set Life Cycle layout and be on results page', async () => {
        await settingsLogic.checkingLayout('Life Cycle', settings.searchSettings.layoutDropdownToggle,
            quickSearch.performQuickSearch);
    });

    it('should set Environmental layout and be on results page', async () => {
        await settingsLogic.checkingLayout('Environmental', settings.searchSettings.layoutDropdownToggle,
            quickSearch.performQuickSearch);
    });

    it('should set Combined layout and be on results page', async () => {
        await settingsLogic.checkingLayout('Combined', settings.searchSettings.layoutDropdownToggle,
            quickSearch.performQuickSearch);
    });

    it('should set default layout and be on results page', async () => {
        await settingsLogic.checkingLayout('Default', settings.searchSettings.layoutDropdownToggle,
            quickSearch.performQuickSearch);
    });

    it('should set "All" per page and should display on the search result', async () => {
        await settingsLogic.paginationChecking('All', quickSearch.performQuickSearch);
    });

    it('should set 500 per page and should display on the search result', async () => {
        await settingsLogic.paginationChecking('500', quickSearch.performQuickSearch);
    });

    it('should set 250 per page and should display on the search result', async () => {
        await settingsLogic.paginationChecking('250', quickSearch.performQuickSearch);
    });

    it('should set 100 per page and should display on the search result', async () => {
        await settingsLogic.paginationChecking('100', quickSearch.performQuickSearch);
    });

    it('should set 50 per page and should display on the search result', async () => {
        await settingsLogic.paginationChecking('50', quickSearch.performQuickSearch);
    });

    it('should set 25 per page and should display on the search result', async () => {
        await settingsLogic.paginationChecking('25', quickSearch.performQuickSearch);
    });

    it('should not show CPL with unchecked cpl checkbox', async () => {
        await searchSettingsLogic.cplSearchCheckingUncheckedCheckbox();
    });

    it('should  show CPL with checked cpl checkbox', async () => {
        await searchSettingsLogic.cplSearchCheckingCheckedCheckbox();
    });
});

describe('Search Settings - Distributors', () => {
    let yellowRowsCount: number;
    let normalRowsCount: number;

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
    });

    it('should be checked Show Authorized Only distributors and display in part alternates', async () => {
        await radioButton.checkRadioButtonByLabelName('Show Authorized Only');
        await settingsLogic.saveSettings();
        await quickSearch.performQuickSearchWithWait(commonSearch.commonValue, partDetailsElements.distribIcon.get(1));
        await  modal.openModalWithElement(partDetailsElements.distribIcon.get(5));
        await Waiters.waitUntilElementIsDisplayed(gridElements.newGridRowsInModal.get(0));
        yellowRowsCount = await gridElements.yellowGridRows.count();
        await expect(await gridElements.newGridRowsInModal.count()).toEqual(yellowRowsCount);
    });

    it('should be checked Show All distributors and display in part alternates', async () => {
        await radioButton.checkRadioButtonByLabelName('Show All');
        await settingsLogic.saveSettings();
        await quickSearch.performQuickSearchWithWait(commonSearch.commonValue, partDetailsElements.distribIcon.get(1));
        await  modal.openModalWithElement(partDetailsElements.distribIcon.get(3));
        await Waiters.waitUntilElementIsDisplayed(gridElements.newGridRowsInModal.get(0));
        yellowRowsCount = await gridElements.yellowGridRows.count();
        normalRowsCount = await gridElements.newGridRowsInModal.count();
        await expect(await gridElements.newGridRowsInModal.count()).toBeGreaterThan(yellowRowsCount);
    });


});

describe('Search Settings - View Alternates', () => {


    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
    });

    it('should be checked alternates types and display in view alternates', async () => {
        await searchSettingsLogic.checkUncheckAlternatesTypes(fieldStatuses.fillField)
    });

    it('should be unchecked alternates types and display in view alternates', async () => {
        await searchSettingsLogic.checkUncheckAlternatesTypes(fieldStatuses.emptyField);
    });

    it('should be checked alternates types and display in view alternates', async () => {
        await searchSettingsLogic.checkUncheckAlternatesQualifications(fieldStatuses.fillField)
    });

    it('should be unchecked alternates types and display in view alternates', async () => {
        await searchSettingsLogic.checkUncheckAlternatesQualifications(fieldStatuses.emptyField);
    });


});

describe('Search Settings - Saved Searches ', () => {

    it('should go to Saved Searches', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.goToSavedSearches();
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Saved Searches');
    });

    it('should only be YES/NO values in "Shared" column, DE113223', async () => {
        const cellValues: string [] = await grid.newGridReturnCellValuesByColumnName(1, 'Shared');
        await expect(await grid.checkIfOnlyAllowedDataIsInValues(cellValues, ['YES', 'NO'])).toBeTruthy();
    });

    it('should be tag label for columns filtering - sort A to Z ', async () => {
        await toolbar.filterAllColumnsAZ();
    });

    it('should remove filtering with clear all', async () => {
        await toolbar.clearFilteringWithClearAll();
    });

    it('should be tag label for columns filtering - sort Z to A', async () => {
        await toolbar.filterAllColumnsZA();
    });

    it('should be filters by owner - Saved Searches', async () => {
        const expectedFilterOptions = ['Show My Saved Searches', 'Show All Shared Searches'];
        await Dropdown.openDropdownByClickOnElement(toolbar.filterByOwner);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await Dropdown.closeDropdownByClickOnElement(toolbar.filterByOwner);
    });


    it('should be filters by type - Saved Searches ', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.filterByType);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(commonSearch.savedSearchTypes);
        await Dropdown.closeDropdownByClickOnElement(toolbar.filterByType);
    });


});

describe('Search Settings, transposed mode settings, US270684', () => {

    afterAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await radioButton.checkRadioButtonByLabelName('Parts viewed as rows and attributes viewed as columns');
        await button.clickByButtonName(buttonNames.saveChanges);
    });


    it('should be displayed transposed grid view mode, parametric search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await settingsLogic.switchGridToTransposeMode(true);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        await expect(await transposeElements.headerCheckbox.get(0).isDisplayed()).toBeTruthy();
    });

    it('should be displayed transposed grid view mode, quick search', async () => {
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await expect(await transposeElements.headerCheckbox.get(0).isDisplayed()).toBeTruthy();
    });

    it('should be displayed common grid view mode, parametric search', async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await settingsLogic.switchGridToTransposeMode(false);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        await expect(await gridElements.selectAllCheckbox.isDisplayed()).toBeTruthy();
    });

    it('should be displayed common grid view mode, quick search', async () => {
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await expect(await gridElements.selectAllCheckbox.isDisplayed()).toBeTruthy();
    });


});

describe('Search Settings - Simple and Advanced Part Search Type', () => {
    it('should open Search Settings', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await searchSettingsLogic.goToSavedSearches();
        await grid.newGridOpenFilterBoxByName('Shared');
        await button.clickByButtonNameAndWait(buttonNames.clearFilter, gridElements.newGridRows.get(0));
        const cellName: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Search Description');
        for (let i: number = 0; i < cellName.length; i++) {
            await expect(await cellName[i]).not.toEqual('undefined');
        }
        await modal.closeModalIfPresent();
    });
});

describe(`Setting Defects, DE115895`, async () => {
    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await radioButton.checkRadioButtonByLabelName('Parts viewed as columns and attributes viewed as rows');
        await button.clickByButtonName(buttonNames.saveChanges);
        await browser.sleep(3000);

    });

    afterAll(async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await radioButton.checkRadioButtonByLabelName('Parts viewed as rows and attributes viewed as columns');
        await button.clickByButtonName(buttonNames.saveChanges);
        await browser.sleep(3000);
        await importLogic.closeLeaveModalIfPresent();
    });

    it('grid switch to default view mode after " NO rows to show"', async () => {
        await quickSearch.performQuickSearch('LM311A');
        await quickSearch.performQuickSearchWithWait('14517823618723618723',
            modal.modalBody);
        await modal.closeModalWithButton(buttonNames.close);
        await button.clickOnTheElementAndWait(searchElements.recentSearchExpandIcon.get(0),
            await link.returnElementByLinkName('LM311A...'));
        await button.clickOnTheElementAndWait(await link.returnElementByLinkName('LM311A...'),
            gridElements.newGridRows.get(0));
        await expect(await transposeElements.headerCheckbox.get(0).isDisplayed()).toBeTruthy();
    });
});

describe(`Setting Defects, DE115857`, async () => {
    beforeAll(async () => {
        await importLogic.closeLeaveModalIfPresent();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await radioButton.checkRadioButtonByLabelName('Parts viewed as columns and attributes viewed as rows');
        await button.clickByButtonName(buttonNames.saveChanges);
        await importLogic.closeLeaveModalIfPresent();
    });

    afterAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await radioButton.checkRadioButtonByLabelName('Parts viewed as rows and attributes viewed as columns');
        await button.clickByButtonName(buttonNames.saveChanges);
    });

    it('recent search doesn\'t update grid', async () => {
        await browser.sleep(2000);
        await quickSearch.performQuickSearch('LM311A');
        await quickSearch.performQuickSearchWithWait('LM311D',
            gridElements.newGridRows.get(0));
        await expect(await transposeElements.headerText.get(0).getText()).toContain('LM311D');
        await button.clickOnTheElementAndWait(searchElements.recentSearchExpandIcon.get(0),
            await link.returnElementByLinkName('LM311A...'));
        await button.clickOnTheElement(await link.returnElementByLinkName('LM311A...'));
        await browser.sleep(1000);
        await Waiters.waitUntilElementIsDisplayed(transposeElements.headerText.get(0));
        await expect(await transposeElements.headerText.get(0).getText()).toContain('LM311A');
        await button.clickOnTheElement(await link.returnElementByLinkName('LM311D...'));
        await browser.sleep(1000);
        await Waiters.waitUntilElementIsDisplayed(transposeElements.headerText.get(0));
        await expect(await transposeElements.headerText.get(0).getText()).toContain('LM311D');
    });
});

describe(`CPL: User setting for preferred CPL Search Results Layout, US354566`, async () => {

    afterAll(async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await JsScripts.scrollToElement(settings.searchSettings.CPLlayoutDropdownToggle);
        await Dropdown.openDropdownByClickOnElement(settings.searchSettings.CPLlayoutDropdownToggle);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait('Default');
        await browser.sleep(1000);
        await button.clickByButtonName(buttonNames.saveChanges);
    });

    it('Verify CPL search layout options available at user settings level are same in CPL search result layout', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch('LM311D');
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        let dropdownValuesSearch = await Dropdown.getValueInDropdown();
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await browser.sleep(1000);
        await JsScripts.scrollToElement(settings.searchSettings.CPLlayoutDropdownToggle);
        await Dropdown.openDropdownByClickOnElement(settings.searchSettings.CPLlayoutDropdownToggle);
        let dropdownValuesSettings = await Dropdown.getValueInDropdown();
        let text: string = await settings.searchSettings.dropdownText.get(3).getText();
        await expect(text).toEqual('CPL Results Column Layout View:');
        await expect(dropdownValuesSearch).toEqual(dropdownValuesSettings);

    });

    it('Verify CPL search results layout selected in user settings layout is reflected in CPL search by default', async () => {

        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await JsScripts.scrollToElement(settings.searchSettings.CPLlayoutDropdownToggle);
        await Dropdown.openDropdownByClickOnElement(settings.searchSettings.CPLlayoutDropdownToggle);
        await Dropdown.selectValueInDropdownByValueName('TestLayout-1', button.returnButtonByText(buttonNames.saveChanges));
        await button.clickByButtonName(buttonNames.saveChanges);
        await browser.sleep(1000);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch('LM311D');
        expect(await commonElements.accordionElements.last().getText()).toEqual("Layout : " + 'TestLayout-1');

    });
});