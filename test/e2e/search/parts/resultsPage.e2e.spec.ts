import {browser} from "protractor";
import {commonSearch} from "../../../../testData/search";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {buttonNames, columnHeaders, fieldStatuses, meganavItems} from "../../../../testData/global";
import {PartsSearchLogic} from "../../../../bussinesLayer/search/partsSearchLogic";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {modalElements, searchElements} from "../../../../elements/elements";
import {VideoSliderLogic} from "../../../../bussinesLayer/home/videoSliderLogic";
import {CheckBox} from "../../../../components/simple/checkBox";
import {Toolbar} from "../../../../components/toolbar";
import {Link} from "../../../../components/simple/link";
import {Modal} from "../../../../components/modal";
import {Dropdown} from "../../../../components/dropdown";

const checkBox: CheckBox = new CheckBox();
const grid: Grid = new Grid();
const login: Login = new Login();
const link: Link =new Link();
const modal: Modal =new Modal();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const searchLogic: SearchLogic = new SearchLogic();
const toolbar: Toolbar = new Toolbar();


describe('Results Page - Parts Search - BI', () => {

    it('should be description for Active-Unconfirmed Part Status of LC/SC Risk, US275081', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        const activeUnconfirmedDesc:string = 'IHS Markit is unable to definitively confirm that the part status is still' +
            ' active due to lack of part status information from the manufacturer. These parts present an increased' +
            ' risk of obsolescence.';
        await partsSearchLogic.performPartsSearch('MAX7377AXRD+T');
        await link.clickOnTheLinkByName('Low');
        await browser.sleep(1000)
        await expect(modalElements.modalTitle.getText()).toContain('Low');
        await expect(await modalElements.modalTables(1, 3).getText()).toEqual(activeUnconfirmedDesc);
        await modal.closeModalWithXButton();
    });

    it('should perform parts search and display results grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
    });

    it('should be parts search Criteria Accordion', async () => {
        await searchLogic.searchCriteriaOnResultsPageChecking('Part Search Criteria');
    });

    it('should open Video slider, play video and close', async () => {
        await VideoSliderLogic.openVideoSlider();
        await VideoSliderLogic.playingVideoChecking();
        await VideoSliderLogic.closeVideoSlider();
    });

    it('should open Video slider, and be Custom Search Results Layouts link', async () => {
        await VideoSliderLogic.openVideoSlider();
        await VideoSliderLogic.switchByLinkNameViewoInSlider('Custom Search Results Layouts');
        await VideoSliderLogic.playingVideoChecking();
    });

    it('should open the video on the new browser tab and close it', async () => {
        await VideoSliderLogic.openVideoInTheNewBrowserTab();
        await VideoSliderLogic.closeVideoSlider();
    });

    it('should be View Search Criteria link and should show search criteria', async () => {
        await searchLogic.viewSearchCriteriaChecking()
    });

    it('should restore columns sorting by initial search options after applying "Clear All Tags" ', async () => {
        await searchLogic.refineLinkChecking();
        await checkBox.checkUnCheckSingleCheckbox(searchElements.parts.partStausCheckboxesInput.get(2), searchElements.parts.partStausCheckboxes , fieldStatuses.untouchedField );
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue.slice(0, 4));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, columnHeaders.search.partsDefaultLayout[4], true);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, columnHeaders.search.partsDefaultLayout[6], true);
        await grid.newGridFilteringExactColumnByOption('SC Risk', 'High');
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, columnHeaders.search.partsDefaultLayout[3], true);
        await toolbar.removeWithClearAll();
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, columnHeaders.search.partsDefaultLayout[3], false);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0, columnHeaders.search.partsDefaultLayout[4], true);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, columnHeaders.search.partsDefaultLayout[6], false);
    });

    it('should be Refine Search Criteria link and should return to search page', async () => {
        await searchLogic.refineLinkChecking()
    });

    it('should be pagination attributes', async () => {
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.newGridPaginationChecking();
    });

    it('should be option to see Last and First pages', async () => {
        await grid.goToLastFirstPages();
    });

    it("should save filter attributes by Part Status column after change 'Items Per Page' option", async () => {
        await grid.newGridFilteringExactColumnByOption('Part Status', 'Discontinued');
        await grid.changeItemsPerPage('All');
        await grid.newGridFilterColumnCheck('Part Status', 'Discontinued', false);
        await grid.newGridFilteringExactColumnByOption('Part Status', 'EOL');
        await grid.changeItemsPerPage('50');
        await grid.newGridFilterColumnCheck('Part Status', 'EOL', false);
    });


    it("should save filter attributes by LC Risk column after change 'Items Per Page' option", async () => {
        await grid.newGridFilteringExactColumnByOption('LC Risk', 'Low');
        await grid.changeItemsPerPage('All');
        await grid.newGridFilterColumnCheck('LC Risk', 'Low', false);
        await grid.newGridFilteringExactColumnByOption('LC Risk', 'High');
        await grid.changeItemsPerPage('250');
        await grid.newGridFilterColumnCheck('LC Risk', 'High', false);
    });

});

describe('Verify CEYTEOL value calculation in search results Page grid, US354588', () => {

    it('should search for a part number', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch('LM311DG4');
    });
    it('should change to Life Cycle layout and hide out the columns and verify the CEYTEOL data', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Dropdown.closeDropdownByClickOnElement(link.returnElementByLinkName('CEYTEOL'));
        await grid.verifyCEYTOELValueInResultPage();
    });
});