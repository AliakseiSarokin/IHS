import {Login} from "../../../components/adminUI/adminLogin";
import {loginItems} from "../../../testData/adminUI/login";
import {adminHeaderContent, adminHomePage, adminToolbarElements, adminUsersElements, gridElements, headerElements
} from "../../../elements/elements";
import {expectToEqual} from "../../../helper/allure/allureSteps";
import {adminHomeItems, headersElements} from "../../../testData/adminUI/home";
import {meganavItem, sidebar} from "../../../testData/adminUI/global";
import {AdminHomeLogic} from "../../../bussinesLayer/adminUI/homeLogic";
import {Link} from "../../../components/simple/link";

const login = new Login();
const adminHomeLogic: AdminHomeLogic = new AdminHomeLogic();
const link: Link = new Link();

describe('Home Page ', () => {

    it('should be label in the left upper corner', async () => {
        await login.logInSiteAdmin(loginItems.userName, loginItems.password);
        await expectToEqual(adminHeaderContent.headerLogoText.getText,headersElements.logoText);
        await expect(adminHeaderContent.logo.isDisplayed()).toBeTruthy();
    });

    it('should be admin icon, role and name in the right corner', async () => {
        await expect(await headerElements.userRole.getText()).toContain('Hi BI PI Site Admin');
        await expect(await adminHeaderContent.userRole.getText()).toEqual('BIPI Site Admin');
    });

    it('should be names in the toolbar', async () => {
        await expect(await adminToolbarElements.toolbarNames.getText()).toEqual( meganavItem.toolbarNames)
    });

    it('should have home panels', async () => {
        await expect(adminHomePage.panelTitles.getText()).toEqual(adminHomeItems.expectedPanelTitles);
    });

    it('should have links and image for Manage Users panel', async () => {
        await expect(adminHomePage.manageUsersPanelLinks.getText()).toEqual(adminHomeItems.manageUsersPanelLinks);
        await expect(adminHomePage.manageUsersPanelImage.isDisplayed()).toBeTruthy();
    });

    it('should have links and image for Manage User Group panel', async () => {
        await expect(adminHomePage.manageUserGroupsLinks.getText()).toEqual(adminHomeItems.manageUserGroupsLinks);
        await expect(adminHomePage.manageUserGroupsImage.isDisplayed()).toBeTruthy();
    });

    it('should go to Manage Users panel links', async () => {
        await link.clickOnTheLinkByNameAndWaitForElementAdmin(adminHomeItems.manageUsersPanelLinks[0],
            await adminUsersElements.sideBarActiveItemName.get(0));
        await expect(await adminUsersElements.sideBarActiveItemName.get(0).getText()).toEqual(sidebar.users);
        await adminHomeLogic.goToHomePage();
        await link.clickOnTheLinkByNameAndWaitForElementAdmin(adminHomeItems.manageUsersPanelLinks[1], gridElements.grid);
        await expect(await adminUsersElements.sideBarActiveItemName.get(0).getText()).toEqual(sidebar.users);
    });

    it('should go to Manage User Groups panel links', async () => {
        await adminHomeLogic.goToHomePage();
        await link.clickOnTheLinkByNameAndWaitForElementAdmin(adminHomeItems.manageUserGroupsLinks[0],
            await adminUsersElements.sideBarActiveItemName.get(0));
        await expect(await adminUsersElements.sideBarActiveItemName.get(0).getText()).toEqual(sidebar.userGroups);
    });

});