import {
    alertsElements, commonElements, gridElements, bomElements, cplElements,
    settings, shadeElements, headerElements
} from "../../elements/elements";
import {buttonNames, fieldStatuses, meganavItems,  headerItems} from "../../testData/global";
import {alertsData} from "../../testData/alerts";
import {browser} from "protractor";
import {Actions} from "../../utils/actions";
import {Button} from "../../components/simple/button";
import {CheckBox} from "../../components/simple/checkBox";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Grid} from "../../components/grid";
import {Input} from "../../components/simple/input";
import {Header} from "../../components/header";
import {Link} from "../../components/simple/link";
import {Login} from "../../components/login";
import {Meganav} from "../../components/meganav";
import {Modal} from "../../components/modal";
import {Random} from "../../utils/random";
import {SingleBomLogic} from "../bomVault/singleBomLogic";
import {Shade} from "../../components/shade";
import {StringArray} from "../../utils/stringArray";
import {Waiters as w} from "../../helper/waiters";

const actions:Actions = new Actions();
const button: Button = new Button();
const checkbox: CheckBox = new CheckBox();
const input: Input = new Input();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const random: Random = new Random();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const stringArray: StringArray = new StringArray();

export class SubscribeToShadeLogic {

    public async showTooltipForSelectedItems(){
        let result:string = await alertsElements.manageAlertSubs.selectedFiles.get(0).getText();
        await actions.mouseMoveToElementAndWaitForTooltip(alertsElements.manageAlertSubs.selectedFiles.get(0),
            commonElements.popoverContent.get(0));
        await expect(result).toContain(await commonElements.popoverContent.get(0).getText())
    };

    public async checkingSubscribeEmailAddressesFiled() {
        await expect(await elementAttributes.getElementAttribute(alertsElements.manageAlertSubs.subscribeEmailAddressesFiled,'placeholder'))
            .toEqual('Enter email address...');
        await expect(alertsElements.manageAlertSubs.addEmailButton.isDisplayed()).toBeTruthy();
        await expect(alertsElements.manageAlertSubs.clearEmailFieldButton.get(0).isDisplayed()).toBeTruthy();
        await expect(await alertsElements.manageAlertSubs.emailFieldCounter.get(0).getText())
            .toEqual('Characters remaining 255 of 255');
        await input.fillFieldWithValue(alertsElements.manageAlertSubs.subscribeEmailAddressesFiled,random.randomTextGenerator(10));
        await alertsElements.manageAlertSubs.clearEmailFieldButton.get(0).click();
        await expect((await elementAttributes.getElementAttribute(alertsElements.manageAlertSubs.subscribeEmailAddressesFiled,'value')).length)
            .toEqual(0);
    };

    public async invalidEmailChecking(invalidMessage:string) {
        await input.fillFieldWithValue(alertsElements.manageAlertSubs.subscribeEmailAddressesFiled,random.randomTextGenerator(10));
        await expect(await alertsElements.manageAlertSubs.warningMessage.get(0).getText()).toEqual(invalidMessage);
        await expect(alertsElements.manageAlertSubs.addEmailButton.isEnabled()).toBeFalsy();
        await expect(await alertsElements.manageAlertSubs.emailFieldCounter.get(0).getText())
            .toEqual('Characters remaining '+(255-10)+' of 255');
    };

    private async _addValidEmail(email:string) {
        await input.fillFieldWithValue(alertsElements.manageAlertSubs.subscribeEmailAddressesFiled,
            email);
        await alertsElements.manageAlertSubs.addEmailButton.click();
        await w.waitUntilElementIsDisplayed(alertsElements.manageAlertSubs.emailByName(email))
    };

    public async addValidEmail() {
        await this._addValidEmail(alertsData.subscribeToShade.validEmail);
        await expect(await alertsElements.manageAlertSubs.emailCell.get(0).getText()).toEqual(alertsData.subscribeToShade.validEmail);
        await expect(await alertsElements.manageAlertSubs.emailFieldCounter.get(0).getText())
            .toEqual('Characters remaining '+(255-alertsData.subscribeToShade.validEmail.length-1)+' of 255');
        await expect((await elementAttributes.getElementAttribute(alertsElements.manageAlertSubs.subscribeEmailAddressesFiled,'value')).length)
            .toEqual(0);
    };

