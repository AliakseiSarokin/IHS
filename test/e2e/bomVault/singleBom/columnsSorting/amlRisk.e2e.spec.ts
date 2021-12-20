import {Actions} from "../../../../../utils/actions";
import {Button} from "../../../../../components/simple/button";
import {browser} from "protractor";
import {
    buttonNames, columnHeaders, commonData, meganavItems
} from "../../../../../testData/global";
import {CheckBox} from "../../../../../components/simple/checkBox";
import {Grid} from "../../../../../components/grid";
import {gridElements} from "../../../../../elements/elements";
import {JsScripts} from "../../../../../utils/jsScripts";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {SingleBomLogic} from "../../../../../bussinesLayer/bomVault/singleBomLogic";
import {StringArray} from "../../../../../utils/stringArray";
import {Toolbar} from "../../../../../components/toolbar";

const button: Button = new Button;
const checkbox: CheckBox = new CheckBox();
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const stringArray: StringArray = new StringArray();
const toolbar: Toolbar = new Toolbar();

describe('BOM Details - AML Risk column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        await singleBomLogic.openSingleBomByName(commonData.bomNameWithIcons);
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('AML Risk');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions2);
    });

    it('should work Reset columns', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(0, 'AML Risk');
        const defaultWidth: number = await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 1);
        await grid.newGridOpenFilterBoxByName('AML Risk');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[1], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('AML Risk');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[3], gridElements.newGridRows.get(0));
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, colNumber + 1))
            .toEqual(defaultWidth);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('AML Risk');
        await toolbar.unhideCellNameWithUnhideAll('AML Risk');
    });
});

describe('BOM Details - AML Risk column filter', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        await singleBomLogic.openSingleBomByName(commonData.bomNameWithIcons);
    });

    afterEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.reset), gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
    });

    it('should be checkboxes', async () => {
        await grid.newGridOpenFilterBoxByName('AML Risk');
        await expect(await gridElements.columnsSort.inputWithCheckboxes.getAttribute('placeholder'))
            .toEqual('Search...');
        await expect(await gridElements.columnsSort.checkboxLabels.getText())
            .toEqual(columnHeaders.bom.bomDetails.lcRiskEnvRiskAmlRisk);
        for (let i: number = 0; i < columnHeaders.bom.bomDetails.lcRiskEnvRiskAmlRisk.length; i++) {
            await expect(await gridElements.columnsSort.checkboxInputs.get(i).getAttribute('class'))
                .toContain('ag-checked');
        }
        await expect(await button.returnButtonByText(buttonNames.clear).isEnabled()).toBeTruthy();
        await expect(await (button.returnButtonByText(buttonNames.apply)).isEnabled()).toBeTruthy();
    });

    it('should uncheck Select All, checked Low and perform sort', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'AML Risk', false);
        await grid.newGridOpenFilterBoxByName('AML Risk');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.bom.bomDetails.lcRiskEnvRiskAmlRisk[0]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.bom.bomDetails.lcRiskEnvRiskAmlRisk[1]);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'AML Risk', true);
        // next expects can not be check because in base we do not have any parts with AML Risk status yet
        if (await gridElements.newGridRows.get(0).isPresent()) {
            const amlRiskValuesDesc: string[] = await grid.newGridReturnCellValuesByColumnName(0,
                'AML Risk');
            for (let i: number = 0; i < amlRiskValuesDesc.length; i++) {
                await expect(amlRiskValuesDesc[i]).toEqual(columnHeaders.bom.bomDetails.lcRiskEnvRiskAmlRisk[1]);
            }
        }
    });

    it('should uncheck Select All, checked Med and perform sort', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'AML Risk', false);
        await grid.newGridOpenFilterBoxByName('AML Risk');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.bom.bomDetails.lcRiskEnvRiskAmlRisk[0]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.bom.bomDetails.lcRiskEnvRiskAmlRisk[2]);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'AML Risk', true);
        // next expects can not be check because in base we do not have any parts with AML Risk status yet
        if (await gridElements.newGridRows.get(0).isPresent()) {
            const amlRiskValuesDesc: string[] = await grid.newGridReturnCellValuesByColumnName(0,
                'AML Risk');
            for (let i: number = 0; i < amlRiskValuesDesc.length; i++) {
                await expect(amlRiskValuesDesc[i]).toEqual(columnHeaders.bom.bomDetails.lcRiskEnvRiskAmlRisk[2]);
            }
        }
    });

    it('should uncheck Select All, perform sort with input part of the name option (High)', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'AML Risk', false);
        await grid.newGridOpenFilterBoxByName('AML Risk');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.bom.bomDetails.lcRiskEnvRiskAmlRisk[0]);
        await Actions.sendKeys(gridElements.columnsSort.inputWithCheckboxes, 'hig');
        await expect(await gridElements.columnsSort.checkboxInputs.count()).toEqual(2);
        await expect(await gridElements.columnsSort.checkboxLabels.get(1).getText())
            .toEqual(columnHeaders.bom.bomDetails.lcRiskEnvRiskAmlRisk[3]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.bom.bomDetails.lcRiskEnvRiskAmlRisk[3]);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'AML Risk', true);
        // next expects can not be check because in base we do not have any parts with AML Risk status yet
        if (await gridElements.newGridRows.get(0).isPresent()) {
            const amlRiskValuesDesc: string[] = await grid.newGridReturnCellValuesByColumnName(0,
                'AML Risk');
            for (let i: number = 0; i < amlRiskValuesDesc.length; i++) {
                await expect(amlRiskValuesDesc[i]).toEqual(columnHeaders.bom.bomDetails.lcRiskEnvRiskAmlRisk[3]);
            }
        }
    });

    it('should work Clear Filters button', async () => {
        await grid.newGridOpenFilterBoxByName('AML Risk');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.bom.bomDetails.lcRiskEnvRiskAmlRisk[0]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.bom.bomDetails.lcRiskEnvRiskAmlRisk[2]);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await grid.newGridOpenFilterBoxByName('AML Risk');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clear),
            gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'AML Risk', false);
        // next expects can not be check because in base we do not have any parts with AML Risk status yet
        if (await gridElements.newGridRows.get(0).isPresent()) {
            const amlRiskFilterValues: string[] = await grid.newGridReturnCellValuesByColumnName(0,
                'AML Risk');
            await stringArray.arrayContain(amlRiskFilterValues, columnHeaders.bom.bomDetails.lcRiskEnvRiskAmlRisk);
        }
    });
});
