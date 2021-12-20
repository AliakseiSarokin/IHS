import {Login} from "../../../components/adminUI/adminLogin";
import {loginItems} from "../../../testData/adminUI/login";
import {adminLeftSideBar, adminUsersElements} from "../../../elements/elements";
import {usersElements, adminLeftSidebar, sidebar, meganavItem} from "../../../testData/adminUI/global";
import {AdminGrid} from "../../../components/adminUI/grid";
import {Button} from "../../../components/simple/button";
import {Meganav} from "../../../components/meganav";

const adminGrid: AdminGrid = new AdminGrid();
const login = new Login();
const button: Button = new Button;
const meganav: Meganav = new Meganav();

describe('Mfr Alliases ', () => {

    it('should have column headers names', async () => {
        await login.logInSiteAdmin(loginItems.userName, loginItems.password);
        await meganav.goToFeatureWithMeganav(meganavItem.toolbarNames[3], await adminUsersElements.columnHeadersNames.get(1));
        await expect(await adminUsersElements.columnHeadersNames.getText()).toEqual(usersElements.columnHeaderNamesMfrAlliases)
    });

    it('should be highlighted Mfr Aliases', async () => {
        await expect(await adminLeftSideBar.sideBarItemNamesActive.getText()).toEqual(sidebar.mfrAliases);
    });

    it('should be left navigation panel', async () => {
        await expect(await adminLeftSideBar.sideBarItemNames.getText()).toEqual(adminLeftSidebar.names);
    });

    it('should be hide button', async () => {
        await button.clickOnTheElementAndWaitNotDisplayed(adminLeftSideBar.hideButton, await adminLeftSideBar.sideBarItemNames.get(0));
    });

    it('should be unhide button', async () => {
        await button.clickOnTheElementAndWait(adminLeftSideBar.hideButton, await adminLeftSideBar.sideBarItemNames.get(0));
    });

    it('should be clickable columns names and have hamburger icons and filters.', async () => {
        await adminGrid.checkOptionInColumnFilter(usersElements.columnHeaderNamesMfrAlliases, 'Reset Columns');
    });

});