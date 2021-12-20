import {browser} from "protractor";
import {Link} from "../../../components/simple/link";
import {Login} from "../../../components/login";
import {NewBrowserTab} from "../../../utils/newBrowserTab";
import {NewsLogic} from "../../../bussinesLayer/news/newsLogic";
import {newsData} from "../../../testData/news";
import {newsElements} from "../../../elements/elements";

const link: Link = new Link();
const login: Login = new Login();
const newBrowserTab: NewBrowserTab = new NewBrowserTab();
const newsLogic: NewsLogic = new NewsLogic();

xdescribe(' News - IHS in the News Tab', () => {

    it(" should go to IHS in the News Tab ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await newsLogic.openNewsModalFromHelpIcon();
        await newsLogic.openTabByName('IHS in the News');
    });

    it("should have article headers by link", async () => {
        await expect(await newsElements.tabHeaders.getText()).toEqual(newsData.inTheNews.headers);
    });

    it("should open first blog modal by link", async () => {
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(link.returnElementByLinkName(newsData.inTheNews.firstLink),
            newsData.inTheNews.firstUrl);
    });

    it("should open 2nd blog modal by link", async () => {
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(link.returnElementByLinkName(newsData.inTheNews.secondLink),
            newsData.inTheNews.omdiaURL);
    });

    it("should open third blog modal by link", async () => {
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(link.returnElementByLinkName(newsData.inTheNews.thirdLink),
            newsData.inTheNews.omdiaURL);
    });

    it("should open 4th blog modal by link", async () => {
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(link.returnElementByLinkName(newsData.inTheNews.forthLink),
            newsData.inTheNews.omdiaURL);
    });

    it("should open 5th blog modal by link", async () => {
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(link.returnElementByLinkName(newsData.inTheNews.fifthLink),
            newsData.inTheNews.omdiaURL);
    });

    it("should open 6th blog modal by link", async () => {
        await newsLogic.scrollDown();
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(link.returnElementByLinkName(newsData.inTheNews.sixLink),
            newsData.inTheNews.omdiaURL);
    });

    it("should open 7th blog modal by link", async () => {
        await newsLogic.scrollDown();
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(link.returnElementByLinkName(newsData.inTheNews.sevenLink),
            newsData.inTheNews.sevenUrl);
    });

    it("should open 8th blog modal by link", async () => {
        await newsLogic.scrollDown();
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(link.returnElementByLinkName(newsData.inTheNews.eightLink),
            newsData.inTheNews.eightUrl);
    });

    it("should open 9th blog modal by link", async () => {
        await newsLogic.scrollDown();
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(link.returnElementByLinkName(newsData.inTheNews.nineLink),
            newsData.inTheNews.nineUrl);
    });
});
