import {browser} from "protractor";
import {meganavItems} from "../../../../testData/global";
import {commonSearch} from "../../../../testData/search";
import {dropdownElements, homeElements, searchElements} from "../../../../elements/elements";
import {Dropdown} from "../../../../components/dropdown";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {PartsSearchLogic} from "../../../../bussinesLayer/search/partsSearchLogic";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";

const elementAttributes: ElementAttributes = new ElementAttributes();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const login = new Login();
const meganav = new Meganav();
const searchLogic: SearchLogic = new SearchLogic();

describe('Parts Search - Search Page - Recall Saved Searches ', () => {

    it('should be recall searches dropdown', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await searchLogic.recallSearchChecking();
    });

    it('should display saved search in recall searches through navigation to haystack search search',  async () => {
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganav(meganavItems.home, homeElements.alertPanelImage);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should display saved search in recall searches through refine search criteria ',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await searchLogic.refineLinkChecking();
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });


    it('should set value in Enter Part Number field after applying recall search ',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganav(meganavItems.home, homeElements.alertPanelImage);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await searchLogic.applyRecallSearch(commonSearch.savedSearchName);
        await expect(await elementAttributes.getElementAttribute(searchElements.searchField,'value'))
            .toEqual(commonSearch.commonValue);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should display shared saved search for restricted user ',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await searchLogic.openSaveSearchModal();
        await searchLogic.makeSaveSearchShared();
        await searchLogic.saveSearch();
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for read only user ',  async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for regular user ',  async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for kb admin user ',  async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for user admin',  async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.clearAllSavedSearch();
    });


});