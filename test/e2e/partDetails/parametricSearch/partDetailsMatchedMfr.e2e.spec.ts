import {browser} from "protractor";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {meganavItems} from "../../../../testData/global";
import {ParametricSearchLogic} from "../../../../bussinesLayer/search/parametricSearchLogic";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {partDetailsElements, searchElements} from "../../../../elements/elements";
import {VideoSliderLogic} from "../../../../bussinesLayer/home/videoSliderLogic";

const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partDetailsLogic = new PartDetailsLogic();
const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();

describe('Part Details modal with links from Parametric Search grid - Mfr Name', () => {

    beforeAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.maxElementWaitTime;
    });

    afterAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.defaultElementWaitTime;
    });

    it('should open Part details modal by clicking on mfr name link - Parametric Search', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search,
            meganavItems.searchSubItem.parametric, searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        await partDetailsLogic.newGridOpenPartDetModalFromMfrNameLinkInSearch();
    });

    it('should open Video slider, play video and close', async () => {
        await VideoSliderLogic.openVideoSlider();
        await VideoSliderLogic.playingVideoChecking();
        await VideoSliderLogic.closeVideoSlider();
    });

    it(" should be export dropdown -  part number link - Parametric Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be active in the left nav - Mfr Name - Parametric Search', async () => {
        await expect(await partDetailsElements.activeLeftNav.getText()).toEqual('Manufacturer Information')
    });

    it('should be Attribute and Value column headers - Mfr Name - Parametric Search', async () => {
        const expectedColumnHeaders = ['Attribute', 'Value'];
        await expect(await grid.newGridGetVisibleColumnHeadersInModal()).toEqual(expectedColumnHeaders);
    });

    it('should not be sorting for Attribute column headers - Mfr Name - Parametric Search', async () => {
        await grid.notBeSortingPartDetails();
    });

    it('should be add button with dropdown list  - part number link - Parametric Search', async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal  - part number link - Parametric Search', async () => {
        await partDetailsLogic.addToBomModal();
    });

    it('should open view alternates modal  - part number link - Parametric Search', async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open  print preview all modal - part number link -  Parametric Search', async () => {
        await partDetailsLogic.printModal();
    });

    it('should open specific print preview modals - part number link - Parametric Search', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - part number link - Parametric Search', async () => {
        await partDetailsLogic.searchByExample();
    });

});
