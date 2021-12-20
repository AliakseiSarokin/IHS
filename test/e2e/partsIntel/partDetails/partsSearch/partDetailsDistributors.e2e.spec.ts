import {browser} from "protractor";
import {gridElements, partDetailsElements, bomVaultElements, searchElements} from "../../../../../elements/elements";
import {meganavItems, commonData, modalTitles} from "../../../../../testData/global";
import {partDetailsData} from "../../../../../testData/partDetails";
import {commonSearch} from "../../../../../testData/search";
import {BomTreePartsLogic} from "../../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {Grid} from "../../../../../components/grid";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Modal} from "../../../../../components/modal";
import {PartDetailsLogic} from "../../../../../bussinesLayer/partDetails/partDetailsLogic";
import {QuickSearch} from "../../../../../components/quickSearch";
import {Waiters as w} from "../../../../../helper/waiters";
import {VideoSliderLogic} from "../../../../../bussinesLayer/home/videoSliderLogic";
import {Link} from "../../../../../components/simple/link";
import {HelpLogic} from "../../../../../bussinesLayer/help/helpLogic";

const helpLogic = new HelpLogic();
const link:Link = new Link();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();

const quickSearch:QuickSearch = new QuickSearch();
describe('Part Details - Distributors - Parts Search', () => {

    it('should be documents icon in the Parts Search grid', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search,
            meganavItems.searchSubItem.parts, searchElements.searchField);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await expect(await partDetailsElements.distribIcon.first().isDisplayed()).toBe(true);
    });

    it('should be tooltip for the Distributors icon - Parts Search', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.distribIcon, partDetailsData.tooltips.distributors);
    });

    it('should open part details modal by clicking on the Distributors icon - Parts Search', async () => {
        await modal.openModalWithElement(partDetailsElements.distribIcon.first());
    });

    it(" should be export dropdown - Distributors - Parts Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should open view alternates modal  - Distributors - Parts Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open  print preview all modal - Distributors -  Parts Search', async () => {
        await partDetailsLogic.printModal(undefined, modalTitles.printPreviewPL);
    });

    it('should open specific print preview modals - Distributors - Parts Search', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - Distributors', async () => {
        await partDetailsLogic.searchByExample();
    });

});


describe('Part Details - Distributors - Parts Search - Pricing and Availability trends - PartsIntel', () => {

    it('should be documents icon in the Parts Search grid', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search,
            meganavItems.searchSubItem.parts, searchElements.searchField);
        await quickSearch.performQuickSearch('LM311D');
        await w.waitUntilElementIsClickable(partDetailsElements.distribIcon.first());
    });
    it('should open part details modal by clicking on the Distributors icon', async () => {
        const rowNumber:number = await grid.returnRowNumberByLinkName(0, 'Mfr Name', 'TI');
        await modal.openModalWithElement(partDetailsElements.distribIconByRowNumber(rowNumber).get(0));
        await w.waitUntilElementIsClickable(link.returnElementByLinkName(partDetailsData.leftNav.itemManufacturer));
        await modal.checkSubstringModalTitleNames(modalTitles.partDetails, ':');
    });

    it('should open Pricing and Availability page once the user clicks on the Distributors icon', async () => {
        expect(await gridElements.newGridRowsInModal.first().isDisplayed()).toBeTruthy();
    });

    it('should open Pricing and Availability trends page by clicking on the link ', async () => {
        await link.clickOnTheLinkByName('Pricing and Availability Trends');
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(partDetailsElements.pricingAndAvailabilityTrends);
        expect(await partDetailsElements.pricingAndAvailabilityTrends.isDisplayed()).toBeTruthy();
    });

    it('should open help panel and check title', async () => {
        await helpLogic.openAndCheckHelpPanelTitle('View part details');
    });

    it('should open Video slider, play video and close', async () => {
        await VideoSliderLogic.openVideoSlider();
        await VideoSliderLogic.playingVideoChecking();
        await VideoSliderLogic.closeVideoSlider();
    });

});