import {Button} from "../../components/simple/button";

const button: Button = new Button();
import {
    settings,
    importElements,
    gridElements,
    dropdownElements,
    transposeElements,
    modalElements, commonElements
} from "../../elements/elements";
import {buttonNames, fieldStatuses} from "../../testData/global";
import {Waiters as w} from "../../helper/waiters";
import {allureStep} from "../../helper/allure/allureSteps";
import {Meganav} from "../../components/meganav";

const meganav = new Meganav();
import {Modal} from "../../components/modal";

const modal:Modal = new Modal();
import {commonSearch} from "../../testData/search";
import {meganavItems} from "../../testData/global";
import {ImportLogic} from "../import/importLogic";

const importLogic = new ImportLogic();
import {ElementAttributes} from "../../utils/elementAttributes";

const elementAttributes = new ElementAttributes();
import {RadioButton} from "../../components/simple/radioButton";

const radioButton = new RadioButton();
import {quickSearchElements} from "../../elements/elements";
import {Toolbar} from "../../components/toolbar";

const toolbar = new Toolbar();
import {Dropdown} from "../../components/dropdown";
import {browser, by, element, ElementFinder} from "protractor";

import {CheckBox} from "../../components/simple/checkBox";
const checkBox = new CheckBox();


import {Grid} from "../../components/grid";
const grid = new Grid();

import {Actions} from "../../utils/actions";
const actions: Actions = new Actions();

export class SettingsLogic {

    public async saveSettings() {
        await allureStep('Save changes for settings', async () => {
            await browser.waitForAngularEnabled(false);
            // await w.waitUntilElementIsClickable(element(by.buttonText(buttonNames.saveChanges)));
            await button.clickByButtonName(buttonNames.saveChanges);
            await w.waitUntilWorkingModalNotDisplayed();
            await browser.sleep(2000);
        });
    }

    private async _leaveModalAttributes() {
        await expect(await modal.modalTitle.getText()).toEqual('Leave this page?');
        const text: string = 'Are you sure you want to leave without saving your changes?';
        await expect((await modalElements.modalBodyParagNew.getText())[0]).toEqual(text);
        await modal.closeModalWithXButton();
    }

    public async showLeaveModalCheckbox(element: ElementFinder) {
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(500);
        await w.waitUntilWorkingModalNotDisplayed();
        await button.clickOnTheElement(element);
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(500);
        await w.waitUntilWorkingModalNotDisplayed();
        await meganav.goToFeatureWithMeganav(meganavItems.home, modal.modalTitle);
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(500);
        await w.waitUntilWorkingModalNotDisplayed();
        await this._leaveModalAttributes();
    };

    public async showLeaveModalRadioButton(radioButtonLabel: any, radioButtonInput: any) {
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(500);
        for (let i: number = 0; i < await radioButtonInput.count(); i++) {
            if (!(await radioButtonInput.get(i).isSelected())) {
                await button.clickOnTheElement(radioButtonLabel.get(i));
                break;
            }
        }
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(500);
        await meganav.goToFeatureWithMeganav(meganavItems.home, modal.modalTitle);
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(500);
        await this._leaveModalAttributes();
    };

    public async showLeaveModalDropdownValue(dropdownToggle: any, type: string) {
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(500);
        await Dropdown.openDropdownByClickOnElement(dropdownToggle);
        await w.waitUntilElementIsClickable(dropdownElements.dropdownValues.get(1));
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(500);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(type);
        await meganav.goToFeatureWithMeganav(meganavItems.home, modal.modalTitle);
        await this._leaveModalAttributes();
    };

    public async goToBomImportAndUploadAValidFile() {
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
    };


    public async paginationChecking(paginationType: string, location: any) {
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(500);
        await radioButton.checkRadioButtonByLabelName(paginationType);
        await this.saveSettings();
        await location(commonSearch.commonValue);
        await w.waitUntilElementIsDisplayed(gridElements.currentPaginationValue.get(0));
        let selectedPaginationValue: any = await gridElements.currentPaginationValue.get(0).getAttribute('value');
        await expect((selectedPaginationValue.split(':'))[1].trim()).toEqual(paginationType)

    };

