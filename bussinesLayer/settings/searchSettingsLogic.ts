import {Dropdown} from "../../components/dropdown";

import {gridElements, searchElements, settings, partDetailsElements} from "../../elements/elements";
import {SettingsLogic} from "./settingsLogic";

const settingsLogic = new SettingsLogic();
import {QuickSearch} from "../../components/quickSearch";

const quickSearch = new QuickSearch();
import {commonSearch} from "../../testData/search";
import {Toolbar} from "../../components/toolbar";
import {buttonNames, fieldStatuses, meganavItems} from "../../testData/global";

const toolbar = new Toolbar();
import {browser} from "protractor";
import {Meganav} from "../../components/meganav";

const meganav = new Meganav();
import {ElementAttributes} from "../../utils/elementAttributes";

const elementAttributes = new ElementAttributes();
import {RadioButton} from "../../components/simple/radioButton";

const radioButton = new RadioButton();
import {MultiSelect} from "../../components/multiSelect";

const multiSelect = new MultiSelect();
import {CheckBox} from "../../components/simple/checkBox";

const checkBox = new CheckBox();
import {Modal} from "../../components/modal";

const modal = new Modal();
import {ViewAlternatesLogic} from "../partDetails/viewAlternatesLogic";

const viewAlternatesLogic = new ViewAlternatesLogic();
import {Button} from "../../components/simple/button";

const button = new Button();
import {Waiters as w} from "../../helper/waiters";
import {quickSearchElements} from "../../elements/elements";
import {expectToEqual} from "../../helper/allure/allureSteps";

const statusBool: any = {
    'ng-empty': false,
    'ng-not-empty': true
};

export class SearchSettingsLogic {


    public async ignoreSpecCharInPartsSearch(status: string) {
        await checkBox.checkUnCheckCheckboxes(settings.searchSettings.ignoreCheckboxLabel,
            settings.searchSettings.ignoreCheckboxInput, status);
        await settingsLogic.saveSettings();
        await w.waitUntilElementIsClickable(settings.searchSettings.ignoreCheckboxLabel.get(0));
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await expect(await searchElements.parts.ignoreSpecCherInput.first().isSelected())
            .toEqual(statusBool[status]);
    };

    public async ignoreSpecCharInQuickSearch(status: string) {

        await checkBox.checkUnCheckCheckboxes(settings.searchSettings.ignoreCheckboxLabel,
            settings.searchSettings.ignoreCheckboxInput, status);
        await settingsLogic.saveSettings();
        await w.waitUntilElementIsClickable(settings.searchSettings.ignoreCheckboxLabel.get(0));
        await quickSearch.openQuickSearchDropdwon();
        await expect(await quickSearchElements.ignoreSpecCharInput.isSelected())
            .toEqual(statusBool[status]);
    };

    private async _setSearchType(searchType: string) {
        await Dropdown.openDropdownByClickOnElement(settings.searchSettings.searchTypeDropdownToggle);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(searchType);
        await settingsLogic.saveSettings();
        await w.waitUntilElementIsClickable(settings.searchSettings.ignoreCheckboxLabel.get(0));
    };

    public async checkingSearchTypeAdvancedSearch(searchType: string) {
        await this._setSearchType(searchType);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        let searchTypeReplacment = searchType.split(' ');
        for (let i: number = 0; i < searchTypeReplacment.length; i++) {
            if (searchTypeReplacment[i] == '#') {
                searchTypeReplacment[i] = 'Number'
            }
        }
        let value: number;
        let text = await searchElements.parts.partsSearchRadioButtonsLabels.getText();
        for (let i: number = 0; i < text.length; i++) {
            if (text[i] === searchTypeReplacment.join(' ')) {
                value = i;
                break
            }
        }
        await expect(await searchElements.parts.partsSearchRadioButtonsInputs.get(value).isSelected())
            .toEqual(statusBool[fieldStatuses.fillField]);
    };

    public async checkingSearchTypeQuickSearch(searchType: string) {
        await this._setSearchType(searchType);
        await quickSearch.openQuickSearchDropdwon();
        let value: number;
        let text = await quickSearchElements.simpleSearchRadioButtonLabels.getText();
        for (let i: number = 0; i < text.length; i++) {
            if (text[i] === searchType) {
                value = i;
                break
            }
        }
        await expect(await quickSearchElements.simpleSearchRadioButtonInputs.get(value).isSelected())
            .toEqual(statusBool[fieldStatuses.fillField]);
    };

    private async _setKeywordMatchType(searchType: string) {
        await Dropdown.openDropdownByClickOnElement(settings.searchSettings.keywordDropdownToggle);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(searchType);
        await settingsLogic.saveSettings();
    };

