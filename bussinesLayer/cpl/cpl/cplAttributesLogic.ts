import {buttonNames} from "../../../testData/global";
import {cplElements} from "../../../elements/elements";
import {browser} from "protractor";
import {Button} from "../../../components/simple/button";
import {ElementAttributes} from "../../../utils/elementAttributes";
import {Input} from "../../../components/simple/input";
import {Modal} from "../../../components/modal";
import {Random} from "../../../utils/random";
import {Waiters as w} from "../../../helper/waiters";

const button: Button = new Button();
const elementEttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const modal: Modal = new Modal();
const random: Random = new Random();
const newEmail:string = 'newemailtest' +
    random.randomTextGenerator(3) + (new Date().getTime()).toString(6) + '@test.com';
let result: boolean;

export class CplAttributesLogic {

    private async _editAttributes () {
        await button.clickByButtonName(buttonNames.editAttributes);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.cancel));
    };

    private async _saveAttributes() {
        await button.clickByButtonName(buttonNames.saveChanges);
        await w.waitUntilElementIsDisplayed(button.returnButtonByText(buttonNames.editAttributes));
    };

    private async _cancelAttributes() {
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await modal.closeModalWithButton(buttonNames.OK);
        await w.waitUntilElementIsDisplayed(button.returnButtonByText(buttonNames.editAttributes));
    };

    public async addEmail () {
        await this._editAttributes();
        await input.fillFieldWithValue(cplElements.attributes.emailInput.get(0), newEmail);
        await expect(await cplElements.attributes.emailCounter.getText())
            .toEqual('Characters remaining '+ (255 - newEmail.length)+' of 255');
        await button.clickByButtonName(buttonNames.addEmail);
        await expect(await cplElements.attributes.emailCounter.getText())
            .toEqual('Characters remaining '+ (255 - newEmail.length-1)+' of 255' );
        // await expect( button.returnButtonByText(buttonNames.reprocessCpl).isEnabled()).toBeTruthy();
        await expect( button.returnButtonByText(buttonNames.reprocessCpl).isEnabled()).toBeFalsy();
        await this._saveAttributes();
        await expect(cplElements.attributes.addedEmail(newEmail).isPresent()).toBeTruthy();
    };


    public async deleteEmail(){
        await this._editAttributes();
        await browser.executeScript("document.querySelectorAll('span.input-field-svg')[0].click()");
        await expect( button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeTruthy();
        // await expect( button.returnButtonByText(buttonNames.reprocessCpl).isEnabled()).toBeTruthy();
        await expect( button.returnButtonByText(buttonNames.reprocessCpl).isEnabled()).toBeFalsy();
        await this._saveAttributes();
        await expect( cplElements.attributes.addedEmail(newEmail).isPresent()).toBeFalsy();
    };

    public async emailValidationChecking(){
        await this._editAttributes();
        await input.fillFieldWithValue(cplElements.attributes.emailInput.get(0), "test@@Test.test");
        await expect( button.returnButtonByText(buttonNames.addEmail).isEnabled()).toBeFalsy();
        await input.fillFieldWithValue(cplElements.attributes.emailInput.get(0), random.randomTextGenerator(255));
        await expect( button.returnButtonByText(buttonNames.addEmail).isEnabled()).toBeFalsy();
        await button.clickByButtonName(buttonNames.cancel);
        await this._editAttributes();
        await expect(await elementEttributes.getElementAttribute(cplElements.attributes.emailInput.get(0),
            'value')).toEqual('');
        await button.clickByButtonName(buttonNames.cancel);
    };

    public async matchingOptionActiveReset (matchOptRowNumber) {
        await this._editAttributes();
        result = await cplElements.attributes.alertTypeInputs.get(matchOptRowNumber).isSelected();
        await cplElements.attributes.cplAlertOptionsLabelValues.get(matchOptRowNumber).click();
        await expect( button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeTruthy();
        await expect( button.returnButtonByText(buttonNames.reset).isEnabled()).toBeTruthy();
        // await expect( button.returnButtonByText(buttonNames.reprocessCpl).isEnabled()).toBeTruthy();
        await expect( button.returnButtonByText(buttonNames.reprocessCpl).isEnabled()).toBeFalsy();
    };

    public async checkingCancelModal(){
        await expect(await modal.modalTitle.getText()).toEqual('Discard Changes?');
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await modal.closeModalWithButton(buttonNames.cancel)
    };

    public async resetChecking(matchOptRowNumber){
         await button.clickByButtonName(buttonNames.reset);
         await expect(await cplElements.attributes.alertTypeInputs.get(matchOptRowNumber).isSelected()).toEqual(result);
        await button.clickByButtonName(buttonNames.cancel);
    };

    public async cancelEmailChecking() {
        await this._editAttributes();
        await input.fillFieldWithValue(cplElements.attributes.emailInput.get(0), newEmail);
        await button.clickByButtonName(buttonNames.addEmail);
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await this.checkingCancelModal();
        await browser.sleep(1000);
        await this._cancelAttributes();
        await this._editAttributes();
        await expect(await elementEttributes.getElementAttribute(cplElements.attributes.emailInput.get(0),
            'value')).toEqual('');
        await button.clickByButtonName(buttonNames.cancel);
    };

    public async cancelAlertTypeChecking() {
        await this._editAttributes();
        let result = await cplElements.attributes.alertTypeInputs.get(1).getAttribute('checked');
        await cplElements.attributes.cplAlertOptionsLabelValues.get(1).click();
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await this.checkingCancelModal();
        await this._cancelAttributes();
        await this._editAttributes();
        await expect(await elementEttributes.getElementAttribute(cplElements.attributes.alertTypeInputs.get(1),
            'checked')).toEqual(result);
        await button.clickByButtonName(buttonNames.cancel);
    };

    public async cplImportOptionChecking() {
        await this._editAttributes();
        let result =await elementEttributes.getElementAttribute(cplElements.attributes.autoPartMatchInput,
            'class');
        if(result!='ng-not-empty'){
            await cplElements.attributes.cplImportOptionsLabelValue.click();
            await expect(await cplElements.attributes.cplImportOptionAddText.isDisplayed()).toBeTruthy();
            await expect(await cplElements.attributes.cplImportOptionAddText.getText()).toEqual('Changing to Auto Part Match requires the CPL to be reprocessed.' +
                ' Click on the Reprocess CPL button in the toolbar above.' );
            await expect(button.returnButtonByText(buttonNames.reprocessCpl).isEnabled()).toBeTruthy();

        }
    };

    public async reprocessModalChecking() {
        await modal.openModalWithButtonByName(buttonNames.reprocessCpl);
        await expect(await modal.modalTitle.getText()).toEqual('Reprocess CPL?');
        const reprocessText = ['Are you sure that you want to reprocess the CPL?', 'If you select Yes, your CPL will' +
        ' be queued for processing to identify updates in Part and/or Manufacturer data. If you select No, you will ' +
        'be returned to the CPL Attributes and the CPL will not be reprocessed.'];
        await expect(await modal.modalBodyParag.getText()).toEqual(reprocessText);
        await expect(button.returnButtonByText(buttonNames.yesReprocessCpl).isDisplayed()).toBeTruthy();
        await modal.closeModalWithXButton();
    };

    async resetCheckingCplImportOption(){
        const result: boolean = await cplElements.attributes.autoPartMatchInput.isSelected();
        await button.clickByButtonName(buttonNames.reset);
        await expect(await cplElements.attributes.autoPartMatchInput.isSelected())
            .not.toEqual(result);
        await button.clickByButtonName(buttonNames.cancel);
    };

    async cancelCplImportOptionChecking() {
        await this._editAttributes();
        const result: boolean = await cplElements.attributes.autoPartMatchInput.isSelected();
        await cplElements.attributes.cplImportOptionsLabelValue.click();
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await this.checkingCancelModal();
        await this._cancelAttributes();
        await this._editAttributes();
        await expect(await cplElements.attributes.autoPartMatchInput.isSelected())
            .toEqual(result);
        await button.clickByButtonName(buttonNames.cancel);
    };
}