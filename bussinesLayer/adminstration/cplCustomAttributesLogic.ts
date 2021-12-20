import {administrationElements} from "../../elements/elements";
import {buttonNames} from "../../testData/global";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Input} from "../../components/simple/input";
import {Modal} from "../../components/modal";
import {allureStep} from "../../helper/allure/allureSteps";

const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const modal: Modal = new Modal();

export class CplCustomAttributesLogic {

    async cplCheckingRowCustomAttrib(rowNumber:number, rowName:string, rowLength:string) {
        await expect(await administrationElements.cplCustomAttributes.rowName(rowNumber).getText()).toEqual(rowName);
        await expect(await administrationElements.cplCustomAttributes.rowMaxLength(rowNumber).getText()).toEqual(rowLength);
        const inputFieldValue = await administrationElements.cplCustomAttributes.displayLabel(rowNumber).getAttribute('value');
        await expect(inputFieldValue.length).toBeGreaterThan(0);
        await expect(await elementAttributes.getElementAttribute(administrationElements.cplCustomAttributes.bomDetails(rowNumber),
            'type')).toContain('checkbox');
    };

    async cplCheckingRowInRenameCustomAttrib(rowNumber:number, rowName:string, rowLength:string) {
        await allureStep('CPL checking row in rename Custom Attributes', async () => {
            await expect(await administrationElements.cplCustomAttributes.rowName(rowNumber).getText()).toEqual(rowName);
            await expect(await administrationElements.cplCustomAttributes.rowMaxLength(rowNumber).getText()).toEqual(rowLength);
            const inputFieldValue = await administrationElements.cplCustomAttributes.displayLabel(rowNumber).getAttribute('value');
            await expect(inputFieldValue.length).toBeGreaterThan(0);
        });
    };

    public async leaveModalChecking() {
        await input.fillFieldWithValue(administrationElements.cplCustomAttributes.displayLabel(0), 'test');
        await modal.openModalWithLinkName('HOME');
        await expect(await modal.modalTitle.getText()).toEqual('Leave this page?');
        await expect(await modal.modalBody.getText()).toEqual('You have made changes but have not saved them yet. Are you sure you want to leave without saving your changes?');
        await modal.closeModalWithButton(buttonNames.closeWithoutSaving);
        await expect(await administrationElements.customAttributes.attributesBody.isPresent()).toBeFalsy();
    }

}