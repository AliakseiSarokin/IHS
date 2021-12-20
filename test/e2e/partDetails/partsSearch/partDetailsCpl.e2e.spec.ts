import {browser} from "protractor";
import {partDetailsData} from "../../../../testData/partDetails";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {columnHeaders, meganavItems, modalTitles} from "../../../../testData/global";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {
    cplElements, gridElements, matchingElements, partDetailsElements,
    searchElements
} from "../../../../elements/elements";
import {QuickSearch} from "../../../../components/quickSearch";
import {Waiters as w} from "../../../../helper/waiters";
import {VideoSliderLogic} from "../../../../bussinesLayer/home/videoSliderLogic";
import {Grid} from "../../../../components/grid";
import {CplDetailsLogic} from "../../../../bussinesLayer/cpl/cpl/cplDetailsLogic";

const cplDetailsLogic: CplDetailsLogic = new CplDetailsLogic();
const grid: Grid = new Grid();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const quickSearch = new QuickSearch();

describe('Part Details - CPL - Parts Search', () => {

    it('should be CPL icon in the Parts Search grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search,
            meganavItems.searchSubItem.parts, searchElements.searchField);
        await quickSearch.performQuickSearchWithWait('lm311', partDetailsElements.cplIcon.last());
        await expect(await partDetailsElements.cplIcon.first().isDisplayed()).toBe(true);
    });

    it('should be tooltip for the CPL icon - Parts Search', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.cplIcon, partDetailsData.tooltips.cpl);
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

    it('should open part details modal by clicking on the CPL icon - Parts Search', async () => {
        await modal.openModalWithElement(partDetailsElements.cplIcon.first());
        await w.waitUntilElementIsClickable(link.returnElementByLinkName(partDetailsData.leftNav.itemManufacturer));
        await modal.checkSubstringModalTitleNames(modalTitles.partDetails, ':');
    });

    it('should be export dropdown - CPL - Parts Search', async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be add button with dropdown list  - CPL - Parts Search',  async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal  - CPL - Parts Search ',  async () => {
        await partDetailsLogic.addToBomModal();
    });

    it('should open view alternates modal  - CPL - Parts Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it('should open res request modal and be pre populated values', async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open  print preview all modal - CPL -  Parts Search', async () => {
        await partDetailsLogic.printModal();
    });

    it('should open specific print preview modals - CPL - Parts Search', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - CPL', async () => {
        await partDetailsLogic.searchByExample();
    });

    it('should be CPL icon in resuls grid for any part from CPL list, DE112862', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl, meganavItems.cplSublinks.viewCpl,
            gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await cplDetailsLogic.checkCplIcon();
    });

});

