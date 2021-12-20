import {browser} from "protractor";
import {buttonNames, columnHeaders, meganavItems} from "../../../../../../testData/global";
import {Button} from "../../../../../../components/simple/button";
import {Grid} from "../../../../../../components/grid";
import {dateRange, gridElements} from "../../../../../../elements/elements";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {Toolbar} from "../../../../../../components/toolbar";
import {Dropdown} from "../../../../../../components/dropdown";
import {columnIdByColumnName} from "../../../../../../testData/columnIdByColumnName";
import * as moment from "moment";
import {Link} from "../../../../../../components/simple/link";
import {DateTime} from "../../../../../../utils/dateTime";

const button: Button = new Button();
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const link: Link = new Link();

describe('CPL Alerts tab - LTD Date - column sorting', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement('CPL Alerts', gridElements.grid);
        await grid.newGridHideColumnsRange(['Corp P/N','Corp Name','Matched Mfr P/N','Matched Mfr Name'] )

    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('LTD Date');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'LTD Date', false);
        await grid.newGridOpenFilterBoxByName('LTD Date');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'LTD Date', true);
        const activeNameActualAscValues: any[] = (await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['LTD Date'])).map(Date.parse);
        const activeNameExpectAscValues: string[] = await grid.compareAscNumberValues(activeNameActualAscValues.slice().sort());
        await expect(activeNameExpectAscValues).toEqual(activeNameActualAscValues);
    });

    it('should be DESC sorting by default', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'LTD Date', false);
        await grid.newGridOpenFilterBoxByName('LTD Date');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'LTD Date', true);
        const activeNameActualDescValues: any[] = (await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['LTD Date'])).map(Date.parse);
        const activeNameExpectDescValues: string[] = await grid.compareDescNumberValues(activeNameActualDescValues.slice());
        await expect(activeNameExpectDescValues).toEqual(activeNameActualDescValues);
    });

    it('should be Clear sorting', async () => {
        const activeNameAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'LTD Date');
        await grid.newGridOpenFilterBoxByName('LTD Date');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'LTD Date', false);
        const activeNameClearValues: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['LTD Date']);
        if(activeNameAscValues[0] !== ''){
            await expect(activeNameAscValues).not.toEqual(activeNameClearValues);
        }
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('LTD Date');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('LTD Date');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'LTD Date');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(135);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('LTD Date');
        await toolbar.unhideCellNameWithCellValue('LTD Date');
        await expect(await gridElements.newGridHeaderByName('LTD Date').isDisplayed()).toBeTruthy();
    });
});

describe('CPL Alerts tab - LTD Date - column filtering', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement('CPL Alerts', gridElements.grid);
        await grid.newGridHideColumnsRange(['Corp P/N','Corp Name','Matched Mfr P/N','Matched Mfr Name'] )
    });

    it('should be validation rules for filtering',async()=>{
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('LTD Date');
        await grid.switchToFilterColumnMenu();
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        const actualDateRangeOptions: string[] = await gridElements.columnsSort.dateRangedropdownList.getText();
        const expectedDateRangeList: string[]= await columnHeaders.dateRange.dateOption;
        await expect(actualDateRangeOptions).toEqual(expectedDateRangeList);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should filter with ' + columnHeaders.dateRange.dateOption[0] + ' option', async()=>{
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'LTD Date',
            false);
        await grid.newGridOpenFilterBoxByName('LTD Date');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('LTD Date');
        await grid.switchToFilterColumnMenu()
        const dateValues: any[] = await grid.newGridReturnCellValuesByColumnName(1,'LTD Date');
        await grid.openDatePickerSelectDate(dateRange.buttonsFromTo.get(0), DateTime.getCurrentYear(dateValues[0]),
            DateTime.getCurrentMonthNum(dateValues[0]), DateTime.getCurrentDate(dateValues[0]));
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'LTD Date',
            true);
        const datesValuesAfterDateFiltering: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['LTD Date']);
        for (let i: number = 0; i < datesValuesAfterDateFiltering.length; i++) {
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf())
                .toBeGreaterThanOrEqual(moment(dateValues[0]).valueOf());
        }
    });

    it('should filter with ' + columnHeaders.dateRange.dateOption[1] + ' option', async()=> {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'LTD Date',
            true);
        const dateValues: any[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['LTD Date']);
        await grid.newGridOpenFilterBoxByName('LTD Date');
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.dateRange.dateOption[1]);
        await grid.openDatePickerSelectDate(dateRange.buttonsFromTo.get(0),
            DateTime.getCurrentYear(dateValues[0]), DateTime.getCurrentMonth(dateValues[0],'MMM'), DateTime.getCurrentDate(dateValues[0]));
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'LTD Date',
            true);
        const datesValuesAfterDateFiltering: any[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['LTD Date']);
        for (let i: number = 0; i < datesValuesAfterDateFiltering.length; i++) {
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeLessThanOrEqual(moment(dateValues[0]).valueOf());
        }
    });
});
