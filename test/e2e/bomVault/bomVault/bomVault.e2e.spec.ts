import {AmlLogic} from "../../../../bussinesLayer/bomVault/amlLogic";
import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";
import {Button} from "../../../../components/simple/button";
import {
    bomElements, dropdownElements, gridElements, importElements, pageTitles, toolbarElements, videoSliderElements
} from "../../../../elements/elements";
import {bomVaultData} from "../../../../testData/bomVault";
import {browser} from "protractor";
import {buttonNames, columnHeaders, leftNavItems, meganavItems, titles} from "../../../../testData/global";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Shade} from "../../../../components/shade";
import {Toolbar} from "../../../../components/toolbar";
import {GetPerformanceLogs} from "../../../../utils/getPerformanceLogs";
import {StringArray} from "../../../../utils/stringArray";
import {endpoints} from "../../../../api/testData/endpointList";
import {IRequestInfoType} from "../../../../testData/getPerformLogsInterfaces";
import {requestBody} from "../../../../api/testData/bodyList";
import {BeforeAfter} from "../../../../helper/beforeAfter";
import {Boms} from "../../../../api/logicLayer/boms";
import {user} from "../../../../api/testData/global";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {VideoSliderLogic} from "../../../../bussinesLayer/home/videoSliderLogic";
import {videoLinks} from "../../../../testData/video";

const amlLogic: AmlLogic = new AmlLogic();
const bomVaultLogic: BomVaultLogic = new BomVaultLogic();
const button: Button = new Button;
const grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const helpLogic: HelpLogic = new HelpLogic();
const importLogic: ImportLogic = new ImportLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();

describe('BOM Vault - control panel', () => {

    it('should go to BOM Vault page and check title', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.gridWrapper);
        await expect(await pageTitles.pageTitle.getText()).toEqual(titles.bomVault);
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('BOM Vault');
    });

    it('should open help panel and check title', async () => {
        await helpLogic.openAndCheckHelpPanelTitle('View BOM Vault');
    });

    it('should retain checkboxes column width after columns autosizing', async () => {
        const checkboxesColumnWidth: number = await elementAttributes.getElementWidth(gridElements.newGridCheckboxWrapper.get(0));
        await grid.newGridOpenFilterBoxByName('BOM Info');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[1],
            gridElements.newGridCheckboxSelector.get(0));
        await expect(await elementAttributes.getElementWidth(gridElements.newGridCheckboxWrapper.get(0))).toEqual(checkboxesColumnWidth);
    });

    it('should have filters', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(bomVaultData.bomVault.filters);
        await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);
    });

    it('should show boms with history', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(bomVaultData.bomVault.filters[7]);
        await grid.newGridCheckIconPresentInColumnByColumnName(0, 'BOM Info')
    });

    it('should show only my boms', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(bomVaultData.bomVault.filters[1]);
        const ownerCellsText: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Owner');
        for (let i: number = 0; i < ownerCellsText.length; i++) {
            expect(ownerCellsText[i]).toEqual('b4testadmin')
        }
    });

    it('should show only boms with Part exceptions', async () => {
        await grid.newGridHideColumnByName('Parts');
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(bomVaultData.bomVault.filters[8]);
        const mfrExceptionCellsText: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Part Exceptions');
        for (let i: number = 0; i < mfrExceptionCellsText.length; i++) {
            expect(parseInt(mfrExceptionCellsText[i])).toBeGreaterThan(0)
        }
        await toolbar.unhideCellNameWithUnhideAll('Parts');
    });

    it('should show only boms with Mfr exceptions', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(bomVaultData.bomVault.filters[9]);
        const mfrExceptionCellsText: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Mfr Exceptions');
        for (let i: number = 0; i < mfrExceptionCellsText.length; i++) {
            expect(parseInt(mfrExceptionCellsText[i])).toBeGreaterThan(0)
        }
    });

    it('should select option and display tag', async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter)
    });

    it('should display one tag - bomVault', async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove tag by clicking on clear all tags link', async () => {
        await toolbar.removeWithClearAll();
        await browser.sleep(2000);
    });

    it('should remove tag by clicking on X', async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it('should open modify owner shade', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName('View Only My BOMs');
        await bomVaultLogic.openModifyOwnerShade();
    });

    it('should open help panel and check opened subitem', async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Modify Owners');
    });

    it('should be user list in shade', async () => {
        await expect(await bomElements.bomVault.userList.getText()).toEqual(bomVaultData.bomVault.modifyOwnerShadeUserList);
    });

    it('should be active modify owner button when select a user in shade', async () => {
        await bomVaultLogic.activeModufyOwnerButton();
    });

    it('should be leave modal in shade', async () => {
        await modal.openModalWithButtonByName(buttonNames.close);
        await expect(await modal.modalTitle.getText()).toEqual('Notification');
        await modal.closeModalWithButton(buttonNames.no);
        await modal.openModalWithButtonByName(buttonNames.close);
        await modal.closeModalWithXButton();
    });

    it('should close the shade', async () => {
        await modal.openModalWithButtonByName(buttonNames.close);
        await Shade.closeShadeWithButton(buttonNames.yes);
    });

    it("should have 'Add' button with dropdown list", async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(button.returnButtonByText(buttonNames.addToWorksapce).isDisplayed()).toBeTruthy();
    });

    it("should have 'Unhide' button with dropdown list", async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column', async () => {
        await grid.newGridHideColumnByName('BOM Info');
        await toolbar.displayHiddenColumnInDropdonwToolbar('BOM Info')
    });

    it('should unhide the column with Unhode All', async () => {
        await toolbar.unhideCellNameWithUnhideAll('BOM Info');
    });

    it('should open and close reprocess Modal', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await expect(await button.returnButtonByText(buttonNames.reprocess).isEnabled()).toBeFalsy();
        await bomVaultLogic.reprocessModalChecking();
    });

    it('should open reprocess Modal, open help panel and check opened subitem', async () => {
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await helpLogic.openAndCheckHelpPanelTitle('View BOM Vault');
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Reprocess select BOMs');
        await modal.closeModalWithXButton();
    });

    it('should be active/inactive delete button', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await expect(await button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await grid.newMechanismCheckboxRangeChecking(0, 2);
        await expect(await button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();
        await grid.newMechanismCheckboxRangeChecking(1, 2);
    });

    it('should open close delete modal', async () => {
        await bomVaultLogic.deleteModalChecking();
    });

    it("should open delete modal, open help panel and check opened subitem", async () => {
        await grid.newMechanismCheckboxRangeChecking(0, 2);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Delete BOMs');
        await modal.closeModalWithXButton()
    });

    it('should go to generate a report page when select a bom and click on the gen rep button', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await bomVaultLogic.goToGenerateReportPage();
    });

    it('should go to generate a report page when select several boms and click on the gen rep button', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await bomVaultLogic.goToGenerateReportPageMultipleSelection();
    });
});

