import {browser, by, element} from "protractor";
import {buttonNames, columnHeaders, meganavItems} from "../../../../testData/global";
import {
    cplElements,
    gridElements,
    sliderElements,
    dropdownElements,
    bomElements,
    partDetailsElements, searchElements, settings
} from "../../../../elements/elements";
import {AddCorpPartSliderLogic} from "../../../../bussinesLayer/cpl/cpl/addCorpPartSliderLogic";
import {Button} from "../../../../components/simple/button";
import {Dropdown} from "../../../../components/dropdown";
import {CplDetailsLogic} from "../../../../bussinesLayer/cpl/cpl/cplDetailsLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Grid} from "../../../../components/grid";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Toolbar} from "../../../../components/toolbar";
import {Slider} from "../../../../components/slider";
import {NewBrowserTab} from "../../../../utils/newBrowserTab";
import {Navigation} from "../../../../utils/navigation";
import {BeforeAfter} from "../../../../helper/beforeAfter";
import {columnIdByColumnName} from "../../../../testData/columnIdByColumnName";
import {Growlers} from "../../../../components/growlers";
import {Input} from "../../../../components/simple/input";
import {bomVaultData} from "../../../../testData/bomVault";
import {Waiters as w} from "../../../../helper/waiters";
import {Actions} from "../../../../utils/actions";

const addCorpPartSliderLogic: AddCorpPartSliderLogic = new AddCorpPartSliderLogic();
const button: Button = new Button();
const dropdown: Dropdown = new Dropdown();
const cplDetailsLogc: CplDetailsLogic = new CplDetailsLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const grid: Grid = new Grid();
const helpLogic: HelpLogic = new HelpLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const input = new Input();

describe('CPL Details Tab', () => {

    it('should go to CPL Details',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.grid);
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('CPL Details');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('CPL Details');
    });

    it('should be ASC sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Corp P/N');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Corp P/N', true);
        const activeNameActualAscValues: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.mfrsKnowledgeBaseColumnNamesContent['Accepted Mfr Name'])).filter(String);
        const activeNameExpectAscValues: string[] = (await grid.compareAscValues(activeNameActualAscValues.slice().sort())).filter(String);
        await expect(activeNameExpectAscValues).toEqual(activeNameActualAscValues);
    });

    it('should remove filtering with clear all',  async () => {
        await toolbar.clearFilteringWithClearAll();
    });

    it('should be DESC sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Corp P/N');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[2], gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Corp P/N', true);
        const activeNameActualDescValues: string[] = (await grid.getCellValuesByCellId(columnIdByColumnName.mfrsKnowledgeBaseColumnNamesContent['Accepted Mfr Name'])).filter(String);
        const activeNameExpectDescValues: string[] = (await grid.compareDescValues(activeNameActualDescValues.slice())).filter(String);
        await expect(activeNameExpectDescValues).toEqual(activeNameActualDescValues);
        await grid.newGridOpenFilterBoxByName('Corp P/N');
    });

    it('should remove filtering with clear all X',  async () => {
        await toolbar.clearFilteringWithX();
    });