    public async addDuplicateEmail() {
        await input.fillFieldWithValue(alertsElements.manageAlertSubs.subscribeEmailAddressesFiled,alertsData.subscribeToShade.validEmail);
        await expect(await alertsElements.manageAlertSubs.warningMessage.get(0).getText()).toEqual('This email address is already in the list!');
    };

    private async _addSeveralEmail(){
        await this._addValidEmail(random.randomNumberGenerator(10)+'@test.te');
        await this._addValidEmail(random.randomNumberGenerator(10)+'@test.te');
        await this._addValidEmail(random.randomNumberGenerator(10)+'@test.te');
    };

    async sortChecking(){
        await this._addSeveralEmail();
        const result:string[] = await alertsElements.manageAlertSubs.emailCell.getText();
        await alertsElements.manageAlertSubs.sortIcon.click();
        await w.waitUntilElementIsClickable(gridElements.newGridOpenSortBoxOptionByName('Sort Ascending'));
        await button.clickOnTheElementAndWait(gridElements.newGridOpenSortBoxOptionByName('Sort Ascending'),
            alertsElements.manageAlertSubs.emailCell.get(0));
        await browser.sleep(1000);
        let value:string[] = await alertsElements.manageAlertSubs.emailCell.getText();
        await expect(stringArray.sortArrayAZ(result).reverse()).toEqual(value);
        await alertsElements.manageAlertSubs.sortIcon.click();
        await w.waitUntilElementIsClickable(gridElements.newGridOpenSortBoxOptionByName('Sort Descending'));
        await button.clickOnTheElementAndWait(gridElements.newGridOpenSortBoxOptionByName('Sort Descending'),
            alertsElements.manageAlertSubs.emailCell.get(0));
        await browser.sleep(1000);
        const value1:string[] = await alertsElements.manageAlertSubs.emailCell.getText();
        await expect(stringArray.sortArrayAZ(result)).toEqual(value1);
    };

    public async removeChecking() {
        await gridElements.shadeCheckboxSelector.get(0).click();
        await button.clickByButtonName(buttonNames.remove);
        await expect( await alertsElements.manageAlertSubs.emailCell.count()).toEqual(0);
    };

    public async saveWithNoEmailChecking() {
        // await checkbox.checkUnCheckCheckboxRange(alertsElements.manageAlertSubs.checkboxLabels, alertsElements.manageAlertSubs.checkboxInputs,
        //     fieldStatuses.fillField, 0,2);
        await modal.openModalWithButtonByName(buttonNames.saveAndClose);
        await expect(await modal.modalTitle.getText()).toEqual('Warning');
        const modalBodyText = 'No email addresses have been entered.' +
            ' As a result, changes to the Alert Type settings will be ' +
            'applied to any email addresses associated with the selected ' +
            'BOMs and folders. Continue?';
        await expect(await modal.modalBody.getText()).toEqual(modalBodyText);
        await modal.closeModalWithXButton();
    };

    async closeModalChecking(buttonName:string = buttonNames.close) {
        await modal.openModalWithButtonByName(buttonName);
        await expect(await modal.modalTitle.getText()).toEqual('Leave this page?');
        const modalText = 'You have made changes but have not saved them yet. Are you sure you would like to exit without saving your changes?';
        await expect(await modal.modalBody.getText()).toEqual(modalText);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonName);
        await modal.closeModalWithButton(buttonNames.doNotExit)
    };


    async saveChecking(){
        await this._addValidEmail(alertsData.subscribeToShade.validEmail);
        await checkbox.checkUnCheckCheckboxes(alertsElements.manageAlertSubs.checkboxLabels, alertsElements.manageAlertSubs.checkboxInputs,
            fieldStatuses.fillField);
        const bomName: string = await alertsElements.manageAlertSubs.selectedFiles.get(0).getText();
        await Shade.closeShadeWithButton(buttonNames.saveAndClose);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await singleBomLogic.openSingleBomByName(bomName);
        await link.clickOnTheLinkByNameAndWaitForElement('Attributes', cplElements.attributes.addedEmail(alertsData.subscribeToShade.validEmail));
        await expect(await cplElements.attributes.addedEmail(alertsData.subscribeToShade.validEmail).isPresent()).toBe(true);
    }

}

