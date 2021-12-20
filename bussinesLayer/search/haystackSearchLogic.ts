import {Actions} from "../../utils/actions";
import {allureStep} from "../../helper/allure/allureSteps";
import {Button} from "../../components/simple/button";
import {buttonNames, fieldStatuses, linksNames} from "../../testData/global";
import {by, browser} from "protractor";
import {commonElements, gridElements, searchElements, sliderElements} from "../../elements/elements";
import {ElementAttributes} from "../../utils/elementAttributes";
import {haystackSearchConst} from "../../testData/search";
import {Input} from "../../components/simple/input";
import {Link} from "../../components/simple/link";
import {Modal} from "../../components/modal";
import {RadioButton} from "../../components/simple/radioButton";
import {Random} from "../../utils/random";
import {SearchLogic} from "./searchLogic";
import {Slider} from "../../components/slider";
import {StringArray} from "../../utils/stringArray";
import {TypeAhead} from "../../components/typeAhead";
import {Waiters as w} from "../../helper/waiters";

const actions: Actions = new Actions();
const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const link: Link = new Link();
const modal: Modal = new Modal();
const radioButton: RadioButton = new RadioButton();
const random: Random = new Random();
const searchLogic: SearchLogic = new SearchLogic();
const stringArray = new StringArray();
const typeAhead: TypeAhead = new TypeAhead();

export class HaystackSearchLogic {

    public async performHaystackSearch(value: string) {
        await allureStep('Perform Haystack search with' + value, async () => {
            await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, value);
            await button.clickByButtonName(buttonNames.search);
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await browser.sleep(1000)
        });
    };

    public async fillSearchFieldWithValue(value: string) {
        await allureStep('Fill Haystack search field with ' + value, async () => {
            await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, value);
            await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeTruthy();
        });
    }

    public async performHaystackSearchWIthoutSettingValue() {
        await allureStep('Perform Haystack search', async () => {
            await button.clickByButtonName(buttonNames.search);
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await browser.sleep(1000)
        });
    };

    public async performHaystackSearchWithRefine(value: string) {
        await allureStep('Perform Haystack search with ' + value + ' and click on the refine', async () => {
            await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, value);
            await button.clickByButtonName(buttonNames.search);
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await link.clickOnTheLinkByNameAndWaitForElement(linksNames.refine, searchElements.haystack.partNumberOrNsnField);
        });
    };

    public async viewSearchCriteriaParams() {
        await expect(await commonElements.popoverContentParagP.getText()).toEqual(['Query: ' + haystackSearchConst.searchValue,
            'Type: Part Number', 'CAGE Code: None'])
    };

    public async viewSearchCriteriaNsn() {
        await searchElements.haystack.nsnRadioButtonLabel.click();
        await this.fillSearchFieldWithValue(haystackSearchConst.nsnValidSearchCriteria);
        await button.clickByButtonName(buttonNames.search);
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverContentParagP.getText()).toEqual(['Query: ' + haystackSearchConst.nsnValidSearchCriteria,
            'Type: NSN', 'CAGE Code: None'])
    };

    public async viewSearchCriteriaPartNumberWithVendor() {
        await radioButton.checkRadioButton(searchElements.haystack.partNumberRadioButtonLabel, searchElements.haystack.partNumberRadioButtonInput);
        await this.fillSearchFieldWithValue(haystackSearchConst.searchValue);
        await typeAhead.typeAheadChecking(searchElements.haystack.vendorNameField, haystackSearchConst.cageCodeSearchValue);
        await browser.sleep(500);
        const vendorSearchCriteria = await searchElements.haystack.vendorNameField.getAttribute('value');
        await button.clickByButtonName(buttonNames.search);
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverContentParagP.getText()).toEqual(['Query: ' + haystackSearchConst.searchValue,
            'Type: Part Number', 'CAGE Code: ' + vendorSearchCriteria])
    };

    public async viewSearchCriteriaVendor() {
        await button.clickByButtonName(buttonNames.clearAll);
        await typeAhead.typeAheadChecking(searchElements.haystack.vendorNameField, '123');
        const vendorSearchCriteria = await  searchElements.haystack.vendorNameField.getAttribute('value');
        await button.clickByButtonName(buttonNames.search);
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await searchLogic.viewSearchCriteriaChecking();
        await expect(await commonElements.popoverContentParagP.getText()).toEqual(['Query: None',
            'Type: Part Number', 'CAGE Code: ' + vendorSearchCriteria])
    };

    public async clearFieldWithX(xButton: any, field: any) {
        await button.clickOnTheElement(xButton);
        await expect(await elementAttributes.getElementAttribute(field, 'value')).toEqual(fieldStatuses.emptyValue);
    };

    async nsnFieldLimitationChecking() {
        await searchElements.haystack.partNumberOrNsnField.sendKeys(random.randomNumberGenerator(20));
        await expect((await elementAttributes.getElementAttribute(searchElements.haystack.partNumberOrNsnField, 'value')).length)
            .toEqual(16);
    };

    public async clearLinkChecking() {
        await link.clickOnTheLinkByName(linksNames.clear);
        await expect(await searchElements.haystack.partNumberRadioButtonInput.isSelected())
            .toBeTruthy();
        await expect(await searchElements.haystack.partNumberOrNsnField.isSelected())
            .toBeFalsy();
        await expect(await elementAttributes.getElementAttribute(searchElements.haystack.vendorNameField, 'value'))
            .toEqual(fieldStatuses.emptyValue);
    };

    public async clearAllButtonChecking() {
        await button.clickByButtonName(buttonNames.clearAll);
        await expect(await searchElements.haystack.partNumberRadioButtonInput.isSelected())
            .toBeTruthy();
        await expect(await searchElements.haystack.partNumberOrNsnField.isSelected())
            .toBeFalsy();
        await expect(await elementAttributes.getElementAttribute(searchElements.haystack.vendorNameField, 'value'))
            .toEqual(fieldStatuses.emptyValue);
    };
}

