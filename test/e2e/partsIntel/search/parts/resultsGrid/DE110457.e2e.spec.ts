import {browser} from "protractor";
import {commonSearch} from "../../../../../../testData/search";
import {Grid} from "../../../../../../components/grid";
import {Login} from "../../../../../../components/login";
import {QuickSearch} from "../../../../../../components/quickSearch";
import {Transpose} from "../../../../../../components/grid";
import {SettingsLogic} from "../../../../../../bussinesLayer/settings/settingsLogic";
import {headerElements, settings} from "../../../../../../elements/elements";
import {Header} from "../../../../../../components/header";
import {headerItems} from "../../../../../../testData/global";
import {gridElements} from "../../../../../../elements/elements";

const grid: Grid = new Grid();
const login: Login = new Login();
const quickSearch: QuickSearch = new QuickSearch();
const transpose: Transpose = new Transpose();
const settingsLogic: SettingsLogic= new SettingsLogic();

describe('DE110457', () => {

    xit('transpose pagination should show quantity of items that set in search settings ', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await settingsLogic.paginationChecking('50', quickSearch.performQuickSearch);
        await transpose.switchToTransposeGrid();
        await expect (await gridElements.currentPaginationValue.get(0).getAttribute('value')).toEqual('1: 50');
        await expect (await gridElements.itemsCountInGrid.getText()).toContain('1 - 50');
        await grid.changeItemsPerPage('500');
        await transpose.switchToNewGrid();
        await expect (await gridElements.currentPaginationValue.get(0).getAttribute('value')).toEqual('1: 50');
        await expect (await gridElements.itemsCountInGrid.getText()).toContain('1 - 50');
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await settingsLogic.paginationChecking('25', quickSearch.performQuickSearch);
    });
});