export class ManageEmailAddressesLogic {

    public async checkingRightSideTextAndLabels() {
        await expect(await alertsElements.manageEmailAddress.rightSideTitle.getText())
            .toEqual('Replace, Append or Remove Email Addresses');
        const noteText = 'Note: Manage Email Addresses works for complete, individual email' +
            ' addresses only. For example, you cannot overwrite, append or replace "@domain.com" with "@newdomain.com"';
        await expect(await alertsElements.manageEmailAddress.rightSideNoteText.getText()).toEqual(noteText);
    };

    public async checkingManageEmailAddressesFiled() {
        await expect(await elementAttributes.getElementAttribute(alertsElements.manageEmailAddress.emailInput,'placeholder'))
            .toEqual('Enter email address');
        await expect(button.returnButtonByText(buttonNames.add).isDisplayed()).toBeTruthy();
        await expect(alertsElements.manageAlertSubs.clearEmailFieldButton.get(0).isDisplayed()).toBeTruthy();
        await expect(await alertsElements.manageAlertSubs.emailFieldCounter.get(0).getText())
            .toEqual('Characters remaining 255 of 255');
        await input.fillFieldWithValue(alertsElements.manageEmailAddress.emailInput,random.randomTextGenerator(10));
        await alertsElements.manageAlertSubs.clearEmailFieldButton.get(0).click();

        await expect((await elementAttributes.getElementAttribute(alertsElements.manageEmailAddress.emailInput,'value')).length)
           .toEqual(0);
    };

    public async invalidEmailChecking(warningMessage:string) {
        await input.fillFieldWithValue(alertsElements.manageEmailAddress.emailInput,random.randomTextGenerator(10));
        await expect(await alertsElements.manageAlertSubs.warningMessage.get(0).getText()).toEqual(warningMessage);
        await expect(button.returnButtonByText(buttonNames.add).isEnabled()).toBeFalsy();
    };

    public async _addEmail(value: string) {
        await input.fillFieldWithValue(alertsElements.manageEmailAddress.emailInput, value);
        await button.clickByButtonName(buttonNames.add);
        await w.waitUntilElementIsClickable(alertsElements.manageEmailAddress.emailCell.get(0));
    };

    async addValidEmail() {
        await this._addEmail(alertsData.subscribeToShade.validEmail);
        await expect(await alertsElements.manageEmailAddress.emailCellByName(alertsData.subscribeToShade.validEmail).isDisplayed())
            .toBeTruthy();
        await expect(await alertsElements.manageAlertSubs.emailFieldCounter.get(0).getText())
            .toEqual( 'Characters remaining '+(255-alertsData.subscribeToShade.validEmail.length-1)+' of 255');
        await expect((await elementAttributes.getElementAttribute(alertsElements.manageEmailAddress.emailInput,'value')).length)
            .toEqual(0);
    };

    async addDuplicateEmail() {
        await this._addEmail(alertsData.subscribeToShade.validEmail);
        await expect(await alertsElements.manageAlertSubs.warningMessage.get(0).getText()).toEqual('This email address is already in the list!');
    };

    public async addSeveralEmail(){
        await this._addEmail(random.randomTextGenerator(10)+'@test.te');
        await this._addEmail(random.randomTextGenerator(10)+'@test.te');
        await this._addEmail(random.randomTextGenerator(10)+'@test.te');
    };

