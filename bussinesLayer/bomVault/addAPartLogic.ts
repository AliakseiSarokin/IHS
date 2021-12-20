import {bomElements, commonElements, gridElements, cplElements, shadeElements} from "../../elements/elements";
import {buttonNames} from "../../testData/global";
import {Button} from "../../components/simple/button";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Input} from "../../components/simple/input";
import {Link} from "../../components/simple/link";
import {Modal} from "../../components/modal";
import {Random} from "../../utils/random";
import {Shade} from "../../components/shade";
import {Toolbar} from "../../components/toolbar";
import {Waiters as w} from "../../helper/waiters";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const link: Link = new Link();
const modal: Modal = new Modal();
const random: Random = new Random();
const toolbar: Toolbar = new Toolbar();

export class AddAPartLogic {

    public async goToTab(tabName: string){
        await w.waitUntilElementIsClickable(link.returnElementByLinkName(tabName));
        await link.clickOnTheLinkByNameAndWaitForElement(tabName, shadeElements.openedShade);
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await commonElements.activeNavTab(tabName).isPresent()).toBeTruthy();
    };

    public async firstTabPerformSearch(){
        await cplElements.cplDetails.the2AccordionRadioButtonsLabel.get(0).click();
        await input.fillFieldWithValue(bomElements.addAPartShade.shadeSearchField, 'km311');
        await button.clickByButtonName(buttonNames.search);
        await w.waitUntilElementIsDisplayed(shadeElements.openedShade);
    };

    async clearSearchCriteriaByX() {
        await input.fillFieldWithValue(bomElements.addAPartShade.searchInput, 'lm311');
        await button.clickOnTheElement(bomElements.addAPartShade.searchInputXButton);
        await w.waitUntilWorkingModalNotDisplayed();
        await expect((await elementAttributes.getElementAttribute(bomElements.addAPartShade.searchInput,
            'value')).length).toEqual(0);
    };

    public async _ghostText(option:number, ghostText:string){
        await w.waitUntilWorkingModalNotDisplayed();
        await cplElements.cplDetails.the2AccordionRadioButtonsLabel.get(option).click();
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await elementAttributes.getElementAttribute(bomElements.addAPartShade.searchInput,
            'placeholder')).toContain(ghostText);
    };

    public async the2AccordionGhostTextChecking(){
        await this._ghostText(0, 'Enter part number(s)...');
        await this._ghostText(1, 'Enter part number...');
        await this._ghostText(2, 'Enter part number(s)...');
        await this._ghostText(3, 'Enter keyword(s)...');
    };

    async _stateForGrid(checkbox:any,tabName: string, returnTabName: string){
        await w.waitUntilElementIsDisplayed(checkbox(0));
        await checkbox(0).click();
        await this.goToTab(tabName);
        await this.goToTab(returnTabName);
        await w.waitUntilElementIsDisplayed(checkbox(0));
        await expect(await checkbox(0).isSelected())
            .toBeTruthy();
    };

    async saveStateSearchTab(checkbox:any = bomElements.addAPartShade.searchForAPartCheckbox){
        await this._stateForGrid(checkbox, 'Enter Part Details', 'Search for a Part');
    };

    async fieldsForSecondTab() {
        await this.goToTab('Enter Part Details');
        const fields =  [ 'BOM Hierarchy Level:', 'Internal Part Number:', 'Imported Part Number - (REQUIRED):',
            'Imported Manufacturer Name:', 'Description:', 'Quantity (Numbers Only):', 'Reference Designator:','Custom 1:', 'Custom 2:'  ];
        await expect(await bomElements.addAPartShade.fieldLabels.getText()).toEqual(fields);
    };

    async fillSecondTabFields(option:number){
        let result = await bomElements.addAPartShade.fieldInputs.count();
        for (let i = option; i < result; i += 1){
            await input.fillFieldWithValue(bomElements.addAPartShade.fieldInputs.get(i), random.randomNumberGenerator(8));
            await expect((await elementAttributes.getElementAttribute(bomElements.addAPartShade.fieldInputs.get(i), 'value')).length)
                .toBeGreaterThan(0);
        }
    };

    async saveStateSecondTab (option:number) {
        await this.goToTab('Search for a Part');
        await this.goToTab('Enter Part Details');
        let result = await bomElements.addAPartShade.fieldInputs.count();
        for (let i = option; i < result; i += 1){
            await expect((await elementAttributes.getElementAttribute(bomElements.addAPartShade.fieldInputs.get(i), 'value')).length)
                .toBeGreaterThan(0);
        }
    };

    async saveStateThirdTab () {
        await this.goToTab('Select from Workspace');
        await this._stateForGrid(bomElements.addAPartShade.workspaceCheckbox,'Search for a Part',
            'Select from Workspace')
    };

    async   resetButtonChecking(option:number){
        await this.goToTab('Enter Part Details');
        await button.clickByButtonName(buttonNames.resetClearAllFields);
        const result:number = await bomElements.addAPartShade.fieldInputs.count();
        for (let i:number = option; i < result; i++){
            await expect((await elementAttributes.getElementAttribute(bomElements.addAPartShade.fieldInputs.get(i), 'value')).length)
                .toEqual(0);
        }
        await this.goToTab('Search for a Part');
        await expect(await button.returnButtonByText(buttonNames.resetClearAllFields).isEnabled()).toBe(false);
        await this.goToTab('Select from Workspace');
        await expect(await button.returnButtonByText(buttonNames.resetClearAllFields).isEnabled()).toBe(false);
    };

    async addAPart() {
        await w.waitUntilElementIsClickable(gridElements.newGridRows.last());
        let result:string;
        if(await gridElements.gridCounters.get(0).getText() == ''){
            result = await gridElements.gridCounters.get(1).getText()
        } else {
            result = await gridElements.gridCounters.get(0).getText()
        }
        await w.waitUntilWorkingModalNotDisplayed();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Shade.openShadeWithButton(buttonNames.addPart);
        await this.firstTabPerformSearch();
        await this.saveStateSearchTab();
        await Shade.closeShadeWithButton(buttonNames.addParts);
        await w.waitUntilElementIsClickable(gridElements.newGridRows.last());
        await w.waitUntilElementIsClickable(gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await w.waitUntilElementIsClickable(gridElements.newGridRows.last());
        await w.waitUntilElementIsDisplayed(gridElements.gridCounter);
        await w.waitUntilElementIsClickable(gridElements.gridCounter);
        const result1:string = await gridElements.gridCounter.getText();
        const count: string[] = result.split(' ');
        const count1: string[] = result1.split(' ');
        await expect(parseInt(count[4])+1).toEqual(parseInt(count1[4]));
    };

    async deleteAPart(){
        let result:string;
        if(await gridElements.gridCounters.get(0).getText() == ''){
            result = await gridElements.gridCounters.get(1).getText()
        } else {
            result = await gridElements.gridCounters.get(0).getText()
        }
        await modal.openModalWithButtonByName(buttonNames.deletePart);
        await modal.closeModalWithButton(buttonNames.yesItIsOkTodeleteThem);
        await w.waitUntilElementNotDisplayed(gridElements.selectedCheckbox.get(0));
        await w.waitUntilElementIsDisplayed(gridElements.gridCounter);
        await w.waitUntilElementIsClickable(gridElements.gridCounter);
        let  result1:string = await gridElements.gridCounter.getText();
        let count: string[] = result.split(' ');
        let count1: string[] = result1.split(' ');
        await expect(parseInt(count[4])-1).toEqual(parseInt(count1[4]));
    };

}