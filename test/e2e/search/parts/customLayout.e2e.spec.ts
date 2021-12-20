import {Actions} from "../../../../utils/actions";
import {browser} from "protractor";
import {buttonNames, meganavItems, modalTitles, exportOptions, fieldStatuses} from "../../../../testData/global";
import {
    searchElements, gridElements, bomElements, shadeElements,
    dropdownElements
} from "../../../../elements/elements";
import {commonSearch} from "../../../../testData/search";
import {AddPartsToBomLogic} from "../../../../bussinesLayer/search/addPartsToBomLogic";
import {BomTreeFilterLogic} from "../../../../bussinesLayer/bomVault/bomTreeFilterLogic";
import {Button} from "../../../../components/simple/button";
import {CheckBox} from "../../../../components/simple/checkBox";
import {CustomLayoutLogic} from "../../../../bussinesLayer/bomVault/customLayoutLogic";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartsSearchLogic} from "../../../../bussinesLayer/search/partsSearchLogic";
import {Shade} from "../../../../components/shade";
import {SearchCustomLayoutLogic} from "../../../../bussinesLayer/search/searchCustomLayoutLogic";
import {Toolbar} from "../../../../components/toolbar";
import {async} from "q";

const actions: Actions=new Actions();
const addPartsToBomLogic: AddPartsToBomLogic = new AddPartsToBomLogic();
const bomTreeFilterLogic: BomTreeFilterLogic = new BomTreeFilterLogic();
const button: Button = new Button();
const checkbox: CheckBox = new CheckBox();
const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const grid: Grid = new Grid();
const modal: Modal = new Modal();
const meganav: Meganav = new Meganav();
const login: Login = new Login();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const searchCustomLayoutLogic: SearchCustomLayoutLogic = new SearchCustomLayoutLogic();
const toolbar: Toolbar = new Toolbar();
let rowValue: number;

