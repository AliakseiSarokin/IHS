import {Actions} from "../../../../../utils/actions";
import {BomVaultLogic} from "../../../../../bussinesLayer/bomVault/bomVaultLogic";
import {Button} from "../../../../../components/simple/button";
import {browser} from "protractor";
import {
    buttonNames, columnHeaders, meganavItems
} from "../../../../../testData/global";
import {CheckBox} from "../../../../../components/simple/checkBox";
import {Grid} from "../../../../../components/grid";
import {gridElements} from "../../../../../elements/elements";
import {JsScripts} from "../../../../../utils/jsScripts";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {StringArray} from "../../../../../utils/stringArray";
import {Toolbar} from "../../../../../components/toolbar";

const bomvaultlogic: BomVaultLogic = new BomVaultLogic();
const button: Button = new Button;
const checkbox: CheckBox = new CheckBox();
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const stringArray: StringArray = new StringArray();
const toolbar: Toolbar = new Toolbar();

describe('BOM Vault - Match Status column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Match Status');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, colNumber + 4))
            .toEqual(108);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Match Status');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Match Status', false);
        await grid.newGridOpenFilterBoxByName('Match Status');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Match Status', true);
        const mathcStatusActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Match Status');
        const mathcStatusExpectAscValues: string[] = await grid.compareAscValues(mathcStatusActualAscValues.slice());
        await expect(mathcStatusExpectAscValues).toEqual(mathcStatusActualAscValues);
    });

    it('should be DESC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Match Status', false);
        await grid.newGridOpenFilterBoxByName('Match Status');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Match Status', true);
        const matchStatusActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Match Status');
        const matchStatusExpectDescValues: string[] = await grid.compareDescValues(matchStatusActualDescValues.slice());
        await expect(matchStatusExpectDescValues).toEqual(matchStatusActualDescValues);
    });

    it('should be Clear sorting', async () => {
        //await bomvaultlogic.reprocessBomWithoutWaitingForProcessedStatus('Automation_BOM');
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Match Status');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Match Status');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Match Status', false);
        await expect(await gridElements.ascSortHeaderIconByName('Match Status').isDisplayed()).toBeFalsy();
        await expect(await gridElements.descSortHeaderIconByName('Match Status').isDisplayed()).toBeFalsy();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Match Status');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Match Status');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Match Status');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, colNumber + 4))
            .toEqual(108);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Match Status');
        await toolbar.unhideCellNameWithUnhideAll('Match Status');
    });
});


describe('BOM Vault - Match Status column filter', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
    });

    it('should be checkboxes', async () => {
        await grid.newGridOpenFilterBoxByName('Match Status');
        await expect(await gridElements.columnsSort.inputWithCheckboxes.getAttribute('placeholder'))
            .toEqual('Search...');
        await expect(await gridElements.columnsSort.checkboxLabels.getText())
            .toEqual(columnHeaders.bom.bomVault.matchStatusCheckBoxes);
        for (let i: number = 0; i < columnHeaders.bom.bomVault.matchStatusCheckBoxes.length; i++) {
            await expect(await gridElements.columnsSort.checkboxInputs.get(i).getAttribute('class'))
                .toContain('ag-checked');
        }
        await expect(await (button.returnButtonByText(buttonNames.clear)).isEnabled()).toBeTruthy();
        await expect(await (button.returnButtonByText(buttonNames.apply)).isEnabled()).toBeTruthy();
    });

    it('should uncheck Select All, checked Processed and perform sort', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Match Status', false);
        await grid.newGridOpenFilterBoxByName('Match Status');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.bom.bomVault.matchStatusCheckBoxes[0]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.bom.bomVault.matchStatusCheckBoxes[1]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Match Status', true);
        const matchStatusValuesDesc: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Match Status');
        for (let i: number = 0; i < matchStatusValuesDesc.length; i++) {
            await expect(matchStatusValuesDesc[i]).toEqual(columnHeaders.bom.bomVault.matchStatusCheckBoxes[1]);
        }
    });

    it('should uncheck Select All, checked Queued and perform sort', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Match Status', false);
        await grid.newGridOpenFilterBoxByName('Match Status');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.bom.bomVault.matchStatusCheckBoxes[0]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.bom.bomVault.matchStatusCheckBoxes[2]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Match Status', true);
        const matchStatusValuesDesc: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Match Status');
        for (let i: number = 0; i < matchStatusValuesDesc.length; i++) {
            await expect(matchStatusValuesDesc[i]).toEqual(columnHeaders.bom.bomVault.matchStatusCheckBoxes[2]);
        }
    });

    it('should uncheck Select All, checked In Progress and perform sort', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Match Status', false);
        await grid.newGridOpenFilterBoxByName('Match Status');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.bom.bomVault.matchStatusCheckBoxes[0]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.bom.bomVault.matchStatusCheckBoxes[3]);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Match Status', true);
        if (await gridElements.newGridRows.get(0).isPresent()) {
            const matchStatusValuesDesc: string[] = await grid.newGridReturnCellValuesByColumnName(1,
                'Match Status');
            for (let i: number = 0; i < matchStatusValuesDesc.length; i++) {
                await expect(matchStatusValuesDesc[i]).toEqual(columnHeaders.bom.bomVault.matchStatusCheckBoxes[3]);
            }
        }
    });

    it('should uncheck Select All, perform sort with input part of the name option (Queued)', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Match Status', false);
        await grid.newGridOpenFilterBoxByName('Match Status');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.bom.bomVault.matchStatusCheckBoxes[0]);
        await Actions.sendKeys(gridElements.columnsSort.inputWithCheckboxes, 'que');
        await expect(await gridElements.columnsSort.checkboxInputs.count()).toEqual(2);
        await expect(await gridElements.columnsSort.checkboxLabels.get(1).getText())
            .toEqual(columnHeaders.bom.bomVault.matchStatusCheckBoxes[2]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.bom.bomVault.matchStatusCheckBoxes[2]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            'Match Status', true);
        const matchStatusValuesDesc: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Match Status');
        for (let i: number = 0; i < matchStatusValuesDesc.length; i++) {
            await expect(matchStatusValuesDesc[i]).toEqual(columnHeaders.bom.bomVault.matchStatusCheckBoxes[2]);
        }
    });

    it('should work Clear Filters button', async () => {
        await grid.newGridOpenFilterBoxByName('Match Status');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.bom.bomVault.matchStatusCheckBoxes[0]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.bom.bomVault.matchStatusCheckBoxes[2]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        const matchStatusValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Match Status');
        await grid.newGridOpenFilterBoxByName('Match Status');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clear), gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Match Status',
            false);
        const matchStatusValuesAfterClearing: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Match Status');
        await expect(matchStatusValuesAfterSorting).not.toEqual(matchStatusValuesAfterClearing);
        //here we can't check that Match Status column contains all valid options because we don't have any Bom with different Match Status

        // const matchStatusValuesDesc: string[] = await grid.newGridReturnCellValuesByColumnName(1,
        //     'Match Status');
        // await stringArray.arrayContain(matchStatusValuesDesc, await columnHeaders.bom.bomDetails.scRisk.splice(0, 1));
    });
});
