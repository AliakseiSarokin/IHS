import {browser} from "protractor";
import {
    buttonNames,
    columnHeaders, meganavItems
} from "../../../../../testData/global";
import {Button} from "../../../../../components/simple/button";
import {Grid} from "../../../../../components/grid";
import {gridElements} from "../../../../../elements/elements";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {JsScripts} from "../../../../../utils/jsScripts";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Toolbar} from "../../../../../components/toolbar";
import {Actions} from "../../../../../utils/actions";
import {Dropdown} from "../../../../../components/dropdown";
import {columnIdByColumnName} from "../../../../../testData/columnIdByColumnName";

const button: Button = new Button();
const grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();

describe('Knowledge Base - Parts Knowledge Base - Exception Mfr Name/ Column filters', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.newGridCellWithoutContentByRowIndex(0).get(1));
    });

    it('should be validation rules for filtering', async () => {
        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.sendKeys(gridElements.columnsSort.input, '   ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '3');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should filter with ' + columnHeaders.bom.filterOptions[2] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Exception Mfr Name',
            false);
        const psNameValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Exception Mfr Name');
        const sortValue: string = psNameValues.filter(String)[0];
        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Exception Mfr Name',
            true);
        const psValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Exception Mfr Name');
        for (let i: number = 0; i < psValuesAfterSorting.length; i++) {
            await expect(psValuesAfterSorting[i]).toEqual(sortValue);
        }
    });

    it('should filter with ' + columnHeaders.bom.filterOptions[1] + ' option', async () => {
        const psNameValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Exception Mfr Name');
        const sortValue: string = psNameValues.filter(String)[0].slice(0,2);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Exception Mfr Name',
            true);
        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[1]);
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Exception Mfr Name',
            true);
        const bomNameValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Exception Mfr Name');
        for (let i: number = 0; i < bomNameValuesAfterSorting.length; i++) {
            await expect(bomNameValuesAfterSorting[i].toLowerCase().indexOf(sortValue.toLowerCase()) === 0).toBeTruthy();
        }
        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.get(0));
    });

    it('should work Clear Filter button', async () => {
        const psNameValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Exception Mfr Name');
        const sortValue: string = psNameValues.filter(String)[0].slice(0,2);

        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Exception Mfr Name',
            false);
        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
    });
});

describe('Knowledge Base - Parts Knowledge Base - Exception Mfr Name/ Column sorting', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.gridWrapper);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Modified Date');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Exception Mfr Name', false);
        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Exception Mfr Name', true);
        const activeNameActualAscValues: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.partsKnowledgeBaseColumnNamesContent['Exception Mfr Name'])).filter(String);
        const activeNameExpectAscValues: string[] = (await grid.compareAscValues(activeNameActualAscValues.slice().sort())).filter(String);
        await expect(activeNameExpectAscValues).toEqual(activeNameActualAscValues);
        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Exception Mfr Name', false);
        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Exception Mfr Name', true);
        const activeNameActualDescValues: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.partsKnowledgeBaseColumnNamesContent['Exception Mfr Name'])).filter(String);
        const activeNameExpectDescValues: string[] = (await grid.compareDescValues(activeNameActualDescValues.slice())).filter(String);
        await expect(activeNameExpectDescValues).toEqual(activeNameActualDescValues);
        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const activeNameAscValues: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.partsKnowledgeBaseColumnNamesContent['Exception Mfr Name']);
        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Exception Mfr Name', false);
        const activeNameClearValues: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.partsKnowledgeBaseColumnNamesContent['Exception Mfr Name']);
        await expect(activeNameAscValues).not.toEqual(activeNameClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Exception Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Exception Mfr Name');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(200);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Exception Mfr Name');
        await toolbar.unhideCellNameWithUnhideAll('Exception Mfr Name');
        await expect(await gridElements.newGridHeaderByName('Exception Mfr Name').isDisplayed()).toBeTruthy();
    });
});