import {searchElements, gridElements, bomElements, quickSearchElements} from "../../../../../elements/elements";
import {browser} from "protractor";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {Link} from "../../../../../components/simple/link";
import {Login} from "../../../../../components/login";
import {StringArray} from "../../../../../utils/stringArray";
import {QuickSearch} from "../../../../../components/quickSearch";
const elementAttributes: ElementAttributes = new ElementAttributes();
const link: Link = new Link();
const login: Login = new Login();
const stringArray:StringArray = new StringArray();
const quickSearch: QuickSearch = new QuickSearch();
describe('TC67328 - "Quick" part search field - display options menu', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
    });

    afterAll(async () => {
        await login.logout();
    });

    it('should be quick search attributes', async () => {
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField, 'placeholder'))
            .toEqual('Enter part number(s)...');
        await expect(await quickSearchElements.typeLabel.getText()).toEqual('Part # Starts With');
        await expect(await quickSearchElements.quickSearchDropdown.isDisplayed()).toBeTruthy();
        await expect(await quickSearchElements.quickSearchX.isDisplayed()).toBeTruthy();
    });

    it('should open quick search dropdown and be dropdown attributes', async () => {
        await quickSearch.openQuickSearchDropdwon();
        await expect(await quickSearchElements.simpleSearchRadioButtonLabels.getText())
            .toEqual( [ 'Part # Starts With', 'Part # Contains', 'Exact Part #', 'Keyword Search', 'ObjectID Search','CPL Search']);
        await expect(await quickSearchElements.simpleSearchRadioButtonInputs.get(0).isSelected()).toBeTruthy();
        await expect(stringArray.returnStringWithoutBr(await quickSearchElements.info.getText()))
            .toEqual('Search for single or multiple parts. Example: LM339N1 or LM339N1-500');
        await expect(await quickSearchElements.ignoreSpecCharInput.isSelected()).toBeTruthy();
        await expect(await quickSearchElements.ignoreSpecCharLabel.getText()).toEqual('Ignore Special Characters');
        await expect(await link.returnElementByLinkName('Help').isDisplayed()).toBeTruthy();
        await quickSearch.closeQuickSearchDropdwon();
    });

    it('should check Part # Contains radio button and be values', async () => {
        await quickSearch.openDropdownAndSetAType('Part # Contains');
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField, 'placeholder'))
            .toEqual('Enter part number...');
        await expect(stringArray.returnStringWithoutBr(await quickSearchElements.info.getText()))
            .toEqual('The search term must be at least 4 alphanumeric characters. Maximum length is 85 alphanumeric characters.');
        await expect(await quickSearchElements.ignoreSpecCharInput.isSelected()).toBeTruthy();
        await expect(await link.returnElementByLinkName('Help').isDisplayed()).toBeTruthy();
        await quickSearch.closeQuickSearchDropdwon();
    });

    it('should check Exact Part # radio button and be values', async () => {
        await quickSearch.openDropdownAndSetAType('Exact Part #');
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField, 'placeholder'))
            .toEqual('Enter part number(s)...');
        await expect(stringArray.returnStringWithoutBr(await quickSearchElements.info.getText()))
            .toEqual('Search for single or multiple parts. Example: LM339N1 or LM339N1-500');
        await expect(await quickSearchElements.ignoreSpecCharInput.isSelected()).toBeTruthy();
        await expect(await link.returnElementByLinkName('Help').isDisplayed()).toBeTruthy();
        await quickSearch.closeQuickSearchDropdwon();
    });

    it('should check Keyword Search radio button and be values', async () => {
        await quickSearch.openDropdownAndSetAType('Keyword Search');
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField, 'placeholder'))
            .toEqual('Enter keyword(s)...');
        await expect(await quickSearchElements.info.getText())
            .toEqual('Searches across part descriptions attributes.');
        await expect(await quickSearchElements.keywordMathTypeLabels.getText()).toEqual([ 'All', 'Any', 'Exact' ]);
        await expect(await link.returnElementByLinkName('Help').isDisplayed()).toBeTruthy();
        await quickSearch.closeQuickSearchDropdwon();
    });
});