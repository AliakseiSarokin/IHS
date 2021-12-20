import {Login} from "../../../../../components/login";

const login: Login = new Login();
import {Meganav} from "../../../../../components/meganav";

const meganav: Meganav = new Meganav();
import {RadioButton} from "../../../../../components/simple/radioButton";

const radioButton: RadioButton = new RadioButton();
import {PartsSearchLogic, FilterShade} from "../../../../../bussinesLayer/search/partsSearchLogic";

const filterShade = new FilterShade();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
import {commonSearch} from "../../../../../testData/search";
import {buttonNames, fieldStatuses, linksNames, meganavItems} from "../../../../../testData/global";
import {searchElements, gridElements, quickSearchElements} from "../../../../../elements/elements";
import {browser} from "protractor";
import {Shade} from "../../../../../components/shade";
import {Button} from "../../../../../components/simple/button";
import {Link} from "../../../../../components/simple/link";

const link: Link = new Link();
const button = new Button();

import {ElementAttributes} from "../../../../../utils/elementAttributes";

const elementAttributes = new ElementAttributes();

describe('Parts Search Filters ', () => {

    it('should perform Parts Search and display results grid', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await Shade.openShadeWithButton(buttonNames.filters);
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
        await expect(await searchElements.parts.filterShade.sectionLabels.get(1).getText()).toEqual('REACH Compliant:');
        const reachCompOptions = ['YES', 'NO', 'ANY'];
        await expect(await searchElements.parts.filterShade.reachCompiliantRadioButtonLabels.getText()).toEqual(reachCompOptions);
        await filterShade.checkRadioButtons(searchElements.parts.filterShade.reachCompiliantRadioButtonInputs,
            searchElements.parts.filterShade.reachCompiliantRadioButtonLabels);
    });

    it('should be EU RoHS Compliant section', async () => {
        await expect(await searchElements.parts.filterShade.sectionLabels.get(2).getText()).toEqual('EU RoHS Compliant:');
        const euRochsCompOptions = ['YES', 'NO', 'ANY'];
        await expect(await searchElements.parts.filterShade.euRochsRadioButtonLabels.getText()).toEqual(euRochsCompOptions);
        await filterShade.checkRadioButtons(searchElements.parts.filterShade.euRochsRadioButtonInputs, searchElements.parts.filterShade.euRochsRadioButtonLabels);
    });

    it('should be China RoHS Compliant section', async () => {
        await expect(await searchElements.parts.filterShade.sectionLabels.get(3).getText()).toEqual('China RoHS Compliant:');
        const chinaRochsCompOptions = ['YES', 'NO', 'ANY'];
        await expect(await searchElements.parts.filterShade.chinaRochsRadioButtonLabels.getText()).toEqual(chinaRochsCompOptions);
        await filterShade.checkRadioButtons(searchElements.parts.filterShade.chinaRochsRadioButtonInputs,
            searchElements.parts.filterShade.chinaRochsRadioButtonLabels);
    });

    it('should be Qualifications section', async () => {
        let label = await searchElements.parts.filterShade.sectionLabels.get(4).getText();
        await expect(label).toEqual('Qualifications:');
        const qualificationsOptions = ['AEC-Q100', 'AEC-Q101', 'AEC-Q200', 'DLA'];
        let options = await searchElements.parts.filterShade.qualificationsCheckboxLabels.getText();
        await expect(options).toEqual(qualificationsOptions);
        await filterShade.checkCheckboxes(searchElements.parts.filterShade.qualificationsCheckboxInputs,
            searchElements.parts.filterShade.qualificationsCheckboxLabels);
    });

    it('should be Temperature Grade section', async () => {
        let label = await searchElements.parts.filterShade.sectionLabels.get(5).getText();
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
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await filterShade.checkFilterOnSearchPage();
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await expect(link.returnElementByLinkName(linksNames.commonFilters).isDisplayed()).toBeTruthy();
    });

    it('should be the same options in filter shade as in search page', async () => {
        await Shade.openShadeWithButton(buttonNames.filters);
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
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await Shade.openShadeWithButton(buttonNames.filters);
        await filterShade.setOptionsInShade();
        await Shade.closeShadeWithElement(searchElements.parts.filterSearchButton);
        await expect(link.returnElementByLinkName(linksNames.commonFilters).isDisplayed()).toBeTruthy();
    });

    it('should be the same options in filter shade as in filter shade ', async () => {
        await Shade.openShadeWithButton(buttonNames.filters);
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