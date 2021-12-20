import {Actions} from "../../utils/actions";
import {allureStep} from "../../helper/allure/allureSteps";
import {Button} from "../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, columnHeaders, headerItems, meganavItems, modalTitles, titles} from "../../testData/global";
import {
    commonElements,
    dropdownElements,
    importElements,
    gridElements,
    pageTitles,
    quickSearchElements,
    headerElements, settings, cplImportElements, bomElements, bomVaultElements
} from "../../elements/elements";
import {Dropdown} from "../../components/dropdown";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Grid} from "../../components/grid";
import {Input} from "../../components/simple/input";
import {importItems} from "../../testData/import";
import {Link} from "../../components/simple/link";
import {Meganav} from "../../components/meganav";
import {Modal} from "../../components/modal";
import {Random} from "../../utils/random";
import {Waiters as w} from "../../helper/waiters";
import {columnIdByColumnName} from "../../testData/columnIdByColumnName";
import {JsScripts} from "../../utils/jsScripts";
import {Toolbar} from "../../components/toolbar";

const actions: Actions = new Actions();
const button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const input = new Input();
const link: Link = new Link();
const meganav = new Meganav();
const modal = new Modal();
const random: Random = new Random();
const toolbar: Toolbar = new Toolbar();

export class ImportLogic {

    validXlsFileCplGrowler: string;
    validXlsFileCpl: string;
    validXlsFileBomImport: string;
    validXlsFileBomImportOneSheet: string;
    emptyCsv: string;
    emptyXls: string;
    emptyXlsx: string;
    headerOnlyCsv: string;
    headerOnlyXls: string;
    headerOnlyXlsx: string;
    headerThirdRowCsv: string;
    headerThirdRowXls: string;
    headerThirdRowXlsx: string;
    validBomQty0XlsFileBomImport: string;
    validBomQtyAbcXlsFileBomImport: string;
    validBomQtyMinus1XlsFileBomImport: string;
    validBomQtySpecCharXlsFileBomImport: string;
    validXlsxFileBomImport: string;
    validBomHeaderFrenchCharHeaderXlsFileBomImport: string;
    indentured: string;

    constructor() {
        this.validXlsFileCplGrowler = './../../../testData/files/import/AutomationCPLGrowler.xls';
        this.validXlsFileCpl = './../../../testData/files/import/AutomationCPL.xls';
        this.validXlsFileBomImport = './../../../testData/files/import/AutoRegBOM.xls';
        this.validXlsxFileBomImport = './../../../testData/files/import/test-indenture-300-deep.xlsx';
        this.validBomQty0XlsFileBomImport = './../../../testData/files/import/AutoRegBOMQty0.xls';
        this.validBomQtyAbcXlsFileBomImport = './../../../testData/files/import/AutoRegBOMQtyAbc.xls';
        this.validBomQtyMinus1XlsFileBomImport = './../../../testData/files/import/AutoRegBOMQtyMinus1.xls';
        this.validBomQtySpecCharXlsFileBomImport = './../../../testData/files/import/AutoRegBOMQtySpecChar.xls';
        this.validBomHeaderFrenchCharHeaderXlsFileBomImport = './../../../testData/files/import/AutoRegBOMHeaderFrenchChar.xlsx';
        this.validXlsFileBomImportOneSheet = './../../../testData/files/import/AutoRegBOM1.xls';
        this.emptyCsv = './../../../testData/files/import/Automation_Empty_CSV.csv';
        this.emptyXls = './../../../testData/files/import/Automation_Empty_Xls.xls';
        this.emptyXlsx = './../../../testData/files/import/Automation_Empty_Xlsx.xlsx';
        this.headerOnlyCsv = './../../../testData/files/import/Automation_Header_Only_CSV.csv';
        this.headerOnlyXls = './../../../testData/files/import/Automation_Header_Only_Xls.xls';
        this.headerOnlyXlsx = './../../../testData/files/import/Automation_Header_Only_Xlsx.xlsx';
        this.headerThirdRowCsv = './../../../testData/files/import/Automation_Header_Only_Third_Row_CSV.csv';
        this.headerThirdRowXls = './../../../testData/files/import/Automation_Header_Only_Third_Row_Xls.xls';
        this.headerThirdRowXlsx = './../../../testData/files/import/Automation_Header_Only_Third_Row_Xlsx.xlsx';
        this.indentured = './../../../testData/files/import/Automation_indentured.xlsx';
    };

