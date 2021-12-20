import {browser} from "protractor";
import {Button} from "../../../../components/simple/button";
import {gridElements, partDetailsElements, bomVaultElements} from "../../../../elements/elements";
import {meganavItems, commonData, buttonNames} from "../../../../testData/global";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {Grid} from "../../../../components/grid";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Toolbar} from "../../../../components/toolbar";
const bomTreePartsLogic = new BomTreePartsLogic();
const button: Button = new Button();
const grid: Grid = new Grid();
const helpLogic: HelpLogic = new HelpLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const singleBonLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();

describe('Part Details modal with links from BOM Tree Parts grid - Mfr Name', () => {


    it('should open Part details modal by clicking on mfr name link - BOM Tree Parts', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(1));
        await bomTreePartsLogic.expandFolderBomTreeParts();
        await singleBonLogic.openSingleBomByName(commonData.bomNameWithIcons);
        await partDetailsLogic.newGridOpenPartDetModalFromMatchedMfrLinkInSearch();
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('View part details');
    });

    xit(" should be export dropdown -  part number link - BOM Tree Parts", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be active in the left nav - Mfr Name - BOM Tree Parts', async () => {
        await expect(await partDetailsElements.activeLeftNav.getText()).toEqual('Manufacturer Information')
    });


    it('should be Attribute and Value column headers - Mfr Name - BOM Tree Parts', async () => {
        const expectedColumnHeaders = [ 'Attribute', 'Value' ];
        await expect(await grid.newGridGetVisibleColumnHeadersInModal()).toEqual(expectedColumnHeaders);
    });

    it('should not be sorting for Attribute column headers - Mfr Name - BOM Tree Parts',  async () => {
        await grid.notBeSortingPartDetails();
    });

    it('should be add button with dropdown list  - part number link - BOM Tree Parts', async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal  - part number link - BOM Tree Parts',   async () => {
        await partDetailsLogic.addToBomModal();
    });

    it("should open Add to BOM(s) modal  - alerts - BOM Details, open help panel and check opened subitem", async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Add parts to Workspace BOMs or general BOMs');
        await button.clickOnTheElement(modal.modalX.get(1));
    });

    it('should open view alternates modal  - part number link - BOM Tree Parts',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it("should open view alternates modal  - alerts - BOM Details, open help panel and check title", async () => {
        await modal.openModalWithButtonByName(buttonNames.viewAlternates);
        await helpLogic.openAndCheckHelpPanelTitle('Part alternates');
        await button.clickOnTheElement(modal.modalX.get(1));
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it("should open res request modal, open help panel and check title", async () => {
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await helpLogic.openAndCheckHelpPanelTitle('Research requests');
        await button.clickOnTheElement(modal.modalX.get(1));
    });

    it('should open  print preview all modal - part number link -  BOM Tree Parts', async () => {
        await partDetailsLogic.printModal();
    });

    it("should open  print preview all modal - alerts -  BOM Details, open help panel and check opened subitem", async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.print);
        await modal.openModalWithButtonByName(buttonNames.printPreviewAll);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Print part details');
        await button.clickOnTheElement(modal.modalX.get(1));
    });

    it('should open specific print preview modals - part number link - BOM Tree Parts', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - part number link - BOM Tree Parts', async () => {
        await partDetailsLogic.searchByExample();
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Parametric search');
    });
});
