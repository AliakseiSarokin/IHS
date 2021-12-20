import {administrationElements} from "../../elements/elements";
import {buttonNames, fieldStatuses} from "../../testData/global";
import {Button} from "../../components/simple/button";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Input} from "../../components/simple/input";
import {Modal} from "../../components/modal";
import {Waiters as w} from "../../helper/waiters";
import {browser} from "protractor";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const modal: Modal = new Modal();
const statusBool: any = {
    'ng-empty': false,
    'ng-not-empty': true
};
export class CustomAttributesLogic {

    async cancelChangesChecking(inputField){
        await expect(administrationElements.customAttributes.simpleCheckbox.get(0).isSelected()).toBeTruthy();
        await administrationElements.customAttributes.simpleCheckbox.get(0).click();
        await expect(administrationElements.customAttributes.simpleCheckbox.get(0).isSelected()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.cancelChanges).isEnabled()).toBeTruthy();
        await button.clickByButtonName(buttonNames.cancelChanges);
        await expect(administrationElements.customAttributes.simpleCheckbox.get(0).isSelected()).toBeTruthy();
        let resultInput = await inputField.getAttribute('value');
        await input.fillFieldWithValue(inputField, 'test');
        await expect(await button.returnButtonByText(buttonNames.cancelChanges).isEnabled()).toBeTruthy();
        await button.clickByButtonName(buttonNames.cancelChanges);
        let value = await inputField.getAttribute('value');
        await expect(resultInput).toEqual(value);
    };

    async saveChangesButtonChecking (status:boolean = false) {
        await expect(await button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
        await administrationElements.customAttributes.simpleCheckbox.get(0).click();
        await expect(await button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeTruthy();
        await administrationElements.customAttributes.simpleCheckbox.get(0).click();
        await expect(await button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toEqual(status);
    };

    async checkingRowCustomAttrib(rowNumber:number, rowName:string, rowLength:string, advReportsCheckbox:string) {
        await expect(await administrationElements.customAttributes.rowName(rowNumber).getText()).toEqual(rowName);
        await expect(await administrationElements.customAttributes.rowMaxLength(rowNumber).getText()).toEqual(rowLength);
        await expect((await elementAttributes.getElementAttribute(administrationElements.customAttributes.displayLabel(rowNumber),
            'value')).toString().length).toBeGreaterThan(0);
        await expect(await elementAttributes.getElementAttribute(administrationElements.customAttributes.advancedReports(rowNumber),
            'type')).toContain('checkbox');
        if (advReportsCheckbox == fieldStatuses.fillField) {
            await expect(await administrationElements.customAttributes.advancedReports(rowNumber).isSelected()).toBeTruthy();
        }   else if (advReportsCheckbox == fieldStatuses.emptyField.toString()) {
            await expect( await administrationElements.customAttributes.advancedReports(rowNumber).isSelected()).toBeFalsy();
        }
        await expect(await elementAttributes.getElementAttribute(administrationElements.customAttributes.emailAlerts(rowNumber),
            'type')).toContain('checkbox');
        await expect(await elementAttributes.getElementAttribute(administrationElements.customAttributes.emailAlerts(rowNumber),
            'disabled')).toContain('true');
        await expect(await elementAttributes.getElementAttribute(administrationElements.customAttributes.import(rowNumber),
            'type')).toContain('checkbox');
        await expect(await elementAttributes.getElementAttribute(administrationElements.customAttributes.bomDetails(rowNumber),
            'type')).toContain('checkbox');
    };

    public async saveChanges() {
        if(await button.returnButtonByText(buttonNames.saveChanges).isEnabled()) {
            await modal.openModalWithButtonByName(buttonNames.saveChanges);
            await modal.closeModalWithXButton();
            await browser.sleep(2000)
        }
    }

    public async checkUncheckBomDetailCheckoxes(status:boolean) {
        await w.waitUntilElementIsClickable(administrationElements.customAttributes.bomDetailCheckboxInput.get(3));
        const amount: number = await administrationElements.customAttributes.bomDetailCheckboxInput.count();
        for (let i: number = 0; i < amount; i++) {
            let attributes: boolean = await administrationElements.customAttributes.bomDetailCheckboxInput.get(i).isSelected();
            if(attributes !== status) {
                await browser.executeScript("document.querySelectorAll('[name=\"bomDetails\"]')["+i+"].click()")
            }
        }
    };

    public async checkUncheckBomDetailCheckoxesRange(status:string, startValue: number, endValue:number) {
        await w.waitUntilElementIsClickable(administrationElements.customAttributes.bomDetailCheckboxInput.get(3));
        const amount: number = await administrationElements.customAttributes.bomDetailCheckboxInput.count();
        for (let i: number = startValue; i < endValue; i++) {
            let attributes: boolean = await administrationElements.customAttributes.bomDetailCheckboxInput.get(i).isSelected();
            if(attributes !== statusBool[status]) {
                await browser.executeScript("document.querySelectorAll('[name=\"bomDetails\"]')["+i+"].click()")
            }
        }
    }


}