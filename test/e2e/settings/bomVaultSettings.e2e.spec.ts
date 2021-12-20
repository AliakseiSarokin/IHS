import {Header} from "../../../components/header";

import {Login} from "../../../components/login";
import {browser, element, by} from "protractor";

const login: Login = new Login();
import {fieldStatuses, headerItems, meganavItems, titles} from "../../../testData/global";
import {gridElements, headerElements, pageTitles, settings} from "../../../elements/elements";
import {InstructionPanel} from "../../../components/instructionPanel";

const instructionPanel: InstructionPanel = new InstructionPanel();
import {GeneralSettingsLoigc} from "../../../bussinesLayer/settings/generalSettingsLoigc";

new GeneralSettingsLoigc();
import {SettingsLogic} from "../../../bussinesLayer/settings/settingsLogic";

const settingsLogic: SettingsLogic = new SettingsLogic();
import {SingleBomLogic} from "../../../bussinesLayer/bomVault/singleBomLogic";

const singleBomLogic = new SingleBomLogic();
import {BomVaultSettingsLogic} from "../../../bussinesLayer/settings/bomVaultSettingsLogic";

const bomVaultSettingsLogic = new BomVaultSettingsLogic();
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
import {Dropdown} from "../../../components/dropdown";
import {bomVaultData} from "../../../testData/bomVault";
import {Toolbar} from "../../../components/toolbar";
import {Grid} from "../../../components/grid";
import {Meganav} from "../../../components/meganav";
import {PartsSearchLogic} from "../../../bussinesLayer/search/partsSearchLogic";


const helpLogic: HelpLogic = new HelpLogic();

