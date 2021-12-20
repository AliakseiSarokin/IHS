import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {gridElements} from "../../../../elements/elements";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic";
import {Toolbar} from "../../../../components/toolbar";
import {WorkspaceLogic} from "../../../../bussinesLayer/worksapce/workspaceLogic";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const toolbar: Toolbar = new Toolbar();
const workspaceLogic: WorkspaceLogic = new WorkspaceLogic();

describe('Bom Tree Workspace ', ()=> {

    afterAll(async () => {
        await workspaceLogic.removeItemFromWorkspace();
    });

    it('should button Add be enabled', async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.gridWrapper);
        await bomTreeLogic.checkBomRows(1);
        await expect(await toolbar.returnToolbarButton(buttonNames.add).isEnabled()).toBeTruthy();
    });

    it('should check slider title', async () =>{
        await workspaceLogic.addToWorkspaceBomsFromBOMTree();
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.newGridLockedColumnRowCellsWithContent(0).get(0));
        await expect((await gridElements.newGridLockedColumnRowCellsWithContent(0).get(0)).getText())
            .toEqual('AUTOMATION_Indentured');
    });

});