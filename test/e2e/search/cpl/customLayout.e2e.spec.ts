import {Actions} from "../../../../utils/actions";
import {browser} from "protractor";
import {commonSearch} from "../../../../testData/search";
import {CplSearchLogic} from "../../../../bussinesLayer/search/cplSearchLogic";
import {Login} from "../../../../components/login";
import {buttonNames, fieldStatuses, meganavItems} from "../../../../testData/global";
import {Meganav} from "../../../../components/meganav";
import {
    bomElements, dropdownElements, gridElements, searchElements,
    shadeElements
} from "../../../../elements/elements";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {Shade} from "../../../../components/shade";
import {Button} from "../../../../components/simple/button";
import {CustomLayoutLogic} from "../../../../bussinesLayer/bomVault/customLayoutLogic";
import {Toolbar} from "../../../../components/toolbar";
import {Dropdown} from "../../../../components/dropdown";
import {SearchCustomLayoutLogic} from "../../../../bussinesLayer/search/searchCustomLayoutLogic";
import {PartsSearchLogic} from "../../../../bussinesLayer/search/partsSearchLogic";
import {Grid} from "../../../../components/grid";
import {CheckBox} from "../../../../components/simple/checkBox";

const actions: Actions=new Actions();
const button: Button = new Button();
const checkbox: CheckBox = new CheckBox();
const cplSearchLogic:CplSearchLogic = new CplSearchLogic();
const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav:Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const searchCustomLayoutLogic: SearchCustomLayoutLogic = new SearchCustomLayoutLogic();
const searchLogic: SearchLogic = new SearchLogic();
const toolbar: Toolbar = new Toolbar();

