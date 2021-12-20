import {bomVaultElements } from "../../../../elements/elements";
import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Button} from "../../../../components/simple/button";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {Toolbar} from "../../../../components/toolbar";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const button: Button = new Button();
const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();
const toolbar: Toolbar = new Toolbar();

describe('Part Standardization, DE110747', ()=> {
    it('should not be enable add boms to part standardization after click on sub-assembly link', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreeLinks.get(0));
        await bomTreePartsLogic.expandFirstIndenturedBom();
        await bomTreePartsLogic.openFirstSubAssambly();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.addBomsToPartStandardization).isEnabled()).toBeFalsy();
    });
});