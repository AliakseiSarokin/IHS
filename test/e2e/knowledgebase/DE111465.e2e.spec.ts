import {Login} from "../../../components/login";
const login: Login = new Login();
import {Meganav} from "../../../components/meganav";
const meganav:Meganav = new Meganav();
import {
    buttonNames, meganavItems, titles, exportOptions, modalTitles, columnHeaders,
    commonData, linksNames, fieldStatuses
} from "../../../testData/global";
import {
    pageTitles, gridElements, commonElements, dropdownElements, viewMfrPref,
    matchingElements, toolbarElements
} from "../../../elements/elements";
import {browser} from "protractor";
import {InstructionPanel} from "../../../components/instructionPanel";
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
const instructionPanel:InstructionPanel = new InstructionPanel();
import {Toolbar} from "../../../components/toolbar";
const toolbar: Toolbar = new Toolbar();
import {Modal} from "../../../components/modal";
const modal:Modal = new Modal();
import {kbData} from "../../../testData/knowledgeBase";
import {Dropdown} from "../../../components/dropdown";
import {Grid} from "../../../components/grid";
const grid:Grid = new Grid();
import {KnowledgeBaseLogic} from "../../../bussinesLayer/knowledgeBase/knowledgeBaseLogic";
import {MatchPartsLogic} from "../../../bussinesLayer/bomVault/matchPartsLogic";
import {Button} from "../../../components/simple/button";
import {Input} from "../../../components/simple/input";
import {commonSearch} from "../../../testData/search";
import {SingleBomLogic} from "../../../bussinesLayer/bomVault/singleBomLogic";
import {link} from "fs";
import {CheckBox} from "../../../components/simple/checkBox";

const button: Button = new Button();
const checkBox: CheckBox = new CheckBox();
const input: Input = new Input();
const knowledgeBaseLogic: KnowledgeBaseLogic = new KnowledgeBaseLogic();
const helpLogic: HelpLogic = new HelpLogic();
const matchPartsLogic: MatchPartsLogic = new MatchPartsLogic();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();


describe('Part Knowledge Base, DE111465', () => {

    it("should retain appplied toolbar filter after removing grid entries", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.firstRowLink);
        await matchPartsLogic.goToMatchParts();
        const bomTitle: string = await pageTitles.singleBomPageTitle.getText();
        const bomName: string = bomTitle.split('View Single BOM: ')[1];
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.searchForMatch);
        await input.fillFieldWithValue(matchingElements.searchForMatchModalPartNumberInput, commonSearch.commonValue);
        await button.clickByButtonNameAndWait(buttonNames.search, matchingElements.checkboxInput.get(1));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.closeModalWithButton(buttonNames.yesUseThisMatchingPart);
        browser.sleep(1500); //grid refreshes twice
        await modal.openModalWithButtonByName(buttonNames.saveChanges);
        await modal.closeModalWithButton(buttonNames.yesConfirmAllChangesAndDoNotReprocessBOM);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.partKnowledgeBase, gridElements.checkboxSelector.get(1));
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(kbData.partsFilters[3], gridElements.checkboxSelector.get(1));
        await expect((toolbarElements.tagByName(kbData.partsFilters[3])).isDisplayed()).toBeTruthy();
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await button.clickByButtonNameAndWait(buttonNames.yesDeleteSelectedItems, gridElements.gridWrapper);
        await expect((toolbarElements.tagByName(kbData.partsFilters[3])).isDisplayed()).toBeTruthy();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.firstRowLink);
        await singleBomLogic.openSingleBomByName(bomName);
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await modal.closeModalWithButton(buttonNames.yesReporcessThisBom);
    });
});