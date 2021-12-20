import {browser} from "protractor";
import {buttonNames, meganavItems, columnHeaders, modalTitles, exportOptions} from "../../../../testData/global";
import {bomElements, commonElements, gridElements, partDetailsElements, bomVaultElements} from "../../../../elements/elements";
import {cplData} from "../../../../testData/cpl";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {Dropdown} from "../../../../components/dropdown";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Grid} from "../../../../components/grid";
import {Actions} from "../../../../utils/actions";

const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();
const dropdown: Dropdown = new Dropdown();
const login: Login = new Login();
const link: Link = new Link();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const grid: Grid = new Grid;

//need to find test data
xdescribe('CPN Modal - BOM Details',  () => {

    it('should navigate to BOM Details and be CPL icon on the grid',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(0));
        await bomTreePartsLogic.expandFolderBomTreeParts();
        await singleBomLogic.openSingleBomByName('Automation_BOM');
        await grid.newGridOpenFilterBoxByName('Matched P/N');
        await Actions.sendKeys(gridElements.columnsSort.input, 'LM311-MWC');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        await expect(partDetailsElements.cplIcon.get(0).isDisplayed()).toBeTruthy();
    });

    it('should open CPN modal', async () => {
        await modal.openModalWithElement(partDetailsElements.cplIcon.get(0));
        await expect(await modal.modalTitle.getText()).toEqual('Corporate Part Number Data');
        await expect(await modal.modalBodyParag.get(0).getText()).toEqual('View Corporate Part Data associated with this BOM part');
        await await modal.closeModalWithButton(buttonNames.okay);
        await modal.openModalWithElement(partDetailsElements.cplIcon.get(0));
        await modal.closeModalWithXButton();

    });


    it ( 'should open export modal - CPN Modal' , async () => {
        await modal.openModalWithElement(partDetailsElements.cplIcon.get(0));
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.severalModalTitles.get(1).getText()).toEqual('Export CPN Data');
        await modal.exportModalAttributes(exportOptions.bom.cpn.labels, exportOptions.bom.cpn.options);
        await modal.closeModalWithXButton('Export CPN Data');
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);

    });


    xit('should export file for CPN Modal',  async () => {
        // await modal.checkingExportFile(buttons.exportButton, buttons.exportTheseDataButton , elements.grid,
        //     exportOptions.bom.cpn.fileName);
    });

});