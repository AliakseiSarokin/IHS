import {allureStep, expectToEqual} from "../../helper/allure/allureSteps";
import {browser} from "protractor";
import {Button} from "../simple/button";

const button: Button = new Button();
import {Input} from "../simple/input";

const input: Input = new Input();

import {Waiters as w} from "../../helper/waiters";
import {adminHeaderContent, adminHomePage, adminLoginElements} from "../../elements/elements";
import {adminPage} from "../../testData/adminUI/global";


export class Login {

    public async logInSiteAdmin(login: string, password: string) {
        await allureStep('Log in site Admin', async () => {
            await browser.get(browser.baseUrl + adminPage.siteAdminLogin);
            await w.waitUntilElementIsDisplayed(adminLoginElements.loginField);
            await input.fillFieldWithValue(adminLoginElements.loginField, login);
            await input.fillFieldWithValue(adminLoginElements.passwordField, password);
            await button.clickOnTheElement(adminLoginElements.submitButton);
            await w.waitUntilElementIsDisplayed(adminHomePage.adminMeganav);
            await expect(await adminHeaderContent.userRole.getText()).toEqual('BIPI Site Admin')
        });
    };

}