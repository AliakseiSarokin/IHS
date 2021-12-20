import {Meganav} from "../../components/meganav";
import {Waiters as w} from "../../helper/waiters";
import {adminHomePage} from "../../elements/elements";
import {meganavItem} from "../../testData/adminUI/global";
const meganav = new Meganav();


export class AdminHomeLogic {

    public async goToHomePage () {
        await meganav.clickOnTheMeganavSubLinkByName(meganavItem.adminHome);
        await w.waitUntilElementIsDisplayed(adminHomePage.adminMeganav);
    };

}