import {browser} from "protractor";
import {buttonNames, fieldStatuses, linksNames, meganavItems} from "../../../../testData/global";
import {CheckBox} from "../../../../components/simple/checkBox";
import {commonElements, gridElements, modalElements, searchElements} from "../../../../elements/elements";
import {commonSearch} from "../../../../testData/search";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {MultiSelect} from "../../../../components/multiSelect";
import {PartsSearchLogic} from "../../../../bussinesLayer/search/partsSearchLogic";
import {RadioButton} from "../../../../components/simple/radioButton";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {TypeAhead} from "../../../../components/typeAhead";

const checkbox = new CheckBox();
const helpLogic: HelpLogic = new HelpLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const multiSelect: MultiSelect = new MultiSelect();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const radioButton = new RadioButton();
const searchLogic: SearchLogic = new SearchLogic();
const typeAhead: TypeAhead = new TypeAhead();
describe('Part Search - search page', () => {

    it('should navigate to search page', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await expect(browser.getCurrentUrl()).toContain("/search/parts");
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Parts Search');
    });

    it('should open help panel and check title', async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Part search (advanced)');
    });

    it('should nothing happened by clicking on the search criteria accordion', async () => {
        await searchLogic.doNotShowOptionToSearchByClickingOnSearchCriteria();
    });

    it('should be field labels - parts search page', async () => {
        await partsSearchLogic.labelsChecking();
    });

    it('should be Enter Part Number search box with type ahead option', async () => {
        await typeAhead.typeAheadChecking(searchElements.searchField, '1234');
    });

    it('should be radio buttons ', async () => {
        let keyword = await searchElements.parts.keywordRadioButton.getText();
        await expect(keyword).toEqual(['Keyword Search', 'All', 'Any', 'Exact']);
        let labels = await searchElements.parts.partsSearchRadioButtonsLabels.getText();
        await expect(labels).toEqual(['Exact Part Number', 'Part Number Starts With',
            'Part Number Contains', 'ObjectID Search']);
    });

    it('should be info text depending on checked radio button - Exect Purt Number', async () => {
        const infoText = 'Exact Part #: Part numbers will match the full search term, exactly as entered. ' +
            'For example, \'2n2222ab-1\' will match \'2N2222AB-1\' exactly, including any special characters.' +
            ' Special characters will only be excluded if the "Ignore Special Characters" option is checked.';
        await partsSearchLogic.infoSectionChecking(searchElements.parts.partsSearchRadioButtonsLabels.get(0),
            searchElements.parts.partsSearchRadioButtonsInputs.get(0), infoText);
    });

    it('should be info text depending on checked radio button - Part # Starts With', async () => {
        const infoText = "Part # Starts With: Part numbers will be matched that start with the" +
            " search term. For example, 'lm339n' will return matching part numbers such as " +
            "'LM339N1', 'LM339N-500', etc. Special characters will be excluded if the \"Ignore Special Characters\" option" +
            " is checked.";
        await partsSearchLogic.infoSectionChecking(searchElements.parts.partsSearchRadioButtonsLabels.get(1),
            searchElements.parts.partsSearchRadioButtonsInputs.get(1), infoText);
    });

    it('should be info text depending on checked radio button - Part Number Contains', async () => {
        const infoText = "Part # Contains: Part numbers will be matched containing the search term. " +
            "For example, 'bp101ah' will return matching part numbers such as '05007-BP101AHU-T', " +
            "'05006-BP101AHULB', '03028-BP101AHM-I', etc. The search term must contain at least " +
            "4 alphanumeric characters. Special characters will be excluded." +
            " The search term maximum length is 85 alphanumeric characters.";
        await partsSearchLogic.infoSectionChecking(searchElements.parts.partsSearchRadioButtonsLabels.get(2),
            searchElements.parts.partsSearchRadioButtonsInputs.get(2), infoText);
    });

    it('should be info text depending on checked radio button - Keyword', async () => {
        const infoText = "Search terms will return matches found in an item's description." +
            " Keyword search options are: \"All\" (all search terms entered must be found in the" +
            " descriptions), \"Any\" (any of the search terms found in the descriptions will return results), or \"Exact\" " +
            "(only the exact search term entered and found in a part's descriptions will return a result)." +
            " Special characters will be excluded by default. For example, a search using the \"Any\" operator for " +
            "'ddr3 memory' will return matches such as 'MEMORY SOCKET FOR DDR3 SO-DIMM'.";
        await partsSearchLogic.infoSectionChecking(searchElements.parts.keywordRadioButton.get(0),
            searchElements.parts.keywordRadioButtonInput.get(0), infoText);
    });

    it('should be ignore spec char checkbox', async () => {
        await expect(await searchElements.parts.ignoreSpecCharLabel.get(0).getText()).toEqual('Ignore Special Characters');
        await expect(searchElements.parts.ignoreSpecCherInput.isDisplayed()).toBeTruthy();
    });

    it('should be clear for radio buttons', async () => {
        await partsSearchLogic.clearForRadioButtons();
    });

    it('should be Manufacturer Name filter with type ahead - part search', async () => {
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, '1');
    });

    it('should be clear for Manufacturer Name filter', async () => {
        await partsSearchLogic.clearForMfrName();
    });


    it('should Part Status Filter', async () => {
        const expectedPartStausCheckboxes = ['Active',
            'End of Life (EOL)',
            'Not Recommended for New Designs(NRFND)'];
        await expect(await searchElements.parts.partStausCheckboxes.getText()).toEqual(expectedPartStausCheckboxes);
    });

    it('should be clear for Part Status Filter', async () => {
        await partsSearchLogic.clearForPartStatus();
    });

    it('should be Environmental Compliance Filters', async () => {
        const envLabels = ['REACH Compliant', 'EU RoHS Compliant', 'China RoHS Compliant'];
        const envCompFilters = ['YES', 'NO', 'ANY', 'YES', 'NO', 'ANY', 'YES', 'NO', 'ANY'];
        await expect(await searchElements.parts.envRadionButtonsLabels.getText()).toEqual(envCompFilters);
    });

    it('should be clear Environmental Compliance Filters', async () => {
        await partsSearchLogic.clearForEnvRadioButtons();
    });

    it('should be recall searches dropdown', async () => {
        await searchLogic.recallSearchChecking();
    });

    it('should be Qualifications multiselect options', async () => {
        await multiSelect.openMultiSelect(0);
        const qualificationsMultiselectOptions = ['AEC-Q100', 'AEC-Q101', 'AEC-Q200', 'DLA', 'Rad Hard', 'Space', 'UL'];
        await expect(multiSelect.multiSelectOptionLabels.getText()).toEqual(qualificationsMultiselectOptions);
    });

    it('should be option to select unselect in Qualifications multiselect', async () => {
        await multiSelect.selectUnSelectAllChecking();
    });

    it('should select options in Qualifications multiselect and displayed selected options', async () => {
        await multiSelect.selectMultiSelectOptionAndDisplayInRow();
    });

    it('should deselect options in Qualifications multiselect', async () => {
        await multiSelect.deselectCheckingPartsSearch(0);
    });

    it('should clear selected option for Qualifications multiselect', async () => {
        await multiSelect.openMultiSelect(1);
        await multiSelect.selectUnSelectAllChecking();
        await multiSelect.selectMultiSelectOptionAndDisplayInRow();
        await link.clickOnTheLinksByNameAndIndex(linksNames.clear, 4);
    });

    it('should be Qualifications Temperature Grade options', async () => {
        await multiSelect.openMultiSelect(1);
        const qualificationsMultiselectOptions = ['Military', 'Automotive', 'Industrial', 'Commercial',
            'Commercial Extended', 'Other'];
        await expect(multiSelect.multiSelectOptionLabels.getText()).toEqual(qualificationsMultiselectOptions);
    });

    it('should be option to select unselect in Temperature Grade multiselect', async () => {
        await multiSelect.selectUnSelectAllChecking();
    });

    it('should select options in Temperature Grade multiselect and displayed selected options', async () => {
        await multiSelect.selectMultiSelectOptionAndDisplayInRow();
    });

    it('should deselect options in Temperature Grade multiselect', async () => {
        await multiSelect.deselectCheckingPartsSearch(1);
    });

    it('should clear selected option for Temperature Grade multiselect', async () => {
        await multiSelect.openMultiSelect(1);
        await multiSelect.selectUnSelectAllChecking();
        await multiSelect.selectMultiSelectOptionAndDisplayInRow();
        await link.clickOnTheLinksByNameAndIndex(linksNames.clear, 5);
    });

    it('should be cpl checkbox', async () => {
        await expect(await searchElements.parts.cplCheckboxLabel.getText()).toEqual('Show Corporate Part List (CPL) Matches');
        await expect(searchElements.parts.cplCheckboxInput.isDisplayed()).toBeTruthy();
    });

    it('should be clear for CPL checkbox', async () => {
        await partsSearchLogic.clearForCplCheckbox();
    });

    it("should be dialog window 'No Results Found' if search term contains special characters " +
        "and Exact Part Number option is chosen (Ignore Special Characters checkbox is checked)", async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await radioButton.checkRadioButton(searchElements.parts.partsSearchRadioButtonsLabels.get(0),
            searchElements.parts.partsSearchRadioButtonsInputs.get(0));
        await checkbox.checkUnCheckCheckboxes(searchElements.parts.ignoreSpecCharLabel,
            searchElements.parts.ignoreSpecCherInput, fieldStatuses.fillField);
        await searchLogic.performSearchWithoutWaitResultPage(searchElements.searchField, commonSearch.specialCharactersSearchValue);
        await searchLogic.verifyCompositeModalAttributes(commonSearch.modalTitleText_1,
            commonSearch.modalBodyCritariaText_1 + commonSearch.specialCharactersSearchValue,
            commonSearch.modalBodyQuestionText_1, buttonNames.no, buttonNames.yes);
    });

    it("should be dialog window 'No Results Found' if search term contains special characters " +
        "and Exact Part Number option is chosen (Ignore Special Characters checkbox is unchecked)", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await radioButton.checkRadioButton(searchElements.parts.partsSearchRadioButtonsLabels.get(0),
            searchElements.parts.partsSearchRadioButtonsInputs.get(0));
        await checkbox.checkUnCheckCheckboxes(searchElements.parts.ignoreSpecCharLabel,
            searchElements.parts.ignoreSpecCherInput, fieldStatuses.emptyField);
        await searchLogic.performSearchWithoutWaitResultPage(searchElements.searchField, commonSearch.specialCharactersSearchValue);
        await searchLogic.verifySimpleModalAttributes(commonSearch.modalTitleText_3,
            commonSearch.modalBodyTextEnterAlphanumeric,
            buttonNames.okayThanks);
    });

    it("should perform Parts Search and display results grid if search term contains special characters " +
        "and Part Number Starts With option is chosen (Ignore Special Characters checkbox is checked)", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await radioButton.checkRadioButton(searchElements.parts.partsSearchRadioButtonsLabels.get(1),
            searchElements.parts.partsSearchRadioButtonsInputs.get(1));
        await checkbox.checkUnCheckCheckboxes(searchElements.parts.ignoreSpecCharLabel,
            searchElements.parts.ignoreSpecCherInput, fieldStatuses.fillField);
        await partsSearchLogic.performPartsSearch(commonSearch.specialCharactersSearchValue);
    });

    it("should be dialog window 'No Results Found' if search term contains special characters " +
        "and Part Number Starts With option is chosen (Ignore Special Characters checkbox is unchecked)", async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await radioButton.checkRadioButton(searchElements.parts.partsSearchRadioButtonsLabels.get(1),
            searchElements.parts.partsSearchRadioButtonsInputs.get(1));
        await checkbox.checkUnCheckCheckboxes(searchElements.parts.ignoreSpecCharLabel,
            searchElements.parts.ignoreSpecCherInput, fieldStatuses.emptyField);
        await searchLogic.performSearchWithoutWaitResultPage(searchElements.searchField, commonSearch.specialCharactersSearchValue);
        await searchLogic.verifyCompositeModalAttributes(commonSearch.modalTitleText_1,
            `${commonSearch.modalBodyCritariaText_2}${commonSearch.specialCharactersSearchValue}`,
            commonSearch.modalBodyQuestionText_1, buttonNames.no, buttonNames.yes);
    });

    it("should be dialog window 'Notification' if search term contains special characters " +
        "and Part Number Contains option is chosen", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await radioButton.checkRadioButton(searchElements.parts.partsSearchRadioButtonsLabels.get(2),
            searchElements.parts.partsSearchRadioButtonsInputs.get(2));
        await searchLogic.performSearchWithoutWaitResultPage(searchElements.searchField, commonSearch.specialCharactersSearchValue);
        await searchLogic.verifySimpleModalAttributes(commonSearch.modalTitleText_2, commonSearch.modalBodyText_1,
            buttonNames.okayThanks);
    });

    it("should perform Parts Search and display results grid with 'No results found.' if search term contains" +
        " special characters and Keyword Search option is chosen (Match Keyword: All)", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await radioButton.checkRadioButton(searchElements.parts.keywordRadioButton.get(0),
            searchElements.parts.keywordRadioButtonInput.get(0));
        await radioButton.checkRadioButton(searchElements.parts.keywordMatchRadioButton.get(0),
            searchElements.parts.keywordMatchRadioButtonInput.get(0));
        await partsSearchLogic.performPartsSearch(commonSearch.specialCharactersSearchValue);
        await expect(await gridElements.newGridSimpleTextCell.get(0).isPresent()).toBeFalsy();
    });

    it("should perform Parts Search and display results grid with 'No results found.' if search term contains" +
        " special characters and Keyword Search option is chosen (Match Keyword: Any)", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await radioButton.checkRadioButton(searchElements.parts.keywordRadioButton.get(0),
            searchElements.parts.keywordRadioButtonInput.get(0));
        await radioButton.checkRadioButton(searchElements.parts.keywordMatchRadioButton.get(0),
            searchElements.parts.keywordMatchRadioButtonInput.get(0));
        await partsSearchLogic.performPartsSearch(commonSearch.specialCharactersSearchValue);
        await expect(await gridElements.newGridSimpleTextCell.get(0).isPresent()).toBeFalsy();
    });

    it("should perform Parts Search and display results grid with 'No results found.' if search term contains" +
        " special characters and Keyword Search option is chosen (Match Keyword: Exact)", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await radioButton.checkRadioButton(searchElements.parts.keywordRadioButton.get(0),
            searchElements.parts.keywordRadioButtonInput.get(0));
        await radioButton.checkRadioButton(searchElements.parts.keywordMatchRadioButton.get(0),
            searchElements.parts.keywordMatchRadioButtonInput.get(0));
        await partsSearchLogic.performPartsSearch(commonSearch.specialCharactersSearchValue);
        await expect(await gridElements.newGridSimpleTextCell.get(0).isPresent()).toBeFalsy();
    });

    it("Manufacturer Name filter with type ahead should displays 'No matches found' under the input field, if search term contains special characters", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await typeAhead.typeAheadNoMatchesFound(commonElements.commonTypeAheadInput, commonSearch.specialCharactersSearchValue);
    });
});
