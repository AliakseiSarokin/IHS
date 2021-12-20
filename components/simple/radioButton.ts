import {allureStep} from "../../helper/allure/allureSteps";
import {ElementAttributes} from "../../utils/elementAttributes";
import {fieldStatuses} from "../../testData/global";
import {commonElements} from "../../elements/elements";

const elementAttributes: ElementAttributes = new ElementAttributes();

export class RadioButton {

    public async checkRadioButton(radioButtonLabel: any, radioButtonInput: any) {
        await allureStep('Check ' + await radioButtonLabel.getText() + ' radio button', async () => {
            await radioButtonLabel.click();
            await expect(radioButtonInput.isSelected()).toBeTruthy();
        });
    };

    public async uncheckRadioButton(radioButtonLabel: any, radioButtonInput: any) {
        await allureStep('Check ' + await radioButtonLabel.getText() + ' radio button', async () => {
            if (!((await elementAttributes.getElementAttribute(radioButtonInput, 'class')).includes(fieldStatuses.emptyField))) {
                await radioButtonLabel.click();
                await expect(await radioButtonInput.isSelected())
                    .toEqual(fieldStatuses.statusBool[fieldStatuses.emptyField]);
            }
        });
    };

    public async checkRadioButtonByLabelName(labelName: string) {
        await allureStep('Check ' + labelName + ' radio button', async () => {
            const labelNames: any = await commonElements.radioButtonLabel.getText();
            for (let i: number = 0; i < labelNames.length; i++) {
                if (labelNames[i] === labelName) {
                    await commonElements.radioButtonLabel.get(i).click();
                }
            }
        });
    };
}