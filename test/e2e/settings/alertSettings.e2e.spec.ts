import {Header} from "../../../components/header";
import {Login} from "../../../components/login";
import {browser, element, by} from "protractor";
const login: Login = new Login();
import {fieldStatuses, headerItems, titles} from "../../../testData/global";
import {headerElements, pageTitles, settings} from "../../../elements/elements";
import {InstructionPanel} from "../../../components/instructionPanel";
const instructionPanel: InstructionPanel = new InstructionPanel();
import {AlertSettingsLogic} from "../../../bussinesLayer/settings/alertSettingsLogic";
const alertSettingsLogic = new AlertSettingsLogic();
import {SettingsLogic} from "../../../bussinesLayer/settings/settingsLogic";
const settingsLogic: SettingsLogic = new SettingsLogic();
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
const helpLogic: HelpLogic = new HelpLogic();
describe('Alert Settings ', () => {

    it('should open Alert Settings', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[2],
            settings.module);
        await expect(pageTitles.moduleSettingsTitle.getText()).toEqual(titles.alertSettings);
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Alert Settings');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('View Alerts by BOM');
    });

    it('should be section title - Alert Settings',  async () => {
        const sectionTitle = ['Email Alert Notification Settings'];
        await expect(await settings.alertSettings.sectionTitles.getText()).toEqual(sectionTitle);
        const setTitles = [ 'Alert Message Format:', 'Alert File Attachment:', 'Alert Message File Attachment Type:',
            'Email Organization:', 'Receive Alerts for:', 'Preferred Alert Types:' ];
        await expect(await settings.alertSettings.alertSettingOptionsTitles.getText()).toEqual(setTitles)
    });

    it('should be settings options values - Alert Settings', async () => {
        const messageFormat = [ 'Text', 'HTML'];
        await expect(await settings.alertSettings.messageFormatRadioButtonLabels.getText()).toEqual(messageFormat);
        const fileAttachmentValues = [ 'On', 'Off'];
        await expect(await settings.alertSettings.fileAttachRadioButtonLabels.getText()).toEqual(fileAttachmentValues);
        const fileAttachmentType = [ 'CSV', 'XLSX'];
        await expect(await settings.alertSettings.fileAttachMessageTypeRadioButtonLabels.getText()).toEqual(fileAttachmentType);
        const emailOrganizarion = [ 'All BOM Impacts Together', 'One Email for each BOM'];
        await expect(await settings.alertSettings.emailOrganizationButtonLabels.getText()).toEqual(emailOrganizarion);
    });
});

