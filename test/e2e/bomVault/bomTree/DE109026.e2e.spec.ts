import {browser} from 'protractor';
import {Button} from "../../../../components/simple/button";
import {envs, user} from "../../../../api/testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Toolbar} from "../../../../components/toolbar";
import {buttonNames, meganavItems, columnHeaders} from "../../../../testData/global";
import {bomVaultElements, gridElements} from "../../../../elements/elements";
import {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic";

const button: Button = new Button();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();

describe("BOM Tree - DE109026", () =>{

    it("should not have access to modify another's bom ReadOnlyUser", async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms, meganavItems.bomsSubItems.bomTree,
            gridElements.treeFolderNames.get(1));
        await bomTreeLogic.selectRawWithNotMatchValue(columnHeaders.columnHeaderNames.newGrid[3], user.readonly.username);
        await expect(await toolbar.arrowButtom.get(2).getAttribute('class')).toContain('disabled');
    });

    it("should not have access to modify another's bom RegularUser", async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms, meganavItems.bomsSubItems.bomTree,
            gridElements.treeFolderNames.get(1));
        await bomTreeLogic.selectRawWithNotMatchValue (columnHeaders.columnHeaderNames.newGrid[3], user.regural.username);
        await expect(await toolbar.arrowButtom.get(1).getAttribute('class')).toContain('disabled');
    });

   it("should not have access to modify another's bom in kbAdminUser", async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms, meganavItems.bomsSubItems.bomTree,
            gridElements.treeFolderNames.get(1));
        await bomTreeLogic.selectRawWithNotMatchValue (columnHeaders.columnHeaderNames.newGrid[3], user.kbAdmin.username);
       await expect(await toolbar.arrowButtom.get(1).getAttribute('class')).toContain('disabled');
    });
});