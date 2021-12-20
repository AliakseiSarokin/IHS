import {browser, element} from "protractor";
import {buttonNames, columnHeaders, meganavItems} from "../../../../../../testData/global";
import {Button} from "../../../../../../components/simple/button";
import {Grid} from "../../../../../../components/grid";
import {dateRange, pageTitles} from "../../../../../../elements/elements";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {Toolbar} from "../../../../../../components/toolbar";
import {Dropdown} from "../../../../../../components/dropdown";
import {Actions} from "../../../../../../utils/actions";
import {dropdownElements, gridElements} from "../../../../../../elements/elements";
import {columnIdByColumnName} from "../../../../../../testData/columnIdByColumnName";
import {typeAheadOption, typeAheadValue} from "../../../../../../bussinesLayer/search/mfrSearchLogic";
import {TypeAhead} from "../../../../../../components/typeAhead";
import {async} from "q";
import * as moment from "moment";
import {isDate} from "moment";
import {commonSearch} from "../../../../../../testData/search";
import {SingleBomLogic} from "../../../../../../bussinesLayer/bomVault/singleBomLogic";
import{MatchManufacturersLogic, MatchPartsLogic} from "../../../../../../bussinesLayer/bomVault/matchPartsLogic";
import {Modal} from "../../../../../../components/modal";
import {Input} from "../../../../../../components/simple/input";
import {Link} from "../../../../../../components/simple/link";
import {DateTime} from "../../../../../../utils/dateTime";


const button: Button = new Button();
const grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const matchPartsLogic: MatchPartsLogic = new MatchPartsLogic();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const input: Input = new Input();
const modal:Modal = new Modal();
const typeAhead: TypeAhead = new TypeAhead();
const link: Link = new Link();

describe('CPL Alerts tab - Implementation Date - column sorting', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement('CPL Alerts', gridElements.grid);
        await grid.newGridHideColumnsRange(['Corp P/N','Corp Name','Matched Mfr P/N','Matched Mfr Name','Alert Type','Alert Description'] )
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Implementation Date');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Implementation Date', false);
        await grid.newGridOpenFilterBoxByName('Implementation Date');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Implementation Date', true);
        const activeNameActualAscValues: any[] = (await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Implementation Date'])).map(Date.parse);
        const activeNameExpectAscValues: string[] = await grid.compareAscNumberValues(activeNameActualAscValues.slice().sort());
        await expect(activeNameExpectAscValues).toEqual(activeNameActualAscValues);
    });

    it('should be DESC sorting by default', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Implementation Date', false);
        await grid.newGridOpenFilterBoxByName('Implementation Date');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Implementation Date', true);
        const activeNameActualDescValues: any[] = (await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Implementation Date'])).map(Date.parse);
        const activeNameExpectDescValues: string[] = await grid.compareDescNumberValues(activeNameActualDescValues.slice());
        await expect(activeNameExpectDescValues).toEqual(activeNameActualDescValues);
    });

    it('should be Clear sorting', async () => {
        const activeNameAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Implementation Date');
        await grid.newGridOpenFilterBoxByName('Implementation Date');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Implementation Date', false);
        const activeNameClearValues: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Implementation Date']);
        await expect(activeNameAscValues).not.toEqual(activeNameClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Implementation Date');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Implementation Date');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Corp P/N','Corp Name','Matched Mfr P/N','Matched Mfr Name','Alert Type','Alert Description']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Implementation Date');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(140);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Implementation Date');
        await toolbar.unhideCellNameWithCellValue('Implementation Date');
        await expect(await gridElements.newGridHeaderByName('Implementation Date').isDisplayed()).toBeTruthy();
    });
});

describe('CPL Alerts tab - Implementation Date - column filtering', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement('CPL Alerts', gridElements.grid);
        await grid.newGridHideColumnsRange(['Corp P/N','Corp Name','Matched Mfr P/N','Matched Mfr Name','Alert Type','Alert Description'] )
    });

    it('should be validation rules for filtering',async()=>{
        await grid.newGridOpenFilterBoxByName('Implementation Date');
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
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Implementation Date',
            false);
        await grid.newGridOpenFilterBoxByName('Implementation Date');
        const dateValues: any[] = (await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Implementation Date']))
            .filter(ar => ar != '');
        await grid.openDatePickerSelectDate(dateRange.buttonsFromTo.get(0), DateTime.getCurrentYear(dateValues[0]),
            DateTime.getCurrentMonthNum(dateValues[0]), DateTime.getCurrentDate(dateValues[0]));
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Implementation Date',
            true);
        const datesValuesAfterDateFiltering: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Implementation Date']);
        for (let i: number = 0; i < datesValuesAfterDateFiltering.length; i++) {
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf())
                .toBeGreaterThanOrEqual(moment(dateValues[0]).valueOf());
        }
    });

    it('should filter with ' + columnHeaders.dateRange.dateOption[1] + ' option', async()=> {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Implementation Date',
            true);
        const dateValues: any[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Implementation Date']);
        await grid.newGridOpenFilterBoxByName('Implementation Date');
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.dateRange.dateOption[1]);
        await grid.openDatePickerSelectDate(dateRange.buttonsFromTo.get(0), DateTime.getCurrentYear(dateValues[0]),
            DateTime.getCurrentMonthNum(dateValues[0]), DateTime.getCurrentDate(dateValues[0]));
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Implementation Date',
            true);
        const datesValuesAfterDateFiltering: any[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Implementation Date']);
        for (let i: number = 0; i < datesValuesAfterDateFiltering.length; i++) {
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeLessThanOrEqual(moment(dateValues[0]).valueOf());
        }
    });
});
