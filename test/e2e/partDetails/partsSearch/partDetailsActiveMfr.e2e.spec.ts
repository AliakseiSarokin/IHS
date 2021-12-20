import {browser, by} from "protractor";
import {gridElements, partDetailsElements, bomVaultElements, searchElements} from "../../../../elements/elements";
import {meganavItems, commonData, buttonNames} from "../../../../testData/global";
import {commonSearch} from "../../../../testData/search";
import {partDetailsData} from "../../../../testData/partDetails";
import {CustomLayoutLogic} from "../../../../bussinesLayer/bomVault/customLayoutLogic";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {StringArray} from "../../../../utils/stringArray";
import {Toolbar} from "../../../../components/toolbar";
import {QuickSearch} from "../../../../components/quickSearch";
import {Waiters as w} from "../../../../helper/waiters";
import {Shade} from "../../../../components/shade";
const customLayoutLogic:CustomLayoutLogic = new CustomLayoutLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const singleBonLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();
const stringArray: StringArray = new StringArray();
const quickSearch = new QuickSearch();

describe('Part Details - Active Mfr - Parts Search', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAttributeByName('Active Mfrs');
        await customLayoutLogic.saveNewCustomLayout();
    });

    afterAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });

    it('should open part details modal by clicking on Active Mfr Link - Parts Search', async () => {
        await partDetailsLogic.newGridOpenPartDetModalFromActiveGenericMfrLinkInSearch('Active Mfrs');
    });

    it('should be column headers for Active Mfr - Parts Search',  async () => {
        const expectedColumnHeaders = [ 'Mfr Name', 'CAGE Code', 'Part Status', 'Temperature Grade', 'Qualifications',
        'Business Type', 'Address', 'City', 'State', 'Zip', 'Country', 'Phone', 'Home Page', 'Manufacturer Comments'];
        await expect(await grid.returnSetOfColumnHeadersInModalWithScroll(850,1)).toEqual(expectedColumnHeaders);
    });

    it(" should be export dropdown - Active Mfr Link - Parts Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be add button with dropdown list  - Active Mfr Link - Parts Search',  async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal  - Active Mfr Link - Parts Search ',  async () => {
        await partDetailsLogic.addToBomModal();
    });

    it('should open view alternates modal  - Active Mfr Link - Parts Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open  print preview all modal - Active Mfr Link -  Parts Search', async () => {
        await partDetailsLogic.printModal();
    });

    it('should open specific print preview modals - Active Mfr Link - Parts Search', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - Active Mfr Link', async () => {
        await partDetailsLogic.searchByExample();
    });

});

