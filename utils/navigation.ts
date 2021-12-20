import {browser, ElementFinder} from "protractor";
import {Waiters as w} from "../helper/waiters";
import {buttonNames} from "../testData/global";
import {Modal} from "../components/modal"

const modal = new Modal();
export class Navigation {

    public static async refreshPage(waitElem:ElementFinder) {
        await browser.navigate().refresh();
        await w.waitUntilElementIsClickable(waitElem)
        if (await modal.resolutionText.isPresent()) {
            await modal.closeModalWithButton(buttonNames.okay);
        }
    }
}