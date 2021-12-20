import {browser} from "protractor";
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
import {Link} from "../../../components/simple/link";
import {Login} from "../../../components/login";
import {linksNames} from "../../../testData/global"
import {NewBrowserTab} from "../../../utils/newBrowserTab";
import {NewsLogic} from "../../../bussinesLayer/news/newsLogic";
import {newsData} from "../../../testData/news";
import {newsElements} from "../../../elements/elements";

const helpLogic: HelpLogic = new HelpLogic();
const link: Link = new Link();
const login: Login = new Login();
const newBrowserTab: NewBrowserTab = new NewBrowserTab();
const newsLogic: NewsLogic = new NewsLogic();

describe('News - Database Statistics / Recent Updates Tab', () => {

    it('should go to Database Statistics / Recent Updates Tab', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await newsLogic.openNewsModalFromHelpIcon();
        await newsLogic.openTabByName('Database Statistics / Recent Updates');
    });

    it("should open help panel and check title and related hotSpot link " +
        "(DE107558 - 'Related Topics' link is not displayed)", async () => {
        await helpLogic.openHelpPanelAndCheckTitleAndRelatedHotSpotLink('About BOM Intelligence',
            'Related Topics');
    });

    it('should have column headers', async () => {
        await expect(await newsElements.tabHeaders.getText()).toEqual(newsData.database.headers);
    });

    xit('should open database statistics window', async () => {
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(link.returnElementByLinkNameAndIndex(linksNames.clickToLearnMore,
            0), newsData.database.dbStatUrl);
    });

    xit('should open database statistics window', async () => {
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(link.returnElementByLinkNameAndIndex(linksNames.clickToLearnMore,
            2), newsData.database.mfrPartProcessUrl);
    });
});
