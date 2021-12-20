import {administrationElements} from "../../elements/elements";
import {buttonNames} from "../../testData/global";
import {Button} from "../../components/simple/button";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Input} from "../../components/simple/input";
import {Modal} from "../../components/modal";
import {Random} from "../../utils/random";
import {Shade} from "../../components/shade";
import {TypeAhead} from "../../components/typeAhead";
import {browser} from "protractor";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const modal: Modal = new Modal();
const random: Random = new Random();
const typeAhead: TypeAhead = new TypeAhead();

export class ViewUsersLogic {

    async subjectFieldChecking(){
        await expect(await elementAttributes.getElementAttribute(administrationElements.viewUsers.contactShade.subjectField,
            'placeholder' )).toEqual('Enter message subject...');
        await input.fillFieldWithValue(administrationElements.viewUsers.contactShade.subjectField,
            random.randomTextGenerator(100));
        await expect(await administrationElements.viewUsers.contactShade.counter.get(0).getText()).toEqual('Characters remaining 0 of 100')
    };

    async messageFieldChecking(){
        await expect(await elementAttributes.getElementAttribute(administrationElements.viewUsers.contactShade.messageField,
            'placeholder' )).toEqual('Enter message details...');
        await input.fillFieldWithValue(administrationElements.viewUsers.contactShade.messageField,
            random.randomTextGenerator(100));
        await expect(await administrationElements.viewUsers.contactShade.counter.get(1).getText())
            .toEqual('Characters remaining '+ (1000-100)+' of 1000')
    };

    async resetButtonChecking(){
        await modal.openModalWithElement(button.returnElementByButtonTextAndIndex(buttonNames.reset,1));
        await expect(await modal.modalTitle.getText()).toEqual('Reset form?');
        await expect(await modal.modalBody.getText()).toEqual('Are you sure you want to reset the form?');
        await modal.closeModalWithXButton();
        await modal.openModalWithElement(button.returnElementByButtonTextAndIndex(buttonNames.reset,1));
        await modal.closeModalWithButton(buttonNames.no);
        await modal.openModalWithElement(button.returnElementByButtonTextAndIndex(buttonNames.reset,1));
        await modal.closeModalWithButton(buttonNames.yesReset);
        await expect(await elementAttributes.getElementAttribute(administrationElements.viewUsers.contactShade.subjectField,
            'placeholder' )).toEqual('Enter message subject...');
        await expect(await elementAttributes.getElementAttribute(administrationElements.viewUsers.contactShade.messageField,
            'placeholder' )).toEqual('Enter message details...');
    };


    async emailTypeAheadChecking(){
        await administrationElements.viewUsers.contactShade.emailField.click();
        await typeAhead.typeAheadChecking(administrationElements.viewUsers.contactShade.emailField, 'b4');
        const selectedEmail: string = await elementAttributes.getElementAttribute(administrationElements.viewUsers.contactShade.emailField,
            'value');
        await button.clickByButtonName(buttonNames.plus);
        await expect(await administrationElements.viewUsers.contactShade.emailByName(selectedEmail).isPresent()).toBeTruthy()
    };

    async sendButtonChecking(){
        await browser.waitForAngularEnabled(false)
        await this.subjectFieldChecking();
        await this.messageFieldChecking();
        await modal.openModalWithButtonByName(buttonNames.sendMessage);
        await expect(await modal.modalBody.getText()).toEqual('Your email message was sent to the selected users.');
        await expect(await modal.modalTitle.getText()).toEqual('Message(s) Sent');
        await Shade.closeShadeWithButton(buttonNames.OK)
    };

}