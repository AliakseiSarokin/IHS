import {Login} from "../../../components/login";

const login: Login = new Login();
import {Meganav} from "../../../components/meganav";

const meganav: Meganav = new Meganav();
import {
    meganavItems,
} from "../../../testData/global";
import {
    gridElements,
} from "../../../elements/elements";
import {browser} from "protractor";

describe('Part Knowledge Base, DE112022', () => {
    it(" should tooltip in Knowledge base selected column be Knowledge Base Selected ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.mfrKnowledgeBase, gridElements.newGridRows.get(1));
        await expect(await gridElements.newGridHeaderWithTitleByName('Exception Mfr Name').getAttribute('title')).toEqual('Imported Mfr Name');
    });

    it(" should tooltip in Accepted Mfr Name column be Name of the Manufacturer of the Part", async () => {
        await expect(await gridElements.newGridHeaderWithTitleByName('Accepted Mfr Name').getAttribute('title')).toEqual('Represents the name of the manufacturer of the part');
    });

    it(" should tooltip in Modified Date column be Name of the Last Modified Date", async () => {
        await expect(await gridElements.newGridHeaderWithTitleByName('Modified Date').getAttribute('title')).toEqual('Last Modified Date');
    });

    it(" should tooltip in User Name column be Name of user", async () => {
        await expect(await gridElements.newGridHeaderWithTitleByName('User Name').getAttribute('title')).toEqual('Name of user');
    });

    it(" should tooltip in Knowledge Base Selected column be Knowledge Base Selected", async () => {
        await expect(await gridElements.newGridHeaderWithTitleByName('Knowledge Base Selected').getAttribute('title')).toEqual('Knowledge Base Selected');
    });

    it(" should tooltip in BOM Path column be Location", async () => {
        await expect(await gridElements.newGridHeaderWithTitleByName('BOM Path').getAttribute('title')).toEqual('Location');
    });
});