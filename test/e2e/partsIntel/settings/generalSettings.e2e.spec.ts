import {Header} from "../../../../components/header";
import {Login} from "../../../../components/login";
import {browser, element, by} from "protractor";
const login: Login = new Login();
import {fieldStatuses, headerItems, titles} from "../../../../testData/global";
import {headerElements, pageTitles, settings} from "../../../../elements/elements";
import {InstructionPanel} from "../../../../components/instructionPanel";
const instructionPanel: InstructionPanel = new InstructionPanel();
import {GeneralSettingsLoigc} from "../../../../bussinesLayer/settings/generalSettingsLoigc";
const generalSettingsLogic = new GeneralSettingsLoigc();
import {SettingsLogic} from "../../../../bussinesLayer/settings/settingsLogic";
const settingsLogic: SettingsLogic = new SettingsLogic();
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
const helpLogic: HelpLogic = new HelpLogic();
describe('Parts Intelligence General Settings ', () => {

    it('should open General Settings', async  () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[5],
            settings.module);
        await expect(pageTitles.settingsTitle.getText()).toEqual(titles.generalSettings);
    });

    it('should be instruction panel with option to hide/unhide', async  () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('General settings');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('General settings');
    });

    it('should be labels for general settings', async () => {
        const expectedLabels = [ 'Instructions Panel:', 'Match Confirmation Dialog Box:' ];
        await expect(await settings.generalSettings.generalSettingsLabels.getText()).toEqual(expectedLabels);
        const expectedButtons = [ 'In View on All Pages', 'Collapsed on All Pages' ];
        await expect(await settings.generalSettings.instructionPanelOptions.getText()).toEqual(expectedButtons);
    });


    it('should set Collapsed on All Pages and not display on pages', async () => {
        await generalSettingsLogic.instrPanelOptionChecking('In View on All Pages', true);
    });

    it('should set in view on all pages and display on pages', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[5],
            settings.module);
        await generalSettingsLogic.instrPanelOptionChecking('Collapsed on All Pages', false);

    });
});