//won't pass with old grid
    xit('should be Corpotate Parts grid with column headers',  async () => {
        await grid.checkingColumnHeaders(1, [ 'Corp P/N', 'Corp Name', 'Corp P/N Desc',
            'Corp Part Status', 'CPL Comments']);
    });

    it('should open Mfr Parts grid by clicking on the Corp P/N link ',  async () => {
        await cplDetailsLogc.openRightSideGridByClickingOnCorpPN()
    });

    it('should be bold text in right side grid colmns ',  async () => {
        await cplDetailsLogc.rightSideGridColumnsBeBold()
    });

    it('should open part details modal by clicking on the Matched Mfr P/N link ',  async () => {

        await cplDetailsLogc.openPartDetailsModalByLinksMatchedMfrPN()
    });

    it("should open help panel and check title", async () => {
        await browser.executeScript("document.querySelectorAll('.ag-center-cols-viewport')[1].scrollIntoView()");
        let result:string = await cplElements.cplDetails.rightGridLinks.get(0).getText();
        await modal.openModalWithLinkName(result);
        await helpLogic.openAndCheckHelpPanelTitle('View part details');
        await modal.closeModalWithXButton();
    });

    it("should open help panel and check opened subitem", async () => {
        await browser.executeScript("document.querySelectorAll('.ag-center-cols-viewport')[1].scrollIntoView()");
        let result:string = await cplElements.cplDetails.rightGridLinks.get(0).getText();
        await modal.openModalWithLinkName(result);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('View part details');
        await modal.closeModalWithXButton();
    });

    it('should open part details modal by clicking on the Matched Mfr Name link',  async () => {
        await cplDetailsLogc.openPartDetailsModalByLinksMatchedMfrName()
    });

    it('should open Add Corparate Part slider - CPL Details',  async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Growlers.closeGrowlerIfDisplayed();
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addCorpParts));
        await expect(await sliderElements.sliderTitle.getText()).toEqual( 'Manage Corporate Part(s)');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('CPL Details');
    });

    it("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Add / Modify corporate parts in CPL');
    });



    it('should be Add Corparate Part slider sections - CPL Details',  async () => {
        await expect(await cplElements.cplDetails.addSliderPanelTitles.getText()).toEqual([ 'Add (or Modify) Corporate Part Number',
            'Select Manufacturer Parts',
            'Review Selected Manufacturer Parts (0 part(s) added, 0 total parts)' ])
    });

    it('should be Add Corparate Part slider fileds - CPL Details',  async () => {
        const fieldLabels =[ 'Corp P/N', 'Corp Name', 'Corp P/N Desc', 'Corp P/N Comments',
                    'Corp P/N Status', 'Generic P/N', 'CPL Custom 1', 'CPL Custom 2', 'CPL Custom 3',
                    'CPL Custom 4', 'CPL Custom 5', 'CPL Custom 6', 'CPL Custom 7', 'CPL Custom 8',
                    'CPL Custom 9', 'CPL Custom 10' ] ;
        await expect(await cplElements.cplDetails.addSliderFirstSectionFieldsLabels.getText()).toEqual(fieldLabels);
        await addCorpPartSliderLogic.fieldGhostTextChecking()
    });

    it('should be Corp P/N field limits and counter - CPL Details',  async () => {
        await addCorpPartSliderLogic.filedLimitsAndCounterChecking(0, 42);
    });

    it('should be Corp Name field limits and counter - CPL Details',  async () => {
        await addCorpPartSliderLogic.filedLimitsAndCounterChecking(1, 128);
    });

    it('should be Corp P/N Desc field limits and counter - CPL Details',  async () => {
        await addCorpPartSliderLogic.filedLimitsAndCounterChecking(2, 255);
    });

    it('should be Corp P/N Status field limits and counter - CPL Details',  async () => {
        await addCorpPartSliderLogic.filedLimitsAndCounterChecking(4, 32);
    });

    it('should be Generic P/N field limits and counter - CPL Details',  async () => {
        await addCorpPartSliderLogic.filedLimitsAndCounterChecking(5, 32);
    });

    it('should be CPL Custom 1 field limits and counter - CPL Details',  async () => {
        await addCorpPartSliderLogic.filedLimitsAndCounterChecking(6, 255);
    });

    it('should be CPL Custom 2 field limits and counter - CPL Details',  async () => {
        await addCorpPartSliderLogic.filedLimitsAndCounterChecking(7, 255);
    });

    it('should be CPL Custom 3 field limits and counter - CPL Details',  async () => {
        await addCorpPartSliderLogic.filedLimitsAndCounterChecking(8, 255);
    });

    it('should be CPL Custom 4 field limits and counter - CPL Details',  async () => {
        await addCorpPartSliderLogic.filedLimitsAndCounterChecking(9, 255);
    });

    it('should be CPL Custom 5 field limits and counter - CPL Details',  async () => {
        await addCorpPartSliderLogic.filedLimitsAndCounterChecking(10, 255);
    });

    it('should be CPL Custom 6 field limits and counter - CPL Details',  async () => {
        await addCorpPartSliderLogic.filedLimitsAndCounterChecking(11, 255);
    });

    it('should be CPL Custom 7 field limits and counter - CPL Details',  async () => {
        await addCorpPartSliderLogic.filedLimitsAndCounterChecking(12, 255);
    });

    it('should be CPL Custom 8 field limits and counter - CPL Details',  async () => {
        await addCorpPartSliderLogic.filedLimitsAndCounterChecking(13, 255);
    });

    it('should be CPL Custom 9 field limits and counter - CPL Details',  async () => {
        await addCorpPartSliderLogic.filedLimitsAndCounterChecking(14, 255);
    });

    it('should be CPL Custom 10 field limits and counter - CPL Details',  async () => {
        await addCorpPartSliderLogic.filedLargeLimitsAndCounterChecking(15,255, 1024);
    });

    it('should clear all fields by clicking on the  - CPL Details',  async () => {
        await addCorpPartSliderLogic.clearFieldsWithResetButton();
    });

    it('should go to Select Manufacturer Parts accordion  - CPL Details',  async () => {
        await addCorpPartSliderLogic.goToStep2();
    });

    it('should be navigation tabs in Select Manufacturer Parts accordion  - CPL Details',  async () => {
        await expect(await cplElements.cplDetails.sliderNavTabs.getText())
            .toEqual([ 'Search for a Part', 'Enter Part Details', 'Select from Workspace' ])
    });

    it('should be search type radio buttons in Select Manufacturer Parts accordion  - CPL Details',  async () => {
        await addCorpPartSliderLogic.checking2AccordionRadioButtons();
    });

    it('should be ghost text depends on search types in Select Manufacturer Parts accordion  - CPL Details',  async () => {
        await addCorpPartSliderLogic.the2AccordionGhostTextChecking();
    });

    it('should clear search criteria by clicking on the X in Select Manufacturer Parts accordion  - CPL Details',  async () => {
        await addCorpPartSliderLogic.clearSearchCriteriaByX();
    });

    it('should perform search in Select Manufacturer Parts accordion  - CPL Details',  async () => {
        await addCorpPartSliderLogic.checking2AccordionPerformSearch();
    });


    it('should select a part from grid - Select Manufacturer Parts accordion',  async () => {
        await addCorpPartSliderLogic.selectPartFromGrid(bomElements.addAPartShade.searchForAPartCheckbox,0);
    });

    it('should go to Enter Part Details tab and fileds labels - Select Manufacturer Parts accordion',  async () => {
        await addCorpPartSliderLogic.goToATab(1);
        await addCorpPartSliderLogic.enterPartDetailsFieldsChecking();
    });

    it('should be reset clear fields button - Select Manufacturer Parts accordion',  async () => {
        await addCorpPartSliderLogic.checkingResetClearFieldButton();
    });

    it('should be option to go to Review Selected  from Enter Part Details tab - Select Manufacturer Parts accordion',  async () => {
        await addCorpPartSliderLogic.enterMfrPartNumber();
    });

    it('should go to Select from Workspace tab - Select Manufacturer Parts accordion',  async () => {
        await Growlers.closeGrowlerIfDisplayed();
        await addCorpPartSliderLogic.checkingSelectFromWorkspaceTab(1);
    });

    it('should select a pert from grid - Select Manufacturer Parts accordion',  async () => {
        await addCorpPartSliderLogic.selectPartFromGrid(bomElements.addAPartShade.workspaceCheckbox,0);
    });

    it('should save states on tabs - Select Manufacturer Parts accordion',  async () => {
        await addCorpPartSliderLogic.saveStateChecking();
    });

    it('should add parts and show them ',  async () => {
        await addCorpPartSliderLogic.addPartFromSelectAPartTab();
    });

    it('should be active/inactive set as preferred button - add slider ',  async () => {
        await addCorpPartSliderLogic.setAdPrefButtonChecking();
    });

    it('should set a part as preffered - add slider ',  async () => {
        await addCorpPartSliderLogic.setAsPrefChecking();
    });

    it('should be active/inactive remove button - add slider ',  async () => {
        await addCorpPartSliderLogic.deleteButtonChecking();
    });

    it('should open remove modal - add slider ',  async () => {
        await addCorpPartSliderLogic.openDeleteModal();
    });

    it('should close remove modal - add slider ',  async () => {
        // await modal.closeModalWithXButton();
        // await modal.openModalWithButtonByName(buttonNames.remove);
        await modal.closeModalWithButton(buttonNames.no);
    });

    it('should clear all values with Cancel, do not add button on Search for a Part tab - add slider ',  async () => {
        await cplElements.cplDetails.addSliderPanelTitles.get(1).click();
        await addCorpPartSliderLogic.checkCancelDoNotAddButton(0)
    });

    it('should clear all values with Cancel, do not add button on Enter Part Details tab - add slider ',  async () => {
        await addCorpPartSliderLogic.checkCancelDoNotAddButton(1)
    });

    it('should clear all values with Cancel, do not add button on Select from Workspace tab - add slider ',  async () => {
        await addCorpPartSliderLogic.checkCancelDoNotAddButton(2)
    });


    it('should add new corp part - add slider ',  async () => {
        await addCorpPartSliderLogic.checkCancelDoNotAddButton(2)
    });

    it('should be leave modal - add slider ',  async () => {
        await addCorpPartSliderLogic.leaveModalChecking();
    });

    it('should close slider with leave modal - add slider ',  async () => {
        await addCorpPartSliderLogic.closeSliderWithLeaveModal();
    });

    it('should open reprocess Modal - CPL Details',  async () => {
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await expect(await modal.modalTitle.getText()).toEqual('Reprocess CPL');
        const reprocessText = ['Are you sure that you want to reprocess this CPL?','If you select Yes,' +
        ' your CPL will be queued for processing to identify updates in Part and/or Manufacturer data. ' +
        'If you select No, you will be returned to CPL Details and the CPL will not be reprocessed.'];
        await expect(await modal.modalBodyParag.getText()).toEqual(reprocessText);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await modal.closeModalWithButton(buttonNames.noDoNotReporcess);
    });

    it('should reprocess CPL   - CPL Details',  async () => {
        await addCorpPartSliderLogic.repocessCpl();
    });

    it('should add corp part - CPL Details',  async () => {
        await Growlers.closeGrowlerIfDisplayed();
        await addCorpPartSliderLogic.addCorpPart()
    });

    it('should not add the same corp part and show an error - CPL Details',  async () => {
        await addCorpPartSliderLogic.notAddTheSameCorpPart();
    });

    it ( 'should open delete part modal' , async () => {
        await cplDetailsLogc.deleteButtonChecking()
    });

    it ( 'should be delete part modal attributes' , async () => {
        await cplDetailsLogc.openAndCheckDeleteModal()
    });

    it('should close Delete Modal  - CPL  Details',  async () => {
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should delete Corp Part  - CPL  Details',  async () => {
        await addCorpPartSliderLogic.deleteCorpPart();
        await Growlers.closeGrowlerIfDisplayed();
        await addCorpPartSliderLogic.repocessCpl();
        await Growlers.closeGrowlerIfDisplayed();
    });

    it('should be modify dropdown button - CPL Details',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.grid);
        await grid.checkCheckboxRangeNewGrid(0,1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.modifyCorpParts));
        await Growlers.closeGrowlerIfDisplayed();
        await expect(await sliderElements.sliderTitle.getText()).toEqual( 'Manage Corporate Part(s)');

    });

    it('should close modify Corparate Part slider - CPL Details',  async () => {
        await Slider.closeSlider(sliderElements.xButtonSlider, gridElements.severalGrid.get(0));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.modifyCorpParts));
        await Slider.closeSlider(button.returnButtonByText(buttonNames.close), gridElements.severalGrid.get(0));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.modifyCorpParts));
        await Slider.closeSlider(sliderElements.closeSliderTab, gridElements.severalGrid.get(0));
    });

    it('should have unhide button with dropdown list  - CPL Details',  async () => {
        await cplDetailsLogc.openRightSideGridByClickingOnCorpPN();
        await toolbar.unhideDropdown();
    });

    it('should hide the column - CPL Details',  async () => {
        await grid.newGridHideColumnByName('Corp Name');
    });

    it('should unhide the column with Unhide All - CPL Details',  async () => {
        await toolbar.unhideDuplicateCellNameWithUnhideAll(4,'Corp Name');
    });

    it('should be able filters - CPL Details',  async () => {
        const expectedFilterOptions = ['Clear Filter', 'CPL Parts with no Matched Mfr Parts',
            'CPL Parts with just 1 Mfr Part', 'CPL Parts with multiple Mfr Parts'];
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);
    });

    it('should select option and display tag - CPL Details ',  async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter);
    });

    it('should display one tag - CPL Details ',  async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove tag by clicking on clear all tags link - CPL Details',  async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove tag by clicking on X - CPL Details',  async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it ( 'should open export modal - CPL Details' , async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toEqual('Export CPL Part(s)');
        const labels = ['Select which Parts to include in the Export:',
            'Select Export format:'];
        const options = [ 'Selected Parts Only', 'All Parts', 'Excel Spreadsheet (XLS)',
            'Comma-Separated Values (CSV)', 'Tab-Delimited Text (TXT)' ];
        await modal.exportModalAttributes(labels, options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it("should open export modal - CPL Details, open help panel and check opened subitem", async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Export CPL details');
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    //skip test because of the defect with help panel
    xit("should open reprocess modal - CPL Details, open help panel and check opened subitem", async () => {
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Reprocess CPL');
        await modal.closeModalWithButton(buttonNames.noDoNotReporcess);
    });

    xit('should export file for CPL Details',  async () => {

       // await modal.checkingExportFile(buttons.exportButton, buttons.exportCplButton , elements.grid, 'IHS_CPLExport.txt');
    });

    it('should be reimport button and go to Import CPL - CPL Details',  async () => {
        await cplDetailsLogc.reimportChecking();
    });

});

describe('CPL Details Tab', () => {

    it('should close Add Corparate Part slider - CPL Details',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.grid);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addCorpParts));
        await Slider.closeSlider(sliderElements.xButtonSlider, gridElements.severalGrid.get(0));
        await BeforeAfter.clearCacheCookies();
        await Navigation.refreshPage(gridElements.checkboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addCorpParts));
        await Slider.closeSlider(button.returnButtonByText(buttonNames.close), gridElements.severalGrid.get(0));
        await BeforeAfter.clearCacheCookies();
        await Navigation.refreshPage(gridElements.checkboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addCorpParts));
        await Slider.closeSlider(sliderElements.closeSliderTab, gridElements.severalGrid.get(0));
        await BeforeAfter.clearCacheCookies();
        await Navigation.refreshPage(gridElements.checkboxSelector.get(1));
    });
});

