import {browser} from "protractor";
import {importItems} from "../../../../testData/import";
import {buttonNames, fieldStatuses, headerItems, linksNames, meganavItems, tooltips} from "../../../../testData/global";
import {
    bomVaultElements,
    commonElements,
    gridElements,
    headerElements,
    importElements,
    settings
} from "../../../../elements/elements";
import {Actions} from "../../../../utils/actions";
import {BomImportSettingsLogic} from "../../../../bussinesLayer/settings/bomImportSettingsLogic";
import {Grid} from "../../../../components/grid";
import {Header} from "../../../../components/header";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Random} from "../../../../utils/random";
import {JsScripts} from "../../../../utils/jsScripts";
import {CheckBox} from "../../../../components/simple/checkBox";
import {Shade} from "../../../../components/shade";
import {commonSearch} from "../../../../testData/search";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {CustomLayoutLogic} from "../../../../bussinesLayer/bomVault/customLayoutLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Toolbar} from "../../../../components/toolbar";
import {Link} from "../../../../components/simple/link";
import {Button} from "../../../../components/simple/button";

const actions: Actions = new Actions();
const bomImportSettingsLogic: BomImportSettingsLogic = new BomImportSettingsLogic();
const random: Random = new Random();
const savedConfName: string = random.randomTextGenerator(5);
const checkbox: CheckBox = new CheckBox();
const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();
const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const grid: Grid = new Grid();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();
const link = new Link();
const button: Button = new Button();
const importLogic: ImportLogic = new ImportLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();


describe('BOM import, Import History tab, US275136', () => {

    it('should be active "Import History" tab on the 1-STEP BOM IMPORT', async () => {
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setExactBomName('US275136');
        await link.clickOnTheLinkByName(linksNames.importHistory);
        await expect(importElements.importHistoryTabBody.isDisplayed).toBeTruthy();
    });

    it('should collapse "Import History" tab with "Hide" link', async () => {
        await button.clickOnTheElement(importElements.hideLink);
        await expect(await importElements.importHistoryTabBody.isPresent()).toBeFalsy();
        await expect(await importElements.viewImportConfigrationIcon.isDisplayed()).toBeTruthy();
        await expect(await importElements.viewImportConfigrationIcon.getAttribute('title')).toEqual(tooltips.viewImportConfiguration);
    });

    it('should be active "Import History" tab on the PREVIEW AND VALIDATE page', async () => {
        await importLogic.goToPreviewAndValidate();
        await expect(await importElements.viewImportConfigrationIcon.isDisplayed()).toBeTruthy();
        await expect(await importElements.viewImportConfigrationIcon.getAttribute('title')).toEqual(tooltips.viewImportConfiguration);
        await button.clickOnTheElement(importElements.viewImportConfigrationIcon);
        await link.clickOnTheLinkByNameAndWaitForElement(linksNames.importHistory, importElements.importHistoryTabBody);
        await expect(await importElements.importHistoryTabBody.isDisplayed()).toBeTruthy();
    });
});

