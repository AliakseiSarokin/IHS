import { modalTitles, buttonNames, fieldStatuses, meganavItems, titles,} from "../../../../testData/global";
import { pageTitles, gridElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";
import {Button} from "../../../../components/simple/button";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";

const bomVaultLogic: BomVaultLogic = new BomVaultLogic();
const button: Button = new Button;
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal:Modal = new Modal();

describe('BOM Summary - Read Only User', () => {

    it ( 'should go to BOM Summary - Read Only User' , async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.grid);
        await expect(await pageTitles.pageTitle.getText()).toEqual(titles.bomSummary);
    });

    it ( 'should open export modal - BOM Summary - Read Only User' , async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.exportBoms);
        await modal.closeModalWithButton(buttonNames.cancel);
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithXButton();
    });

    it('should export file for BOM Summary - Read Only User',  async () => {
        await modal.checkingExportFile(buttonNames.export, buttonNames.export, gridElements.grid, 'BOMSummary.xls');
    });

    it('should be inactive reprocess and delete buttons  - BOM Details - Read Only User',  async () => {
        await grid.checkCheckboxRange(0,1);
        await expect(button.returnButtonByText(buttonNames.reprocess).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
    });

    it('should go to Generate Report Page without selecting files - Read Only User ',  async () => {
        await grid.checkCheckboxRange(0,1);
        await bomVaultLogic.goToGenerateReportWithoutSelecting();
    });

});