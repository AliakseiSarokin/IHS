import {Login} from "../../../components/login";
import {browser} from "protractor";
const login = new Login();
import {Meganav} from "../../../components/meganav";
const megenav = new Meganav();
import {meganavItems, headerItems, urls, titles} from "../../../testData/global";
import {Header} from "../../../components/header";
import {
    homeElements, importElements, pageTitles, gridElements, searchElements, settings,
    bomElements, headerElements, toolbarElements
} from "../../../elements/elements";
import {homeItems,} from "../../../testData/home";
import {Modal} from "../../../components/modal";
const modal = new Modal();
import {NewBrowserTab} from "../../../utils/newBrowserTab";
const newBroserTab = new NewBrowserTab();
import {Link} from "../../../components/simple/link";
const link = new Link();
import {HomeLogic} from "../../../bussinesLayer/home/homeLogic";
const homeLogin = new HomeLogic();
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
import {bomVaultData} from "../../../testData/bomVault";
const helpLogic: HelpLogic = new HelpLogic();
import {Help} from "../../../components/help";
const help:Help = new Help();

describe('US190001, Verify Expand All Twisties in the Help pane', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
    });

    it(' should go to help, Verify Expand All button tooltip', async () => {
        await help.openHelpPanel();
        await helpLogic.checkHelpPanelButtonTooltip(2,'Expand All');
    });

    it(' should go to help, Verify Expand All button functionality', async () => {
        await helpLogic.openAndCheckHelpPanelExpandAllButton();
    });

    it(' should go to help, Verify Collapse All button tooltip', async () => {
        await helpLogic.checkHelpPanelButtonTooltip(2,'Collapse All');
        await help.closeHelpPanel();
    });

    it(' should go to help, Verify open topic in new window button tooltip',async () =>{
        await help.openHelpPanel();
        await helpLogic.checkHelpPanelButtonTooltip(3,'Open topic in new window');
    });

    it(' should go to help, Verify open topic in new window button functionality',async () =>{
        await helpLogic.openAndCheckHelpPanelOpenTopicInNewWindowButton();
        await help.closeHelpPanel()
    });

});