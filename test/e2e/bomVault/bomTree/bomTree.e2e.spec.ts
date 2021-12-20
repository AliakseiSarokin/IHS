import {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic";
import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";
import {Button} from "../../../../components/simple/button";
import {bomVaultData} from "../../../../testData/bomVault";
import {browser} from "protractor";
import {buttonNames, exportOptions, meganavItems, titles} from "../../../../testData/global";
import {bomElements, gridElements, bomVaultElements, pageTitles, shadeElements, reportElements, importElements
} from "../../../../elements/elements";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Shade} from "../../../../components/shade";
import {Toolbar} from "../../../../components/toolbar";
import {GetPerformanceLogs} from "../../../../utils/getPerformanceLogs";
import {Boms} from "../../../../api/logicLayer/boms";
import {IRequestInfoType} from "../../../../testData/getPerformLogsInterfaces";
import {StringArray} from "../../../../utils/stringArray";
import {endpoints} from "../../../../api/testData/endpointList";
import {requestBody} from "../../../../api/testData/bodyList";
import {user} from "../../../../api/testData/global";
import {Waiters as w} from "../../../../helper/waiters";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {ConsoleErrors} from "../../../../helper/consoleErrors";

const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const bomVaultLogic: BomVaultLogic = new BomVaultLogic();
const button: Button = new Button();
const helpLogic: HelpLogic = new HelpLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const link: Link = new Link();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const toolbar: Toolbar = new Toolbar();
const importLogic:ImportLogic = new ImportLogic();

