import {Button} from "../../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames} from "../../../../../testData/global";
import {commonSearch} from "../../../../../testData/search";
import {Grid} from "../../../../../components/grid";
import {gridElements} from "../../../../../elements/elements";
import {Login} from "../../../../../components/login";
import {QuickSearch} from "../../../../../components/quickSearch";
import {Toolbar} from "../../../../../components/toolbar";
import {TypeAhead} from "../../../../../components/typeAhead";

const button: Button = new Button();
const grid: Grid = new Grid();
const login: Login = new Login();
const quickSearch: QuickSearch = new QuickSearch();
const toolbar: Toolbar = new Toolbar();
const typeAhead: TypeAhead = new TypeAhead();

describe('DE104728', () => {

    it('Mfr name should clearing the filter applied on clearing the column filters from toolbar', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Mfr Name', false);
        await grid.newGridOpenFilterBoxByName('Mfr Name');
        await typeAhead.typeAheadCheckingForSort(gridElements.columnsSort.mfrTypeAhead, 'NXP');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Mfr Name', true);
        await toolbar.clearFilteringWithX();
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Mfr Name', false);
        await grid.newGridOpenFilterBoxByName('Mfr Name');
        await expect(await gridElements.columnsSort.selectedTags.count()).toEqual(0);
    });
});

describe('DE108571', () => {

    it('Mfr name should go back to original state from Mfr Name column after hitting clear filter button', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await grid.newGridOpenFilterBoxByName('Mfr Name');
        await typeAhead.typeAheadCheckingForSort(gridElements.columnsSort.mfrTypeAhead, 'NXP');
        await grid.peformSearchInColumnSort(gridElements.newGridCheckboxSelectorByIndex(0));
        await grid.newGridOpenFilterBoxByName('Mfr Name');
        await expect(await gridElements.columnsSort.selectedTags.first().getText()).toEqual('NXP');
        await gridElements.columnsSort.xButtonSelectedTags.click();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
    });
});
