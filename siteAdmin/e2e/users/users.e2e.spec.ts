import {Login} from "../../../components/adminUI/adminLogin";
import {loginItems} from "../../../testData/adminUI/login";
import {
    adminLeftSideBar,
    adminModalElements,
    adminUsersElements,
} from "../../../elements/elements";
import {usersElements, modalElements, adminLeftSidebar, sidebar,
    meganavItem, usersGridElements
} from "../../../testData/adminUI/global";
import {AdminGrid} from "../../../components/adminUI/grid";
import {Button} from "../../../components/simple/button";
import {AdminSearchLogic} from "../../../bussinesLayer/adminUI/searchLogic";
import {Meganav} from "../../../components/meganav";
import {AdminModal} from "../../../components/adminUI/adminModal";

const adminGrid: AdminGrid = new AdminGrid();
const adminSearchLogic: AdminSearchLogic = new AdminSearchLogic();
const adminModal: AdminModal = new AdminModal();

const login = new Login();
const button: Button = new Button;
const meganav: Meganav = new Meganav();

describe('User Page ', () => {

    it('should have column headers names', async () => {
        await login.logInSiteAdmin(loginItems.userName, loginItems.password);
        await meganav.goToFeatureWithMeganav(meganavItem.toolbarNames[1], await adminUsersElements.columnHeadersNames.get(1));
        await adminGrid.openFilterBoxByName('User Name');
        await adminGrid.selectOptionInColumnFilter('Autosize All Columns');
        await expect(await adminUsersElements.columnHeadersNames.getText()).toEqual(usersElements.columnHeaderNames)
    });

    it('should have locked column headers names', async () => {
        await expect(await adminUsersElements.lockedColumnHeadersNames.getText()).toEqual(usersElements.lockedColumnHeaderNames)
    });

    it('should have unlocked column headers names', async () => {
        await expect(await adminUsersElements.unlockedColumnHeadersNames.getText()).toEqual(usersElements.unlockedColumnHeaderNames)
    });

    it('should be highlighted user group name', async () => {
        await expect(await adminLeftSideBar.sideBarItemNamesActive.getText()).toEqual(sidebar.users);
    });

    it('should be left navigation panel', async () => {
        await expect(await adminLeftSideBar.sideBarItemNames.getText()).toEqual(adminLeftSidebar.names);
    });

    it('should be hide button', async () => {
        await button.clickOnTheElementAndWaitNotDisplayed(adminLeftSideBar.hideButton, await adminLeftSideBar.sideBarItemNames.get(0));
        await expect(await adminLeftSideBar.sideBarItemNames.get(0).isDisplayed()).toBeFalsy();
    });

    it('should be unhide button', async () => {
        await button.clickOnTheElementAndWait(adminLeftSideBar.hideButton, await adminLeftSideBar.sideBarItemNames.get(0));
    });

    xit('should be "Hide/Unhide" dropdown in Users datagrid', async () => {
        const colNumber: number = await adminGrid.returnColumnNumberByColumnName('User Name');
        await adminGrid.hideColumnByColumnNumber(colNumber);
    });

    it('should be clickable columns names and have hamburger icons and filters.', async () => {
        await adminGrid.checkOptionInColumnFilter(usersElements.columnHeaderNames, 'Collapse All');
    });

    it('should be active buttons in grid menu', async () => {
        await adminGrid.checkActiveButtonInGrid(usersGridElements.activeButtons);
    });

    it('should be disabled buttons in grid menu', async () => {
        await adminGrid.checkDisabledButtonInGrid(usersGridElements.disabledButtons);
    });

    it('should be hyperlinks in all of the users names', async () => {
        await adminSearchLogic.performAdminSearch('a');
        await adminGrid.openModalByLink(await adminUsersElements.allHyperlinksOnPage.get(0));
        await expect(adminModalElements.panelBody.isDisplayed).toBeTruthy();
        await adminModal.closeModalByName('Cancel Changes');
    });

    it('should be export file', async () => {
        await adminModal.openModalByName('Export');
        await adminModal.checkingExportModal(modalElements.exportUsersRows);
    });

    it('should be delete modal', async () => {
        let name: string[] = await adminUsersElements.selectedCellsNames.getText();
        await adminModal.openModalByName('Delete');
        await adminModal.checkingDeleteModal('Delete user', name[0]);
    });

    it('should be Reset button', async () => {
        await adminGrid.checkResetButton();
    });

    it('should have select all checkbox', async () => {
        await adminGrid.checkAllCheckbox();
    });

});