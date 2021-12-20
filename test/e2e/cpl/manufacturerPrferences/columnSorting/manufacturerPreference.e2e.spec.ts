import {browser} from "protractor";
import {
    buttonNames,
    columnHeaders, meganavItems, titles
} from "../../../../../testData/global";
import {StringArray} from "../../../../../utils/stringArray";
import {Button} from "../../../../../components/simple/button";
import {Grid} from "../../../../../components/grid";
import {commonElements, gridElements, pageTitles} from "../../../../../elements/elements";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {JsScripts} from "../../../../../utils/jsScripts";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Toolbar} from "../../../../../components/toolbar";
import {Actions} from "../../../../../utils/actions";
import {Dropdown} from "../../../../../components/dropdown";
import {columnIdByColumnName} from "../../../../../testData/columnIdByColumnName";
import {TypeAhead} from "../../../../../components/typeAhead";
import {CheckBox} from "../../../../../components/simple/checkBox";

const button: Button = new Button();
const grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const typeAhead: TypeAhead = new TypeAhead();
const checkbox: CheckBox = new CheckBox();
const stringArray: StringArray = new StringArray();

describe('View Manufacturer Preferences - Manufacturer Preference - column filtering', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewMfrPref, gridElements.checkboxSelector.get(1));
        expect(await pageTitles.pageTitleShim2.getText()).toEqual(titles.viewMfrPref);
    });

    beforeEach(async () => {
        await toolbar.removeWithClearAll();
    });

    afterEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.reset), gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
    });

    it('should be checkboxes', async () => {
        await grid.newGridOpenFilterBoxByName('Manufacturer Preference');
        await expect(await gridElements.columnsSort.inputWithCheckboxes.getAttribute('placeholder'))
            .toEqual('Search...');
        await expect(await gridElements.columnsSort.checkboxLabels.getText())
            .toEqual(columnHeaders.viewMfrPref.mfrPreferencesFilter);
        for (let i: number = 0; i < columnHeaders.viewMfrPref.mfrPreferencesFilter.length; i++) {
            await expect(await gridElements.columnsSort.checkboxInputs.get(i).getAttribute('class'))
                .toContain('ag-checked');
        }
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await (button.returnButtonByText(buttonNames.applyFilter)).isEnabled()).toBeTruthy();
    });

    it('should uncheck Select All, checked Approval Required and perform sort', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Manufacturer Preference', false);
        await grid.newGridOpenFilterBoxByName('Manufacturer Preference');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.viewMfrPref.mfrPreferencesFilter[0]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.viewMfrPref.mfrPreferencesFilter[1]);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Manufacturer Preference', true);
        // next expects can not be check because in base we do not have any parts with AML Risk status yet
        if (await gridElements.newGridRows.get(0).isPresent()) {
            const mfrPrefFilterValue: string[] = await grid.newGridReturnCellValuesByColumnName(1,
                'Manufacturer Preference');
            for (let i: number = 0; i < mfrPrefFilterValue.length; i++) {
                await expect(mfrPrefFilterValue[i]).toEqual(columnHeaders.viewMfrPref.mfrPreferencesFilter[1]);
            }
        }
    });

    it('should uncheck Select All, checked Approved and perform sort', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Manufacturer Preference', false);
        await grid.newGridOpenFilterBoxByName('Manufacturer Preference');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.viewMfrPref.mfrPreferencesFilter[0]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.viewMfrPref.mfrPreferencesFilter[2]);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Manufacturer Preference', true);
        // next expects can not be check because in base we do not have any parts with AML Risk status yet
        if (await gridElements.newGridRows.get(0).isPresent()) {
            const mfrPrefFilterValue: string[] = await grid.newGridReturnCellValuesByColumnName(1,
                'Manufacturer Preference');
            for (let i: number = 0; i < mfrPrefFilterValue.length; i++) {
                await expect(mfrPrefFilterValue[i]).toEqual(columnHeaders.viewMfrPref.mfrPreferencesFilter[2]);
            }
        }
    });

    it('should uncheck Select All, perform sort with input part of the name option (None)', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Manufacturer Preference', false);
        await grid.newGridOpenFilterBoxByName('Manufacturer Preference');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.viewMfrPref.mfrPreferencesFilter[0]);
        await Actions.sendKeys(gridElements.columnsSort.inputWithCheckboxes, 'non');
        await expect(await gridElements.columnsSort.checkboxInputs.count()).toEqual(2);
        await expect(await gridElements.columnsSort.checkboxLabels.get(1).getText())
            .toEqual(columnHeaders.viewMfrPref.mfrPreferencesFilter[4]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.viewMfrPref.mfrPreferencesFilter[4]);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Manufacturer Preference', true);
        // // next expects can not be check because in base we do not have any parts with AML Risk status yet
        if (await gridElements.newGridRows.get(0).isPresent()) {
            const mfrPrefFilterValue: string[] = await grid.newGridReturnCellValuesByColumnName(1,
                'Manufacturer Preference');
            for (let i: number = 0; i < mfrPrefFilterValue.length; i++) {
                await expect(mfrPrefFilterValue[i]).toEqual(columnHeaders.viewMfrPref.mfrPreferencesFilter[4]);
            }
        }
    });

    it('should work Clear Filters button', async () => {
        await grid.newGridOpenFilterBoxByName('Manufacturer Preference');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.viewMfrPref.mfrPreferencesFilter[0]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.viewMfrPref.mfrPreferencesFilter[2]);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await grid.newGridOpenFilterBoxByName('Manufacturer Preference');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter),
            gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Manufacturer Preference', false);
        // next expects can not be check because in base we do not have any parts with AML Risk status yet
        if (await gridElements.newGridRows.get(0).isPresent()) {
            const mfrPrefFilterValue: string[] = await grid.newGridReturnCellValuesByColumnName(1,
                'Manufacturer Preference');
            await stringArray.arrayContain(mfrPrefFilterValue, columnHeaders.viewMfrPref.mfrPreferencesFilter);
        }
    });
});

