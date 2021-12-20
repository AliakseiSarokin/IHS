import {Login} from "../../../components/login";
const login: Login = new Login();
import {Header} from "../../../components/header";
import {headerItems, modalTitles, buttonNames, fieldStatuses, linksNames} from "../../../testData/global";
import {resReqData} from "../../../testData/researchRequests";
import {dropdownElements, headerElements, resReqElements} from "../../../elements/elements";
import {browser} from "protractor";
import {Modal} from "../../../components/modal";
const modal:Modal = new Modal();
import {Button} from "../../../components/simple/button";
const button: Button = new Button;
import {Link} from "../../../components/simple/link";
const link: Link = new Link();
import {Dropdown} from "../../../components/dropdown";
import {ResRequestLogic} from "../../../bussinesLayer/resRequest/resRequestLogic";
const resReqLogic: ResRequestLogic = new ResRequestLogic();
import {ElementAttributes} from "../../../utils/elementAttributes";
const elementAttributes: ElementAttributes = new ElementAttributes();
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
import {Input} from "../../../components/simple/input";
const input: Input = new Input();
const helpLogic: HelpLogic = new HelpLogic();
import {Random} from "../../../utils/random";
const random:Random = new Random();

describe('Create Research Request', () => {

    it('should open create resesarch request modal from Help menu', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.helpIcon, headerItems.createResReq);
        await modal.openModalWithLinkName(headerItems.createResReq);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Research requests');
    });

    it("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Submit research requests for specific parts');
    });

    it('should close create resesarch request modal from Help menu', async () => {
        await modal.closeModalWithXButton();
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.helpIcon, headerItems.createResReq);
        await modal.openModalWithLinkName(headerItems.createResReq);
        await modal.closeModalWithButton(buttonNames.cancelNotSubmit);
    });

    it('should be fields in single res request modal', async () => {
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.helpIcon, headerItems.createResReq);
        await modal.openModalWithLinkName(headerItems.createResReq);
        await expect(resReqElements.fieldTitlesList.getText()).toEqual(resReqData.singleResReqFieldLabels);
    });

    it('should be request type dropdwon in multiple res request modal', async () => {
        await Dropdown.openDropdownByClickOnElement(dropdownElements.modalDropdownToggle);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(resReqData.modalDropdownValues);
        await Dropdown.closeDropdownByClickOnElement(dropdownElements.modalDropdownToggle);
    });

    it('should be option to upload a file ', async () => {
        await resReqLogic.uploadAFileInResReqModal();
        await expect(await elementAttributes.getElementAttribute(resReqElements.firstStepInputs.last(), 'class')).
            not.toContain(fieldStatuses.dirtyField)
    });

    it('should be buttons in multiple res request modal', async () => {
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

    it('should fill in and clear single input field after applying "Reset(clear all)", DE111523', async () => {
        await input.fillFieldWithValue(resReqElements.mfrPartNumberField, random.randomTextGenerator(10))
        await link.clickOnTheLinkByName(linksNames.resetClearAllFields);
        await expect(await elementAttributes.getElementAttribute(resReqElements.mfrPartNumberField, 'value'))
            .toEqual('');
        await modal.closeModalWithXButton();
    });
});