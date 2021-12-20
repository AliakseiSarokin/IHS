import {browser} from "protractor";
import {
    gridElements, partDetailsElements, bomVaultElements, searchElements,
    sliderElements
} from "../../../../../elements/elements";
import {meganavItems, commonData, modalTitles} from "../../../../../testData/global";
import {commonSearch} from "../../../../../testData/search";
import {partDetailsData} from "../../../../../testData/partDetails";
import {DocumentsSearchLogic} from "../../../../../bussinesLayer/search/documentsSearchLogic";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Grid} from "../../../../../components/grid";
import {Modal} from "../../../../../components/modal";
import {PartDetailsLogic} from "../../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SingleBomLogic} from "../../../../../bussinesLayer/bomVault/singleBomLogic";
import {Slider} from "../../../../../components/slider";
import {QuickSearch} from "../../../../../components/quickSearch";
const documentsSearchLogic = new DocumentsSearchLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const singleBonLogic: SingleBomLogic = new SingleBomLogic();
const quickSearch = new QuickSearch();
describe('Part Details - NSN - Parts Search', () => {

    it('should be documents icon in the Parts Search grid', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.documents.docSearchFieldLabels.get(0));
        await documentsSearchLogic.performDocumentsSearch('LM311D');
        await documentsSearchLogic.goToViewRelatedParts();
        await expect(await partDetailsElements.nsnIcon.first().isDisplayed()).toBe(true);
    });

    it('should be tooltip for the NSN icon - Parts Search', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.nsnIcon,partDetailsData.tooltips.nsn);
    });

    it('should open part details modal by clicking on the NSN icon - Parts Search', async () => {
        await modal.openModalWithElement(partDetailsElements.nsnIcon.first());
    });

    it(" should be export dropdown - NSN - Parts Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be column headers for NSN - Parts Search',  async () => {
        const expectedColumnHeaders = [ 'NSN', 'ISC', 'Item Name', 'INC',
            'Part Number', 'RNCC', 'RNVC', 'CAGE Code', 'Vendor Name',
            'Latest ML-C Price' ];
        await grid.checkingColumnHeaders(0,expectedColumnHeaders);
    });


    it('should open view alternates modal  - NSN - Parts Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it('should open haystack slider clicking on the NSN link  - NSN - BOM Details',  async () => {
        await Slider.openSliderByClickingOnTheElement(gridElements.rowCellsWithContent(0,0).get(0));
        await expect(await sliderElements.sliderTitle.getText()).toEqual('Haystack/DoD Logistics Data');
        await Slider.closeSlider(sliderElements.xButtonSlider, modal.modalBody);
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open  print preview all modal - NSN -  Parts Search', async () => {
        await partDetailsLogic.printModal(undefined, modalTitles.printPreviewPL);
    });

    it('should open specific print preview modals - NSN - Parts Search', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - NSN', async () => {
        await partDetailsLogic.searchByExample();
    });

});

