import {buttonNames, meganavItems} from "../../../../testData/global";
import {browser} from "protractor";
import {Button} from "../../../../components/simple/button";
const button: Button = new Button();
import {Input} from "../../../../components/simple/input";
const input: Input = new Input();
import {Meganav} from "../../../../components/meganav";
const meganav:Meganav = new Meganav();
import {gridElements, searchElements} from "../../../../elements/elements";
import {HaystackSearchLogic} from "../../../../bussinesLayer/search/haystackSearchLogic";
const haystackSearchLogic = new HaystackSearchLogic();
import {Login} from "../../../../components/login";
const login: Login = new Login();
import {Toolbar} from "../../../../components/toolbar";
const toolbar: Toolbar = new Toolbar();
import {commonSearch, haystackSearchConst} from "../../../../testData/search";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
const searchLogic: SearchLogic = new SearchLogic();
import {Grid} from "../../../../components/grid";
const grid: Grid = new Grid();
describe('Haystack Search - Search Results Page Control Panel Buttons  ', () => {

    it('should perform Haystack Search and display results grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await haystackSearchLogic.performHaystackSearch(haystackSearchConst.searchValue)
    });

    it('should be column headers ',  async () => {
        await grid.newGridCheckingColumnHeaders(haystackSearchConst.searchResultsGrid);
    });

    it('should be unhide button with dropdown list  - Haystack Search Results Page',  async () => {
        await toolbar.unhideCellNameWithUnhideAll(haystackSearchConst.searchResultsGrid[0])
    });

    it('should hide the column - Haystack Search Results Page',  async () => {
        await grid.newGridHideColumnByName('NSN');
        await toolbar.displayHiddenColumnInDropdonwToolbar('NSN')
    });

    it('should unhide the column with Unhode All - Haystack Search Results Page',  async () => {
        await toolbar.unhideCellNameWithUnhideAll('NSN');
    });

    it('should open save search modal, should be save search modal attributes - - Haystack Search Results Page', async () => {
        await searchLogic.openSaveSearchModal();
    });

    it('should not be active save button when fill name filed with spaces - Haystack Search results page', async () => {
        await input.fillFieldWithValue(searchElements.saveSearchNameField, commonSearch.spacesValue);
        await expect(button.returnButtonByText(buttonNames.saveAndReturnToResults).isEnabled()).toBeFalsy()
    });

    it('should save Haystack Search', async () => {
        await searchLogic.saveSearch();
    });

    it('should display saved Haystack Search in recall searches dropdown ', async () => {
        await searchLogic.displaySaveSearchInRecall();
    });

    it('should display saved Haystack Search in saved searches', async () => {
        await searchLogic.displaySaveSearchInSavedSearches();
    });

    it('should go to search results grid from Saved Searches - Haystack Search', async () => {
        await searchLogic.goToSearchFromSavedSearches();
    });

    it('should delete saved Haystack Searches', async () => {
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });
});