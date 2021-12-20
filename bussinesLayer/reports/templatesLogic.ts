import {buttonNames, titles} from "../../testData/global";
import {gridElements, reportElements, pageTitles} from "../../elements/elements";
import {reportsData} from "../../testData/reports";
import {Button} from "../../components/simple/button";
import {Grid} from "../../components/grid";
import {Input} from "../../components/simple/input";
import {JsScripts} from "../../utils/jsScripts";
import {Link} from "../../components/simple/link";
import {Modal} from "../../components/modal";
import {Waiters as w} from "../../helper/waiters";
import {browser} from "protractor";
import {allureStep} from "../../helper/allure/allureSteps";
const button: Button = new Button();
const grid: Grid = new Grid();
const  input: Input = new Input();
const link: Link = new Link();
const modal: Modal = new Modal();
export class TemplatesLogic {

    public async goToStep2 () {
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(2000);
        await w.waitUntilWorkingModalNotDisplayed();
        await input.fillFieldWithValue(reportElements.customTemplates.templateNameInput, reportsData.templates.templateName);
        await JsScripts.scrollToElementByCss('.button-ct>button');
        await button.clickOnTheElement(reportElements.customTemplates.step2Button);
        await w.waitUntilElementIsClickable(reportElements.customTemplates.step2);
    };

    public async selectAllChecking (attributesList: any) {
        await reportElements.customTemplates.selects.get(1).click();
        let text = await reportElements.customTemplates.selectedValueList.getText();
        await expect(text).toEqual(attributesList);

    };

    public async goToStep3 () {
        await reportElements.customTemplates.selects.get(1).click();
        await reportElements.customTemplates.sectionTitle.get(2).click();
        await w.waitUntilElementIsClickable(reportElements.customTemplates.step3);
    };

    public async moveUpDownChecking () {
        await reportElements.customTemplates.selectedValueList.get(1).click();
        await expect( await reportElements.customTemplates.selects.get(4).isEnabled()).toBe(true);
        await expect( await reportElements.customTemplates.selects.get(5).isEnabled()).toBe(true);
    };

    public async moveDown () {
        await reportElements.customTemplates.selects.get(5).click();
        await reportElements.customTemplates.selects.get(5).click();
        await reportElements.customTemplates.selects.get(5).click();
        await reportElements.customTemplates.selects.get(5).click();
        await reportElements.customTemplates.selects.get(5).click();
        await expect(await reportElements.customTemplates.selects.get(4).isEnabled()).toBe(true);
        await expect(await reportElements.customTemplates.selects.get(5).isEnabled()).toBe(false);
    };

    public async moveUp () {
        await reportElements.customTemplates.selects.get(4).click();
        // await browser.sleep(10000)
        await expect(await reportElements.customTemplates.selects.get(4).isEnabled()).toBe(false);
        await expect(await reportElements.customTemplates.selects.get(5).isEnabled()).toBe(true);
    };

    async removeAllChecking () {
        await reportElements.customTemplates.selects.get(3).click();
        await expect(await reportElements.customTemplates.valueList.getText())
            .toEqual([ 'Candidate List Date','FMD Exists', 'Low Halogen', 'REACH Compliant', 'SVHC Over MCV','CAS Accounted for Weight (%)' ]);
    };

    async instractionBoxChecking () {
        const orderLabel = 'Ordering Columns:';
        const orderText = 'Select one or more attributes and use the Move Up and Move Down buttons to change the order of the selected attributes.'
        await expect(await reportElements.customTemplates.orderText.getText()).toEqual(orderLabel);
        await expect(await reportElements.customTemplates.tips.get(0).getText()).toEqual(orderText);
    };

    async instractionTipsChecking () {
        const tipsLabel = 'Tips for Selecting Attributes:';
        const tipsText = 'Recommend that the Imported Mfr P/N be included as a selected attribute' +
            ' in order to include all parts (matched and unmatched) in your report layout. Use the' +
            ' Attribute Group filters to see specific attributes. Once you have selected attributes,' +
            ' use the Move Up and Move Down buttons to finalize the column layout.';
        await expect(await reportElements.customTemplates.tipsText.getText()).toEqual(tipsLabel);
        await expect(await reportElements.customTemplates.tips.get(1).getText()).toEqual(tipsText);
    };

    async showAscDesc () {
        await reportElements.customTemplates.step3Item.first().click();
        await w.waitUntilElementIsClickable(reportElements.customTemplates.ascItem);
        await expect(await reportElements.customTemplates.ascItem.isDisplayed()).toBe(true);
        await expect(await reportElements.customTemplates.descItem.isDisplayed()).toBe(true);
    };

