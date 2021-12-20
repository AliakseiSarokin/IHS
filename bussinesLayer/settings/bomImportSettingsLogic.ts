import {Actions} from "../../utils/actions";
import {CheckBox} from "../../components/simple/checkBox";
import {settings, importElements, commonElements, gridElements, headerElements} from "../../elements/elements";
import {buttonNames, fieldStatuses, headerItems, linksNames, titles} from "../../testData/global";
import {SettingsLogic} from "./settingsLogic";
import {ImportLogic} from "../import/importLogic";
import {importItems} from "../../testData/import";
import {ElementAttributes} from "../../utils/elementAttributes";
import {RadioButton} from "../../components/simple/radioButton";
import {browser} from "protractor";
import {Link} from "../../components/simple/link";
import {Button} from "../../components/simple/button";
import {Waiters as w} from "../../helper/waiters";
import {Modal} from "../../components/modal";
import {allureStep} from "../../helper/allure/allureSteps";
import {BomTreeLogic} from "../bomVault/bomTreeLogic";
import {Header} from "../../components/header";
import {Grid} from "../../components/grid";

const grid= new Grid();
const bomTreeLogic = new BomTreeLogic();
const modal = new Modal();
const button = new Button();
const link = new Link();
const radioButton = new RadioButton();
const elementAttributes = new ElementAttributes();
const importLogic = new ImportLogic();
const settingsLogic = new SettingsLogic();
const checkbox = new CheckBox();
const actions:Actions = new Actions();

export class BomImportSettingsLogic {

