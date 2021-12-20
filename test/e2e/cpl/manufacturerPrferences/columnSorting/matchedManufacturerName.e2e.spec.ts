import {browser} from "protractor";
import {
    buttonNames,
    columnHeaders, meganavItems, titles
} from "../../../../../testData/global";

import {Button} from "../../../../../components/simple/button";
import {Grid} from "../../../../../components/grid";
import {commonElements, dropdownElements, gridElements, pageTitles} from "../../../../../elements/elements";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {JsScripts} from "../../../../../utils/jsScripts";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Toolbar} from "../../../../../components/toolbar";
import {Actions} from "../../../../../utils/actions";
import {Dropdown} from "../../../../../components/dropdown";
import {columnIdByColumnName} from "../../../../../testData/columnIdByColumnName";
import {TypeAhead} from "../../../../../components/typeAhead"

const button: Button = new Button();
const grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const typeAhead: TypeAhead = new TypeAhead();

describe('View Manufacturer Preferences- Matched Manufacturer Name - column filtering', () => {

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

    it('should be validation rules for filtering', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched Manufacturer Name',
            false);
        const values: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.viewMfrPreferences['Matched Manufacturer Name'])).filter(String);
        const sortValue: string = values[0].slice(0,7);
        await grid.newGridOpenFilterBoxByName('Matched Manufacturer Name');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await typeAhead.typeAheadChecking(gridElements.columnsSort.mfrTypeAhead, sortValue);
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
        await button.clickOnTheElement(gridElements.columnsSort.xButtonSelectedTags.get(0));
        await typeAhead.typeAheadChecking(gridElements.columnsSort.mfrTypeAhead, '   ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await button.clickOnTheElement(commonElements.commonTypeAheadInputsXbutton.get(0));
    });

    it('should filter with type ahead option', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await button.clickOnTheElement(dropdownElements.dropdownValues.get(3));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched Manufacturer Name',
            false);
        const values: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.viewMfrPreferences['Matched Manufacturer Name'])).filter(String);
        const sortValue: string = values[0].slice(0,7);
        await grid.newGridOpenFilterBoxByName('Matched Manufacturer Name');
        await typeAhead.typeAheadChecking(gridElements.columnsSort.mfrTypeAhead, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched Manufacturer Name',
            true);
        const mfrNameValuesAfterSorting: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.viewMfrPreferences['Matched Manufacturer Name']);
        for (let i: number = 0; i < mfrNameValuesAfterSorting.length; i++) {
            await expect(mfrNameValuesAfterSorting[i].toLowerCase().indexOf(sortValue.toLowerCase()) === 0).toBeTruthy();
        }
    });

    it('should work Clear Filter button', async () => {
        const mfrNameValuesAfterSorting: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.viewMfrPreferences['Matched Manufacturer Name']);
        await grid.newGridOpenFilterBoxByName('Matched Manufacturer Name');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched Manufacturer Name',
            false);
        const mfrNameValuesAfterClearing: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.viewMfrPreferences['Matched Manufacturer Name']);
        await expect(mfrNameValuesAfterSorting).not.toEqual(mfrNameValuesAfterClearing);
        await grid.newGridCloseFilterBoxIfPresent();
    });
});

describe('View Manufacturer Preferences - Matched Manufacturer Name - column sorting', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewMfrPref, gridElements.checkboxSelector.get(1));
        expect(await pageTitles.pageTitleShim2.getText()).toEqual(titles.viewMfrPref);
        await toolbar.removeWithClearAll();
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });
// disabled untill Matched Mfr column sorting will removed (as in View Single Bom/Matched tab)
    xit('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Manufacturer Name');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions2);
            });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Manufacturer Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[1], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Matched Manufacturer Name');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[3], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Matched Manufacturer Name');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(200);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Matched Manufacturer Name');
        await toolbar.unhideCellNameWithUnhideAll('Matched Manufacturer Name');
        await expect(await gridElements.newGridHeaderByName('Matched Manufacturer Name').isDisplayed()).toBeTruthy();
    });
});
