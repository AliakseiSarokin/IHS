import {browser} from "protractor";
import {
    buttonNames,
    columnHeaders, meganavItems
} from "../../../../../testData/global";
import {Button} from "../../../../../components/simple/button";
import {Link} from "../../../../../components/simple/link";
import {Grid} from "../../../../../components/grid";
import {
    dateRange,
    gridElements,
    matchingElements,
    pageTitles,
    partStandardization
} from "../../../../../elements/elements";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {JsScripts} from "../../../../../utils/jsScripts";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Toolbar} from "../../../../../components/toolbar";
import {Actions} from "../../../../../utils/actions";
import {Dropdown} from "../../../../../components/dropdown";
import {columnIdByColumnName} from "../../../../../testData/columnIdByColumnName";
import {typeAheadOption} from "../../../../../bussinesLayer/search/mfrSearchLogic";
import {TypeAhead} from "../../../../../components/typeAhead";
import {MatchManufacturersLogic, MatchPartsLogic} from "../../../../../bussinesLayer/bomVault/matchPartsLogic";
import * as moment from "moment";
import {Modal} from "../../../../../components/modal";
import {SingleBomLogic} from "../../../../../bussinesLayer/bomVault/singleBomLogic";
//import {MatchPartsLogic} from "../../../../../bussinesLayer/bomVault/matchPartsLogic";
import {commonSearch} from "../../../../../testData/search";
import {Input} from "../../../../../components/simple/input";

const button: Button = new Button();
const grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const typeAhead: TypeAhead = new TypeAhead();
const modal:Modal = new Modal();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const matchPartsLogic: MatchPartsLogic = new MatchPartsLogic();
const input: Input = new Input();
const link = new Link();
import {Waiters as w} from "./../../../../../helper/waiters"