export class HaystackSliderLogic {

    nsnValue: string;

    constructor() {
        this.nsnValue;
    };

    public async openSlider() {
        this.nsnValue = await gridElements.newGridCellWithoutContentByRowIndex(0).get(0).getText();
        const name: string = await gridElements.newGridCellWithoutContentByRowIndex(0).get(2).getText();
        await Slider.openSliderByClickingOnTheElement( gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.print));
        await expect(sliderElements.sliderTitle.getText()).toEqual(haystackSearchConst.haystackSliderTitle);
        await expect(await searchElements.haystack.sliderNsnValue.getText())
            .toEqual(haystackSearchConst.haystackSliderNsnLabel(this.nsnValue));
        await expect(await searchElements.haystack.sliderNameValue.getText())
            .toEqual(haystackSearchConst.haystackSliderNameLabel(name));
    };

    public async printInSlider() {
        await browser.waitForAngularEnabled(false);
        let leftItemText: any = await searchElements.haystack.leftNavItems.getText();
        await modal.openModalWithButtonByName(buttonNames.print);
        await expect(searchElements.haystack.printLogo.isDisplayed()).toBeTruthy('logo is not displayed');
        await expect(await searchElements.haystack.printSubHeader.getText()).toEqual(haystackSearchConst.sliderPrintSubTitle);
        let printLabel = await searchElements.haystack.printModalLabels.getText();
        for (let i = 0; i < printLabel.length; i++) {
            await expect(leftItemText[i]).toContain(printLabel[i])
        }
    };

    async closePrintInSlider() {
        await modal.closeModalWithXButton();
        await  await modal.openModalWithButtonByName(buttonNames.print);
        await modal.closeModalWithButton(buttonNames.close);
    };

    async printSegmentAttributes() {
        let attributes: any = await searchElements.haystack.sliderAttributes.getText();
        let values: any = await searchElements.haystack.sliderValues.getText();
        await  await modal.openModalWithButtonByName(buttonNames.print);
        await browser.sleep(500);
        // await expect(this.printSegmentAAttributes.getText()).toEqual(attributes);
        // await expect(this.printSegmentAValues.getText()).toEqual(values);
        await modal.closeModalWithXButton();
    };
}

