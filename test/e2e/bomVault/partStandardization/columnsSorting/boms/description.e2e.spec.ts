import {Actions} from "../../../../../../utils/actions";
import {Button} from "../../../../../../components/simple/button";
import {browser} from "protractor";
import {
    buttonNames, columnHeaders, meganavItems
} from "../../../../../../testData/global";
import {Dropdown} from "../../../../../../components/dropdown";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {Grid} from "../../../../../../components/grid";
import {gridElements} from "../../../../../../elements/elements";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {Toolbar} from "../../../../../../components/toolbar";

const button: Button = new Button;
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const toolbar: Toolbar = new Toolbar();

describe('Part Standardisation - BOMs Tab - Description column', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await partStandardizationLogic.goToBomsTab();
        await grid.newGridHideColumnsRange(['Owner', 'Match Status', 'Mfr Exceptions']);
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Description');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(450);
    });

    it('should be sort option', async () => {
        await grid.newGridOpenFilterBoxByName('Description');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions2);
    });


    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Description');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.last());
        await await grid.newGridOpenFilterBoxByName('Description');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.last());
        await grid.newGridHideColumnsRange(['Owner', 'Match Status', 'Mfr Exceptions', 'Part Exceptions']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Description');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(450);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Description');
        await toolbar.unhideCellByNameAndUnhideNumber('Description',1);
    });
});