    public async removeEmails() {
        let result = await alertsElements.manageAlertSubs.clearEmailFieldButton.count();
        for (let i = result - 1; i >= 1; i--) {
            await alertsElements.manageAlertSubs.clearEmailFieldButton.get(i).click();
        }
        await expect(await alertsElements.manageEmailAddress.emailCell.count()).toEqual(0);
    };

    public async closeShadeThroughCloseModal(buttonName:string = buttonNames.close ) {
        await modal.openModalWithButtonByName(buttonName);
        await expect(await modal.modalTitle.getText()).toEqual('Leave this page?');
        await Shade.closeShadeWithButton(buttonNames.exitAndDiscardUnsavedChanges);
    };


    private async _warningShadeChecking(warningShadeText: string,warningShadeEmail:string,warningShadebutton:string){
        await expect(await alertsElements.manageEmailAddress.warningShadeText.getText()).toEqual(warningShadeText);
        await expect(await alertsElements.manageEmailAddress.warningShadeEmail.getText()).toEqual(warningShadeEmail);
        await expect(button.returnButtonByText(warningShadebutton).isEnabled()).toBeTruthy();
    };

    public async saveChanges () {
        await button.clickByButtonName(buttonNames.saveChanges);
        await w.waitUntilElementIsDisplayed(alertsElements.manageEmailAddress.warningShade);
    };


    async replaceAndSaveChecking() {
        await button.clickByButtonName(buttonNames.saveChanges);
        await w.waitUntilElementIsDisplayed(alertsElements.manageEmailAddress.warningShade);
        const replaceText = 'Are you sure that you want to replace ALL email addresses ' +
            'for the selected BOMs and Folders with the new addresses below?';
        await this._warningShadeChecking(replaceText, alertsData.subscribeToShade.validEmail, buttonNames.yesConfirmAndReplaceButton)
    };

    public async removeAndSaveChecking() {
        await button.clickByButtonName(buttonNames.saveChanges);
        await w.waitUntilElementIsDisplayed(alertsElements.manageEmailAddress.warningShade);
        const removeText:string =  'Are you sure that you want to remove these 1 email address(es)?';
        await this._warningShadeChecking(removeText, alertsData.subscribeToShade.validEmail, buttonNames.yesConfirmRemove)
    };

    public async appendAndSaveChecking() {
        await button.clickByButtonName(buttonNames.saveChanges);
        await w.waitUntilElementIsDisplayed(alertsElements.manageEmailAddress.warningShade);
        const appendText:string = 'Are you sure that you want to append these 1 email address(es)?';
        await this._warningShadeChecking(appendText, alertsData.subscribeToShade.validEmail, buttonNames.yesConfirmAppend)
    };

    public async returnToShadeChecking(){
        await button.clickByButtonName(buttonNames.cancel);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.saveChanges));
        await expect((await elementAttributes.getElementAttribute(alertsElements.manageEmailAddress.emailInput,'value')).length)
            .toEqual(0);
        await expect(await alertsElements.manageEmailAddress.emailCell.get(0).getText()).toEqual(alertsData.subscribeToShade.validEmail);
    };

    private async _actionChecking(buttonName:string, successMessage:string, email:string) {
        await button.clickByButtonName(buttonName);
        await w.waitUntilElementIsDisplayed(alertsElements.manageEmailAddress.successShadeText);
        await expect(await alertsElements.manageEmailAddress.successShadeText.getText()).toEqual(successMessage);
        await expect(await alertsElements.manageEmailAddress.statusIcon.count()).toEqual(2);
        await Shade.closeShadeWithButton(buttonNames.OK);
        await w.waitUntilElementNotDisplayed(shadeElements.openedShade);
        await w.waitUntilElementIsClickable(gridElements.grid);
        await expect(await gridElements.rowCellsWithContentNewGrid(8,5).getText()).toEqual(email);
    };

    public async appendChecking() {
        const successMessage:string = 'Append complete!';
        await this._actionChecking(buttonNames.yesConfirmAppend, successMessage, alertsData.subscribeToShade.validEmail)
    };

    public async replaceChecking() {
        const successMessage = 'Replace complete!';
        await this._actionChecking(buttonNames.yesConfirmAndReplaceButton,successMessage,alertsData.subscribeToShade.validEmail)
    };

    public async removeChecking() {
        const successMessage = 'Remove complete!';
        await this._actionChecking(buttonNames.yesConfirmRemove,successMessage,'')
    };
}

