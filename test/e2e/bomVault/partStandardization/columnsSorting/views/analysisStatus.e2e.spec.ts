import {browser} from "protractor";
import {
    buttonNames,
    columnHeaders, meganavItems
} from "../../../../../../testData/global";
import {Button} from "../../../../../../components/simple/button";
import {CheckBox} from "../../../../../../components/simple/checkBox";
import {Grid} from "../../../../../../components/grid";
import {gridElements} from "../../../../../../elements/elements";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {Toolbar} from "../../../../../../components/toolbar";
import {Actions} from "../../../../../../utils/actions";
import {Dropdown} from "../../../../../../components/dropdown";
import {StringArray} from "../../../../../../utils/stringArray";

const button: Button = new Button();
const checkbox: CheckBox = new CheckBox();
const grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();

describe('Part Standardisation - Views Tab - Analysis Status column', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.newGridCellWithoutContentByRowIndex(0).get(1));
    });

    it('should have default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Analysis Status');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(148);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Analysis Status');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.partStandardisation.sortOptions3);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Analysis Status', false);
        await grid.newGridOpenFilterBoxByName('Analysis Status');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Analysis Status', true);
        const activeNameActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Analysis Status');
        const activeNameExpectAscValues: string[] = await activeNameActualAscValues.slice().sort();
        await expect(await activeNameActualAscValues).toEqual(activeNameExpectAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Analysis Status', false);
        await grid.newGridOpenFilterBoxByName('Analysis Status');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Analysis Status', true);
        const activeNameActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Analysis Status');
        const activeNameExpectDescValues: string[] = activeNameActualDescValues.slice().sort().reverse();
        await expect(await activeNameActualDescValues).toEqual(activeNameExpectDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Analysis Status');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const activeNameAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Analysis Status');
        await grid.newGridOpenFilterBoxByName('Analysis Status');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Analysis Status', false);
        const activeNameClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Analysis Status');
        await expect(await activeNameAscValues).not.toEqual(activeNameClearValues);
    });


    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Analysis Status');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.partStandardisation.sortOptions[1], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Analysis Status');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.partStandardisation.sortOptions[3], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Analysis Status');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1 )).toEqual(148);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Analysis Status');
        await toolbar.unhideCellNameWithUnhideAll('Analysis Status');
        await expect(await gridElements.newGridHeaderByName('Analysis Status').isDisplayed()).toBeTruthy();
    });
});


describe('Part Standardisation - Views Tab - Analysis Status column filter', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.newGridCellWithoutContentByRowIndex(0).get(1));
    });

    it('should be checkboxes', async () => {
        await grid.newGridOpenFilterBoxByName('Analysis Status');
        await expect(await gridElements.columnsSort.inputWithCheckboxes.getAttribute('placeholder'))
            .toEqual('Search...');
        await expect(await gridElements.columnsSort.checkboxLabels.getText())
            .toEqual(columnHeaders.partStandardisation.analysisStatusCheckboxes);
        for (let i: number = 0; i < columnHeaders.partStandardisation.analysisStatusCheckboxes.length; i++) {
            await expect(await gridElements.columnsSort.checkboxInputs.get(i).getAttribute('class'))
                .toContain('ag-icon-checkbox-checked');
        }
        await expect(await (button.returnButtonByText(buttonNames.clearFilter)).isEnabled()).toBeTruthy();
        await expect(await (button.returnButtonByText(buttonNames.applyFilter)).isEnabled()).toBeTruthy();
    });

    it('should uncheck Select All, checked Completed and perform sort', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Analysis Status', false);
        await grid.newGridOpenFilterBoxByName('Analysis Status');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.partStandardisation.analysisStatusCheckboxes[0]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.partStandardisation.analysisStatusCheckboxes[1]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Analysis Status', true);
        const matchStatusValuesDesc: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Analysis Status');
        for (let i: number = 0; i < matchStatusValuesDesc.length; i++) {
            await expect(matchStatusValuesDesc[i]).toEqual(columnHeaders.partStandardisation.analysisStatusCheckboxes[1]);
        }
    });


    it('should uncheck Select All, perform sort with input part of the name option (Completed)', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Analysis Status', false);
        await grid.newGridOpenFilterBoxByName('Analysis Status');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.partStandardisation.analysisStatusCheckboxes[0]);
        await Actions.sendKeys(gridElements.columnsSort.inputWithCheckboxes, 'comple');
        await expect(await gridElements.columnsSort.checkboxInputs.count()).toEqual(2);
        await expect(await gridElements.columnsSort.checkboxLabels.get(1).getText())
            .toEqual(columnHeaders.partStandardisation.analysisStatusCheckboxes[1]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.partStandardisation.analysisStatusCheckboxes[1]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Analysis Status', true);
        const matchStatusValuesDesc: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Analysis Status');
        for (let i: number = 0; i < matchStatusValuesDesc.length; i++) {
            await expect(matchStatusValuesDesc[i]).toEqual(columnHeaders.partStandardisation.analysisStatusCheckboxes[1]);
        }
    });

    it('should work Clear Filters button', async () => {
        await grid.newGridOpenFilterBoxByName('Analysis Status');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.partStandardisation.analysisStatusCheckboxes[0]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.partStandardisation.analysisStatusCheckboxes[1]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        const matchStatusValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Analysis Status');
        await grid.newGridOpenFilterBoxByName('Analysis Status');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Analysis Status',
            false);
        const matchStatusValuesAfterClearing: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Analysis Status');
        await expect(matchStatusValuesAfterSorting).not.toEqual(matchStatusValuesAfterClearing);
    });
});