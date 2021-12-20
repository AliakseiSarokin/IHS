import {buttonNames, meganavItems, modalTitles, exportOptions} from "../../../../../testData/global";
import {browser} from "protractor";
import {Button} from "../../../../../components/simple/button";
const button: Button = new Button();
import {Input} from "../../../../../components/simple/input";
const input: Input = new Input();
import {Meganav} from "../../../../../components/meganav";
const meganav:Meganav = new Meganav();
import {
    searchElements, gridElements, dropdownElements, commonElements,
    homeElements, partDetailsElements
} from "../../../../../elements/elements";
import {ParametricSearchLogic} from "../../../../../bussinesLayer/search/parametricSearchLogic";
const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();
import {Login} from "../../../../../components/login";
const login: Login = new Login();
import {Toolbar} from "../../../../../components/toolbar";
const toolbar: Toolbar = new Toolbar();
import {Dropdown} from "../../../../../components/dropdown";
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";
const searchLogic: SearchLogic = new SearchLogic();
import {commonSearch} from "../../../../../testData/search";
import {Modal} from "../../../../../components/modal";
const modal:Modal = new Modal();
import {Grid} from "../../../../../components/grid";
import {VideoSliderLogic} from "../../../../../bussinesLayer/home/videoSliderLogic";
const grid:Grid = new Grid();
import {HelpLogic} from "../../../../../bussinesLayer/help/helpLogic";
const helpLogic: HelpLogic = new HelpLogic();
import {InstructionPanel} from "../../../../../components/instructionPanel";
const instructionPanel: InstructionPanel = new InstructionPanel();
describe('Parameteric Search - Control Panel Buttons ', () => {

    beforeAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.maxElementWaitTime;
    });

    afterAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.defaultElementWaitTime;
    });

    it('should perform parametric search and display grid', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
    });

    it(`should button Mfr Suggested Alternates be on toolbar`, async () => {
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.mfrSuggestedReplacements).isPresent()).toBeTruthy();
    });

   it(`should button Mfr Suggested Alternates be disables`, async () => {
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.mfrSuggestedReplacements).isEnabled()).toBeFalsy();
    });

    it('should be unhide button with dropdown list', async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column', async () => {
        await grid.newGridHideColumnByName('Rel Info');
        await toolbar.displayHiddenColumnInDropdonwToolbar('Rel Info')
    });

    it('should unhide the column with Unhode All', async () => {
        await toolbar.unhideCellNameWithUnhideAll('Rel Info');
    });


    it('should be filters - parametric search results page', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.layoutButton);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(commonSearch.parametricLayout);
        await Dropdown.closeDropdownByClickOnElement(toolbar.layoutButton);
    });

    it ( 'should be export modal attributes parametric search results page' , async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.exportParts);
        await modal.exportModalAttributes(exportOptions.search.common.labels, exportOptions.search.common.options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    xit('should export file for Details for Parametric Search',  async () => {
        await modal.checkingExportFile(buttonNames.export, buttonNames.export, gridElements.grid,
            exportOptions.search.common.fileName);
    });

    it('should open single research request modal - parametric search results page', async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
        await modal.closeModalWithXButton();
    });

    it('should open multiple research request modal - parametric search results page', async () => {
        await grid.newMechanismCheckboxRangeChecking(1,2);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
        await modal.closeModalWithXButton();
    });


    it('should open save search modal for parametric, should be save search modal attributes', async () => {
        await searchLogic.openSaveSearchModal();
    });

    it('should not be active save button when fill name filed with spaces - Parametric Search results page', async () => {
        await input.fillFieldWithValue(searchElements.saveSearchNameField, commonSearch.spacesValue);
        await expect(button.returnButtonByText(buttonNames.saveAndReturnToResults).isEnabled()).toBeFalsy()
    });

    it('should save parametric search ', async () => {
        await searchLogic.saveSearch();
    });

    xit('should disaply saved search in recall searches dropdown - parametric', async () => {
        await searchLogic.displaySaveSearchInRecall();
    });

    it('should display saved search in saved searches - parametric', async () => {
        await searchLogic.displaySaveSearchInSavedSearches();
    });

    it('should go to search results grid from Saved Searches - parametric', async () => {
        await searchLogic.goToSearchFromSavedSearches();
    });

    it('should delete saved searches - parametric', async () => {
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });
});

describe(' Results Page - parametric Search', () => {

    beforeAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.maxElementWaitTime;
    });

    afterAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.defaultElementWaitTime;
    });

    it('should perform Parametric Search and display results grid', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
    });

    it('should be Parametric Search Criteria Accordion',  async () => {
        await searchLogic.searchCriteriaOnResultsPageChecking('Parametric Part Search Criteria');
    });

    it('should open Video slider, play video and close',  async () => {
        await VideoSliderLogic.openVideoSlider();
        await VideoSliderLogic.playingVideoChecking();
        await VideoSliderLogic.closeVideoSlider();
    });

    it('should be View Search Criteria link and should show search criteria - Parametric Search', async () => {
        await searchLogic.viewSearchCriteriaChecking()
    });

    it('should be Refine Search Criteria link and should return to search page - Parametric Search', async () => {
        await searchLogic.refineLinkChecking()
    });

    xit('should be pagination attributes',  async () => {
        await parametricSearchLogic.performParametricSearch();
        await grid.paginationChecking();
    });

    xit('should be option to go to Last and First Pages',  async () => {
        await grid.goToLastFirstPages();
    });

    it('should be displayed reference design icons, DE113496',  async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performExactParametricSearch(3,1);
        await expect(await partDetailsElements.referDesignIcon.count()).toBe(25)

    });
});

