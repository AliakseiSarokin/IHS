import {browser} from "protractor";
import {columnIdByColumnName} from "../../../../../../testData/columnIdByColumnName";
import {MatchPartsLogic} from "../../../../../../bussinesLayer/bomVault/matchPartsLogic";
import {Toolbar} from "../../../../../../components/toolbar";
import {Meganav} from "../../../../../../components/meganav";
import {Login} from "../../../../../../components/login";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {gridElements, shadeElements} from "../../../../../../elements/elements";
import {Grid} from "../../../../../../components/grid";
import {Button} from "../../../../../../components/simple/button";
import {columnHeaders, meganavItems} from "../../../../../../testData/global";
import {Dropdown} from "../../../../../../components/dropdown";
import {Waiters as w} from "../../../../../../helper/waiters";

const button: Button = new Button();
const grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const matchPartsLogic = new MatchPartsLogic();

describe('View Single BOM /Match Parts tab - Imported Part Number/ Column sorting', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0));
        await matchPartsLogic.goToMatchParts();
    });

    it('should be filter options, US296605', async () => {
        await grid.newGridOpenFilterBoxByName('Imported Part Number');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.newGridDropdownInput,
            'value')).toEqual(columnHeaders.bom.filterOptions2[0]);
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.newGridDropdownInput);
        await expect(await gridElements.newGridOpenFilterOptions.getText()).toEqual(columnHeaders.bom.filterOptions2);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Imported Part Number');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be ASC sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Imported Part Number');
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 0,
           'Imported Part Number', false);
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 0,
            'Imported Part Number', true);
        const importedPartNumberActualAscValues: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.viewSingleBomMatchParts['Imported Part Number']);
        const importedPartNumberExpectAscValues: string[] = await grid.compareAscValues(importedPartNumberActualAscValues.slice().sort());
        await expect(importedPartNumberExpectAscValues).toEqual(importedPartNumberActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 0,
            'Imported Part Number', false);
        await grid.newGridOpenFilterBoxByName('Imported Part Number');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 0,
            'Imported Part Number', true);
        const importedPartNumberActualDescValues: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.viewSingleBomMatchParts['Imported Part Number'])
        const importedPartNumberExpectDescValues: string[] = await grid.compareDescValues(importedPartNumberActualDescValues.slice());
        await expect(importedPartNumberExpectDescValues).toEqual(importedPartNumberActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Imported Part Number');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const importedPartNumberAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Imported Part Number');
        await grid.newGridOpenFilterBoxByName('Imported Part Number');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 0,
            'Imported Part Number', false);
        const importedPartNumberClearValues: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.viewSingleBomMatchParts['Imported Part Number']);
        await expect(importedPartNumberAscValues).not.toEqual(importedPartNumberClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Imported Part Number');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Imported Part Number');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(0, 'Imported Part Number');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(160);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Imported Part Number');
        await toolbar.unhideCellNameWithUnhideAll('Imported Part Number');
        await expect(await gridElements.newGridHeaderByName('Imported Part Number').isDisplayed()).toBeTruthy();
    });
});