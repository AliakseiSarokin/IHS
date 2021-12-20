import {Meganav} from "../../components/meganav";
import {meganavItems} from "../../testData/global";
import {Waiters as w} from "../../helper/waiters";
import {homeElements} from "../../elements/elements";
import {browser} from "protractor";

const meganav = new Meganav();

export class HomeLogic {

    public async goToHome () {
        await meganav.clickOnTheMeganavSubLinkByName(meganavItems.home);
        await w.waitUntilElementIsDisplayed(homeElements.learnMorePanelImage);
    };

    public async scrollDown() {
        await browser.executeScript("document.querySelectorAll('.tile-center')[5].scrollIntoView()");
    }
}