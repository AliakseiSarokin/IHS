import {Button} from "../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, linksNames, meganavItems, titles} from "../../../../testData/global";
import {CplImportLogic} from "../../../../bussinesLayer/import/cplImportLogic";
import {cplImportElements, importElements, pageTitles} from "../../../../elements/elements";
import {cplImportData} from "../../../../testData/cpl";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {importItems} from "../../../../testData/import";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";

const button: Button = new Button();
const cplImportLogic: CplImportLogic = new CplImportLogic();
const elementAttributes: ElementAttributes = new ElementAttributes();
const helpLogic: HelpLogic = new HelpLogic();
const importLogic: ImportLogic = new ImportLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();

describe('CPL Import ', () => {

    it('should go to CPL import page from meganav', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl, meganavItems.cplSublinks.import,
            importElements.aboutImport);
        await expect(await pageTitles.pageTitleShim2.getText()).toEqual(titles.cplImport);
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('CPL import');
    });

    it('should open help panel and check title', async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Import CPL');
    });

    it('should have visual indicator with steps', async () => {
        const steps = ['ABOUT CPL IMPORT', '1-STEP CPL IMPORT', 'IMPORT COMPLETED!'];
        await expect(await importElements.stepsLabels.getText()).toEqual(steps);
        const label = 'Do not show this page again. Go directly to 1-Step CPL Import';
        await expect(await importElements.doNotShowCheckboxLabelCPL.getText()).toEqual(label);
        const titles = ['About CPL Import (this page):', '1-Step CPL Import:', 'Import Completed:'];
        await expect(await importElements.aboutColumnTitles.getText()).toEqual(titles);
    });

    it('should have description for about cpl import', async () => {
        const aboutDesc = 'Use the CPL 1-Step Import to load a new CPL, ' +
            'Replace an existing CPL, Update your existing CPL, or Append new parts to your existing CPL.';
        await expect(await importElements.descSteps.get(0).getText()).toEqual(aboutDesc);
    });

    it('should have description for  1-step cpl import', async () => {
        const aboutDesc = 'Select a CPL file to import, define the type of import, map the ' +
            'columns in your CPL import file to BOM Intelligence column names, and then import your CPL.';
        await expect(await importElements.descSteps.get(1).getText()).toEqual(aboutDesc);
    });

    it('should have description for Import Completed', async () => {
        const aboutDesc = 'View a summary of the import selections applied to the CPL import file.';
        await expect(await importElements.descSteps.get(2).getText()).toEqual(aboutDesc);
    });

    it('should go to step-1 by clicking on the next button', async () => {
        await importLogic.goToStep1();
    });

    it('should be drag and drop box', async () => {
        const dragDropText = 'Drag and drop a CPL (Corporate Parts List)' +
            ' file here, or click Browse and select a file from your computer.';
        await importLogic.dragAndDropBoxChecking(dragDropText)
    });

    it('should be option View sample CPL file', async () => {
        await modal.openModalWithLinkName(linksNames.viewSampleCplFile);
        await expect(await modal.modalTitle.getText()).toEqual('Sample CPL File');
        await modal.closeModalWithXButton();
    });

    it('should go to home page when cancel CPL Import without uploading a file', async () => {
        await cplImportLogic.cancelWithoutUploadSimpleImport();
    });

    it('should upload a file', async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl, meganavItems.cplSublinks.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
    });

    it("should be warning modal on leaving CPL import page, US275243", async () => {
        await modal.openModalWithLinkName(meganavItems.home);
        await expect(await modal.modalTitle.getText()).toEqual(importItems.leaveModalTitle);
        await expect(await modal.modalBody.getText()).toEqual('Are you sure you want to leave without importing your CPL?');
        await modal.closeModalWithXButton();
        await modal.openModalWithLinkName(meganavItems.home);
        await modal.closeModalWithButton(buttonNames.doNotLeavePage)
    });

    it('should be remove modal', async () => {
        await modal.openModalWithButtonByName(buttonNames.remove);
        await expect(await modal.modalTitle.getText()).toEqual('Clear File');
        const modalText = 'NOTE: clicking CLEAR will clear the selected CPL File and' +
            ' disable selections. Selections will be enabled if you select another file.';
        await expect(await modal.modalBodyParag.get(0).getText()).toEqual(modalText);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.remove);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should be option to remove file', async () => {
        await importLogic.removeFile();
        await expect(button.returnButtonByText(buttonNames.remove).isPresent()).toBeFalsy();
    });

    it('should be cancel CPL Import modal', async () => {
        await importLogic.uploadAValidFileToImport();
        await modal.openModalWithButtonByName(buttonNames.cancelCplImport);
        const cancelMidalTitle = 'Cancel CPL Import?';
        await expect(await modal.modalTitle.getText()).toEqual(cancelMidalTitle);
        const cancelModalText = 'Are you sure you want to cancel this CPL Import?';
        await expect(await modal.modalBody.getText()).toEqual(cancelModalText);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.cancelCplImport);
        await modal.closeModalWithButton(buttonNames.noDoNotCancel)
    });

    it('should cancel Import with uploaded file', async () => {
        await importLogic.cancelImport(buttonNames.cancelCplImport);
        await expect(button.returnButtonByText(buttonNames.remove).isPresent()).toBeFalsy();
    });

    it('should be warning modal when upload empty files', async () => {
        await importLogic.uploadEmptyFiles(cplImportElements.cplFileInputId);
    });

    it('should be warning modal when upload header only files', async () => {
        await importLogic.uploadHeaderOnlyFiles(cplImportElements.cplFileInputId);
    });

    it('should be warning modal when upload header only not first row files', async () => {
        await importLogic.uploadHeaderOnlyNotFirstRowFiles(cplImportElements.cplFileInputId);
    });

    it('should be Settings sections', async () => {
        await expect(await importElements.optionTitle.getText()).toEqual(cplImportData.settingTitles);
    });

    it('should check default option and roll up import types and selected radioButton in settings CPL Import Type', async () => {
        await importLogic.uploadAValidFileToImport();
        await expect(await cplImportElements.importOptionsText.getText()).toEqual('Append');
        await button.clickOnTheElement(cplImportElements.optionsContainer.get(0));
        await expect(await elementAttributes.getElementAttribute(cplImportElements.importTypeRadioButtonsInput.get(1),
            'checked')).toEqual('true');
        await button.clickOnTheElement(cplImportElements.optionsContainer.get(0));
    });

    it("should check 'Replace' radio button in CPL Import Type setting section open help panel and check " +
        "opened subitem/underSubitem", async () => {
        await cplImportLogic.checkTypeOption('Replace', 0, cplImportData.settingTypeModalText[0]);
    });

    it("should check 'Append' radio button in CPL Import Type setting section open help panel and check " +
        "opened subitem/underSubitem", async () => {
        await cplImportLogic.checkTypeOption('Append', 1, cplImportData.settingTypeModalText[1]);
    });

    it("should check 'Update' radio button in CPL Import Type setting section open help panel and check " +
        "opened subitem/underSubitem", async () => {
        await cplImportLogic.checkTypeOption('Update', 2, cplImportData.settingTypeModalText[2]);
    });

    it('should open a Column Mapping setting section section', async () => {
        await cplImportLogic.openOptionModalByTitle(cplImportData.settingTitles[1]);
        await expect(await importElements.optionModalTitle.getText()).toEqual('CPL Column Mapping');
    });

    it('should open help panel and check opened subitem/underSubitem', async () => {
        await helpLogic.openHelpPanelAndCheckOpenedUnderSubitem('Configure CPL Import Settings',
            'Column Mapping');
    });

    xit('should exact number and exact names for columns', async () => {
        await cplImportLogic.mappingFieldsChecking();
    });

    it('should be options list for Column Mapping setting section', async () => {
        const expectOptions: string[] =  [ 'Unknown', 'Not Mapped', 'Corp Name', 'Corp P/N Desc', 'Mfr P/N Desc', 'CPL Comments',
            'Generic Number', 'Corp Part Status', 'Mfr Part Status', 'CPL Custom 1', 'CPL Custom 2',
            'CPL Custom 3', 'CPL Custom 4', 'CPL Custom 5', 'CPL Custom 6', 'CPL Custom 7',
            'CPL Custom 8', 'CPL Custom 9', 'CPL Custom 10' ];
        await importLogic.columnMappingOptionsChecking(expectOptions);
        await importLogic.closeOptionModalWithX();
    });

    it('should open CPL Alert Notifications setting section and check title and subtitle in opened modal', async () => {
        const title: string = 'Select CPL Alert Notifications (Subscribe)';
        const subtitle: string = 'Add or remove email addresses to receive alert ' +
            'notifications for the imported CPL';
        await cplImportLogic.openOptionModalByTitle(cplImportData.settingTitles[2]);
        await expect(await importElements.optionModalTitle.getText()).toEqual(title);
        await expect(await importElements.alertNotificationOptions.alertNotifSubtitle.getText()).toEqual(subtitle);
    });

    it('should open help panel and check opened subitem/underSubitem', async () => {
        await helpLogic.openHelpPanelAndCheckOpenedUnderSubitem('Configure CPL Import Settings',
            'CPL Alert Notifications');
    });

    it('should be Alert Notifications Email Address(es) section with field for email address(es)', async () => {
        await importLogic.checkAlertNotifEmailAddressField();
    });

    it('should be Alert Notifications Email Alert Type section with checkboxes', async () => {
        await importLogic.checkAlertNotifCheckboxes();
    });

    it('should be validation in Email Address(es) field and check that Search button stay inactive', async () => {
        await importLogic.invalidEmailChecking();
    });

    it('should be option to add valid email and check that Search button became active if search field have ' +
        'validate email address', async () => {
        await importLogic.addEmail();
    });

    it('should be validation on existed email', async () => {
        await importLogic.existedEmailChecking();
    });

    it('should save CPL Alert Notifications setting', async () => {
        await cplImportLogic.saveAlertOptions();
    });

    it('should be CPL Import Options section', async () => {
        await cplImportLogic.checkingCplImportOptionsSection();
    });

    it('should change CPL Import Options', async () => {
        await cplImportLogic.changeStatusImportOption();
    });

    it('should open help panel and check opened subitem/underSubitem', async () => {
        await helpLogic.openHelpPanelAndCheckOpenedUnderSubitem('Configure CPL Import Settings',
            'CPL Import Options');
    });

    it('should be validation errors', async () => {
        await modal.openModalWithButtonByName(buttonNames.remove);
        await modal.closeModalWithButton(buttonNames.clear);
        await browser.sleep(2000);
        await cplImportLogic.validationErrorChecking();
    });

    it('should be reload CPL button', async () => {
        await cplImportLogic.reloadCplChecking();
    });

    it('should be preview and validate page', async () => {
        await modal.openModalWithButtonByName(buttonNames.remove);
        await modal.closeModalWithButton(buttonNames.clear);
        await browser.sleep(2000);
        await cplImportLogic.previewAndValidateChecking();
    });
});