import {bomElements, commonElements, gridElements} from "../elements/elements";
import {buttonNames} from "../testData/global";
import {Button} from "./simple/button";
import {Modal} from "./modal";
import {RadioButton} from "./simple/radioButton";
import {Toolbar} from "./toolbar";
import {Waiters as w} from "../helper/waiters";
import {browser} from "protractor";

const button: Button = new Button();
const modal: Modal = new Modal();
const radioButton: RadioButton = new RadioButton();
const toolbar: Toolbar = new Toolbar();

export class RadioButtonDropdown {

    public async openSetAlertStatusDropDown() {
        await w.waitUntilElementIsClickable(toolbar.returnToolbarButton(buttonNames.setAlertStatus));
        await button.clickOnTheElement(toolbar.returnToolbarButton(buttonNames.setAlertStatus));
        await w.waitUntilElementIsClickable(bomElements.partAlerts.setAlertStatusDropdown);
    };

    public async closeSetAlertStatusDropDown() {
        await button.clickOnTheElement(toolbar.returnToolbarButton(buttonNames.setAlertStatus));
        await w.waitUntilElementNotDisplayed(bomElements.partAlerts.setAlertStatusDropdown);
    }

    public async applyButtonChecking() {
        await expect(button.returnButtonByText(buttonNames.applyAlertStatus).isEnabled()).toBeFalsy();
        let radioButtons: number = await commonElements.radioButtonLabel.count();
        for(let i: number = 0; i < radioButtons; i++) {
            await radioButton.checkRadioButton(commonElements.radioButtonLabel.get(i), commonElements.radioButtonInput.get(i));
            await expect(button.returnButtonByText(buttonNames.applyAlertStatus).isEnabled()).toBeTruthy();
        }
    };

    public async setStatus(option: string, cell: any) {
        await radioButton.checkRadioButtonByLabelName(option);
        await modal.openModalWithButtonByName(buttonNames.applyAlertStatus);
        await modal.closeModalWithButton(buttonNames.OK);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await browser.sleep(2000);
        await w.waitUntilElementIsClickable(cell);
        await expect(await cell.getText()).toEqual(option);
    }
}