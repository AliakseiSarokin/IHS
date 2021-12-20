import {allureStep} from "../helper/allure/allureSteps";
import {Button} from "../components/simple/button";
import {Shade} from "../components/shade";
import {Waiters as w} from "../helper/waiters";
import {buttonNames} from "../testData/global";
import {gridElements, shadeElements} from "../elements/elements";

const button: Button = new Button();


export class SpecificToolbarButtons {

    public static async checkMfrSuggestedAlternatesButton(enabled: boolean) {
        await allureStep('Check if "Mfr Suggested Alternates" button is enabled', async () => {
            await w.waitUntilElementIsDisplayed(button.returnButtonByText(buttonNames.mfrSuggestedReplacements));
            if (enabled) {
                await button.returnButtonByText(buttonNames.mfrSuggestedReplacements).click();
                await w.waitUntilElementIsDisplayed(shadeElements.openedShade);
                await Shade.closeShadeWithButton(buttonNames.close, gridElements.grid);
            } else {
                await expect((await button.returnButtonByText(buttonNames.mfrSuggestedReplacements)).isEnabled()).toBeFalsy();
            }
        });
    };

    public static async openMfrSuggestedAlternates() {
        await allureStep('open Mfr Suggested Alternates shade', async () => {
            await w.waitUntilElementIsDisplayed(button.returnButtonByText(buttonNames.mfrSuggestedReplacements));
            await button.returnButtonByText(buttonNames.mfrSuggestedReplacements).click();
            await w.waitUntilElementIsDisplayed(shadeElements.openedShade);
            await w.waitUntilElementIsDisplayed(shadeElements.columnHeader.get(0));
        });
    };
}

