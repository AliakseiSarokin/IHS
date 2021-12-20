import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {bomVaultElements, commonElements, gridElements, importElements} from "../../../../elements/elements";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {ConsoleErrors} from "../../../../helper/consoleErrors";
import {Button} from "../../../../components/simple/button";
import {Input} from "../../../../components/simple/input";
import {Random} from "../../../../utils/random";
import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";
import {Actions} from "../../../../utils/actions";
import {importItems} from "../../../../testData/import";
import {Grid} from "../../../../components/grid";
import {Waiters as w} from "../../../../helper/waiters";
import {Link} from "../../../../components/simple/link";
import {Modal} from "../../../../components/modal";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const importLogic: ImportLogic = new ImportLogic();
const button: Button = new Button();
const input: Input = new Input();
const random: Random = new Random();
const bomVaultLogic = new BomVaultLogic();
const actions: Actions = new Actions();
const grid: Grid = new Grid();
const link: Link = new Link();
const modal: Modal = new Modal();

describe(`BOM import defect, DE115180`, () => {
    it(`BOM Import using Saved Configurations shows error in console`, async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setBomName();
        await importLogic.selectSaveConfigByName('test2');
        await importLogic.importBom();
        await expect(await ConsoleErrors.getConsoleErrors()).toEqual([]);
    });
});

describe(`BOM import defect, DE114466`, () => {
    it(`Import configuration: Error on saving configuration with long name`, async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await button.clickByButtonNameAndWait('Save as New', importElements.savedConfName);
        await input.fillFieldWithValue(importElements.savedConfName, random.randomTextGenerator(51));
        await expect((await importElements.savedConfName.getAttribute('value')).length).toBeLessThanOrEqual(50);
    });
});


describe('BOM import, Import new BOM having special characters in the header file. Def 353398', () => {

    it('BOM import, Import new BOM having french characters in the header file, should not have any BOM import validation errors', async () => {
        let bomName: string = 'BOMWithSpecialCharHeader' + random.randomTextGenerator(3);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileByName(importLogic.validBomHeaderFrenchCharHeaderXlsFileBomImport);
        await importLogic.setExactBomName(bomName);
        await importLogic.goToPreviewAndValidate();
        await importLogic.VerifyIfErrorIsPresent();
        await importLogic.confirmImportBom();
        await importLogic.showImportedBomInVaultByName(bomName);
        await bomVaultLogic.deleteExactBom(bomName);
    });
});


describe('DE101583 - configuration item tooltip doesn\'t close on the Preview page', () => {

    it("should not show tooltip after mover out focus from item ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.goToPreviewAndValidate();
        await actions.mouseMoveToElementAndWaitForTooltip(importElements.optionsContainer.get(1),
            commonElements.popoverContent.get(0));
        await actions.mouseMoveToElement(gridElements.newGridHeaderCells.get(0));
        await expect(await commonElements.popoverContent.get(0).isPresent()).toBeFalsy();
        await importLogic.leaveImportWitLeaveModal();
    });

});

describe('DE129167 - Import: BOM name is set to default after Preview and Validate', () => {

    it("should not change the BOM name once user moves to Preview and Validate and comes back to step1", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importElements.bomNameField.clear();
        await importElements.bomNameField.sendKeys("TestDe129167");
        await importElements.descriptionField.sendKeys("TestDe129167");
        await importLogic.goToPreviewAndValidate();
        await importElements.moveTo1StepImport.click();
        await expect(await importElements.bomNameField.getAttribute('value')).toEqual("TestDe129167");
        await expect(await importElements.descriptionField.getAttribute('value')).toEqual("TestDe129167");
        await importLogic.leaveImportWitLeaveModal();
    });

});


describe('DE129167 - Import: BOM name is set to default after Preview and Validate', () => {

    it("should be set Column Labels are on Row in reimport", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importElements.bomNameField.clear();
        await importElements.bomNameField.sendKeys(importItems.bomImportName);
        await importElements.descriptionField.sendKeys("TestDe222643");
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await importLogic.reimportBom();
        await importLogic.uploadAValidFileToImport();
        await expect(await importElements.descriptionField.getAttribute('value')).toEqual('TestDe222643');
        await importLogic.leaveImportWitLeaveModal();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await importLogic.deleteImportedBom();
    });
});

describe('DE370609 - Import indentured BOM: "expand all" button should not be there in Preview and Validate step', () => {
    it('should not be "expand all" button, indentured BOM, DE370609', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileByName(importLogic.indentured);
        await importLogic.goToPreviewAndValidate();
        await importLogic.openCloseIndenturedBom();
        await expect(await bomVaultElements.bomTreeParts.indenturedExpandAllButton.get(0).isPresent()).toBeFalsy();
        await link.clickOnTheLinkByName('Cancel Import');
        await modal.closeModalWithButton(buttonNames.yesCancelImport);
    });
});

describe('DE121941 - Import indentured BOM: should load properly the BOM folder structure', () => {
    it('should load properly the BOM folder structure, DE121941', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImportToCheckHierarchy();
        await importLogic.goToPreviewAndValidate();
        await w.waitUntilElementIsDisplayed(bomVaultElements.bomTreeParts.rowItems.get(1));
        const initialBomHierarchyArray = await bomVaultElements.bomTreeParts.rowItems.getText();
        await browser.executeScript(`document.querySelectorAll('.icon-container.expand-trigger-icon')[1].click()`);
        await w.waitUntilElementIsDisplayed(bomVaultElements.bomTreeParts.rowItems.get(1));
        const expandedBomHierarchyArray = await bomVaultElements.bomTreeParts.rowItems.getText();
        await expect(expandedBomHierarchyArray.length).toBeGreaterThan(initialBomHierarchyArray.length);
        await expect(initialBomHierarchyArray).not.toContain('Num Ind Code L2-SA1');
        await expect(expandedBomHierarchyArray).toContain('Num Ind Code L2-SA1');
    });
});