describe('Knowledge Base - Parts Knowledge Base - Modified Date/ Column sorting', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.gridWrapper);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Modified Date');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Modified Date');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Modified Date', false);
        await grid.newGridOpenFilterBoxByName('Modified Date');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Modified Date', true);
        const activeNameActualAscValues: any[] = (await grid.getCellValuesByCellId(columnIdByColumnName.partsKnowledgeBaseColumnNamesContent['Modified Date'])).map(Date.parse);
        const activeNameExpectAscValues: string [] = await grid.compareAscNumberValues(activeNameActualAscValues.slice().sort());
        await expect(activeNameExpectAscValues).toEqual(activeNameActualAscValues);
    });

    it('should be DESC sorting by default', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Modified Date', false);
        await grid.newGridOpenFilterBoxByName('Modified Date');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Modified Date', true);
        const activeNameActualDescValues: any [] = (await grid.getCellValuesByCellId(columnIdByColumnName.partsKnowledgeBaseColumnNamesContent['Modified Date'])).map(Date.parse);
        const activeNameExpectDescValues: string [] = await grid.compareDescNumberValues(activeNameActualDescValues.slice());
        await expect(activeNameExpectDescValues).toEqual(activeNameActualDescValues);
    });
    it('should be Clear sorting', async () => {
        const activeNameAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Modified Date');
        await grid.newGridOpenFilterBoxByName('Modified Date');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Modified Date', false);
        const activeNameClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Modified Date');
        await expect(activeNameAscValues).not.toEqual(activeNameClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Modified Date');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Modified Date');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Modified Date');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(200);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Modified Date');
        await toolbar.unhideCellNameWithUnhideAll('Modified Date');
        await expect(await gridElements.newGridHeaderByName('Modified Date').isDisplayed()).toBeTruthy();
    });
});
describe('Knowledge Base - Parts Knowledge Base - Modified Date/ Column filtering', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.gridWrapper);
    });

    it('should be validation rules for filtering',async()=>{
        await grid.newGridOpenFilterBoxByName('Modified Date');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        const actualDateRangeOptions: string[] = await gridElements.columnsSort.dateRangedropdownList.getText();
        const expectedDateRangeList: string[]= await columnHeaders.dateRange.filterOptions;
        await expect(actualDateRangeOptions).toEqual(expectedDateRangeList);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should filter with ' + columnHeaders.dateRange.filterOptions[0] + ' option', async()=>{
        //preconditions: add new manufacturer to knowledge base;
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.firstRowLink);
        await matchPartsLogic.goToMatchParts();
        const bomTitle: string = await pageTitles.singleBomPageTitle.getText();
        const bomName: string = bomTitle.split('View Single BOM: ')[1];
        await grid.checkCheckboxRange(1, 2);
        await modal.openModalWithButtonByName(buttonNames.searchForMatch);
        await input.fillFieldWithValue(matchingElements.searchForMatchModalPartNumberInput, commonSearch.commonValue);
        await button.clickByButtonNameAndWait(buttonNames.search, matchingElements.checkboxInput.get(1));
        await w.waitUntilElementIsClickable(matchingElements.checkboxInput.get(1));
        await browser.sleep(500);
        await grid.checkCheckboxRange(1, 2);         
        await modal.closeModalWithButton(buttonNames.yesUseThisMatchingPart);
        browser.sleep(1500); //grid refreshes twice
        await modal.openModalWithButtonByName(buttonNames.saveChanges);
        await modal.closeModalWithButton(buttonNames.yesConfirmAllChangesAndDoNotReprocessBOM);
        //test
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.gridWrapper);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Modified Date',
            false);
        await grid.newGridOpenFilterBoxByName('Modified Date');
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.dateRange.filterOptions[0]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Modified Date',
            true);
        const datesValuesAfterDateFiltering: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.partsKnowledgeBaseColumnNamesContent['Modified Date']);
        const todayStart = await grid.changeDateWithMomentJsInMilliseconds(0,'',0,0,0,0);
        for (let i: number = 0; i < datesValuesAfterDateFiltering.length; i++) {
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeLessThanOrEqual(moment().valueOf());
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeGreaterThanOrEqual(todayStart)
        }
    });

    it('should filter with ' + columnHeaders.dateRange.filterOptions[1] + ' option', async()=> {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Modified Date',
            true);
        await grid.newGridOpenFilterBoxByName('Modified Date');
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.dateRange.filterOptions[1]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Modified Date',
            true);
        const datesValuesAfterDateFiltering: any[] = await grid.getCellValuesByCellId(columnIdByColumnName.partsKnowledgeBaseColumnNamesContent['Modified Date']);
        const lastSevenDays = await grid.changeDateWithMomentJsInMilliseconds(7,'days',0,0,0,0);
        for (let i: number = 0; i < datesValuesAfterDateFiltering.length; i++) {
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeLessThanOrEqual(moment().valueOf());           
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeGreaterThanOrEqual(lastSevenDays);
        }
    });

    it('should filter with ' + columnHeaders.dateRange.filterOptions[2] + ' option', async()=> {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Modified Date',
            true);
        await grid.newGridOpenFilterBoxByName('Modified Date');
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.dateRange.filterOptions[2]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Modified Date',
            true);
        const datesValuesAfterDateFiltering: any[] = await grid.getCellValuesByCellId(columnIdByColumnName.partsKnowledgeBaseColumnNamesContent['Modified Date']);
        const lastThirtyDays = await grid.changeDateWithMomentJsInMilliseconds(30,'days',0,0,0,0);
        for (let i: number = 0; i < datesValuesAfterDateFiltering.length; i++) {
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeLessThanOrEqual(moment().valueOf());       
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeGreaterThanOrEqual(lastThirtyDays);
        }
    });

    it('should filter with ' + columnHeaders.dateRange.filterOptions[3] + ' option', async()=> {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Modified Date',
            true);
        await grid.newGridOpenFilterBoxByName('Modified Date');
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.dateRange.filterOptions[3]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Modified Date',
            true);
        const datesValuesAfterDateFiltering: any[] = await grid.getCellValuesByCellId(columnIdByColumnName.partsKnowledgeBaseColumnNamesContent['Modified Date']);
        const lastSixMonths = await grid.changeDateWithMomentJsInMilliseconds(6,'month',0,0,0,0);
        for (let i: number = 0; i < datesValuesAfterDateFiltering.length; i++) {
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeLessThanOrEqual(moment().valueOf());
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeGreaterThanOrEqual(lastSixMonths);
        }
    });

    it('should filter with ' + columnHeaders.dateRange.filterOptions[4] + ' option', async()=> {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Modified Date',
            true);
        await grid.newGridOpenFilterBoxByName('Modified Date');
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.dateRange.filterOptions[4]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Modified Date',
            true);
        const datesValuesAfterDateFiltering: any[] = await grid.getCellValuesByCellId(columnIdByColumnName.partsKnowledgeBaseColumnNamesContent['Modified Date']);
        const lastYear = await grid.changeDateWithMomentJsInMilliseconds(1,'year',0,0,0,0);
        for (let i: number = 0; i < datesValuesAfterDateFiltering.length; i++) {
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeLessThanOrEqual(moment().valueOf());
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeGreaterThanOrEqual(lastYear);
        }
    });

    it('should filter with ' + columnHeaders.dateRange.filterOptions[5] + ' option', async()=> {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Modified Date',
            true);
        const dateValues: any[] = await grid.getCellValuesByCellId(columnIdByColumnName.partsKnowledgeBaseColumnNamesContent['Modified Date']);
        const dateValuesDate = await moment(dateValues[1]).date();
        const dateValuesMonth = await moment(dateValues[1]).format('MMM');
        const dateValuesYear = await moment(dateValues[1]).year();
        const dateValuesTodayDate = await moment().date();
        await grid.newGridOpenFilterBoxByName('Modified Date');
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dateRangedropdownButton);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.dateRange.filterOptions[5]);
        await grid.openDatePickerSelectDate(dateRange.buttonsFromTo.get(0), dateValuesYear, dateValuesMonth, dateValuesDate);
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await grid.openDatePickerSelectDate(dateRange.buttonsFromTo.get(1), dateValuesYear, dateValuesMonth, dateValuesTodayDate);
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Modified Date',
            true);
        const datesValuesAfterDateFiltering: any[] = await grid.getCellValuesByCellId(columnIdByColumnName.partsKnowledgeBaseColumnNamesContent['Modified Date']);
        for (let i: number = 0; i < datesValuesAfterDateFiltering.length; i++) {
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeLessThanOrEqual(moment().valueOf());
            await expect(moment(datesValuesAfterDateFiltering[i]).valueOf()).toBeGreaterThanOrEqual(moment(dateValues[1]).valueOf());
        }
    });

    it('should delete manufacturer from knowledge base', async() => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.gridWrapper);
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await button.clickByButtonNameAndWait(buttonNames.yesDeleteSelectedItems, gridElements.checkboxSelector.get(1));
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.firstRowLink);
        await matchPartsLogic.goToMatchParts();
        await link.clickOnTheLinkByName('BOM Details');
        await button.clickByButtonName(buttonNames.reprocess);
        await modal.closeModalWithButton(buttonNames.yesReporcessThisBom);
    })
});