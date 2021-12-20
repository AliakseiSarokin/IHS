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

describe('CPL Alerts tab- Alert Number - column filtering', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement('CPL Alerts', gridElements.grid);
        await grid.newGridOpenFilterBoxByName('CPL Alert Date');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Corp P/N','Corp Name','Matched Mfr P/N','Matched Mfr Name','Alert Type', 'Alert Description', 'Alert Comments']);
    });

    it('should be validation rules for filtering', async () => {
        await grid.newGridOpenFilterBoxByName('Alert Number');
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
        const values: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Alert Number']);
        const sortValue: string = values[1].slice(0,2);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Alert Number',
            false);
        await grid.newGridOpenFilterBoxByName('Alert Number');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.newGridDropdownInput,
            'value')).toEqual(columnHeaders.bom.filterOptions[1]);
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Alert Number',
            true);
        const afterSortValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Alert Number');
        for (let i: number = 0; i < afterSortValues.length; i++) {
            await expect(afterSortValues[i].toLowerCase().indexOf(sortValue.toLowerCase()) === 0).toBeTruthy();
        }
    });

    it('should filter with ' + columnHeaders.bom.filterOptions[2] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Alert Number',
            true);
        const psNameValues: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Alert Number']);
        await grid.newGridOpenFilterBoxByName('Alert Number');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, psNameValues[1]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Alert Number',
            true);
        const psValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Alert Number');
        for (let i: number = 0; i < psValuesAfterSorting.length; i++) {
            await expect(psValuesAfterSorting[i]).toEqual(psNameValues[1]);
        }
    });

    it('should filter with ' + columnHeaders.bom.filterOptions[0] + ' option', async () => {
        const psNameValues: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Alert Number']);
        const sortValue: string = psNameValues[0].slice(0,2);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Alert Number',
            true);
        await grid.newGridOpenFilterBoxByName('Alert Number');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[0]);
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Alert Number',
            true);
        const bomNameValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
        'Alert Number');
        for (let i: number = 0; i < bomNameValuesAfterSorting.length; i++) {
            await expect(bomNameValuesAfterSorting[i].toLowerCase()).toContain(sortValue.toLowerCase());
        }
    });

    it('should work Clear Filter button', async () => {
        const psNameValues: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Alert Number']);;
        const sortValue: string = psNameValues[0].slice(0,2);
        await grid.newGridOpenFilterBoxByName('Alert Number');
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Alert Number');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Alert Number',
            false);
        await grid.newGridOpenFilterBoxByName('Alert Number');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
    });
});

describe('CPL ALerts tab- Alert Number - column sorting', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement('CPL Alerts', gridElements.grid);
        await grid.newGridHideColumnsRange(['Corp P/N','Corp Name','Matched Mfr P/N','Matched Mfr Name','Alert Type', 'Alert Description', 'Alert Comments']);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Alert Number');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions2);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Alert Number');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[1], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Alert Number');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[3], gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Corp P/N','Corp Name','Matched Mfr P/N','Matched Mfr Name','Alert Type', 'Alert Description', 'Alert Comments']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Alert Number');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(160);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Alert Number');
        await toolbar.unhideCellNameWithCellValue('Alert Number');
        await expect(await gridElements.newGridHeaderByName('Alert Number').isDisplayed()).toBeTruthy();
    });
});
