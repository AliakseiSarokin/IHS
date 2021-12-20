import {Login} from "../../../../../components/login";
import {browser} from "protractor";
import {Meganav} from "../../../../../components/meganav";
import {buttonNames, meganavItems, titles} from "../../../../../testData/global";
import {gridElements, modalElements, partDetailsElements, searchElements,videoSliderElements} from "../../../../../elements/elements";
import {Grid} from "../../../../../components/grid";
import {DocumentsSearchLogic} from "../../../../../bussinesLayer/search/documentsSearchLogic";
import {Button} from "../../../../../components/simple/button";
import {Toolbar} from "../../../../../components/toolbar";
import {Modal} from "../../../../../components/modal";
import {Input} from "../../../../../components/simple/input";
import {Random} from "../../../../../utils/random";
import {ConsoleErrors} from "../../../../../helper/consoleErrors";
import {TypeAhead} from "../../../../../components/typeAhead";
import {columnIdByColumnName} from "../../../../../testData/columnIdByColumnName";
import {VideoSliderLogic} from "../../../../../bussinesLayer/home/videoSliderLogic";
import {videoLinks} from "../../../../../testData/video";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const grid: Grid = new Grid();
const documentsSearchLogic: DocumentsSearchLogic = new DocumentsSearchLogic();
const button: Button = new Button();
const toolbar: Toolbar = new Toolbar();
const modal: Modal = new Modal();
const input: Input = new Input();
const random: Random = new Random();
const typeAhead: TypeAhead = new TypeAhead();

describe(`Document Search defect DE116157`, () => {
   it(`Documents Search: alternates-icon is not clickable if browser cache was cleared`, async () => {
       await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
       await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
           searchElements.searchField);
       await documentsSearchLogic.performDocumentsSearch('texas');
       await grid.newMechanismCheckboxRangeChecking(0, 1);
       await button.clickOnTheElementAndWait(await toolbar.returnToolbarButtonByValue(buttonNames.viewRelatedParts),
           partDetailsElements.viewAltIcon.get(0));
       await modal.openModalWithElementAndWait(partDetailsElements.viewAltIcon.get(0), modal.modalTitle);
       await expect(await modal.modalTitle.getText()).toContain('Alternates for Part Number:');
   })
});

describe(`Document Search defect DE116319`, () => {
   it(`When you click on doc search with set mfr name from saved searches there is a console error and endless spinner on the search`, async () =>{
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.fillAllSearchFilters('texas', 'TEXAS INSTRUMENTS INC');
        await button.clickByButtonNameAndWait(buttonNames.search, gridElements.newGridRows.get(1));
        await button.clickOnTheElementAndWait(await toolbar.returnToolbarButtonByValue(buttonNames.saveSearch),
            modal.modalTitle);
        await input.fillFieldWithValue(searchElements.saveSearchNameField, random.randomTextGenerator(10));
        await modal.closeModalWithButton(buttonNames.saveAndReturnToResults);
        await expect(await ConsoleErrors.getConsoleErrors()).toEqual([]);
   })
});

describe(`Document Search defect DE115999`, () => {
    it(`Documents Search: View Related Parts grid doesn't load`, async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch('texas');
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await expect(await ConsoleErrors.getConsoleErrors()).toEqual([]);
    });
});

describe(`Document Search defect DE114991`, () => {
    it(`No Rows to Show displays for Mfr Name "Abracon" applied column filter`, async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.documents.docSearchFieldLabels.get(0));
        await documentsSearchLogic.performDocumentsSearch('t');
        await grid.newGridHideColumnByName('Document Title');
        await grid.newGridOpenFilterBoxByName('Manufacturer Name');
        await typeAhead.typeAheadChecking(gridElements.columnsSort.mfrTypeAhead, 'abracon');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        const value: string [] = await grid.getCellValuesByCellId(columnIdByColumnName.documentSearchGrid['Manufacturer Name']);
        for (let i: number = 0; i < value.length; i++) {
            await expect(value[i].toLowerCase()).toContain('abracon');
        }
    });
});
describe(`Verify video tab for document search`, () => {
    it(`should verify video in parts result page for document search`, async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch('t');
        await VideoSliderLogic.openVideoSlider();
        await expect(await videoSliderElements.videoTitles.get(0).getText()).toEqual(videoLinks.partSearchResultPagePI[1]);
        await VideoSliderLogic.closeVideoSlider();
    })
});