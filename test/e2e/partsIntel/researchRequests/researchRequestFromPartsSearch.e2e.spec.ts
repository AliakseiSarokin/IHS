import {Login} from "../../../../components/login";
const login: Login = new Login();
import {Header} from "../../../../components/header";
const header:Header = new Header();
import {headerItems, modalTitles, buttonNames, fieldStatuses, linksNames, meganavItems} from "../../../../testData/global";
import {resReqData} from "../../../../testData/researchRequests";
import {resReqElements, gridElements, dropdownElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {Modal} from "../../../../components/modal";
const modal:Modal = new Modal();
import {Button} from "../../../../components/simple/button";
const button: Button = new Button;
import {Link} from "../../../../components/simple/link";
const link: Link = new Link();
import {Dropdown} from "../../../../components/dropdown";
import {InstructionPanel} from "../../../../components/instructionPanel";
const instructionPanel: InstructionPanel = new InstructionPanel();
import {ResRequestLogic} from "../../../../bussinesLayer/resRequest/resRequestLogic";
const resReqLogic: ResRequestLogic = new ResRequestLogic();
import {ElementAttributes} from "../../../../utils/elementAttributes";
const elementAttributes: ElementAttributes = new ElementAttributes();
import {QuickSearch} from "../../../../components/quickSearch";
const quickSearch:QuickSearch = new QuickSearch();
import {Toolbar} from "../../../../components/toolbar";
const toolbar: Toolbar = new Toolbar();
import {Grid} from "../../../../components/grid";
const grid: Grid = new Grid();
describe('Research Requests modals from Parts Search -Single Res Request Modal',  () => {

    it('should be active research request modal when one row is selected', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.performQuickSearch('lm311');
        await grid.newMechanismCheckboxRangeChecking(1,2);
        await expect(button.returnButtonByText(buttonNames.resRequest).isEnabled()).toBeTruthy();
    });

    it('should open single resesarch request modal', async () => {
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
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

describe('Research Requests modals from Parts Search - Multiple Res Request Modal',  () => {

    it('should be active research request modal when several rows are selected', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.performQuickSearch('lm311');
        await grid.newMechanismCheckboxRangeChecking(1,7);
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