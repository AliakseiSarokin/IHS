import {browser} from "protractor";
import {gridElements, partDetailsElements, bomVaultElements, searchElements,videoSliderElements} from "../../../../elements/elements";
import {meganavItems, commonData} from "../../../../testData/global";
import {commonSearch} from "../../../../testData/search";
import {partDetailsData} from "../../../../testData/partDetails";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {QuickSearch} from "../../../../components/quickSearch";
import {VideoSliderLogic} from "../../../../bussinesLayer/home/videoSliderLogic";
import {videoLinks} from "../../../../testData/video";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const singleBonLogic: SingleBomLogic = new SingleBomLogic();
const quickSearch = new QuickSearch();
describe('Part Details - Alerts - Parts Search', () => {

    it('should be documents icon in the Parts Search grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search,
            meganavItems.searchSubItem.parts, searchElements.searchField);
        await quickSearch.performQuickSearchWithWait(commonSearch.commonValue,
            gridElements.newGridCellByRowIndex(0).get(0));
        await expect(await partDetailsElements.alertsIcon.first().isDisplayed()).toBe(true);
    });

    it('should be tooltip for the alerts icon - Parts Search', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.alertsIcon, partDetailsData.tooltips.alerts);
    });

    it('should open part details modal by clicking on the alerts icon - Parts Search', async () => {
        await modal.openModalWithElement(partDetailsElements.alertsIcon.first());
    });

    it(" should be export dropdown - alerts - Parts Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be add button with dropdown list  - alerts - Parts Search',  async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal  - alerts - Parts Search ',  async () => {
        await partDetailsLogic.addToBomModal();
    });

    it('should open view alternates modal  - alerts - Parts Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open  print preview all modal - alerts -  Parts Search', async () => {
        await partDetailsLogic.printModal();
    });

    it('should open specific print preview modals - alerts - Parts Search', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - alerts', async () => {
        await partDetailsLogic.searchByExample();
    });

});

describe(`Verify video tab for part modal`, () => {
    it(`should verify video in part modal opened when click on parts from search result page`, async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search,
            meganavItems.searchSubItem.parts, searchElements.searchField);
        await quickSearch.performQuickSearchWithWait(commonSearch.commonValue,
            gridElements.newGridCellByRowIndex(0).get(0));
        await modal.openModalWithElement(partDetailsElements.alertsIcon.first());
        await VideoSliderLogic.openVideoSlider();
        await expect(await videoSliderElements.videoTitles.getText()).toEqual(videoLinks.partModalPageBI);
        await VideoSliderLogic.closeVideoSlider();
    })
});