describe('Parameteric Search  - Search Page', () => {

    beforeAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.maxElementWaitTime;
    });

    afterAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.defaultElementWaitTime;
    });

    it('should go to parametric', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await expect(await  browser.getCurrentUrl()).toContain("/search/parametric")
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Parametric Search');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Parametric search');
    });

    it('should nothing happened by clicking on the search criteria accordion', async () => {
        await searchLogic.doNotShowOptionToSearchByClickingOnSearchCriteria()
    });

    it('should be entry text box label', async () => {
        await expect(await searchElements.parametric.paramtricEntryLabel.getText()).toEqual('Category');
    });

    it('should be recall searches dropdown - parametric search page', async () => {
        await searchLogic.recallSearchChecking();
    });

    it("should be 'Commodities' box title", async () => {
        await parametricSearchLogic.boxLabelChecking(0, 'Commodities')
    });

    it("should select commodities and show 'Part Types' box", async () => {
        await parametricSearchLogic.selectCommodities();
    });

    it('should be selected commodities in entry text box', async () => {
        await parametricSearchLogic.entryBoxChecking(parametricSearchLogic.selectedCommodities);
    });

    it("should be 'Part Type' box title", async () => {
        await parametricSearchLogic.boxLabelChecking(1, 'Part Types')
    });

    it("should select part types and show 'Categories' box", async () => {
        await parametricSearchLogic.selectPartTypes();
    });

    it('should be selected commodities > part type in entry text box', async () => {
        await parametricSearchLogic.entryBoxChecking(parametricSearchLogic.selectedCommodities + ' > '
            + parametricSearchLogic.selectedPartTypes);
    });

    it("should be 'Categories' box title", async () => {
        await parametricSearchLogic.boxLabelChecking(2, 'Categories');
    });

    it('should select categories', async () => {
        await parametricSearchLogic.selectCategories();
    });

    it('should be selected commodities > part type > categories in entry text box', async () => {
        await parametricSearchLogic.entryBoxChecking(parametricSearchLogic.selectedCommodities + ' > '
            + parametricSearchLogic.selectedPartTypes + ' > ' + parametricSearchLogic.selectedCategory);
    });

    it('should go to attributes by clicking on Find Matching Values', async () => {
        await parametricSearchLogic.goToAttributes('Body Breadth (mm)');
    });

    it('should be attributes, values and seat filters boxes labels', async () => {
        await parametricSearchLogic.boxLabelChecking(0, 'Values');
        await parametricSearchLogic.boxLabel2Checking('Attributes', 'Current set of filters(Total Results:');
    });

    it('should select attribute', async () => {
        await parametricSearchLogic.selectAttribute();
    });

    it('should select attribute value', async () => {
        await parametricSearchLogic.selectAttributeValue();
    });

    it('should display correct value for added filter', async () => {
        await parametricSearchLogic.filterValue();
    })

    it("should check that 'Clear' link works only for Attribute Filters", async () => {
        await parametricSearchLogic.clearAttributeFilters();
        await parametricSearchLogic.entryBoxChecking(parametricSearchLogic.selectedCommodities + ' > '
            + parametricSearchLogic.selectedPartTypes + ' > ' + parametricSearchLogic.selectedCategory);
    });

    it("'Add' button should be inactive if attribute value is not selected", async () => {
        await parametricSearchLogic.selectAttribute();
        await expect(button.returnButtonByText(buttonNames.add).isEnabled()).toBeFalsy();
        await button.clickOnTheElement(searchElements.parametric.value.get(0));
        await expect(button.returnButtonByText(buttonNames.add).isEnabled()).toBeTruthy();
        await parametricSearchLogic.selectAttribute(4);
        await expect(button.returnButtonByText(buttonNames.add).isEnabled()).toBeFalsy();
    });

    it('should not be any errors dialog window and no matched any categories displayed under the Category input field' +
        ' if search term contains special characters', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await searchLogic.fillSearchFieldWithValue(searchElements.parametricSearchField, commonSearch.specialCharactersSearchValue);
        await browser.sleep(300);
        await expect(await commonElements.lookAhead.length < 0);
    });

    it("should matched some options displayed under the Category input field" +
        " if search term contains 'RF/M'", async () => {
        await searchLogic.fillSearchFieldWithValue(searchElements.parametricSearchField, 'RF/M');
        await browser.sleep(300);
        await expect(await commonElements.lookAhead.length > 0);
    });
});

describe('Parametric Search - Search Page - Recall Saved Searches ', () => {

    beforeAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.maxElementWaitTime;
    });

    afterAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.defaultElementWaitTime;
    });

    it('should be recall searches dropdown', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await searchLogic.recallSearchChecking()
    });

    it('should display saved search in recall searches through navigation to param search',  async () => {
        await parametricSearchLogic.performParametricSearch();
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should display saved search in recall searches through refine search criteria ',  async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await searchLogic.refineLinkChecking();
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });


    it('should display shared saved search for restricted user ',  async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        await searchLogic.openSaveSearchModal();
        await searchLogic.makeSaveSearchShared();
        await searchLogic.saveSearch();
        await login.loginWithDirectLinkPI(browser.params.restrictedUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for read only user ',  async () => {
        await login.loginWithDirectLinkPI(browser.params.readOnlyUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for regular user ',  async () => {
        await login.loginWithDirectLinkPI(browser.params.regularUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for kb admin user ',  async () => {
        await login.loginWithDirectLinkPI(browser.params.kbAdminUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for user admin',  async () => {
        await login.loginWithDirectLinkPI(browser.params.kbAdminUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

});