describe('View Manufacturer Preferences - Manufacturer Preference - column sorting', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewMfrPref, gridElements.checkboxSelector.get(1));
        expect(await pageTitles.pageTitleShim2.getText()).toEqual(titles.viewMfrPref);
        await toolbar.removeWithClearAll();
    });

    afterEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Manufacturer Preference');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Manufacturer Preference', false);
        await grid.newGridOpenFilterBoxByName('Manufacturer Preference');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Manufacturer Preference', true);
        const activeNameActualAscValues: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.viewMfrPreferences['Manufacturer Preference'])).filter(String);
        const activeNameExpectAscValues: string[] = (await grid.compareAscValues(activeNameActualAscValues.slice().sort())).filter(String);
        await expect(activeNameExpectAscValues).toEqual(activeNameActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Manufacturer Preference', false);
        await grid.newGridOpenFilterBoxByName('Manufacturer Preference');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Manufacturer Preference', true);
        const activeNameActualDescValues: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.viewMfrPreferences['Manufacturer Preference'])).filter(String);
        const activeNameExpectDescValues: string[] = (await grid.compareDescValues(activeNameActualDescValues.slice())).filter(String);
        await expect(activeNameExpectDescValues).toEqual(activeNameActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Manufacturer Preference');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Manufacturer Preference', true);
        // const activeNameAscValues: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.viewMfrPreferences['Manufacturer Preference'])).filter(String);
        await grid.newGridOpenFilterBoxByName('Manufacturer Preference');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Manufacturer Preference', false);
        // const activeNameClearValues: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.viewMfrPreferences['Manufacturer Preference'])).filter(String);
        // await expect(activeNameAscValues).not.toEqual(activeNameClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Manufacturer Preference');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Manufacturer Preference');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Manufacturer Preference');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 1)).toEqual(145);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Manufacturer Preference');
        await toolbar.unhideCellNameWithUnhideAll('Manufacturer Preference');
        await expect(await gridElements.newGridHeaderByName('Manufacturer Preference').isDisplayed()).toBeTruthy();
    });
});