    public async checkingKeywordQuickSearch(searchType: string) {
        await this._setKeywordMatchType(searchType);
        await quickSearch.openQuickSearchDropdwon();
        await quickSearchElements.simpleSearchRadioButtonLabels.last().click();
        let value: number;
        let text = await quickSearchElements.keywordMathTypeLabels.getText();
        for (let i: number = 0; i < text.length; i++) {
            if (text[i] === searchType) {
                value = i;
                break
            }
        }
        await expect(await quickSearchElements.keywordMathTypeInputs.get(value).isSelected())
            .toEqual(true);
    };

    public async checkingKeywordAdvancedPartsSearch(searchType: string) {
        await this._setKeywordMatchType(searchType);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        let value: number;
        let text = await searchElements.parts.keywordMatchRadioButton.getText();
        for (let i: number = 0; i < text.length; i++) {
            if (text[i] === searchType) {
                value = i;
                break
            }
        }
        await expect(await searchElements.parts.keywordMatchRadioButtonInput.get(value).isSelected())
            .toBeTruthy();
    };


    private async _checkUnCheckQualificationCheckboxes(status: string) {
        let count: number = await settings.searchSettings.searchQualificationCheckboxInputs.count();
        for (let i: number = 0; i < count; i++) {
            if (!(await  elementAttributes.getElementAttribute(settings.searchSettings.searchQualificationCheckboxInputs.get(i),
                'class')).includes(status)) {
                await settings.searchSettings.searchQualificationCheckboxLabels.get(i).click();
            }
        }
    };

    public async checkCheckedQualifications(status: string, checkedStatus: any) {
        await this._checkUnCheckQualificationCheckboxes(status);
        await settingsLogic.saveSettings();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await multiSelect.openMultiSelect(0);
        let count: number = await multiSelect.multiSelectOptionInputs.count();
        for (let i: number = 0; i < count; i++) {
            await expect((await multiSelect.multiSelectOptionInputs.get(i)).isSelected()).toEqual(checkedStatus)
            // await expect(await elementAttributes.getElementAttribute(multiSelect.multiSelectOptionInputs.get(i), 'checked'))
            //     .toEqual(checkedStatus)
        }
    };


    public async cplSearchCheckingCheckedCheckbox() {
        await radioButton.checkRadioButton(settings.searchSettings.cplCheckboxLabel, settings.searchSettings.cplCheckboxInput);
        await settingsLogic.saveSettings();
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await w.waitUntilElementIsDisplayed(gridElements.newGridSimpleTextCell.get(0));
        await expect(partDetailsElements.cplIcon.get(0).isDisplayed()).toBeTruthy();
    };

    public async cplSearchCheckingUncheckedCheckbox() {
        await radioButton.uncheckRadioButton(settings.searchSettings.cplCheckboxLabel, settings.searchSettings.cplCheckboxInput);
        await settingsLogic.saveSettings();
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await w.waitUntilElementIsDisplayed(gridElements.newGridSimpleTextCell.get(0));
        await expect(partDetailsElements.cplIcon.get(0).isPresent()).toBeFalsy();
    };

    async checkUncheckAlternatesTypes(status: string) {
        await checkBox.checkUnCheckCheckboxes(settings.searchSettings.alternateTypeCheckboxLabels, settings.searchSettings.alternateTypeCheckboxInputs,
            status);

        await settingsLogic.saveSettings();
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await w.waitUntilElementIsClickable(partDetailsElements.viewAltIcon.get(0));
        await modal.openModalWithElement(partDetailsElements.viewAltIcon.get(0));
        await viewAlternatesLogic.openFilterDropdown();
        for (let i: number = 0; i < 4; i++) {
            await expect(await partDetailsElements.filterCheckboxInput.get(i).isSelected())
                .toEqual(fieldStatuses.statusBool[status]);
        }
        await modal.closeModalWithXButton();
    };

    async checkUncheckAlternatesQualifications(status: string) {
        await checkBox.checkUnCheckCheckboxes(settings.searchSettings.alternatesQualificationCheckboxLabels,
            settings.searchSettings.alternatesQualificationCheckboxInputs,
            status);
        await settingsLogic.saveSettings();
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await w.waitUntilElementIsClickable(partDetailsElements.viewAltIcon.get(0));
        await modal.openModalWithElement(partDetailsElements.viewAltIcon.get(0));
        await viewAlternatesLogic.openFilterDropdown();
        for (let i: number = 5; i < 9; i++) {
            await expect(await partDetailsElements.filterCheckboxInput.get(i).isSelected()).
               toEqual(fieldStatuses.statusBool[status]);
        }
        await modal.closeModalWithXButton();
    }

    public async goToSavedSearches() {
        await button.clickOnTheElement(settings.savedSearches);
        await w.waitUntilElementIsClickable(gridElements.grid);
    }
}