    public async checkingLayout(searchType: string, dropdownToggle: any, location: any) {
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(1000);
        await Dropdown.openDropdownByClickOnElement(dropdownToggle);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(searchType);
        await this.saveSettings();
        await location(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await settings.searchSettings.activeLayout.getText()).toEqual(searchType);
    };

    public async checkingLayoutCPL(searchType: string, dropdownToggle: any, location: any) {
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(1000);
        await Dropdown.openDropdownByClickOnElement(dropdownToggle);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(searchType);
        await this.saveSettings();
        await location(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await settings.searchSettings.activeLayout.getText()).toEqual(searchType);
    };

    public async switchGridToTransposeMode(transposed: boolean) {
        await allureStep('Search settings, set default Results Grid Type to transposed mode', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            if (transposed) {
                await radioButton.checkRadioButtonByLabelName('Parts viewed as columns and attributes viewed as rows');
            } else {
                await radioButton.checkRadioButtonByLabelName('Parts viewed as rows and attributes viewed as columns');
            }
            await this.saveSettings();
        })
    };
    public async checkViewOnlyMyBom(checkStatus:boolean) {
        await allureStep(`Verify view only my BOMS with check status: ${checkStatus} is reflected properly in BOM vault with accordion tag`, async () => {

            await w.waitUntilWorkingModalNotDisplayed();
            await this.checkUnCheckSingleCheckbox(settings.bomVaultSettings.ExpectedDefaultText.get(1),settings.bomVaultSettings.ExpectedDefaultinput.get(1),checkStatus);
            await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
                meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
            if(checkStatus==true) {
            expect(await commonElements.accordionElements.get(0).getText()).toEqual('View Only My BOMs')
            }
            else {
            expect(await commonElements.accordionElements.get(0).isPresent()).toBeFalsy();
            }
        });
    };

    public async checkBomsOwnedByCurrentUSersVisisble(ownerName:string, currentUsers: boolean) {
        await allureStep(`Verify if, only BOMS owned by owner: ${ownerName} are displayed in BOM vault to be : ${currentUsers}`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            let ownerNameGrid: string[]= await grid.newGridReturnCellValuesByColumnName(1,'Owner');
            for(let i:number= 0;i<ownerNameGrid.length;i++){
                if(currentUsers==true){
                expect(ownerNameGrid[i]).toEqual(ownerName);
                }
                else{
                    if(ownerNameGrid[i]!=ownerName){
                        expect(ownerNameGrid[i]!=ownerName).toBeTruthy();
                        break;
                    }
                }
            }

        });
    }

    public async checkUnCheckSingleCheckbox(label: any, input: any, status:boolean) {
        await w.waitUntilWorkingModalNotDisplayed();
        if(!((await input.isSelected())==status)){
            await w.waitUntilWorkingModalNotDisplayed();
            await actions.mouseMoveToElement(input);
            await button.clickOnTheElement(input);
            await browser.sleep(1000);
            await w.waitUntilElementIsClickable(element(by.buttonText(buttonNames.saveChanges)));
            await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled).toBeTruthy();
            await button.clickByButtonName(buttonNames.saveChanges);
            await browser.sleep(1000);
            await w.waitUntilWorkingModalNotDisplayed();
        }

    };

    public async verifyfolderAnchorOpened(folderName:string) {
        await allureStep(`Verify if, folder selected: ${folderName} ,in the vault settings is reflected`, async () => {
            await w.waitUntilElementIsDisplayed(await settings.bomVaultSettings.folderAnchorBomTree.first());
            await w.waitUntilWorkingModalNotDisplayed();
            await expect(await settings.bomVaultSettings.folderAnchorBomTree.first().isDisplayed()).toBeTruthy();
            await expect(await settings.bomVaultSettings.folderAnchorBomTree.first().getText()).toEqual(folderName);
        });
    }

}