export class  FindAndReplaceShadeLogic {

    async checkingRightSideTextAndLabels() {
        await expect(await alertsElements.findAndReplace.findAndReplaceRightColumnTitle.getText()).toEqual('Find and replace email addresses');
        const noteText = 'Note: Find and replace works for complete, individual email addresses only.' +
            ' For example, you cannot search for "@domain.com" and replace it with "@newdomain.com".';
        await expect(await alertsElements.findAndReplace.findAndReplaceRightColumnNote.getText()).toEqual(noteText);
        const fieldLabels = ['Find email to replace:', 'Replace with this email:'];
        await expect(await alertsElements.findAndReplace.findAndReplaceSHadeFieldLabels.getText()).toEqual(fieldLabels);
    };


    async checkingFindAndReplaceEmailAddressesFiled() {
        await expect(await elementAttributes.getElementAttribute(alertsElements.findAndReplace.findAndReplaceShadeFieldInputs.get(0),
            'placeholder')).toEqual('Enter email address');
        await expect(await elementAttributes.getElementAttribute(alertsElements.findAndReplace.findAndReplaceShadeFieldInputs.get(1),
            'placeholder')).toEqual('Enter email address');
        await expect(await alertsElements.manageAlertSubs.emailFieldCounter.get(0).getText())
            .toEqual('Characters remaining 255 of 255');
        await expect(await alertsElements.manageAlertSubs.emailFieldCounter.get(1).getText())
            .toEqual('Characters remaining 255 of 255');

    };


    async invalidEmailChecking(warningMessage:string) {
        await input.fillFieldWithValue(alertsElements.findAndReplace.findAndReplaceShadeFieldInputs,
            random.randomTextGenerator(10));
        await expect(await alertsElements.manageAlertSubs.warningMessage.get(0).getText()).toEqual(warningMessage);
        await expect(await alertsElements.manageAlertSubs.warningMessage.get(1).getText()).toEqual(warningMessage);
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
        await expect( await alertsElements.manageAlertSubs.emailFieldCounter.get(0).getText()).toEqual('Characters remaining '+(255-10)+' of 255');
        await expect(await alertsElements.manageAlertSubs.emailFieldCounter.get(1).getText()).toEqual('Characters remaining '+(255-10)+' of 255');
    };


    async saveChangesButtonChecking() {
        await input.fillFieldWithValue(alertsElements.findAndReplace.findAndReplaceShadeFieldInputs,
            random.randomTextGenerator(10));
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
        await input.fillFieldWithValue(alertsElements.findAndReplace.findAndReplaceShadeFieldInputs.get(0),
            alertsData.subscribeToShade.validEmail);
        await input.fillFieldWithValue(alertsElements.findAndReplace.findAndReplaceShadeFieldInputs.get(1),
            random.randomTextGenerator(10));
        await input.fillFieldWithValue(alertsElements.findAndReplace.findAndReplaceShadeFieldInputs.get(1),
            alertsData.subscribeToShade.validEmail);
        await input.fillFieldWithValue(alertsElements.findAndReplace.findAndReplaceShadeFieldInputs.get(0),
            random.randomTextGenerator(10));
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
        await input.fillFieldWithValue(alertsElements.findAndReplace.findAndReplaceShadeFieldInputs.get(0),
            alertsData.subscribeToShade.validEmail);
        await input.fillFieldWithValue(alertsElements.findAndReplace.findAndReplaceShadeFieldInputs.get(1),
            alertsData.subscribeToShade.validEmail);
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeTruthy();
    };

