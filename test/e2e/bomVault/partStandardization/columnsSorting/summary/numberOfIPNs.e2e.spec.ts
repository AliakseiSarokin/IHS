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
import {partStandardData} from "../../../../../../testData/partStandard";
import {Toolbar} from "../../../../../../components/toolbar";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();

describe('Part Standardisation - Summary Tab - # of IPNs column sort', ()=> {
    beforeAll(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView('numberOfIPNs', 6);
    });

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName('numberOfIPNs');
    });

    beforeEach(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', 'numberOfIPNs');
        await partStandardizationLogic.goToSummaryTab();
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, '# of IPNs');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(87);
    });

    it('should be sort option', async () => {
        await grid.newGridOpenFilterBoxByName('# of IPNs');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sort', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            '# of IPNs', false);
        await grid.newGridOpenFilterBoxByName('# of IPNs');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            '# of IPNs', true);
        const numberOfIPNsActualAscValues: string[] = await grid.replaceNumberValues((
            await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('# of IPNs')).filter(Number));
        const numberOfIPNsExpectAscValues: string[] = await grid.compareAscValues(numberOfIPNsActualAscValues.slice());
        await expect(numberOfIPNsExpectAscValues).toEqual(numberOfIPNsActualAscValues);
    });

    it('should be DESC sort', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            '# of IPNs', false);
        await grid.newGridOpenFilterBoxByName('# of IPNs');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            '# of IPNs', true);
        const numberOfIPNsActualDescValues: string[] =await grid.replaceNumberValues((
            await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('# of IPNs')).filter(Number));
        const numberOfIPNsExpectDescValues: string[] = await grid.compareDescValues(numberOfIPNsActualDescValues.slice());
        await expect(numberOfIPNsExpectDescValues).toEqual(numberOfIPNsActualDescValues);
    });

    it('should be Clear sort', async () => {
        await grid.newGridOpenFilterBoxByName('# of IPNs');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('# of IPNs');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            '# of IPNs', false);
        await expect(await gridElements.ascSortHeaderIconByName('Imported Mfr Name').isDisplayed()).toBeFalsy();
        await expect(await gridElements.descSortHeaderIconByName('Imported Mfr Name').isDisplayed()).toBeFalsy();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('# of IPNs');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('# of IPNs');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.last());
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, '# of IPNs');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(87);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('# of IPNs');
        await toolbar.unhideCellNameWithUnhideAllByNumber('# of IPNs',1);
    });
});