describe('US215419', () => {

    xit("should save Column Labels are on Row and display when select a saved config", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setColumnNumberOnRow('2');
        await importLogic.saveConfig(savedConfName);
        await importLogic.leaveImportWitLeaveModal();
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.selectSaveConfigByName(savedConfName);
        await expect(await importElements.columnNumberOnRow.getAttribute('value')).toEqual('2');
        await importLogic.leaveImportWitLeaveModal();
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.goToSavedConfigs();
        await grid.selectRowByCellNameAndColumnNumber(savedConfName, 0, 1);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.yesContinueWIthMyDelete)
    });

    it("should save worksheet and display when select a saved config", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setWorksheet(importItems.secondSheetName);
        await importLogic.saveConfig(savedConfName);
        await browser.sleep(1000);
        await importLogic.leaveImportWitLeaveModal();
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.selectSaveConfigByName(savedConfName);
        await expect(await JsScripts.returnSelectedIndexByCss(importElements.worksheetOptionCss)).toEqual(1);
        await importLogic.leaveImportWitLeaveModal();
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.goToSavedConfigs();
        await grid.newGridSelectRowWithMatchValue(0, 'Name', savedConfName);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.yesContinueWIthMyDelete);
    });


    it("should be set Column Labels are on Row in reimport", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setColumnNumberOnRow('1');
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await importLogic.reimportBom();
        await importLogic.uploadAValidFileToImport();
        await browser.sleep(1000);
        await expect(await importElements.columnNumberOnRow.getAttribute('value')).toEqual('1');
        await importLogic.leaveImportWitLeaveModal();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await importLogic.deleteImportedBom();
    });

    it("should be set worksheet in reimport", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setWorksheet(importItems.secondSheetName);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await importLogic.reimportBom();
        await browser.sleep(1000);
        await expect((await importElements.worksheetSelectedOption.getText()).toString()).toContain(importItems.secondSheetName);
        await importLogic.uploadAValidFileToImport();
        await browser.sleep(1000);
        await importLogic.leaveImportWitLeaveModal();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await importLogic.deleteImportedBom();
    });

    it("should be set worksheet for second sheet and try to apply it for file with one sheets", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setWorksheet(importItems.thirdSheetName);
        await importLogic.saveConfig(savedConfName);
        await browser.sleep(1000);
        await importLogic.leaveImportWitLeaveModal();
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToBomImportWithOneSheet();
        await browser.sleep(1000);
        await importLogic.selectSaveConfigByName(savedConfName);
        await expect(await importElements.workSheetLabel.getAttribute('class')).toContain('bom-form-error');
        await actions.mouseMoveToElementAndWaitForTooltip(importElements.workSheetLabel, commonElements.popoverContent.get(0));
        expect(await commonElements.popoverContent.get(0).getText()).toEqual(importItems.worksheetErrorMessage);
        await importLogic.leaveImportWitLeaveModal();
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.goToSavedConfigs();
        await grid.newGridSelectRowWithMatchValue(0, 'Name', savedConfName);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.yesContinueWIthMyDelete);
    });


    xit("should be set worksheet for second sheet and try to apply it for file with one sheets in reimport", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setWorksheet(importItems.thirdSheetName);
        const worksheet:string = await importLogic.returnWorksheetValue();
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await importLogic.reimportBom();
        await importLogic.uploadAValidFileToBomImportWithOneSheet();
        await expect(await importElements.workSheetLabel.getAttribute('class')).toContain('bom-form-error');
        await actions.mouseMoveToElementAndWaitForTooltip(importElements.workSheetLabel, commonElements.popoverContent.get(0));
        expect(await commonElements.popoverContent.get(0).getText()).toEqual(importItems.worksheetErrorMessage);
        await importLogic.leaveImportWitLeaveModal();
    });


});

describe(' US229899 - Import : Allow user to navigate away from BOM Import page if filename is blank, provide alert if trying to perform import actions',  () => {

    it(" should work for Remove button ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await checkbox.checkUnCheckCheckboxes(importElements.useFileNameCheckboxLabel, importElements.useFileNameCheckboxInput,
            fieldStatuses.emptyField);
        await modal.openModalWithButtonByName(buttonNames.remove);
        await expect(await modal.modalTitle.getText()).toEqual(importItems.removeModalTitle);
        await expect(await modal.modalBodyParag.get(0).getText()).toEqual(importItems.removeModalText);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.remove);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it("should be warning modal on leaving import page, US275243", async () => {
        await modal.openModalWithLinkName(meganavItems.home);
        await expect(await modal.modalTitle.getText()).toEqual(importItems.leaveModalTitle);
        await expect(await modal.modalBody.getText()).toEqual(importItems.leaveModalText);
        await modal.closeModalWithXButton();
        await modal.openModalWithLinkName(meganavItems.home);
        await modal.closeModalWithButton(buttonNames.doNotLeavePage)
    });

    it(" should work for Cancel", async () => {
        await modal.openModalWithButtonByName(buttonNames.cancelImport);
        await expect(await modal.modalTitle.getText()).toEqual(importItems.cancelModalTitle);
        await expect(await importElements.cancelModalImportText.getText()).toEqual(importItems.cancelModalText);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.cancelImport);
        await modal.closeModalWithButton(buttonNames.noDoNotCancel);
    });

    it(" should not be oprion to work with import till BOM name is not set", async () => {
        await modal.openModalWithElement(importElements.optionsContainer.get(0));
        await expect(await modal.modalTitle.getText()).toEqual(importItems.invalidBomNameModalTitle);
        await expect(await modal.modalBody.getText()).toEqual(importItems.invalidBomNameModalText);
        await modal.closeModalWithXButton();
        await modal.openModalWithElement(importElements.optionsContainer.get(1));
        await modal.closeModalWithButton(buttonNames.okayThanks);
        await importLogic.leaveImportWitLeaveModal();
    });

});


