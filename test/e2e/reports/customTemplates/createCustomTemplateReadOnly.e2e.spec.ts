import {browser} from "protractor";
import {buttonNames, meganavItems, titles, fieldStatuses} from "../../../../testData/global";
import {gridElements, pageTitles, reportElements} from "../../../../elements/elements";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
const elementAttributes: ElementAttributes = new ElementAttributes();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();



describe(' Create Custom Template Read Only User -  steps checking', () => {

    it(" should go to create a custom template page ", async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.clickOnTheMeganavItemByName(meganavItems.reports);
        await expect(await elementAttributes.getElementAttribute(link.returnElementByLinkName(meganavItems
            .reportsSubItems.createTemplate), 'class')).toEqual(fieldStatuses.disabled);
    });

});