//need to refactor to use it with API
xdescribe('BOM Vault - control panel - Set Best Part to Preferred', () => {

    it('should set best bom to preferred AML Bom - Group Admin', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setExactBomName('groupAdmin_AML_IPN_ON_1');
        await importLogic.setAmlOn();
        await importLogic.importBom();
        await importLogic.showImportedBomInVaultByName('groupAdmin_AML_IPN_ON_1');
        await importLogic.waitingForProcessedStatus();
        await amlLogic.checkingBOmWithAmlOn();
        await grid.changeGridWithLeftNavOptionByName(leftNavItems.bomOptions.viewAllBoms,
            gridElements.newGridCellByRowIndex(0).get(1));
        await expect(await grid.returnRowNumberByLinkName(0,
            columnHeaders.columnHeaderNames.newGrid[1], 'groupAdmin_AML_IPN_ON_1') === 0).toBeTruthy();
        await bomVaultLogic.setBestPartToPreferred('AML_IPN_ON');
        await expect(await grid.returnRowNumberByLinkName(0,
            columnHeaders.columnHeaderNames.newGrid[1], 'AML_IPN_ON') === 0).toBeTruthy();
    });

    it('should set best bom to preferred AML Bom and ignore Non-AML BOM - Group Admin', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        const nonAmlBomStartPosition: number = await grid.returnRowNumberByLinkName(0,
            columnHeaders.columnHeaderNames.newGrid[1], 'AML_IPN_OFF');
        await amlLogic.checkingBOmWithAmlOff();
        await grid.changeGridWithLeftNavOptionByName(leftNavItems.bomOptions.viewAllBoms,
            gridElements.newGridCellByRowIndex(0).get(1));
        await bomVaultLogic.setSeveralBestPartToPreferred(['groupAdmin_AML_IPN_ON_1', 'AML_IPN_OFF']);
        await expect(await grid.returnRowNumberByLinkName(0,
            columnHeaders.columnHeaderNames.newGrid[1], 'groupAdmin_AML_IPN_ON_1') === 0).toBeTruthy();
        await expect(await grid.returnRowNumberByLinkName(0,
            columnHeaders.columnHeaderNames.newGrid[1], 'AML_IPN_OFF') >= nonAmlBomStartPosition).toBeTruthy();
    });

    // here we have to add checks for positions in grid AML and Non-AML Boms after 'Set Best Part to Preferred' action process
    it("should set best bom to preferred only AML Bom and ignore Non-AML BOM by 'Select All' items - Group Admin", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        // const nonAmlBomStartPosition: number = await grid.returnRowNumberByLinkName(0,
        // columnHeaders.columnHeaderNames.newGrid[1], 'AML_IPN_OFF');
        await grid.newMechanismSelectAllCheckboxChecking();
        await amlLogic.setBestPartToPref();
        await button.clickByButtonNameAndWait(buttonNames.refresh, gridElements.newGridRows.get(0));
        await bomVaultLogic.deleteExactBom('groupAdmin_AML_IPN_ON_1');
        // await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
        //     'groupAdmin_AML_IPN_ON_1')=== 0).toBeTruthy();
        // await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
        //     'AML_IPN_OFF') >= nonAmlBomStartPosition).toBeTruthy();
    });

    it('should set best bom to preferred AML Bom - User Admin', async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setExactBomName('userAdmin_AML_IPN_ON_1');
        await importLogic.setAmlOn();
        await importLogic.importBom();
        await importLogic.showImportedBomInVaultByName('userAdmin_AML_IPN_ON_1');
        await importLogic.waitingForProcessedStatus();
        await amlLogic.checkingBOmWithAmlOn();
        await grid.changeGridWithLeftNavOptionByName(leftNavItems.bomOptions.viewAllBoms,
            gridElements.newGridCellByRowIndex(0).get(1));
        await expect(await grid.returnRowNumberByLinkName(0,
            columnHeaders.columnHeaderNames.newGrid[1], 'userAdmin_AML_IPN_ON_1') === 0).toBeTruthy();
        await bomVaultLogic.setBestPartToPreferred('AML_IPN_ON');
        await expect(await grid.returnRowNumberByLinkName(0,
            columnHeaders.columnHeaderNames.newGrid[1], 'AML_IPN_ON') === 0).toBeTruthy();
    });

    it('should set best bom to preferred AML Bom and ignore Non-AML BOM - User Admin', async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        const nonAmlBomStartPosition: number = await grid.returnRowNumberByLinkName(0,
            columnHeaders.columnHeaderNames.newGrid[1], 'AML_IPN_OFF');
        await amlLogic.checkingBOmWithAmlOff();
        await grid.changeGridWithLeftNavOptionByName(leftNavItems.bomOptions.viewAllBoms,
            gridElements.newGridCellByRowIndex(0).get(1));
        await bomVaultLogic.setSeveralBestPartToPreferred(['userAdmin_AML_IPN_ON_1', 'AML_IPN_OFF']);
        await expect(await grid.returnRowNumberByLinkName(0,
            columnHeaders.columnHeaderNames.newGrid[1], 'userAdmin_AML_IPN_ON_1') === 0).toBeTruthy();
        await expect(await grid.returnRowNumberByLinkName(0,
            columnHeaders.columnHeaderNames.newGrid[1], 'AML_IPN_OFF') >= nonAmlBomStartPosition).toBeTruthy();
    });

    // here we have to add checks for positions in grid AML and Non-AML Boms after 'Set Best Part to Preferred' action process
    it("should set best bom to preferred only AML Bom and ignore Non-AML BOM by 'Select All' items - User Admin", async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        // const nonAmlBomStartPosition: number = await grid.returnRowNumberByLinkName(0,
        // columnHeaders.columnHeaderNames.newGrid[1], 'AML_IPN_OFF');
        await grid.newMechanismSelectAllCheckboxChecking();
        await amlLogic.setBestPartToPref();
        await button.clickByButtonNameAndWait(buttonNames.refresh, gridElements.newGridRows.get(0));
        await bomVaultLogic.deleteExactBom('userAdmin_AML_IPN_ON_1');
        // await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
        //     'userAdmin_AML_IPN_ON_1')=== 0).toBeTruthy();
        // await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
        //     'AML_IPN_OFF') >= nonAmlBomStartPosition).toBeTruthy();
    });

    it("should not set best bom to preferred another user's imported AML Bom - KB Admin", async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        await amlLogic.checkingBOmWithAmlOn();
        await grid.changeGridWithLeftNavOptionByName(leftNavItems.bomOptions.viewAllBoms,
            gridElements.newGridCellByRowIndex(0).get(1));
        await bomVaultLogic.checkSetBestPartToPreferred('AML_IPN_ON', 'b4testadmin', false);
    });

    it('should set best bom to preferred AML Bom - KB Admin', async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setExactBomName('kbAdminUser_AML_IPN_ON_1');
        await importLogic.setAmlOn();
        await importLogic.importBom();
        await importLogic.importAnotherBOM();
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setExactBomName('kbAdminUser_AML_IPN_ON_2');
        await importLogic.setAmlOn();
        await importLogic.importBom();
        await importLogic.showImportedBomsInVaultByNames(['kbAdminUser_AML_IPN_ON_1', 'kbAdminUser_AML_IPN_ON_2']);
        await importLogic.waitingForProcessedStatus();
        await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
            'kbAdminUser_AML_IPN_ON_2') === 0).toBeTruthy();
        await bomVaultLogic.setBestPartToPreferred('kbAdminUser_AML_IPN_ON_1');
        await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
            'kbAdminUser_AML_IPN_ON_1') === 0).toBeTruthy();
    });

    it('should set best bom to preferred AML Bom and ignore Non-AML BOM - KB Admin', async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setExactBomName('kbAdminUser_AML_IPN_OFF');
        await importLogic.importBom();
        await importLogic.showImportedBomInVaultByName('kbAdminUser_AML_IPN_OFF');
        await importLogic.waitingForProcessedStatus();
        const nonAmlBomStartPosition: number = await grid.returnRowNumberByLinkName(0,
            columnHeaders.columnHeaderNames.newGrid[1], 'kbAdminUser_AML_IPN_OFF');
        await grid.changeGridWithLeftNavOptionByName(leftNavItems.bomOptions.viewAllBoms, gridElements.newGridRows.get(0));
        await bomVaultLogic.setSeveralBestPartToPreferred(['kbAdminUser_AML_IPN_ON_2', 'kbAdminUser_AML_IPN_OFF']);
        await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
            'kbAdminUser_AML_IPN_ON_2') === 0).toBeTruthy();
        await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
            'kbAdminUser_AML_IPN_OFF') >= nonAmlBomStartPosition).toBeTruthy();
    });

    // here we have to add checks for positions in grid AML and Non-AML Boms after 'Set Best Part to Preferred' action process
    it("should set best bom to preferred only AML Bom and ignore Non-AML BOM by 'Select All' items - KB Admin", async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        // const nonAmlBomStartPosition: number = await grid.returnRowNumberByLinkName(0,
        // columnHeaders.columnHeaderNames.newGrid[1], 'kbAdminUser_AML_IPN_OFF');
        await grid.newMechanismSelectAllCheckboxChecking();
        await amlLogic.setBestPartToPref();
        await button.clickByButtonNameAndWait(buttonNames.refresh, gridElements.newGridRows.get(0));
        await bomVaultLogic.deleteSeveralExactBoms(['kbAdminUser_AML_IPN_ON_1', 'kbAdminUser_AML_IPN_ON_2',
            'kbAdminUser_AML_IPN_OFF']);
        // await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
        //     'kbAdminUser_AML_IPN_ON_1')=== 0).toBeTruthy();
        // await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
        //     'kbAdminUser_AML_IPN_OFF') >= nonAmlBomStartPosition).toBeTruthy();
    });
});

