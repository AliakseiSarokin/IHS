import {gridElements, searchElements} from "../../elements/elements";
import {RadioButton} from "../../components/simple/radioButton";
import {SettingsLogic} from "./settingsLogic";
import {InstructionPanel} from "../../components/instructionPanel";
import {Meganav} from "../../components/meganav";
import {buttonNames, meganavItems} from "../../testData/global";
import {MatchMfrLogic} from "../bomVault/matchMfrLogic";
import {Modal} from "../../components/modal";
import {Button} from "../../components/simple/button";
import {browser, element, by} from "protractor";
import {Waiters as w} from "../../helper/waiters";

const button:Button = new Button();
const modal = new Modal();
const matchMfrLogic = new MatchMfrLogic();
const meganav = new Meganav();
const settingsLogic = new SettingsLogic();
const radioButton = new RadioButton();
const instructionPanel = new InstructionPanel();

export class GeneralSettingsLoigc {

    public async instrPanelOptionChecking (radioButtonLabel:string,value:boolean) {
        await radioButton.checkRadioButtonByLabelName(radioButtonLabel);
        await settingsLogic.saveSettings();
        await expect(instructionPanel.infoPanel.isPresent()).toBe(value);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await expect(instructionPanel.infoPanel.isPresent()).toBe(value);
    };

    private async _goToMatchAndClickIgnore (radioButtonLabel:string) {
        await w.waitUntilElementIsClickable(element(by.buttonText('Reset')));
        await radioButton.checkRadioButtonByLabelName(radioButtonLabel);
        await browser.sleep(1000);
        await settingsLogic.saveSettings();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms, meganavItems.bomsSubItems.viewAllBoms,
            gridElements.checkboxSelector.get(1));
        await matchMfrLogic.goToMatchMfr();
        await gridElements.checkboxSelector.get(1).click();
        await button.clickByButtonName(buttonNames.ignoreMatch);
        if(radioButtonLabel === 'YES') {
            await w.waitUntilElementIsClickable(modal.modalBody)
        }
        else {
            // await w.waitUntilElementIsClickable(gridElements.ignoredCell.get(1))
            await w.waitUntilElementIsClickable(gridElements.ignoredOneCell('No Matches. Ignored'))
        }

    };


    public async showMatchModal () {
        await this._goToMatchAndClickIgnore('YES');
        await w.waitUntilElementIsClickable(modal.modalTitle);
        await expect(await modal.modalTitle.getText()).toEqual('Confirm Ignored Matching Manufacturer(s)');
        await modal.closeModalWithXButton();
    };


    public async doNotShowMatchModal () {
        await this._goToMatchAndClickIgnore('NO');
        await expect(await modal.modalBody.isPresent()).toBeFalsy();
        await meganav.goToFeatureWithMeganav(meganavItems.home, modal.modalBody);
        await button.clickByButtonName(buttonNames.discardChanges);
        await w.waitUntilElementNotDisplayed(modal.modalTitle)
    }
}