export class HaystackTooltips {

    public async returnColumnNumbersWithColumnDefinition() {
        let arr: any[] = [];
        let headerText = await gridElements.newGridColumnHeaders.getText();
        for (let i = 0; i < headerText.length; i++) {
            if (headerText[i] === 'RNVC') {
                i++
            }
            else if (headerText[i] === 'RNCC') {
                i++
            }
            else {
                await browser.executeScript("document.querySelectorAll('.header-title.text-elipsis')[" + i + "].click()");
                await w.waitUntilElementIsDisplayed(gridElements.sortingBox);
                await w.waitUntilElementIsClickable(gridElements.sortingBox);
                if (await link.returnElementByLinkName(linksNames.columnDefinition).isPresent()) {
                    arr.push(i)
                }
            }

        }
        return arr
    };

    public async getDataForColumn(colNumber: number) {
        let arr = [];
        const rowCellsAmount: number = await sliderElements.rowCells.count();
        const cellCount: number = await gridElements.cells.count();
        for (let i = colNumber; i < cellCount; i = i + rowCellsAmount) {
            arr.push(await gridElements.cells.get(i).getText())
        }
        return stringArray.returnUniqArray(arr)
    }

    public async openColumnDefinition(columnNumber) {
        await browser.executeScript("document.querySelectorAll('.header-title.text-elipsis')[" + columnNumber + "].click()");
        await w.waitUntilElementIsDisplayed(gridElements.sortingBox);
        await modal.openModalWithLinkName(linksNames.columnDefinition);
    };

    async openAttributeDefinition(columnNumber: number) {
        await modal.openModalWithElement(searchElements.haystack.sliderAttributeLinks.get(columnNumber));
    };

    public async returnHeaderLinkColumnDefinition() {
        let arr: any[] = [];
        let headerCount = await searchElements.haystack.sliderHeader.getText();
        for (let i = 0; i < headerCount.length; i++) {
            if (await searchElements.haystack.sliderHeader.get(i).isDisplayed()) {
                if (headerCount[i] === 'RNVC') {
                    i++
                }
                else if (headerCount[i] === 'RNCC') {
                    i++
                }
                else if (await searchElements.haystack.sliderHeader.get(i).element(by.css('a')).isPresent()) {
                    arr.push(i)
                }
            }
        }
        return arr
    };

    async openColumnDefinitionForHeaderLinks(columnNumber) {
        await modal.openModalWithElement(searchElements.haystack.sliderHeader.get(columnNumber));
    };

    protected _returnArrayIndex(value: any, array: any[]) {
        for (let i: number = 0; i < array.length; i++) {
            if (value == array[i]) {
                return i
            }
        }
    };

    public async returnSliderAttributeLinks() {
        await w.waitUntilElementIsClickable(searchElements.haystack.sliderAttributeLinks.get(0));
        let count: any = await searchElements.haystack.sliderAttributeLinks.count();
        return count
    };

    public async returnDefinition() {
        let arr: any = await searchElements.haystack.definitionDescription.getText();
        return arr
    };

    async returnCode() {
        let arr: any = await searchElements.haystack.definitionCode.getText();
        return arr
    };

    async returnTitle() {
        let title: any = await modal.modalTitle.getText();
        return title
    };

    async hoverAndCheckTooltip(colNumber: number, title: any, code: any, definition: any) {
        let arr = [];
        const rowCellsAmount: number = await gridElements.rowCells.count();
        const cellCount: number = await gridElements.cells.count();
        for (let i: number = colNumber; i < cellCount; i = i + rowCellsAmount) {
            if ((await gridElements.cells.get(i).element(by.css('a')).getText()).length > 0) {
                let value = await gridElements.cells.get(i).getText();
                await gridElements.cells.get(i).element(by.css('a')).click();
                await w.waitUntilElementIsDisplayed(commonElements.popoverContent.first());
                await expect(await commonElements.popoverContentParagP.get(0).getText()).toEqual(
                    title
                );
                await expect(await commonElements.popoverContentParagP.get(1).getText()).toEqual(
                    'Value: ' + value
                );
                let index = this._returnArrayIndex(value, code);
                if (definition[index] == undefined) {
                    definition[index] = ''
                }

                await expect(await commonElements.popoverContentParagP.get(2).getText()).toEqual(
                    definition[index]
                )
            }
            else {
                i = i + rowCellsAmount
            }
        }
    };

