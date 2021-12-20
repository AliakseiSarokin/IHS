import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {bomVaultElements, gridElements} from "../../../../elements/elements";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Toolbar} from "../../../../components/toolbar";
import {WorkspaceLogic} from "../../../../bussinesLayer/worksapce/workspaceLogic";
import {Button} from "../../../../components/simple/button";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const workspaceLogic: WorkspaceLogic = new WorkspaceLogic();
const button: Button = new Button;
const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();

describe('Bom Tree Workspace ', ()=> {

    afterAll(async () => {
        await workspaceLogic.removeItemFromWorkspace();
    });

    it('should button Add be enabled', async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(0));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.addToWorksapce).isEnabled()).toBeFalsy();
    });

    it('should select bom and check button Add BOM(s) to my Workspace', async () => {
        await bomTreePartsLogic.openFirstBom();
        await workspaceLogic.addToWorkspaceBomsFromBOMTree();
    });

    it('should check slider title', async () =>{
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.newGridLockedColumnRowCellsWithContent(0).get(0));
        await browser.sleep(2000);
        await expect((await gridElements.newGridLockedColumnRowCellsWithContent(0).get(0)).getText())
            .toEqual('1234');
    });

});