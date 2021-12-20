import {Button} from "../../../../components/simple/button";
import {gridElements, partStandardization,} from "../../../../elements/elements";
import {browser} from "protractor";
import {buttonNames, columnHeaders, meganavItems,} from "../../../../testData/global";
import {Grid, Transpose} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Toolbar} from "../../../../components/toolbar";
import {PartStandardizationLogic} from "../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {Link} from "../../../../components/simple/link";
import {Shade} from "../../../../components/shade";
import {Modal} from "../../../../components/modal";
import {Actions} from "../../../../utils/actions";
import {Random} from "../../../../utils/random";
import {Navigation} from "../../../../utils/navigation";

const button: Button = new Button;
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const link: Link = new Link();
const modal: Modal = new Modal();
const actions: Actions = new Actions();
const random: Random = new Random();
const transpose: Transpose = new Transpose();
const psName: string ='AutomationPS'+ random.randomTextGenerator(5);

describe('Part Standardization, test for view tab, boms tab and summary tab', ()=> {

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName(psName);
    });

    it('should check tab links without selected view', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await expect(await partStandardization.tabButton.get(0).getAttribute('class')).not.toContain('disabled');
        await expect(await partStandardization.tabButton.get(1).getAttribute('class')).toContain('disabled');
        await expect(await partStandardization.tabButton.get(2).getAttribute('class')).toContain('disabled');
    });

    it('should Run button be disable without selected part', async () => {
       await expect(await button.returnButtonByText(buttonNames.run).isEnabled()).toBeFalsy();
    });

    it(`should delete button be disable without selected part`, async () => {
       await expect(await button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
    });

    it('should check button in add dropdown without selected part', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.addNewPartStandardizationView).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.addBomsToPartStandardizationAnalysis).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.add);
    });

    it(`should check tooltip on boms tab`, async () => {
        await actions.mouseMoveToElementAndWaitForTooltip(partStandardization.tabButton.get(1), partStandardization.tabTooltips.get(0));
        await expect(await partStandardization.tabTooltips.get(0).getText()).toEqual('Please select a Part Standardization View first');
    });

    it(`should check tooltip on summary tab`, async () => {
        await actions.mouseMoveToElementAndWaitForTooltip(partStandardization.tabButton.get(2), partStandardization.tabTooltips.get(0));
        await expect(await partStandardization.tabTooltips.get(0).getText()).toEqual('Please select a Part Standardization View first');
    });

    it('should check columns in grid', async () => {
        await grid.newGridCheckingColumnHeaders(columnHeaders.partStandardization.viewsTab);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.unhide);
        await button.clickByButtonNameAndWait(buttonNames.unhideAll, gridElements.newGridRows.get(0));
    });

    it('should hide / unhide column', async () =>{
        await grid.newGridHideColumnByName(columnHeaders.partStandardization.viewsTab[1]);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.unhide);
        await button.clickByButtonName(buttonNames.unhideAll);
    });

    it('should check button in add new part standardization shade', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Shade.openShadeWithButton(buttonNames.addNewPartStandardizationView);
        await expect(await button.returnButtonByText(buttonNames.close).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.reset).isEnabled()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.createView).isEnabled()).toBeFalsy();
        await Shade.closeShadeWithButton(buttonNames.close, gridElements.selectAllCheckbox);
    });

    it('should add new part standardization view', async () => {
        await Navigation.refreshPage(await gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await partStandardizationLogic.addNewPartStandardizationView(psName);
    });

    it('should run button be disable after checked checkbox', async() => {
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', psName);
        await browser.sleep(2000);
        await expect(await button.returnButtonByText(buttonNames.run).isEnabled()).toBeFalsy();
    });

    it(`should delete button be enable with selected part`, async () => {

        await expect(await button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();
    });

    it('should check tab links with selected view', async () => {
        await expect(await partStandardization.tabButton.get(0).getAttribute('class')).not.toContain('disabled');
        await expect(await partStandardization.tabButton.get(1).getAttribute('class')).not.toContain('disabled');
        await expect(await partStandardization.tabButton.get(2).getAttribute('class')).toContain('disabled');
    });

    it('should check reset button', async () => {
        await grid.newMechanismSelectAllCheckboxChecking();
        await button.clickOnTheElementAndWait(toolbar.returnToolbarButtonByValue(buttonNames.reset),
            gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await browser.sleep(2000);
        await expect(await gridElements.selectAllCheckbox.isSelected()).toBeFalsy();
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', psName);
    });

    it('should Add BOM(s) to Part Standardization Analysis be enable after checked checkbox', async() => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.addNewPartStandardizationView).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.addBomsToPartStandardizationAnalysis).isEnabled()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.add);
    });

    it('should check column headers bom tab in default layout', async () => {
        await partStandardizationLogic.goToBomsTab();
        await partStandardizationLogic.newGridCheckingColumnHeadersForBomsTab(columnHeaders.partStandardization.bomsTab);
        await button.clickOnTheElementAndWait(partStandardization.toolbarButtonsBomsTab.get(2),
            partStandardization.dropdownMenuButtonsBomsTab.get(1));
        await button.clickOnTheElementAndWait(partStandardization.dropdownMenuButtonsBomsTab.get(1),
            toolbar.returnToolbarButtonByValue(buttonNames.remove));
    });

    it('should add Bom to view', async () => {
        await partStandardizationLogic.addAmountOfBomsToView(3);
        await expect(await gridElements.newGridRows.get(0).isPresent()).toBeTruthy();
    });

    it('should run button be enable on view tab after add bom to view', async () => {
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', psName);
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.run).isEnabled()).toBeTruthy();
    });

    it(`should check summary tooltip with selected view`, async () =>{
        await actions.mouseMoveToElementAndWaitForTooltip(partStandardization.tabButton.get(2), partStandardization.tabTooltips.get(0));
        await expect(await partStandardization.tabTooltips.get(0).getText())
            .toEqual('Add BOMs to the View and Run the analysis for this View to enable this tab');
    });

    it ('should run button be enable on boms tab after add bom', async() => {
        await partStandardizationLogic.goToBomsTab();
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.run).isEnabled()).toBeTruthy();
    });

    it('should run reprocess with run button and check view status', async () => {
        await browser.sleep(1000);
        await modal.openModalWithElement(partStandardization.toolbarButtonsBomsTab.get(0));
        await modal.closeModalWithButton(buttonNames.okay);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await partStandardizationLogic.analysisStatusShouldBeCompletedByName(psName, 1, 'Name');
    });

    it('should delete bom from view', async () => {
        await grid.mechanismCheckCheckboxByName('Name', psName);
        await partStandardizationLogic.goToBomsTab();
        await partStandardizationLogic.deleteSingleBomFromView();
    });

    it(`should check reprocess icon button and check view status`, async () => {
        await partStandardizationLogic.addBomToPartStandardizationView();
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await modal.openModalWithElement(partStandardization.reprocessIcons.get(0));
        await modal.closeModalWithButton(buttonNames.okay);
        await partStandardizationLogic.analysisStatusShouldBeCompletedByName(psName, 1, 'Name');
    });

    it(`should go to summary tab`, async () => {
        await grid.mechanismCheckCheckboxByName('Name', psName);
        await partStandardizationLogic.goToSummaryTab();
    });

    it(`should check Life Cycle layout`, async () => {
        await button.clickOnTheElementAndWait(partStandardization.toolbarButtonsSummaryTab.get(1),
            link.returnElementByLinkName('Life Cycle'));
        await link.clickOnTheLinkByNameAndWaitForElement('Life Cycle', partStandardization.newGridRowsForSummaryTab.get(1));
        await browser.sleep(2000);
        await expect(await partStandardization.panelTitle.get(1).getText()).toEqual('Layout : Life Cycle');
    });

    it(`should check Life Cycle layout column headers`, async () => {
        let headers: string[] = partStandardization.newGridHeaderNamesForSummaryTab.getText();
        await transpose.checkingArrayContainSecondArray(headers, columnHeaders.partStandardization.summaryTabLifeCycle);
    });

    it(`should check Environmental layout`, async() => {
        await button.clickOnTheElementAndWait(partStandardization.toolbarButtonsSummaryTab.get(1),
            link.returnElementByLinkName('Environmental'));
        await link.clickOnTheLinkByNameAndWaitForElement('Environmental', partStandardization.newGridRowsForSummaryTab.get(1));
        await browser.sleep(2000);
        await expect(await partStandardization.panelTitle.get(1).getText()).toEqual('Layout : Environmental');
    });

    it(`should check Environmental layout column headers`, async () => {
        let headers: string[] = partStandardization.newGridHeaderNamesForSummaryTab.getText();
        await transpose.checkingArrayContainSecondArray(headers, columnHeaders.partStandardization.summaryTabEnvironmental);
    });

    it(`should check Combined layout`, async () => {
        await button.clickOnTheElementAndWait(partStandardization.toolbarButtonsSummaryTab.get(1),
            link.returnElementByLinkName('Combined'));
        await link.clickOnTheLinkByNameAndWaitForElement('Combined', partStandardization.newGridRowsForSummaryTab.get(1));
        await browser.sleep(2000);
        await expect(await partStandardization.panelTitle.get(1).getText()).toEqual('Layout : Combined');
    });

    it(`should check Combined layout column headers`, async () => {
        let headers: string[] = partStandardization.newGridHeaderNamesForSummaryTab.getText();
        await transpose.checkingArrayContainSecondArray(headers, columnHeaders.partStandardization.summaryTabCombined);
    });

    it(`should check default layout`, async () => {
        await button.clickOnTheElementAndWait(partStandardization.toolbarButtonsSummaryTab.get(1),
            link.returnElementByLinkName('Default'));
        await link.clickOnTheLinkByNameAndWaitForElement('Default', partStandardization.newGridRowsForSummaryTab.get(1));
        await browser.sleep(2000);
        await expect(await partStandardization.panelTitle.get(1).getText()).toEqual('Layout : Default');
    });

    it(`should check column headers in default layout`, async () => {
        let headers: string[] = partStandardization.newGridHeaderNamesForSummaryTab.getText();
        await transpose.checkingArrayContainSecondArray(headers, columnHeaders.partStandardization.summaryTabDefault);
    });

    it(`should check Regenerate view(s) modal buttons`, async () => {
        await expect(await partStandardization.toolbarButtonsSummaryTab.get(0).isEnabled()).toBeTruthy();
        await modal.openModalWithElement(partStandardization.toolbarButtonsSummaryTab.get(0));
        await modal.closeModalWithXButton();
        await modal.openModalWithElement(partStandardization.toolbarButtonsSummaryTab.get(0));
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it(`should check run button on summary tab`, async () => {
        await modal.openModalWithElement(partStandardization.toolbarButtonsSummaryTab.get(0));
        await modal.closeModalWithButton(buttonNames.okay);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await partStandardizationLogic.analysisStatusShouldBeCompletedByName(psName, 1, 'Name');
        await grid.mechanismCheckCheckboxByName('Name', psName);
        await partStandardizationLogic.goToSummaryTab();
    });

    it(`should open modal in column Matched Mfr P/N and check it`, async () => {
        await partStandardizationLogic.openModalByFirstElementInColumn('Matched Mfr P/N', 'Part Details for Part Number:');
    });

    it(`should open modal in column Matched Mfr Name and check it`, async() => {
        await partStandardizationLogic.openModalByFirstElementInColumn('Matched Mfr Name', 'Part Details for Part Number: ');
    });
});

