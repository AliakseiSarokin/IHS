import {Header} from "../../../components/header";

import {Login} from "../../../components/login";
import {browser, element, by} from "protractor";

const login: Login = new Login();
import {fieldStatuses, headerItems, titles, buttonNames, modalTitles, meganavItems} from "../../../testData/global";
import {
    commonElements, dropdownElements, gridElements, headerElements, importElements, pageTitles, searchElements,
    settings
} from "../../../elements/elements";
import {InstructionPanel} from "../../../components/instructionPanel";
import {CheckBox} from "../../../components/simple/checkBox";
const checkbox: CheckBox = new CheckBox();
import {Link} from "../../../components/simple/link";
const link: Link = new Link();
const instructionPanel: InstructionPanel = new InstructionPanel();
import {GeneralSettingsLoigc} from "../../../bussinesLayer/settings/generalSettingsLoigc";

const generalSettingsLogic = new GeneralSettingsLoigc();
import {SettingsLogic} from "../../../bussinesLayer/settings/settingsLogic";
const settingsLogic: SettingsLogic = new SettingsLogic();

import {BomImportSettingsLogic} from "../../../bussinesLayer/settings/bomImportSettingsLogic";
const bomImportSettingsLogic = new BomImportSettingsLogic();

import {Toolbar} from "../../../components/toolbar";

const toolbar = new Toolbar();
import {Dropdown} from "../../../components/dropdown";

import {Modal} from "../../../components/modal";

const modal = new Modal();
import {ImportLogic} from "../../../bussinesLayer/import/importLogic";

const importLogic = new ImportLogic();
import {Grid} from "../../../components/grid";
import {Waiters as w} from "../../../helper/waiters";

const grid = new Grid();
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
import {Random} from "../../../utils/random";
import {importItems} from "../../../testData/import";
const random: Random = new Random();
import {Button} from "../../../components/simple/button";
const button: Button = new Button();
import {Meganav} from "../../../components/meganav";
import {ConsoleErrors} from "../../../helper/consoleErrors";
const meganav: Meganav = new Meganav();
const helpLogic: HelpLogic = new HelpLogic();
describe('BOM Import Settings - BOM Import Default Options', () => {

    it('should open BOM Import Settings', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await expect(pageTitles.settingsTitle.getText()).toEqual(titles.bomImportSettings);

    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('BOM import settings');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('BOM import settings: Default Options');
    });

    it('should be Import Settings Labels ', async () => {
        const sectionTitle = ['BOM Import Default Options', 'CPL Match Default Options',
            'Default Destination Folder', 'About BOM Import'];
        await expect(await settings.sectionLabels.getText()).toEqual(sectionTitle);

    });

    it('should set List KB Option and be displayed in import options ', async () => {
        await bomImportSettingsLogic.kbOptionChecking('List')
    });

    it('should show leave modal when you change pagination option without saving', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await settingsLogic.showLeaveModalRadioButton(settings.bomImportSettings.kbOptionsRadioButtonLabels,
            settings.bomImportSettings.kbOptionsRadioButtonInputs);
        await settingsLogic.saveSettings();
    });

    it("should open BOM Import Settings, open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('BOM import settings: Default Options');
    });

    it("should open BOM Import Settings, open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Default Options');
    });

    it('should set List KB Option and be displayed in import options ', async () => {
        await bomImportSettingsLogic.kbOptionChecking('Global')
    });

    it('should check all default options checkboxes and displayed in import options ', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.checkUncheckDefaultImportOptions(true)
    });

    it('should show leave modal when you change pagination option without saving', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await settingsLogic.showLeaveModalCheckbox(settings.bomImportSettings.defaultCheckboxLabels.get(1));
        await settingsLogic.saveSettings();
    });

    it('should check all default options checkboxes and displayed in import options ', async () => {
        await bomImportSettingsLogic.checkUncheckDefaultImportOptions(false)
    });

});


describe('BOM Import Settings - CPL Matching Options', () => {


    it('should be CPL Match Default Options logic in settings ', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.cplCheckboxLogicChecking()
    });


    it('should be CPL Match Default Options logic in import ', async () => {
        await bomImportSettingsLogic.cplCheckboxInImport(0, 3)
    });

    it('should show leave modal when you change cpl option without saving', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await settingsLogic.showLeaveModalCheckbox(settings.bomImportSettings.cplCheckboxLabels.get(1));
        await settingsLogic.saveSettings();
    });

    it('should be CPL Match Default Options logic ', async () => {
        await bomImportSettingsLogic.cplCheckboxInImport(3, 4)
    });
});

