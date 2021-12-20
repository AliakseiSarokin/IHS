import { modalTitles, buttonNames,  meganavItems,
    titles,columnHeaders} from "../../../../testData/global";
import {resReqElements, pageTitles, gridElements, bomVaultElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {StringArray} from "../../../../utils/stringArray";
import {bomVaultData} from "../../../../testData/bomVault";
import {Modal} from "../../../../components/modal";
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const stringArray: StringArray = new StringArray();


describe('Vault Summary',  () => {

    it ( 'should go to view single bom - vault summary' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.vaultSummary, bomVaultElements.vaultSummary.vaultGrid);
        await expect(await pageTitles.pageTitle.getText()).toEqual('Vault Summary');
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Vault Summary');
    });

    it ( 'should 3 tables with table headers' , async () => {
        await expect(await bomVaultElements.vaultSummary.tableHeaders.getText()).toEqual(bomVaultData.vaultSummary.tableHeaders)
    });

    it('should export a file - BOM Summary', async () => {
        await modal.checkingExportFile(buttonNames.export, buttonNames.export, gridElements.grid,
            'VaultSummary.xls');
    });

    it ( 'should be column headers and values in Summary Data Table' , async () => {
        await expect(await bomVaultElements.vaultSummary.columnHeadersByTableNumber(0).getText())
            .toEqual(bomVaultData.vaultSummary.summaryDataHeaders);
        await expect(await bomVaultElements.vaultSummary.tableKeyByTableNumber(0).getText())
            .toEqual(bomVaultData.vaultSummary.summaryDataKeys);
    });

    it ( 'should be column headers and values in Alerts Summary Table' , async () => {
        await expect(stringArray.returnArrayWithoutBr(await bomVaultElements.vaultSummary.columnHeadersByTableNumber(1).getText()))
            .toEqual(bomVaultData.vaultSummary.alertSummaryHeaders);
        await expect(await bomVaultElements.vaultSummary.alertSummaryValues.getText())
            .toEqual(bomVaultData.vaultSummary.alertSummaryValues);
        await expect(await bomVaultElements.vaultSummary.alertSummarySubHeaders.getText())
            .toEqual(bomVaultData.vaultSummary.alertSummarySubHeaders);
    });

    it ( 'should be column headers and values in Alerts Summary Table' , async () => {
        await expect(stringArray.returnArrayWithoutBr(await bomVaultElements.vaultSummary.columnHeadersByTableNumber(2).getText()))
            .toEqual(bomVaultData.vaultSummary.bomsByOwnerHeaders);
    });


});