describe(' US237540 - Support BOM Qty of zero',  () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton('Manage Layouts');
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAttributeByName('Quantity');
        await customLayoutLogic.saveNewCustomLayout();
    });

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
    });

    afterEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await importLogic.deleteImportedBom();
    });

    afterAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });

    it("TC68265 - should be 0 in Quality column in BOM Details after importion file with BOM Qty as 0 ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQty0XlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await singleBomLogic.openFirstSingleBom();
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('0')
        }
    });

    it("TC68265 - should be 1 in Quality column in BOM Details after importion file with BOM Qty as ABC ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQtyAbcXlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await singleBomLogic.openFirstSingleBom();
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('1')
        }
    });

    it("TC68265 - should be 1 in Quality column in BOM Details after importion file with BOM Qty as -1 ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQtyMinus1XlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await singleBomLogic.openFirstSingleBom();
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('1')
        }
    });

    it("TC68265 - should be 1 in Quality column in BOM Details after importion file with BOM Qty as #$%^ ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQtySpecCharXlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await singleBomLogic.openFirstSingleBom();
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('1')
        }
    });
});

describe(' US237540 - Support BOM Qty of zero - BOM Tree Parts',  () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton('Manage Layouts');
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAttributeByName('Quantity');
        await customLayoutLogic.saveNewCustomLayout();
    });

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
    });

    afterEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await importLogic.deleteImportedBom();
    });

    afterAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });

    it("TC68266 - should be 0 in Quality column in BOM Details after importion file with BOM Qty as 0 ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQty0XlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(0));
        await bomTreePartsLogic.expandFolderBomTreePartsByName('b4testrestricted');
        await bomTreePartsLogic.openBomByName(importItems.bomImportName);
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('0')
        }
    });

    it("TC68266 - should be 1 in Quality column in BOM Details after importion file with BOM Qty as ABC ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQtyAbcXlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(0));
        await bomTreePartsLogic.expandFolderBomTreePartsByName('b4testrestricted');
        await bomTreePartsLogic.openBomByName(importItems.bomImportName);
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('1')
        }
    });

    it("TC68266 - should be 1 in Quality column in BOM Details after importion file with BOM Qty as -1 ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQtyMinus1XlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(0));
        await bomTreePartsLogic.expandFolderBomTreePartsByName('b4testrestricted');
        await bomTreePartsLogic.openBomByName(importItems.bomImportName);
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('1')
        }
    });

    it("TC68266 - should be 1 in Quality column in BOM Details after importion file with BOM Qty as #$%^ ", async () => {
        await importLogic.uploadAValidFileByName(importLogic.validBomQtySpecCharXlsFileBomImport);
        await importLogic.setBomName();
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(0));
        await bomTreePartsLogic.expandFolderBomTreePartsByName('b4testrestricted');
        await bomTreePartsLogic.openBomByName(importItems.bomImportName);
        await customLayoutLogic.applyCreateLayout();
        const cellValues:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Quantity');
        for (let i: number = 0; i<cellValues.length; i++) {
            await expect(cellValues[i]).toEqual('1')
        }
    });
});
