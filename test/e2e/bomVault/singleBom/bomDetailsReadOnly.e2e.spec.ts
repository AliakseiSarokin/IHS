import {browser} from "protractor";
import {buttonNames, meganavItems, columnHeaders, modalTitles,exportOptions} from "../../../../testData/global";
import {
    bomElements,
    commonElements,
    gridElements,
    quickSearchElements,
    reportElements
} from "../../../../elements/elements";
import {Button} from "../../../../components/simple/button";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Toolbar} from "../../../../components/toolbar";
import {Shade} from "../../../../components/shade";
import {reportsData} from "../../../../testData/reports";
import {ReportsLogic} from "../../../../bussinesLayer/reports/reportsLogic";
import {Waiters as w} from "../../../../helper/waiters";
const button: Button = new Button();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();
const reportsLogic: ReportsLogic = new ReportsLogic();

describe(' BOM Details tab - Read Only User', () => {

    it ( 'should go to view single bom - bom details - Read Only User ' , async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
    });

    it('should be inactive add dropdown buttons  - BOM Details - Read Only User',  async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.addPart).isEnabled()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.addPartNote).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.add);
    });

    it('should be inactive modify dropdown buttons  - BOM Details - Read Only User',  async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(await button.returnButtonByText(buttonNames.modifyPart).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
    });

    it('should not be active reimport and delete part buttons - Read Only User', async () => {
        await expect(await button.returnButtonByText(buttonNames.reimport).isEnabled()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.deletePart).isEnabled()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.reprocess).isEnabled()).toBeFalsy();
    });

    it('should open/close single research request modal - BOM Details - Read Only User', async () => {
        await modal.openModalWithElement(await toolbar.returnToolbarButtonByValue(buttonNames.resRequest));
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
        await modal.closeModalWithXButton();
    });

    it('should open/close multiple research request modal - - Read Only User', async () => {
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await grid.newMechanismCheckboxRangeChecking(1,3);
        await modal.openModalWithElement(await toolbar.returnToolbarButtonByValue(buttonNames.resRequest));
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
        await modal.closeModalWithXButton();
    });

    it ( 'should open export modal - BOM Details' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toContain('Export BOM Details Part(s) for ');
        await modal.exportModalAttributes(exportOptions.bom.bomDetails.labels, exportOptions.bom.bomDetails.options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should go to generate a report page when select a bom and click on the gen rep button  - Read Only User', async () => {
        await singleBomLogic.goToGenerateReportPageBomDetails();
    });

    it('should be active button Generate my report, DE120387', async () => {
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[3]);
        await reportsLogic.goToStep3();
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.generateMyReport));
        await expect(button.returnButtonByText(buttonNames.generateMyReport).isEnabled()).toBeTruthy();
    })
});