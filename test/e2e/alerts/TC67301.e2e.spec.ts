import {alertsData} from "../../../testData/alerts";
import {Button} from "../../../components/simple/button";
import {buttonNames, meganavItems, modalTitles} from "../../../testData/global";
import {browser} from "protractor";
import {Dropdown} from "../../../components/dropdown";
import {gridElements} from "../../../elements/elements";
import {Login} from "../../../components/login";
import {Meganav} from "../../../components/meganav";
import {Modal} from "../../../components/modal";
import {StringArray} from "../../../utils/stringArray";
import {Toolbar} from "../../../components/toolbar";
import {BomTreeFilterLogic} from "../../../bussinesLayer/bomVault/bomTreeFilterLogic";

const button: Button = new Button();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const stringArray: StringArray = new StringArray();
const toolbar: Toolbar = new Toolbar();
const bomTreeFilterLogic: BomTreeFilterLogic = new BomTreeFilterLogic();

describe('TC67301 - Add Export Alert Details button to View Alerts by BOM Toolbar', () => {

    it('should be disabled Export Alert Details button by default', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.alertsByBom[0], gridElements.grid);
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.exportAlertDetails).isEnabled()).toBeFalsy();
    });

    it('should be enabled Export Alert Details button for Today, 7 and 30 days filters', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await Dropdown.selectValueInDropdownByValueName(alertsData.alertsByBomFilterDropdownValues[1]);
        // await expect(await toolbar.returnToolbarButtonByValue(buttonNames.exportAlertDetails).isEnabled())
        //     .toBeTruthy('Today');
        // scipped because lack of test data
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await Dropdown.selectValueInDropdownByValueName(alertsData.alertsByBomFilterDropdownValues[2]);
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.exportAlertDetails).isEnabled())
            .toBeTruthy('7 days');
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await Dropdown.selectValueInDropdownByValueName(alertsData.alertsByBomFilterDropdownValues[3]);
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.exportAlertDetails).isEnabled())
            .toBeTruthy('30 days');
    });

    it('should be disabled Export Alert Details button for 6 month and Last year', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await Dropdown.selectValueInDropdownByValueName(alertsData.alertsByBomFilterDropdownValues[4]);
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.exportAlertDetails).isEnabled())
            .toBeFalsy('6 month');
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await Dropdown.selectValueInDropdownByValueName(alertsData.alertsByBomFilterDropdownValues[5]);
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.exportAlertDetails).isEnabled())
            .toBeFalsy('Last year');
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await Dropdown.selectValueInDropdownByValueName('View All My BOMs Alerts');
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.exportAlertDetails).isEnabled())
            .toBeFalsy('All My Alerts');
        await bomTreeFilterLogic.checkOwnerInColumn();
    });

    it('should open Export Alert Details modal and be modal attributes', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await Dropdown.selectValueInDropdownByValueName(alertsData.alertsByBomFilterDropdownValues[2]);
        await modal.openModalWithButtonByName(buttonNames.exportAlertDetails);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.exportAlertDetails);
        const modalText: string = 'The Alert Details will be sent to the reporting system for generating ' +
            'so that you can continue using the application. Please check the "View Reports" page to' +
            ' download your report when it is ready.';
        await expect(stringArray.returnStringWithoutBr(await modal.modalBody.getText())).toEqual(modalText);
        await expect(await button.returnButtonByText(buttonNames.export).isEnabled()).toBeTruthy();
    });

    it('should close Export Alert Details modal', async () => {
        await modal.closeModalWithButton(buttonNames.cancel);
        await modal.openModalWithButtonByName(buttonNames.exportAlertDetails);
        await modal.closeModalWithXButton();
    });
});
