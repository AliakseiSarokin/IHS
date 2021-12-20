import {browser} from "protractor";
import {gridElements, cplElements, sliderElements, bomElements} from "../../../elements/elements";
import {Button} from "../../../components/simple/button";
import {ElementAttributes} from "../../../utils/elementAttributes";
import {Input} from "../../../components/simple/input";
import {Grid} from "../../../components/grid";
import {Meganav} from "../../../components/meganav";
import {Modal} from "../../../components/modal";
import {Random} from "../../../utils/random";
import {Slider} from "../../../components/slider";
import {Toolbar} from "../../../components/toolbar";
import {Waiters as w} from "../../../helper/waiters";
import {buttonNames, fieldStatuses, meganavItems} from "../../../testData/global";
import {WorkspaceBoms} from "../../../api/logicLayer/workspaceBoms";
import {user} from "../../../api/testData/global";
import {JsScripts} from "../../../utils/jsScripts";
import {allureStep} from "../../../helper/allure/allureSteps";
import {Growlers} from "../../../components/growlers";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const grid: Grid = new Grid();
const meganav: Meganav = new Meganav();
const modal:Modal = new Modal();
const random: Random = new Random();
const toolbar: Toolbar = new Toolbar();
const corpPartName:string = "AUTOMATION TEST";
const enterPartDetailsDataMfrPN:string = 'lm311';
let selectFromCheckBoxPNValue:string = 'LM3-111';

export class AddCorpPartSliderLogic {

    async fieldGhostTextChecking() {
        const ghostTexts = [ 'Please enter your Corp P/N', 'Please enter your Corp Name', 'Please enter your Corp P/N Desc',
            'Please enter your Corp P/N Comments',
            'Please enter your Corp P/N Status', 'Please enter your Generic P/N', 'Please enter your CPL Custom 1',
            'Please enter your CPL Custom 2', 'Please enter your CPL Custom 3',
            'Please enter your CPL Custom 4', 'Please enter your CPL Custom 5', 'Please enter your CPL Custom 6',
            'Please enter your CPL Custom 7', 'Please enter your CPL Custom 8',
            'Please enter your CPL Custom 9', 'Please enter your CPL Custom 10' ];
        let result = await cplElements.cplDetails.addSliderFirstSectionInputs.count();
        for (let i=0; i<result;i++) {
            await expect(await elementAttributes.getElementAttribute(cplElements.cplDetails.addSliderFirstSectionInputs.get(i),
                'placeholder')).toEqual(ghostTexts[i]);
        }
    };

    async filedLimitsAndCounterChecking(option: number, charsAmount: number){
        await input.fillFieldWithValue(cplElements.cplDetails.addSliderFirstSectionInputs.get(option),
            random.randomTextGenerator(charsAmount));
        await expect(await cplElements.cplDetails.sliderFieldCounter.get(option).getText())
            .toEqual('Characters remaining 0 of '+ charsAmount );
        let result = await elementAttributes.getElementAttribute(cplElements.cplDetails.addSliderFirstSectionInputs.get(option), 'value');
        await expect(result.length).toEqual(charsAmount);
        await expect(button.returnButtonByText(buttonNames.addManufacturerParts).isDisplayed()).toBeTruthy();
    };

    public async filedLargeLimitsAndCounterChecking(option: number, sentCharsAmount: number, charsAmount: number){
        await input.fillFieldWithValue(cplElements.cplDetails.addSliderFirstSectionInputs.get(option),
            random.randomTextGenerator(sentCharsAmount));
        await expect(await cplElements.cplDetails.sliderFieldCounter.get(option).getText())
            .toEqual('Characters remaining '+(charsAmount-sentCharsAmount)+' of '+ charsAmount );
        await expect(button.returnButtonByText(buttonNames.addManufacturerParts).isDisplayed()).toBeTruthy();
    };

    public async clearFieldsWithResetButton() {
        await JsScripts.scrollToElement(button.returnButtonByText(buttonNames.resetClearFields));
        await button.clickByButtonName(buttonNames.resetClearFields);
        let result = await cplElements.cplDetails.addSliderFirstSectionInputs.count();
        for (let i=0; i<result;i+=1) {
            let text:string = await cplElements.cplDetails.addSliderFirstSectionInputs.get(i).getText()
            await expect(text.length == 0 );
        }
        await JsScripts.scrollToElement(button.returnButtonByText(buttonNames.resetClearFields));
        await expect(button.returnButtonByText(buttonNames.addManufacturerParts).isEnabled()).toBeFalsy();
    };

