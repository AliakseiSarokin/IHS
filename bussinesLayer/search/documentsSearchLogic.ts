import {allureStep} from "../../helper/allure/allureSteps";
import {Button} from "../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, fieldStatuses, linksNames} from "../../testData/global";
import {CheckBox} from "../../components/simple/checkBox";
import {commonElements, gridElements, searchElements} from "../../elements/elements";
import {docSearchConst} from "../../testData/search";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Grid} from "../../components/grid";
import {Link} from "../../components/simple/link";
import {Waiters as w} from "../../helper/waiters";
import {Input} from "../../components/simple/input";
import {TypeAhead} from "../../components/typeAhead";

const button: Button = new Button();
const checkbox: CheckBox = new CheckBox();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const input: Input = new Input();
const link: Link = new Link();
const typeAhead: TypeAhead = new TypeAhead();

export class DocumentsSearchLogic {

    public async performDocumentsSearch(value: string) {
        await allureStep('Perform Documents search with' + value, async () => {
            await w.waitUntilElementIsDisplayed(searchElements.documents.docSearchFieldLabels.get(0));
            await w.waitUntilElementIsDisplayed(searchElements.searchField);
            await input.fillFieldWithValue(searchElements.searchField, value);
            await button.clickByButtonName(buttonNames.search);
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async performDocumentsSearchWithRefine(value: string) {
        await allureStep('Perform Documents search with' + value + ' and click on the refine', async () => {
            await input.fillFieldWithValue(searchElements.searchField, value);
            await button.clickByButtonName(buttonNames.search);
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await link.clickOnTheLinkByNameAndWaitForElement(linksNames.refine, searchElements.searchField);
        });
    };

    public async fillAllSearchFilters(value: string, typeAheadvalue: string) {
        await allureStep('Fill all Document search fields with ' + value, async () => {
            await this.clearAllSearchFields();
            await input.fillFieldWithValue(searchElements.searchField, value);
            await checkbox.checkUnCheckCheckboxes(searchElements.documents.docSearchCheckboxLabel,
                searchElements.documents.docSearchCheckboxInput, fieldStatuses.fillField);
            await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, typeAheadvalue);
            await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeTruthy();
        });
    };

    public async viewSearchCriteriaParams() {
        await docSearchConst.searchCriteriasParams.splice(1, 0, docSearchConst.searchCriteria)
        for (let i = 1; i < docSearchConst.searchCriteriasParams.length; i++) {
            await expect(await searchElements.viewSearchCriteriaContent.get(i).getText()).toEqual(docSearchConst.searchCriteriasParams[i - 1]);
        }
    };

    public async goToViewRelatedParts(startCheckbox: number = 0, endCheckbox: number = 1) {
        await allureStep('Select a row and go to View Related Parts', async () => {
            await w.waitUntilElementIsClickable(gridElements.newGridUnlockedCellWithoutContentByRowIndex(0).get(0));
            await browser.sleep(1000);
            await w.waitUntilWorkingModalNotDisplayed();
            await grid.newMechanismCheckboxRangeChecking(startCheckbox, endCheckbox);
            await button.clickByButtonName(buttonNames.viewRelatedParts);
            await w.waitUntilElementNotDisplayed(await button.returnButtonByText(buttonNames.viewRelatedParts));
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async returnToDocSearch() {
        await allureStep('Return to doc search from View Related Parts', async () => {
            await link.clickOnTheLinkByNameAndWaitForElement(linksNames.documentSearchResults, gridElements.grid)
        });
    };

    public async helpCheckboxState(state1, state2) {
        const docSearchInputLabel = await searchElements.documents.docSearchCheckboxInput.count();
        for (let i = 0; i < 2; i++) {
            await expect(await searchElements.documents.docSearchCheckboxInput.get(i).isSelected())
                .toEqual(fieldStatuses.statusBool[state1]);
        }
        for (let i = 2; i < docSearchInputLabel; i++) {
            await expect(await searchElements.documents.docSearchCheckboxInput.get(i).isSelected())
                .toEqual(fieldStatuses.statusBool[state2]);
        }
    };

    public async checkUncheckCheckbox() {
        const docSearchCheckboxes = await searchElements.documents.docSearchCheckboxLabel.count();
        for (let i = 0; i < docSearchCheckboxes; i++) {
            await searchElements.documents.docSearchCheckboxLabel.get(i).click();
        }
        await this.helpCheckboxState(fieldStatuses.emptyField, fieldStatuses.fillField);
    };

    public async clearAllSearchFields() {
        await button.clickByButtonName(buttonNames.clearAll);
        await expect(await elementAttributes.getElementAttribute(searchElements.searchField, 'value'))
            .toEqual('');
        await expect(await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value'))
            .toEqual('');
        await this.helpCheckboxState(fieldStatuses.fillField, fieldStatuses.emptyField);
    };

    public async clearExactSearchFilters(numberLink: number) {
        await button.clickOnTheElement(link.returnElementByLinkNameAndIndex(linksNames.clear, numberLink));
    };

    public async labelsChecking() {
        await expect(await searchElements.documents.docSearchFieldLabels.get(0).getText()).toEqual(docSearchConst.searchCriteriasLabels[0]);
        await expect(await searchElements.documents.docSearchFieldLabels.get(1).getText()).toEqual(docSearchConst.searchCriteriasLabels[2]);
        await expect(await searchElements.documents.docTypeLabel.getText()).toEqual(docSearchConst.searchCriteriasLabels[1]);
        await expect(await searchElements.documents.manNameLabel.getText()).toEqual(docSearchConst.searchCriteriasLabels[3]);
        await expect(await searchElements.documents.docSearchCheckboxLabel.getText()).toEqual(docSearchConst.searchCheckboxLabels);
    };
}