    async hoverAndCheckTooltipAttributeValue(colNumber, title, code, definition) {
        let arr = [];
        await searchElements.haystack.sliderValueLinks.get(colNumber).click();
        await w.waitUntilElementIsDisplayed(commonElements.popoverContent.first());
        let value = await searchElements.haystack.sliderValueLinks.get(colNumber).getText();
        await expect(await commonElements.popoverContentParagP.get(0).getText()).toEqual(
            title
        );
        await expect(await commonElements.popoverContentParagP.get(1).getText()).toEqual(
            'Value: ' + value
        );

        let index = this._returnArrayIndex(value, code);
        await expect(await commonElements.popoverContentParagP.get(2).getText()).toEqual(
            definition[index]
        )
    };

    async hoverAndCheckTooltipHeaderLinks(colNumber, titile, code, definition) {
        let arr = [];
        let rowCount = await searchElements.haystack.sliderRowCount.count();
        let cellCount = await searchElements.haystack.sliderCells.count();
        for (let i = colNumber; i < cellCount; i = i + rowCount) {
            if (await searchElements.haystack.sliderCells.get(i).element(by.css('a')).isPresent()
                && (await searchElements.haystack.sliderCells.get(i).element(by.css('a')).getText()).length > 0) {

                let value = await searchElements.haystack.sliderCells.get(i).element(by.css('a')).getText();
                await actions.mouseMoveToElement(searchElements.haystack.sliderCells.get(i).element(by.css('a')))
                //await searchElements.haystack.sliderCells.get(i).element(by.css('a')).click();
                await w.waitUntilElementIsDisplayed(commonElements.popoverContent.get(0));
                await expect(await commonElements.popoverContentParagP.get(0).getText()).toEqual(
                    titile
                );
                await expect(await commonElements.popoverContentParagP.get(1).getText()).toEqual(
                    'Value: ' + value
                );
                let index = this._returnArrayIndex(value, code);
                if (definition[index] == undefined) {
                    definition[index] = ''
                }
                await expect(await commonElements.popoverContentParagP.get(2).getText()).toEqual(
                    definition[index]
                )
            }
        }
    };

    async openModalByClickingOnTheLinkAndCompareWithData(colNumber, title, code, definition) {
        let arr = [];
        let rowCount = await searchElements.haystack.sliderRowCount.count();
        let cellCount = await searchElements.haystack.sliderCells.count();
        for (let i = colNumber; i < cellCount; i = i + rowCount) {
            if (await searchElements.haystack.sliderCells.get(i).element(by.css('a')).isPresent()
                && (await searchElements.haystack.sliderCells.get(i).element(by.css('a')).getText()).length > 0) {
                let value: string = await searchElements.haystack.sliderCells.get(i).element(by.css('a')).getText();
                await modal.openModalWithElement(searchElements.haystack.sliderCells.get(i).element(by.css('a')));
                await expect(await modal.modalTitle.getText()).toEqual(
                    title
                );
                await expect(await searchElements.haystack.definitionCode.get(0).getText()).toEqual(
                    value
                );
                let index = this._returnArrayIndex(value, code);
                if (definition[index] == undefined) {
                    definition[index] = ''
                }
                await expect(await searchElements.haystack.definitionDescription.get(0).getText()).toEqual(
                    definition[index]
                );
                await modal.closeModalWithXButton();
            }
        }
    };

    public async goToCageCode() {
        await searchElements.haystack.sliderRowCount.get(4).click();
        await w.waitUntilElementIsClickable(sliderElements.openSliderBox);
    }


}