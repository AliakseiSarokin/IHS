import {allureStep} from "../helper/allure/allureSteps";
import {Waiters as w} from "../helper/waiters";
import {helpPanelElements} from "../elements/elements";

export class Help {

    public async openHelpPanel() {
        await allureStep('Open Help panel', async () => {
            await helpPanelElements.rightSideBigHelpButton.click();
            await w.waitUntilElementIsDisplayed(helpPanelElements.helpPanel);
            await w.waitUntilElementIsClickable(helpPanelElements.helpPanel);

        })
    };

    public async closeHelpPanel() {
        await allureStep('Close Help panel', async () => {
            await helpPanelElements.rightSideBigHelpButton.click();
            await w.waitUntilElementNotDisplayed(helpPanelElements.helpPanel)
        })
    };
}







