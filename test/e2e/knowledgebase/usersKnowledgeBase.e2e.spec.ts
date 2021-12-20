import {Login} from "../../../components/login";
const login: Login = new Login();
import {Meganav} from "../../../components/meganav";
const meganav:Meganav = new Meganav();
import {KnowledgeBaseLogic} from "../../../bussinesLayer/knowledgeBase/knowledgeBaseLogic";
const knowledgeBaseLogic: KnowledgeBaseLogic = new KnowledgeBaseLogic();
import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../testData/global";
import {gridElements} from "../../../elements/elements";
import {Grid} from "../../../components/grid";
const grid: Grid = new Grid();
import {Button} from "../../../components/simple/button";
const button: Button = new Button();

describe('Knowledge Base - Different Users Checking', () => {

    it(" Parts Knowledge Base checking - Regular User", async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.grid);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
    });

    it(" Mfr Knowledge Base checking - Regular User", async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.mfrKnowledgeBase, gridElements.grid);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
    });

    it(" Parts Knowledge Base checking - Read Only User", async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.grid);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
    });

    it(" Mfr Knowledge Base checking - Read Only User", async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.mfrKnowledgeBase, gridElements.grid);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
    });

    it(" Parts Knowledge Base checking - Restricted User", async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.grid);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
    });

    it(" Mfr Knowledge Base checking - Restricted User", async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.mfrKnowledgeBase, gridElements.grid);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
    });

    it(" Parts Knowledge Base checking - KB Admin", async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.grid);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();
    });

    it(" Mfr Knowledge Base checking - KB Admin", async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.mfrKnowledgeBase, gridElements.grid);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();
    });

    it(" Parts Knowledge Base checking - User Admin", async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.grid);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();
    });

    it(" Mfr Knowledge Base checking - User Admin", async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.mfrKnowledgeBase, gridElements.grid);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();
    });

});