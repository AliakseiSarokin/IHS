import {buttonNames} from "../../testData/global";
import {Button} from "../../components/simple/button";
import {Dropdown} from "../../components/dropdown";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Input} from "../../components/simple/input";
import {Link} from "../../components/simple/link";
import {Modal} from "../../components/modal";
import {Toolbar} from "../../components/toolbar";
import {Shade} from "../../components/shade";
import {Waiters as w} from "../../helper/waiters";
import {bomElements, commonElements, dropdownElements, gridElements, shadeElements} from "../../elements/elements";
import {commonSearch} from "../../testData/search";
import {browser} from "protractor";
import {allureStep} from "../../helper/allure/allureSteps";

const button: Button = new Button();
const input: Input = new Input();
const elementAttributes: ElementAttributes = new ElementAttributes();
const link: Link = new Link();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const newCustomLayoutName:string = commonSearch.manageLayout.newCustomLayoutName;
export class CustomLayoutLogic {

    attributesAmout: number;
    saveAsNewDefaultName: string;

    constructor() {
        this.attributesAmout;
        this.saveAsNewDefaultName;
    }

    async selectOptionFromDropdown (value:string) {
        await Dropdown.openDropdownByClickOnElement(shadeElements.dropdownToggle);
        await link.clickOnTheLinkByNameAndWaitForElement(value, shadeElements.openedShade);
    };

