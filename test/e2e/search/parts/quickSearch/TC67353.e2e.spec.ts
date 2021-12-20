import {browser} from "protractor";
import {CheckBox} from "../../../../../components/simple/checkBox";
import {fieldStatuses} from "../../../../../testData/global";
import {Grid} from "../../../../../components/grid";
import {gridElements, quickSearchElements} from "../../../../../elements/elements";
import {quickSearchData} from "../../../../../testData/search";
import {Login} from "../../../../../components/login";
import {QuickSearch} from "../../../../../components/quickSearch";

const checkBox: CheckBox = new CheckBox();
const grid: Grid = new Grid();
const login: Login = new Login();
const quickSearch: QuickSearch = new QuickSearch();

describe('TC67353 - "Part #Starts with" option of part search', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.clickOnX();
    });

    afterAll(async () => {
        await login.logout();
    });

    it('should be option to search with entered more than 3 symbols', async () => {
        await quickSearch.setATypeAndPerformAQuickSearch(quickSearchData.typeLabels[0],
            '1111', gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Part Number', true);
    });

    it('should be option to search with entered  special chars - 123@12', async () => {
        await quickSearch.setATypeAndPerformAQuickSearch(quickSearchData.typeLabels[0],
            '123@12', gridElements.grid)
    });

    it('should be option to search with entered  special chars - 123@12', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[0]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.ignoreSpecCharLabel,
            quickSearchElements.ignoreSpecCharInput, fieldStatuses.emptyField);
        await quickSearch.closeQuickSearchDropdwon();
        await quickSearch.performQuickSearchWithWait('123@12', gridElements.grid);
        await expect(await gridElements.newGridSimpleTextCell.get(0).isPresent()).toBeFalsy();
    });

    it('should be option to search with entered  special chars - lm%123', async () => {
        await quickSearch.setATypeAndPerformAQuickSearch(quickSearchData.typeLabels[0],
            'lm%123', gridElements.grid)
    });

    it('should be be fuzzy search modal - ~$`\'@%^&()-_={}\\[]:;<>/|"?.', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[0]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.ignoreSpecCharLabel,
            quickSearchElements.ignoreSpecCharInput, fieldStatuses.fillField);
        await quickSearch.closeQuickSearchDropdwon();
        await quickSearch.performQuickSearchWithWait(`~$\`'@%^&()-_={}\\[]:;<>/|"?.`, gridElements.newGridRows.get(0));
        await expect(await gridElements.newGridCellByRowIndex(0).get(0).isDisplayed()).toBeTruthy();
    });
});
