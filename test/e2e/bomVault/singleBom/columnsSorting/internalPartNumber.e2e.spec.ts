import {Actions} from "../../../../../utils/actions";
import {Button} from "../../../../../components/simple/button";
import {browser} from "protractor";
import {
    buttonNames, columnHeaders, commonData, meganavItems
} from "../../../../../testData/global";
import {Dropdown} from "../../../../../components/dropdown";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {Grid} from "../../../../../components/grid";
import {gridElements} from "../../../../../elements/elements";
import {JsScripts} from "../../../../../utils/jsScripts";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {SingleBomLogic} from "../../../../../bussinesLayer/bomVault/singleBomLogic";
import {Toolbar} from "../../../../../components/toolbar";

const button: Button = new Button;
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();

describe('BOM Details - Internal Part Number column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        await singleBomLogic.openSingleBomByName(commonData.bomNameWithIcons);
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Internal Part Number');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 0,
            'Internal Part Number', false);
        await grid.newGridOpenFilterBoxByName('Internal Part Number');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 0,
            'Internal Part Number', true);
        const intPartNumberActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Internal Part Number');
        const intPartNumberExpectAscValues: string[] = await grid.compareAscValues(intPartNumberActualAscValues.slice());
        await expect(intPartNumberExpectAscValues).toEqual(intPartNumberActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 0,
            'Internal Part Number', false);
        await grid.newGridOpenFilterBoxByName('Internal Part Number');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 0,
            'Internal Part Number', true);
        const intPartNumberActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Internal Part Number');
        const intPartNumberExpectDescValues: string[] = await grid.compareDescValues(intPartNumberActualDescValues.slice());
        await expect(intPartNumberExpectDescValues).toEqual(intPartNumberActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Internal Part Number');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const intPartNumberAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Internal Part Number');
        await grid.newGridOpenFilterBoxByName('Internal Part Number');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 0,
            'Internal Part Number', false);
        const intPartNumberClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Internal Part Number');
        await expect(intPartNumberAscValues).not.toEqual(intPartNumberClearValues);
    });

    it('should work Reset columns', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(0, 'Rel. Info');
        const defaultWidth: number = await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 1);
        await grid.newGridOpenFilterBoxByName('Internal Part Number');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Internal Part Number');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, colNumber + 1))
            .toEqual(defaultWidth);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Internal Part Number');
        await toolbar.unhideCellNameWithUnhideAll('Internal Part Number');
    });
});

describe('BOM Details - Internal Part Number column filter', () => {

    let ipnValue: string;
    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        await singleBomLogic.openSingleBomByName(commonData.bomNameWithIcons);
        ipnValue = (await grid.newGridReturnCellValuesByColumnName(0, 'Internal Part Number'))[0]
    });

    afterEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.reset), gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await browser.sleep(1000);
    });

    it('should be validation rules for filtering', async () => {
        await grid.newGridOpenFilterBoxByName('Internal Part Number');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.sendKeys(gridElements.columnsSort.input, '   ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '3');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[0] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Internal Part Number', false);
        await grid.newGridOpenFilterBoxByName('Internal Part Number');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.newGridDropdownInput,
            'value')).toEqual(columnHeaders.bom.filterOptions[0]);
        await Actions.sendKeys(gridElements.columnsSort.input, ipnValue.slice(0, 4));
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Internal Part Number', true);
        const intPartNumberValues: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Internal Part Number');
        for (let i: number = 0; i < intPartNumberValues.length; i++) {
            await expect(intPartNumberValues[i]).toContain(ipnValue.slice(0, 4));
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[2] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Internal Part Number', false);
        const intPartNumberValues: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Internal Part Number');
        await grid.newGridOpenFilterBoxByName('Internal Part Number');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.sendKeys(gridElements.columnsSort.input, intPartNumberValues[0]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Internal Part Number', true);
        const intPartNumberValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Internal Part Number');
        for (let i: number = 0; i < intPartNumberValuesAfterSorting.length; i++) {
            await expect(intPartNumberValuesAfterSorting[i]).toEqual(intPartNumberValues[0])
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[1] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Internal Part Number', false);
        await grid.newGridOpenFilterBoxByName('Internal Part Number');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[1]);
        await Actions.sendKeys(gridElements.columnsSort.input, ipnValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Internal Part Number', true);
        const intPartNumberValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Internal Part Number');
        for (let i: number = 0; i < intPartNumberValuesAfterSorting.length; i++) {
            await expect(intPartNumberValuesAfterSorting[i].indexOf(ipnValue) === 0).toBeTruthy();
        }
    });

    it('should work Clear Filter button', async () => {
        await grid.newGridOpenFilterBoxByName('Internal Part Number');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[1]);
        await Actions.sendKeys(gridElements.columnsSort.input, ipnValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        const intPartNumberValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Internal Part Number');
        await grid.newGridOpenFilterBoxByName('Internal Part Number');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Internal Part Number', false);
        const intPartNumberValuesAfterClearing: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Internal Part Number');
        await expect(intPartNumberValuesAfterSorting).not.toEqual(intPartNumberValuesAfterClearing);
    });
});
