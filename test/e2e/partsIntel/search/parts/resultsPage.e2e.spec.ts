import {browser} from "protractor";
import {commonSearch} from "../../../../../testData/search";
import {Grid} from "../../../../../components/grid";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {buttonNames, columnHeaders, fieldStatuses, linksNames, meganavItems} from "../../../../../testData/global";
import {PartsSearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";
import {searchElements, videoSliderElements,commonElements,gridElements,partDetailsElements} from "../../../../../elements/elements";
import {VideoSliderLogic} from "../../../../../bussinesLayer/home/videoSliderLogic";
import {CheckBox} from "../../../../../components/simple/checkBox";
import {Toolbar} from "../../../../../components/toolbar";
import {Link} from "../../../../../components/simple/link";
import {videoLinks} from "../../../../../testData/video";
import {QuickSearch} from "../../../../../components/quickSearch";
import {Modal} from "../../../../../components/modal";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {Dropdown} from "../../../../../components/dropdown";

const checkBox: CheckBox = new CheckBox();
const grid: Grid = new Grid();
const login: Login = new Login();
const link: Link =new Link();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const searchLogic: SearchLogic = new SearchLogic();
const toolbar: Toolbar = new Toolbar();
const quickSearch = new QuickSearch();
const modal: Modal = new Modal();
const elementAttributes: ElementAttributes = new ElementAttributes();

describe('Results Page - Parts Search - PI', () => {

    it('should perform parts search and display results grid', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
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

    it('should be video titles', async () => {
        await expect(await videoSliderElements.videoTitles.getText()).toEqual(videoLinks.partSearchResultPagePI);
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

describe(`Verify video tab for manufacture search`, () => {
    it(`should verify video in manufacture search page for parametric search`, async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.list[4],
            commonElements.commonTypeAheadInput);
        await VideoSliderLogic.openVideoSlider();
        await expect(await videoSliderElements.videoTitles.get(0).getText()).toEqual(videoLinks.partSearchResultPagePI[1]);
        await VideoSliderLogic.closeVideoSlider();
    })
});

describe(`Verify video tab for part modal`, () => {
    it(`should verify video in part modal opened when click on parts from search result page`, async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.list[4],commonElements.commonTypeAheadInput);
        await quickSearch.performQuickSearchWithWait(commonSearch.commonValue,gridElements.newGridCellByRowIndex(0).get(0));
        await modal.openModalWithElement(partDetailsElements.docIcon.first());
        await VideoSliderLogic.openVideoSlider();
        await expect(await videoSliderElements.videoTitles.getText()).toEqual(videoLinks.partModalPagePI);
        await VideoSliderLogic.closeVideoSlider();
    })
});

describe('US280282, Verify search result page Show Mfr Full Name in Tooltip PI', () => {

    it('Full MFR name should be displayed in tooltip - parts search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        const searchValue: string = 'lm3';
        await partsSearchLogic.checkPartNamberRadioButton('Part Number Starts With');
        await partsSearchLogic.performPartsSearchWithCustomWait(searchValue, gridElements.grid);
        let allMfrNameElements = await gridElements.gridMfrNameCell;
        const tooltipsArr = await elementAttributes.getElementAttribute(allMfrNameElements[0], 'title');
        await expect(tooltipsArr).toEqual('MAC EIGHT CO LTD');
    });

});

describe('Verify CEYTEOL value calculation in search results Page grid - PartsIntel, US354588', () => {

    it('should search for a part number', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
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