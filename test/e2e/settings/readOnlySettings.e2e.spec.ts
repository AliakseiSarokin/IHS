import {Header} from "../../../components/header";
import {Login} from "../../../components/login";
const login: Login = new Login();
import {browser} from "protractor";
import {headerItems} from "../../../testData/global";
import {ElementAttributes} from "../../../utils/elementAttributes";
const elementAttributes:ElementAttributes = new ElementAttributes();
import {headerElements, settings} from "../../../elements/elements";

describe('Settings - Read Only User', () => {

    it('should be disabled settings options', async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3]);
        await expect(await elementAttributes.getElementAttribute(settings.settingsList.get(1), 'class'))
            .toContain('disabled');
        await expect(await elementAttributes.getElementAttribute(settings.settingsList.get(2), 'class'))
            .toContain('disabled');
        await expect(await elementAttributes.getElementAttribute(settings.settingsList.get(4), 'class'))
            .toContain('disabled');
    });
});