import {browser} from "protractor";
import {commonElements, dropdownElements, homeElements, searchElements} from "../../../../elements/elements";
import {commonSearch, whereUsedSearchConst} from "../../../../testData/search";
import {Dropdown} from "../../../../components/dropdown";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {meganavItems} from "../../../../testData/global";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {TypeAhead} from "../../../../components/typeAhead";
import {WhereUsedSearchLogic} from "../../../../bussinesLayer/search/whereUsedSearchLogic";

const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const searchLogic: SearchLogic = new SearchLogic();
const typeAhead: TypeAhead = new TypeAhead();
const whereUsedSearchLogic: WhereUsedSearchLogic = new WhereUsedSearchLogic();
let searchCriteriaTypeAhead: string;
describe('TC54870 Where Used - Search Page - Recall Saved Searches', () => {

    it('should be recall searches dropdown and display default value', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(1));
        await searchLogic.recallSearchChecking()
    });

    it('should display saved search in recall searches through navigation to Where Used Search', async () => {
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganav(meganavItems.home, homeElements.alertPanelImage);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should apply saved search in recall searches dropdown and should set saved values in all search fields through refine search criteria', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.fillAllFields(whereUsedSearchConst.searchCriteria);
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, whereUsedSearchConst.searchCriteria);
        searchCriteriaTypeAhead = await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value');
        await searchLogic.performSearch();
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await searchLogic.refineLinkChecking();
        await expect(await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))
            .toEqual(commonSearch.savedSearchName);
        await expect(await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value'))
            .toEqual(searchCriteriaTypeAhead);
        for (let i: number = 0; i < await searchElements.whereUsedSearchField.count(); i++) {
            await expect(await elementAttributes.getElementAttribute(searchElements.whereUsedSearchField.get(i), 'value'))
                .toEqual(whereUsedSearchConst.searchCriteria);
        }
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should apply saved search in recall searches dropdown and should set saved value only in search field through refine search criteria', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria, 0);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await searchLogic.refineLinkChecking();
        await expect(await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))
            .toEqual(commonSearch.savedSearchName);
        await expect(await elementAttributes.getElementAttribute(searchElements.whereUsedSearchField.get(0), 'value'))
            .toEqual(whereUsedSearchConst.searchCriteria);
        await expect(await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value'))
            .toEqual('');
        for (let i: number = 1; i < await searchElements.whereUsedSearchField.count(); i++) {
            await expect(await elementAttributes.getElementAttribute(searchElements.whereUsedSearchField.get(i), 'value'))
                .toEqual('');
        }
    });

    it('should reset displaying recall search to default value through adding new search criteria', async () => {
        await searchLogic.fillSearchFieldWithValue(searchElements.whereUsedSearchField.get(2), whereUsedSearchConst.searchCriteria2);
        await searchLogic.recallSearchChecking();
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should set saved values in all search fields after applying recall search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.fillAllFields(whereUsedSearchConst.searchCriteria);
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, whereUsedSearchConst.searchCriteria);
        searchCriteriaTypeAhead = await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value');
        await searchLogic.performSearch();
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganav(meganavItems.home, homeElements.alertPanelImage);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await searchLogic.applyRecallSearch(commonSearch.savedSearchName);
        await expect(await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value'))
            .toEqual(searchCriteriaTypeAhead);
        for (let i: number = 0; i < await searchElements.whereUsedSearchField.count(); i++) {
            await expect(await elementAttributes.getElementAttribute(searchElements.whereUsedSearchField.get(i), 'value'))
                .toEqual(whereUsedSearchConst.searchCriteria);
        }
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should set saved value only in search field after applying recall search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria, 0);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganav(meganavItems.home, homeElements.alertPanelImage);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await searchLogic.applyRecallSearch(commonSearch.savedSearchName);
        await expect(await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value'))
            .toEqual('');
        await expect(await elementAttributes.getElementAttribute(searchElements.whereUsedSearchField.get(0), 'value'))
            .toEqual(whereUsedSearchConst.searchCriteria);
        for (let i: number = 1; i < await searchElements.whereUsedSearchField.count(); i++) {
            await expect(await elementAttributes.getElementAttribute(searchElements.whereUsedSearchField.get(i), 'value'))
                .toEqual('');
        }
    });

    it('should reset displaying recall search to default value through changing search criteria', async () => {
        await searchLogic.fillSearchFieldWithValue(searchElements.whereUsedSearchField.get(0), whereUsedSearchConst.searchCriteria2);
        await searchLogic.recallSearchChecking();
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should display shared saved search for restricted user', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.makeSaveSearchShared();
        await searchLogic.saveSearch();
        browser.sleep(10000);       //without it Recall Searches dropdown does not show searches saved as a shared searches
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for read only user', async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for regular user', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for kb admin user', async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for user admin', async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should not display unshared saved search for restricted user', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).not.toContain(commonSearch.savedSearchName);
    });

    it('should not display unshared saved search for read only user', async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).not.toContain(commonSearch.savedSearchName);
    });

    it('should not display unshared shared saved search for regular user ', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).not.toContain(commonSearch.savedSearchName);
    });

    it('should not display unshared saved search for kb admin user ', async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await searchLogic.emptyRecallSearchChecking();
        await expect(await dropdownElements.dropdownValues.getText()).not.toContain(commonSearch.savedSearchName);
    });

    it('should not display unshared saved search for user admin', async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
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