    public async goToStep1() {
        await allureStep('Go to 1st step Import', async () => {
            //await browser.waitForAngularEnabled(false);
            await w.waitUntilWorkingModalNotDisplayed();
            await button.clickButtonWithJS('#print-details', importElements.step1EnableBox);
        });
    };

    public async uploadAValidFileToImport() {
        await input.uploadAFile(importElements.uploadFileInput, this.validXlsFileBomImport);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(importElements.step1EnableBox);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.remove));
        await w.waitUntilWorkingModalNotDisplayed();
    };

    public async uploadAValidFileToImportToCheckHierarchy() {
        await input.uploadAFile(importElements.uploadFileInput, this.validXlsxFileBomImport);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(importElements.step1EnableBox);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.remove));
    };

    public async uploadAValidFileByName(file: string) {
        await input.uploadAFile(importElements.uploadFileInput, file);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(importElements.step1EnableBox);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.remove));
    };

    public async goToPreviewAndValidate() {
        await button.clickByButtonName(buttonNames.previewAndValidate);
        await this.skipIgnoreExistedBomNameModal();
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
    };

    public async VerifyIfErrorIsPresent() {
        await allureStep('Verify if import validation errors are displayed', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilWorkingModalNotDisplayed();
            let error:string = await importElements.validationErrorTitle.getText();
            if (error.includes('Error')) {
                await expect(await importElements.validationErrorTitle.getText()).toContain('Error');
                await expect(await importElements.validationErrorTitle.getText()).toBeFalsy();
            } else {
                await expect(await button.returnButtonByText(buttonNames.confirmAndImport).isEnabled()).toBeTruthy();
            }
        });
    };

    public async confirmImportBom() {
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.confirmAndImport));
        await button.clickByButtonName(buttonNames.confirmAndImport);
        await w.waitUntilElementIsDisplayed(button.returnButtonByText(buttonNames.viewBom));
    };


    public async skipIgnoreExistedBomNameModal() {
        await browser.sleep(1000);
        if (await button.returnButtonByText(buttonNames.yesContinueWithMyBomName).isPresent()) {
            await button.clickByButtonName(buttonNames.yesContinueWithMyBomName);
            await w.waitUntilElementNotDisplayed(modal.modalTitle);
        }
    };

    public async cancelImport(buttonName: string) {
        await modal.openModalWithButtonByName(buttonName);
        await modal.closeModalWithButton(buttonNames.yesCancelImport);
        await w.waitUntilElementIsClickable(importElements.browseButton);
    };

    public async removeFile() {
        await modal.openModalWithButtonByName(buttonNames.remove);
        await modal.closeModalWithButton(buttonNames.clear);
        await w.waitUntilElementIsClickable(importElements.browseButton);
    };

    public async uploadAValidFileToBomImportWithOneSheet() {
        await input.uploadAFile(importElements.uploadFileInput, this.validXlsFileBomImportOneSheet);
        await w.waitUntilElementIsDisplayed(importElements.step1EnableBox);
    };

    public async selectSaveConfigByName(name: string) {
        await browser.sleep(1000)
        const rowAmount: number = await importElements.savedConfRows.count();
        for (let i: number = 0; i < rowAmount; i++) {
            if (await importElements.savedConfNameByRowNumber(i).getText() === name) {
                await browser.executeScript('document.querySelectorAll(\'import-configuration-list .radio label\')[' + i + '].click()');
                break
            }
        }
        await w.waitUntilElementIsDisplayed(importElements.step1EnableBox);
        await browser.sleep(1000);
    };

    public async openOptionModalByTitle(optionTitle: string) {
        await allureStep('Open ' + optionTitle + ' option', async () => {
            let optionTitlesText = await importElements.optionTitle.getText();
            for (let i: number = 0; i < optionTitlesText.length; i++) {
                if (optionTitlesText[i] === optionTitle) {
                    await browser.executeScript("document.querySelectorAll('.tab-title, .data-ct>h2')[" + i + "].scrollIntoView()");
                    await button.clickOnTheElement(importElements.optionTitle.get(i));
                    await w.waitUntilElementIsDisplayed(importElements.optionModalTitle);
                    await w.waitUntilElementIsClickable(importElements.optionModalTitle);
                    await w.waitUntilElementIsClickable(importElements.optionModalBody);
                    await w.waitUntilWorkingModalNotDisplayed();
                    await expect(await elementAttributes.getElementAttribute(importElements.optionsContainer.get(i), 'class'))
                        .toEqual('config-data-ct');
                    break
                }
            }
        });
    };

    public async checkModalTitle(title: string) {
        await allureStep('Check modal title and subtitle Import option modal', async () => {
            await expect(await importElements.optionModalTitle.getText()).toEqual(title);
        })
    };

    public async closeOptionModalWithX() {
        await allureStep('Close Import option modal with X', async () => {
            await button.clickOnTheElement(importElements.optionModalX);
            await w.waitUntilElementNotDisplayed(importElements.optionModalTitle);
            await w.waitUntilElementNotDisplayed(importElements.optionModalBody);
        })
    };

    public async closeOptionModalWithButtonName(buttonName: string) {
        await allureStep('Close Import option modal with ' + buttonName, async () => {
            await button.clickByButtonName(buttonName);
            await w.waitUntilElementNotDisplayed(importElements.optionModalTitle);
            await w.waitUntilElementNotDisplayed(importElements.optionModalBody);
        })
    };

    public async leaveImportWitLeaveModal() {
        await meganav.goToFeatureWithMeganav(meganavItems.home, modal.modalBody);
        await button.clickByButtonName(buttonNames.leaveAndDiscardUnsavedChanges);
        await w.waitUntilElementNotDisplayed(modal.modalBody);
    };

    public async closeLeaveModalIfPresent() {
        if(await button.returnButtonByText(buttonNames.leaveAndDiscardUnsavedChanges).isPresent()) {
            await button.clickByButtonName(buttonNames.leaveAndDiscardUnsavedChanges);
            await w.waitUntilElementNotDisplayed(modal.modalBody);
        }
    };

    async notCreateVaultFolder() {
        await w.waitUntilElementIsClickable(await button.returnButtonByText(buttonNames.addNewFolder));
        await modal.openModalWithButtonByName(buttonNames.addNewFolder);
        await input.fillFieldWithValue(importElements.destinationFolder.folderNameInput, 'VaUlT');
        await button.clickByButtonName(buttonNames.yesAddThisFolder);
        await w.waitUntilElementIsDisplayed(modal.returnModalTitleByName(modalTitles.invalidFolderName));
        const text = 'You cannot create a new folder called "Vault". Please enter a valid folder name.';
        await expect(await modal.severalModalBodies.get(1).getText()).toEqual(text);
        await button.clickByButtonName(buttonNames.okayThanks);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.cancelDoNotAddNewFolder));
        await button.clickByButtonName(buttonNames.cancelDoNotAddNewFolder);
        await w.waitUntilElementNotDisplayed(await modal.returnModalTitleByName(modalTitles.addNewFolder));
    };

    public async dragAndDropBoxChecking(text: string) {
        let dragAndDropText = await importElements.dragAndDropText.getText();
        let temp = dragAndDropText.replace(/\n/g, " ");
        await expect(temp).toEqual(text);
        await expect(importElements.browseButton.isDisplayed()).toBeTruthy();
    };

    public async cancelWithoutUploadSimpleImport(buttonName = buttonNames.cancelImport) {
        await button.clickByButtonName(buttonName);
        await modal.closeModalWithButton(buttonNames.yesCancelImport);
        await w.waitUntilElementIsDisplayed(gridElements.grid);
        await expect(pageTitles.pageTitle.getText()).toEqual(titles.viewAllBoms);
    };

    private async _checkInvalidFile(fileName: string, inputField: any) {
        await input.uploadAFile(inputField, fileName);
        await w.waitUntilElementNotDisplayed(importElements.analyzeModalText);
        await w.waitUntilElementIsDisplayed(importElements.invalidFileModalTitle);
        await w.waitUntilElementIsDisplayed(modal.modalBody);
        await expect(await importElements.cancelModalText.get(0).getText()).toEqual('The import file you have selected is not in a valid format.' +
            ' The file needs a header row and at least one row of import data.');
        await modal.closeModalWithXButton();
    };

    public async uploadEmptyFiles(input: any = importElements.uploadFileInput) {
        await this._checkInvalidFile(this.emptyCsv, input);
        await this._checkInvalidFile(this.emptyXlsx, input);
        await this._checkInvalidFile(this.emptyXls, input);
    };

    public async uploadHeaderOnlyFiles(input: any = importElements.uploadFileInput) {
        await this._checkInvalidFile(this.headerOnlyCsv, input);
        await this._checkInvalidFile(this.headerOnlyXls, input);
        await this._checkInvalidFile(this.headerOnlyXlsx, input);
    };

    public async uploadHeaderOnlyNotFirstRowFiles(input: any = importElements.uploadFileInput) {
        await this._checkInvalidFile(this.headerThirdRowCsv, input);
        await this._checkInvalidFile(this.headerThirdRowXls, input);
        await this._checkInvalidFile(this.headerThirdRowXlsx, input);
    };

    public async vaultForBomName() {
        await input.fillFieldWithValue(importElements.bomNameField, 'Vault');
        await modal.openModalWithElement(importElements.descriptionField);
        await expect(await modal.modalTitle.getText()).toEqual('Invalid BOM Name');
        const text = 'The BOM name cannot be blank or "Vault". Please enter a valid name for this BOM.';
        await expect(await modal.modalBody.getText()).toEqual(text);
        await modal.closeModalWithXButton();
    };

    public async setBomName() {
        await input.fillFieldWithValue(importElements.bomNameField, importItems.bomImportName);
    };

    public async setExactBomName(bomName: string) {
        await input.fillFieldWithValue(importElements.bomNameField, bomName);
    };

    public async setColumnNumberOnRow(value: string) {
        await input.fillFieldWithValue(importElements.columnNumberOnRow, value);
    };

    public async setWorksheet(optionName: string) {
        await button.clickOnTheElement(importElements.worksheet);
        await w.waitUntilElementIsClickable(importElements.worksheetOptions.get(0));
        const optionNames: any = await importElements.worksheetOptions.getText();
        for (let i: number = 0; i < optionNames.length; i++) {
            if (optionNames[i] === optionName) {
                await button.clickOnTheElement(importElements.worksheetOptions.get(i));
            }
        }
    };

    public async returnWorksheetValue() {
        return importElements.worksheetSelectedOption.getText();
    };

    public async saveConfig(name: string) {
        await JsScripts.scrollToElement(button.returnButtonByText(buttonNames.saveAsNewWithSmallA))
        await button.clickByButtonName(buttonNames.saveAsNewWithSmallA);
        await w.waitUntilElementIsClickable(importElements.savedConfName);
        await input.fillFieldWithValue(importElements.savedConfName, name);
        await button.clickByButtonName(buttonNames.save);
        await w.waitUntilElementIsClickable(importElements.step1EnableBox);
    };

    public async mappingFieldsChecking() {
        await expect(await importElements.columnMappingLine.count()).toEqual(3);
        await expect(await importElements.columnMappingLine.get(0).getText()).toEqual('Map ' + importItems.column1 + ' to:');
        await expect(await importElements.columnMappingLine.get(1).getText()).toEqual('Map ' + importItems.column2 + ' to:');
        await expect(await importElements.columnMappingLine.get(2).getText()).toEqual('Map ' + importItems.column3 + ' to:');
    };

    async columnMappingOptionsChecking(expectOptions) {
        await Dropdown.openDropdownByClickOnElement(importElements.columnMappDropdown.get(0));
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectOptions);
        await Dropdown.closeDropdownByClickOnElement(importElements.columnMappDropdown.get(0));
    };

    async checkAlertNotifCheckboxes() {
        const checkboxLabels = ['End of Life Notice', 'Product Change Notice',
            'Part Status Change', 'Product Failure/Counterfeit Notice'];
        await expect(await importElements.alertNotificationOptions.alertNotifOptionSegmentTitle.get(1).getText())
            .toEqual('Email Alert Type:');
        await expect(await importElements.alertNotificationOptions.alertNotifCheclboxesLabel.getText()).toEqual(checkboxLabels);
    };

    async checkAlertNotifEmailAddressField() {
        await expect(await importElements.alertNotificationOptions.alertNotifOptionSegmentTitle.get(0).getText())
            .toEqual('Add Alert Notification Email Address(es):');
        await expect(await elementAttributes.getElementAttribute(importElements.alertNotificationOptions.emailInput,
            'placeholder')).toEqual('Enter email address');
        await expect(await importElements.alertNotificationOptions.emailCharactersCount.getText())
            .toEqual('Characters remaining 70 of 70');
    };

    async invalidEmailChecking() {
        await input.fillFieldWithValue(importElements.alertNotificationOptions.emailInput, 'sdfsdfsdfdsfsd');
        await expect(await importElements.alertNotificationOptions.emailValidationMessage.get(0).getText())
            .toEqual('That\'s not a valid email address!');
        await expect(await importElements.alertNotificationOptions.emailValidationMessage.get(0).isDisplayed()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.addEmail).isEnabled()).toBe(false);
    };

    async addEmail() {
        await input.fillFieldWithValue(importElements.alertNotificationOptions.emailInput, importItems.validEmail);
        await expect(await button.returnButtonByText(buttonNames.addEmail).isEnabled()).toBe(true);
        await button.clickByButtonName(buttonNames.addEmail);
        await expect(await importElements.alertNotificationOptions.addedEmail.getText()).toEqual([importItems.validEmail]);
    };

    public async existedEmailChecking() {
        await input.fillFieldWithValue(importElements.alertNotificationOptions.emailInput, importItems.validEmail);
        await expect(await button.returnButtonByText(buttonNames.addEmail).isEnabled()).toBe(true);
        await button.clickByButtonName(buttonNames.addEmail);
        await w.waitUntilElementIsClickable(importElements.alertNotificationOptions.emailValidationMessage.get(0));
        await expect(await importElements.alertNotificationOptions.emailValidationMessage.get(0).getText())
            .toEqual('This email address is already in the list!');
    };

    public async saveAlertOptions() {
        await button.clickByButtonName(buttonNames.saveSubs);
        await w.waitUntilElementNotDisplayed(importElements.optionModalBody);
        await actions.mouseMoveToElementAndWaitForTooltip(importElements.alertNotificationOptions.alertNotifOptions,
            commonElements.popoverContent.get(0));
        await expect(await commonElements.popoverContentParagP.getText()).toEqual([importItems.validEmail]);
        await actions.mouseMoveToElement(button.returnButtonByText(buttonNames.remove))
    };

    public async optionalAttributesFieldsChecking() {
        const attributeSubtitleText = 'Attributes are information about the file, such' +
            ' as contact information and any custom attributes set for the account.' +
            ' This information does not include parts or manufacturers.';
        await expect(await importElements.optionalAttributes.optionalAttriutesSubtitle.getText()).toEqual(attributeSubtitleText);
        const filedLabel = ['Contact:', 'Phone:', 'IPN:', 'Assembly:', 'Quantity:', 'Custom 1:', 'Custom 2:'];
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await importElements.optionalAttributes.optionalAttriutesFieldTitles.getText()).toEqual(filedLabel);
        await expect(await importElements.optionalAttributes.optionalAttriutesFieldInputs.count()).toEqual(await filedLabel.length);
    };

    private async _internalCnacelChecking(cancelButton: any) {
        await input.fillFieldWithValue(importElements.optionalAttributes.optionalAttriutesFieldInputs, '11');
        await button.clickOnTheElement(cancelButton);
        await w.waitUntilElementNotDisplayed(importElements.optionTitle);
        await expect(await elementAttributes.getElementAttribute(importElements.optionalAttributes.optionalAttributesOptions,
            'class')).toContain('completed');
        await this.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[5]);
        let elemClass = await importElements.optionalAttributes.optionalAttriutesFieldInputs.getAttribute('value');
        for (let i = 0; i < elemClass.length; i++) {
            await expect(elemClass[i].length).toEqual(0);
        }
    };

    public async cancelOptionalAttributesChecking() {
        await this._internalCnacelChecking(button.returnButtonByText(buttonNames.cancelDoNotSave));
        await this._internalCnacelChecking(importElements.optionModalX);
    };

    async checkFieldLimitation(option, charsAmount) {
        await input.fillFieldWithValue(importElements.optionalAttributes.optionalAttriutesFieldInputs.get(option), random.randomTextGenerator(charsAmount) + 2);
        await expect(await importElements.optionalAttributes.optionalAttriutesFieldCounters.get(option).getText()).toEqual('Characters remaining 0 of ' + charsAmount);
        let elemClass = await importElements.optionalAttributes.optionalAttriutesFieldInputs.get(option).getAttribute('value');
        await expect(elemClass.length).toEqual(charsAmount);
    };

    async quantityFieldChecking() {
        await input.fillFieldWithValue(importElements.optionalAttributes.optionalAttriutesFieldInputs.get(4),
            'sdfdsfd78');
        await expect(await importElements.optionalAttributes.optionalAttriutesFieldCounters.get(4).getText())
            .toEqual('Characters remaining 8 of ' + 10);
        await input.fillFieldWithValue(importElements.optionalAttributes.optionalAttriutesFieldInputs.get(4),
            '1876598311');
        await expect(await importElements.optionalAttributes.optionalAttriutesFieldCounters.get(4).getText())
            .toEqual('Characters remaining 0 of ' + 10);
        let elemClass = await importElements.optionalAttributes.optionalAttriutesFieldInputs.get(4).getAttribute('value');
        await expect(elemClass.length).toEqual(10);
    };

    public async saveOptionalAttributes() {
        let elemeValue = await elementAttributes.getElementAttribute(importElements.optionalAttributes.optionalAttriutesFieldInputs,
            'value');
        elemeValue = elemeValue.filter((item) => {
            return item.length > 0
        });
        await button.clickByButtonName(buttonNames.saveOptionsAttributes);
        await w.waitUntilElementNotDisplayed(importElements.optionModalBody);
        await expect(await elementAttributes.getElementAttribute(importElements.optionalAttributes.optionalAttributesOptions,
            'class')).toContain('completed');
        await actions.mouseMoveToElementAndWaitForTooltip(importElements.optionalAttributes.optionalAttributesOptions,
            commonElements.popoverContent.get(0));
        let popoverText = await commonElements.popoverContentParagP.getText();
        for (let i = 0; i < elemeValue.length; i++) {
            await expect(popoverText[i]).toContain(elemeValue[i]);
        }
    };

    public async importBom() {
        await browser.sleep(500);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.importBom));
        await button.clickByButtonName(buttonNames.importBom);
        await w.waitUntilElementIsDisplayed(button.returnButtonByText(buttonNames.viewBom));
    };

    public async showImportedBomInVault() {
        await browser.waitForAngularEnabled(false);
        await button.clickByButtonName(buttonNames.viewBom);
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(500);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(gridElements.grid);
        await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(2));
        await w.waitUntilElementIsClickable(gridElements.newGridLockedColumnCellsWithContent.get(1));
        await expect(importElements.importedBomName(importItems.bomImportName).isDisplayed()).toBeTruthy();
    };

    public async showImportedBomInVaultByName(bomName: string) {
        await browser.waitForAngularEnabled(false);
        await button.clickByButtonName(buttonNames.viewBom);
        await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(0));
        await w.waitUntilElementIsClickable(gridElements.newGridLockedColumnCellsWithContent.get(1));
        await button.clickByButtonNameAndWait(buttonNames.refresh, gridElements.newGridRows.get(0));
        await expect(importElements.importedBomName(bomName).isDisplayed()).toBeTruthy();
    };

    public async showImportedBomsInVaultByNames(bomNames: string[]) {
        await browser.waitForAngularEnabled(false);
        await button.clickByButtonName(buttonNames.viewBom);
        await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(0));
        await w.waitUntilElementIsClickable(gridElements.newGridLockedColumnCellsWithContent.get(1));
        await button.clickByButtonNameAndWait(buttonNames.refresh, gridElements.newGridRows.get(0));
        for (let i: number = 0; i < bomNames.length; i++) {
            await expect(importElements.importedBomName(bomNames[i]).isDisplayed()).toBeTruthy();
        }
    };

    public async importAnotherBOM() {
        await browser.waitForAngularEnabled(false);
        await button.clickByButtonName(buttonNames.importAnotherBOM);
        await w.waitUntilElementIsDisplayed(importElements.aboutImport);
        await w.waitUntilElementIsClickable(importElements.aboutImport);
    };

    public async waitingForProcessedStatus() {
        async function checking() {
            let names: string[] = await grid.newGridReturnCellValuesByColumnName(0, 'BOM Name');
            let status: string[] = await grid.getCellValuesByCellId(columnIdByColumnName.bomVault['matchStatus']);
            let index:number = names.indexOf(importItems.bomImportName);
            if (index!== -1 && status[index] !== 'Processed') {
                await button.clickOnTheElement(toolbar.returnToolbarButtonByValue(buttonNames.refresh));
                await w.waitUntilWorkingModalNotDisplayed();
                await w.waitUntilElementIsDisplayed(gridElements.newGridCheckboxSelector.last());
                await w.waitUntilElementIsClickable(gridElements.newGridLockedColumnCellsWithContent.get(1));
                await checking();
            }
        }

        await checking();
    };

    public async deleteImportedBom() {
        await browser.waitForAngularEnabled(false);
        await w.waitUntilDomIsReady();
        await w.waitUntilElementIsClickable(gridElements.selectAllCheckbox);
        await browser.sleep(2000);
        await grid.newGridSelectRowWithMatchValue(0, columnHeaders.columnHeaderNames.newGrid[1],
            importItems.bomImportName);
        // await grid.checkCheckboxRange(0, 1);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.yesDeleteSelectedItems);
        // await w.waitUntilElementIsDisplayed(quickSearchElements.loading);
        await w.waitUntilElementIsDisplayed(gridElements.checkboxSelector.get(1));
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await browser.sleep(2000);
        await expect(link.returnElementByLinkName(importItems.bomImportName).isPresent()).toBeFalsy();
        async function checking() {
            let names: string[] = await grid.newGridReturnCellValuesByColumnName(0, 'BOM Name');

            let index:number = names.indexOf(importItems.bomImportName);
            if (index!== -1) {
                await button.clickOnTheElement(toolbar.returnToolbarButtonByValue(buttonNames.refresh));
                await w.waitUntilWorkingModalNotDisplayed();
                await w.waitUntilElementIsDisplayed(gridElements.newGridCheckboxSelector.last());
                await w.waitUntilElementIsClickable(gridElements.newGridLockedColumnCellsWithContent.get(1));
                await checking();
            }
        }

        await checking();
    };

    public async waitForDisapperDeletedBom(bomName: string) {
        await w.waitUntilElementIsDisplayed(gridElements.newGridLockedColumnRowCellsWithContent(0).get(1));

        async function checking() {
            let text: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(1).getText();
            if (text === bomName) {
                await button.clickByButtonName(buttonNames.refresh);
                await w.waitUntilWorkingModalNotDisplayed();
                await checking();
            }

        }

        await checking();
    };

    public async setAmlOn() {
        await this.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[3]);
        let checkAmlCheckbox = await elementAttributes.getElementAttribute(importElements.importOptions.amlCheckboxInput,
            'checked');
        if (checkAmlCheckbox === null) {
            await importElements.importOptions.amlCheckboxLabel.click();
            await button.clickByButtonName(buttonNames.saveImportOptions);
            await w.waitUntilElementNotDisplayed(importElements.optionModalBody);
        }
        else {
            await this.closeOptionModalWithX();
        }
    };

    public async reimportBom() {
        await modal.openModalWithButtonByName(buttonNames.reimport);
        await modal.closeModalWithButton(buttonNames.yesContinueImporting)
    };

    public async dragAndDropBoxTextChecking(text: string) {
        await w.waitUntilElementIsDisplayed(await importElements.dragAndDropText);
        const dragAndDropText: string = await importElements.dragAndDropText.getText();
        const temp: string =await dragAndDropText.replace(/\n/g, " ");
        await expect(temp).toEqual(text);
    };

    public async verifyAndDeleteSavedImportConfig(configName:string){
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsClickable(settings.bomImportSettings.savedConfigs);
        await button.clickOnTheElement(settings.bomImportSettings.savedConfigs);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsClickable(gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        let xssDescriptiontext = await grid.newGridReturnCellValuesByColumnName(1, 'Description');
        await expect(xssDescriptiontext[0])
            .toEqual("This is a test");
        await grid.newGridSelectRowWithMatchValue(0,'Name',configName);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.yesContinueWIthMyDelete)

    }

    public async verifyValidationError(configName:string){
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsClickable(settings.bomImportSettings.savedConfigs);
        await button.clickOnTheElement(settings.bomImportSettings.savedConfigs);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsClickable(gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        let xssDescriptiontext = await grid.newGridReturnCellValuesByColumnName(1, 'Description');
        await expect(xssDescriptiontext[0])
            .toEqual("This is a test");
        await grid.newGridSelectRowWithMatchValue(0,'Name',configName);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.yesContinueWIthMyDelete)

    }

    public async openCloseIndenturedBom(){
        await JsScripts.clickByCssAndNumber('.ag-row-first .expand-trigger-icon', 0);
        await w.waitUntilElementNotDisplayed(bomVaultElements.bomTreeParts.subAssembly);
    }
}
