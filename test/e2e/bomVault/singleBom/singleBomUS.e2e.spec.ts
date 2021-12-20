import {browser} from "protractor";
import {buttonNames, columnHeaders, exportOptions, meganavItems, modalTitles} from "../../../../testData/global";
import {gridElements, modalElements, searchElements} from "../../../../elements/elements";
import {Waiters as w} from "../../../../helper/waiters";
import {Actions} from "../../../../utils/actions";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Grid} from "../../../../components/grid";
import {Button} from "../../../../components/simple/button";
import {Modal} from "../../../../components/modal";
import {ComparePartsLogic} from "../../../../bussinesLayer/search/comparePartsLogic";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {Link} from "../../../../components/simple/link";
import {Toolbar} from "../../../../components/toolbar";

const login = new Login();
const meganav = new Meganav();
const singleBomLogic = new SingleBomLogic();
const grid = new Grid();
const button = new Button();
const modal = new Modal();
const comparePartsLogic = new ComparePartsLogic();
const partDetailsLogic = new PartDetailsLogic();
const link = new Link();
const toolbar = new Toolbar();



describe('Compare Parts - BOM Details, US278744', () => {

    it('should be inactive compare button whe one row is selected - BOM Details', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openSingleBomByName('Automation_BOM');
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeFalsy();

    });

    it('should open compare button with selected 4 - BOM Details', async () => {
        await grid.newMechanismCheckboxRangeChecking(1, 4);
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeTruthy();
        await modal.openModalWithButtonByName(buttonNames.compareSelected);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.compareParts('4'));
        await expect(await searchElements.comparePartsSubtitle.getText()).toEqual('Compare 4 Parts from BOM Details');
    });

    it('should be locked first and second columns for compare selected modal- BOM Details ', async () => {
        await expect(await modalElements.newGirdModalLockedHeaderColumns.count()).toEqual(2);
    });

    it('should set as anchor selected part for Compare Selected modal - BOM Details', async () => {
        await comparePartsLogic.setAsAnchorCompareModal();
    });

    it('should export file for Compare Parts - BOM Details', async () => {
        await modal.checkingExportFile(buttonNames.export, 'nothing', gridElements.grid,
            exportOptions.search.compareParts.fileName);
    });

    it('should remove selected part for Compare Selected modal - BOM Details', async () => {
        await comparePartsLogic.removePartCompareModalBomDetails();
        await modal.closeModalWithXButton();
    });

});

describe('US280245: Export more than 1000 parts',()=> {
    it('should verify once user selects more than 1000 parts the tooltip with message is displayed', async () => {
        const expectedTooltip: string = 'The number of selected parts is greater than the maximum allowed for export.\n' +
            'Please reduce the number of selected parts to 1000 or less to use this option.'
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await grid.newGridOpenFilterBoxByName('Parts');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 0,
            'Parts', true);
        await singleBomLogic.openFirstProcessedSingleBom();
        await grid.changeItemsPerPage('500');
        for (let i: number = 0; i < 3; i++) {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
            await gridElements.selectAllCheckboxes.first().click();
            await gridElements.nextPageButton.click();
        }
        await modal.openModalWithButtonByName(buttonNames.export);
        await Actions.mouseMoveToElementStatic(modalElements.hoverOverSelectedParts);
        await expect(await modalElements.selectedPartsTooltip.getAttribute('title')).toEqual(expectedTooltip);
    });
});

describe('US376831:  Search by Example - Back to my BOM from Parametric Search Page',()=> {
    it('should verify Search by Example - Back to my BOM button from Parametric Search Page is displayed', async () => {
        const BOMName:string = '1234';
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openSingleBomByName(BOMName);
        await singleBomLogic.verifyBackToMyBOMButtonDisplayed();

    });
});

describe('US376854: Add to BOMs Menu Updates from Search by Example Results',()=> {
    it('should verify Add to current bom: <<Current BOM Name>> in add to BOMs modal is displayed', async () => {
        const BOMName:string = '1234';
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openSingleBomByName(BOMName);
        await singleBomLogic.verifyAddToBOMsMenu(BOMName);

    });
});