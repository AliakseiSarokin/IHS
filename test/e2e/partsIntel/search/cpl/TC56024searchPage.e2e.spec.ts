import {Button} from "../../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../../testData/global";
import {CplSearchLogic} from "../../../../../bussinesLayer/search/cplSearchLogic";
import {commonSearch, cplSearchConst} from "../../../../../testData/search";
import {HelpLogic} from "../../../../../bussinesLayer/help/helpLogic";
import {Input} from "../../../../../components/simple/input";
import {InstructionPanel} from "../../../../../components/instructionPanel";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";
import {commonElements, gridElements, searchElements,videoSliderElements} from "../../../../../elements/elements";
import {VideoSliderLogic} from "../../../../../bussinesLayer/home/videoSliderLogic";
import {videoLinks} from "../../../../../testData/video";

const button: Button = new Button();
const cplSearchLogic = new CplSearchLogic();
const helpLogic: HelpLogic = new HelpLogic();
const input: Input = new Input();
const instructionPanel: InstructionPanel = new InstructionPanel();
const meganav: Meganav = new Meganav();
const login: Login = new Login();
const searchLogic: SearchLogic = new SearchLogic();

describe('TC56024 CPL Search - search page', () => {

    it('should navigate to search page', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await expect(browser.getCurrentUrl()).toContain("/search/cpl");
    });

    it('should check accordion title', async () => {
        await searchLogic.searchCriteriaChecking('CPL Search Criteria');
    });

    it('should check ghost text in search field', async () => {
        await searchLogic.ghostTextSearchFieldChecking(searchElements.cplSearchField, 'Enter Keyword');
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('CPL Search');
    });

    it('should open help panel and check title', async () => {
        await helpLogic.openAndCheckHelpPanelTitle('CPL Search');
    });

    it('should be info section', async () => {
        await expect(await searchElements.parts.infoSection.get(0).getText()).toEqual(cplSearchConst.infoSectionText)
    });

    it('should nothing happened by clicking on the search criteria accordion', async () => {
        await searchLogic.doNotShowOptionToSearchByClickingOnSearchCriteria()
    });

    it('should have Search button and check that it is inactive if search fields have not any criteria', async () => {
        await expect(await button.returnButtonByText(buttonNames.search).isDisplayed()).toBe(true);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it("should check that 'Clear' link works cpl search field", async () => {
        await input.fillFieldWithValue(searchElements.cplSearchField, cplSearchConst.searchCriteria2);
        await cplSearchLogic.clearSearchField();
    });

    it('should not have an option to search with less than 4 char', async () => {
        await input.fillFieldWithValue(searchElements.cplSearchField, cplSearchConst.searchCriteria2);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it('should have an option to search with 4 or more char', async () => {
        await input.fillFieldWithValue(searchElements.cplSearchField, cplSearchConst.searchCriteria);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(true);
        await cplSearchLogic.clearSearchField();
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBe(false);
    });

    it('should be recall searches dropdown', async () => {
        await searchLogic.recallSearchChecking()
    });

    it("should perform CPL Search and display results grid with 'No results found.' if search term contains" +
        " special characters", async () => {
        await cplSearchLogic.performCplSearch(commonSearch.specialCharactersSearchValue);
        await expect(gridElements.newGridRows.count()).toEqual(0);
    });
});

describe(`Verify video tab for CPL search`, () => {
    it(`should verify video in parts result page for CPL search`, async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
        await VideoSliderLogic.openVideoSlider();
        await expect(await videoSliderElements.videoTitles.get(0).getText()).toEqual(videoLinks.partSearchResultPagePI[1]);
        await VideoSliderLogic.closeVideoSlider();
    })
});
