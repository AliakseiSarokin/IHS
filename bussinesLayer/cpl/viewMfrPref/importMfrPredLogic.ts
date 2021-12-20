import {commonElements, importElements, homeElements, dropdownElements, growler, administrationElements} from "../../../elements/elements";
import {buttonNames} from "../../../testData/global";
import {Button} from "../../../components/simple/button";
import {Dropdown} from "../../../components/dropdown";
import {Input} from "../../../components/simple/input";
import {Waiters as w} from "../../../helper/waiters";
import {allureStep} from "../../../helper/allure/allureSteps";

import {browser} from "protractor";
import {Growlers} from "../../../components/growlers";

const button: Button = new Button();
const input: Input = new Input();

export class ImportMfrPredLogic {

    validXlsFileMfrPrefImport:string;

    constructor() {
        this.validXlsFileMfrPrefImport = '.\\..\\..\\..\\testData\\files\\import\\Automation_Mfr_Pref.xlsx';
    }

    public async disableElementsChecking (status=null,importStatus) {
        const switchStatus = {
          'true': 'disabled',
          null:   'dropdown-toggle'
        };
        const result: number = await dropdownElements.dropdownToggle.count();
        for(let i=0; i<result; i++) {
            await expect(await dropdownElements.dropdownToggle.get(i).getAttribute('class')).toContain(switchStatus[status]);
        }
        await expect(await commonElements.radioButtonInput.get(0).getAttribute('disabled')).toBe(status);
        await expect(await commonElements.radioButtonInput.get(1).getAttribute('disabled')).toBe(status);
        await expect(await button.returnButtonByText(buttonNames.import).getAttribute('disabled')).toBe(importStatus);
    };

    public async uploadAValidFileToImportMfrPref () {
        await input.uploadAFile(importElements.uploadFileInput, this.validXlsFileMfrPrefImport);
        await w.waitUntilElementIsDisplayed(button.returnButtonByText(buttonNames.remove));
    };

    async dropdownOptions (option:number,expectedValue:any) {
        await w.waitUntilElementIsClickable(dropdownElements.dropdownToggle.get(option));
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(option));
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectedValue);
        await Dropdown.closeDropdownByClickOnElement(dropdownElements.dropdownToggle.get(option));
        await browser.sleep(1000);
    };

    async importMfrPref (){
        await allureStep('Import Manufacturer Preference', async () => {
            await browser.waitForAngularEnabled(false);
            await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(0));
            await Dropdown.selectValueInDropdownByValueNameWithoutWait('Mfr Name');
            await button.clickByButtonName(buttonNames.import);
            await w.waitUntilElementIsClickable(homeElements.learnMorePanelImage);
        });
    };

    async checkGrowlerStatusIsCompleted(){
        await allureStep('check status in growler box is completed', async () => {
            await w.waitUntilElementIsDisplayed(growler.growlerTitle);
            let importStatus = await growler.growlerStatus.getText();
            if(importStatus !== 'Manufacturer Preferences are now ready for viewing') {
                await w.waitUntilTextToBePresent(growler.growlerStatus, 'Manufacturer Preferences are now ready for viewing', 50000);
            }
            await expect(await growler.growlerTitle.getText()).toEqual('Manufacturer Preferences Import');
        });
    };

    async  clickOnLinkInGrowler(){
        await allureStep('click on the link in growler box', async () => {
            await Growlers.clickOnLinkInGrowler();
            await w.waitUntilElementIsDisplayed(administrationElements.distributors.title);
            await expect(await administrationElements.distributors.title.getText()).toEqual('View Manufacturer Preferences');
        });
    };

}