import {browser} from "protractor";
import {buttonNames, fieldStatuses, meganavItems} from "../../../../../testData/global";
import {commonSearch, haystackSearchConst} from "../../../../../testData/search";
import {commonElements, dropdownElements, homeElements, searchElements} from "../../../../../elements/elements";
import {Dropdown} from "../../../../../components/dropdown";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {PartsSearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";
const elementAttributes: ElementAttributes = new ElementAttributes();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const login = new Login();
const meganav = new Meganav();
const searchLogic: SearchLogic = new SearchLogic();
describe('Parts Search - Search Page - Recall Saved Searches ', () => {

    it('should be recall searches dropdown', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await searchLogic.recallSearchChecking()
    });

    it('should display saved search in recall searches through navigation to parts search',  async () => {
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should display saved search in recall searches through refine search criteria ',  async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
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
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await searchLogic.applyRecallSearch(commonSearch.savedSearchName);
        await expect(await elementAttributes.getElementAttribute(searchElements.searchField,'value'))
            .toEqual(commonSearch.commonValue);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should display shared saved search for restricted user ',  async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await searchLogic.openSaveSearchModal();
        await searchLogic.makeSaveSearchShared();
        await searchLogic.saveSearch();
        await login.loginWithDirectLinkPI(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for read only user ',  async () => {
        await login.loginWithDirectLinkPI(browser.params.readOnlyUserUrlPI);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for regular user ',  async () => {
        await login.loginWithDirectLinkPI(browser.params.regularUserUrlPI);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for kb admin user ',  async () => {
        await login.loginWithDirectLinkPI(browser.params.kbAdminUserUrlPI);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for user admin',  async () => {
        await login.loginWithDirectLinkPI(browser.params.kbAdminUserUrlPI);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });


});