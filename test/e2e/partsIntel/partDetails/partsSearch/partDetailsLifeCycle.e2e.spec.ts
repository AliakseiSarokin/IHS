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
import {SingleBomLogic} from "../../../../../bussinesLayer/bomVault/singleBomLogic";
import {QuickSearch} from "../../../../../components/quickSearch";
import {PartsSearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";

const partsSearchLogic = new PartsSearchLogic();
const bomTreePartsLogic = new BomTreePartsLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const singleBonLogic: SingleBomLogic = new SingleBomLogic();
const quickSearch:QuickSearch = new QuickSearch();
describe('Part Details - Life Cycle - Parts Search', () => {

    it('should be documents icon in the Parts Search grid', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search,
            meganavItems.searchSubItem.parts, searchElements.searchField);
        await quickSearch.performQuickSearch('km311');
        await expect(await partDetailsElements.lifeCycleIcon.first().isDisplayed()).toBe(true);
    });

    it('should be tooltip for the Life Cycle icon - Parts Search', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.lifeCycleIcon, partDetailsData.tooltips.lifeCycle);
    });

    it('should open part details modal by clicking on the Life Cycle icon - Parts Search', async () => {
        await modal.openModalWithElement(partDetailsElements.lifeCycleIcon.first());
    });

    it(" should be export dropdown - Life Cycle - Parts Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be column headers for documents - Parts Search',  async () => {
        const expectedColumnHeaders = [ 'Attribute', 'Value' ];
        await grid.checkingColumnHeaders(0,expectedColumnHeaders);
    });

    it('should open view alternates modal  - Life Cycle - Parts Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open  print preview all modal - Life Cycle -  Parts Search', async () => {
        await partDetailsLogic.printModal(undefined, modalTitles.printPreviewPL);
    });

    it('should open specific print preview modals - Life Cycle - Parts Search', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - Life Cycle', async () => {
        await partDetailsLogic.searchByExample();
    });

});

describe('Verify CEYTEOL value calculation in part details Page, US372307 - PartsIntel', () => {
    it('should search for a part number', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch('LM311DG4');
    });
    it('should open Life Cycle details page and verify the CEYTEOL data', async () => {
        await modal.openModalWithElement(partDetailsElements.lifeCycleIcon.first());
        let EYTEOL = await partDetailsLogic.returnAttributeValues('Estimated YTEOL');
        let CEYTEOL = await partDetailsLogic.returnAttributeValues('Current Estimated YTEOL');
        let AlertPrediction = await partDetailsLogic.returnAttributeValues('Alert/Prediction Date');
        await partDetailsLogic.verifyCEYTOELValueInPartDetailsPage(EYTEOL,CEYTEOL,AlertPrediction);
    });
});