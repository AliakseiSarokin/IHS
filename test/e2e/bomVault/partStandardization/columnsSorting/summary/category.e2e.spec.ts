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


const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();

describe('Part Standardisation - Summary Tab - Category column sort', ()=> {
    beforeAll(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView('category', 6);
    });

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName('category');
    });

    beforeEach(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', 'category');
        await partStandardizationLogic.goToSummaryTab();
        await grid.newGridHideColumnsRange(['Imported Mfr P/N', 'Imported Mfr Name', 'Matched Mfr P/N', 'Matched Mfr Name',
            '# of BOMs', '# of IPNs', 'Avg Price', 'Avg LT', 'Total Quantity']);
        await grid.newGridHideDuplicateColumnByName('Active FFFs');
        await grid.newGridHideDuplicateColumnByName('Best Avg Price');
        await grid.newGridHideDuplicateColumnByName('Best Avg LT');
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Category');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(200);
    });

    it('should be sort option', async () => {
        await grid.newGridOpenFilterBoxByName('Category');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sort', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Category', false);
        await grid.newGridOpenFilterBoxByName('Category');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Category', true);
        const mfrNameActualAscValues: string[] = (await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Category')).filter(String);
        const mfrNameExpectAscValues: string[] = await grid.compareAscValues(mfrNameActualAscValues.slice());
        await expect(mfrNameExpectAscValues).toEqual(mfrNameActualAscValues);
    });

    it('should be DESC sort', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Category', false);
        await grid.newGridOpenFilterBoxByName('Category');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Category', true);
        const mfrNameActualDescValues: string[] = (await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Category')).filter(String);
        const mfrNameExpectDescValues: string[] = await grid.compareDescValues(mfrNameActualDescValues.slice());
        await expect(mfrNameExpectDescValues).toEqual(mfrNameActualDescValues);
    });

    it('should be Clear sort', async () => {
        await grid.newGridOpenFilterBoxByName('Category');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Category');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Category', false);
        await expect(await gridElements.ascSortHeaderIconByName('Category').isDisplayed()).toBeFalsy();
        await expect(await gridElements.descSortHeaderIconByName('Category').isDisplayed()).toBeFalsy();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Category');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Category');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.last());
        await grid.newGridHideColumnsRange(['Imported Mfr P/N', 'Imported Mfr Name', 'Matched Mfr P/N', 'Matched Mfr Name',
            '# of BOMs', '# of IPNs']);
        await grid.newGridHideDuplicateColumnByName('Active FFFs');
        await grid.newGridHideDuplicateColumnByName('Best Avg Price');
        await grid.newGridHideDuplicateColumnByName('Best Avg LT');
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Category');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(220);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Category');
        await toolbar.unhideCellNameWithUnhideAllByNumber('Imported Mfr P/N',1);
    });
});