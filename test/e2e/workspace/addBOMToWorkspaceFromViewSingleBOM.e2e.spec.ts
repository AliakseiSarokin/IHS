import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../testData/global";
import {Grid} from "../../../components/grid";
import {gridElements} from "../../../elements/elements";
import {Login} from "../../../components/login";
import {Meganav} from "../../../components/meganav";
import {Modal} from "../../../components/modal";
import {WorkspaceLogic} from "../../../bussinesLayer/worksapce/workspaceLogic";
import {SingleBomLogic} from "../../../bussinesLayer/bomVault/singleBomLogic";
import {Toolbar} from "../../../components/toolbar";
import {JasmineTimeout} from "../../../helper/jasmineTimeout";

const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const workspaceLogic: WorkspaceLogic = new WorkspaceLogic();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();

describe('View Single BOM - Add BOM To Workspace', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCheckboxSelector.get(1));
    });

    it('should work Add Сurrent BOM to Workspace', async () => {
        const selectedBom: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(1).getText();
        await singleBomLogic.openSingleBomByName(selectedBom);
        await workspaceLogic.addToWorkspaceBomsFromViewSingleBOM();
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, await gridElements.newGridLockedColumnRowCellsWithContent(0).get(0));
        await browser.sleep(2000);
        await expect(await gridElements.newGridLockedColumnRowCellsWithContent(0).get(0).getText()).toEqual(selectedBom);
    });

    afterAll(async () => {
        await workspaceLogic.removeItemFromWorkspace();
    });

});

describe('View Single BOMs - Add BOM To Workspace', () => {

    it('should be warning modal on attempt to add more than 10 BOMs to Workspace, US274641', async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCheckboxSelector.get(1));
        await grid.newMechanismCheckboxRangeChecking(1, 12);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToWorksapce);
        await expect(await modal.modalTitle.getText()).toEqual('Add BOMs to Workspace');
        await expect(await modal.modalBody.getText()).toContain('You have chosen to add 11 BOM(s), which will exceed the maximum of 10 BOMs you can have in your Workspace. You can add up to 10 Workspace BOM(s).');
        await modal.closeModalIfPresent();
    });
});