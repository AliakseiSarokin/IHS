import {browser} from "protractor";
import {userRoles} from "../../../testData/global";
import {Login} from "../../../components/login";
import {headerElements} from "../../../elements/elements";
const login = new Login();

describe('Log in with different roles', () => {

    it('should log in as Group & User Administrator', async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await expect(headerElements.userRole.getText()).toContain(userRoles.userAdmin);
    });

    it('should log in as Group Administrator', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await expect(headerElements.userRole.getText()).toContain(userRoles.groupAdmin);
    });

    it('should log in as regular user', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await expect(headerElements.userRole.getText()).toContain(userRoles.regularUser);
    });

    it('should log in as Knowledge Base Administrator', async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await expect(headerElements.userRole.getText()).toContain(userRoles.knowledgeBaseAdmin);
    });

    it('should log in as Restricted User', async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await expect(headerElements.userRole.getText()).toContain(userRoles.restrictedUser);
    });

    it('should log in as Read-Only User', async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await expect(headerElements.userRole.getText()).toContain(userRoles.readOnlyUser);
    });
});
