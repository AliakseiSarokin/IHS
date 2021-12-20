import {browser} from "protractor";
import {meganavItems} from "../../../../testData/global";
import {importElements} from "../../../../elements/elements";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
const link: Link = new Link();
const login: Login = new Login();

describe(' Import - Read Only User', () => {

    it(" should go to import page from meganav ", async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await expect(await importElements.importLinkMeganav.getAttribute('class'))
            .toContain('disabled');
    });
});