import {Actions} from "../utils/actions";
import {Waiters as w} from "../helper/waiters";
import {Link} from "./simple/link";
import {allureStep} from "../helper/allure/allureSteps";
import {Modal} from "../components/modal";

const modal:Modal = new Modal();
const link = new Link();
const actions = new Actions();

export class Header {

    public static async hoverOnHeaderItem (element:any) {
        await actions.mouseMoveToElement(element)
    };

    public static async hoverOnHeaderItemAndWaitForDisplayedLink (element:any, linkName:string) {
        await actions.mouseMoveToElement(element);
        await w.waitUntilElementIsClickable(await link.returnElementByLinkName(linkName));
    };

    public static async hoverOnHeaderItemAndClickOnDisplayedLink (element:any, linkName:string, waitElement:any) {
        await allureStep('Hover on header icon and click on the '+ linkName, async () => {
            await this.hoverOnHeaderItemAndWaitForDisplayedLink(element,linkName);
            await link.clickOnTheLinkByName(linkName);
            await w.waitUntilElementIsDisplayed(waitElement);
            await w.waitUntilElementIsClickable(waitElement);
            await w.waitUntilElementNotDisplayed(modal.modalBody);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };
}