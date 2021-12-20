import {Login} from "../../../../../components/login";
import {browser} from "protractor";
import {Meganav} from "../../../../../components/meganav";
import {buttonNames, meganavItems} from "../../../../../testData/global";
import {partDetailsElements, searchElements, videoSliderElements} from "../../../../../elements/elements";
import {ParametricSearchLogic} from "../../../../../bussinesLayer/search/parametricSearchLogic";
import {Modal} from "../../../../../components/modal";
import {Link} from "../../../../../components/simple/link";
import {Grid} from "../../../../../components/grid";
import {Button} from "../../../../../components/simple/button";
import {Toolbar} from "../../../../../components/toolbar";
import {VideoSliderLogic} from "../../../../../bussinesLayer/home/videoSliderLogic";
import {videoLinks} from "../../../../../testData/video";

const login: Login = new Login();
const  meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();
const link: Link = new Link();
const grid: Grid = new Grid;
const button: Button = new Button();
const toolbar: Toolbar = new Toolbar();
describe(`Parametric Search defect DE116073`, async () => {
    it(`"Search By Example" from alternates modal opens Parametric search page behind that modal`, async () =>{
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performQuickParametricSearch(5, 8, 0);
        await modal.openModalWithElementAndWait(partDetailsElements.viewAltIcon.get(0), modal.modalTitle);
        let linkName: string[] = await grid.newGridReturnCellValuesInModalByColumnName(0, 'Part Number');
        await modal.openModalWithLinkNameAndWait(linkName[0], await toolbar.returnToolbarButtonByValue(buttonNames.searchByExample));
        await button.clickOnTheElementAndWait(await toolbar.returnToolbarButtonByValue(buttonNames.searchByExample),
            searchElements.parametric.attribute.get(0));
        await expect(await searchElements.parametric.addedFilter.get(0).isDisplayed()).toBeTruthy();
    });
});

describe(`Verify video tab for parametric search`, () => {
    it(`should verify video in parts result page for parametric search`, async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performQuickParametricSearch(5, 8, 0);
        await VideoSliderLogic.openVideoSlider();
        await expect(await videoSliderElements.videoTitles.getText()).toEqual(videoLinks.parametricPartSearchResultPagePI);
        await VideoSliderLogic.closeVideoSlider();
    })
});