const toolbar: Toolbar = new Toolbar();
const grid = new Grid();
const meganav: Meganav = new Meganav();
new PartsSearchLogic();
describe('BOM Vault Settings', () => {

    it('should open BOM Vault Settings', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await expect(pageTitles.settingsTitle.getText()).toEqual(titles.bomVaultSettings);
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('BOM Vault settings');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('BOM Vault Settings');
    });

    it('should be two sections: BOM Vault and BOM Details(Single BOM View) ', async () => {
        const expectedLabels = ['BOM Vault', 'BOM Tree Anchor', 'BOM Details (Single BOM View)', 'Locked Columns:'];
        await expect(await settings.bomVaultSettings.sectionTitles.getText()).toEqual(expectedLabels);
        const optionLabels: string[] = ['Number of Results per Page:', 'BOM Details:', 'Internal Part Number:'];
        await expect(await settings.bomVaultSettings.optionLabels.getText()).toEqual(optionLabels);
    });

    it('should set "All" per page and should display on the search result', async () => {
        await settingsLogic.paginationChecking('All', singleBomLogic.goToFirstBomFromMeganav);
    });

    it('should set 500 per page and should display on the search result', async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await settingsLogic.paginationChecking('500', singleBomLogic.goToFirstBomFromMeganav);
    });

    it('should set 250 per page and should display on the search result', async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await settingsLogic.paginationChecking('250', singleBomLogic.goToFirstBomFromMeganav);
    });

    it('should set 100 per page and should display on the search result', async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await settingsLogic.paginationChecking('100', singleBomLogic.goToFirstBomFromMeganav);
    });

    it('should show leave modal when you change pagination option without saving', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await settingsLogic.showLeaveModalRadioButton(settings.bomVaultSettings.paginationRadioButtonLabels,
            settings.bomVaultSettings.paginationRadioButtonInputs);
        await settingsLogic.saveSettings();
    });

    it('should set 50 per page and should display on the search result', async () => {
        await settingsLogic.paginationChecking('50', singleBomLogic.goToFirstBomFromMeganav);
    });


    it('should set 25 per page and should display on the search result', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await settingsLogic.paginationChecking('25', singleBomLogic.goToFirstBomFromMeganav);
    });


    it('should show leave modal when you change layout option without saving', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await settingsLogic.showLeaveModalDropdownValue(settings.bomVaultSettings.layoutDropdownToggle, 'Environmental');
        await settingsLogic.saveSettings();
    });

    it('should select Environmental and display Environmental in bom vault for Preferred Layout ', async () => {
        await settingsLogic.checkingLayout('Environmental', settings.bomVaultSettings.layoutDropdownToggle,
            singleBomLogic.goToFirstBomFromMeganav);
    });


    it('should select Import and display Import in bom vault for Preferred Layout ', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await settingsLogic.checkingLayout('Import', settings.bomVaultSettings.layoutDropdownToggle,
            singleBomLogic.goToFirstBomFromMeganav);
    });

    it('should select Import and display Import in bom vault for Preferred Layout ', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await settingsLogic.checkingLayout('Lifecycle', settings.bomVaultSettings.layoutDropdownToggle,
            singleBomLogic.goToFirstBomFromMeganav);
    });

    it('should select default and display default in bom vault for Preferred Layout ', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await settingsLogic.checkingLayout('Default', settings.bomVaultSettings.layoutDropdownToggle,
            singleBomLogic.goToFirstBomFromMeganav);
    });

    it('should set NO and unlock Internal Part Number Column', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        const columnHeaders = ['Rel. Info', 'LC Risk', 'ENV Risk', 'SC Risk'];
        await bomVaultSettingsLogic.lockUnLockColumnChecking('NO', columnHeaders);
    });

    it('should show leave modal when you change Locked Column option without saving', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await settingsLogic.showLeaveModalRadioButton(settings.bomVaultSettings.lockedColumnnRadioButtonLabels,
            settings.bomVaultSettings.lockedColumnnRadioButtonInputs);
        await settingsLogic.saveSettings();
    });

    it('should set YES and lock Internal Part Number Column', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        const columnHaders = ['Rel. Info', 'LC Risk', 'ENV Risk', 'SC Risk',
            'Internal Part Number'];
        await bomVaultSettingsLogic.lockUnLockColumnChecking('YES', columnHaders);
    });
});
xdescribe('BOM Vault Settings - US275682 Add User Option to Filter on "My BOMs"', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await settingsLogic.checkUnCheckSingleCheckbox(settings.bomVaultSettings.ExpectedDefaultText.get(1), settings.bomVaultSettings.ExpectedDefaultinput.get(1), false);
    });

    it('should open BOM Vault Settings', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await expect(pageTitles.settingsTitle.getText()).toEqual(titles.bomVaultSettings);
    });

    it('should have new checkbox followed by proper text- View Only My BOMs by Default', async () => {
        const expectedLabels = 'BOM Vault';
        await expect(await settings.bomVaultSettings.sectionTitles.get(0).getText()).toEqual(expectedLabels);
        const expectedText: string = 'View Only My BOMs by Default';
        await expect(await settings.bomVaultSettings.ExpectedDefaultText.get(1).getText()).toEqual(expectedText);
    });

    it('Check "View Only My BOMs by Default" should enable Save Changes button and once saved should verify only BOMS owned by current users are shown in BOM vault', async () => {
        await settingsLogic.checkViewOnlyMyBom(true);
        await settingsLogic.checkBomsOwnedByCurrentUSersVisisble('b4testadmin', true);

    });

    it('Verify if the saved settings are retained after user do some operations in vault, navigate away and then back to the Vault', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(bomVaultData.bomVault.filters[7]);
        await grid.newGridCheckIconPresentInColumnByColumnName(0, 'BOM Info');
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, gridElements.checkboxSelector.get(1));
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await settingsLogic.checkBomsOwnedByCurrentUSersVisisble('b4testadmin', true);
    });

    it('should uncheck "View Only My BOMs by Default" enable Save Changes button and verify all BOMS are shown', async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await settingsLogic.checkViewOnlyMyBom(false);
        await settingsLogic.checkBomsOwnedByCurrentUSersVisisble('b4testadmin', false);
    });
});