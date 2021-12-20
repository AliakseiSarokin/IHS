import {Actions} from "../../../../../../utils/actions";
import {BomVaultLogic} from "../../../../../../bussinesLayer/bomVault/bomVaultLogic";
import {Button} from "../../../../../../components/simple/button";
import {browser} from "protractor";
import {
    buttonNames, columnHeaders, meganavItems
} from "../../../../../../testData/global";
import {CheckBox} from "../../../../../../components/simple/checkBox";
import {Grid} from "../../../../../../components/grid";
import {gridElements} from "../../../../../../elements/elements";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {StringArray} from "../../../../../../utils/stringArray";
import {Toolbar} from "../../../../../../components/toolbar";
import {partStandardData} from "../../../../../../testData/partStandard";

const bomvaultlogic: BomVaultLogic = new BomVaultLogic();
const button: Button = new Button;
const checkbox: CheckBox = new CheckBox();
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const stringArray: StringArray = new StringArray();
const toolbar: Toolbar = new Toolbar();

describe('Part Standardisation - BOMs Tab - Match Status column', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await partStandardizationLogic.goToBomsTab();
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Match Status');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(125);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Match Status');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Match Status', false);
        await grid.newGridOpenFilterBoxByName('Match Status');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Match Status', true);
        const mathcStatusActualAscValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('Match Status');
        const mathcStatusExpectAscValues: string[] = await grid.compareAscValues(mathcStatusActualAscValues.slice());
        await expect(await mathcStatusExpectAscValues).toEqual(mathcStatusActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Match Status', false);
        await grid.newGridOpenFilterBoxByName('Match Status');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Match Status', true);
        const matchStatusActualDescValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('Match Status');
        const matchStatusExpectDescValues: string[] = await grid.compareDescValues(matchStatusActualDescValues.slice());
        await expect(await matchStatusExpectDescValues).toEqual(matchStatusActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Match Status');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Match Status');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Match Status', false);
        await expect(await gridElements.ascSortHeaderIconByName('Match Status').isDisplayed()).toBeFalsy();
        await expect(await gridElements.descSortHeaderIconByName('Match Status').isDisplayed()).toBeFalsy();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Match Status');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Match Status');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.last());
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Match Status');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(125);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Match Status');
        await toolbar.unhideCellNameWithUnhideAllByNumber('Match Status',1);
    });
});
