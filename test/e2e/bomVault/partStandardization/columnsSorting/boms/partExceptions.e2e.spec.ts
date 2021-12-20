import {browser} from "protractor";
import {
    columnHeaders, meganavItems
} from "../../../../../../testData/global";
import {Grid} from "../../../../../../components/grid";
import {gridElements} from "../../../../../../elements/elements";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {Toolbar} from "../../../../../../components/toolbar";
import {partStandardData} from "../../../../../../testData/partStandard";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const toolbar: Toolbar = new Toolbar();

describe('Part Standardisation - BOMs Tab - Part Exceptions column', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await partStandardizationLogic.goToBomsTab();
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Part Exceptions');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber)).toEqual(125);
    });

    it('should be sort option', async () => {
        await grid.newGridOpenFilterBoxByName('Part Exceptions');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Part Exceptions', false);
        await grid.newGridOpenFilterBoxByName('Part Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Part Exceptions', true);
        const partExceptionsActualAscValues: string[] = (await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('Part Exceptions'))
            .filter(String);
        const partExceptionsExpectAscValues: string[] = await grid.compareAscNumberValues(partExceptionsActualAscValues.slice());
        await expect(await partExceptionsActualAscValues).toEqual(partExceptionsExpectAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Part Exceptions', false);
        await grid.newGridOpenFilterBoxByName('Part Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Part Exceptions', true);
        const partExceptionsActualDescValues: string[] = (await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('Part Exceptions')).filter(String);
        const partExceptionsExpectDescValues: string[] = await grid.compareDescNumberValues(partExceptionsActualDescValues.slice());
        await expect(await partExceptionsActualDescValues).toEqual(partExceptionsExpectDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Part Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Part Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Part Exceptions', false);
        await expect(await gridElements.ascSortHeaderIconByName('Part Exceptions').isDisplayed()).toBeFalsy();
        await expect(await gridElements.descSortHeaderIconByName('Part Exceptions').isDisplayed()).toBeFalsy();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Part Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Part Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.last());
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Part Exceptions');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss,
            colNumber)).toEqual(122);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Part Exceptions');
        await toolbar.unhideCellNameWithUnhideAllByNumber('Part Exceptions',1);
    });
});
