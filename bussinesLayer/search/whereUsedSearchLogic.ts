import {allureStep} from "../../helper/allure/allureSteps";
import {Button} from "../../components/simple/button";
import {dropdownElements, commonElements, partDetailsElements, searchElements} from "../../elements/elements";
import {browser} from "protractor";
import {buttonNames, linksNames} from "../../testData/global";
import {Dropdown} from "../../components/dropdown";
import {ElementAttributes} from "../../utils/elementAttributes"
import {Input} from "../../components/simple/input";
import {Link} from "../../components/simple/link";
import {SearchLogic} from "./searchLogic";
import {TypeAhead} from "../../components/typeAhead";
import {Waiters as w} from "../../helper/waiters";
import {whereUsedSearchConst} from "../../testData/search";

const elementAttributes: ElementAttributes = new ElementAttributes();
const button: Button = new Button();
const input: Input = new Input();
const link: Link = new Link();
const searchLogic: SearchLogic = new SearchLogic();
const typeAhead: TypeAhead = new TypeAhead();

export class WhereUsedSearchLogic {

    public async performWhereUsedSearch(value: string, fieldNumber: number = 2) {
        await allureStep('Perform Where Used search with' + value, async () => {
            await input.fillFieldWithValue(searchElements.whereUsedSearchField.get(fieldNumber), value);
            await searchLogic.performSearch();
            //temporaray decision
            await browser.sleep(500);
        });
    };

    public async performWhereUsedSearchWithFillingSeveralFieds(values: string[], fieldNumbers: number []) {
        await allureStep('Perform Where Used search with' + values, async () => {
            for (let i: number = 0; i < fieldNumbers.length; i++) {
                await input.fillFieldWithValue(searchElements.whereUsedSearchField.get(fieldNumbers[i]), values[i]);
            }
            await searchLogic.performSearch();
        });
    };

    public async performWhereUsedSearchWithRefine(value: string) {
        await allureStep('Perform Where Used search with' + value, async () => {
            await input.fillFieldWithValue(searchElements.whereUsedSearchField.get(2), value);
            await searchLogic.performSearch();
            await link.clickOnTheLinkByNameAndWaitForElement(linksNames.refine, button.returnButtonByText(buttonNames.search));
        });
    };

    public async performWhereUsedSearchByMatchedManufacturerName(value: string) {
        await allureStep('Perform Where Used search with' + value, async () => {
            await typeAhead.typeAheadChecking(searchElements.whereUsedSearchMatchedManufacturerNameField, value)
            await button.clickByButtonName(buttonNames.addCapLet);
            await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.search));
            await button.returnButtonByText(buttonNames.search).isEnabled()
            await searchLogic.performSearch();
            await expect(!partDetailsElements.noResultsFound.isPresent());
        });
    };

    async labelsChecking() {
        let expectedLabels = ['Internal Part Number:', 'Matched Manufacturer Part Number:',
            'Matched Manufacturer Name:', 'Imported Manufacturer Part Number:', 'Imported Manufacturer Name:'];
        let labels = await searchElements.whereUsed.labels.getText();
        await expect(labels).toEqual(expectedLabels);
    };

    public async expandFilter(iconFilter: number, dropdownFilter: number = 0) {
        await button.clickOnTheElement(searchElements.whereUsed.filterIcon.get(iconFilter));
        await expect(await searchElements.whereUsed.helpMessage.get(dropdownFilter).isPresent()).toBe(true);
        await Dropdown.openDropdownByClickOnElement(searchElements.whereUsed.dropdown.get(dropdownFilter));
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(whereUsedSearchConst.dropdownValues);
    };

    public async fillExactFilter(value: string, numberFilter: number) {
        await this.clearAllSearchFields();
        await this.fillExactField(value, numberFilter);
        await this.expandFilter(numberFilter);
        await expect(await elementAttributes.getElementAttribute(searchElements.whereUsed.filterField.get(0),
            'value')).toEqual(value);
    };

    async clearCloseFilter(option: number) {
        await browser.executeScript("document.querySelectorAll('.btn-link')[1].scrollIntoView()");
        await button.clickByButtonName(buttonNames.clear);
        await button.clickOnTheElement(searchElements.whereUsed.filterIcon.get(option));
        await expect(await searchElements.whereUsed.helpMessage.get(0).isPresent()).toBe(false);
    };

    async clearAllSearchFields() {
        await button.clickByButtonName(buttonNames.clearAllSmallA);
        await expect(await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value'))
            .toEqual('');
        for (let i: number = 0; i < await searchElements.whereUsedSearchField.count(); i++) {
            await expect(await elementAttributes.getElementAttribute(searchElements.whereUsedSearchField.get(i),
                'value')).toEqual('');
        }
    };

    async fillExactField(value: string, inputsNumber: number) {
        await input.fillFieldWithValue(searchElements.whereUsedSearchField.get(inputsNumber), value);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.search));
    }

    async fillAllFields(value: string) {
        await input.fillFieldWithValue(searchElements.whereUsedSearchField, value);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.search));
    }
}