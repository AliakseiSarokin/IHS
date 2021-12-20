import {browser} from "protractor";
import {buttonNames, columnHeaders, meganavItems} from "../../../../../../testData/global";
import {Button} from "../../../../../../components/simple/button";
import {Grid} from "../../../../../../components/grid";
import {commonElements, gridElements, pageTitles} from "../../../../../../elements/elements";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {Toolbar} from "../../../../../../components/toolbar";
import {Actions} from "../../../../../../utils/actions";
import {Dropdown} from "../../../../../../components/dropdown";
import {columnIdByColumnName} from "../../../../../../testData/columnIdByColumnName";
import {titles} from "../../../../../../testData/global";
import {Link} from "../../../../../../components/simple/link";
import {TypeAhead} from "../../../../../../components/typeAhead";

const button: Button = new Button();
const grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const link: Link = new Link();
const typeAhead: TypeAhead = new TypeAhead()

describe('CPL ALerts tab- Matched Mfr Name - column filtering', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement('CPL Alerts', gridElements.grid)
    });

    afterEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be validation rules for filtering', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'Matched Mfr Name',
            false);
        const values: string[] = (await grid.newGridReturnCellValuesByColumnName(0,
            'Matched Mfr Name')).filter(String);
        const sortValue: string = values[0].slice(0,7);
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
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
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'Matched Mfr Name',
            false);
        const values: string[] = (await grid.newGridReturnCellValuesByColumnName(0,
            'Matched Mfr Name')).filter(String);
        const sortValue: string = values[0].slice(0,7);
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await typeAhead.typeAheadChecking(gridElements.columnsSort.mfrTypeAhead, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'Matched Mfr Name',
            true);
        const mfrNameValuesAfterSorting: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Matched Mfr Name']);
        for (let i: number = 0; i < mfrNameValuesAfterSorting.length; i++) {
            await expect(mfrNameValuesAfterSorting[i].toLowerCase().indexOf(sortValue.toLowerCase()) === 0).toBeTruthy();
        }
    });

    it('should work Clear Filter button', async () => {
        const mfrNameValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Matched Mfr Name');
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'Matched Mfr Name',
            false);
        const mfrNameValuesAfterClearing: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Matched Mfr Name');
        await expect(mfrNameValuesAfterSorting).not.toEqual(mfrNameValuesAfterClearing);
        await grid.newGridCloseFilterBoxIfPresent();
    });
});

describe('CPL ALerts tab- Matched Mfr Name - column sorting', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement('CPL Alerts', gridElements.grid)
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 0,
            'Matched Mfr Name', false);
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 0,
            'Matched Mfr Name', true);
        const activeNameActualAscValues: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Matched Mfr Name'])).filter(String);
        const activeNameExpectAscValues: string[] = (await grid.compareAscValues(activeNameActualAscValues.slice().sort())).filter(String);
        await expect(activeNameExpectAscValues).toEqual(activeNameActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 0,
            'Matched Mfr Name', false);
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 0,
            'Matched Mfr Name', true);
        const activeNameActualDescValues: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Matched Mfr Name'])).filter(String);
        const activeNameExpectDescValues: string[] = (await grid.compareDescValues(activeNameActualDescValues.slice())).filter(String);
        await expect(activeNameExpectDescValues).toEqual(activeNameActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const activeNameAscValues: string[] = (await grid.newGridReturnCellValuesByColumnName(0,
            'Matched Mfr Name')).filter(String);
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 0,
            'Matched Mfr Name', false);
        const activeNameClearValues: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.cplAlertstab['Matched Mfr Name'])).filter(String);
        await expect(activeNameAscValues).not.toEqual(activeNameClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(0, 'Matched Mfr Name');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(140);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Matched Mfr Name');
        await toolbar.unhideCellNameWithUnhideAll('Matched Mfr Name');
        await expect(await gridElements.newGridHeaderByName('Matched Mfr Name').isDisplayed()).toBeTruthy();
    });
});
