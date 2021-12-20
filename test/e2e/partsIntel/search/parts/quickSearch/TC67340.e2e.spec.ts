import {
    searchElements, gridElements, bomElements, quickSearchElements,
    homeElements, commonElements
} from "../../../../../../elements/elements";
import {browser} from "protractor";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {Input} from "../../../../../../components/simple/input";
import {Login} from "../../../../../../components/login";
import {QuickSearch} from "../../../../../../components/quickSearch";
import {quickSearchData} from "../../../../../../testData/search";
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const login: Login = new Login();
const quickSearch: QuickSearch = new QuickSearch();
describe('TC67340 - Validation of input search field', () => {

    beforeAll(async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.openDropdownAndSetAType('Part # Starts With');
        await quickSearch.closeQuickSearchDropdwon();
    });

    it('should not perfrom search when click on the serach button with empty criteria', async () => {
        await expect(await quickSearchElements.searchButton.isEnabled()).toBeFalsy();
        await quickSearch.clickOnTheSearchButton();
        await expect(await searchElements.searchField.isDisplayed()).toBeTruthy();

    });

    it('should not be option to perform search with 1 interred char', async () => {
       await input.fillFieldWithValue(quickSearchElements.searchField, '1');
        await expect(await quickSearchElements.searchButton.isEnabled()).toBeFalsy();
        await quickSearch.clickOnTheSearchButton();
        await expect(await searchElements.searchField.isDisplayed()).toBeTruthy();
    });

    it('should not be option to perform search with 2 interred chars', async () => {
        await input.fillFieldWithValue(quickSearchElements.searchField, '12');
        await expect(await quickSearchElements.searchButton.isEnabled()).toBeFalsy();
        await quickSearch.clickOnTheSearchButton();
        await expect(await searchElements.searchField.isDisplayed()).toBeTruthy();
    });

    it('should be typeahead for 3 enterred chars', async () => {
        await input.fillFieldWithValue(quickSearchElements.searchField, '123');
        await quickSearch.waitForTypeAhead();
        await expect(await commonElements.lookAhead.get(0).getText()).toContain('123');
    });

    it('should clear search filed with X', async () => {
        await quickSearch.clickOnX();
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField,'value'))
            .toEqual('')
    });

    it('should not be option to search for Part # Contains and 4 spaces', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[1]);
        await quickSearch.closeQuickSearchDropdwon();
        await input.fillFieldWithValue(quickSearchElements.searchField, '123');
        await expect(await quickSearchElements.searchButton.isEnabled()).toBeFalsy();
        await quickSearch.clickOnTheSearchButton();
        await expect(await searchElements.searchField.isDisplayed()).toBeTruthy();
    });

    it('should not be option to search for Part # Contains and 3 chars', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[1]);
        await quickSearch.closeQuickSearchDropdwon();
        await input.fillFieldWithValue(quickSearchElements.searchField, '    ');
        await expect(await quickSearchElements.searchButton.isEnabled()).toBeFalsy();
        await quickSearch.clickOnTheSearchButton();
        await expect(await searchElements.searchField.isDisplayed()).toBeTruthy();
    });

    it('should be option to search for Exact Part # and 1 chars', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[2]);
        await quickSearch.closeQuickSearchDropdwon();
        await input.fillFieldWithValue(quickSearchElements.searchField, '1');
        await expect(await quickSearchElements.searchButton.isEnabled()).toBeTruthy();
    });

    it('should not be option to search for Exact Part # and 1 space', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[2]);
        await quickSearch.closeQuickSearchDropdwon();
        await input.fillFieldWithValue(quickSearchElements.searchField, ' ');
        await expect(await quickSearchElements.searchButton.isEnabled()).toBeFalsy();
        await quickSearch.clickOnTheSearchButton();
        await expect(await searchElements.searchField.isDisplayed()).toBeTruthy();
    });

    it('should not be option to search for Keyword # and 3 chars', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[3]);
        await quickSearch.closeQuickSearchDropdwon();
        await input.fillFieldWithValue(quickSearchElements.searchField, '123');
        await expect(await quickSearchElements.searchButton.isEnabled()).toBeFalsy();
        await quickSearch.clickOnTheSearchButton();
        await expect(await searchElements.searchField.isDisplayed()).toBeTruthy();
    });

    it('should not be option to search for Keyword # and 3 spaces', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[3]);
        await quickSearch.closeQuickSearchDropdwon();
        await input.fillFieldWithValue(quickSearchElements.searchField, '   ');
        await expect(await quickSearchElements.searchButton.isEnabled()).toBeFalsy();
        await quickSearch.clickOnTheSearchButton();
        await expect(await searchElements.searchField.isDisplayed()).toBeTruthy();
    });

    it('should be option to search for Keyword and 4 chars', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[3]);
        await quickSearch.closeQuickSearchDropdwon();
        await input.fillFieldWithValue(quickSearchElements.searchField, '1234');
        await expect(await quickSearchElements.searchButton.isEnabled()).toBeTruthy();
    });
});