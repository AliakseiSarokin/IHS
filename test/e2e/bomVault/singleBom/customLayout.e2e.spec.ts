import {Actions} from "../../../../utils/actions";
import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import { bomElements, dropdownElements, gridElements,} from "../../../../elements/elements";
import {CustomLayoutLogic} from "../../../../bussinesLayer/bomVault/customLayoutLogic";
import {Dropdown} from "../../../../components/dropdown";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Toolbar} from "../../../../components/toolbar";
import {Shade} from "../../../../components/shade";
import {commonSearch} from "../../../../testData/search";
import {ConsoleErrors} from "../../../../helper/consoleErrors";

const actions: Actions=new Actions();
const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();

describe(' Custom Layout - BOM Details  ', () => {


    it ( 'should open manage custom laout modal - BOM Details' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton('Manage Layouts');
        await expect(await bomElements.customLayout.shadeTitle.getText()).toEqual('Manage Custom Layouts for BOM Details');
        await expect(await bomElements.customLayout.subtitle.getText())
            .toEqual('Modify, Create, or Delete a Custom BOM Details Layout.');
        await expect(await bomElements.customLayout.columnLabels.getText()).toEqual([ 'Available Attributes', 'Selected Attributes' ])
    });

    it('should be info-icon tooltip, US274673', async () => {
        await actions.mouseMoveToElementAndWaitForTooltip(bomElements.customLayout.shadeInfoIcon, bomElements.customLayout.shadeInfoIconTooltip);
        await expect(await bomElements.customLayout.shadeInfoIconTooltip.getText()).toContain('When creating a');
    });

    it ( 'should close shade by clicking on the cancel and return button - BOM Details' , async () => {
        await Shade.closeShadeWithButton(buttonNames.closeAndReturnToBomDetails);
    });

    it ( 'should be options in select dropdown - BOM Details' , async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton('Manage Layouts');
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(0),dropdownElements.dropdownValues.get(0));
        const expectedOptions = [ 'Create New Custom Layout', 'Default',
            'Environmental', 'Import', 'Lifecycle', 'COO_Layout', 'For Manage Users' ];
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectedOptions);
        await Dropdown.closeDropdownByClickOnElement(dropdownElements.dropdownToggle.get(0));
    });

    it ( 'should select Create New Custom Layout and displayed buutons and fields - BOM Details' , async () => {
        await customLayoutLogic.selectCreateNewCustomLayout();
    });

    it ( 'should cancel create new custom template without leave modal - BOM Details' , async () => {
        await customLayoutLogic.cancelCreateNewCustomLayoutWithoutEdition();
    });

    it ( 'should be default attribute in Selected Attributes Panel' , async () => {
        await customLayoutLogic.selectCreateNewCustomLayout();
        await expect(await bomElements.customLayout.defaultOptions.getText()).toEqual( ['Matched P/N']);
    });

    it ( 'should add all - BOM Details' , async () => {
        await customLayoutLogic.addAllChecking(1);
    });

    it ( 'should remove all - BOM Details' , async () => {
        await customLayoutLogic.removeAllChecking(1);
    });

    it ( 'should show cancel modal when you click on the cancel button - BOM Details' , async () => {
        await customLayoutLogic.cancelCreateNewCustomLayoutModalNoXButton();
    });

    it ( 'should  cancel creating new custom layout - BOM Details' , async () => {
        await customLayoutLogic.cancelCreateNewCustomLayoutModalYesButton();
        await Shade.closeShadeWithButton(buttonNames.closeAndReturnToBomDetails);
    });

    it('should be default attribute in Selected Attributes Panel, DE373076', async () => {
        await browser.sleep(1000);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton('Manage Layouts');
        await customLayoutLogic.selectOptionFromDropdown('Environmental');
        await customLayoutLogic.selectCreateNewCustomLayout();
        await expect(await bomElements.customLayout.defaultOptions.getText()).toEqual(['Matched P/N']);
    });

    it('should be cosole errors on repeat steps above (DE373076), DE371032', async () => {
        await Shade.closeShadeWithButton(buttonNames.closeAndReturnToBomDetails);
        await browser.sleep(1000);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton('Manage Layouts');
        await customLayoutLogic.selectOptionFromDropdown('Environmental');
        await customLayoutLogic.selectCreateNewCustomLayout();
        await expect(await ConsoleErrors.getConsoleErrors()).toEqual([]);
    });

    it ( 'should create a new custom lyaout - BOM Details' , async () => {
        // await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAllChecking(1);
        await customLayoutLogic.saveNewCustomLayout();
    });

    it ( 'should open a new created custom lyaout - BOM Details' , async () => {
        await customLayoutLogic.openCreatedCustomLayout(1);
    });

    it ( 'should delete a new created custom lyaout - BOM Details' , async () => {
        await customLayoutLogic.deleteLayout();
    });

    it ( 'should save as new custom layout - BOM Details' , async () => {
        await customLayoutLogic.selectOptionFromDropdown('Default');
        await customLayoutLogic.saveAsNewCustomLayout();
        await customLayoutLogic.openCreatedCustomLayout(0)
    });

    it ( 'should delete saved as new custom layout - BOM Details' , async () => {
        await customLayoutLogic.deleteLayout();
    });

    it('should create new custom layout with  SVHC Over MCV column  - Single BOM', async() => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAttributeByName('SVHC Over MCV');
        await customLayoutLogic.saveNewCustomLayout();
        await expect(await gridElements.newGridUnlockedColumnHeaders.getText())
            .toContain('SVHC Over MCV');
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });
});
