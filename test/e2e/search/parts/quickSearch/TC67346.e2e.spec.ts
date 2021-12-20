import {
    searchElements, gridElements, bomElements, quickSearchElements,
    homeElements, commonElements, partDetailsElements
} from "../../../../../elements/elements";
import {browser} from "protractor";
import {CheckBox} from "../../../../../components/simple/checkBox";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {Input} from "../../../../../components/simple/input";
import {Login} from "../../../../../components/login";
import {TypeAhead} from "../../../../../components/typeAhead";
import {QuickSearch} from "../../../../../components/quickSearch";
import {quickSearchData} from "../../../../../testData/search";
import {fieldStatuses} from "../../../../../testData/global";
import {Waiters as w} from "../../../../../helper/waiters";
import {Button} from "../../../../../components/simple/button";

const button = new Button();
const checkBox: CheckBox = new CheckBox();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const login: Login = new Login();
const typeAhead: TypeAhead = new TypeAhead();
const quickSearch: QuickSearch = new QuickSearch();
describe('TC67340 - Validation of input search field', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.clickOnX();
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[0]);
    });

    afterAll(async () => {
        await login.logout();
    });

    it('should be type ahead for Part # Starts With, checked Ignore spec chars and enterred 4 chars', async () => {
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.ignoreSpecCharLabel,
            quickSearchElements.ignoreSpecCharInput, fieldStatuses.fillField);
        await quickSearch.closeQuickSearchDropdwon();
        await typeAhead.typeAheadChecking(quickSearchElements.searchField, '1234');
        await quickSearch.performQuickSearchWithoutSetCriteria();
    });

    it('should not be type ahead for Part # Starts With, unchecked Ignore spec chars and enterred 4 chars', async () => {
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.ignoreSpecCharLabel,
            quickSearchElements.ignoreSpecCharInput, fieldStatuses.emptyField);
        await quickSearch.closeQuickSearchDropdwon();
        await typeAhead.notBeTypeAhead(quickSearchElements.searchField, '1234');
    });


});

describe('Quick Object id search', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[4]);
    });

    afterAll(async () => {
        await login.logout();
    });

    it('quick search with Object id', async () => {
        await quickSearch.closeQuickSearchDropdwon();
        await typeAhead.notBeTypeAhead(quickSearchElements.searchField, '1542424196');
        await quickSearch.performQuickSearchWithoutSetCriteria();
        await expect(await partDetailsElements.cellValueDisplayed.isDisplayed()).toBe(true);
    });

    it('quick search with 25 object ids separated with or operator', async () => {
        const objIds :string = '100038657|100038658|1439189324|1439189312|100038516|100038664|102100459|1420053453|1482540681|1531627180|1428945868|1468620170|100038659|100038432|1439189333|8143695888|1156932268|1428945865|1420053445|1512752404|2065293240|1942126720|2011781405|2065293243|2124881804';
        await quickSearch.performQuickSearchWithWait(objIds,await partDetailsElements.cellValueDisplayed);
        expect(await gridElements.gridCounter.getText()).toEqual('1 - 25 of 25 items');
    });

    it('quick search with more that 25 object ids separated with or operator, should verify search button should not be enabled', async () => {
        const objIds :string = '1542424196|1425954240|1439189327|100038657|100038658|1439189324|1439189312|100038516|100038664|102100459|1420053453|1482540681|1531627180|1428945868|1468620170|100038659|100038432|1439189333|8143695888|1156932268|1428945865|1420053445|1512752404|2065293240|1942126720|2011781405|2065293243|2124881804';
        await typeAhead.notBeTypeAhead(quickSearchElements.searchField, objIds);
        expect(await quickSearchElements.searchButton.isEnabled()).toBeFalsy();
    });

    it('DE352100 - should verify CPL icon visible when Object id search is performed from quick search bar', async () => {
        await quickSearch.clickOnX();
        await typeAhead.notBeTypeAhead(quickSearchElements.searchField, '1542424196');
        await quickSearch.performQuickSearchWithoutSetCriteria();
        await expect(await partDetailsElements.cplIcon.first().isDisplayed()).toBe(true);
    });

});