describe(' BOM Tree', () => {

    xit(" should go to BOM Tree from meganav ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.newGridCheckboxSelector.get(3));
        await expect(await pageTitles.pageTitle.getText()).toEqual('BOM Tree (Hierarchy of BOMs)');
    });

    xit('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('BOM Tree');

    });

    xit("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('BOM Tree navigation');
    });

    xit(" should be not active View BOM Attributes button when select more than one BOM", async () => {
        await button.clickByButtonName(buttonNames.refresh);
        await bomTreeLogic.expandFolderBomTreeWithName('AUTOMATION_FOLDER_DO_NOT_DELETE_1_1_1');
        await bomTreeLogic.checkNewGridCheckBox(2);
        await expect(await button.returnButtonByText(buttonNames.viewBomAttributes).isEnabled()).toBeFalsy();
    });

    xit(" should go to BOM attributes when select a BOM and click on the View BOM Attributes button ", async () => {
        await bomTreeLogic.checkNewGridCheckBox(2);
        await bomTreeLogic.checkNewGridCheckBox(1);
        await bomTreeLogic.goToBomAttributes();
    });

    xit(" should select a folder and be active add and modify folder buttons", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.newGridCheckboxSelector.get(4));
        await bomTreeLogic.checkNewGridCheckBox(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.bomToSelectedFolder).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.add);
        await bomTreeLogic.checkNewGridCheckBox(1);
        await bomTreeLogic.checkNewGridFolderRows(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.bomToSelectedFolder).isEnabled()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.add);
    });

    xit('should  go to Import with bom to Selected Folder', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await bomTreeLogic.goToBomImportAndSetDestFolder();
    });

    xit('should not be errors in console, DE121533', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.newGridCheckboxSelector.get(4));
        await bomTreeLogic.checkNewGridFolderRows(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.bomToSelectedFolder).isEnabled()).toBeTruthy();
        await button.clickByButtonName(buttonNames.bomToSelectedFolder);
        await w.waitUntilElementIsClickable(importElements.step1EnableBox);
        await importLogic.uploadAValidFileToImport();
        await modal.openModalWithElementAndWait(importElements.destFolderSummary, importElements.optionModalTitle);
        await bomTreeLogic.openCloseFolderBomTreeWithName('AUTOMATION_FOLDER_DO_NOT_DELETE');
        let consoleErrorArr: any[] = await Object.keys(await ConsoleErrors.getConsoleErrors());
        await expect(consoleErrorArr.length).toEqual(0);
        await importLogic.closeOptionModalWithX();
        await importLogic.leaveImportWitLeaveModal();
    });

    xit('should  be active inactive add new folder button', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.newGridCheckboxSelector.get(0));
        await expect(await toolbar.arrowButtom.get(0).getAttribute('class')).toContain('disabled');
        await bomTreeLogic.expandFolderBomTreeWithName('AUTOMATION_FOLDER_DO_NOT_DELETE_1_1_1');
        await bomTreeLogic.checkNewGridCheckBox(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.addNewFolder).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.add);
        await bomTreeLogic.checkNewGridFolderRows(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.addNewFolder).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.add);
        await bomTreeLogic.checkNewGridCheckBox(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.addNewFolder).isEnabled()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.add);
    });

    xit('should open close add folder modal in BOM tree', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addNewFolder);
        await expect(await modal.modalTitle.getText()).toEqual('Add New Folder');
        const subtitle: string = 'Create a new folder in the BOM Tree.';
        await expect(await bomVaultElements.bomTree.addNewFolderSubtitle.getText()).toEqual(subtitle);
        await modal.closeModalWithXButton();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addNewFolder);
        await modal.closeModalWithButton(buttonNames.cancelDoNotAddNewFolder);
    });

    xit('should open close add folder modal in BOM tree, open help panel and check opened subitem', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addNewFolder);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Add folders');
        await modal.closeModalWithButton(buttonNames.cancelDoNotAddNewFolder);
    });

    xit('should be add new folder modal attributes in BOM tree', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addNewFolder);
        await bomTreeLogic.addNewFolderModalFieldsChecking();
    });

    xit('should not be Vault name for folder in add folder in BOM tree', async () => {
        await bomTreeLogic.notBeVaultAsNameOfNewFolder();
    });

    xit('should add a folder', async () => {
        await bomTreeLogic.addFolder();
    });

    xit('should open modify folder modal in BOM tree', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithElement(toolbar.returnToolbarDropdownOption(buttonNames.modifyFolder));
        await expect(await modal.modalTitle.getText()).toEqual('Modify this Folder');
        const subtitle: string = 'Modify this folder in the BOM Tree.';
        await expect(await bomVaultElements.bomTree.addNewFolderSubtitle.getText()).toEqual(subtitle);
        await modal.closeModalWithXButton();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithElement(toolbar.returnToolbarDropdownOption(buttonNames.modifyFolder));
        await modal.closeModalWithButton(buttonNames.cancelDoNotModifyFolder);
    });

    xit('should open modify folder modal in BOM tree, open help panel and check opened subitem', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithButtonByName(buttonNames.modifyFolder);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Modify folders');
        await modal.closeModalWithButton(buttonNames.cancelDoNotModifyFolder);
    });

    //Failing due to New Description - Cosmetic defect
    xit('should be modify folder modal attributes in BOM tree', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithButtonByName(buttonNames.modifyFolder);
        await bomTreeLogic.modifyFolderModalFieldsChecking();
    });

    xit('should not be Vault name for folder in modify folder in BOM tree', async () => {
        await bomTreeLogic.notBeVaultAsNameOfModifyFolder();
    });

    xit('should modify folder', async () => {
        await bomTreeLogic.modifyFolder();
    });

    xit('should open delete folder modal', async () => {
        await modal.openModalWithButtonByName(buttonNames.delete);
        await expect(await modal.modalTitle.getText()).toEqual('Confirm Delete');
        await expect(await modal.modalLi.get(0).getText()).toContain(bomVaultData.bomTree.modifiedFolderName);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.noDoNotDeleteSelectedItems);
    });

    xit('should open delete folder modal, open help panel and check opened subitem', async () => {
        await modal.openModalWithButtonByName(buttonNames.delete);
        await  helpLogic.openHelpPanelAndCheckOpenedSubitem('Delete folders and BOMs')
        await modal.closeModalWithButton(buttonNames.noDoNotDeleteSelectedItems);
    });

    xit('should delete folder for the BOM tree', async () => {
        await bomTreeLogic.deleteFolder();
    });


    it(" should open modify owner shade - Folder ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.newGridCheckboxSelector.get(0));
        await bomTreeLogic.checkNewGridCheckBox(1);
        await bomTreeLogic.checkNewGridFolderRows(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Shade.openShadeWithButton(buttonNames.modifyOwner);
        await Shade.closeShadeWithButton(buttonNames.close);
    });

    it(" should open modify owner shade, open help panel and check opened subitem ", async () => {
        await button.clickByButtonName(buttonNames.refresh);
        await bomTreeLogic.checkNewGridCheckBox(1);
        await bomTreeLogic.checkNewGridFolderRows(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Shade.openShadeWithButton(buttonNames.modifyOwner);
        await helpLogic.openAndCheckHelpPanelTitle('Administer users');
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Modify Owners');
        await Shade.closeShadeWithButton(buttonNames.close);
    });

    it(" should be BOMs Tabs tab in shade - Folder", async () => {
        await button.clickByButtonName(buttonNames.refresh);
        await bomTreeLogic.checkNewGridCheckBox(1);
        const bomName: string = await bomVaultElements.bomTree.bomTreeBoms.get(0).getText();
        await bomTreeLogic.checkNewGridFolderRows(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Shade.openShadeWithButton(buttonNames.modifyOwner);
        await link.clickOnTheLinkByNameAndWaitForElement('BOM(s)', shadeElements.openedShade);
        await bomTreeLogic.modifyOwnerShadeBomsTab(bomName);
        await Shade.closeShadeWithButton(buttonNames.close);
    });

    it(" should be Folder Tabs tab in shade - Folder", async () => {
        await button.clickByButtonName(buttonNames.refresh);
        await bomTreeLogic.checkNewGridCheckBox(1);
        const bomName: string = await bomVaultElements.bomTree.bomTreeFolders.get(0).getText();
        await bomTreeLogic.checkNewGridFolderRows(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Shade.openShadeWithButton(buttonNames.modifyOwner);
        await link.clickOnTheLinkByNameAndWaitForElement('Folder(s)', shadeElements.openedShade);
        await bomTreeLogic.modifyOwnerShadeFolderTab(bomName);
    });


    it(" should be user list in shade - Folder ", async () => {
        await expect(await bomElements.bomVault.userList.getText()).toEqual(bomVaultData.bomVault.modifyOwnerShadeUserList)
    });

    it(" should be active modify owner button when select a user in shade ", async () => {
        await bomVaultLogic.activeModufyOwnerButton();
    });

    xit(" should be leave modal in shade ", async () => {
        await modal.openModalWithButtonByName(buttonNames.close);
        await expect(await modal.modalTitle.getText()).toEqual('Notification');
        await modal.closeModalWithButton(buttonNames.no);
        await modal.openModalWithButtonByName(buttonNames.close);
        await modal.closeModalWithXButton();
    });

    xit(" should close the shade ", async () => {
        await modal.openModalWithButtonByName(buttonNames.close);
        await Shade.closeShadeWithButton(buttonNames.yes, pageTitles.pageTitle);
    });

    xit(" should be inactive move folder button - Move Folder Shade", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.newGridCheckboxSelector.get(3));
        await bomTreeLogic.checkNewGridCheckBox(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(await button.returnButtonByText(buttonNames.moveFolder).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
        await bomTreeLogic.checkNewGridFolderRows(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(await button.returnButtonByText(buttonNames.moveFolder).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
        await bomTreeLogic.checkNewGridCheckBox(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(await button.returnButtonByText(buttonNames.moveFolder).isEnabled()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
        await bomTreeLogic.checkNewGridFolderRows(1);
        await bomTreeLogic.checkNewGridFolderRows(3);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(await button.returnButtonByText(buttonNames.moveFolder).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
        await bomTreeLogic.checkNewGridFolderRows(3);
    });

    xit(" should open Move Folder Shade", async () => {
        const bomName: string = await bomVaultElements.bomTree.bomTreeFolders.get(0).getText();
        await bomTreeLogic.checkFolderNewGridRowByName(bomName);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Shade.openShadeWithButton(buttonNames.moveFolder);
        await expect(await bomVaultElements.bomTree.moveFolderShade.title.getText()).toEqual('Move Folder');
        await expect(await bomVaultElements.bomTree.moveFolderShade.shadeText.get(0).getText())
            .toEqual('Select the Folder into which you want to MOVE the selected folder.');
        await expect(await bomVaultElements.bomTree.moveFolderShade.shadeText.get(1).getText())
            .toContain(bomName);
    });

    xit("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Move folders');
    });

    xit(" should close Move Folder Shade", async () => {
        await Shade.closeShadeWithButton(buttonNames.cancelDoNotMove, gridElements.newGridCheckboxSelector.get(3));
    });


    xit(" should move Folder", async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Shade.openShadeWithButton(buttonNames.moveFolder);
        await bomTreeLogic.moveFolderToAnotherFolder();
        const bomName: string = await bomVaultElements.bomTree.bomTreeFolders.get(0).getText();
        await bomTreeLogic.checkFolderNewGridRowByName(bomName);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Shade.openShadeWithButton(buttonNames.moveFolder);
        await bomTreeLogic.returnToInitialState();
    });

    xit('should open close reprocess Modal - BOM Tree', async () => {
        await bomTreeLogic.expandFolderBomTreeWithName('AUTOMATION_FOLDER_DO_NOT_DELETE_1_1_1');
        await bomTreeLogic.checkNewGridCheckBox(1);
        const bomName: string = await bomVaultElements.bomTree.bomTreeBoms.get(0).getText();
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await expect(await modal.modalTitle.getText()).toContain('Reprocess Selected BOM(s)');
        await expect(await modal.modalLi.get(0).getText()).toContain(bomName);
        await modal.closeModalWithButton(buttonNames.noDoNotReporcess);
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await modal.closeModalWithXButton();
    });

    xit('should open reprocess Modal, open help panel and check opened subitem', async () => {
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Reprocess BOMs');
        await modal.closeModalWithXButton();
    });

    //This is failing due to defect
    xit('should go to generate a report page when select a bom and click on the gen rep button', async () => {
        await bomTreeLogic.goToGenerateReportPage();
    });

    xit('should go to generate a report page when select several boms and click on the gen rep button', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.newGridCheckboxSelector.get(3));
        await bomTreeLogic.goToGenerateReportPageMultipleSelection();
    });

    xit('should go to generate a report page with all boms in selected folder without errors in console, DE122269;', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await ConsoleErrors.getConsoleClear();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.newGridCheckboxSelector.get(0));
        await bomTreeLogic.checkNewGridFolderRows(1);
        await button.clickByButtonName(buttonNames.generateReportButton);
        await w.waitUntilElementIsClickable(reportElements.reports.standardReports.get(0));
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await expect(await pageTitles.generereReportTitle.getText()).toEqual([titles.generateReport]);
        await expect(await pageTitles.multipleReports.getText()).toEqual('Multiple BOMs Selected');
        let consoleErrorArr: any[] = await Object.keys(await ConsoleErrors.getConsoleErrors());
        await expect(consoleErrorArr.length).toEqual(0);
    });

    xit('should be active move bom button - BOM Tree', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.newGridCheckboxSelector.get(3));
        await bomTreeLogic.checkNewGridFolderRows(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(await button.returnButtonByText(buttonNames.moveBoms).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
        await bomTreeLogic.checkNewGridCheckBox(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(await button.returnButtonByText(buttonNames.moveBoms).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
        await bomTreeLogic.checkNewGridFolderRows(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(await button.returnButtonByText(buttonNames.moveBoms).isEnabled()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
    });

    xit('should be open move boms shade - BOM Tree', async () => {
        const bomName: string = await bomVaultElements.bomTree.bomTreeBoms.get(0).getText();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Shade.openShadeWithButton(buttonNames.moveBoms);
        await expect(await bomVaultElements.bomTree.moveBomShade.title.getText()).toEqual('Move BOM(s)');
        await expect(await bomVaultElements.bomTree.moveBomShade.shadeText.get(0).getText())
            .toEqual('Select the Folder into which you want to MOVE the selected BOM(s).');
        await expect(await bomVaultElements.bomTree.moveBomShade.bomList.get(0).getText())
            .toContain(bomName)
    });

    xit("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Move BOMs');
    });

    xit('should be close move boms shade - BOM Tree', async () => {
        await Shade.closeShadeWithButton(buttonNames.cancelDoNotMove);

    });

    xit('should be option to move boms from different folders -  BOM Tree', async () => {
        await button.clickByButtonName(buttonNames.refresh);
        await bomTreeLogic.checkNewGridCheckBox(1);
        const bomName: string = await bomVaultElements.bomTree.bomTreeBoms.get(0).getText();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Shade.openShadeWithButton(buttonNames.moveBoms);
        await bomTreeLogic.moveBomToAnotherFolder(bomName);
        await bomTreeLogic.checkBomNewGridByName(bomName);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Shade.openShadeWithButton(buttonNames.moveBoms);
        await bomTreeLogic.returnBomToInitialState(bomName);
    });

    xit('should go to View Single BOM from BOM Tree', async () => {
        await bomTreeLogic.goToViewSingleBom();
    });
});

describe(' BOM Tree export', () => {
    it('should export a file - BOM Tree', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.newGridCheckboxSelector.get(3));
        let bomName  = await bomTreeLogic.checkBomRowsAndReturnName(1);
        await button.clickByButtonName(buttonNames.exportSummary);
        const reqArr:any = await GetPerformanceLogs.getRequestData();
        const singleBom:any = await Boms.returnSingleBomByKeyValue(user.groupAdmin, 'BM_BOM_NAME', bomName[0]);
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.bomsTree.bomsTreeExport, 'POST');
        await expect(requestData.postData).toEqual(requestBody.boms.bomTreeExportBody(singleBom[0].id.toString()));
    });
});
