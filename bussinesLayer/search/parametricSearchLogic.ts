import {allureStep} from "../../helper/allure/allureSteps";
import {Button} from "../../components/simple/button";
import {buttonNames, linksNames} from "../../testData/global";
import {commonElements, gridElements, homeElements, searchElements} from "../../elements/elements";
import {ElementAttributes} from "../../utils/elementAttributes";
import {element, by, browser} from "protractor";
import {Input} from "../../components/simple/input";
import {Link} from "../../components/simple/link";
import {Waiters as w} from "../../helper/waiters";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input = new Input();
const link: Link = new Link();

export class ParametricSearchLogic {

    selectedAttribute: string;
    selectedCommodities: string;
    selectedPartTypes: string;
    selectedCategory: string;
    selectedValue: string;

    constructor() {
        this.selectedAttribute = '';
        this.selectedCommodities = '';
        this.selectedPartTypes = '';
        this.selectedCategory = '';
        this.selectedValue = '';
    }

    public async performParametricSearch() {
        await allureStep('Perform Parametric search with', async () => {
            await browser.waitForAngularEnabled(false);
            await w.waitUntilElementIsDisplayed(searchElements.parametric.commodities.get(0));
            await button.clickOnTheElement(searchElements.parametric.commodities.get(0));
            await w.waitUntilElementIsDisplayed(searchElements.parametric.partTypes.get(0));
            await button.clickOnTheElement(searchElements.parametric.partTypes.get(0));
            await w.waitUntilElementIsDisplayed(searchElements.parametric.categories.get(0));
            await button.clickOnTheElement(searchElements.parametric.categories.get(0));
            await browser.executeScript("document.querySelectorAll('.btn')[0].scrollIntoView()");
            await button.clickByButtonName(buttonNames.findMatchingValues);
            await w.waitUntilElementIsDisplayed(searchElements.parametric.attribute.get(0));
            await button.clickOnTheElement(searchElements.parametric.attribute.get(0));
            await w.waitUntilElementIsDisplayed(searchElements.parametric.value.get(0));
            await button.clickOnTheElement(searchElements.parametric.value.get(0));
            await button.clickByButtonName(buttonNames.add);
            await browser.sleep(2000);
            await button.clickByButtonName(buttonNames.search);
            await w.waitUntilElementIsDisplayed(gridElements.grid);
            await w.waitUntilElementIsClickable(gridElements.grid);
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1))
        });
    };

    public async performParametricSearchForHeatShrinks() {
        await allureStep('Perform Parametric search for heat shrinks category', async () => {
            await browser.waitForAngularEnabled(false);
            await w.waitUntilElementIsDisplayed(searchElements.parametric.commodities.get(0));
            await button.clickOnTheElement(searchElements.parametric.commodities.get(2));
            await w.waitUntilElementIsDisplayed(searchElements.parametric.partTypes.get(0));
            await button.clickOnTheElement(searchElements.parametric.partTypes.get(2));
            await w.waitUntilElementIsDisplayed(searchElements.parametric.categories.get(0));
            await button.clickOnTheElement(searchElements.parametric.categories.get(1));
            await browser.executeScript("document.querySelectorAll('.btn')[0].scrollIntoView()");
            await button.clickByButtonName(buttonNames.findMatchingValues);
            await w.waitUntilElementIsDisplayed(searchElements.parametric.attribute.get(0));
            await button.clickOnTheElement(searchElements.parametric.attribute.get(0));
            await w.waitUntilElementIsDisplayed(searchElements.parametric.value.get(0));
            await button.clickOnTheElement(searchElements.parametric.value.get(0));
            await button.clickByButtonName(buttonNames.add);
            await browser.sleep(2000);
            await button.clickByButtonName(buttonNames.search);
            await w.waitUntilElementIsDisplayed(gridElements.grid);
            await w.waitUntilElementIsClickable(gridElements.grid);
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1))
        });
    };




    public async performExactParametricSearch(commodities: number, partTypes: number, categories?: number, attribute?: number, value?: number) {
        await allureStep('Perform exact Parametric search with', async () => {
            await browser.waitForAngularEnabled(false);
            await w.waitUntilElementIsDisplayed(searchElements.parametric.commodities.get(commodities));
            await button.clickOnTheElement(searchElements.parametric.commodities.get(commodities));
            await w.waitUntilElementIsDisplayed(searchElements.parametric.partTypes.get(partTypes));
            await button.clickOnTheElement(searchElements.parametric.partTypes.get(partTypes));
            if (categories >= 0) {
                await w.waitUntilElementIsDisplayed(searchElements.parametric.categories.get(categories));
                await button.clickOnTheElement(searchElements.parametric.categories.get(categories));
                await browser.executeScript("document.querySelectorAll('.btn')[0].scrollIntoView()");
                await button.clickByButtonName(buttonNames.findMatchingValues);
                await w.waitUntilElementIsDisplayed(searchElements.parametric.attribute.get(attribute));
                await button.clickOnTheElement(searchElements.parametric.attribute.get(attribute));
                await w.waitUntilElementIsDisplayed(searchElements.parametric.value.get(value));
                await button.clickOnTheElement(searchElements.parametric.value.get(value));
                await button.clickByButtonName(buttonNames.add);
                await browser.sleep(2000);
            }
            else {
                await browser.executeScript("document.querySelectorAll('.btn')[0].scrollIntoView()");
                await button.clickByButtonName(buttonNames.findMatchingValues);
            }
            await button.clickByButtonName(buttonNames.search);
            await w.waitUntilElementIsDisplayed(gridElements.grid);
            await w.waitUntilElementIsClickable(gridElements.grid);
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
        });
    };

    public async performQuickParametricSearch(commodities: number = 0, partTypes: number = 0, categories: number = 0) {
        await allureStep('Perform exact Parametric search with', async () => {
            await browser.waitForAngularEnabled(false);
            await w.waitUntilElementIsDisplayed(searchElements.parametric.commodities.get(commodities));
            await button.clickOnTheElement(searchElements.parametric.commodities.get(commodities));
            await w.waitUntilElementIsDisplayed(searchElements.parametric.partTypes.get(partTypes));
            await button.clickOnTheElement(searchElements.parametric.partTypes.get(partTypes));
            if (categories >= 0) {
                await w.waitUntilElementIsDisplayed(searchElements.parametric.categories.get(categories));
                await button.clickOnTheElement(searchElements.parametric.categories.get(categories));
                await browser.executeScript("document.querySelectorAll('.btn')[0].scrollIntoView()");
                await button.clickByButtonName(buttonNames.findMatchingValues);
                await w.waitUntilElementNotDisplayed(await button.returnButtonByText(buttonNames.findMatchingValues));
            }
            else {
                await browser.executeScript("document.querySelectorAll('.btn')[0].scrollIntoView()");
                await button.clickByButtonName(buttonNames.findMatchingValues);
            }
            await button.clickByButtonName(buttonNames.search);
            await w.waitUntilElementIsDisplayed(gridElements.grid);
            await w.waitUntilElementIsClickable(gridElements.grid);
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
        });
    };

    public async boxLabelChecking(option: number, label: string) {
        await expect(await searchElements.parametric.boxesLabels.get(option).getText()).toEqual(label);
    };

    public async iconLinkChecking(linkTitle: string) {
        const allRows: number = await gridElements.newGridRows.count();
        let rowIconTitles: string[] = [];
        for (let i = 0; i < allRows; i++) {
            let rowIcons: number = await gridElements.newGridLockedColumnLinksByRowAndCellNumbers(i, 0).count();
            for (let y = 0; y < rowIcons; y++) {
                let titleIcon: string = await elementAttributes.getElementAttribute(await gridElements.newGridLockedColumnLinksByRowAndCellNumbers(i, 0).get(y), 'title');
                rowIconTitles.push(titleIcon);
            }
            await expect(await rowIconTitles.indexOf(linkTitle) != -1).toBeTruthy();
        }
    };

    async selectAttribute(option: number = 0) {
        await allureStep('Select attribute', async () => {
            await w.waitUntilElementIsClickable(searchElements.parametric.attribute.get(option));
            await button.clickOnTheElement(searchElements.parametric.attribute.get(option));
            this.selectedAttribute = await searchElements.parametric.attribute.get(option).getText();
            await w.waitUntilElementIsClickable(searchElements.parametric.value.get(0));
            await expect(await searchElements.parametric.value.get(0).isDisplayed()).toBeTruthy();
        })
    };

    async selectCommodities(option: number = 0) {
        await allureStep('Select commodity', async () => {
            await w.waitUntilElementIsDisplayed(searchElements.parametric.commodities.get(option));
            await button.clickOnTheElement(searchElements.parametric.commodities.get(option));
            this.selectedCommodities = await searchElements.parametric.commodities.get(option).getText();
            await w.waitUntilElementIsClickable(searchElements.parametric.partTypes.get(0));
            await expect(await searchElements.parametric.partTypes.get(0).isDisplayed()).toBeTruthy();
        });
    };

    async entryBoxChecking(title) {
        await expect(await elementAttributes.getElementAttribute(commonElements.entryTextBox, 'value'))
            .toEqual(title);
    }

    private _getWords(str: string, number: number) {
        return str.split(/\s+/).slice(0, number).join(" ");
    };

    public async selectPartTypes(option: number = 0) {
        await allureStep('Select part type', async () => {
            await button.clickOnTheElement(searchElements.parametric.partTypes.get(option));
            let temp = await searchElements.parametric.partTypes.get(option).getText();
            this.selectedPartTypes = this._getWords(temp, 1);
            await w.waitUntilElementIsClickable(searchElements.parametric.categories.get(0));
            await expect(await  searchElements.parametric.categories.get(0).isDisplayed()).toBe(true);
        });
    };

    public async boxLabel2Checking(label, label2) {
        await expect(await searchElements.parametric.boxesLabels2.get(0).getText()).toEqual(label);
        await expect(await searchElements.parametric.boxesLabels2.get(1).getText()).toContain(label2);
    };

    public async selectCategories(option: number = 0) {
        await allureStep('Select category', async () => {
            await button.clickOnTheElement(searchElements.parametric.categories.get(option));
            let temp = await searchElements.parametric.categories.get(option).getText();
            this.selectedCategory = this._getWords(temp, 2);
            await expect(button.returnButtonByText(buttonNames.findMatchingValues).isEnabled()).toBeTruthy();
        });
    };

    public async selectCategoriesDesiredByValue(option: number = 0) {
        await allureStep("Select category and show 'By Value' box", async () => {
            await button.clickOnTheElement(searchElements.parametric.categories.get(option));
            let temp = await searchElements.parametric.categories.get(option).getText();
            this.selectedCategory = this._getWords(temp, 2);
            await w.waitUntilElementIsClickable(searchElements.parametric.boxesLabels.get(3));
            await expect(await searchElements.parametric.boxesLabels.get(3).isDisplayed()).toBeTruthy();
        });
    };

    public async fillDesiredByValue(desiredValue: string) {
        await allureStep("fill desired field in 'By Value' box", async () => {
            await input.fillFieldWithValue(searchElements.parametric.byValueInput, desiredValue);
            await expect(button.returnButtonByText(buttonNames.findMatchingValues).isEnabled()).toBeTruthy();
        });
    };

    public async goToAttributes(attributeOption: string) {
        await button.clickByButtonName(buttonNames.findMatchingValues);
        await w.waitUntilElementIsClickable(element(by.cssContainingText('.list-group-item', attributeOption)));
        await expect(button.returnButtonByText(buttonNames.search).isDisplayed()).toBeTruthy();
    };

    async selectAttributeValue() {
        await allureStep('Select Attributes Value', async () => {
            await w.waitUntilElementIsClickable(searchElements.parametric.value.get(0));
            await button.clickOnTheElement(searchElements.parametric.value.get(0));
            this.selectedValue = await searchElements.parametric.value.get(0).getText();
            await button.clickByButtonName(buttonNames.add);
            await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeTruthy();
            await expect(await searchElements.parametric.addedFilter.get(0).isDisplayed()).toBeTruthy();
        });
    };

    async filterValue() {
        await expect(await searchElements.parametric.addedFilter.get(0).all(by.css('div')).getText())
            .toEqual(['(1) ' + this.selectedAttribute + ':', this.selectedValue.split(' (')[0]]);
    };

    public async clearAttributeFilters() {
        await link.clickOnTheLinkByName(linksNames.clear);
        await expect(await searchElements.parametric.addedFilter.count()).toEqual(0);
        await expect(await searchElements.parametric.value.count()).toEqual(0);
    };

    public async clearCategoryInputField() {
        await w.waitUntilElementIsDisplayed(searchElements.parametric.attribute.get(0));
        await w.waitUntilElementIsDisplayed(await commonElements.commonTypeAheadInputsXbutton.get(0));
        await w.waitUntilElementIsClickable(await commonElements.commonTypeAheadInputsXbutton.get(0));
        await button.clickOnTheElementAndWait(await commonElements.commonTypeAheadInputsXbutton.get(0), await searchElements.parametric.commodities.get(0))
    };

    public async backToMyBom() {
        await w.waitUntilElementIsDisplayed(await button.returnButtonByText(buttonNames.backToMyBom));
        await w.waitUntilElementIsClickable(await button.returnButtonByText(buttonNames.backToMyBom));
        await button.clickOnTheElementAndWait(await button.returnButtonByText(buttonNames.backToMyBom), await gridElements.checkboxSelector.get(1));
        await expect(homeElements.instructionPanelHeader.getText()).toEqual('BOM Details');
    };
}