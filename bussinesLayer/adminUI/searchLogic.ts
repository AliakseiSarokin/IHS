import {adminHomePage, adminUsersElements} from "../../elements/elements";
import {allureStep} from "../../helper/allure/allureSteps";
import {Input} from "../../components/simple/input";
import {Waiters as w} from "../../helper/waiters";
import {Button} from "../../components/simple/button";
import {ElementAttributes} from "../../utils/elementAttributes";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();

export class AdminSearchLogic {

    async performAdminSearch(value: string) {
        await allureStep('Perform admin search with' + value + ' and click on the refine', async () => {
            await w.waitUntilElementIsDisplayed(adminHomePage.searchField);
            await input.fillFieldWithValue(adminHomePage.searchField, value);
            await button.clickOnTheElementAndWait(adminHomePage.searchButton, await adminUsersElements.allHyperlinksOnPage.get(0));
            await w.waitUntilElementIsDisplayed(await adminUsersElements.allHyperlinksOnPage.get(0))
        });
    };

    async clearSearchField() {
        await allureStep('clear search field', async () => {
            await button.clickOnTheElement(adminHomePage.clearSearchFieldButton);
            await expect(await elementAttributes.getElementAttribute(adminHomePage.searchField, 'value'))
                .toEqual('');
        });

    };

    public async openQuickSearchDropdwon() {
        await allureStep('Open search dropdwon', async () => {
            await w.waitUntilElementIsClickable(adminHomePage.searchDropdown);
            await button.clickOnTheElement(adminHomePage.searchDropdown);
            await w.waitUntilElementIsClickable(await adminHomePage.searchRadioButtonLabels.get(1));
        })
    };

    public async closeQuickSearchDropdwon() {
        await allureStep('Close search dropdwon', async () => {
            await button.clickOnTheElement(adminHomePage.searchDropdown);
            await w.waitUntilElementNotDisplayed(await adminHomePage.searchRadioButtonLabels.get(1));
        })
    };

    public async checkRadioButtonByLabelName(labelName:string) {
        await allureStep('Check '+ labelName + ' radio button', async () => {
            const labelNames:any = await adminHomePage.searchRadioButtonLabels.getText();
            for (let i:number = 0; i < labelNames.length; i++) {
                if(labelNames[i] === labelName) {
                    await adminHomePage.searchRadioButtonLabels.get(i).click();
                }
            }
        });
    };

}