    public async goToStep2() {
        await JsScripts.scrollToElement(cplElements.cplDetails.addSliderFirstSectionInputs.get(0));
        await input.fillFieldWithValue(cplElements.cplDetails.addSliderFirstSectionInputs.get(0),
            random.randomTextGenerator(10));
        await JsScripts.scrollToElement(button.returnButtonByText(buttonNames.addManufacturerParts));
        await button.clickByButtonName(buttonNames.addManufacturerParts);
        await w.waitUntilElementIsClickable(cplElements.cplDetails.selectMfrContent);
        await expect(cplElements.cplDetails.addSliderSecondAccordion.get(0).isEnabled()).toBeTruthy();
    };


    private async _checkRadioButtonWIthClearAll(option){
        await cplElements.cplDetails.the2AccordionRadioButtonsLabel.get(option).click();
        await expect(await cplElements.cplDetails.the2AccordionRadioButtonsInput.get(option)
            .isSelected()).toBeTruthy();
        await button.clickByButtonName(buttonNames.reset);
        await expect(await cplElements.cplDetails.the2AccordionRadioButtonsInput.get(option).isSelected())
            .toBeFalsy();
    };

    public async checking2AccordionRadioButtons(){
        await expect(await cplElements.cplDetails.the2AccordionRadioButtonsLabel.getText())
            .toEqual([ 'Part # Starts With', 'Part # Contains', 'Exact Part #', 'Keyword Search' ]);
        await this._checkRadioButtonWIthClearAll(1);
        await this._checkRadioButtonWIthClearAll(2);
        await this._checkRadioButtonWIthClearAll(3);
    };

    public async _ghostText(option, ghostText){
        await cplElements.cplDetails.the2AccordionRadioButtonsLabel.get(option).click();
        await expect(await elementAttributes.getElementAttribute(cplElements.cplDetails.the2AccordionSearchField,
            'placeholder')).toContain(ghostText);
    };

    public async the2AccordionGhostTextChecking(){
        await this._ghostText(0, 'Enter part number(s)...');
        await this._ghostText(1, 'Enter part number...');
        await this._ghostText(2, 'Enter part number(s)...');
        await this._ghostText(3, 'Enter keyword(s)...');
    };

    public async clearSearchCriteriaByX() {
        await input.fillFieldWithValue(cplElements.cplDetails.the2AccordionSearchField,
            'lm311');
        await cplElements.cplDetails.clearSearchCriteriaXButton.click();
        await expect( (await elementAttributes.getElementAttribute(cplElements.cplDetails.the2AccordionSearchField,
            'value')).length).toEqual(0);
    };