xdescribe('BOM Import Settings Settings - Default Destination Folder', () => {

    it('should be Default Destination Folder attributes', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.openSelectDestinationFolder();
        await expect(await commonElements.popoverTitle.getText()).toEqual('Select Destination Folder:');
    });

    it('should close select destination folder', async () => {
        await bomImportSettingsLogic.closeDestinationFolder();
    });

    it('should not be vault name for new folder', async () => {
        await bomImportSettingsLogic.openSelectDestinationFolder();
        await importLogic.notCreateVaultFolder();
    });

    it('should set another folder as default', async () => {
        await bomImportSettingsLogic.setDefaultFolder(1, 'Vault/');
    });

    it('should display selected folder in import', async () => {
        await bomImportSettingsLogic.displaySelectedFolderInImport();
    });

    it('should return to default settings', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.returnToPreviousValue();
    });
});


describe('BOM Import Settings - "About BOM Import" Option, US275137', () => {

    it('should NOT be displayed "ABOUT BOM IMPORT" page if "Show About BOM Import step" checkbox is OFF', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await checkbox.checkUnCheckSingleCheckbox(await settings.bomImportSettings.aboutBomImportLabels.get(0),
            await settings.bomImportSettings.aboutBomImportInputs.get(0), 'false');
        await settingsLogic.saveSettings();
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.dragAndDropText);
        await expect(await importElements.doNotShowCheckboxLabel.isPresent()).toBeFalsy();
        await expect(await importElements.dragAndDropText.isDisplayed()).toBeTruthy();
    });

    it('should be displayed "ABOUT BOM IMPORT" page if "Show About BOM Import step" checkbox is ON', async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await checkbox.checkUnCheckSingleCheckbox(await settings.bomImportSettings.aboutBomImportLabels.get(0),
            await settings.bomImportSettings.aboutBomImportInputs.get(0), 'true');
        await settingsLogic.saveSettings();
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.doNotShowCheckboxLabel);
        await expect(await importElements.doNotShowCheckboxLabel.isDisplayed()).toBeTruthy();
        await expect(await importElements.dragAndDropText.isPresent()).toBeFalsy();
    });
});


describe('BOM Import Settings Settings - Import Saved Conf', () => {

    it('should go to Import Saved Conf', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.goToSavedConfigs();
        await expect(await pageTitles.settingsTitle.getText()).toEqual(titles.importSavedConfig);
    });

    it('should be tag label for columns filtering - sort A to Z ', async () => {
        await toolbar.filterAllColumnsAZ();
    });

    it('should remove filtering with clear all', async () => {
        await toolbar.clearFilteringWithClearAll();
    });

    it('should be tag label for columns filtering - sort Z to A', async () => {
        await toolbar.filterAllColumnsZA();
    });

    it('should be filters - Import Saved Conf', async () => {
        const expectedFilterOptions = ['Clear Filter', 'My Configurations', 'My Private Configurations',
            'My Shared Configurations', 'All Shared Configurations', 'Other Shared Configurations'];
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);
    });

    it('should select option and display tag - Import Saved Conf ', async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter);
    });

    it('should display one tag - Import Saved Conf ', async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove tag by clicking on clear all tags link - Import Saved Conf', async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove tag by clicking on X - Import Saved Conf', async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it('should unhide button with dropdown list  - Import Saved Config', async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column - Import Saved Config', async () => {
        await grid.newGridHideColumnByName('Name');
        await toolbar.displayHiddenColumnInDropdonwToolbar('Name')
    });

    it('should unhide the column with Unhode All - Import Saved Config', async () => {
        await toolbar.unhideCellNameWithUnhideAll('Name');
    });

    it('should open saved config modal', async () => {
        await bomImportSettingsLogic.openSavedConfModal();
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('BOM Import settings: Saved Configurations');
    });

    it('should be import option containers', async () => {
        const optionHeaders = ['BOM Import Destination Folder', 'BOM Import Column Mapping',
            'BOM Import Alert Notifications (Subscribe)', 'BOM Import Options',
            'Corporate Parts List (CPL) Match Options'];
        await expect(await settings.bomImportSettings.savedConfOptions.getText()).toEqual(optionHeaders);
    });

    it('should close saved config modal', async () => {
        await modal.closeModalWithXButton();
        await bomImportSettingsLogic.openSavedConfModal();
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should open close delete modal and be modal attributes - Import Saved Config', async () => {
        await grid.checkCheckboxRange(1, 2);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.warning);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.cancel);
    });
});