    async kbOptionChecking (type: string) {
        await radioButton.checkRadioButtonByLabelName(type);
        await settingsLogic.saveSettings();
        await settingsLogic.goToBomImportAndUploadAValidFile();
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.importOptions);
        let labelText: any = await importElements.importOptions.kbRadioButtonLabels.getText();
        for (let i:number = 0; i < labelText.length; i++) {
            if (labelText[i] === type) {
                await expect(await importElements.importOptions.kbRadioButtonInputs.get(i).isSelected()).toBeTruthy();
                break
            }
        }
        await importLogic.closeOptionModalWithX();
        await importLogic.leaveImportWitLeaveModal();
    };

    public async checkUncheckDefaultImportOptions(status:boolean) {
        await browser.waitForAngularEnabled(false);
        await checkbox.checkUnCheckCheckboxesBool(settings.bomImportSettings.defaultCheckboxLabels,
            settings.bomImportSettings.defaultCheckboxInputs,
            status);
        await settingsLogic.saveSettings();
        await browser.sleep(2000);                                                                                      /*++++++*/
        await settingsLogic.goToBomImportAndUploadAValidFile();
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.importOptions);
        for(let i:number = 0; i < await importElements.importOptions.defaultCheckboxInputs.count(); i++) {
            expect(await importElements.importOptions.defaultCheckboxInputs
                .get(i).isSelected()).toEqual(status);
        }
        await importLogic.closeOptionModalWithX();
        await importLogic.leaveImportWitLeaveModal();
    };

    public async cplCheckboxLogicChecking() {
        await checkbox.checkUnCheckCheckboxes(settings.bomImportSettings.cplCheckboxLabels,
            settings.bomImportSettings.cplCheckboxInputs,
            fieldStatuses.emptyField);
        await checkbox.checkUnCheckCheckboxRange(settings.bomImportSettings.cplCheckboxLabels,
            settings.bomImportSettings.cplCheckboxInputs, fieldStatuses.fillField, 0, 3);
        await expect(await settings.bomImportSettings.cplCheckboxInputs.get(3).isSelected()).toEqual(false);
        await checkbox.checkUnCheckCheckboxes(settings.bomImportSettings.cplCheckboxLabels,
            settings.bomImportSettings.cplCheckboxInputs,
            fieldStatuses.emptyField);
        await checkbox.checkUnCheckCheckboxRange(settings.bomImportSettings.cplCheckboxLabels,
            settings.bomImportSettings.cplCheckboxInputs, fieldStatuses.fillField, 3, 4);
        for (let i: number = 0; i < 3; i++) {
            await expect(await settings.bomImportSettings.cplCheckboxInputs.get(i).isSelected()).toEqual(false);
        }
    };

    public async cplCheckboxInImport(startValue:number, endValue:number) {
        await checkbox.checkUnCheckCheckboxes(settings.bomImportSettings.cplCheckboxLabels,
            settings.bomImportSettings.cplCheckboxInputs,
            fieldStatuses.emptyField);
        await checkbox.checkUnCheckCheckboxRange(settings.bomImportSettings.cplCheckboxLabels,
            settings.bomImportSettings.cplCheckboxInputs, fieldStatuses.fillField, startValue, endValue);
        await settingsLogic.saveSettings();
        await browser.sleep(2000);
       await settingsLogic.goToBomImportAndUploadAValidFile();
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[4]);
        for(let i:number = startValue; i < await endValue; i++) {
            await expect(await importElements.importOptions.cplCheckboxInputs.get(i).isSelected()).toEqual(true);
        }
        await importLogic.closeOptionModalWithX();
        await importLogic.leaveImportWitLeaveModal();
    };

    public async openSelectDestinationFolder() {
        await browser.executeScript("document.querySelector('.ellipsis-input-wrapper').scrollIntoView()");
        await actions.mouseMoveToElement(link.returnElementByLinkName(linksNames.viewBomTree));
        await w.waitUntilElementIsClickable(link.returnElementByLinkName(linksNames.viewBomTree));
        await browser.sleep(3000);
        await w.waitUntilElementIsClickable(link.returnElementByLinkName(linksNames.viewBomTree));
        await link.clickOnTheLinkByNameAndWaitForElement(linksNames.viewBomTree, commonElements.popoverContent.first());
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
    };

    public async closeDestinationFolder() {
        await button.clickByButtonName(buttonNames.cancelDoNoSaveSelected);
        await w.waitUntilElementNotDisplayed(commonElements.popoverContent.get(0));
        await this.openSelectDestinationFolder();
        await button.clickOnTheElement(commonElements.popoverX);
        await w.waitUntilElementNotDisplayed(commonElements.popoverContent.get(0));
    };

    public async goToSavedConfigs() {
        await allureStep(`Go to Import save Configuration`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await browser.sleep(1000);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(settings.bomImportSettings.savedConfigs);
            await button.clickOnTheElement(settings.bomImportSettings.savedConfigs);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        })

    };

    async openSavedConfModal(){
        await w.waitUntilElementIsClickable(gridElements.newGridCellWithoutContentByRowIndex(0).first());
        const result:string = await gridElements.newGridCellWithoutContentByRowIndex(0).first().getText();
        await modal.openModalWithLinkName(result);
        await w.waitUntilElementIsClickable(modal.modalBody);
        await expect(await modal.modalTitle.getText()).toEqual('View / Modify / Delete: "' + result +'"');
    };

    public async setDefaultFolder(option:number, root:string){
        await button.clickOnTheElement(gridElements.checkboxSelector.get(option));
        let result = await gridElements.treeFolderNames.get(option - 1).getText();
        await button.clickByButtonName(buttonNames.applySelectedFolder);
        const regEx=/\s/g;
        let res=result.replace(regEx,"");
        await expect(await elementAttributes.getElementAttribute(settings.bomImportSettings.pathField, 'value'))
            .toEqual(root+res +'/');
    };

    public async setDefaultFolderWithName(folderName:string, root:string){
        await browser.sleep(5000);
        await w.waitUntilWorkingModalNotDisplayed();
        for(let i:number=0;i<3;i++){
            if(await button.returnButtonByText(buttonNames.applySelectedFolder).isEnabled()){
                await bomTreeLogic.checkFolderNewGridRowByName('Vault');
            }
            else{
                break
            }
        }
        await bomTreeLogic.checkFolderNewGridRowByName(folderName);
        await button.clickByButtonName(buttonNames.applySelectedFolder);
        await browser.sleep(1000);
        await expect(await elementAttributes.getElementAttribute(settings.bomImportSettings.pathField, 'value'))
            .toEqual(root+'/');
    };

    public async displaySelectedFolderInImport(){
        let result = await elementAttributes.getElementAttribute(settings.bomImportSettings.pathField, 'value');
        await settingsLogic.saveSettings();
        await settingsLogic.goToBomImportAndUploadAValidFile();
        let res = result.slice(0,-1);
        await expect(importElements.destinationFolder.path.getText()).toEqual(res);
        await importLogic.leaveImportWitLeaveModal();
    };

    public async returnToPreviousValue(){
        await this.openSelectDestinationFolder();
        await this.setDefaultFolder(2,'Vault/');
        await settingsLogic.saveSettings();
    };


    public async verifyImportSettingscheckboxSync(checkStatus:boolean) {
        await allureStep(`Verify Default Destination Folder selected and checked as: ${checkStatus} in Import settings is reflected and is in sync with BOM tree anchor setting in BOM Vault settings`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await browser.sleep(1000);
            await settingsLogic.checkUnCheckSingleCheckbox(await settings.bomVaultSettings.ExpectedDefaultText.last(),await settings.bomVaultSettings.ExpectedDefaultinput.last(),checkStatus);
            await grid.changeGridWithLeftNavOptionByName(titles.bomVaultSettings,settings.module);
            await browser.sleep(1000);
            if(checkStatus==true) {
                expect(await settings.bomVaultSettings.ExpectedDefaultinput.last().isSelected()).toBeTruthy()
            }
            else {
                expect(await settings.bomVaultSettings.ExpectedDefaultinput.last().isSelected()).toBeFalsy();
            }
        });
    };

    public async verifyImportSettingsdestinationFolderSync(destinationFolder:string,checkStatus:boolean) {
        await allureStep(`Verify Default Destination Folder selected and checked as: ${checkStatus} in Import settings is reflected and is in sync with BOM tree anchor setting in BOM Vault settings`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await browser.sleep(1000);
            await this.openSelectDestinationFolder();
            await this.setDefaultFolderWithName(destinationFolder,'Vault/'+destinationFolder);
            await settingsLogic.checkUnCheckSingleCheckbox(settings.bomVaultSettings.ExpectedDefaultText.last(),settings.bomVaultSettings.ExpectedDefaultinput.last(),checkStatus);
            await grid.changeGridWithLeftNavOptionByName(titles.bomVaultSettings,settings.bomVaultSettings.ExpectedDefaultinput.last());
            await browser.sleep(1000);
            if(checkStatus==true) {
                await expect(await elementAttributes.getElementAttribute(settings.bomImportSettings.pathField, 'value'))
                    .toEqual('Vault/'+destinationFolder);
            }
            else {
                await expect(await elementAttributes.getElementAttribute(settings.bomImportSettings.pathField, 'value')
                    ==('Vault/'+destinationFolder)).toBeFalsy();
            }
        });
    };

}