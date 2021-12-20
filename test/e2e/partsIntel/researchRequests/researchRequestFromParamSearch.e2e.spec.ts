import {headerItems, modalTitles, buttonNames, fieldStatuses, linksNames, meganavItems} from "../../../../testData/global";
import {resReqData} from "../../../../testData/researchRequests";
import {resReqElements, gridElements, dropdownElements, searchElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {Button} from "../../../../components/simple/button";
import {Dropdown} from "../../../../components/dropdown";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {Grid} from "../../../../components/grid";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {ParametricSearchLogic} from "../../../../bussinesLayer/search/parametricSearchLogic";
import {ResRequestLogic} from "../../../../bussinesLayer/resRequest/resRequestLogic";
import {Toolbar} from "../../../../components/toolbar";
const button: Button = new Button;
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal:Modal = new Modal();
const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();
const resReqLogic: ResRequestLogic = new ResRequestLogic();
const toolbar: Toolbar = new Toolbar();
describe('Research Requests modals from Pararamtric Search -Single Res Request Modal',  () => {

    it('should be active research request modal when one row is selected', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.resRequest).isEnabled()).toBeTruthy();
    });

    it('should open single research request modal', async () => {
        const partNumberValues:string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Part Number');
        const mfrNameValues:string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Mfr Name');
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
        await expect(await resReqElements.mfrPartNumberField.getAttribute('value'))
            .toEqual(partNumberValues[0]);
        await expect(await resReqElements.mfrNameField.getAttribute('value'))
            .toEqual(mfrNameValues[0]);
    });


    it('should close single resesarch request modal from Help menu', async () => {
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await modal.closeModalWithButton(buttonNames.cancelNotSubmit);
    });

    it('should be fields in single res request modal', async () => {
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(resReqElements.fieldTitlesList.getText()).toEqual(resReqData.singleResReqFieldLabels);
    });

    it('should be request type dropdwon in single res request modal', async () => {
        await Dropdown.openDropdownByClickOnElement(dropdownElements.modalDropdownToggle);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(resReqData.modalDropdownValues);
        await Dropdown.closeDropdownByClickOnElement(dropdownElements.modalDropdownToggle);
    });

    it('should be option to upload a file ', async () => {
        await resReqLogic.uploadAFileInResReqModal();
        await expect((await elementAttributes.getElementAttribute(resReqElements.fileUploadInput, 'value')).length)
            .toBeGreaterThan(0)
    });

    it('should be buttons in single res request modal', async () => {
        await expect(button.returnButtonByText(buttonNames.submitResReq).isDisplayed())
            .toBeTruthy(buttonNames.submitResReq + 'is not displayed');
        await expect(link.returnElementByLinkName(linksNames.resetClearAllFields).isDisplayed())
            .toBeTruthy(linksNames.resetClearAllFields + 'is not displayed');
    });

    it('should be option to create single res request', async () => {
        await resReqLogic.fillRequireFields();
        await expect(button.returnButtonByText(buttonNames.submitResReq).isEnabled())
            .toBeTruthy(buttonNames.submitResReq + 'is not active');
    });

    it('should clear first step fields with clear all', async () => {
        await resReqLogic.resetClearAllChecking();
        await expect(button.returnButtonByText(buttonNames.submitResReq).isEnabled())
            .toBeFalsy(buttonNames.submitResReq + 'is active');
    });
});

describe('Research Requests modals from Paramtric Search - Multiple Res Request Modal',  () => {

    it('should be active research request modal when several rows are selected', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        await grid.newMechanismCheckboxRangeChecking(0,7);
        await expect(button.returnButtonByText(buttonNames.resRequest).isEnabled()).toBeTruthy();
    });

    it('should be inactive research request modal when more than 10 row is selected', async () => {
        await grid.goToTheNextPage();
        await await grid.newMechanismCheckboxRangeChecking(25,31);
        await expect(button.returnButtonByText(buttonNames.resRequest).isEnabled()).toBeFalsy();
    });

    it('should open multiple research request modal', async () => {
        await await grid.newMechanismCheckboxRangeChecking(26,31);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
    });

    it('should close multiple resesarch request modal from Help menu', async () => {
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await modal.closeModalWithButton(buttonNames.cancelNotSubmit);
    });

    it('should be fields in multiple res request modal', async () => {
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(resReqElements.fieldTitlesList.getText()).toEqual(resReqData.multiResReqFieldLabels);
    });

    it('should be request type dropdwon in multi res request modal', async () => {
        await Dropdown.openDropdownByClickOnElement(dropdownElements.modalDropdownToggle);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(resReqData.modalDropdownValues);
        await Dropdown.closeDropdownByClickOnElement(dropdownElements.modalDropdownToggle);
    });

    it('should be buttons in multi res request modal', async () => {
        await expect(button.returnButtonByText(buttonNames.submitResReq).isDisplayed())
            .toBeTruthy(buttonNames.submitResReq + 'is not displayed');
        await expect(link.returnElementByLinkName(linksNames.resetClearAllFields).isDisplayed())
            .toBeTruthy(linksNames.resetClearAllFields + 'is not displayed');
    });

    it('should be option to create multi res request', async () => {
        await resReqLogic.fillRequireFields();
        await expect(button.returnButtonByText(buttonNames.submitResReq).isEnabled())
            .toBeTruthy(buttonNames.submitResReq + 'is not active');
    });

    it('should clear first step fields with clear all', async () => {
        await resReqLogic.resetClearAllChecking();
        await expect(button.returnButtonByText(buttonNames.submitResReq).isEnabled())
            .toBeFalsy(buttonNames.submitResReq + 'is active');
    });
});