import {commonElements} from "../../../elements/elements";
import {Link} from "../../../components/simple/link";
const link: Link = new Link();
import {Waiters as w} from "../../../helper/waiters";

export class CommonCplLogic {

    public async goToTab(tabName: string, waitElements: any) {
        await link.clickOnTheLinkByNameAndWaitForElement(tabName, waitElements);
    };

    public async goToTabByNumber(tabNumber: number, waitElements: any) {
        await commonElements.navTabs.get(tabNumber).click();
        await w.waitUntilElementIsClickable(waitElements);
    }
}