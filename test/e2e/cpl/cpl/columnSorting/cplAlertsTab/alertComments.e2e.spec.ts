import {browser} from "protractor";
import {buttonNames, columnHeaders, meganavItems} from "../../../../../../testData/global";
import {Button} from "../../../../../../components/simple/button";
import {Grid} from "../../../../../../components/grid";
import {gridElements} from "../../../../../../elements/elements";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {Toolbar} from "../../../../../../components/toolbar";
import {Actions} from "../../../../../../utils/actions";
import {Dropdown} from "../../../../../../components/dropdown";
import {columnIdByColumnName} from "../../../../../../testData/columnIdByColumnName";
import {Link} from "../../../../../../components/simple/link";

const button: Button = new Button();
const grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const link: Link = new Link();

describe('CPL ALerts tab- Alert Comments - column filtering', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement('CPL Alerts', gridElements.grid);
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Corp P/N','Corp Name','Matched Mfr P/N','Matched Mfr Name']);
    });

    it('should be validation rules for filtering', async () => {
        await grid.newGridOpenFilterBoxByName('Alert Comments');
        await grid.switchToFilterColumnMenu();
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.sendKeys(gridElements.columnsSort.input, '   ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '3');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should filter with ' + columnHeaders.bom.filterOptions[1] + ' option', async () => {
        await grid.newGridOpenFilterBoxByName('Alert Comments');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const values: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Alert Comments');
        const sortValue: string = values[1].slice(0,2);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Alert Comments',
            false);
        await grid.newGridOpenFilterBoxByName('Alert Comments');
        await grid.switchToFilterColumnMenu();
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.newGridDropdownInput,
            'value')).toEqual(columnHeaders.bom.filterOptions[1]);
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Alert Comments',
            true);
        const afterSortValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Alert Comments');
        for (let i: number = 0; i < afterSortValues.length; i++) {
            await expect(afterSortValues[i].toLowerCase().indexOf(sortValue.toLowerCase()) === 0).toBeTruthy();
            await expect(afterSortValues[i].toLowerCase()).toContain(sortValue.toLowerCase());
        }
    });

    it('should filter with ' + columnHeaders.bom.filterOptions[2] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Alert Comments',
            true);
        const psNameValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Alert Comments');
        await grid.newGridOpenFilterBoxByName('Alert Comments');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, psNameValues[1]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Alert Comments',
            true);
        const psValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Alert Comments');
        for (let i: number = 0; i < psValuesAfterSorting.length; i++) {
            await expect(psValuesAfterSorting[i]).toEqual(psNameValues[1]);
        }
    });

    it('should filter with ' + columnHeaders.bom.filterOptions[0] + ' option', async () => {
        const psNameValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Alert Comments');
        const sortValue: string = psNameValues[0].slice(0,2);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Alert Comments',
            true);
        await grid.newGridOpenFilterBoxByName('Alert Comments');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[0]);
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Alert Comments',
            true);
        const bomNameValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Alert Comments');
        for (let i: number = 0; i < bomNameValuesAfterSorting.length; i++) {
            await expect(bomNameValuesAfterSorting[i].toLowerCase()).toContain(sortValue.toLowerCase());
        }
    });

    it('should work Clear Filter button', async () => {
        const psNameValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Alert Comments');
        const sortValue: string = psNameValues[0].slice(0,2);
        await grid.newGridOpenFilterBoxByName('Alert Comments');
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Alert Comments');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Alert Comments',
            false);
        await grid.newGridOpenFilterBoxByName('Alert Comments');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
    });
});

describe('CPL ALerts tab- Alert Comments - column sorting', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement('CPL Alerts', gridElements.grid);
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Alert Comments');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Alert Comments', false);
        await grid.newGridOpenFilterBoxByName('Alert Comments');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Alert Comments', true);
        const activeNameActualAscValues: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Alert Comments'])).filter(String);
        const activeNameExpectAscValues: string[] = (await grid.compareAscValues(activeNameActualAscValues.slice().sort())).filter(String);
        await expect(activeNameExpectAscValues).toEqual(activeNameActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Alert Comments', false);
        await grid.newGridOpenFilterBoxByName('Alert Comments');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Alert Comments', true);
        const activeNameActualDescValues: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Alert Comments'])).filter(String);
        const activeNameExpectDescValues: string[] = (await grid.compareDescValues(activeNameActualDescValues.slice())).filter(String);
        await expect(activeNameExpectDescValues).toEqual(activeNameActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Alert Comments');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const activeNameAscValues: string[] = (await grid.newGridReturnCellValuesByColumnName(1,
            'Alert Comments')).filter(String);
        await grid.newGridOpenFilterBoxByName('Alert Comments');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Alert Comments', false);
        const activeNameClearValues: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Alert Comments'])).filter(String);
        await expect(activeNameAscValues).not.toEqual(activeNameClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Alert Comments');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Corp P/N','Corp Name','Matched Mfr P/N','Matched Mfr Name']);
        await grid.newGridOpenFilterBoxByName('Alert Comments');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Alert Comments');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(140);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Alert Comments');
        await toolbar.unhideCellNameWithUnhideAll('Alert Comments');
        await expect(await gridElements.newGridHeaderByName('Alert Comments').isDisplayed()).toBeTruthy();
    });
});
