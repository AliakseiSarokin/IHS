import {browser} from "protractor";
import {commonSearch, whereUsedSearchConst} from "../../../../testData/search";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {meganavItems} from "../../../../testData/global";
import {commonElements, gridElements, searchElements, videoSliderElements} from "../../../../elements/elements";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {WhereUsedSearchLogic} from "../../../../bussinesLayer/search/whereUsedSearchLogic";
import {Button} from "../../../../components/simple/button";
import {ConsoleErrors} from "../../../../helper/consoleErrors";
import {Grid} from "../../../../components/grid";
import {Actions} from "../../../../utils/actions";
import {VideoSliderLogic} from "../../../../bussinesLayer/home/videoSliderLogic";
import {videoLinks} from "../../../../testData/video";

const login: Login = new Login();
const meganav:Meganav = new Meganav();
const searchLogic: SearchLogic = new SearchLogic();
const whereUsedSearchLogic = new WhereUsedSearchLogic();
const button: Button = new Button();
const grid: Grid = new Grid();

describe('Where Used Search defect,  DE115003', () => {
    it('Recent searches causes Error in console', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.list[4],
            commonElements.commonTypeAheadInput);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await button.clickOnTheElement(searchElements.recentSearchExpandIcon.get(3));
        await expect(await ConsoleErrors.getConsoleErrors()).toEqual([]);
    });
});

describe('Where Used Search defect,  DE115000', () => {
    it('Internal Part Number column filter is case-sensitive', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
        await grid.newGridOpenFilterBoxByName('Internal Part Number');
        await Actions.sendKeys(gridElements.columnsSort.input, 'ihs');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await expect(await gridElements.newGridNoRowsToShowText.get(0).isPresent()).toBeFalsy();
    });
});

describe(`Verify video tab for where used search`, () => {
    it(`should verify video in parts result page for where used search`, async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.whereUsed,
            searchElements.whereUsedSearchField.get(0));
        await whereUsedSearchLogic.performWhereUsedSearch(whereUsedSearchConst.searchCriteria);
        await grid.newGridOpenFilterBoxByName('Internal Part Number');
        await Actions.sendKeys(gridElements.columnsSort.input, 'ihs');
        await VideoSliderLogic.openVideoSlider();
        await expect(await videoSliderElements.videoTitles.getText()).toEqual(videoLinks.documentPartSearchResultPageBI);
        await VideoSliderLogic.closeVideoSlider();
    })
});