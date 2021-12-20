import {meganavItems} from "../../../../testData/global";
import {gridElements, toolbarElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Dropdown} from "../../../../components/dropdown";
import {Toolbar} from "../../../../components/toolbar";
import {bomVaultData} from "../../../../testData/bomVault";
import moment = require("moment");

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();

describe('Bug296007, BOM filters in view all BOMS page are not populating correct results ', () => {

    it ( 'should be BOM filters View BOMS that have not been modified in the last 30 days' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCheckboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName('Filters');
        await Dropdown.selectValueInDropdownByValueName(bomVaultData.bomVault.filters[5]);
        await expect(await toolbarElements.tagByName(bomVaultData.bomVault.filters[5]).isPresent()).toBeTruthy();
        const dateValues: any[] = await grid.newGridReturnCellValuesByColumnName(1,'Last Modified');
        for(let i = 0; i < dateValues.length; i++){
            await expect(moment(dateValues[i]).valueOf()).toBeLessThan(moment().subtract(30, 'days').valueOf())
        }
    });

    it ( 'should be BOM filters View BOMS that have not been modified in the last 60 days' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCheckboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName('Filters');
        await Dropdown.selectValueInDropdownByValueName(bomVaultData.bomVault.filters[6]);
        const dateValues: any[] = await grid.newGridReturnCellValuesByColumnName(1,'Last Modified');
        for(let i = 0; i < dateValues.length; i++){
            await expect(moment(dateValues[i]).valueOf()).toBeLessThan(moment().subtract(60, 'days').valueOf())
        }
    });

});