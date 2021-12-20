import {browser} from "protractor";
import {commonSearch, mfrSearchConst} from "../../../../testData/search";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {commonElements, gridElements, searchElements, sliderElements,videoSliderElements} from "../../../../elements/elements";
import {Button} from "../../../../components/simple/button";
import {Grid} from "../../../../components/grid";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {MfrSearchLogic, typeAheadOption, typeAheadValue} from "../../../../bussinesLayer/search/mfrSearchLogic";
import {NewBrowserTab} from "../../../../utils/newBrowserTab";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {Slider} from "../../../../components/slider";
import {StringArray} from "../../../../utils/stringArray";
import {Waiters} from "../../../../helper/waiters";
import {VideoSliderLogic} from "../../../../bussinesLayer/home/videoSliderLogic";
import {videoLinks} from "../../../../testData/video";

const button: Button = new Button();
const grid:Grid = new Grid();
const link: Link = new Link();
const login: Login = new Login();
const meganav:Meganav = new Meganav();
const modal: Modal = new Modal();
const newBrowserTab: NewBrowserTab = new NewBrowserTab();
const searchLogic: SearchLogic = new SearchLogic();
const stringArray: StringArray = new StringArray();
describe('TC66392 - Manufacturer Results/Data Display', () => {

    it('should open mfr slider with results and be slider header', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.list[4],
            commonElements.commonTypeAheadInput);
        await MfrSearchLogic.performMfrSearch(commonSearch.mfrSearchArray[0]);
        const typeAheadArray: string[] = stringArray.returnArrayFromStringBySpace(typeAheadValue);
        await expect('Details for Manufacturer: ' + stringArray.returnStringWithFirstCapitalLetter(typeAheadArray[0])+' '
            +stringArray.returnStringWithFirstCapitalLetter(typeAheadArray[1]))
            .toContain(await sliderElements.sliderTitle.getText());
    });


    it('should close mfr slider ', async () => {
        await Slider.closeSlider(sliderElements.closeSliderTab, button.returnButtonByText(buttonNames.search));
        await Slider.openSliderByClickingOnTheButtonName(buttonNames.search);
        await Slider.closeSlider(sliderElements.xButtonSlider, button.returnButtonByText(buttonNames.search));
    });

    it('should be grey bar in slider', async () => {
        await Slider.openSliderByClickingOnTheButtonName(buttonNames.search);
        await expect(await searchElements.mfr.sliderGreyBarOptions.get(0).getText()).toContain('Total Number of Parts:');
        await expect(await searchElements.mfr.sliderGreyBarOptions.get(1).getText()).toContain('Manufacturer Support: ');
        await expect(await searchElements.mfr.sliderGreyBarOptions.get(2).getText()).toEqual('Manufacturer Web Site');

    });

    it('should open new browser tab by clicking on the Manufacturer Web Site', async () => {
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(searchElements.mfr.sliderGreyBarOptions.get(2),
            '');
    });

    it('should be default Manufacturer Information tab and display other tabs', async () => {
        await expect(await sliderElements.activeSliderTab.getText()).toEqual(mfrSearchConst.sliderLeftNavItems[0]);
        await expect(await sliderElements.sliderTabs.get(1).getText()).toContain(mfrSearchConst.sliderLeftNavItems[1]);
        await expect(await sliderElements.sliderTabs.get(2).getText()).toContain(mfrSearchConst.sliderLeftNavItems[2]);
        await expect(await sliderElements.sliderTabs.get(3).getText()).toContain(mfrSearchConst.sliderLeftNavItems[3]);
    });

    it('should be column headers for Manufacturer Information ', async () => {
        await Waiters.waitUntilElementIsDisplayed(gridElements.newGridHeaderNames.get(0));
        const expectedColumnHeaders: string[] = [ 'Attribute', 'Value' ];
        const actualHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await expect(expectedColumnHeaders).toEqual(actualHeaders);
    });

    it('should go to Part Categories tab and be column headers', async () => {
        await Slider.switchOnTheLeftNavSectionByClickingOnTheSectionName(mfrSearchConst.sliderLeftNavItems[1]);
        await browser.sleep(500);
        await Waiters.waitUntilElementIsDisplayed(gridElements.newGridHeaderNames.get(0));
        const expectedColumnHeaders:string[] = [ 'Parts', 'Category', 'Part Type',  'Commodity' ];
        const actualHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await expect(expectedColumnHeaders).toEqual(actualHeaders);
    });

    it('should go to Authorized Distributors tab and be column headers', async () => {
        await Slider.switchOnTheLeftNavSectionByClickingOnTheSectionName(mfrSearchConst.sliderLeftNavItems[2]);
        const expectedColumnHeaders:string[] = [ 'Manufacturer Name', 'Business Name', 'Location Count' ];
        await Waiters.waitUntilElementIsDisplayed(await gridElements.gridLinks.last());
        const actualHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await expect(expectedColumnHeaders).toEqual(actualHeaders);
    });

    it('should open Suppliers modal by clicking on the location count link', async () => {
        const locationString: string = await gridElements.newGridCellWithoutContentByRowIndex(0).get(2).getText();
        await modal.openModalWithLinkName(locationString);
        await expect(await modal.modalTitle.getText()).toEqual('Suppliers');
        await expect(((await modal.modalGridCounter.getText()).split(' '))[2]).toEqual(locationString);
        await modal.closeModalWithXButton();
    });

    it('should go to Transfer Information tab and be be content', async () => {
        await Slider.switchOnTheLeftNavSectionByClickingOnTheSectionName(mfrSearchConst.sliderLeftNavItems[3]);
        await expect(await searchElements.mfr.transferInformationHeader.getText()).toEqual('Manufacturer Changes');
        await expect(await searchElements.mfr.transferInformationText.getText())
            .toEqual('Review information on manufacturer name and support level changes.');
        await expect(await searchElements.mfr.transferInformationLink.getText()).toEqual('Click to learn more');
        await Slider.closeSlider(sliderElements.xButtonSlider, button.returnButtonByText(buttonNames.search));
    });

    //issue with downloading file in headless mode
    xit('should download file by clicking on the Click to learn more link', async () => {
    });


});

describe(`Verify video tab for Manufacture search`, () => {
    it(`should verify video in parts result page for Manufacture search`, async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.list[4],
            commonElements.commonTypeAheadInput);
        await VideoSliderLogic.openVideoSlider();
        await expect(await videoSliderElements.videoTitles.getText()).toEqual(videoLinks.documentPartSearchResultPageBI);
        await VideoSliderLogic.closeVideoSlider();
    })
});