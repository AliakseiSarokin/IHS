import {browser} from "protractor";
import {CheckBox} from "../../../../../components/simple/checkBox";
import {commonElements, searchElements, homeElements, dropdownElements} from "../../../../../elements/elements";
import {commonSearch, docSearchConst} from "../../../../../testData/search";
import {DocumentsSearchLogic} from "../../../../../bussinesLayer/search/documentsSearchLogic";
import {Dropdown} from "../../../../../components/dropdown";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {meganavItems, fieldStatuses} from "../../../../../testData/global";
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";
import {TypeAhead} from "../../../../../components/typeAhead";

const checkbox = new CheckBox();
const documentsSearchLogic:DocumentsSearchLogic = new DocumentsSearchLogic();
const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav:Meganav = new Meganav();
const searchLogic: SearchLogic = new SearchLogic();
const typeAhead: TypeAhead = new TypeAhead();
let searchCriteriaTypeAhead: string;
describe('TC54718 Document Search - Search Page - Recall Saved Searches', () => {

    it('should be recall searches dropdown and display default value', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await searchLogic.recallSearchChecking();
    });

    it('should display saved search in recall searches through navigation to Documents Search', async () => {
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should apply saved search in recall searches dropdown and should set saved values in all search fields through refine search criteria',  async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await checkbox.checkUnCheckCheckboxes(searchElements.documents.docSearchCheckboxLabel,
            searchElements.documents.docSearchCheckboxInput, fieldStatuses.fillField);
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput,docSearchConst.searchCriterias[0]);
        searchCriteriaTypeAhead = await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value');
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await searchLogic.refineLinkChecking();
        await expect(await elementAttributes.getElementAttribute(searchElements.searchField,'value'))
            .toEqual(docSearchConst.searchCriteria);
        await expect(await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown,'value'))
            .toEqual(commonSearch.savedSearchName);
        await documentsSearchLogic.helpCheckboxState(fieldStatuses.fillField, fieldStatuses.fillField);
        await expect(searchCriteriaTypeAhead)
            .toContain(await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value'));
    });

    it('should reset displaying recall search to default value through unchecking some checkboxes', async () => {
        await checkbox.checkUnCheckCheckboxRange(searchElements.documents.docSearchCheckboxLabel,
            searchElements.documents.docSearchCheckboxInput, fieldStatuses.emptyField, 0,1);
        await searchLogic.recallSearchChecking();
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should apply saved search in recall searches dropdown and should set saved value only in search field through refine search criteria',  async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await searchLogic.refineLinkChecking();
        await expect(await elementAttributes.getElementAttribute(searchElements.searchField,'value'))
            .toEqual(docSearchConst.searchCriteria);
        await expect(await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown,'value'))
            .toEqual(commonSearch.savedSearchName);
        await documentsSearchLogic.helpCheckboxState(fieldStatuses.fillField, fieldStatuses.emptyField);
        await expect(await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value'))
            .toEqual('');
    });

    it('should reset displaying recall search to default value through adding new search criteria', async () => {
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput,docSearchConst.searchCriterias[0]);
        await searchLogic.recallSearchChecking();
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should set saved values in all search fields and check all checkboxes after applying recall search',  async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await checkbox.checkUnCheckCheckboxes(searchElements.documents.docSearchCheckboxLabel,
            searchElements.documents.docSearchCheckboxInput, fieldStatuses.fillField);
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput,docSearchConst.searchCriterias[0]);
        searchCriteriaTypeAhead = await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value');
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await searchLogic.applyRecallSearch(commonSearch.savedSearchName);
        await expect(await elementAttributes.getElementAttribute(searchElements.searchField,'value'))
            .toEqual(docSearchConst.searchCriteria);
        await documentsSearchLogic.helpCheckboxState(fieldStatuses.fillField, fieldStatuses.fillField);
        await expect(searchCriteriaTypeAhead)
            .toContain(await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value'));
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should set saved value only in search field after applying recall search',  async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await searchLogic.applyRecallSearch(commonSearch.savedSearchName);
        await expect(await elementAttributes.getElementAttribute(searchElements.searchField,'value'))
            .toEqual(docSearchConst.searchCriteria);
        await documentsSearchLogic.helpCheckboxState(fieldStatuses.fillField, fieldStatuses.emptyField);
        await expect(await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value'))
            .toEqual('');
    });

    it('should reset displaying recall search to default value through changing search criteria', async () => {
        await searchLogic.fillSearchFieldWithValue(searchElements.searchField, docSearchConst.searchCriteria2);
        await searchLogic.recallSearchChecking();
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should display shared saved search for restricted user',  async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.makeSaveSearchShared();
        await searchLogic.saveSearch();
        browser.sleep(10000);       //without it Recall Searches dropdown does not show searches saved as a shared searches
        await login.loginWithDirectLinkPI(browser.params.restrictedUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for read only user',  async () => {
        await login.loginWithDirectLinkPI(browser.params.readOnlyUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for regular user',  async () => {
        await login.loginWithDirectLinkPI(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for kb admin user',  async () => {
        await login.loginWithDirectLinkPI(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for user admin',  async () => {
        await login.loginWithDirectLinkPI(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should not display unshared saved search for restricted user',  async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch(docSearchConst.searchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await login.loginWithDirectLinkPI(browser.params.restrictedUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).not.toContain(commonSearch.savedSearchName);
    });

    it('should not display unshared saved search for read only user',  async () => {
        await login.loginWithDirectLinkPI(browser.params.readOnlyUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).not.toContain(commonSearch.savedSearchName);
    });

    it('should not display unshared saved search for regular user',  async () => {
        await login.loginWithDirectLinkPI(browser.params.regularUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).not.toContain(commonSearch.savedSearchName);
    });

    it('should not display unshared saved search for kb admin user',  async () => {
        await login.loginWithDirectLinkPI(browser.params.kbAdminUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).not.toContain(commonSearch.savedSearchName);
    });

    it('should not display unshared saved search for user admin',  async () => {
        await login.loginWithDirectLinkPI(browser.params.kbAdminUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).not.toContain(commonSearch.savedSearchName);
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });
});