import {bomElements, cplElements, importElements, settings} from "../../../elements/elements";
import {buttonNames, fieldStatuses} from "../../../testData/global";
import {Button} from "../../../components/simple/button";
import {CheckBox} from "../../../components/simple/checkBox";
import {ElementAttributes} from "../../../utils/elementAttributes";
import {Waiters as w} from "../../../helper/waiters";
import {browser} from "protractor";

const button: Button = new Button();
const checkbox: CheckBox = new CheckBox();
const elementAttributes: ElementAttributes = new ElementAttributes();
export class SetCplMatchingOptionsLogic {

    async uncheckAllMAtching(){
        await browser.sleep(2000)
        await checkbox.checkUnCheckCheckboxesWithJs('tr td:nth-child(odd) input',
            cplElements.cplMatchingOptionModal.matchingOptionsInputs, fieldStatuses.emptyField);
        await await expect(await cplElements.cplMatchingOptionModal.alertText.getText())
            .toEqual('At least one selection is required for CPL Match Options');
        await await expect(await cplElements.cplMatchingOptionModal.defaultOptionsInputs.count()).toEqual(0);
        await await expect(button.returnButtonByText(buttonNames.save).isEnabled()).toBeFalsy();
    };

    async checkAllMatching(){
        await checkbox.checkUnCheckCheckboxesWithJs('tr td:nth-child(odd) input',
            cplElements.cplMatchingOptionModal.matchingOptionsInputs, fieldStatuses.fillField);
        await w.waitUntilElementIsDisplayed(cplElements.cplMatchingOptionModal.alertText);
        await await expect(cplElements.cplMatchingOptionModal.alertText.isDisplayed()).toBeTruthy();
        await await expect(await cplElements.cplMatchingOptionModal.defaultOptionsInputs.count()).toEqual(4);
        await await expect(button.returnButtonByText(buttonNames.save).isEnabled()).toBeFalsy();
    };

    public async defaultOptionChecking(){
        await checkbox.checkUnCheckCheckboxRange(cplElements.cplMatchingOptionModal.defaultOptionsInputs,
            cplElements.cplMatchingOptionModal.defaultOptionsInputs, fieldStatuses.fillField, 3,4);
        let result = await cplElements.cplMatchingOptionModal.defaultOptionsInputs.count();
        for(let i=0; i<result-1; i++){
            await expect(await elementAttributes.getElementAttribute(cplElements.cplMatchingOptionModal.defaultOptionsInputs.get(i),
                'disabled')).toEqual('true' )
        }
        await checkbox.checkUnCheckCheckboxRange(cplElements.cplMatchingOptionModal.defaultOptionsInputs,
            cplElements.cplMatchingOptionModal.defaultOptionsInputs, fieldStatuses.emptyField, 3,4);
        await checkbox.checkUnCheckCheckboxRange(cplElements.cplMatchingOptionModal.defaultOptionsInputs,
            cplElements.cplMatchingOptionModal.defaultOptionsInputs, fieldStatuses.fillField, 0,3);
        await expect(await elementAttributes.getElementAttribute(cplElements.cplMatchingOptionModal.defaultOptionsInputs.get(3),
            'disabled')).toEqual('true' )
    };

    public async saveOptionsToCheck(){
        await browser.sleep(1000);
        for(let i=0; i<3; i++){
            await expect(await cplElements.cplMatchingOptionModal.defaultOptionsInputs.get(i).isSelected()).toBeTruthy();
        }
    };

    async checkingOptionsInSettings() {
        await expect(await settings.bomImportSettings.cplCheckboxInputs.count()).toEqual(4);
    };

    async checkingOptionsInBomAttributes(){
        await button.clickByButtonName(buttonNames.editAttributes);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.cancel));
        await expect(await bomElements.attributes.cplMatchingOptionCheckboxInput.count()).toEqual(4);
    };

    async checkingOptionsInImport() {
        await expect(await importElements.importOptions.cplCheckboxInputs.count()).toEqual(4);
    };

}