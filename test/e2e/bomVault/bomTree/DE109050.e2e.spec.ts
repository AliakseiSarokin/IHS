import {browser} from 'protractor';
import {Button} from "../../../../components/simple/button";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Toolbar} from "../../../../components/toolbar";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {bomVaultElements, gridElements} from "../../../../elements/elements";
import  {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic";


const button: Button = new Button();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();

describe("BOM Tree - DE109050", () =>{

    it("Set Best Part to Preffered should be disabled for selected folders", async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms, meganavItems.bomsSubItems.bomTree,
            bomVaultElements.bomTree.bomTreeBoms.get(1));
        await bomTreeLogic.checkNewGridFolderRows(1);
        await expect(await toolbar.arrowButtom.get(0).getAttribute('class')).not.toContain('disabled');
        await expect(await toolbar.arrowButtom.get(2).getAttribute('class')).toContain('disabled');
    });

});