    public async selectCreateNewCustomLayout () {
        await this.selectOptionFromDropdown('Create New Custom Layout');
        await expect(button.returnButtonByText(buttonNames.cancel).isDisplayed()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.saveNewCustomLayout).isDisplayed()).toBeTruthy();
    };

    async cancelCreateNewCustomLayoutWithoutEdition () {
        await button.clickByButtonName(buttonNames.cancel);
        await w.waitUntilElementIsClickable(shadeElements.openedShade);
        await expect(button.returnButtonByText(buttonNames.delete).isDisplayed()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isDisplayed()).toBeTruthy();
    };

    async cancelCreateNewCustomLayoutModalYesButton () {
        await browser.waitForAngular();
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await modal.closeModalWithButton(buttonNames.yesCancelLayout);
        await expect(button.returnButtonByText(buttonNames.saveNewCustomLayout).isPresent()).toBeFalsy();
    };

    async cancelCreateNewCustomLayoutModalNoXButton () {
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await expect(await modal.modalTitle.getText()).toEqual('Cancel New Custom Layout?');
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await modal.closeModalWithButton(buttonNames.noContinueLayout);
    };

    async addAttributeByName (attributeName:string ) {
        await allureStep(`Add attribute by name ${attributeName}`, async () => {
            await button.clickOnTheElement(bomElements.customLayout.attributeByName(attributeName));
            await button.clickOnTheElement(bomElements.customLayout.addSelectedButton);
        });
    };

    async addAttributeByRangeNames(attributeNames: string[]) {
        this.attributesAmout = attributeNames.length;
        for (let i: number = 0; i < attributeNames.length; i++) {
            await this.addAttributeByName(attributeNames[i])
        }
    }

    async addAllChecking (defaultValueNumber:number ) {
        this.attributesAmout = await bomElements.customLayout.availableAttributes.count();
        await bomElements.customLayout.addAllButton.click();
        await expect(await bomElements.customLayout.selectedAttributes.count())
            .toEqual(this.attributesAmout+defaultValueNumber);
    };

    async removeAllChecking (defaultValueNumber:number) {
        await bomElements.customLayout.removeAllButton.click();
        await expect(await bomElements.customLayout.selectedAttributes.count()).toEqual(defaultValueNumber)
    };

    async saveNewCustomLayout () {
        await input.fillFieldWithValue(bomElements.customLayout.newCustomLayoutField,newCustomLayoutName);
        await Shade.closeShadeWithButton(buttonNames.saveNewCustomLayout);
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await w.waitUntilElementNotDisplayed(modal.modalTitle);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await dropdownElements.dropdownValues.getText()).toContain(newCustomLayoutName);
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout);
    };

    async openCreatedCustomLayout (defaultValues: number, layoutName:string = newCustomLayoutName) {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton('Manage Layouts');
        await Dropdown.openDropdownByClickOnElement(shadeElements.dropdownToggle, dropdownElements.dropdownValues.get(1));
        await browser.sleep(1000);
        await w.waitUntilElementIsDisplayed(link.returnElementByLinkName(layoutName));
        await w.waitUntilElementIsClickable(link.returnElementByLinkName(layoutName));
        await link.clickOnTheLinkByNameAndWaitForElement(layoutName, shadeElements.openedShade);
        await w.waitUntilElementIsClickable( bomElements.customLayout.selectedAttributes.get(1));
        // await expect(await bomElements.customLayout.selectedAttributes.count()).toEqual(this.attributesAmout+defaultValues);
    };

    public async applyCreateLayout() {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Dropdown.selectValueInDropdownByValueName(newCustomLayoutName);
    }

    async openLayoutByName (defaultValues: number, layoutName:string = newCustomLayoutName) {
        await Dropdown.openDropdownByClickOnElement(shadeElements.dropdownToggle, dropdownElements.dropdownValues.get(1));
        await link.clickOnTheLinkByNameAndWaitForElement(layoutName, shadeElements.openedShade);
        await w.waitUntilElementIsClickable( bomElements.customLayout.selectedAttributes.get(1));
    };

    async removeOneChecking() {
        const currentValue = await bomElements.customLayout.selectedAttributes.count();
        await bomElements.customLayout.selectedAttributes.get(3).click();
        await bomElements.customLayout.removeSelectedButton.click();
        await expect(await bomElements.customLayout.selectedAttributes.count()).toEqual(currentValue-1)
    };

    async addOneChecking() {
        const currentValue = await bomElements.customLayout.availableAttributes.count();
        await bomElements.customLayout.availableAttributes.get(1).click();
        await bomElements.customLayout.addSelectedButton.click();
        await expect(await bomElements.customLayout.availableAttributes.count()).toEqual(currentValue-1)
    };

    async deleteLayout(layoutName:string = newCustomLayoutName){
        await modal.openModalWithButtonByName(buttonNames.delete);
        await expect(await modal.modalTitle.getText()).toEqual('Delete Custom Layout?');
        await browser.waitForAngularEnabled(false);
        await modal.closeModalWithButton(buttonNames.okayDeleteSelectedLayout);
        await w.waitUntilElementIsClickable(shadeElements.openedShade);
        await browser.sleep(2000);
        await Dropdown.openDropdownByClickOnElement(shadeElements.dropdownToggle, dropdownElements.dropdownValues.get(1));
        await w.waitUntilElementIsClickable(dropdownElements.dropdownValues.get(1));
        await expect(commonElements.dropdownItemByName(layoutName).isPresent()).toBeFalsy();
        await Dropdown.closeDropdownByClickOnElement(shadeElements.dropdownToggle);
    };

    async saveAsNewCustomLayout () {
        await button.clickByButtonName(buttonNames.saveAsNew);
        await w.waitUntilElementIsClickable(bomElements.customLayout.selectedAttributes.get(0));
        this.attributesAmout = await bomElements.customLayout.selectedAttributes.count();
        await input.fillFieldWithValue(bomElements.customLayout.newCustomLayoutField,newCustomLayoutName);
        await Shade.closeShadeWithButton(buttonNames.saveNewCustomLayout);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await link.returnElementByLinkName(newCustomLayoutName).isDisplayed()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout);
    };

    async saveAsNewCustomLayoutWithoutSetAName () {
        await button.clickByButtonName(buttonNames.saveAsNew);
        await w.waitUntilElementIsClickable(bomElements.customLayout.selectedAttributes.get(0));
        this.attributesAmout = await bomElements.customLayout.selectedAttributes.count();
        this.saveAsNewDefaultName = await elementAttributes.getElementAttribute(bomElements.customLayout.newCustomLayoutField,
            'value');
        await Shade.closeShadeWithButton(buttonNames.saveNewCustomLayout);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await link.returnElementByLinkName(this.saveAsNewDefaultName).isDisplayed()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout);
    };

}