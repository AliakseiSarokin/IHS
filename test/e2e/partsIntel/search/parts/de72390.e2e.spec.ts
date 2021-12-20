import {Login} from "../../../../../components/login";
const login: Login = new Login();
import {Meganav} from "../../../../../components/meganav";
const meganav:Meganav = new Meganav();
import {PartsSearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";
const partsSearchLogic:PartsSearchLogic = new PartsSearchLogic();
import {meganavItems} from "../../../../../testData/global";
import {searchElements} from "../../../../../elements/elements";
import {browser} from "protractor";

describe('DE72390', () => {

    it('should search properly with checked ignore special characters checkbox', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.de72390();
    })
});