describe('BOM Import Settings Settings - Import Saved Conf - DE110127', () => {

    const saveConfName: string = random.randomTextGenerator(10);

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[2]);
        await importLogic.addEmail();
        await button.clickOnTheElementAndWaitNotDisplayed(button.returnButtonByText(buttonNames.saveSubs),
            importElements.optionModalBody);
        await importLogic.saveConfig(saveConfName);
        await browser.sleep(2000)
        await importLogic.leaveImportWitLeaveModal();
    });

    it('should  not be console error during delettng Import Saved Conf', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.goToSavedConfigs();
        const cellValues: string[] = await grid.newGridReturnCellValuesByColumnName(0, 'Name');
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.yesContinueWIthMyDelete);
        await expect((await ConsoleErrors.getConsoleErrors()).length).toEqual(0)
    });

});


describe('Setting Defects, DE114490', () => {

    it('BOM Import Settings: Saved Configurations: user name is displayed in quotes', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.goToSavedConfigs();
        let configName = await grid.newGridReturnCellValuesByColumnName(0, 'Name');
        await modal.openModalWithLinkName(configName[0]);
        await checkbox.checkUnCheckSingleCheckbox(searchElements.saveSearchSharedCheckboxLabel.get(0),
            searchElements.saveSearchSharedCheckboxInput.get(0), fieldStatuses.untouchedField);
        await modal.closeModalWithButton(buttonNames.saveChanges);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await button.clickOnTheElementAndWait(await link.returnElementByLinkName( 'All Shared Configurations'),
            gridElements.newGridRows.last());
        let owners: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Owner');
        for(let i: number = 0; i < owners.length;  i++) {
            await expect(await owners[i]).not.toContain('\"')
        }
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await button.clickOnTheElementAndWait(await link.returnElementByLinkName( 'Clear Filter'),
            gridElements.newGridRows.last());
        await modal.openModalWithLinkName(configName[0]);
        await checkbox.checkUnCheckSingleCheckbox(searchElements.saveSearchSharedCheckboxLabel.get(0),
            searchElements.saveSearchSharedCheckboxInput.get(0), fieldStatuses.touchedField);
        await modal.closeModalWithButton(buttonNames.saveChanges);
    });
});

xdescribe('BOM Import Settings Settings - Default Destination Folder, verify is in sync with BOM tree anchor settings in BOM vault settings, US275549', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.openSelectDestinationFolder();
        await bomImportSettingsLogic.setDefaultFolderWithName('Vault','Vault');
        await settingsLogic.checkUnCheckSingleCheckbox(await settings.bomVaultSettings.ExpectedDefaultText.last(),await settings.bomVaultSettings.ExpectedDefaultinput.last(),false);
    });

    afterAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.openSelectDestinationFolder();
        await bomImportSettingsLogic.setDefaultFolderWithName('Vault','Vault');
        await settingsLogic.checkUnCheckSingleCheckbox(await settings.bomVaultSettings.ExpectedDefaultText.last(),await settings.bomVaultSettings.ExpectedDefaultinput.last(),true);
    });

    it('Verify new checkbox with proper text present below Default Destination Folder and selecting it enables save settings button', async () => {
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await settings.bomVaultSettings.ExpectedDefaultText.last().getText()).toEqual('Use this folder as my BOM Tree Anchor');
        await settingsLogic.checkUnCheckSingleCheckbox(await settings.bomVaultSettings.ExpectedDefaultText.last(),await settings.bomVaultSettings.ExpectedDefaultinput.last(),true);
    });

    it('Verify Default Destination Folder checkbox selected and checked/unchecked in Import settings is reflected and is in sync with BOM tree anchor setting in BOM Vault settings', async () => {
        await bomImportSettingsLogic.verifyImportSettingscheckboxSync(true);
        await browser.sleep(2000);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon,headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.verifyImportSettingscheckboxSync(false);
    });

    it('Verify Default Destination Folder selected in Import settings is reflected and is in sync with BOM tree anchor setting in BOM Vault settings if the checkbox is selected', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon,headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.verifyImportSettingsdestinationFolderSync('Automation_US275549/',true);
    });
    it('Verify Default Destination Folder selected in Import settings is not reflected and is not in sync with BOM tree anchor setting in BOM Vault settings if the checkbox is unchecked', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await bomImportSettingsLogic.openSelectDestinationFolder();
        await bomImportSettingsLogic.setDefaultFolderWithName('Vault','Vault');
        await w.waitUntilElementIsClickable(element(by.buttonText(buttonNames.saveChanges)));
        await button.clickByButtonName(buttonNames.saveChanges);
        await w.waitUntilWorkingModalNotDisplayed();
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon,headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.verifyImportSettingsdestinationFolderSync('Automation_US275549',false);
    });
});