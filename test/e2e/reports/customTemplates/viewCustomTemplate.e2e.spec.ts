import {browser} from "protractor";
import {buttonNames, columnHeaders, meganavItems, titles} from "../../../../testData/global";
import {dropdownElements, gridElements, pageTitles, reportElements} from "../../../../elements/elements";
import {reportsData} from "../../../../testData/reports";
import {Button} from "../../../../components/simple/button";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {TemplatesLogic} from "../../../../bussinesLayer/reports/templatesLogic";
import {Toolbar} from "../../../../components/toolbar";
const button: Button = new Button();
const grid: Grid = new Grid();
const instructionPanel: InstructionPanel = new InstructionPanel();
const helpLogic: HelpLogic = new HelpLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const templatesLogic: TemplatesLogic = new TemplatesLogic();
const toolbar: Toolbar = new Toolbar();
describe('View Custom Template Modal', () => {

    it(" should go to View All Templates page, should be instruction panel with option to hide/unhide ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.viewTemplates, gridElements.grid);
        await instructionPanel.instrPanelHidingUnhidingChecking('View Templates');
    });


    it('should be unhide button with dropdown list  - View Custom Templates',  async () => {
        await toolbar.unhideDropdown()
    });

    it('should hide the column - View Custom Templates',  async () => {
        await grid.newGridHideColumnByName('Description');
        await toolbar.displayHiddenColumnInDropdonwToolbar('Description');
    });

    it('should unhide the column with Unhide All - View Custom Templates',  async () => {
        await toolbar.unhideCellNameWithUnhideAll('Description');
    });


    it('should have filters dropdown on view all custom templates page ',  async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        const expectedFiltersValue = ['Clear Filter', 'View My Custom Templates', 'View Custom Templates Created Today',
            'View Custom Templates Created in the last 7 days', 'View Custom Templates Created in the last 30 days',
            'View Custom Templates Created in the last 60 days'];
        await expect(dropdownElements.dropdownValues.getText()).toEqual(expectedFiltersValue);
        await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);
    });

    it('should select option and display tag - View All Templates ',  async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter);
    });

    it('should display one tag - View All Templates ',  async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });

    it('should remove tag by clicking on clear all tags link - View All Templates ',  async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove tag by clicking on X - View All Templates ',  async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it(" should open View Custom Template modal", async () => {
        await templatesLogic.openViewCustomTemplateModal();
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Create or modify a Custom report template');
    });

    it("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Modify a custom report template');
    });

    it(" should be containers", async () => {
        const labels = [ 'Overview', 'Attributes, Sort Order and Priority', 'All Custom Templates' ];
        await expect(await reportElements.customTemplates.containers.getText()).toEqual(labels);
        const overviewFields =  [ 'Custom Template:', 'Description:', 'Last Modified:', 'Created:', 'Owner:' ];
        await expect(await reportElements.customTemplates.overviewFields.getText()).toEqual(overviewFields);
    });

    it(" should switch to another link ", async () => {
        await templatesLogic.switchToAnotherTemplate()
    });

    it(" should close view template modal", async () => {
        await modal.closeModalWithXButton();
        await templatesLogic.openViewCustomTemplateModal();
        await modal.closeModalWithButton(buttonNames.close);
        await expect(toolbar.columnFiltersLink.isPresent()).toBeFalsy()
    });

});

describe('View All Templates Datagrid Maintain Sort - US200986', () => {

    it('scenario 1',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.viewTemplates, gridElements.checkboxSelector.get(1));
        await toolbar.clearFilteringWithClearAll();
        await grid.newGridOpenFilterBoxByName('Custom Template Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await templatesLogic.openViewCustomTemplateModal();
        await modal.closeModalWithXButton();
        await toolbar.displaySortValue('Custom Template Name', toolbar.upSortArrow)
    });

    it('scenario 2',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.viewTemplates,gridElements.checkboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await Dropdown.selectValueInDropdownByValueName('View My Custom Templates');
        await templatesLogic.openViewCustomTemplateModal();
        await modal.closeModalWithXButton();
        await expect(await toolbar.tagLabel.get(0).getText()).toEqual('View My Custom Templates');
    });
});