describe('Manage Custom Layout - CPL', () => {

    it('should open Custom Layout Shade', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewCpl, gridElements.checkboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
    });

    it('should be info-icon tooltip, US274673', async () => {
        await actions.mouseMoveToElementAndWaitForTooltip(bomElements.customLayout.shadeInfoIcon, bomElements.customLayout.shadeInfoIconTooltip);
        await expect(await bomElements.customLayout.shadeInfoIconTooltip.getText()).toContain('Locked Attributes are displayed as bold text.');
    });

   it('should be subtitle and locked column text - Search, cpl, custom layout', async () => {
        await expect(await searchElements.manageLayout.subtitle.getText())
            .toEqual('Modify, Create, or Delete a Custom CPL Search Results Layout.');
        const expectedText = 'Locked Attributes are displayed as bold text. Locked attributes are shown on the left side of the results grid without horizontal scroll bars. When creating a custom layout, the Corp P/N is locked by default and cannot be removed.\n' +
            'You can add additional columns to be locked if required. To make an attribute locked, select it in the Selected Attributes and select the Locked button. You can use the Up and Down graphics to rearrange the order. Please refer to Help panel for more info.';
        await actions.mouseMoveToElementAndWaitForTooltip(bomElements.customLayout.shadeInfoIcon, bomElements.customLayout.shadeInfoIconTooltip);
        await expect(await bomElements.customLayout.shadeInfoIconTooltip.getText()).toEqual(expectedText);

    });


    it('should be attributes panels - Search, cpl, custom layout', async () => {
        await expect(await bomElements.customLayout.columnLabels.getText())
            .toEqual(['Available Attributes', 'Selected Attributes'])
    });


    it('should close shade by clicking on the cancel and return button - Search, cpl, custom layout', async () => {
        await Shade.closeShadeWithButton(buttonNames.closeAndReturnToSearchResults);
    });

    it('should be options in select dropdown - Search, cpl, custom layout', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await Dropdown.openDropdownByClickOnElement(shadeElements.dropdownToggle,dropdownElements.dropdownValues.last());
        const expectedOptions = ['Create New Custom Layout', 'Default'];
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectedOptions);
        await Dropdown.closeDropdownByClickOnElement(shadeElements.dropdownToggle);
    });

    it('should select Create New Custom Layout and displayed buutons and fields - Search, cpl, custom layout', async () => {
        await customLayoutLogic.selectCreateNewCustomLayout();
    });

    it('should cancel create new custom template without leave modal - Search, cpl, custom layout', async () => {
        await customLayoutLogic.cancelCreateNewCustomLayoutWithoutEdition();
    });

    it('should be default attribute in Selected Attributes Panel - Search, cpl, custom layout', async () => {
        await customLayoutLogic.selectCreateNewCustomLayout();
        await expect(await bomElements.customLayout.defaultOptions.getText())
            .toEqual(['Corp P/N'])
    });

    it('should add all - Search, cpl, custom layout', async () => {
        await customLayoutLogic.addAllChecking(1);
    });

    it('should be enabled/disabled moveUp button and move up attributes - Search, cpl, custom layout', async () => {
        await searchCustomLayoutLogic.moveUpChecking();
    });

    it('should be enabled/disabled moveDown button and move down attributes - Search, cpl, custom layout', async () => {
        await searchCustomLayoutLogic.moveDownChecking();
    });

    it('should remove all - Search, cpl, custom layout', async () => {
        await customLayoutLogic.removeAllChecking(1);
    });

    it('should show cancel modal when you click on the cancel button - Search, cpl, custom layout', async () => {
        await customLayoutLogic.cancelCreateNewCustomLayoutModalNoXButton();
    });

    it('should  cancel creating new custom layout - Search, cpl, custom layout', async () => {
        await customLayoutLogic.cancelCreateNewCustomLayoutModalYesButton();
    });

    it('should create a new custom layout - Search, cpl, custom layout', async () => {
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAllChecking(1);
        await searchCustomLayoutLogic.setAndRememberLockedColumn();
        await customLayoutLogic.saveNewCustomLayout();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.defaultCPLValues)
    });

    it('should display locked in the grid - Search, cpl, custom layout', async () => {
        await grid.newGridCheckingLockedColumnHeaders( searchCustomLayoutLogic.lockedAttributes)
    });

    it('should not show private layout for Restricted User - Search, cpl, custom layout', async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewCpl, gridElements.checkboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.defineValue);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeFalsy();
    });

    it('should not show private layout Read Only User - Search, cpl, custom layout', async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewCpl, gridElements.checkboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.defineValue);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeFalsy();
    });

    it('should not show private layout for Regular User - Search, cpl, custom layout', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewCpl, gridElements.checkboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.defineValue);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeFalsy();
    });

    it('should not show private layout for KB Admin - Search, cpl, custom layout', async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewCpl, gridElements.checkboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.defineValue);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeFalsy();
    });

    it('should not show private layout for User Admin - Search, cpl, custom layout', async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewCpl, gridElements.checkboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.defineValue);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeFalsy();
    });


    it('should open a new created custom lyaout - Search, cpl, custom layout', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewCpl, gridElements.checkboxSelector.get(1));
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultCPLValues.length);
    });

    it('should delete a new created custom lyaout - Search, cpl, custom layout', async () => {
        await customLayoutLogic.deleteLayout();
    });

    it('should save as new custom layout - Search, cpl, custom layout', async () => {
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await customLayoutLogic.saveAsNewCustomLayout();
    });

    it('should delete saved as new custom layout - Search, cpl, custom layout', async () => {
        await customLayoutLogic.openCreatedCustomLayout(0);
        await customLayoutLogic.deleteLayout();
        await Shade.closeShadeWithButton(buttonNames.closeAndReturnToSearchResults);
    });

    it('should create shared layout - Search, cpl, custom layout', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewCpl, gridElements.checkboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAllChecking(1);
        await checkbox.checkUnCheckCheckboxes(searchElements.manageLayout.shareCheckboxLabel, searchElements.manageLayout.shareCheckboxInput,
            fieldStatuses.fillField);
        await searchCustomLayoutLogic.setAndRememberLockedColumn();
        await customLayoutLogic.saveNewCustomLayout();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.sharedCPLValues)
    });

    it('should show shared layout for Restricted User - Search, cpl, custom layout', async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewCpl, gridElements.checkboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.sharedCPLValues);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout)
    });

    it('should not be option to modify or delete share layout for Restricted User - Search, cpl, custom layout', async () => {
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.sharedCPLValues.length);
        await customLayoutLogic.removeOneChecking();
        await expect(searchElements.manageLayout.shareCheckboxInput.get(0).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });

    it('should not be option to modify or delete IHS Defined layout for Restricted User - Search, cpl, custom layout', async () => {
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });


    it('should show shared layout for Read Only User - Search, cpl, custom layout', async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewCpl, gridElements.checkboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.sharedCPLValues);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout)
    });

    it('should not be option to modify or delete share layout for Read Only User - Search, cpl, custom layout', async () => {
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.sharedCPLValues.length);
        await customLayoutLogic.removeOneChecking();
        await expect(searchElements.manageLayout.shareCheckboxInput.get(0).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });


    it('should not be option to modify or delete IHS Defined layout for Read Only User - Search, cpl, custom layout', async () => {
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });

    it('should show shared layout for Regular User - Search, cpl, custom layout', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewCpl, gridElements.checkboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.sharedCPLValues);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout)
    });

    it('should not be option to modify or delete share layout for Regular User - Search, cpl, custom layout', async () => {
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.sharedCPLValues.length);
        await customLayoutLogic.removeOneChecking();
        await expect(searchElements.manageLayout.shareCheckboxInput.get(0).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });

    it('should not be option to modify or delete IHS Defined layout for Regular User - Search, cpl, custom layout', async () => {
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });

    it('should show shared layout for KB Admin - Search, cpl, custom layout', async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewCpl, gridElements.checkboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.sharedCPLValues);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout)
    });

    it('should not be option to modify or delete share layout for KB Admin - Search, cpl, custom layout', async () => {
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.sharedCPLValues.length);
        await customLayoutLogic.removeOneChecking();
        await expect(searchElements.manageLayout.shareCheckboxInput.get(0).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });

    it('should not be option to modify or delete IHS Defined layout for KB Admin - Search, cpl, custom layout', async () => {
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });

    it('should show shared layout for User Admin - Search, cpl, custom layout', async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewCpl, gridElements.checkboxSelector.get(1));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await expect(await searchElements.manageLayout.groupTitle.getText()).toEqual(commonSearch.manageLayout.sharedCPLValues);
        await expect(await searchElements.manageLayout
            .dropdownOptionsByName(commonSearch.manageLayout.newCustomLayoutName).isPresent()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout)
    });

    it('should not be option to modify or delete share layout for User Admin - Search, cpl, custom layout', async () => {
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.sharedCPLValues.length);
        await customLayoutLogic.removeOneChecking();
        await expect(searchElements.manageLayout.shareCheckboxInput.get(0).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeTruthy();
    });

    it('should not be option to modify or delete IHS Defined layout for User Admin - Search, cpl, custom layout', async () => {
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });

    it('should delete shared custom layout - Search, cpl, custom layout', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewCpl, gridElements.checkboxSelector.get(1));
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.sharedCPLValues.length);
        await customLayoutLogic.deleteLayout();
    });

    it('should not be option to modify or delete IHS Defined layout for Group Admin - Search, cpl, custom layout', async () => {
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.saveChanges).isEnabled()).toBeFalsy();
    });
});