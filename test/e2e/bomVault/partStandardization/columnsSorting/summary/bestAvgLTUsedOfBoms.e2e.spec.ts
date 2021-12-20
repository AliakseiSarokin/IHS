import {
    gridElements,
    partStandardization,
} from "../../../../../../elements/elements";
import {browser} from "protractor";
import {
    buttonNames, columnHeaders,
    meganavItems,
} from "../../../../../../testData/global";
import {Grid} from "../../../../../../components/grid";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {Modal} from "../../../../../../components/modal";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {Toolbar} from "../../../../../../components/toolbar";
import {partStandardData} from "../../../../../../testData/partStandard";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();

describe('Part Standardisation - Summary Tab - Best Avg LT column sort', ()=> {
    beforeAll(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView('BestAvgLTUsed', 6);
    });

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName('BestAvgLTUsed');
    });

    beforeEach(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', 'BestAvgLTUsed');
        await partStandardizationLogic.goToSummaryTab();
        await grid.newGridHideColumnsRange(['Imported Mfr P/N', 'Imported Mfr Name', 'Matched Mfr P/N', 'Matched Mfr Name',
            '# of BOMs', '# of IPNs', 'Avg Price', 'Avg LT'])
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Best Avg LT');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(100);
    });

    it('should be sort option', async () => {
        await grid.newGridOpenFilterBoxByName('Best Avg LT');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sort', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Best Avg LT', false);
        await grid.newGridOpenFilterBoxByName('Best Avg LT');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Best Avg LT', true);
        const avgPriceActualAscValues: string[] = await await grid.replaceNumberValues((
            await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Best Avg LT')).filter(Number));
        const avgPriceExpectAscValues: string[] = await grid.compareAscValues(avgPriceActualAscValues.slice());
        await expect(avgPriceExpectAscValues).toEqual(avgPriceActualAscValues);
    });

    it('should be DESC sort', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Best Avg LT', false);
        await grid.newGridOpenFilterBoxByName('Best Avg LT');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Best Avg LT', true);
        const avgPriceActualDescValues: string[] =await grid.replaceNumberValues((
            await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Best Avg LT')).filter(Number));
        const avgPriceExpectDescValues: string[] = await grid.compareDescValues(avgPriceActualDescValues.slice());
        await expect(avgPriceExpectDescValues).toEqual(avgPriceActualDescValues);
    });

    it('should be Clear sort', async () => {
        await grid.newGridOpenFilterBoxByName('Best Avg LT');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Best Avg LT');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Best Avg LT', false);
        await expect(await gridElements.ascSortHeaderIconByName('Best Avg LT').isDisplayed()).toBeFalsy();
        await expect(await gridElements.descSortHeaderIconByName('Best Avg LT').isDisplayed()).toBeFalsy();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Best Avg LT');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Best Avg LT');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.last());
        await grid.newGridHideColumnsRange(['Imported Mfr P/N', 'Imported Mfr Name', 'Matched Mfr P/N', 'Matched Mfr Name',
            '# of BOMs', '# of IPNs', 'Avg Price', 'Avg LT']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Best Avg LT');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(100);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideDuplicateColumnByName('Best Avg LT');
        await toolbar.unhideCellNameWithUnhideAllByNumber('Best Avg LT',1);
    });
});