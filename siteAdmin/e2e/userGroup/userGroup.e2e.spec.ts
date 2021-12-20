import {Login} from "../../../components/adminUI/adminLogin";
import {loginItems} from "../../../testData/adminUI/login";
import {adminLeftSideBar, adminModalElements, adminUsersElements} from "../../../elements/elements";
import {usersElements, modalElements, adminLeftSidebar, sidebar, meganavItem, userGroupGridElements
} from "../../../testData/adminUI/global";
import {AdminGrid} from "../../../components/adminUI/grid";
import {Button} from "../../../components/simple/button";
import {Meganav} from "../../../components/meganav";
import {AdminSearchLogic} from "../../../bussinesLayer/adminUI/searchLogic";
import {AdminModal} from "../../../components/adminUI/adminModal";

const adminGrid: AdminGrid = new AdminGrid();
const login = new Login();
const button: Button = new Button;
const meganav: Meganav = new Meganav();
const adminSearchLogic: AdminSearchLogic = new AdminSearchLogic();
const adminModal: AdminModal = new AdminModal();

describe('User Groups ', () => {

    it('should have column headers names', async () => {
        await login.logInSiteAdmin(loginItems.userName, loginItems.password);
        await meganav.goToFeatureWithMeganav(meganavItem.toolbarNames[2], await adminUsersElements.columnHeadersNames.get(1));
        await adminGrid.openFilterBoxByName('User Group Name');
        await adminGrid.selectOptionInColumnFilter('Autosize All Columns');
        await expect(await adminUsersElements.columnHeadersNames.getText()).toEqual(usersElements.columnHeaderUserGroupsNames)
    });

    it('should have locked column headers names', async () => {
        await expect(await adminUsersElements.lockedColumnHeadersNames.getText()).toEqual(usersElements.lockedColumnHeaderUserGroupsNames)
    });

    it('should have unlocked column headers names', async () => {
        await expect(await adminUsersElements.unlockedColumnHeadersNames.getText()).toEqual(usersElements.unlockedColumnHeaderUserGroupsNames)
    });

    it('should be highlighted user group name', async () => {
        await expect(await adminLeftSideBar.sideBarItemNamesActive.getText()).toEqual(sidebar.userGroups);
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
        await adminGrid.checkOptionInColumnFilter(usersElements.lockedColumnHeaderUserGroupsNames, 'Collapse All');
    });

    it('should be active buttons in grid menu', async () => {
        await adminGrid.checkActiveButtonInGrid(userGroupGridElements.activeButtons);
    });

    it('should be disabled buttons in grid menu', async () => {
        await adminGrid.checkDisabledButtonInGrid(userGroupGridElements.disabledButtons);
    });

    it('should be hyperlinks in all of the users names', async () => {
        await adminSearchLogic.openQuickSearchDropdwon();
        await adminSearchLogic.checkRadioButtonByLabelName('User Groups');
        await adminSearchLogic.performAdminSearch('dev*');
        await adminGrid.openModalByLink(await adminUsersElements.allHyperlinksOnPage.get(0));
        await expect((await adminModalElements.closeModalButtons.get(2)).getText()).toEqual(modalElements.cancelChanges);
        await button.clickOnTheElementAndWait(await adminModalElements.closeModalButtons.get(2), await adminLeftSideBar.sideBarItemNames.get(0));
    });

    it('should be export file', async () => {
        await adminModal.openModalByName('Export');
        await adminModal.checkingExportModal(modalElements.exportUserGroupRows);
    });

    it('should be ReGen Key', async () => {
        await adminModal.openModalByName('ReGen Key');
        await adminModal.checkingReGenKey();
    });

    it('should be delete modal', async () => {
        let name: string[] = await adminUsersElements.selectedCellsNames.getText();
        await adminModal.openModalByName('Delete');
        await adminModal.checkingDeleteModal('Delete group', name[0]);
    });

    it('should have select all checkbox', async () => {
        await adminGrid.checkAllCheckbox();
    });

});