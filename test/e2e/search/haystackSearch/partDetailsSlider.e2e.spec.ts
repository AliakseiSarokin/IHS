import {columnHeaders, meganavItems} from "../../../../testData/global";
import {browser} from "protractor";
import {Meganav} from "../../../../components/meganav";
const meganav:Meganav = new Meganav();
import {gridElements, searchElements, sliderElements} from "../../../../elements/elements";
import {HaystackSearchLogic, HaystackSliderLogic} from "../../../../bussinesLayer/search/haystackSearchLogic";
const haystackSearchLogic = new HaystackSearchLogic();
const haystackSliderSearchLogic = new HaystackSliderLogic();
import {Login} from "../../../../components/login";
const login: Login = new Login();
import {Toolbar} from "../../../../components/toolbar";
const toolbar: Toolbar = new Toolbar();
import {Slider} from "../../../../components/slider";
import {commonSearch, haystackSearchConst} from "../../../../testData/search";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
const searchLogic: SearchLogic = new SearchLogic();
import {Grid} from "../../../../components/grid";
const grid:Grid = new Grid();

describe('Haystack Part Details Slider ', () => {

    it('should open Haystack Part Details Slider', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await haystackSearchLogic.performHaystackSearch(commonSearch.commonValue);
        await haystackSliderSearchLogic.openSlider();
    });

    it('should be column headers and attributes for Segment A', async () => {
        await expect(await gridElements.newGridHeadersInSlider.getText()).toEqual(columnHeaders.commonAttributeValue);
    });

    it('should switch to MCRL and be column headers', async () => {
        await Slider.switchOnTheLeftNavSectionByClickingOnTheSectionName(haystackSearchConst.mclr);
    });
    //
    // it('should open Cage Data tab by clicking on the Cage Code link ', async () => {
    //    await haystackSlider.scrollClickOnLinkAndOpenNewTab(0, haystackSearchConst.cageData);
    // });
    //
    // it('should be column headers and attributes for Cage Data', async () => {
    //     await haystackSlider.twoColumnsTabChecking(haystackSearchConst.cageDataAttributes);
    // });
    //
    // it('should open Cage Data tab by clicking on the Vendor link', async () => {
    //     await haystackSlider.switchToLeftNavItem(haystackSearchConst.mclr);
    //     await haystackSlider.scrollClickOnLinkAndOpenNewTab(1, haystackSearchConst.cageData);
    // });
    //
    xit('should switch to MLC tab and be column headers', async () => {
        await Slider.switchOnTheLeftNavSectionByClickingOnTheSectionName(haystackSearchConst.mlc);
        await grid.checkingColumnHeaders(0, haystackSearchConst.mlcColumnHeaders);
    });

    it('should switch to Parametric tab and be column headers', async () => {
        await Slider.switchOnTheLeftNavSectionByClickingOnTheSectionName(haystackSearchConst.parametric);
        await expect(await gridElements.newGridHeadersInSlider.getText()).toEqual(haystackSearchConst.parametricColumnHeaders);
    });

    xit('should switch to Procurement tab and be column headers', async () => {
        await Slider.switchOnTheLeftNavSectionByClickingOnTheSectionName(haystackSearchConst.procurement);
        await grid.checkingColumnHeaders(0, haystackSearchConst.procuramentColumnHeaders);
    });
    //
    // it('should open Cage Data tab by clicking on the Cage Code link ', async () => {
    //     await haystackSlider.scrollClickOnLinkAndOpenNewTab(0, haystackSearchConst.cageData);
    // });
    //
    // it('should open Cage Data tab by clicking on the Vendor link', async () => {
    //     await haystackSlider.switchToLeftNavItem(haystackSearchConst.procurement);
    //     await haystackSlider.scrollClickOnLinkAndOpenNewTab(1, haystackSearchConst.cageData);
    // });
    //
    xit('should switch to QPD tab and be column headers', async () => {
        await Slider.switchOnTheLeftNavSectionByClickingOnTheSectionName(haystackSearchConst.qpd);
        await grid.checkingColumnHeaders(0, haystackSearchConst.qpdColumnHeaders);
    });
    //
    // it('should open Cage Data tab by clicking on the Mfr Name link ', async () => {
    //     await haystackSlider.scrollClickOnLinkAndOpenNewTab(0, haystackSearchConst.cageData);
    // });
    //
    // it('should open Cage Data tab by clicking on the Cage Code link', async () => {
    //     await haystackSlider.switchToLeftNavItem(haystackSearchConst.qpd);
    //     await haystackSlider.scrollClickOnLinkAndOpenNewTab(1, haystackSearchConst.cageData);
    // });
    //
    xit('should be export feature', async () => {
        //await haystackSlider.exportFileInSlider();
    });

    it('should be print modal', async () => {
        await haystackSliderSearchLogic.printInSlider();
    });

    it('should close print modal', async () => {
        await haystackSliderSearchLogic.closePrintInSlider();
    });

    it('should match data in slider Segment A with Print Modal ', async () => {
        await haystackSliderSearchLogic.printSegmentAttributes();
        await Slider.closeSlider(sliderElements.closeSliderTab, gridElements.gridWrapper);
    });

});