    async addValidEmails() {
        await input.fillFieldWithValue(alertsElements.findAndReplace.findAndReplaceShadeFieldInputs.get(0),
            alertsData.subscribeToShade.validEmail);
        await input.fillFieldWithValue(alertsElements.findAndReplace.findAndReplaceShadeFieldInputs.get(1),
            alertsData.subscribeToShade.validEmailAppend);
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeTruthy();
    };

    async confirmAfterSaveChangesChecking() {
        await button.clickByButtonName(buttonNames.saveChanges);
        await w.waitUntilElementIsDisplayed(button.returnButtonByText(buttonNames.yesReplaceEmail));
        const warniningMessages:string[] = ['Are you sure that you want to replace this email address?',
            'With this email address?'];
        await expect(await alertsElements.findAndReplace.findAndReplaceWarningMessages.getText()).toEqual(warniningMessages);
        await expect(await alertsElements.findAndReplace.findAndReplaceWarningEmails.getText())
            .toEqual([alertsData.subscribeToShade.validEmail,
            alertsData.subscribeToShade.validEmailAppend]);
        await expect( button.returnButtonByText(buttonNames.yesReplaceEmail).isEnabled()).toBeTruthy();
    };

    async closeConfirmAndReturnToConfirm() {
        await button.clickByButtonName(buttonNames.cancel);
        await expect( button.returnButtonByText(buttonNames.yesReplaceEmail).isPresent()).toBeFalsy();
        await expect(await elementAttributes.getElementAttribute(alertsElements.findAndReplace.findAndReplaceShadeFieldInputs.get(0),
            'value')).toEqual(alertsData.subscribeToShade.validEmail);
        await expect(await elementAttributes.getElementAttribute(alertsElements.findAndReplace.findAndReplaceShadeFieldInputs.get(1),
            'value')).toEqual(alertsData.subscribeToShade.validEmailAppend);
        await button.clickByButtonName(buttonNames.saveChanges);
        await w.waitUntilElementIsDisplayed(button.returnButtonByText(buttonNames.yesReplaceEmail));
    };

    async replaceChecking() {
        await button.clickByButtonName(buttonNames.yesReplaceEmail);
        await w.waitUntilElementIsDisplayed(alertsElements.findAndReplace.successMessage);
        await expect(await alertsElements.findAndReplace.successMessage.getText()).toEqual('Email Replaced');
        await expect(await alertsElements.manageAlertSubs.statusIcon.count()).toEqual(2);
        await Shade.closeShadeWithButton(buttonNames.OK);
        await w.waitUntilElementIsClickable(gridElements.rowCellsWithContentNewGrid(8,5));
        await expect(await gridElements.rowCellsWithContentNewGrid(8,5).getText()).toEqual(alertsData.subscribeToShade.validEmailAppend);
    };

}

export class ManageAlertSubsLogic {

    public async checkPrefAlertTypesWithAlertsSettings() {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[2],
            settings.module);
        const settingsStatus: boolean = await settings.alertSettings.alertTypesCheckboxInputs.get(0).isSelected();
        const settingsStatus1: boolean = await settings.alertSettings.alertTypesCheckboxInputs.get(1).isSelected();
        const settingsStatus2: boolean = await settings.alertSettings.alertTypesCheckboxInputs.get(2).isSelected();
        const settingsStatus3: boolean = await settings.alertSettings.alertTypesCheckboxInputs.get(3).isSelected();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.manageAlertsSubs, gridElements.grid);
        await grid.checkCheckboxRange(1, 2);
        await Shade.openShadeWithButton(buttonNames.subscribeTo);
        await expect(await alertsElements.manageAlertSubs.checkboxInputs.get(0).isSelected()).toEqual(settingsStatus1);
        await expect(await alertsElements.manageAlertSubs.checkboxInputs.get(1).isSelected()).toEqual(settingsStatus3);
        await expect(await alertsElements.manageAlertSubs.checkboxInputs.get(2).isSelected()).toEqual(settingsStatus2);
        await expect(await alertsElements.manageAlertSubs.checkboxInputs.get(3).isSelected()).toEqual(settingsStatus);
    }
}