    async clickOnFirstStep3Row() {
        await reportElements.customTemplates.step3Item.first().click();
    }

    async ascSort () {
        await reportElements.customTemplates.ascItem.click();
        await expect(await reportElements.customTemplates.unsotr.get(0).isEnabled()).toBeTruthy('unsort button 1');
        await expect(await reportElements.customTemplates.unsotr.get(1).isEnabled()).toBeTruthy('unsort button 1');
    };

    async step3TipsChecking () {
        const orderLabel3 = 'Tips for Setting Sort Direction and Priority:';
        await expect( await await reportElements.customTemplates.step3Tips.getText()).toEqual(orderLabel3);
    };

    async unsortChecking () {
        await reportElements.customTemplates.unsotr.get(1).click();
        await expect(await reportElements.customTemplates.ascItem.isPresent()).toBe(false);
        await expect(await reportElements.customTemplates.descItem.isPresent()).toBe(false);
    };

    public async goToStep4() {
        await button.clickByButtonName(buttonNames.goToStep4WithoutDots);
        await w.waitUntilElementIsClickable(reportElements.customTemplates.step4);
    };

    public async goToModifyTemplate() {
        await button.clickByButtonName(buttonNames.modify);
        await w.waitUntilElementIsClickable(reportElements.customTemplates.templateNameInput);
    };

    async createTemplate () {
        await button.clickByButtonName(buttonNames.saveThisCustomTemplates);
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(0));
        await expect(await pageTitles.pageTitleShim.getText()).toEqual(titles.viewAllTemplates);
        await expect(await link.returnElementByLinkName(reportsData.templates.templateName).isPresent()).toBe(true);
    };

    async selectTemplateRowByName(templateName: string = reportsData.templates.templateName) {
        await grid.newGridSelectRowWithMatchValue(0, 'Custom Template Name', templateName);
    };


    async deleteTemplate () {
        await browser.waitForAngularEnabled(false);
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
        const rowsCount: number = await gridElements.newGridRows.count();
        await this.selectTemplateRowByName();
        await modal.openModalWithButtonByName(buttonNames.delete);
        await button.clickByButtonName(buttonNames.okayDelete);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
        await browser.sleep(1000);
        await expect(await link.returnElementByLinkName(reportsData.templates.templateName).isPresent()).toBe(false);
    };

    async deleteTemplateByName (templateName) {
        await allureStep("Delete custom template by it's name", async () => {
            await browser.waitForAngularEnabled(false);
            await this.selectTemplateRowByName(templateName);
            await modal.openModalWithButtonByName(buttonNames.delete);
            await button.clickByButtonName(buttonNames.okayDelete);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
            await browser.sleep(1000);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
            await expect(await link.returnElementByLinkName(templateName).isPresent()).toBe(false);
        });
    };



    async selectAttribute(attribute:string) {
        let list = await reportElements.customTemplates.valueList.getText();
        for (let i:number = 0; i < list.length; i++) {
            if(list[i] === attribute) {
                await reportElements.customTemplates.valueList.click();
                break
            }
        }
        await reportElements.customTemplates.selects.get(0).click();
    };

    public async openViewCustomTemplateModal () {
        const templateName: string =  (await grid.newGridReturnCellValuesByColumnName(0, 'Custom Template Name'))[0];
        await modal.openModalWithLinkName(templateName);
        await expect(await modal.modalTitle.getText()).toEqual(templateName + " Summary");
        const subtitle: string = "Overview, Attributes, Sorting Order and Filters for " +
            templateName + ".";
        await expect(await reportElements.customTemplates.modalSubtitle.getText()).toEqual(subtitle);
    };

    public async openViewCustomTemplateModalByName(templateName:string) {
        await allureStep("Open custom template modal by name", async () => {
            await modal.openModalWithLinkName(templateName);
            await expect(await modal.modalTitle.getText()).toEqual(templateName + " Summary");
            const subtitle: string = "Overview, Attributes, Sorting Order and Filters for " +
                templateName + ".";
            await expect(await reportElements.customTemplates.modalSubtitle.getText()).toEqual(subtitle);
            await w.waitUntilElementIsDisplayed(await reportElements.customTemplates.filterContainerRows.get(0));
        });
    };

    public async switchToAnotherTemplate () {
        let switchLink:string = await reportElements.customTemplates.modalTemplateLinks.get(1).getText();
        await link.clickOnTheLinkByNameAndWaitForElement(switchLink, modal.modalBody);
        await expect(await modal.modalTitle.getText()).toEqual(switchLink + " Summary");
    };
}