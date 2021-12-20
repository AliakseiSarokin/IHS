import {browser, element} from "protractor";
import {buttonNames, columnHeaders, linksNames, meganavItems, titles} from "../../../testData/global";
import {Button} from "../../../components/simple/button";
import {Grid} from "../../../components/grid";
import {dropdownElements, gridElements} from "../../../elements/elements";
import {InstructionPanel} from "../../../components/instructionPanel";
import {Login} from "../../../components/login";
import {Meganav} from "../../../components/meganav";
import {Modal} from "../../../components/modal";
import {Toolbar} from "../../../components/toolbar";
import {WorkspaceLogic} from "../../../bussinesLayer/worksapce/workspaceLogic";
import {SingleBomLogic} from "../../../bussinesLayer/bomVault/singleBomLogic";

const button: Button = new Button();
const grid: Grid = new Grid();
const instructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const workspaceLogic: WorkspaceLogic = new WorkspaceLogic();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();

describe('View Single BOM - Add Part To Workspace', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
        await workspaceLogic.goToWorkspaceTab(linksNames.workspaceParts);
        await workspaceLogic.removeAllItemFromWorkspace();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openSingleBomByName('Automation_BOM');
    });

    it('Add to Workspace should be disabled by default', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect( await button.returnButtonByText(buttonNames.addToWorksapce).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.add);
    });

     it('should work Add to Workspace', async () => {
        let selectedPart: string = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0).getText();
         await workspaceLogic.addToWorkspaceParts();
         await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
         await workspaceLogic.goToWorkspaceTab(linksNames.workspaceParts,
                              gridElements.newGridLockedColumnRowCellsWithContent(0).get(0));
         await expect(await gridElements.newGridLockedColumnRowCellsWithContent(0).get(0).getText()).toEqual(selectedPart);
    });

    afterAll(async () => {
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
        await workspaceLogic.goToWorkspaceTab(linksNames.workspaceParts);
        await workspaceLogic.removeAllItemFromWorkspace();
    });
});

describe('View Single BOMs - Add Parts To Workspace', () => {

    it('should be warning modal on attempt to add more than 10 partss to Workspace, US274641', async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCheckboxSelector.get(1));
        await singleBomLogic.openSingleBomByName('Automation_BOM');
        await grid.checkCheckboxRangeNewGrid(1,12);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToWorksapce);
        await expect(await modal.modalTitle.getText()).toEqual('Add Parts to Workspace');
        await expect(await modal.modalBody.getText()).toContain('You have chosen to add 11 Part(s), which will exceed the maximum of 10 Parts you can have in your Workspace. You can add up to 10 Workspace part(s).');
        await modal.closeModalIfPresent();
    });
});