describe('BOM Vault - export', () => {
    afterEach(async () =>{
        await BeforeAfter.clearCacheCookiesWithLogin(browser.params.userAdminUrl);
    });

    it('should export summary file for bomVault', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCheckboxSelectorByIndex(1));
        await button.clickByButtonName(buttonNames.exportSummary);
        const reqArr = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.boms.export, 'POST');
        await expect(requestData.postData).toEqual(requestBody.boms.exportBomVaultAllBoms);
    });

    it('should select bom and export file for bomVault', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCheckboxSelectorByIndex(1));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        const bomNameArray: string[] = await grid.newGridReturnCellValuesByColumnName(0, 'BOM Name');
        const bomName: string = bomNameArray[0];
        await button.clickByButtonName(buttonNames.exportSummary);
        const reqArr:any = await GetPerformanceLogs.getRequestData();
        const singleBom:any = await Boms.returnSingleBomByKeyValue(user.groupAdmin, 'BM_BOM_NAME', bomName);
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.boms.export, 'POST');
        await expect(requestData.postData).toEqual(requestBody.boms.exportBomVaultSelectedBom(singleBom[0].id.toString()));
    });
});


describe(`Verify video tab for view all BOMS`, () => {
    it(`should verify video in view all BOMS page`, async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCheckboxSelectorByIndex(1));
        await VideoSliderLogic.openVideoSlider();
        await expect(await videoSliderElements.videoTitles.getText()).toEqual(videoLinks.bomPageBI);
        await VideoSliderLogic.closeVideoSlider();
    })
});
