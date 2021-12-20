import {browser} from "protractor";
import {buttonNames, modalTitles} from "../../testData/global";
import {bomVaultData} from "../../testData/bomVault";
import {bomElements, pageTitles, cplElements, commonElements} from "../../elements/elements";
import {Button} from "../../components/simple/button";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Input} from "../../components/simple/input";
import {Modal} from "../../components/modal";
import {Random} from "../../utils/random";
import {Waiters as w} from "../../helper/waiters";
import {JsScripts} from "../../utils/jsScripts";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const modal: Modal = new Modal();
const random: Random = new Random();

export class AttributesLogic {

    bomName: string;
    description: string;

    constructor() {
        this.bomName;
        this.description;
    };

    public async rememberInitialValues() {
        this.bomName = await commonElements.activeSubMenuInLeftNav.getText();
    };

    private async _editAttributes() {
        await button.clickByButtonName(buttonNames.editAttributes);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.cancel));
    };

    private async _saveAttributes() {
        await button.clickByButtonName(buttonNames.saveChanges);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(button.returnButtonByText(buttonNames.editAttributes));
    };

    private async _cancelAttributes() {
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await modal.closeModalWithElement(commonElements.okButton);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(button.returnButtonByText(buttonNames.editAttributes));
    };

    public async vaultNameChecking() {
        await this._editAttributes();
        await input.fillFieldWithValue(bomElements.attributes.bomNameField, 'VAuLt');
        await modal.openModalWithButtonByName(buttonNames.saveChanges);
        await expect(await modal.modalBody.getText())
            .toEqual('The BOM name cannot be blank or "Vault". Please enter a valid name for this BOM.');
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.invalidBomName);
        await modal.closeModalWithElement(commonElements.okButton);
        await this._cancelAttributes();
    };

    public async bomImportConfigurationFlagOptionCheckingByText(itemValue: string, expectedStatus: boolean) {
        if (expectedStatus == true) {
            await expect(await bomElements.attributes.flagOptionByName(itemValue).isPresent()).toBeTruthy();
        }
        else {
            await expect(await bomElements.attributes.flagOptionByName(itemValue).isPresent()).toBeFalsy();
        }
    };

    public async activeSaveResetButtonsWhenEditFieldAndReset(field: any) {
        await this._editAttributes();
        const currentValue: string = await  elementAttributes.getElementAttribute(field, 'value');
        await input.fillFieldWithValue(field, '123');
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.reset).isEnabled()).toBeTruthy();
        await button.clickByButtonName(buttonNames.reset);
        await expect(await elementAttributes.getElementAttribute(field, 'value')).toEqual(currentValue);
        await button.clickByButtonName(buttonNames.cancel);
        await w.waitUntilElementIsDisplayed(button.returnButtonByText(buttonNames.editAttributes));
    };

    public async editBomName() {
        await this._editAttributes();
        await input.fillFieldWithValue(bomElements.attributes.bomNameField, bomVaultData.attributes.newBomName);
        await this._saveAttributes();
        await expect(await pageTitles.pageTitleShim.getText()).toEqual('View Single BOM: ' + bomVaultData.attributes.newBomName);
        await expect(await bomElements.activeBomInLeftNav.getText()).toEqual(bomVaultData.attributes.newBomName);
    };

    public async editDescription() {
        await this._editAttributes();
        await input.fillFieldWithValue(bomElements.attributes.descField, bomVaultData.attributes.newDesc);
        await this._saveAttributes();
        await expect(await bomElements.attributes.desc.getText()).toEqual(bomVaultData.attributes.newDesc);
    };

    public async addEmail() {
        await this._editAttributes();
        await input.fillFieldWithValue(bomElements.attributes.emailInput.last(), bomVaultData.attributes.newEmail);
        await button.clickByButtonName(buttonNames.addEmail);
        await this._saveAttributes();
        await expect(await cplElements.attributes.addedEmail(bomVaultData.attributes.newEmail).isPresent()).toBe(true)
    };

    public async deleteEmail() {
        await this._editAttributes();
        let result = await bomElements.attributes.xInput.count();
        for (let i: number = result - 1; i > 0; i = i - 1) {
            await browser.executeScript("document.querySelectorAll('span.input-field-svg')[" + i + "].click()");
        }
        await browser.executeScript("document.querySelectorAll('span.input-field-svg')[0].click()");
        await this._saveAttributes();
        await expect(await cplElements.attributes.addedEmail(bomVaultData.attributes.newEmail).isPresent()).toBe(false)
    };

    async addEmailOrContact(field: any, rowNumber: number, counter: number) {
        await this._editAttributes();
        await input.fillFieldWithValue(field, random.randomNumberGenerator(counter));
        let currentValue: string = await  elementAttributes.getElementAttribute(field, 'value');
        await expect(await bomElements.attributes.counter.get(rowNumber).getText()).toEqual('Characters remaining ' + 0 + ' of ' + counter.toString());
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.reset).isEnabled()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.reprocessBom).isEnabled()).toBeFalsy();
        await this._saveAttributes();
        await browser.executeScript("document.querySelectorAll('.flex-1')[11].scrollIntoView()");
        await expect(await bomElements.attributes.sentValue(currentValue).isPresent()).toBe(true)
    };

    public async deleteEmailOrContact(field: any, option: number) {
        await this._editAttributes();
        await w.waitUntilElementIsDisplayed(field);
        let currentValue: string = await  elementAttributes.getElementAttribute(field, 'value');
        await JsScripts.scrollToElement(bomElements.attributes.xButton.get(option));
        await bomElements.attributes.xButton.get(option).click();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.reset).isEnabled()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.reprocessBom).isEnabled()).toBeFalsy();
        await this._saveAttributes();
        await browser.executeScript("document.querySelectorAll('.flex-1')[11].scrollIntoView()");
        await expect(await bomElements.attributes.sentValue(currentValue).isPresent()).toBe(false)
    };

    public async returnToOldAttributes() {
        await this._editAttributes();
        await input.fillFieldWithValue(bomElements.attributes.bomNameField, this.bomName);
        await this._saveAttributes();
    };

    public async emailAlertTypeActiveReset(emailAlertRowNumber: number) {
        await this._editAttributes();
        await bomElements.attributes.emailAlertTypeCheckboxes(emailAlertRowNumber).click();
        await expect(await button.returnButtonByText(buttonNames.reset).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeTruthy();
    };

    public async indicatorEmailAlertType(emailAlertRowNumber: number) {
        await expect(await bomElements.attributes.indicator(4).isPresent()).toBeTruthy();
        await button.clickByButtonName(buttonNames.editAttributes);
        await w.waitUntilWorkingModalNotDisplayed();
        await bomElements.attributes.emailAlertTypeCheckboxes(emailAlertRowNumber).click();
        await button.clickByButtonName(buttonNames.saveChanges);
        await expect(await bomElements.attributes.indicator(4).isPresent()).toBeFalsy();
    };

    public async matchingOptionActiveReset(matchOptRowNumber: number, saveChangesStatus: boolean) {
        await this._editAttributes();
        await browser.executeScript("document.querySelectorAll('.flex-row.flex-center>div')[9].scrollIntoView()");
        await bomElements.attributes.matchingOptionCheckboxes(matchOptRowNumber).click();
        await browser.sleep(10000)
        await expect(await button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toEqual(saveChangesStatus);
        await expect(await button.returnButtonByText(buttonNames.reset).isEnabled()).toBeTruthy();
    };

    public async checkingSaveChangesButton(checkOption: number, saveChanges: boolean = true || false) {
        (checkOption > 0 && saveChanges == true) ? await this.matchingOptionActiveReset(checkOption, saveChanges = true)
            : await this.matchingOptionActiveReset(checkOption, saveChanges = false)
    };

    public async reprocessChecking() {
        await modal.openModalWithButtonByName(buttonNames.reprocessBom);
        await expect(await modal.modalTitle.getText()).toEqual('Reprocess BOM');
        await expect(await modal.modalBodyParag.getText()).toEqual(['Are you sure that you want to reprocess this BOM?',
            'If you select Yes, your BOM will be queued for processing to identify updates in Part and/or Manufacturer data.' +
            ' If you select No, you will be returned to BOM Details and the BOM will not be reprocessed.']);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.reprocessBom);
        await modal.closeModalWithButton(buttonNames.noDoNotReporcess);
        await this._cancelAttributes();
    };

    async uncheckAllCplOptionChecking() {
        await this._editAttributes();
        await browser.executeScript("document.querySelectorAll('.flex-row.flex-center>div')[12].scrollIntoView()");
        let result = await bomElements.attributes.cplMatchingOptionCheckboxInput.count();
        for (let i = 0; i < result; i += 1) {
            let value = await elementAttributes.getElementAttribute(bomElements.attributes.cplMatchingOptionCheckboxInput.get(i),
                'checked');
            if (value) {
                await bomElements.attributes.cplMatchingOptionCheckboxLabel.get(i).click();
            }
        }
        await expect(button.returnButtonByText(buttonNames.reprocessBom).isEnabled()).toBeTruthy();
        await modal.openModalWithButtonByName(buttonNames.saveChanges);
        await expect(await modal.modalTitle.getText()).toEqual('Notification');
        await expect(await modal.modalBody.getText()).toEqual('At least one selection is required for CPL Matching Options.');
        await modal.closeModalWithButton(buttonNames.okayThanks);
        await this._cancelAttributes();

    };


}