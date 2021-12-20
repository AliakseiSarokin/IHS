import {browser} from "protractor";
import {buttonNames, columnHeaders, linksNames, meganavItems, titles} from "../../../testData/global";
import {commonSearch} from "../../../testData/search";
import {Button} from "../../../components/simple/button";
import {Grid} from "../../../components/grid";
import {gridElements} from "../../../elements/elements";
import {InstructionPanel} from "../../../components/instructionPanel";
import {Login} from "../../../components/login";
import {Meganav} from "../../../components/meganav";
import {Modal} from "../../../components/modal";
import {QuickSearch} from "../../../components/quickSearch";
import {Toolbar} from "../../../components/toolbar";
import {Waiters as w} from "../../../helper/waiters";
import {WorkspaceLogic} from "../../../bussinesLayer/worksapce/workspaceLogic";
import {endpoints} from "../../../api/testData/endpointList";
import {StringArray} from "../../../utils/stringArray";
import {GetPerformanceLogs} from "../../../utils/getPerformanceLogs";
import {IRequestInfoType} from "../../../testData/getPerformLogsInterfaces";
import {requestBody} from "../../../api/testData/bodyList";
const button: Button = new Button();
const grid: Grid = new Grid();
const instructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const quickSearch: QuickSearch = new QuickSearch();
const toolbar: Toolbar = new Toolbar();
const workspaceLogic: WorkspaceLogic = new WorkspaceLogic();

describe('My Workspace - Parts tab', () => {

    it('should navigate to My Workspace', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
        await workspaceLogic.goToWorkspaceTab(linksNames.workspaceParts);
        if(await gridElements.newGridCheckboxSelector.get(0).isPresent()) {
            await grid.checkCheckboxRangeNewGrid(0, 1);
            await workspaceLogic.removeItemFromWorkspace();
        }
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        const infoText: string = 'Add up to ten BOMs and then parts to an intermediary view called My Workspace. ' +
            'Items in My Workspace can be annotated, exported, and drawn from when adding parts to BOMs ' +
            'or when launching BOMs. A My Workspace pane also appears in the left of the BOM Vault, BOM Tree, ' +
            'and BOM Tree Parts windows for quick access to BOMs and parts.';
        await instructionPanel.instrPanelHidingUnhidingCheckingWithText(titles.myWorkspace, infoText);
    });

    it('should add Part to My Workspace', async () => {
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await browser.sleep(2000);
        await w.waitUntilElementIsClickable(gridElements.newGridLockedColumnRowCellsWithContent(0).get(4));
        let selectedPart: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(4).getText();
        await workspaceLogic.addToWorkspaceParts();
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
        await workspaceLogic.goToWorkspaceTab(linksNames.workspaceParts,
            gridElements.newGridLockedColumnRowCellsWithContent(0).get(0));
        await expect(await gridElements.newGridLockedColumnRowCellsWithContent(0).get(0).getText()).toEqual(selectedPart);
    });

    it('should open/close remove modal', async () => {
        await workspaceLogic.openRemoveModal();
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.removeMyWorkspace);
        await modal.closeModalWithButton(buttonNames.cancelDoNotRemove);
    });

    it('check grid column headers', async () => {
        await grid.newGridCheckingLockedColumnHeaders(columnHeaders.workspace.partsTab.lockedColumns);
        await grid.newGridCheckingUnlockedColumnHeaders(columnHeaders.workspace.partsTab.unlockedColumns);
    });

    it('check sort options in all grid column headers', async () => {
        await workspaceLogic.checkColumnSortOptionsWorkspaceTab(columnHeaders.workspace.partsTab.lockedColumns,
            columnHeaders.workspace.partsTab.unlockedColumns);
    });

    it('should be shown textarea by clicking on the pencil icon', async () => {
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
        await grid.newGridHideColumnsRange(columnHeaders.workspace.partsTab.lockedColumns);
        await grid.newGridHideColumnsRange(columnHeaders.workspace.partsTab.unlockedColumns);
        await toolbar.displayHiddenColumnInDropdonwToolbar(columnHeaders.workspace.partsTab.unlockedColumns[1]);
        await toolbar.displayHiddenColumnInDropdonwToolbar(columnHeaders.workspace.partsTab.unlockedColumns[1]);
    });

    it('should unhide the column with Column Name button', async () => {
        await toolbar.unhideCellNameWithCellValue(columnHeaders.workspace.partsTab.lockedColumns[0]);
    });

    it('should unhide the column with Unhide All', async () => {
        await toolbar.unhideCellNameWithUnhideAll(columnHeaders.workspace.partsTab.unlockedColumns[1]);
    });

    it('should export a file for view all reports', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
        await workspaceLogic.goToWorkspaceTab(linksNames.workspaceParts,
            gridElements.newGridLockedColumnRowCellsWithContent(0).get(0));
        await button.clickByButtonName(buttonNames.export);
        const reqArr = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.workspaces.exportParts, 'POST');
        await expect(requestData.postData).toEqual(requestBody.workspaces.exportParts);
    });

    it('should open Part Details modal by clicking on the Part number link', async () => {
        await workspaceLogic.goToWorkspaceTab(linksNames.workspaceBoms);
        await workspaceLogic.goToWorkspaceTab(linksNames.workspaceParts,
            gridElements.newGridLockedColumnRowCellsWithContent(0).get(0));
        await workspaceLogic.openPartDetailsModal();
    });

    it('should open Part Details modal by clicking on the mfr name link', async () => {
        await workspaceLogic.openPartDetailsModal('Manufacturer');
    });

    it('should remove part', async () => {
        await workspaceLogic.removeItemFromWorkspace();
    });
});
