import {browser} from "protractor";
import {
    buttonNames,
    columnHeaders, meganavItems
} from "../../../../../../testData/global";
import {Button} from "../../../../../../components/simple/button";
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
const grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();

describe('Part Standardisation - Views Tab - # of BOMs column', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.newGridCellWithoutContentByRowIndex(0).get(1));
    });

    it('should have default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            '# of BOMs');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(92);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('# of BOMs');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.partStandardisation.sortOptions3);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            '# of BOMs', false);
        await grid.newGridOpenFilterBoxByName('# of BOMs');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            '# of BOMs', true);
        const activeNameActualAscValues: string[] = await grid.replaceNumberValues((
            await grid.newGridReturnCellValuesByColumnName(1, '# of BOMs')).filter(Number));
        const activeNameExpectAscValues: string[] = await grid.compareAscNumberValues(activeNameActualAscValues.slice());
        await expect(await activeNameActualAscValues).toEqual(activeNameExpectAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            '# of BOMs', false);
        await grid.newGridOpenFilterBoxByName('# of BOMs');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            '# of BOMs', true);
        const activeNameActualDescValues: string[] = await grid.replaceNumberValues((
            await grid.newGridReturnCellValuesByColumnName(1, '# of BOMs')).filter(Number));
        const activeNameExpectDescValues: string[] = await grid.compareDescNumberValues(activeNameActualDescValues.slice());
        await expect(await activeNameActualDescValues).toEqual(activeNameExpectDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('# of BOMs');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const activeNameAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            '# of BOMs');
        await grid.newGridOpenFilterBoxByName('# of BOMs');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            '# of BOMs', false);
        const activeNameClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            '# of BOMs');
        await expect(await activeNameAscValues).not.toEqual(activeNameClearValues);
    });


    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('# of BOMs');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.partStandardisation.sortOptions[1], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('# of BOMs');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.partStandardisation.sortOptions[3], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, '# of BOMs');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1 )).toEqual(92);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('# of BOMs');
        await toolbar.unhideCellNameWithUnhideAll('# of BOMs');
        await expect(await gridElements.newGridHeaderByName('# of BOMs').isDisplayed()).toBeTruthy();
    });
});