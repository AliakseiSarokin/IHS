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
import {allureStep} from "../../../../../../helper/allure/allureSteps";


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

describe('CPL Alerts tab - CPL Alert Date - column sorting', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement('CPL Alerts', gridElements.grid);

    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'CPL Alert Date', false);
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'CPL Alert Date', true);
        const activeNameActualAscValues: any[] = (await grid.getCellValuesByCellId(columnIdByColumnName.mfrsKnowledgeBaseColumnNamesContent['CPL Alert Date'])).map(Date.parse);
        const activeNameExpectAscValues: string[] = await grid.compareAscNumberValues(activeNameActualAscValues.slice().sort());
        await expect(activeNameExpectAscValues).toEqual(activeNameActualAscValues);
    });

    it('should be DESC sorting by default', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'CPL Alert Date', false);
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'CPL Alert Date', true);
        const activeNameActualDescValues: any[] = (await grid.getCellValuesByCellId(columnIdByColumnName.mfrsKnowledgeBaseColumnNamesContent['CPL Alert Date'])).map(Date.parse);
        const activeNameExpectDescValues: string[] = await grid.compareDescNumberValues(activeNameActualDescValues.slice());
        await expect(activeNameExpectDescValues).toEqual(activeNameActualDescValues);
    });

    it('should be Clear sorting', async () => {
        const activeNameAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'CPL Alert Date');
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'CPL Alert Date', false);
        const activeNameClearValues: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.mfrsKnowledgeBaseColumnNamesContent['CPL Alert Date']);
        await expect(activeNameAscValues).not.toEqual(activeNameClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'CPL Alert Date');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(140);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('CPL Alert Date');
        await toolbar.unhideCellNameWithUnhideAll('CPL Alert Date');
        await expect(await gridElements.newGridHeaderByName('CPL Alert Date').isDisplayed()).toBeTruthy();
    });
});

describe('CPL Alerts tab - CPL Alert Date - column filtering', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement('CPL Alerts', gridElements.grid);
    });

    it('should be validation rules for filtering',async()=>{
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        const actualDateRangeOptions: string[] = await gridElements.columnsSort.dateRangedropdownList.getText();
        const expectedDateRangeList: string[]= await columnHeaders.dateRange.cplAlertsFilterOption;
        await expect(actualDateRangeOptions).toEqual(expectedDateRangeList);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should filter with ' + columnHeaders.dateRange.cplAlertsFilterOption[0] + ' option', async()=>{
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'CPL Alert Date',
            false);
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.dateRange.cplAlertsFilterOption[0]);
        await grid.peformSearchInColumnSort(gridElements.selectAllCheckboxes.last());
        if(! await gridElements.newGridNoRowsToShowText.get(0).isPresent()) {
            await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'CPL Alert Date',
                true);
            const datesValuesAfterDateFiltering: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['CPL Alert Date']);
            const todayStart = await grid.changeDateWithMomentJsInMilliseconds(0, '', 0, 0, 0, 0);
            for (let i: number = 0; i < datesValuesAfterDateFiltering.length; i++) {
                await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeLessThanOrEqual(moment().valueOf());
                await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeGreaterThanOrEqual(todayStart)
            }
        }
        else {
           await allureStep('No Alerts are present for the selected filter',async ()=> {

            });
        }
    });

    it('should filter with ' + columnHeaders.dateRange.cplAlertsFilterOption[1] + ' option', async()=> {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'CPL Alert Date',
            true);
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.dateRange.cplAlertsFilterOption[1]);
        await grid.peformSearchInColumnSort(gridElements.selectAllCheckboxes.last());
        if(! await gridElements.newGridNoRowsToShowText.get(0).isPresent()) {
            await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'CPL Alert Date',
                true);
            const datesValuesAfterDateFiltering: any[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['CPL Alert Date']);
            const lastSevenDays = await grid.changeDateWithMomentJsInMilliseconds(7, 'days', 0, 0, 0, 0);
            for (let i: number = 0; i < datesValuesAfterDateFiltering.length; i++) {
                await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeLessThanOrEqual(moment().valueOf());
                await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeGreaterThanOrEqual(lastSevenDays);
            }
        }
        else {
            await allureStep('No Alerts are present for the selected filter', async () => {
            });
        }
    });

    it('should filter with ' + columnHeaders.dateRange.cplAlertsFilterOption[2] + ' option', async()=> {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'CPL Alert Date',
            true);
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.dateRange.cplAlertsFilterOption[2]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        if(! await gridElements.newGridNoRowsToShowText.get(0).isPresent()) {
            await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'CPL Alert Date',
                true);
            const datesValuesAfterDateFiltering: any[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['CPL Alert Date']);
            const lastThirtyDays = await grid.changeDateWithMomentJsInMilliseconds(30, 'days', 0, 0, 0, 0);
            for (let i: number = 0; i < datesValuesAfterDateFiltering.length; i++) {
                await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeLessThanOrEqual(moment().valueOf());
                await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeGreaterThanOrEqual(lastThirtyDays);
            }
        }
        else {
            await allureStep('No Alerts are present for the selected filter', async () => {
            });
        }
    });

    it('should filter with ' + columnHeaders.dateRange.cplAlertsFilterOption[3] + ' option', async()=> {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'CPL Alert Date',
            true);
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.dateRange.cplAlertsFilterOption[3]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        if(! await gridElements.newGridNoRowsToShowText.get(0).isPresent()) {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'CPL Alert Date',
            true);
        const datesValuesAfterDateFiltering: any[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['CPL Alert Date']);
        const lastSixMonths = await grid.changeDateWithMomentJsInMilliseconds(6,'month',0,0,0,0);
        for (let i: number = 0; i < datesValuesAfterDateFiltering.length; i++) {
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeLessThanOrEqual(moment().valueOf());
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeGreaterThanOrEqual(lastSixMonths);
        }
        }
        else {
            await allureStep('No Alerts are present for the selected filter', async () => {
            });
        }
    });

    it('should filter with ' + columnHeaders.dateRange.cplAlertsFilterOption[4] + ' option', async()=> {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'CPL Alert Date',
            true);
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.dateRange.cplAlertsFilterOption[4]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        if(! await gridElements.newGridNoRowsToShowText.get(0).isPresent()) {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'CPL Alert Date',
            true);
        const datesValuesAfterDateFiltering: any[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['CPL Alert Date']);
        const lastYear = await grid.changeDateWithMomentJsInMilliseconds(1,'year',0,0,0,0);
        for (let i: number = 0; i < datesValuesAfterDateFiltering.length; i++) {
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeLessThanOrEqual(moment().valueOf());
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeGreaterThanOrEqual(lastYear);
        }
        }
        else {
            await allureStep('No Alerts are present for the selected filter', async () => {
            });
        }
    });
});
