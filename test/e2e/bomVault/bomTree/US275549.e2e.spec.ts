import {browser} from "protractor";
import {buttonNames, headerItems, leftNavItems, meganavItems} from "../../../../testData/global";
import {
    gridElements,
    pageTitles,
    headerElements, settings, searchElements, partDetailsElements
} from "../../../../elements/elements";

import {SettingsLogic} from "../../../../bussinesLayer/settings/settingsLogic";
const settingLogic:SettingsLogic = new SettingsLogic();

import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";

import {Header} from "../../../../components/header";
import {BomVaultSettingsLogic} from "../../../../bussinesLayer/settings/bomVaultSettingsLogic";

const bomVaultSettingsLogic = new BomVaultSettingsLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();

import {BomImportSettingsLogic} from "../../../../bussinesLayer/settings/bomImportSettingsLogic";
const bomImportSettingsLogic = new BomImportSettingsLogic();

import {Toolbar} from "../../../../components/toolbar";
const toolBar = new Toolbar();

import {Grid} from "../../../../components/grid";
const grid = new Grid();

import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
const singleBOMLogic = new SingleBomLogic();

import {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic";
import {commonSearch} from "../../../../testData/search";
import {PartsSearchLogic} from "../../../../bussinesLayer/search/partsSearchLogic";
const bomTreeLogic = new BomTreeLogic();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();

import {Modal} from "../../../../components/modal";
import {AddPartsToBomLogic} from "../../../../bussinesLayer/search/addPartsToBomLogic";
const modal = new Modal();

const addPartsToBomLogic: AddPartsToBomLogic = new AddPartsToBomLogic();

import {Button} from "../../../../components/simple/button";
const button = new Button();

import {ViewAlternatesLogic} from "../../../../bussinesLayer/partDetails/viewAlternatesLogic";
import {Waiters as w} from "../../../../helper/waiters";
import {WorkspaceLogic} from "../../../../bussinesLayer/worksapce/workspaceLogic";
const viewAlternatesLogic: ViewAlternatesLogic = new ViewAlternatesLogic();
const workspaceLogic: WorkspaceLogic = new WorkspaceLogic();

xdescribe(' BOM Tree anchor settings, US275549', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await bomImportSettingsLogic.openSelectDestinationFolder();
        await bomImportSettingsLogic.setDefaultFolderWithName('Vault','Vault');
        await settingLogic.saveSettings();await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
        await workspaceLogic.removeItemFromWorkspace();
    });
    afterAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0],
            settings.module);
        await bomImportSettingsLogic.openSelectDestinationFolder();
        await bomImportSettingsLogic.setDefaultFolderWithName('Vault','Vault');
        await settingLogic.saveSettings();
    });

    it('Save Default Destination Folder selected in BOM tree anchor setting in BOM Vault settings', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon,headerItems.settingsMenuLinks[0],
            settings.module);
        await bomVaultSettingsLogic.checkUnCheckSingleAndSelectBOMTreeAnchorCheckbox('Folder_1','Vault/Automation_US275549/Folder_1',false);
        await settingLogic.saveSettings();
    });

    it(" should go to BOM Tree from meganav and should open Tree to Anchor Position by default", async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.newGridCheckboxSelector.get(3));
        await expect(await pageTitles.pageTitle.getText()).toEqual('BOM Tree (Hierarchy of BOMs)');
        await settingLogic.verifyfolderAnchorOpened('Folder_1');
    });
    it("Verify if clicked on refresh grid should open Tree to Anchor Position by default", async () => {
        await toolBar.returnToolbarButtonByValue(buttonNames.refresh).click();
        await settingLogic.verifyfolderAnchorOpened('Folder_1');
    });

    it("Verify grid should open Tree to Anchor Position by default when User navigate to some other page and return to BOM Tree", async () => {
        await bomTreeLogic.checkBomNewGridByName('AutoRegBOM1');
        await toolBar.returnToolbarButtonByValue(buttonNames.viewBomAttributes).click();
        await grid.changeGridWithLeftNavOptionByName(leftNavItems.bomOptions.bomTree,gridElements.newGridCheckboxSelector.get(3));
        await settingLogic.verifyfolderAnchorOpened('Folder_1');
    });

    it("Search Result, Verify Add to BOMS grid should open Tree to Anchor Position by default from parts search results page", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.checkCheckboxRange(1, 2);
        await toolBar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await expect(await modal.modalTitle.getText()).toEqual('Add Selected Parts to BOM(s)');
        await settingLogic.verifyfolderAnchorOpened('Folder_1');
    });
    it("Search Result, Verify Add to BOMS grid should open Tree to Anchor Position by default from parts details page", async () => {
        await button.clickByButtonName(buttonNames.cancelAndReturnToResults);
        await modal.openModalWithElementAndWait(gridElements.firstRowLink, partDetailsElements.titleWithIpn);
        await browser.sleep(1000);
        await toolBar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await settingLogic.verifyfolderAnchorOpened('Folder_1');
    });

    it("Search Result, Verify Add to BOMS grid should open Tree to Anchor Position by default from parts alternates page", async () => {
        await button.clickByButtonName(buttonNames.cancelAndReturnToResults);
        await button.clickByButtonNameAndWait(buttonNames.okayThanks,gridElements.selectAllCheckbox);
        await viewAlternatesLogic.openViewAlternatesModal(0, 'Part Number');
        await browser.sleep(1000);
        await grid.checkCheckboxRange(1, 2);
        await toolBar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await settingLogic.verifyfolderAnchorOpened('Folder_1');
    });

    it("Alerts, Manage Subscriptions, Verify Add to BOMS grid should open Tree to Anchor Position by default from Alerts, Manage Subscriptions page", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.manageAlertsSubs, gridElements.treeFolderNames.get(1));
        await settingLogic.verifyfolderAnchorOpened('Folder_1');
    });

});