describe('Bug 295130. Hyperlink on CPL details is not working as expected', () => {

    it('should be Hyperlink on CPL details',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.grid);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addCorpParts));
        await input.fillFieldWithValue(cplElements.cplDetails.addSliderFirstSectionInputs.get(0), bomVaultData.attributes.newBomName);
        await input.fillFieldWithValue(cplElements.cplDetails.addSliderFirstSectionInputs.get(15), 'https://google.com');
        await button.clickByButtonName(buttonNames.addManufacturerParts);
        await addCorpPartSliderLogic.checking2AccordionPerformSearch();
        await addCorpPartSliderLogic.selectPartFromGrid(bomElements.addAPartShade.searchForAPartCheckbox,0);
        await addCorpPartSliderLogic.goToATab(1);
        await addCorpPartSliderLogic.enterPartDetailsFieldsChecking();
        await button.clickByButtonName(buttonNames.addAndReviewSelectedParts);
        await button.clickByButtonName(buttonNames.save);
        await grid.newGridOpenFilterBoxByName('Corp P/N');
        await input.fillFieldWithValue(gridElements.columnsSort.input, bomVaultData.attributes.newBomName);
        await button.clickByButtonName(buttonNames.applyFilter);
        await grid.clickOnCellLinkAndWaitForElement(1,0,0,gridElements.columnHeaderNamesCPL.get(0));
        await browser.executeScript(`document.querySelectorAll('.cpl-grid-table.ng-star-inserted .ag-cell-label-container')[4].scrollIntoView()`);
        await browser.sleep(100)
        for (let i = 0; i<7; i++){
            await browser.executeScript(`document.querySelectorAll('.cpl-grid-table.ng-star-inserted .ag-cell-label-container')[6].scrollIntoView()`);
            await browser.sleep(100)
        }
        await browser.executeScript(`document.querySelector('.cpl-grid-table.ng-star-inserted a').scrollIntoView()`);
        await button.clickOnTheElement(settings.searchSettings.cplcustomLink);
        expect((await browser.driver.getAllWindowHandles()).length).toEqual(2);
    });
});
