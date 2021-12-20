import {browser, by} from "protractor";
import {
    gridElements, partDetailsElements, bomVaultElements, searchElements,
    resReqElements
} from "../../../../elements/elements";
import {meganavItems, commonData, buttonNames} from "../../../../testData/global";
import {commonSearch} from "../../../../testData/search";
import {partDetailsData} from "../../../../testData/partDetails";
import {Button} from "../../../../components/simple/button";
import {CustomLayoutLogic} from "../../../../bussinesLayer/bomVault/customLayoutLogic";
import {Grid} from "../../../../components/grid";
import {Input} from "../../../../components/simple/input";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {ResRequestLogic} from "../../../../bussinesLayer/resRequest/resRequestLogic";
import {StringArray} from "../../../../utils/stringArray";
import {Toolbar} from "../../../../components/toolbar";
import {QuickSearch} from "../../../../components/quickSearch";
import {Waiters as w} from "../../../../helper/waiters";
import {Shade} from "../../../../components/shade";
const button: Button = new Button();
const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const grid: Grid = new Grid();
const input: Input = new Input();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const resReqLogic: ResRequestLogic = new ResRequestLogic();
const stringArray: StringArray = new StringArray();
const toolbar: Toolbar = new Toolbar();
const quickSearch = new QuickSearch();
describe('Part Details - Active Generic - Parts Search', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAttributeByName('Active Generic');
        await customLayoutLogic.saveNewCustomLayout();
    });

    afterAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });

    it('should open part details modal by clicking on Active Generic Link - Parts Search', async () => {
        await partDetailsLogic.newGridOpenPartDetModalFromActiveGenericMfrLinkInSearch('Active Generic');
    });

    it('should be column headers for Active Generic - Parts Search',  async () => {
        const expectedColumnHeaders = [ 'Part Number', 'Description', 'Manufacturer Name', 'CAGE Code', 'Active Generic',
            'Temperature Grade', 'Qualifications', 'Manufacturer Comments'];
        await expect(await grid.newGridGetVisibleColumnHeadersInModal()).toEqual(expectedColumnHeaders);
    });


    it(" should be export dropdown - Active Generic Link - Parts Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be add button with dropdown list  - Active Generic Link - Parts Search',  async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal  - Active Generic Link - Parts Search ',  async () => {
        await partDetailsLogic.addToBomModal();
    });

    it('should open view alternates modal  - Active Generic Link - Parts Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await await modal.openModalWithButtonByName(buttonNames.resRequest);
        await resReqLogic.fillRequireFields();
        await input.fillFieldWithValue(resReqElements.reqInfoField, commonSearch.spacesValue);
        await expect(button.returnButtonByText(buttonNames.submitResReq).isEnabled()).toBeFalsy();
        await modal.closeModalWithElement(modal.modalX.get(1));
    });

    it('should open  print preview all modal - Active Generic Link -  Parts Search', async () => {
        await partDetailsLogic.printModal();
    });

    it('should open specific print preview modals - Active Generic Link - Parts Search', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - Active Generic Link', async () => {
        await partDetailsLogic.searchByExample();
    });

});

