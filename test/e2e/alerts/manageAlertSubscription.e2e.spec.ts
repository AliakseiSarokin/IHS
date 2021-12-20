import {browser} from "protractor";
import {gridElements, settings, shadeElements} from "../../../elements/elements";
import {buttonNames, meganavItems, headerItems} from "../../../testData/global";
import {BomTreeFilterLogic} from "../../../bussinesLayer/bomVault/bomTreeFilterLogic";
import {BomTreeLogic} from "../../../bussinesLayer/bomVault/bomTreeLogic";
import {Button} from "../../../components/simple/button";
import {Grid} from "../../../components/grid";
import {InstructionPanel} from "../../../components/instructionPanel";
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
import {Link} from "../../../components/simple/link";
import {Login} from "../../../components/login";
import {Shade} from "../../../components/shade";
import {SubscribeToShadeLogic, ManageEmailAddressesLogic, FindAndReplaceShadeLogic, ManageAlertSubsLogic} from "../../../bussinesLayer/alerts/manageAlertSubsLogic";
import {Meganav} from "../../../components/meganav";
import {RadioButton} from "../../../components/simple/radioButton";
import {alertsData} from "../../../testData/alerts";

const button: Button = new Button();
const bomTreeFilterLogic: BomTreeFilterLogic = new BomTreeFilterLogic();
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const grid: Grid = new Grid();
const instructionPanel: InstructionPanel = new InstructionPanel();
const helpLogic: HelpLogic = new HelpLogic();
const link: Link = new Link();
const login: Login = new Login();
const subscribeToShadeLogic: SubscribeToShadeLogic = new SubscribeToShadeLogic();
const manageEmailAddressesLogic: ManageEmailAddressesLogic = new ManageEmailAddressesLogic();
const findAndReplaceShadeLogic: FindAndReplaceShadeLogic = new FindAndReplaceShadeLogic();
const manageAlertSubsLogic:ManageAlertSubsLogic = new ManageAlertSubsLogic();
const meganav: Meganav = new Meganav();
const radioButton: RadioButton = new RadioButton();

