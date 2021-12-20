import {Link} from "../../../components/simple/link";
import {Login} from "../../../components/login";
import {NewsLogic} from "../../../bussinesLayer/news/newsLogic";
import {NewBrowserTab} from "../../../utils/newBrowserTab";
import {browser} from "protractor";
import {newsData} from "../../../testData/news";
import {newsElements} from "../../../elements/elements";
import {linksNames} from "../../../testData/global";
const link: Link = new Link();
const login: Login = new Login();
const newsLogic: NewsLogic = new NewsLogic();
const newBrowserTab: NewBrowserTab = new NewBrowserTab();

describe(' News - Webinars / Online Events Tab', () => {

    it(" should go Webinars / Online Events Tab ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await newsLogic.openNewsModalFromHelpIcon();
        await newsLogic.openTabByName('Webinars / Online Events');

    });

    it("should have headers ", async () => {
        await expect(await newsElements.tabHeaders.getText()).toEqual(newsData.webinars.headers);


    });



});