import {Button} from "../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {bomElements, commonElements, gridElements, homeElements, searchElements} from "../../../../elements/elements";
import {commonSearch, searchItems, whereUsedSearchConst, whereUsedSubstancesSearchConst} from "../../../../testData/search";
import {Dropdown} from "../../../../components/dropdown";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {HomeLogic} from "../../../../bussinesLayer/home/homeLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {TypeAhead} from "../../../../components/typeAhead";
import {WhereUsedSearchLogic} from "../../../../bussinesLayer/search/whereUsedSearchLogic";
import {homeItems} from "../../../../testData/home";
import {Link} from "../../../../components/simple/link";
import {Grid} from "../../../../components/grid";

const button: Button = new Button();
const helpLogic: HelpLogic = new HelpLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const searchLogic: SearchLogic = new SearchLogic();
const typeAhead: TypeAhead = new TypeAhead();
const whereUsedSearchLogic = new WhereUsedSearchLogic();
const link = new Link();
const homeLogin = new HomeLogic();
const grid: Grid = new Grid();

describe('TC51364 Where Used Search - search page', () => {

    it('should check links of search page', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await expect(await homeElements.partSearchLinks.getText()).toEqual(homeItems.searchPanelLinks);
        await meganav.clickOnTheMeganavItemByName(meganavItems.search);
        await expect(await searchElements.searchTab.getText()).toEqual(meganavItems.searchSubItem.list);
    });

    it('should go by Parts Search panel links to Where Used Substances', async () => {
        await link.clickOnTheLinkByNameAndWaitForElement(meganavItems.searchSubItem.whereUsedSubstances, gridElements.grid);
        await expect(await searchElements.activeSearchTab.getText()).toEqual(searchItems.leftNav.whereUsedSubstances);
        await searchLogic.searchCriteriaChecking('Where Used Substances Search Criteria');
        await expect(await browser.getCurrentUrl()).toContain("/search/where-used-substances");
    });

    it('should navigate to Where Used Substances from Home page', async () => {
        await homeLogin.goToHome();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.searchPanelLinks[3], gridElements.grid);
        await expect(searchElements.searchIn.getText()).toEqual(whereUsedSubstancesSearchConst.searchIn);
        await expect(await button.returnButtonByText(buttonNames.clear).isPresent()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.clear).isEnabled()).toBeFalsy();
    });

    it('clear button clears selected BOM', async () => {
        const bomName: string[] = await gridElements.newGridLockedCellWithoutContentByRowIndex(1).get(1).getText();
        await grid.newMechanismCheckboxRangeChecking(1, 2);
        await expect(await searchElements.searchIn.getText()).toEqual(whereUsedSubstancesSearchConst.searchIn + ' ' + bomName);
        await expect(await button.returnButtonByText(buttonNames.clear).isEnabled()).toBeTruthy();
        await button.clickByButtonName(buttonNames.clear);
        await expect(await button.returnButtonByText(buttonNames.clear).isEnabled()).toBeFalsy();
    });

    it('should navigate to search page', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsedParts,
            searchElements.whereUsedSearchField.get(0));
        await expect(browser.getCurrentUrl()).toContain("/search/whereused");
    });

    it('should check accordion title', async () => {
        await searchLogic.searchCriteriaChecking('Where Used Parts Search Criteria');
    });

    it('should check ghost text in Matched Manufacturer Name search field', async () => {
        await searchLogic.ghostTextSearchFieldChecking(commonElements.commonTypeAheadInput, 'Enter manufacturer name (type ahead)');
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Where Used Search');
    });

    it('should open help panel and check title', async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Where used search');
    });

    it('should be field labels - Where Used Search Page', async () => {
        await whereUsedSearchLogic.labelsChecking()
    });

    it('should nothing happened by clicking on the search criteria accordion', async () => {
        await searchLogic.doNotShowOptionToSearchByClickingOnSearchCriteria()
    });

    it('should have Search button and check that it is inactive if search fields have not any criteria', async () => {
        await expect(await button.returnButtonByText(buttonNames.search).isDisplayed()).toBe(true);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it('should be look ahead for Matched Manufacturer Name - Where Used Search Page', async () => {
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, whereUsedSearchConst.searchCriteria);
        await whereUsedSearchLogic.clearAllSearchFields();
    });

    it('should check that Search button is active if fill in Internal Part Number search field some criteria', async () => {
        await whereUsedSearchLogic.fillExactField(whereUsedSearchConst.searchCriteria, 0);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(true);
        await whereUsedSearchLogic.clearAllSearchFields();
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it('should check that Search button is active if fill in Matched Manufacturer Part Number search field some criteria', async () => {
        await whereUsedSearchLogic.fillExactField(whereUsedSearchConst.searchCriteria, 1);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(true);
        await whereUsedSearchLogic.clearAllSearchFields();
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it('should check that Search button is active if fill in Matched Manufacturer Name search field some criteria', async () => {
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, whereUsedSearchConst.searchCriteria);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(true);
        await whereUsedSearchLogic.clearAllSearchFields();
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it('should check that Search button is active if fill in Imported Manufacturer Part Number search field some criteria', async () => {
        await whereUsedSearchLogic.fillExactField(whereUsedSearchConst.searchCriteria, 2);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(true);
        await whereUsedSearchLogic.clearAllSearchFields();
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it('should check that Search button is active if fill in Imported Manufacturer Name search field some criteria', async () => {
        await whereUsedSearchLogic.fillExactField(whereUsedSearchConst.searchCriteria, 3);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(true);
        await whereUsedSearchLogic.clearAllSearchFields();
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it('should check that Search button is active if fill in all search fields some criteria without filters', async () => {
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, whereUsedSearchConst.searchCriteria);
        await whereUsedSearchLogic.fillAllFields(whereUsedSearchConst.searchCriteria);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(true);
        await whereUsedSearchLogic.clearAllSearchFields();
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it('should check limit for added Type Ahead search boxes equals 9', async () => {
        await searchLogic.addTypeAheadFieldsByArray(commonElements.commonTypeAheadInputs, whereUsedSearchConst.searchCriterias);
    });

    it('should check selecting Type Ahead search fields', async () => {
        await searchLogic.selectTypeAheadFieldsByArray();
    });

    it('should check that Search button is active if Internal Part Number filter is filled', async () => {
        await whereUsedSearchLogic.fillExactFilter(whereUsedSearchConst.searchCriteria, 0);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(true);
        await whereUsedSearchLogic.clearCloseFilter(0);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it('should check that Search button is active if Matched Manufacturer Part Number filter is filled', async () => {
        await whereUsedSearchLogic.fillExactFilter(whereUsedSearchConst.searchCriteria, 1);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(true);
        await whereUsedSearchLogic.clearCloseFilter(1);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it('should check that Search button is active if Imported Manufacturer Part Number filter is filled', async () => {
        // await browser.executeScript("document.querySelectorAll('.filter-icon-wrapper')[3].scrollIntoView()");
        await whereUsedSearchLogic.fillExactFilter(whereUsedSearchConst.searchCriteria, 2);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(true);
        await whereUsedSearchLogic.clearCloseFilter(2);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it('should check that Search button is active if Imported Manufacturer Name filter is filled', async () => {
        // await browser.executeScript("document.querySelectorAll('.filter-icon-wrapper')[3].scrollIntoView()");
        await whereUsedSearchLogic.fillExactFilter(whereUsedSearchConst.searchCriteria, 3);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(true);
        await whereUsedSearchLogic.clearCloseFilter(3);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it('should be recall searches dropdown - Where Used Search Page', async () => {
        await searchLogic.recallSearchChecking()
    });

    it("should perform Where Used Search and display results grid with 'No results found.' if search term " +
        "in Internal Part Number contains (exact) special characters", async () => {
        await whereUsedSearchLogic.performWhereUsedSearch(commonSearch.specialCharactersSearchValue, 0);
        await expect(await gridElements.newGridRows.count()).toEqual(0);
    });

    it("should perform Where Used Search and display results grid with 'No results found.' if search term " +
        "in Internal Part Number contains (starts with) special characters", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(0);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(whereUsedSearchConst.dropdownValues[1]);
        await whereUsedSearchLogic.performWhereUsedSearch(commonSearch.specialCharactersSearchValue, 0);
        await expect(await gridElements.newGridRows.count()).toEqual(0);
    });


    it("should perform Where Used Search and display results grid with 'No results found.' if search term " +
        "in Matched Mfr P/N contains (starts with) special characters", async () => {
        browser.params.waitWebElementMaxTimeout = 150000;
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(1);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(whereUsedSearchConst.dropdownValues[1]);
        await whereUsedSearchLogic.performWhereUsedSearch(commonSearch.specialCharactersSearchValue, 1);
        await expect(await gridElements.newGridRows.count()).toEqual(0);
    });

    it("should perform Where Used Search and display results grid with 'No results found.' if search term " +
        "in Matched Mfr P/N contains (exact) special characters", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(commonSearch.specialCharactersSearchValue, 1);
        await expect(await gridElements.newGridRows.count()).toEqual(0);
        browser.params.waitWebElementMaxTimeout = 50000;
    });

    it(" Matched Mfr Name filter with type ahead should displays 'No matches found' under the input field, if search term contains special characters", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await typeAhead.typeAheadNoMatchesFound(commonElements.commonTypeAheadInput, commonSearch.specialCharactersSearchValue);
    });

    it("should perform Where Used Search and display results grid with 'No results found.' if search term " +
        "in Imported Mfr P/N contains (exact) special characters", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(commonSearch.specialCharactersSearchValue);
        await expect(await gridElements.newGridRows.count()).toEqual(0);
    });

    it("should perform Where Used Search and display results grid with 'No results found.' if search term " +
        "in Imported Mfr P/N contains (starts with) special characters", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(2);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(whereUsedSearchConst.dropdownValues[1]);
        await whereUsedSearchLogic.performWhereUsedSearch(commonSearch.specialCharactersSearchValue, 2);
        await expect(await gridElements.newGridRows.count()).toEqual(0);
    });

    it("should perform Where Used Search and display results grid with 'No results found.' if search term " +
        "in Imported Mfr Name contains (exact) special characters", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(commonSearch.specialCharactersSearchValue, 3);
        await expect(await gridElements.newGridRows.count()).toEqual(0);
    });

    it("should perform Where Used Search and display results grid with 'No results found.' if search term " +
        "in Imported Mfr Name contains (starts with) special characters", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.expandFilter(3);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(whereUsedSearchConst.dropdownValues[1]);
        await whereUsedSearchLogic.performWhereUsedSearch(commonSearch.specialCharactersSearchValue, 3);
        await expect(await gridElements.newGridRows.count()).toEqual(0);
    });
});