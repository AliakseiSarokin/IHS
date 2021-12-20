import {allureStep} from "../../helper/allure/allureSteps";
import {Button} from "../../components/simple/button";
import {buttonNames, linksNames} from "../../testData/global";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Input} from "../../components/simple/input";
import {Link} from "../../components/simple/link";
import {gridElements, searchElements} from "../../elements/elements";
import {Waiters as w} from "../../helper/waiters";
import {browser} from "protractor";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const link: Link = new Link();

export class CplSearchLogic {

    public async performCplSearch(value: string) {
        await allureStep('Perform CPL search with' + value, async () => {
            await input.fillFieldWithValue(searchElements.cplSearchField, value);
            await button.clickByButtonName(buttonNames.search);
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilWorkingModalNotDisplayed();
            //temporary decision
            await browser.sleep(500);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    async performCplSearchWithRefine(value: string) {
        await allureStep('Perform CPL search with' + value + ' and click on the refine', async () => {
            await input.fillFieldWithValue(searchElements.cplSearchField, value);
            await button.clickByButtonName(buttonNames.search);
            await w.waitUntilElementIsDisplayed(gridElements.grid);
            await link.clickOnTheLinkByNameAndWaitForElement(linksNames.refine, searchElements.cplSearchField);
        });
    };

    async clearSearchField() {
        await link.clickOnTheLinkByName(linksNames.clear);
        await expect(await elementAttributes.getElementAttribute(searchElements.cplSearchField, 'value'))
            .toEqual('');
    };
}