describe('Manage Custom Layout - Parts Search', () => {

    it('should open Custom Layout Shade', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
    });

    it('should be info-icon tooltip, US274673', async () => {
        await actions.mouseMoveToElementAndWaitForTooltip(bomElements.customLayout.shadeInfoIcon, bomElements.customLayout.shadeInfoIconTooltip);
        await expect(await bomElements.customLayout.shadeInfoIconTooltip.getText()).toContain('Locked Attributes are displayed as bold text.');
    });

    it('should be subtitle and locked column text - Parts Search', async () => {
        await expect(await searchElements.manageLayout.subtitle.getText())
            .toEqual('Modify, Create, or Delete a Custom Part Search Results Layout.');
        const expectedText = 'Locked Attributes are displayed as bold text. Locked attributes are shown on the left side of the results grid without horizontal scroll bars. When creating a custom layout, the Part Number and Mfr Name must be locked by default.';
        await expect(await searchElements.manageLayout.lockedColumnText.getText()).toEqual(expectedText);
    });


    it('should be attributes panels - Parts Search', async () => {
        await expect(await bomElements.customLayout.columnLabels.getText())
            .toEqual(['Available Attributes', 'Selected Attributes'])
    });


    it('should close shade by clicking on the cancel and return button - Parts Search', async () => {
        await Shade.closeShadeWithButton(buttonNames.closeAndReturnToSearchResults);
    });

    it('should be options in select dropdown - Parts Search', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await Dropdown.openDropdownByClickOnElement(shadeElements.dropdownToggle);
        const expectedOptions = ['Create New Custom Layout', 'Default', 'Environmental', 'Combined', 'Life Cycle','CEYTEOL','COO_Layout'];
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectedOptions);
        await Dropdown.closeDropdownByClickOnElement(shadeElements.dropdownToggle);
    });

    it('should select Create New Custom Layout and displayed buutons and fields - Parts Search', async () => {
        await customLayoutLogic.selectCreateNewCustomLayout();
    });

    it('should cancel create new custom template without leave modal - Parts Search', async () => {
        await customLayoutLogic.cancelCreateNewCustomLayoutWithoutEdition();
    });

    it('should be default attribute in Selected Attributes Panel', async () => {
        await customLayoutLogic.selectCreateNewCustomLayout();
        await expect(await bomElements.customLayout.defaultOptions.getText())
            .toEqual(['Part Number', 'Mfr Name'])
    });

    it('should add all - Parts Search', async () => {
        await customLayoutLogic.addAllChecking(2);
    });

    it('should be enabled/disabled moveUp button and move up attributes - Parts Search', async () => {
        await searchCustomLayoutLogic.moveUpChecking();
    });

    it('should be enabled/disabled moveDown button and move down attributes - Parts Search', async () => {
        await searchCustomLayoutLogic.moveDownChecking();
    });

    it('should remove all - Parts Search', async () => {
        await customLayoutLogic.removeAllChecking(commonSearch.manageLayout.defaultValues.length);
    });

    it('should show cancel modal when you click on the cancel button - Parts Search', async () => {
        await customLayoutLogic.cancelCreateNewCustomLayoutModalNoXButton();
    });

    it('should  cancel creating new custom layout - Parts Search', async () => {
        await customLayoutLogic.cancelCreateNewCustomLayoutModalYesButton();
    });

    it('should create a new custom layout - Parts Search', async () => {
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAllChecking(commonSearch.manageLayout.defaultValues.length);
        await searchCustomLayoutLogic.setAndRememberLockedColumn();
        await customLayoutLogic.saveNewCustomLayout();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.defaultValues)
    });

    it('should display locked in the grid - Parts Search', async () => {
        await grid.newGridCheckingLockedColumnHeaders( searchCustomLayoutLogic.lockedAttributes)
    });

    it('should not show private layout for Restricted User', async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.defineValue);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeFalsy();
    });

    it('should not show private layout Read Only User', async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.defineValue);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeFalsy();
    });

    it('should not show private layout for Regular User', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.defineValue);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeFalsy();
    });

    it('should not show private layout for KB Admin', async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.defineValue);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeFalsy();
    });

    it('should not show private layout for User Admin', async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.defineValue);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeFalsy();
    });


    it('should open a new created custom lyaout - Parts Search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
    });

    it('should delete a new created custom lyaout - Parts Search', async () => {
        await customLayoutLogic.deleteLayout();
    });

    it('should save as new custom layout - Parts Search', async () => {
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await customLayoutLogic.saveAsNewCustomLayout();
    });

    it('should delete saved as new custom layout - Parts Search', async () => {
        await customLayoutLogic.openCreatedCustomLayout(0);
        await customLayoutLogic.deleteLayout();
        await Shade.closeShadeWithButton(buttonNames.closeAndReturnToSearchResults);
    });

    it('should create shared layout - Parts Search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAllChecking(commonSearch.manageLayout.defaultValues.length);
        await checkbox.checkUnCheckCheckboxes(searchElements.manageLayout.shareCheckboxLabel, searchElements.manageLayout.shareCheckboxInput,
            fieldStatuses.fillField);
        await searchCustomLayoutLogic.setAndRememberLockedColumn();
        await customLayoutLogic.saveNewCustomLayout();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.defaultValuesWithShared)
    });

    it('should show shared layout for Restricted User', async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.sharedValues);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout)
    });

    it('should not be option to modify or delete share layout for Restricted User', async () => {
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.sharedValues.length);
        await customLayoutLogic.removeOneChecking();
        await expect(searchElements.manageLayout.shareCheckboxInput.get(0).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });

    it('should not be option to modify or delete IHS Defined layout for Restricted User', async () => {
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });


    it('should show shared layout for Read Only User', async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.sharedValues);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout)
    });

    it('should not be option to modify or delete share layout for Read Only User', async () => {
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.sharedValues.length);
        await customLayoutLogic.removeOneChecking();
        await expect(searchElements.manageLayout.shareCheckboxInput.get(0).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });


    it('should not be option to modify or delete IHS Defined layout for Read Only User', async () => {
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });

    it('should show shared layout for Regular User', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.sharedValues);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout)
    });

    it('should not be option to modify or delete share layout for Regular User', async () => {
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.sharedValues.length);
        await customLayoutLogic.removeOneChecking();
        await expect(searchElements.manageLayout.shareCheckboxInput.get(0).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });

    it('should not be option to modify or delete IHS Defined layout for Regular User', async () => {
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });

    it('should show shared layout for KB Admin', async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.sharedValues);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout)
    });

    it('should not be option to modify or delete share layout for KB Admin', async () => {
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.sharedValues.length);
        await customLayoutLogic.removeOneChecking();
        await expect(searchElements.manageLayout.shareCheckboxInput.get(0).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });

    it('should not be option to modify or delete IHS Defined layout for KB Admin', async () => {
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });

    it('should show shared layout for User Admin', async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.sharedValues);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout)
    });

    it('should not be option to modify or delete share layout for User Admin', async () => {
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.sharedValues.length);
        await customLayoutLogic.removeOneChecking();
        await expect(searchElements.manageLayout.shareCheckboxInput.get(0).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeTruthy();
    });

    it('should not be option to modify or delete IHS Defined layout for User Admin', async () => {
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });

    it('should delete shared custom layout - Parts Search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.sharedValues.length);
        await customLayoutLogic.deleteLayout();
    });

    it('should not be option to modify or delete IHS Defined layout for Group Admin', async () => {
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });
});

describe('DE104692', () => {

    let firstCreatedLayout: string;

    afterEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.sharedValues.length, firstCreatedLayout);
        await customLayoutLogic.deleteLayout(firstCreatedLayout);
        await customLayoutLogic.openLayoutByName(commonSearch.manageLayout.sharedValues.length, customLayoutLogic.saveAsNewDefaultName);
        await customLayoutLogic.deleteLayout( customLayoutLogic.saveAsNewDefaultName);
    });

    it('DE104692', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await customLayoutLogic.saveAsNewCustomLayoutWithoutSetAName();
        firstCreatedLayout = customLayoutLogic.saveAsNewDefaultName;
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await customLayoutLogic.saveAsNewCustomLayoutWithoutSetAName();
        await expect(firstCreatedLayout).not.toEqual(customLayoutLogic.saveAsNewDefaultName);
    });


});