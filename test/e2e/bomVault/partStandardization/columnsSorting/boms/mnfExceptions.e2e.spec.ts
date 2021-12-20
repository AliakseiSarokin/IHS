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

describe('Part Standardisation - BOMs Tab - Mfr Exceptions column', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await partStandardizationLogic.goToBomsTab();
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Mfr Exceptions');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber)).toEqual(92);
    });

    it('should be sort option', async () => {
        await grid.newGridOpenFilterBoxByName('Mfr Exceptions');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Mfr Exceptions', false);
        await grid.newGridOpenFilterBoxByName('Mfr Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Mfr Exceptions', true);
        const mfrExceptionsActualAscValues: string[] = (await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('Mfr Exceptions')).filter(String);
        const mfrExceptionsExpectAscValues: string[] = await grid.compareAscNumberValues(mfrExceptionsActualAscValues.slice());
        await expect(await mfrExceptionsActualAscValues).toEqual(mfrExceptionsExpectAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Mfr Exceptions', false);
        await grid.newGridOpenFilterBoxByName('Mfr Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Mfr Exceptions', true);
        const mfrExceptionsActualDescValues: string[] = (await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('Mfr Exceptions')).filter(String);
        const mfrExceptionsExpectDescValues: string[] = await grid.compareDescNumberValues(mfrExceptionsActualDescValues.slice());
        await expect(await mfrExceptionsActualDescValues).toEqual(mfrExceptionsExpectDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Mfr Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Mfr Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Mfr Exceptions', false);
        await expect(await gridElements.ascSortHeaderIconByName('Mfr Exceptions').isDisplayed()).toBeFalsy();
        await expect(await gridElements.descSortHeaderIconByName('Mfr Exceptions').isDisplayed()).toBeFalsy();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Mfr Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Mfr Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.last());
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Mfr Exceptions');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss,
            colNumber)).toEqual(122);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Mfr Exceptions');
        await toolbar.unhideCellNameWithUnhideAllByNumber('Mfr Exceptions', 1);
    });
});
