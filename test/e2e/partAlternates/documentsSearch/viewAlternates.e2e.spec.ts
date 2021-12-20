import {Button} from "../../../../components/simple/button";
import {browser} from "protractor";
import {
    buttonNames, exportOptions,
    fieldStatuses, linksNames,
    meganavItems, modalTitles
} from "../../../../testData/global";
import {CheckBox} from "../../../../components/simple/checkBox";
import {DocumentsSearchLogic} from "../../../../bussinesLayer/search/documentsSearchLogic";
import {Grid} from "../../../../components/grid";
import {
    gridElements, partDetailsElements,
    searchElements, toolbarElements
} from "../../../../elements/elements";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {MultiSelectDropdown} from "../../../../components/multiSelectDropdown";
import {partDetailsData} from "../../../../testData/partDetails";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {Toolbar} from "../../../../components/toolbar";
import {ViewAlternatesLogic} from "../../../../bussinesLayer/partDetails/viewAlternatesLogic";
import {VideoSliderLogic} from "../../../../bussinesLayer/home/videoSliderLogic";
import {Waiters as w} from "../../../../helper/waiters";

const button: Button = new Button();
const checkbox: CheckBox = new CheckBox();
const documentsSearchLogic = new DocumentsSearchLogic();
const grid: Grid = new Grid();
const helpLogic: HelpLogic = new HelpLogic();
const link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const multiSelectDropdown: MultiSelectDropdown = new MultiSelectDropdown();
const partDetailsLogic = new PartDetailsLogic();
const toolbar: Toolbar = new Toolbar();
const viewAlternatesLogic: ViewAlternatesLogic = new ViewAlternatesLogic();

describe('View Alternates - Documents Search', () => {

    it('should be view alternates icon in the Documents Search result grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch('texas');
        await documentsSearchLogic.goToViewRelatedParts(1, 2);
        await viewAlternatesLogic.waitForIcon(partDetailsElements.viewAltIcon.first());
        await expect(await partDetailsElements.viewAltIcon.first().isDisplayed()).toBe(true);
    });

    it('should be tooltip for the reference design icon', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.viewAltIcon, partDetailsData.tooltips.viewAlternates);
    });

    it('should open view alternates modal and check modal title by clicking on the view alternates icon', async () => {
        await viewAlternatesLogic.openViewAlternatesModal(0, 'Part Number', true);
    });

    it('should open help panel and check title', async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Part alternates');
    });

    it('should open Video slider, play video and close', async () => {
        await VideoSliderLogic.openVideoSlider();
        await VideoSliderLogic.playingVideoChecking();
        await VideoSliderLogic.closeVideoSlider();
    });

    it('should be disabled buttons in Add dropdown list if no one Part was checked', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(button.returnButtonByText(buttonNames.addToBoms).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.addToWorksapce).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.addPartNote).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.add);
    });

    it('should be enabled buttons in Add dropdown if some Part was checked', async () => {
        await grid.checkCheckboxRange(1, 2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(button.returnButtonByText(buttonNames.addToBoms).isEnabled()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.addToWorksapce).isEnabled()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.addPartNote).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.add);
    });

    it('should open Add to BOM(s) modal', async () => {
        await partDetailsLogic.addToBomModal();
    });

    it("should be 'Unhide All' button in Unhide dropdown", async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column', async () => {
        await grid.newGridHideColumnByName('Alternate Type');
        await toolbar.displayHiddenColumnInDropdonwToolbar('Alternate Type')
    });

    it("should unhide the column by 'Unhide All' button", async () => {
        await toolbar.unhideCellNameWithUnhideAll('Alternate Type');
    });

    it('should open Filter dropdown and check included elements', async () => {
        await viewAlternatesLogic.openFilterDropdown();
        await expect(await partDetailsElements.filterCheckboxLabel.getText()).toEqual(partDetailsData.viewAlternatesFilterOptions);
        await checkbox.checkUnCheckCheckboxes(partDetailsElements.filterCheckboxLabel, partDetailsElements.filterCheckboxInput,
            fieldStatuses.emptyField);
        await checkbox.checkCheckboxesStatus(partDetailsElements.filterCheckboxInput,
            fieldStatuses.emptyField);
        await viewAlternatesLogic.applyFilter();
        await expect(await toolbarElements.modalXTag.count() === 0).toBeTruthy();
    });

    it('should be active apply chosen options in filter dropdown', async () => {
        await multiSelectDropdown.applyFilterButtonCheckingViewAlternates();
    });

    it("should display selected filter tag 'Direct (DIR)' in grid header under the toolbar", async () => {
        await viewAlternatesLogic.checkingFilterOptions(2, 3);
        await viewAlternatesLogic.checkFilterTagNames([partDetailsData.viewAlternatesFilterOptions[2]]);
    });

    it("should display all selected filter tags in grid header under the toolbar", async () => {
        await viewAlternatesLogic.checkingFilterOptions(0, 2);
        await viewAlternatesLogic.checkingFilterOptions(3, 11);
        await viewAlternatesLogic.checkFilterTagNames(partDetailsData.viewAlternatesFilterOptionsUpper);
    });

    it("should close just one filter tag 'Direct (DIR)' by clicking on 'X' near filter tagnames", async () => {
        await viewAlternatesLogic.closingFilterTagsByX(2, 3);
        await viewAlternatesLogic.checkFilterTagNames(partDetailsData.viewAlternatesFilterOptions.slice(2, 1));
    });

    it("should clear all filters by clicking on 'Clear All Tags' link", async () => {
        await link.clickOnTheLinkByName(linksNames.clearAllTags);
        await w.waitUntilElementIsClickable(modal.modalBody);
        await w.waitUntilElementIsClickable(gridElements.newGridModalLockedColumnRowCellsWithContent(0).get(1));
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await toolbarElements.modalXTag.count()).toEqual(0);
    });

    it('should open Export Part Alternate(s) modal and check modal title', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.severalModalTitles.get(1).getText()).toEqual(modalTitles.exportAlternates);
    });

    it('should check modal attributes in opened Export Part Alternate(s) modal', async () => {
        await modal.exportModalAttributes(exportOptions.viewAlternates.labels, exportOptions.viewAlternates.options);
    });

    it("should close Export Part Alternate(s) modal by 'X' button", async () => {
        await viewAlternatesLogic.closeExportInViewAlternates(modal.modalX.get(1));
    });

    it('should close Export Part Alternate(s) modal by Cancel button', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await viewAlternatesLogic.closeExportInViewAlternates(button.returnButtonByText(buttonNames.cancel));
    });

    it('should export a file for Part Alternate(s)', async () => {
        await modal.checkingExportFileAlternate(buttonNames.export, buttonNames.export, gridElements.grid,
            exportOptions.viewAlternates.fileName);
    });

    it("should be disable 'Compare Selected' button", async () => {
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeFalsy();
    });

    it("should be enable 'Compare Selected' button when two rows are selected", async () => {
        await grid.newMechanismCheckboxRangeChecking(2, 4);
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeTruthy();
    });

    it('should open Part Details modal and check modal title', async () => {
        await viewAlternatesLogic.newGridGoToPartDetailsFromViewAlternates();
    });
});
