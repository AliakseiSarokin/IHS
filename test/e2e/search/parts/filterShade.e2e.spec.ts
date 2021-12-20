import {Actions} from "../../../../utils/actions";
import {Login} from "../../../../components/login";

const login: Login = new Login();
import {Meganav} from "../../../../components/meganav";

const meganav: Meganav = new Meganav();
import {RadioButton} from "../../../../components/simple/radioButton";

const radioButton: RadioButton = new RadioButton();
import {PartsSearchLogic, FilterShade} from "../../../../bussinesLayer/search/partsSearchLogic";

const filterShade = new FilterShade();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
import {commonSearch} from "../../../../testData/search";
import {buttonNames, fieldStatuses, headerItems, linksNames, meganavItems, tooltips} from "../../../../testData/global";
import {
    searchElements, gridElements, quickSearchElements, dropdownElements,
    toolbarElements
} from "../../../../elements/elements";
import {browser} from "protractor";
import {Shade} from "../../../../components/shade";
import {Button} from "../../../../components/simple/button";
import {Link} from "../../../../components/simple/link";

const link: Link = new Link();
const button = new Button();

import {ElementAttributes} from "../../../../utils/elementAttributes";
import {Toolbar} from "../../../../components/toolbar";


const actions: Actions = new Actions();
const elementAttributes = new ElementAttributes();
const toolbar: Toolbar = new Toolbar();

describe('Parts Search Filters ', () => {

    it('should perform Parts Search and display results grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonNameAndWaitForElement(buttonNames.filters, dropdownElements.openFiltersDropdown);
        await Shade.openShadeWithLink(linksNames.custom);
        // await Shade.openShadeWithButton(buttonNames.filters);
        await expect(button.returnButtonByText(buttonNames.cancel).isEnabled()).toBeTruthy();
        await expect(searchElements.parts.filterSearchButton.isEnabled()).toBeFalsy();
    });

    it('should be Part Status section', async () => {
        await expect(await searchElements.parts.filterShade.sectionLabels.get(0).getText()).toEqual('Part Status:');
        const partStatusOptions = ['Active', 'End of Life (EOL)', 'Not Recommended for New Designs(NRFND)'];
        await expect(await searchElements.parts.filterShade.partStatusCheckboxLabels.getText()).toEqual(partStatusOptions);
        await filterShade.checkCheckboxes(searchElements.parts.filterShade.partStatusCheckboxInputs,
            searchElements.parts.filterShade.partStatusCheckboxLabels);
    });

    it('should be REACH Compliant section', async () => {
        await expect(await searchElements.parts.filterShade.sectionLabels.get(2).getText()).toEqual('REACH Compliant:');
        const reachCompOptions = ['YES', 'NO', 'ANY'];
        await expect(await searchElements.parts.filterShade.reachCompiliantRadioButtonLabels.getText()).toEqual(reachCompOptions);
        await filterShade.checkRadioButtons(searchElements.parts.filterShade.reachCompiliantRadioButtonInputs,
            searchElements.parts.filterShade.reachCompiliantRadioButtonLabels);
    });

    it('should be EU RoHS Compliant section', async () => {
        await expect(await searchElements.parts.filterShade.sectionLabels.get(3).getText()).toEqual('EU RoHS Compliant:');
        const euRochsCompOptions = ['YES', 'NO', 'ANY'];
        await expect(await searchElements.parts.filterShade.euRochsRadioButtonLabels.getText()).toEqual(euRochsCompOptions);
        await filterShade.checkRadioButtons(searchElements.parts.filterShade.euRochsRadioButtonInputs, searchElements.parts.filterShade.euRochsRadioButtonLabels);
    });

    it('should be China RoHS Compliant section', async () => {
        await expect(await searchElements.parts.filterShade.sectionLabels.get(4).getText()).toEqual('China RoHS Compliant:');
        const chinaRochsCompOptions = ['YES', 'NO', 'ANY'];
        await expect(await searchElements.parts.filterShade.chinaRochsRadioButtonLabels.getText()).toEqual(chinaRochsCompOptions);
        await filterShade.checkRadioButtons(searchElements.parts.filterShade.chinaRochsRadioButtonInputs,
            searchElements.parts.filterShade.chinaRochsRadioButtonLabels);
    });

    it('should be Qualifications section', async () => {
        let label = await searchElements.parts.filterShade.sectionLabels.get(5).getText();
        await expect(label).toEqual('Qualifications:');
        const qualificationsOptions = ['AEC-Q100', 'AEC-Q101', 'AEC-Q200', 'DLA', 'Rad Hard', 'Space'];
        let options = await searchElements.parts.filterShade.qualificationsCheckboxLabels.getText();
        await expect(options).toEqual(qualificationsOptions);
        await filterShade.checkCheckboxes(searchElements.parts.filterShade.qualificationsCheckboxInputs,
            searchElements.parts.filterShade.qualificationsCheckboxLabels);
    });

    it('should be Temperature Grade section', async () => {
        let label = await searchElements.parts.filterShade.sectionLabels.get(6).getText();
        await expect(label).toEqual('Temperature Grade:');
        const tempGradeOptions = ['Military', 'Automotive', 'Industrial', 'Commercial', 'Commercial Extended', 'Other'];
        let options = await searchElements.parts.filterShade.temperatureGradeCheckboxLabels.getText();
        await expect(options).toEqual(tempGradeOptions);
        await filterShade.checkCheckboxes(searchElements.parts.filterShade.temperatureGradeCheckboxInputs,
            searchElements.parts.filterShade.temperatureGradeCheckboxLabels);
    });

    it('should close shade', async () => {
        await Shade.closeShadeWithButton(buttonNames.cancel);
    });

    it('should perform Parts Search parts search with filter and display filter tag', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await filterShade.checkFilterOnSearchPage();
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await expect(link.returnElementByLinkName(linksNames.customFilters).isDisplayed()).toBeTruthy();
    });

    it('should be the same options in filter shade as in search page', async () => {
        await toolbar.openToolbarDropdownByButtonNameAndWaitForElement(buttonNames.filters, dropdownElements.openFiltersDropdown);
        await Shade.openShadeWithLink(linksNames.custom);
        // await Shade.openShadeWithButton(buttonNames.filters);
        await expect(await elementAttributes.getElementAttribute(searchElements.parts.filterShade.partStatusCheckboxInputs.get(0),
            'class')).not.toContain(fieldStatuses.dirtyField);
        await expect(await elementAttributes.getElementAttribute(searchElements.parts.filterShade.reachCompiliantRadioButtonInputs.get(0), 'class'))
            .not.toContain(fieldStatuses.dirtyField);
        await expect(await elementAttributes.getElementAttribute(searchElements.parts.filterShade.euRochsRadioButtonInputs.get(0),
            'class')).not.toContain(fieldStatuses.dirtyField);
        await expect(await elementAttributes.getElementAttribute(searchElements.parts.filterShade.chinaRochsRadioButtonInputs.get(0),
            'class')).not.toContain(fieldStatuses.dirtyField);
    });

    it('should display common filter link after setting options if filter shade', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonNameAndWaitForElement(buttonNames.filters, dropdownElements.openFiltersDropdown);
        await Shade.openShadeWithLink(linksNames.custom);
        // await Shade.openShadeWithButton(buttonNames.filters);
        await filterShade.setOptionsInShade();
        await Shade.closeShadeWithElement(searchElements.parts.filterSearchButton);
        await expect(link.returnElementByLinkName(linksNames.customFilters).isDisplayed()).toBeTruthy();
    });

    it('should be the same options in filter shade as in filter shade ', async () => {
        await toolbar.openToolbarDropdownByButtonNameAndWaitForElement(buttonNames.filters, dropdownElements.openFiltersDropdown);
        await Shade.openShadeWithLink(linksNames.custom);
        // await Shade.openShadeWithButton(buttonNames.filters);
        await expect(await searchElements.parts.filterShade.partStatusCheckboxInputs.get(0).isSelected())
            .toEqual(true);
        await expect(await searchElements.parts.filterShade.reachCompiliantRadioButtonInputs.get(0).isSelected())
            .toEqual(true);
        await expect(await searchElements.parts.filterShade.euRochsRadioButtonInputs.get(0).isSelected())
            .toEqual(true);
        await expect(await searchElements.parts.filterShade.chinaRochsRadioButtonInputs.get(0).isSelected())
            .toEqual(true);
        await expect(await searchElements.parts.filterShade.qualificationsCheckboxInputs.get(0).isSelected())
            .toEqual(true);
        await expect(await searchElements.parts.filterShade.temperatureGradeCheckboxInputs.get(0).isSelected())
            .toEqual(true);
    });
});

