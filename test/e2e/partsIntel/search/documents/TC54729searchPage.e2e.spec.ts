import {Button} from "../../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, columnHeaders, fieldStatuses, meganavItems} from "../../../../../testData/global";
import {CheckBox} from "../../../../../components/simple/checkBox";
import {commonElements, searchElements} from "../../../../../elements/elements";
import {DocumentsSearchLogic} from "../../../../../bussinesLayer/search/documentsSearchLogic";
import {commonSearch, docSearchConst} from "../../../../../testData/search";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {Grid} from "../../../../../components/grid";
import {HelpLogic} from "../../../../../bussinesLayer/help/helpLogic";
import {InstructionPanel} from "../../../../../components/instructionPanel";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";
import {TypeAhead} from "../../../../../components/typeAhead";

const button: Button = new Button();
const checkbox = new CheckBox();
const documentsSearchLogic: DocumentsSearchLogic = new DocumentsSearchLogic();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const helpLogic: HelpLogic = new HelpLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const searchLogic: SearchLogic = new SearchLogic();
const typeAhead: TypeAhead = new TypeAhead();

describe('TC54729 Documents Search - search page', () => {

    it('should navigate to search page', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await expect(browser.getCurrentUrl()).toContain("/search/documents")
    });

    it('should check accordion title', async () => {
        await searchLogic.searchCriteriaChecking('Document Search Criteria');
    });

    it('should check ghost text in search field', async () => {
        await searchLogic.ghostTextSearchFieldChecking(searchElements.searchField, 'Enter Keyword...');
    });

    it('should check ghost text in Matched Manufacturer Name search field', async () => {
        await searchLogic.ghostTextSearchFieldChecking(commonElements.commonTypeAheadInput, 'Enter manufacturer name (type ahead)');
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Documents Search');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Document search');
    });

    it('should be search field and Documents Type checkboxes labels - Document Search page', async () => {
        await documentsSearchLogic.labelsChecking()
    });

    it('should nothing happened by clicking on the search criteria accordion', async () => {
        await searchLogic.doNotShowOptionToSearchByClickingOnSearchCriteria();
    });

    it("'Search' button should be inactive by default", async () => {
        await expect(await button.returnButtonByText(buttonNames.search).isDisplayed()).toBe(true);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it("should be checked Document Types checkboxes by default - 'Datasheets' and 'PCN, EOL, PDN, and other notices'", async () => {
        await documentsSearchLogic.helpCheckboxState(fieldStatuses.fillField, fieldStatuses.emptyField);
    });

    it("should check Document Types checkboxes by default through clicking 'Clear' link", async () => {
        await checkbox.checkUnCheckCheckboxes(searchElements.documents.docSearchCheckboxLabel,
            searchElements.documents.docSearchCheckboxInput, fieldStatuses.emptyField);
        await documentsSearchLogic.clearExactSearchFilters(0);
        await documentsSearchLogic.helpCheckboxState(fieldStatuses.fillField, fieldStatuses.emptyField);
        await checkbox.checkUnCheckCheckboxes(searchElements.documents.docSearchCheckboxLabel,
            searchElements.documents.docSearchCheckboxInput, fieldStatuses.fillField);
        await documentsSearchLogic.clearExactSearchFilters(0);
        await documentsSearchLogic.helpCheckboxState(fieldStatuses.fillField, fieldStatuses.emptyField);
    });

    it('should be look ahead for Manufacturer Name - Documents Search page', async () => {
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, docSearchConst.searchCriterias[0]);
        await documentsSearchLogic.clearAllSearchFields();
    });

    it('should check that Search button is inactive if all search filters are filled except search field', async () => {
        await checkbox.checkUnCheckCheckboxes(searchElements.documents.docSearchCheckboxLabel,
            searchElements.documents.docSearchCheckboxInput, fieldStatuses.fillField);
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, docSearchConst.searchCriterias[0]);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
        await documentsSearchLogic.clearAllSearchFields();
    });

    it('should check that Search button is inactive if search fields have some criteria and all documents type checkboxes unchecked', async () => {
        await searchLogic.fillSearchFieldWithValue(searchElements.searchField, docSearchConst.searchCriteria);
        await checkbox.checkUnCheckCheckboxes(searchElements.documents.docSearchCheckboxLabel,
            searchElements.documents.docSearchCheckboxInput, fieldStatuses.emptyField);
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, docSearchConst.searchCriterias[0]);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
        await documentsSearchLogic.clearAllSearchFields();
    });

    it('should check that Search button is active if search fields have some criteria', async () => {
        await searchLogic.fillSearchFieldWithValue(searchElements.searchField, docSearchConst.searchCriteria);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(true);
        await documentsSearchLogic.clearAllSearchFields();
    });

    it('should check limit for added Type Ahead search boxes equals 9', async () => {
        await searchLogic.addTypeAheadFieldsByArray(commonElements.commonTypeAheadInputs, docSearchConst.searchCriterias);
    });

    it('should check selecting Type Ahead search fields', async () => {
        await searchLogic.selectTypeAheadFieldsByArray();
    });

    it("should check that 'Clear' link from Additional Filters works only for Type Ahead search fields", async () => {
        await documentsSearchLogic.fillAllSearchFilters(docSearchConst.searchCriteria, docSearchConst.searchCriterias[0]);
        await documentsSearchLogic.clearExactSearchFilters(1);
        await expect(await elementAttributes.getElementAttribute(searchElements.searchField, 'value'))
            .toEqual(docSearchConst.searchCriteria);
        await documentsSearchLogic.helpCheckboxState(fieldStatuses.fillField, fieldStatuses.fillField);
        await expect(await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value'))
            .toEqual('');
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(true);
    });

    it("should check that 'Clear All' button works for all document search filters across all attributes", async () => {
        await documentsSearchLogic.fillAllSearchFilters(docSearchConst.searchCriteria, docSearchConst.searchCriterias[0]);
        await documentsSearchLogic.clearAllSearchFields();
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it('should be recall searches dropdown - Documents Search Page', async () => {
        await searchLogic.recallSearchChecking();
    });

    it("should perform Document Search and display results grid with 'No results found.' if search term contains special characters", async () => {
        await searchLogic.performSearchWithoutWaitResultPage(searchElements.searchField, commonSearch.specialCharactersSearchValue);
        await searchLogic.verifySimpleModalAttributes(commonSearch.modalTitleText_3, commonSearch.modalBodyText_2,
            buttonNames.okayThanks);
    });

    it("should perform Document Search and display results grid with one result if search term contains 'A) DOC, DATASHEET (2014/03/27)'", async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch('A) DOC, DATASHEET (2014/03/27)');
        const docTitleCells: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.document[1]);
        await expect(docTitleCells.indexOf('A) DOC, DATASHEET (2014/03/27)') != -1 );
    });

    it("Manufacturer Name filter with type ahead should displays 'No matches found' under the input field, if search term contains special characters", async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await typeAhead.typeAheadNoMatchesFound(commonElements.commonTypeAheadInput, commonSearch.specialCharactersSearchValue);
    });
});