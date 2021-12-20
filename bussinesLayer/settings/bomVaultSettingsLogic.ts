import {Meganav} from "../../components/meganav";
import {gridElements, settings} from "../../elements/elements";
import {SettingsLogic} from "./settingsLogic";
import {RadioButton} from "../../components/simple/radioButton";
import {SingleBomLogic} from "../bomVault/singleBomLogic";
import {meganavItems} from "../../testData/global";
import {Waiters} from "../../helper/waiters";
import {browser} from "protractor";

const singleBomLogic = new SingleBomLogic();
const radioButton = new RadioButton();
const meganav: Meganav = new Meganav();
const settingsLogic = new SettingsLogic();

import {BomImportSettingsLogic} from "./bomImportSettingsLogic";
const bomImportSettingsLogic = new BomImportSettingsLogic();

import {BomTreeLogic} from "../bomVault/bomTreeLogic";
const bomTreeLogic = new BomTreeLogic();


export class BomVaultSettingsLogic {

    public async lockUnLockColumnChecking (type:string, headers:string[]) {
        await Waiters.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(500);
        await radioButton.checkRadioButtonByLabelName(type);
        await settingsLogic.saveSettings();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openSingleBomByName('AML_IPN_OFF');
        await expect(await gridElements.newGridLockedColumnHeaders.getText()).toEqual(headers)
    };

    public async checkUnCheckSingleAndSelectBOMTreeAnchorCheckbox(folderName:string, root:string, status:boolean) {
        await bomImportSettingsLogic.openSelectDestinationFolder();
        await Waiters.waitUntilWorkingModalNotDisplayed();
        await bomTreeLogic.expandFolderBomTreeWithName('Automation_US275549');
        await bomImportSettingsLogic.setDefaultFolderWithName(folderName,root);
        await settingsLogic.checkUnCheckSingleCheckbox(await settings.bomVaultSettings.ExpectedDefaultText.last(),await settings.bomVaultSettings.ExpectedDefaultinput.last(),status);
    };
}