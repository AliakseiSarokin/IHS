import {Login} from "../../../components/login";
const login: Login = new Login();
import {Header} from "../../../components/header";
const header:Header = new Header();
import {headerItems, modalTitles, buttonNames, fieldStatuses, linksNames, meganavItems} from "../../../testData/global";
import {resReqData} from "../../../testData/researchRequests";
import {resReqElements, gridElements, dropdownElements} from "../../../elements/elements";
import {browser} from "protractor";
import {Modal} from "../../../components/modal";
const modal:Modal = new Modal();
import {Button} from "../../../components/simple/button";
const button: Button = new Button;
import {Dropdown} from "../../../components/dropdown";
import {InstructionPanel} from "../../../components/instructionPanel";
const instructionPanel: InstructionPanel = new InstructionPanel();
import {ResRequestLogic} from "../../../bussinesLayer/resRequest/resRequestLogic";
const resReqLogic: ResRequestLogic = new ResRequestLogic();
import {ElementAttributes} from "../../../utils/elementAttributes";
const elementAttributes: ElementAttributes = new ElementAttributes();
import {Meganav} from "../../../components/meganav";
const meganav:Meganav = new Meganav();
import {SingleBomLogic} from "../../../bussinesLayer/bomVault/singleBomLogic";
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
import {Toolbar} from "../../../components/toolbar";
const toolbar: Toolbar = new Toolbar();
import {Grid} from "../../../components/grid";
const grid: Grid = new Grid();
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
import {Actions} from "../../../utils/actions";
import {Link} from "../../../components/simple/link"

const link:Link = new Link();
const helpLogic: HelpLogic = new HelpLogic();
import {MatchMfrLogic} from "../../../bussinesLayer/bomVault/matchMfrLogic";
const matchMfrLogic: MatchMfrLogic = new MatchMfrLogic();
import {MatchPartsLogic} from "../../../bussinesLayer/bomVault/matchPartsLogic";
import {cplData} from "../../../testData/cpl";
const matchPartsLogic: MatchPartsLogic = new MatchPartsLogic();
describe('Research Requests modals from BOM details -Single Res Request Modal',  () => {

    it('should be active research request modal when one row is selected', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms, meganavItems.bomsSubItems.viewAllBoms,
            gridElements.checkboxSelector.get(1));
        // await link.clickOnTheLinkByName(linksNames.clearAllTags);
        await singleBomLogic.openSingleBomByName('Automation_BOM');
        await grid.checkCheckboxRange(1,2);
        await expect(button.returnButtonByText(buttonNames.resRequest).isEnabled()).toBeTruthy();
    });

    it('should open single resesarch request modal', async () => {
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Research requests');
    });

    it("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Submit research requests for specific parts');
    });


    it('should close single resesarch request modal', async () => {
        await modal.closeModalWithButton(buttonNames.cancelNotSubmit);
        await modal.openModalWithElement(toolbar.returnToolbarButtonByValue(buttonNames.resRequest));
        await modal.closeModalWithXButton();

    });

    it('should be fields in single res request modal', async () => {
        await modal.openModalWithElement(toolbar.returnToolbarButtonByValue(buttonNames.resRequest));
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

describe('Research Requests modals from BOM details - Multiple Res Request Modal',  () => {

    it('should be active research request modal when several rows are selected', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms, meganavItems.bomsSubItems.viewAllBoms,
            gridElements.checkboxSelector.get(1));
        // await link.clickOnTheLinkByName(linksNames.clearAllTags);
        await singleBomLogic.openSingleBomByName('Automation_BOM');
        await instructionPanel.hideIntructionPanel();
        await grid.newMechanismCheckboxRangeChecking(2,8);
        await expect(button.returnButtonByText(buttonNames.resRequest).isEnabled()).toBeTruthy();
    });

    it('should be inactive research request modal when more than 10 row is selected', async () => {
        await grid.goToTheNextPage();
        await await grid.newMechanismCheckboxRangeChecking(25,30);
        await expect(button.returnButtonByText(buttonNames.resRequest).isEnabled()).toBeFalsy();
    });

    it('should open multiple research request modal', async () => {
        await await grid.newMechanismCheckboxRangeChecking(29,30);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
    });

    it('should close multiple research request modal from Help menu', async () => {
        await modal.closeModalWithXButton();
        await Actions.mouseMoveToElementStatic(toolbar.returnToolbarButton(buttonNames.add));
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

    it('should be active research request button for 10 parts with 1 possible match, DE117189', async () => {
        await modal.closeModalIfPresent();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.gridWrapper);
        await matchMfrLogic.goToMatchMfr();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await button.clickOnTheElementAndWaitNotDisplayed(dropdownElements.dropdownValues.get(3), gridElements.firstRowLink);
        await grid.newMechanismCheckboxRangeChecking(0,10);
        await expect(button.returnButtonByText(buttonNames.resRequest).isEnabled()).toBeTruthy();
        await grid.newMechanismCheckboxRangeChecking(10,11);
        await expect(button.returnButtonByText(buttonNames.resRequest).isEnabled()).toBeFalsy();

    });
});

describe('Research Requests modals from Match Parts - Multiple Res Request Modal, Defect 301365',  () => {

    it('should be active research request button when several rows are selected with different matched types.', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms, meganavItems.bomsSubItems.viewAllBoms,
            gridElements.checkboxSelector.get(1));
        await matchPartsLogic.goToMatchParts();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[2]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[3]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[4]);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.resRequest).isEnabled()).toBeTruthy();
    });

    it('should verify multiple research request modal when user clicks on active research request button when several rows are selected with different matched types.', async () => {
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
    });

    it('should verify multiple research request creation when user clicks on active research request button when several rows are selected with different matched types.', async () => {
        await Dropdown.openDropdownByClickOnElement(dropdownElements.modalDropdownToggle);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(resReqData.modalDropdownValues[2]);
        await resReqLogic.fillRequireFields();
        await expect(button.returnButtonByText(buttonNames.submitResReq).isEnabled()).toBeTruthy();
    });
});