    public async checking2AccordionPerformSearch(){
        await cplElements.cplDetails.the2AccordionRadioButtonsLabel.get(0).click();
        await input.fillFieldWithValue(cplElements.cplDetails.the2AccordionSearchField,
            'lm311');
        await button.clickByButtonName(buttonNames.search);
        await w.waitUntilElementIsDisplayed(gridElements.severalGrid.get(1));
        await w.waitUntilElementIsClickable(bomElements.addAPartShade.searchForAPartCheckbox(0));
        await expect(button.returnButtonByText(buttonNames.addParts).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.addAndReviewSelectedParts).isEnabled()).toBeFalsy();
    };

    public async selectPartFromGrid(row, option) {
        await row(option).click();
        await expect(button.returnButtonByText(buttonNames.addParts).isEnabled()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.addAndReviewSelectedParts).isEnabled()).toBeTruthy();
    };

    public async goToATab(option){
        await cplElements.cplDetails.sliderNavTabs.get(option).click();
        await w.waitUntilElementIsClickable(cplElements.cplDetails.selectMfrContent);
        await expect(await elementAttributes.getElementAttribute(cplElements.cplDetails.sliderNavTabs.get(option),
            'class')).toContain(fieldStatuses.active);
    };

    public async enterPartDetailsFieldsChecking(){
        await expect(await cplElements.cplDetails.enterPartDeatilsFieldsLabels.getText())
            .toEqual(['Manufacturer Part Number','Manufacturer Name',
                'Part Description','Part Status']);
    };

    public async checkingResetClearFieldButton(){
        let result = await cplElements.cplDetails.enterPartDeatilsFieldsInputs.count();
        for(let i=0;i<result;i+=1){
            await input.fillFieldWithValue(cplElements.cplDetails.enterPartDeatilsFieldsInputs.get(i),
                'lm311');
        }
        await browser.executeScript('document.querySelector("select-manufacturer-parts ' +
            '.btn.shim-right-mini:not(.btn-deemphasized)").click()');
        let result1 = await cplElements.cplDetails.enterPartDeatilsFieldsInputs.count();
        for (let i=0; i<result1;i+=1) {
            let text:string = await cplElements.cplDetails.enterPartDeatilsFieldsInputs.get(i).getText()
            await expect(text.length == 0 );
        }
    };

    public async enterMfrPartNumber(){
        await cplElements.cplDetails.enterPartDeatilsFieldsInputs.get(0).sendKeys(enterPartDetailsDataMfrPN);
        await expect(button.returnButtonByText(buttonNames.addParts).isEnabled()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.addAndReviewSelectedParts).isEnabled()).toBeTruthy();
    };

    public async checkingSelectFromWorkspaceTab(workspacCount) {
        await allureStep(`Check number of test part in Workspace tab and compare with number of added workspaces`, async () => {
            await WorkspaceBoms.addAPartToWorkspaceIfNotAdded(user.groupAdmin);
            await this.goToATab(2);
            // selectFromCheckBoxPNValue = await cplElements.cplDetails.selectFromCheckBoxPn.getText();
            await w.waitUntilElementIsDisplayed(await cplElements.cplDetails.sliderWorkSpaceCheckbox.get(0))
            await expect(await cplElements.cplDetails.sliderWorkSpaceCheckbox.count()).toEqual(workspacCount);
        })
    };

    public async saveStateChecking() {
        await this.goToATab(1);
        const text:string = await cplElements.cplDetails.enterPartDeatilsFieldsInputs.get(0).getText();
        await expect(text.length > 0 );
        await this.goToATab(2);
        await expect(await bomElements.addAPartShade.searchForAPartCheckbox(0).isSelected()).toBeTruthy();
        await this.goToATab(0);
        await expect(await bomElements.addAPartShade.workspaceCheckbox(0).isSelected()).toBeTruthy();
    };

    public async addAndReview(){
        await button.clickByButtonName(buttonNames.addAndReviewSelectedParts);
        await w.waitUntilElementIsDisplayed(cplElements.cplDetails.reviewContainer)
    };

    public async addThisAndGoToReview(){
        await button.clickByButtonName(buttonNames.addAndReviewSelectedParts);
        await cplElements.cplDetails.addSliderPanelTitles.get(2).click();
        await w.waitUntilElementIsDisplayed(cplElements.cplDetails.reviewContainer)
    };

    public async addPartFromSelectAPartTab(){
        await w.waitUntilElementIsDisplayed(await bomElements.addAPartShade.searchForAPartCheckbox(0));
        await bomElements.addAPartShade.searchForAPartCheckbox(0).click();
        await bomElements.addAPartShade.searchForAPartCheckbox(1).click();
        const p1:string = await cplElements.cplDetails.selectAPartPartNumberSecondRow.getText();
        const p2:string = await enterPartDetailsDataMfrPN;
        const p3:string =  selectFromCheckBoxPNValue;
        await button.clickByButtonName(buttonNames.addAndReviewSelectedParts);
        await w.waitUntilElementIsDisplayed(cplElements.cplDetails.reviewContainer);
        await w.waitUntilElementIsDisplayed(await cplElements.cplDetails.reviewGridPartNumberFirstRow)
        // await browser.sleep(2000);
        const p4:string = await cplElements.cplDetails.reviewGridPartNumberFirstRow.getText();
        const p5:string = await cplElements.cplDetails.reviewGridPartNumberSecondRow.getText();
        const p6:string = await cplElements.cplDetails.reviewGridPartNumberThirdRow.getText();
        expect([ p4, p5, p6]).toEqual([ p1, p2, p3]);
    };

    public async setAdPrefButtonChecking() {
        await w.waitUntilElementIsDisplayed(await cplElements.cplDetails.reviewGridCheckboxes.get(0))
        await expect(button.returnButtonByText(buttonNames.setAsPrefered).isEnabled()).toBeFalsy();
        await cplElements.cplDetails.reviewGridCheckboxes.get(0).click();
        await cplElements.cplDetails.reviewGridCheckboxes.get(1).click();
        await expect(button.returnButtonByText(buttonNames.setAsPrefered).isEnabled()).toBeFalsy();
        await cplElements.cplDetails.reviewGridCheckboxes.get(0).click();
        await expect(button.returnButtonByText(buttonNames.setAsPrefered).isEnabled()).toBeTruthy();
    };


    public async setAsPrefChecking(){
        let result = await cplElements.cplDetails.reviewGridPartNumberSecondRow.getText();
        await button.clickByButtonName(buttonNames.setAsPrefered);
        await w.waitUntilElementIsDisplayed(cplElements.cplDetails.reviewContainer);
        await w.waitUntilElementToBeUnselected(await cplElements.cplDetails.reviewGridCheckboxes.get(1));
        await expect(await cplElements.cplDetails.reviewGridPartNumberFirstRow.getText()).toEqual(result);
        await expect(await elementAttributes.getElementAttribute(cplElements.cplDetails.reviewGridPartNumberFirstRowStyle,
            'style')).toContain('bold');
    };

    public async deleteButtonChecking() {
        await expect(button.returnButtonByText(buttonNames.remove).isEnabled()).toBeFalsy();
        await cplElements.cplDetails.reviewGridCheckboxes.get(0).click();
        await cplElements.cplDetails.reviewGridCheckboxes.get(1).click();
        await cplElements.cplDetails.reviewGridCheckboxes.get(2).click();
        await expect(button.returnButtonByText(buttonNames.remove).isEnabled()).toBeFalsy();
        await cplElements.cplDetails.reviewGridCheckboxes.get(1).click();
        await cplElements.cplDetails.reviewGridCheckboxes.get(2).click();
        await expect(button.returnButtonByText(buttonNames.remove).isEnabled()).toBeTruthy();
    };

    public async openDeleteModal() {
        const p1:string = await cplElements.cplDetails.reviewGridPartNumberFirstRow.getText();
        await modal.openModalWithButtonByName(buttonNames.remove);
        await expect(await modal.modalTitle.getText()).toEqual('Delete Mfr Part(s) from CPL');
        await expect(await cplElements.cplDetails.tableText.getText()).toEqual([ p1]);
        await expect(await cplElements.cplDetails.reviewGridRowsNumber.count()).toEqual(1);
    };

    public async checkCancelDoNotAddButton(option) {
        await input.fillFieldWithValue(cplElements.cplDetails.the2AccordionSearchField,
            'lm311');
        await button.clickByButtonName(buttonNames.search);
        await w.waitUntilElementIsDisplayed(gridElements.severalGrid.get(0));
        await w.waitUntilElementIsClickable(bomElements.addAPartShade.searchForAPartCheckbox(0));
        await bomElements.addAPartShade.searchForAPartCheckbox(0).click();
        await this.goToATab(1);
        await input.fillFieldWithValue(cplElements.cplDetails.enterPartDeatilsFieldsInputs.get(0),
            'test');
        await this.goToATab(2);
        await bomElements.addAPartShade.workspaceCheckbox(0).click();
        await this.goToATab(option);
        await button.clickByButtonName(buttonNames.cancel);
        await browser.sleep(1000);
        await this.goToATab(1);
        await expect((await elementAttributes.getElementAttribute(cplElements.cplDetails.enterPartDeatilsFieldsInputs.get(0),
            'value')).length).toEqual(0);
        await this.goToATab(2);
        await expect(await bomElements.addAPartShade.workspaceCheckbox(0).isSelected())
            .toBeFalsy();
        await this.goToATab(0);
        await expect(await  bomElements.addAPartShade.searchForAPartCheckbox(0).isPresent()).toBeFalsy();
    };

    public async closeSliderWithLeaveModal(){
        await modal.openModalWithButtonByName(buttonNames.close);
        await expect(await modal.modalTitle.getText()).toEqual('Leave this page?');
        await modal.closeModalWithButton(buttonNames.yes);
        await w.waitUntilElementNotDisplayed(sliderElements.openSliderBox);
    };

    public async leaveModalChecking() {
        await modal.openModalWithButtonByName(buttonNames.close);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.close);
        await modal.closeModalWithButton(buttonNames.no);
        await modal.openModalWithElement(sliderElements.closeSliderTab);
        await expect(await modal.modalTitle.getText()).toEqual('Leave this page?');
        await expect(await modal.modalBody.getText()).toEqual('CPL changes have not been saved. Are you sure you want to leave without saving your changes?');
        await modal.closeModalWithXButton();
        await modal.openModalWithElement(sliderElements.closeSliderTab);
        await modal.closeModalWithButton(buttonNames.no);
    };

    public async _addCorpPreparation() {
        await Growlers.closeGrowlerIfDisplayed();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await w.waitUntilElementIsDisplayed(await button.returnButtonByText(buttonNames.addCorpParts))
        await Slider.openSliderByClickingOnTheElement(await button.returnButtonByText(buttonNames.addCorpParts));
        await w.waitUntilElementIsClickable(await cplElements.cplDetails.addSliderFirstSectionInputs.get(0))
        await browser.sleep(1000); // working modal is updated twice
        await input.fillFieldWithValue(await cplElements.cplDetails.addSliderFirstSectionInputs.get(0),
            corpPartName);
        await browser.executeScript("document.querySelector('.btn-default').scrollIntoView()");
        await button.clickByButtonName(buttonNames.addManufacturerParts);
        await this.goToATab(1);
        await w.waitUntilElementIsDisplayed(await cplElements.cplDetails.enterPartDeatilsFieldsInputs.get(0))
        await input.fillFieldWithValue(await cplElements.cplDetails.enterPartDeatilsFieldsInputs.get(0),
            corpPartName);
        await button.clickByButtonName(buttonNames.addAndReviewSelectedParts);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(await button.returnButtonByText(buttonNames.save))
        await button.clickByButtonName(buttonNames.save);
        await browser.sleep(2000);
    };

    public async addCorpPart(){
        let newArr=[];
        await w.waitUntilWorkingModalNotDisplayed();
        let value = await gridElements.gridCounter.getText();
        newArr = value.split(' ');
        await this._addCorpPreparation();
        await w.waitUntilElementNotDisplayed(sliderElements.openSliderBox)
        await w.waitUntilElementIsClickable(gridElements.gridCounter);
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await gridElements.gridCounter.getText()).toContain('of ' + (parseInt(newArr[4])+1) + ' items');
        await expect(cplElements.cplDetails.reprocessIcon.isDisplayed()).toBeTruthy();
    };

    public async notAddTheSameCorpPart(){
        await browser.navigate().refresh();
        await w.waitUntilElementIsClickable(gridElements.gridWrapper)
        await browser.sleep(2000);
        await this._addCorpPreparation();
        await w.waitUntilElementIsDisplayed(modal.modalBody);
       // await expect(await modal.modalTitle.getText()).toEqual('Error Notification');
        await button.clickByButtonName(buttonNames.okayThanks);
        await w.waitUntilElementNotDisplayed(modal.modalTitle);
        await browser.navigate().refresh();
        await w.waitUntilElementIsClickable(gridElements.gridWrapper)
    };

    public async waitingForReporcessingCpl(){
        async function checking() {
            let result = await modal.modalBody.isPresent();
            if(result){
                await button.clickByButtonName(buttonNames.okayThanks);
                await browser.sleep(1000);
                await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
                    meganavItems.cplSublinks.manageCpl, gridElements.grid);
                await checking()
            }
        }
        await checking();
    }

    async repocessCpl(){
        await browser.waitForAngularEnabled(false)
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await modal.closeModalWithButton(buttonNames.yesReprocessThisCpl);
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.gridWrapper);
        await this.waitingForReporcessingCpl();
        await expect(cplElements.cplDetails.reprocessIcon.isPresent()).toBeFalsy();
    };

    private async _searchForCreatedBom() {
        await grid.newGridOpenFilterBoxByName('Corp P/N');
        await input.fillFieldWithValue(gridElements.columnsSort.input, corpPartName);
        await button.clickByButtonName(buttonNames.applyFilter);
        await w.waitUntilElementIsDisplayed(gridElements.grid);
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(0))
    };

    async deleteCorpPart(){
        await this.repocessCpl();
        let newArr=[];
        await w.waitUntilWorkingModalNotDisplayed();
        let value:string = await gridElements.gridCounter.getText();
        newArr = value.split(' ');
        await Growlers.closeGrowlerIfDisplayed();
        await this._searchForCreatedBom();
        await grid.checkCheckboxRange(0,1);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.yes);
        await w.waitUntilElementIsDisplayed(gridElements.grid);
        await grid.newGridOpenFilterBoxByName('Corp P/N');
        await button.clickByButtonName(buttonNames.clearFilter);
        await w.waitUntilElementIsClickable(gridElements.gridCounter);
        await browser.sleep(1000);
        await expect(await gridElements.gridCounter.getText()).toContain('of ' + (parseInt(newArr[4])-1) + ' items');
        await expect(cplElements.cplDetails.reprocessIcon.isDisplayed()).toBeTruthy();
    };

}