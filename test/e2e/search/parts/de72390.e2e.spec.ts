import {Login} from "../../../../components/login";
const login: Login = new Login();
import {Meganav} from "../../../../components/meganav";
const meganav:Meganav = new Meganav();
import {PartsSearchLogic} from "../../../../bussinesLayer/search/partsSearchLogic";
const partsSearchLogic:PartsSearchLogic = new PartsSearchLogic();
import {meganavItems} from "../../../../testData/global";
import {searchElements} from "../../../../elements/elements";
import {browser} from "protractor";

describe('DE72390', () => {

    it('should search properly with checked ignore special characters checkbox', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.de72390();
    })
});