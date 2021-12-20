import {
    modalTitles, buttonNames, meganavItems,
    titles, columnHeaders, commonData
} from "../../../../testData/global";
import {
    resReqElements, pageTitles, gridElements, dropdownElements,
    toolbarElements
} from "../../../../elements/elements";
import {browser} from "protractor";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Actions} from "../../../../utils/actions";
import {Dropdown} from "../../../../components/dropdown";
import {Toolbar} from "../../../../components/toolbar";
import {bomVaultData} from "../../../../testData/bomVault";
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();

describe('BOM Summary/ View All BOMs - DE108790, TC68918', () => {

    it ( 'should not discard applied column filters applying toolbar filter, BOM Summary page  ' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridCheckboxSelector.get(1));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'BOM Name',
            false);
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await Actions.sendKeys(gridElements.columnsSort.input, commonData.bomName);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'BOM Name',
            true);
        await toolbar.openToolbarDropdownByButtonName('Filters');
        await Dropdown.selectValueInDropdownByValueName(bomVaultData.bomVault.filters[1]);
        await expect(await toolbarElements.tagByName(bomVaultData.bomVault.filters[1]).isPresent()).toBeTruthy();
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'BOM Name',
            true);
    });

    it ( 'should not discard applied column filters applying toolbar filter, View All BOMs page  ' , async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCheckboxSelector.get(1));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'BOM Name',
            false);
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await Actions.sendKeys(gridElements.columnsSort.input, commonData.bomName);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'BOM Name',
            true);
        await toolbar.openToolbarDropdownByButtonName('Filters');
        await Dropdown.selectValueInDropdownByValueName(bomVaultData.bomVault.filters[1]);
        await expect(await toolbarElements.tagByName(bomVaultData.bomVault.filters[1]).isPresent()).toBeTruthy();
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, 'BOM Name',
            true);
    });

});