import {browser} from "protractor";
import {CplSearchLogic} from "../../../../bussinesLayer/search/cplSearchLogic";
import {commonSearch, cplSearchConst} from "../../../../testData/search";
import {Dropdown} from "../../../../components/dropdown";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {dropdownElements, homeElements, searchElements} from "../../../../elements/elements";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {meganavItems} from "../../../../testData/global";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";

const cplSearchLogic: CplSearchLogic = new CplSearchLogic();
const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const searchLogic: SearchLogic = new SearchLogic();

describe('TC66137 CPL Search - Search Page - Recall Saved Searches', () => {

    it('should be recall searches dropdown and display default value', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await searchLogic.recallSearchChecking();
    });

    it('should display saved search in recall searches through navigation to CPL Search', async () => {
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganav(meganavItems.home, homeElements.alertPanelImage);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        browser.sleep(2000);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should apply saved search in recall searches dropdown and should set saved value in search field through refine search criteria', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await searchLogic.refineLinkChecking();
        await expect(await elementAttributes.getElementAttribute(searchElements.cplSearchField, 'value'))
            .toEqual(cplSearchConst.searchCriteria);
        await expect(await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))
            .toEqual(commonSearch.savedSearchName);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should set saved value in search field after applying recall search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganav(meganavItems.home, homeElements.alertPanelImage);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await searchLogic.applyRecallSearch(commonSearch.savedSearchName);
        await expect(await elementAttributes.getElementAttribute(searchElements.cplSearchField, 'value'))
            .toEqual(cplSearchConst.searchCriteria);
    });

    it('should reset displaying recall search to default value after change search criteria', async () => {
        await searchLogic.fillSearchFieldWithValue(searchElements.cplSearchField, cplSearchConst.searchCriteria
            + cplSearchConst.searchCriteria2);
        await searchLogic.recallSearchChecking();
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should display shared saved search for restricted user', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.makeSaveSearchShared();
        await searchLogic.saveSearch();
        browser.sleep(10000);       //without it Recall Searches dropdown might work incorrectly
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for read only user', async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for regular user', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for kb admin user', async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for user admin', async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should not display unshared saved search for restricted user', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        browser.sleep(10000);       //without it Recall Searches dropdown might work incorrectly
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).not.toContain(commonSearch.savedSearchName);
    });

    it('should not display unshared saved search for read only user', async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).not.toContain(commonSearch.savedSearchName);
    });

    it('should not display unshared saved search for regular user', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).not.toContain(commonSearch.savedSearchName);
    });

    it('should not display unshared saved search for kb admin user', async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).not.toContain(commonSearch.savedSearchName);
    });

    it('should not display unshared saved search for user admin', async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).not.toContain(commonSearch.savedSearchName);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });
});