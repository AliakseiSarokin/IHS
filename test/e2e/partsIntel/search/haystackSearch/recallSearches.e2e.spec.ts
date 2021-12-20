import {browser} from "protractor";
import {meganavItems} from "../../../../../testData/global";
import {commonSearch, haystackSearchConst} from "../../../../../testData/search";
import {dropdownElements, homeElements, searchElements} from "../../../../../elements/elements";
import {Dropdown} from "../../../../../components/dropdown";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {HaystackSearchLogic} from "../../../../../bussinesLayer/search/haystackSearchLogic";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {RadioButton} from "../../../../../components/simple/radioButton";
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";
import {TypeAhead} from "../../../../../components/typeAhead";

const elementAttributes: ElementAttributes = new ElementAttributes();
const haystackSearchLogic = new HaystackSearchLogic();
const login = new Login();
const meganav = new Meganav();
const radioButton: RadioButton = new RadioButton();
const searchLogic: SearchLogic = new SearchLogic();
const typeAhead: TypeAhead = new TypeAhead();
describe('Haystack Search - Recall Saved Searches ', () => {

    it('should be recall searches dropdown', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await searchLogic.recallSearchChecking()
    });

    it('should display saved search and recall it through navigation to setting saved searches', async () => {
        await haystackSearchLogic.performHaystackSearch(haystackSearchConst.searchValue);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.goToSearchFromSavedSearches();
        await searchLogic.viewSearchCriteriaChecking();
        await haystackSearchLogic.viewSearchCriteriaParams();
        await searchLogic.refineLinkChecking();
        await expect(await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))
            .toEqual(commonSearch.savedSearchName);
    });

    it('should reset saved search in recall searches through adding new searches characteristic', async () => {
        await haystackSearchLogic.fillSearchFieldWithValue(haystackSearchConst.searchValue2);

        // await expect(await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))
        //     .toEqual('- Recall Searches -');
        await searchLogic.recallSearchChecking()

        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should display saved search in recall searches through navigation to haystack search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await haystackSearchLogic.performHaystackSearch(haystackSearchConst.searchValue);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should display saved search in recall searches through refine search criteria', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await haystackSearchLogic.performHaystackSearch(haystackSearchConst.searchValue);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await searchLogic.refineLinkChecking();
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should set value in part number field after applying recall search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await haystackSearchLogic.performHaystackSearch(haystackSearchConst.searchValue);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await searchLogic.applyRecallSearch(commonSearch.savedSearchName);
        await expect(await elementAttributes.getElementAttribute(searchElements.haystack.partNumberOrNsnField, 'value'))
            .toEqual(haystackSearchConst.searchValue);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

    it('should set value in nsn or niin field after applying recall search ', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await radioButton.checkRadioButton(searchElements.haystack.nsnRadioButtonLabel, searchElements.haystack.nsnRadioButtonInput);
        await haystackSearchLogic.performHaystackSearch(haystackSearchConst.nsnValidSearchCriteria);
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await searchLogic.applyRecallSearch(commonSearch.savedSearchName);
        await expect(await elementAttributes.getElementAttribute(searchElements.haystack.partNumberOrNsnField, 'value'))
            .toEqual(haystackSearchConst.nsnValidSearchCriteria);
        await expect(searchElements.haystack.nsnRadioButtonInput.isSelected())
            .toBeTruthy();
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });


    it('should set value in Vendor Name or CAGE Code field  after applying recall search ', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await typeAhead.typeAheadChecking(searchElements.haystack.vendorNameField, haystackSearchConst.cageCodeSearchValue);
        const typeAheadValue: string = await elementAttributes.getElementAttribute(searchElements.haystack.vendorNameField, 'value');
        await haystackSearchLogic.performHaystackSearchWIthoutSettingValue();
        await searchLogic.openSaveSearchModal();
        await searchLogic.saveSearch();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await searchLogic.applyRecallSearch(commonSearch.savedSearchName);
        await expect(await elementAttributes.getElementAttribute(searchElements.haystack.vendorNameField, 'value'))
            .toEqual(typeAheadValue);
        await expect(await elementAttributes.getElementAttribute(searchElements.haystack.partNumberOrNsnField, 'value'))
            .toEqual('');
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });


    it('should display shared saved search for restricted user', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await haystackSearchLogic.performHaystackSearch(haystackSearchConst.searchValue);
        await searchLogic.openSaveSearchModal();
        await searchLogic.makeSaveSearchShared();
        await searchLogic.saveSearch();
        await login.loginWithDirectLinkPI(browser.params.restrictedUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for read only user', async () => {
        await login.loginWithDirectLinkPI(browser.params.readOnlyUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for regular user', async () => {
        await login.loginWithDirectLinkPI(browser.params.regularUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for kb admin user', async () => {
        await login.loginWithDirectLinkPI(browser.params.kbAdminUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
    });

    it('should display shared saved search for user admin', async () => {
        await login.loginWithDirectLinkPI(browser.params.kbAdminUserUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(commonSearch.savedSearchName);
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });


});