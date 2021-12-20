import {Header} from "../../components/header";
import {Link} from "../../components/simple/link";
import {Modal} from "../../components/modal";
import {Waiters as w} from "../../helper/waiters";
import {headerElements, newsElements} from "../../elements/elements";
import {headerItems, modalTitles} from "../../testData/global";
import {browser} from "protractor";
const link: Link = new Link();
const modal: Modal = new Modal();
export class NewsLogic {

    public async openNewsModalFromHelpIcon () {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.helpIcon, headerItems.helpLinks[0], newsElements.newsModal);
        await w.waitUntilElementIsClickable(modal.modalTitle);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.news)
    };

    public async openTabByName(tabName: string) {
        await link.clickOnTheLinkByNameAndWaitForElement(tabName, newsElements.newsModal);
    };

    public async scrollDown() {
        await browser.executeScript("document.querySelectorAll('.news-modal .active a')[6].scrollIntoView()")
    };

    public async scrollDownToWhatsNew() {
        await browser.executeScript("document.querySelectorAll('.tile-center')[7].scrollIntoView()");
    };

}