import {Button} from "../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, linksNames, meganavItems, titles, tooltips} from "../../../../testData/global";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {importElements, modalElements, pageTitles} from "../../../../elements/elements";
import {importItems} from "../../../../testData/import";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";

const elementAttributes: ElementAttributes = new ElementAttributes();
const button: Button = new Button();
const helpLogic: HelpLogic = new HelpLogic();
const importLogic: ImportLogic = new ImportLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();

describe('Bom Import', () => {

    it('should go to import page from meganav', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await expect(await pageTitles.aboutImportPageTitle.getText()).toEqual(titles.bomImport);
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('BOM Import');
    });

    it('should open help panel and check title', async () => {
        await helpLogic.openAndCheckHelpPanelTitle('About BOM import');
    });

    it('should have visual indicator with steps and do not show', async () => {
        const steps = ['ABOUT BOM IMPORT', '1-STEP BOM IMPORT', 'PREVIEW AND VALIDATE', 'IMPORT COMPLETE!'];
        await expect(await importElements.stepsLabels.getText()).toEqual(steps);
        const label = 'Do not show this page again. Go directly to 1-Step BOM Import';
        await expect(await importElements.doNotShowCheckboxLabel.getText()).toEqual(label);
        const titles = ['About BOM Import (this page):', '1-Step BOM Import:', 'Preview & Validate Import:',
            'Import Complete!'];
        await expect(await importElements.aboutColumnTitles.getText()).toEqual(titles);
    });

    it('should have description for about bom import', async () => {
        const aboutDesc = 'Import your Bill of Materials (BOM) file in a single' +
            ' step, using this simple yet powerful import process. ' +
            'Review simple instructions about the import process for an overview of what you need to do.';
        await expect(await importElements.descSteps.get(0).getText()).toEqual(aboutDesc);
    });

    it('should have description for 1-Step BOM Import', async () => {
        const firstStepDesc = 'Select a BOM file to import, select a previously saved import ' +
            'configuration for importing your BOM file, and then import your BOM. You can also modify' +
            ' an existing saved import configuration or create a new saved import configuration. ' +
            'Saved configurations greatly reduce the amount of time required to import a BOM.';
        await expect(await importElements.descSteps.get(1).getText()).toEqual(firstStepDesc);
    });

    it('should have description for Preview & Validate Import', async () => {
        const previewDesc = 'Launch a preview of the file you are importing, as it will appear in' +
            ' BOM Intelligence after the import process is complete. This capability helps prevent ' +
            'mismatched columns and other common importing errors.';
        await expect(await importElements.descSteps.get(2).getText()).toEqual(previewDesc);
    });

    it('should have description for Import Complete', async () => {
        const completeDesc = 'View a summary of the import selections applied to the BOM import file.';
        await expect(await importElements.descSteps.get(3).getText()).toEqual(completeDesc);
    });

    it('should go to step-1 by clicking on the next button', async () => {
        await importLogic.goToStep1();
    });

    it('should be drag and drop box', async () => {
        const dragDropText = 'Drag and drop a BOM (Bill of Materials) ' +
            'file here, or click Browse and select a file from your computer.';
        await importLogic.dragAndDropBoxChecking(dragDropText)
    });

    it('should be option View sample BOM file', async () => {
        await modal.openModalWithLinkName(linksNames.viewSampleBomFile);
        await expect(await modal.modalTitle.getText()).toEqual('Sample BOM File');
    });

    it('should open Sample BOM File modal, open help panel and check title', async () => {
        await helpLogic.openAndCheckHelpPanelTitle('1-Step BOM Import');
        await modal.closeModalWithXButton();
    });

    it('should go to View All BOMs when cancel CPL Import without uploading a file', async () => {
        await importLogic.cancelWithoutUploadSimpleImport();
    });

    it('should upload a file', async () => {
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
    });

    it('should be remove modal', async () => {
        await modal.openModalWithButtonByName(buttonNames.remove);
        await expect(await modal.modalTitle.getText()).toEqual('Clear File');
        const modalText = 'NOTE: clicking CLEAR will clear the selected ' +
            'BOM File and disable selections. Selections will be enabled if you select another file.';
        await expect(await modalElements.modalBodyParagNew.get(0).getText()).toEqual(modalText);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.remove);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should be option to remove file', async () => {
        await importLogic.removeFile();
        await expect(button.returnButtonByText(buttonNames.remove).isPresent()).toBeFalsy();
    });

    it('should be cancel Import modal', async () => {
        await importLogic.uploadAValidFileToImport();
        await modal.openModalWithButtonByName(buttonNames.cancelImport);
        const cancelMidalTitle = 'Cancel BOM Import?';
        await expect(await modal.modalTitle.getText()).toEqual(cancelMidalTitle);
        const cancelModalText = ['Are you sure you want to CANCEL this BOM Import?',
            'Click YES to cancel this import and start again.',
            'Click NO to return to the BOM Import process and continue the import.'];
        await expect(await importElements.cancelModalImportText.getText()).toEqual(cancelModalText);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.cancelImport);
        await modal.closeModalWithButton(buttonNames.noDoNotCancel)
    });

    it('should cancel Import with uploaded file', async () => {
        await importLogic.cancelImport(buttonNames.cancelImport);
        await expect(button.returnButtonByText(buttonNames.remove).isPresent()).toBeFalsy();
    });

    it('should be warning modal when upload empty files', async () => {
        await importLogic.uploadEmptyFiles();
    });

    it('should be warning modal when upload header only files', async () => {
        await importLogic.uploadHeaderOnlyFiles();
    });

    it('should be warning modal when upload header only not first row files', async () => {
        await importLogic.uploadHeaderOnlyNotFirstRowFiles();
    });

    it('should not be Vault name for BOM', async () => {
        await importLogic.uploadAValidFileToImport();
        await importLogic.vaultForBomName();
    });

    it('should set a Name', async () => {
        await importLogic.setBomName();
    });

    it('should be Configuration sections', async () => {
        await expect(await importElements.optionTitle.getText()).toEqual(importItems.optionTitles.bomImport.optionTitles);
    });

    it('should be tooltips for congiguration attributes', async () => {
        const tooltipsArr = await elementAttributes.getAttributeFromArrayOfElements(importElements.optionalAttributes.configurationItem, 'title');
        await expect(tooltipsArr).toEqual(tooltips.firstStepImportConfigurationPanel);
    });

    it('should open Destination Folder configuration section and check modal title', async () => {
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[0]);
        await expect(await importElements.optionModalTitle.getText()).toEqual('Select Destination Folder');
    });

    it('should open help panel and check title and opened subitem', async () => {
        await helpLogic.openHelpPanelAndCheckTitleAndOpenedSubitem('BOM import options', 'Destination Folder');
    });

    it('should not be Vault name for folder', async () => {
        await importLogic.notCreateVaultFolder();
        await importLogic.closeOptionModalWithX();
    });

    it('should open Column Mapping configuration section and check modal title', async () => {
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[1]);
        await expect(await importElements.optionModalTitle.getText()).toEqual('Select Column Mapping');
    });

    it('should open help panel and check title and opened subitem', async () => {
        await helpLogic.openHelpPanelAndCheckTitleAndOpenedSubitem('BOM import options', 'Column Mapping');
    });

    it('should exact number and exact names for columns', async () => {
        await importLogic.mappingFieldsChecking();
    });

    it('should be options list for column mapping', async () => {
        const expectOptions = ['Unknown', 'Not Mapped', 'Imported Part Description', 'BOM Qty', 'Assembly',
            'Preferred (Y/N)', 'Custom 1', 'Custom 2', 'Reference Designator', 'Indenture Code (NHA)',
            'Indenture Code (Alphanumeric)'];
        await importLogic.columnMappingOptionsChecking(expectOptions);
        await importLogic.closeOptionModalWithX();
    });

    it('should open Alert Notifications configuration section and check modal title', async () => {
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[2]);
        await expect(await importElements.optionModalTitle.getText()).toEqual('Select Alert Notifications (Subscribe)');
    });

    it('should open help panel and check title and opened subitem', async () => {
        await helpLogic.openHelpPanelAndCheckTitleAndOpenedSubitem('BOM import options', 'Alert Notifications');
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

    it('should save alert notifications section', async () => {
        await importLogic.saveAlertOptions();
    });

    it('should open Import Option configuration section and check modal title', async () => {
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[3]);
        await expect(await importElements.optionModalTitle.getText()).toEqual('Select Import Options');
    });

    it('should open help panel and check title and opened subitem', async () => {
        await helpLogic.openHelpPanelAndCheckTitleAndOpenedSubitem('BOM import options', 'Import Options');
        await importLogic.closeOptionModalWithX();
    });

    it('should open CPL Match Options configuration section and check modal title', async () => {
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[4]);
        await expect(await importElements.optionModalTitle.getText()).toEqual('Corporate Parts List (CPL) Match Options');
    });

    it('should open help panel and check title and opened subitem', async () => {
        await helpLogic.openHelpPanelAndCheckTitleAndOpenedSubitem('BOM import options',
            'Corporate Parts List (CPL) Match Options');
        await importLogic.closeOptionModalWithX();
    });

    it('should open Optional Attributes configuration section and check modal title', async () => {
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[5]);
        await expect(await importElements.optionModalTitle.getText()).toEqual('Select Optional Attributes');
    });

    it('should open help panel and check title and opened subitem', async () => {
        await helpLogic.openHelpPanelAndCheckTitleAndOpenedSubitem('BOM import options', 'Optional Attributes');
    });

    it('should be Optional Attributes fields', async () => {
        await importLogic.optionalAttributesFieldsChecking();
    });

    it('should not save field values when cancel optional attributes', async () => {
        await importLogic.cancelOptionalAttributesChecking();
    });

    it('should be option to fill contacnt field and counter should work', async () => {
        await importLogic.checkFieldLimitation(0, 50)
    });

    it('should be option to fill contacnt phone and counter should work', async () => {
        await importLogic.checkFieldLimitation(1, 16)
    });

    it('should be option to fill IPN field and counter should work', async () => {
        await importLogic.checkFieldLimitation(2, 42)
    });

    it('should be option to fill Assembly field and counter should work', async () => {
        await importLogic.checkFieldLimitation(3, 50)
    });

    it('should be option to fill Quantity field and counter should work', async () => {
        await importLogic.quantityFieldChecking()
    });

    it('should be option to fill Custom 1 field and counter should work', async () => {
        await importLogic.checkFieldLimitation(5, 255)
    });

    it('should be option to fill Custom 2 field and counter should work', async () => {
        await importLogic.checkFieldLimitation(6, 255)
    });

    it('should save optional attributes', async () => {
        await importLogic.saveOptionalAttributes();
    });

    it('should import a BOM', async () => {
        await importLogic.importBom()
    });

    it('should show imported BOM in BOM Vault', async () => {
        await importLogic.showImportedBomInVault();
    });

    it('should wait until imported bom be processed and delete', async () => {
        await importLogic.waitingForProcessedStatus();
        await importLogic.deleteImportedBom();
    });

});