describe('Parts Search Filters - Custom filters, US354584', () => {

    it('should open custom filters in toolbar', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonNameAndWaitForElement(buttonNames.filters, dropdownElements.openFiltersDropdown);
    });

    it('should verify filter labels', async () => {
        await expect(await toolbarElements.customFilterDropdownLabels.getText()).toEqual(headerItems.customToolbarFilterLabels);
    });

    it('should verify filter tooltips', async () => {
        await expect(await toolbarElements.customFilterDropdownTooltips.getAttribute('title')).toEqual(tooltips.customToolbarFilterTooltips);
    });

    it('should verify filter tooltips', async () => {
        await filterShade.checkCheckboxes(toolbarElements.customFilterDropdownInputs,
            toolbarElements.customFilterDropdownLabels);
        await button.clickByButtonNameAndWait(buttonNames.apply, await toolbarElements.customFilterBadge.get(0));
    });

    it('should be corresponding badges for applied filters', async () => {
        await expect((await toolbarElements.customFilterBadge).length).toEqual(4);
    });

    it('should be corresponding badge tooltips for applied filters', async () => {
        await expect(await toolbarElements.customFilterBadge.getAttribute('title')).toEqual(tooltips.customToolbarFilterTooltips);
    });

    it('should reset custom filters', async () => {
        await toolbar.removeWithClearAll();
        await expect((await toolbarElements.customFilterBadge.get(0)).isPresent()).toBeFalsy();
    });

});