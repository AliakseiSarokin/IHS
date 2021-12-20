import {browser} from "protractor";
import {buttonNames, columnHeaders, meganavItems, titles} from "../../../testData/global";
import {Grid} from "../../../components/grid";
import {gridElements} from "../../../elements/elements";
import {InstructionPanel} from "../../../components/instructionPanel";
import {Login} from "../../../components/login";
import {Meganav} from "../../../components/meganav";
import {Modal} from "../../../components/modal";
import {Toolbar} from "../../../components/toolbar";
import {WorkspaceLogic} from "../../../bussinesLayer/worksapce/workspaceLogic";

const grid: Grid = new Grid();
const instructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const workspaceLogic: WorkspaceLogic = new WorkspaceLogic();

describe('My Workspace - BOMs tab - Read Only User', () => {

    it('should navigate to My Workspace', async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
        await workspaceLogic.removeItemFromWorkspace();
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        const infoText: string = 'Add up to ten BOMs and then parts to an intermediary view called My Workspace. ' +
            'Items in My Workspace can be annotated, exported, and drawn from when adding parts to BOMs ' +
            'or when launching BOMs. A My Workspace pane also appears in the left of the BOM Vault, BOM Tree, ' +
            'and BOM Tree Parts windows for quick access to BOMs and parts.';
        await instructionPanel.instrPanelHidingUnhidingCheckingWithText(titles.myWorkspace, infoText);
    });

    it('should add BOM to My Workspace', async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms, meganavItems.bomsSubItems.viewAllBoms,
            gridElements.newGridRows.get(0));
        const selectedBom: string = await gridElements.bomRowAllLinks.get(0).getText();
        await workspaceLogic.addToWorkspaceProcessedBoms();
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.newGridRows.get(0));
        await expect(await gridElements.newGridLockedColumnRowCellsWithContent(0).get(0).getText()).toEqual(selectedBom);
    });

    it('should open/close remove modal', async () => {
        await workspaceLogic.openRemoveModal();
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.removeMyWorkspace);
        await modal.closeModalWithButton(buttonNames.cancelDoNotRemove);
    });

    it('check grid column headers', async () => {
        await grid.newGridCheckingLockedColumnHeaders(columnHeaders.workspace.bomsTab.lockedColumns);
        await grid.newGridCheckingUnlockedColumnHeaders(columnHeaders.workspace.bomsTab.unlockedColumns);
    });

    it('check sort options in all grid column headers', async () => {
        await workspaceLogic.checkColumnSortOptionsWorkspaceTab(columnHeaders.workspace.bomsTab.lockedColumns,
            columnHeaders.workspace.bomsTab.unlockedColumns);
    });

    it('should be shown popover by clicking on the pencil icon', async () => {
        await workspaceLogic.commentAreaChecking();
    });

    it('should add comment', async () => {
        await workspaceLogic.addComment();
    });

    it('should delete comment', async () => {
        await workspaceLogic.deleteComment();
    });

    it('should have unhide button with dropdown list', async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column', async () => {
        await grid.newGridHideColumnsRange(columnHeaders.workspace.bomsTab.lockedColumns);
        await grid.newGridHideColumnsRange(columnHeaders.workspace.bomsTab.unlockedColumns);
        await toolbar.displayHiddenColumnInDropdonwToolbar(columnHeaders.workspace.bomsTab.unlockedColumns[0]);
        await toolbar.displayHiddenColumnInDropdonwToolbar(columnHeaders.workspace.bomsTab.unlockedColumns[2]);
    });

    it('should unhide the column with Column Name button', async () => {
        await toolbar.unhideCellNameWithCellValue(columnHeaders.workspace.bomsTab.lockedColumns[0]);
    });

    it('should unhide the column with Unhide All', async () => {
        await toolbar.unhideCellNameWithUnhideAll(columnHeaders.workspace.bomsTab.unlockedColumns[2]);
    });

    it('should go to Generate Report Page', async () => {
        await workspaceLogic.goToGenerateReport();
    });

    it('should view single bom by clicking on the BOM name link', async () => {
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.newGridRows.get(0));
        await workspaceLogic.openViewSingleBomByClickingOnTheBomLink();
    });

    it('should remove BOM from My Workspace', async () => {
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.newGridRows.get(0));
        await workspaceLogic.removeItemFromWorkspace();
    });
});