describe("Manage Alerts Subscription", () => {

    it("should go to Manage Alerts Subscriptions from Meganav", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.manageAlertsSubs, gridElements.treeFolderNames.get(1));

    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Manage Alert Subscriptions');
    });

    //temp skip
    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('View Alerts by BOM');
    });

    it("should be column headers", async () => {
        await grid.newGridCheckingLockedColumnHeaders(['BOM Hierarchy Grid']);
        await grid.newGridCheckingUnlockedColumnHeaders(['BOM Owner','EOL', 'PSC', 'PCN', 'PCF/PFN',
            'Subscribers']);
    });

    it(" should open BOM Tree Filter ", async () => {
        await bomTreeFilterLogic.openBomTreeFilter();
    });

    it('should close BOM Tree Filter',  async () => {
        await bomTreeFilterLogic.closeBomTreeFilter();
    });

    it('should be definition icon panel ',  async () => {
        await bomTreeFilterLogic.openBomTreeFilter();
        await bomTreeFilterLogic.iconDefenitionPanelChecking();
    });

    it('should be search panel',  async () => {
        await bomTreeFilterLogic.searchPanelChecking();
    });

    it('should show no results for unexisted item',  async () => {
        await bomTreeFilterLogic.searchUnexisctedItem();
    });

    it('should show  results for existed item',  async () => {
        await bomTreeFilterLogic.searchExistedItem();
    });

    it('should highlight selected item in the search results and in the bom tree',  async () => {
        await bomTreeFilterLogic.highlightItemInTheGrid();
    });

    it('should leave search results after closing filter',  async () => {
        await bomTreeFilterLogic.leaveSearchResultsAfterClosingSlider();
    });

    it('should highlight the same item after colsing filter and performing search again',  async () => {
        await bomTreeFilterLogic.searchExistedItem();
        await bomTreeFilterLogic.highlightItemInTheGrid();
    });

    it('should be option to interract with toolbar when filter is opened ',  async () => {
        await bomTreeFilterLogic.toolbarOptionsWithOpenFilterManageAlertSubs();
    });

    it("should be active/inactive Subscribe to button", async () => {
        await expect(button.returnButtonByText(buttonNames.subscribeTo).isEnabled()).toBeFalsy();
        await grid.checkCheckboxRange(1,2);
        await expect(button.returnButtonByText(buttonNames.subscribeTo).isEnabled()).toBeTruthy();
        await grid.checkCheckboxRange(1,2);
        await grid.checkCheckboxRange(1,3);
        await expect(button.returnButtonByText(buttonNames.subscribeTo).isEnabled()).toBeTruthy();
        await grid.checkCheckboxRange(1,3);
        await grid.checkCheckboxRange(7,8);
    });

    it("should open Sibscribe to shade", async () => {
        await Shade.openShadeWithButton(buttonNames.subscribeTo);
        await expect(await shadeElements.shadeTitle.getText()).toEqual('Subscribe to Alerts');
    });

    it("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Subscribe to Alerts');
    });

    it("should close Sibscribe to shade", async () => {
        await Shade.closeShadeWithButton(buttonNames.cancel)
    });

    it("should show tooltip when hover on selected items", async () => {
        await Shade.openShadeWithButton(buttonNames.subscribeTo);
        await subscribeToShadeLogic.showTooltipForSelectedItems();
    });

    it("should be Subscribed Email Addresses field", async () => {
        await subscribeToShadeLogic.checkingSubscribeEmailAddressesFiled();
    });

    it("should be warning message on invalid email", async () => {
        await subscribeToShadeLogic.invalidEmailChecking(alertsData.subscribeToShade.invalidEmailMessage);
    });

    it("should add valid email", async () => {
        await subscribeToShadeLogic.addValidEmail();
    });

    it("should be warning message on duplicate email", async () => {
        await subscribeToShadeLogic.addDuplicateEmail();
    });

    it("should remove added emails", async () => {
        await subscribeToShadeLogic.removeChecking();
    });

    it("should be warning modal when you save alert subsc without added emails", async () => {
        await subscribeToShadeLogic.saveWithNoEmailChecking();
    });

    it("should show cancel modal when try to close the shade with changes ", async () => {
        await subscribeToShadeLogic.closeModalChecking(buttonNames.cancel);
    });

    it("should save added email and alert types ", async () => {
        await subscribeToShadeLogic.saveChecking();
    });

    it("should be active/inactive Manage email addresses button", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.manageAlertsSubs, gridElements.treeFolderNames.get(1));
        await expect(button.returnButtonByText(buttonNames.manageEmailAddresses).isEnabled()).toBeFalsy();
        await grid.checkCheckboxRange(1,2);
        await expect(button.returnButtonByText(buttonNames.manageEmailAddresses).isEnabled()).toBeTruthy();
        await grid.checkCheckboxRange(1,2);
        await grid.checkCheckboxRange(1,3);
        await expect(button.returnButtonByText(buttonNames.manageEmailAddresses).isEnabled()).toBeTruthy();
        await grid.checkCheckboxRange(1,3);
        await grid.checkCheckboxRange(7,8);
    });

    it("should open Manage email addresses shade", async () => {
        await Shade.openShadeWithButton(buttonNames.manageEmailAddresses);
        await expect(await shadeElements.shadeTitle.getText()).toEqual('Manage Alert Email Addresses');
    });

    it("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Manage Alert Email Options');
    });

    it("should close Manage email addresses shade", async () => {
        await Shade.closeShadeWithButton(buttonNames.close)
    });

    it("should show tooltip when hover on selected items", async () => {
        await Shade.openShadeWithButton(buttonNames.manageEmailAddresses);
        await subscribeToShadeLogic.showTooltipForSelectedItems();
    });

    it("should right side panel in Manage Email Addresses shade", async () => {
        await manageEmailAddressesLogic.checkingRightSideTextAndLabels();
    });

    it("should be manage email addresses field - Manage Email Addresses shade", async () => {
        await manageEmailAddressesLogic.checkingManageEmailAddressesFiled();
    });

    it("should be warning message on invalid email - Manage Email Addresses shade", async () => {
        await manageEmailAddressesLogic.invalidEmailChecking(alertsData.manageEmailAddressShade.invalidEmailMessage);
    });

    it("should add valid email - Manage Email Addresses shade", async () => {
        await manageEmailAddressesLogic.addValidEmail();
    });

    it("should be warning message on duplicate email email", async () => {
        await manageEmailAddressesLogic.addDuplicateEmail();
    });

    it("should be option to remove added emails", async () => {
        await manageEmailAddressesLogic.addSeveralEmail();
        await manageEmailAddressesLogic.removeEmails();
    });

    it("should be close modal", async () => {
        await manageEmailAddressesLogic.addValidEmail();
        await subscribeToShadeLogic.closeModalChecking();
    });


    it("should close shade through close modal", async () => {
        await manageEmailAddressesLogic.closeShadeThroughCloseModal();
    });

    it("should open replace confirmation view", async () => {
        await Shade.openShadeWithButton(buttonNames.manageEmailAddresses);
        await manageEmailAddressesLogic.addValidEmail();
        await radioButton.checkRadioButtonByLabelName('Replace');
        await manageEmailAddressesLogic.replaceAndSaveChecking();
    });

    it("should return to shade by clicking on the cancel button in manage email shade", async () => {
        await manageEmailAddressesLogic.returnToShadeChecking();
        await manageEmailAddressesLogic.replaceAndSaveChecking();
    });

    it("should replace email", async () => {
        await manageEmailAddressesLogic.replaceChecking();
    });

    it("should open remove confirmation view", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.manageAlertsSubs, gridElements.grid);
        await grid.checkCheckboxRange(7,8);
        let mail = gridElements.rowCellsWithContentNewGrid(8,5).getText();
        await Shade.openShadeWithButton(buttonNames.manageEmailAddresses);
        await manageEmailAddressesLogic._addEmail(mail);
        await radioButton.checkRadioButtonByLabelName('Remove');
        await manageEmailAddressesLogic.removeAndSaveChecking();
    });

    it("should return to shade by clicking on the cancel button in manage email shade", async () => {
        await manageEmailAddressesLogic.returnToShadeChecking();
    });

    it("should remove email", async () => {
        await manageEmailAddressesLogic.removeAndSaveChecking();
        await manageEmailAddressesLogic.removeChecking();
    });

    it("should open append confirmation view", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.manageAlertsSubs, gridElements.grid);
        await grid.checkCheckboxRange(7,8);
        await Shade.openShadeWithButton(buttonNames.manageEmailAddresses);
        await manageEmailAddressesLogic.addValidEmail();
        await radioButton.checkRadioButtonByLabelName('Append');
        await manageEmailAddressesLogic.appendAndSaveChecking();
    });

    it("should return to shade by clicking on the cacnel button in manage email shade", async () => {
        await manageEmailAddressesLogic.returnToShadeChecking();
    });

    it("should append email", async () => {
        await manageEmailAddressesLogic.appendAndSaveChecking();
        await manageEmailAddressesLogic.appendChecking();
    });


    it("should be active/inactive Manage email addresses button", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.manageAlertsSubs, gridElements.treeFolderNames.get(1));
        await expect(button.returnButtonByText(buttonNames.findAndReplace).isEnabled()).toBeFalsy();
        await grid.checkCheckboxRange(1,2);
        await expect(button.returnButtonByText(buttonNames.findAndReplace).isEnabled()).toBeTruthy();
        await grid.checkCheckboxRange(1,2);
        await grid.checkCheckboxRange(1,3);
        await expect(button.returnButtonByText(buttonNames.findAndReplace).isEnabled()).toBeTruthy();
        await grid.checkCheckboxRange(1,3);
        await grid.checkCheckboxRange(7,8);

    });

    it("should open Find and Replace Email shade", async () => {
        await Shade.openShadeWithButton(buttonNames.findAndReplace);
        await expect(await shadeElements.shadeTitle.getText()).toEqual('Find and Replace Email');
    });

    it("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Find and Replace Email');
    });

    it("should close Manage email addresses shade", async () => {
        await Shade.closeShadeWithButton(buttonNames.close);
    });

    it("should show tooltip when hover on selected items", async () => {
        await Shade.openShadeWithButton(buttonNames.findAndReplace);
        await subscribeToShadeLogic.showTooltipForSelectedItems();
    });


    it("should be right side panel in Find And Replace shade", async () => {
        await findAndReplaceShadeLogic.checkingRightSideTextAndLabels();
    });

    it("should be email addresses fields - Find And Replace shade", async () => {
        await findAndReplaceShadeLogic.checkingFindAndReplaceEmailAddressesFiled();
    });

    it("should be warning message on invalid email - Find And Replace shade", async () => {
        await findAndReplaceShadeLogic.invalidEmailChecking(alertsData.manageEmailAddressShade.invalidEmailMessage);
    });

    it("should be active inactive save changes button - Find And Replace shade", async () => {
        await findAndReplaceShadeLogic.saveChangesButtonChecking();
    });

    it("should be close shade modal - Find And Replace shade", async () => {
        await subscribeToShadeLogic.closeModalChecking();
    });

    it("should close shade through close modal - Find And Replace shade", async () => {
        await manageEmailAddressesLogic.closeShadeThroughCloseModal();
    });

    it("should add valid email - Find And Replace shade", async () => {
        await Shade.openShadeWithButton(buttonNames.findAndReplace);
        await findAndReplaceShadeLogic.addValidEmails();
    });

    it("should open confirm shade by clicking on the save changes button - Find And Replace shade", async () => {
        await findAndReplaceShadeLogic.confirmAfterSaveChangesChecking();
    });

    it("should close confirm ande return to shade with set values - Find And Replace shade", async () => {
        await findAndReplaceShadeLogic.closeConfirmAndReturnToConfirm();
    });

    it("should replace email - Find And Replace shade", async () => {
        await findAndReplaceShadeLogic.replaceChecking();
    });

});

describe("Alerts Type Settings in Subscribe to Shade", () => {

    it("should go to Manage Alerts Subscriptions from Meganav", async () => {
        await manageAlertSubsLogic.checkPrefAlertTypesWithAlertsSettings()
    });

});


describe("Manage Alerts Subscription - Users",  () => {

    it("should not be option to go to Manage Alerts - Read Only User", async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.clickOnTheMeganavItemByName(meganavItems.alerts);
        await expect(link.returnElementByLinkName( meganavItems.alertsSubItems.manageAlertsSubs).isPresent()).toBeFalsy()

    });

    it("should not be option to go to Manage Alerts - Restricted User", async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.manageAlertsSubs, gridElements.grid);
        await bomTreeLogic.checkNewGridFolderRows(1);
        await expect(button.returnButtonByText(buttonNames.subscribeTo).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.manageEmailAddresses).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.findAndReplace).isEnabled()).toBeFalsy();
    });

});