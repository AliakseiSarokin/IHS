import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {bomElements, bomVaultElements,dropdownElements} from "../../../../elements/elements";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {CustomLayoutLogic} from "../../../../bussinesLayer/bomVault/customLayoutLogic";
import {Dropdown} from "../../../../components/dropdown";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Toolbar} from "../../../../components/toolbar";
import {Shade} from "../../../../components/shade";

const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();
const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();


describe(' Custom Layout - BOM Tree Parts', () => {

    it ( 'should open manage custom laout modal - BOM Details' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(3));
        await bomTreePartsLogic.expandFolderBomTreeParts();
        await bomTreePartsLogic.openFirstBom();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton('Manage Layouts');
        await expect(await bomElements.customLayout.shadeTitle.getText()).toEqual('Manage Custom Layouts for BOM Details');
        await expect(await bomElements.customLayout.subtitle.getText())
            .toEqual('Modify, Create, or Delete a Custom BOM Details Layout.');
        await expect(await bomElements.customLayout.columnLabels.getText()).toEqual([ 'Available Attributes', 'Selected Attributes' ])
    });

    it ( 'should close shade by clicking on the cancel and return button - BOM Details' , async () => {
        await Shade.closeShadeWithButton(buttonNames.closeAndReturnToBomDetails);
    });

    it ( 'should be options in select dropdown - BOM Details' , async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton('Manage Layouts');
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(0));
        const expectedOptions = [ 'Create New Custom Layout', 'Default',
            'Environmental', 'Import', 'Lifecycle', 'COO_Layout', 'For Manage Users' ];
        await browser.waitForAngular();
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
        await expect(await bomElements.customLayout.defaultOptions.getText()).toEqual( ['Matched P/N'])
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
    });

    it ( 'should create a new custom lyaout - BOM Details' , async () => {
        await customLayoutLogic.selectCreateNewCustomLayout();
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

});
