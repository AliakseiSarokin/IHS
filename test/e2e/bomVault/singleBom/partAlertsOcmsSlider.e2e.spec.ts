import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {ConsoleErrors} from "../../../../helper/consoleErrors";
import {gridElements, sliderElements} from "../../../../elements/elements";
import {Button} from "../../../../components/simple/button";
import {Grid} from "../../../../components/grid";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {OcmSliderLogic} from "../../../../bussinesLayer/bomVault/ocmSliderLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Slider} from "../../../../components/slider";

const button: Button = new Button();
const grid: Grid = new Grid();
const login: Login = new Login();
const link: Link = new Link();
const meganav: Meganav = new Meganav();
const ocmsSliderLogic: OcmSliderLogic = new OcmSliderLogic();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();

describe(' Part Alerts tab - OCMS Slider ', () => {

    it ( 'should be OCMS export button  - BOM Details' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await singleBomLogic.openSingleBomByName('AML_IPN_ON');
        await link.clickOnTheLinkByNameAndWaitForElement('Part Alerts', gridElements.grid);
        await expect(await button.returnButtonByText(buttonNames.ocms).isEnabled()).toBeFalsy();
        await grid.newMechanismCheckboxRangeChecking(1,2);
        await expect(await button.returnButtonByText(buttonNames.ocms).isEnabled()).toBeTruthy();
        await grid.newMechanismCheckboxRangeChecking(2,3);
        await expect(await button.returnButtonByText(buttonNames.ocms).isEnabled()).toBeFalsy();

    });

    it ( 'should open ocms slider' , async () => {
        await grid.newMechanismCheckboxRangeChecking(1,2);
        await ocmsSliderLogic.ocmsGetGridCellData();
        await Slider.openSliderByClickingOnTheButtonName(buttonNames.ocms);
    });

    it ( 'should not be console errors, DE349289' , async () => {
        await expect(await ConsoleErrors.getConsoleErrors()).toEqual([]);

    });

    it ( 'should close ocms slider' , async () => {
        await Slider.closeSliderWithButtonName(buttonNames.close, gridElements.severalGrid.get(0));
        await Slider.openSliderByClickingOnTheButtonName(buttonNames.ocms);
        await Slider.closeSlider(sliderElements.xButtonSlider, gridElements.severalGrid.get(0));
    });

    it ( 'should be field label and field inputs in  ocms slider' , async () => {
        await Slider.openSliderByClickingOnTheButtonName(buttonNames.ocms);
        await ocmsSliderLogic.fieldsChecking();
    });

    it ( 'should be default prepopulated values for Case Number Field, reset should work' , async () => {
        await ocmsSliderLogic.caseNumberChecking()
    });

    it ( 'should be default prepopulated values for Originator Field, reset should work' , async () => {
        await ocmsSliderLogic.originatorChecking()
    });

    it ( 'should be default prepopulated values for Priority Field, reset should work' , async () => {
        await ocmsSliderLogic.priorityChecking()
    });

    it ( 'should be default prepopulated values for Telephone Field, reset should work' , async () => {
        await ocmsSliderLogic.telephoneChecking()
    });

    it ( 'should be default prepopulated values for OEM Part Number Field, reset should work' , async () => {
        await ocmsSliderLogic.oemPartNumberCheckingPartAlerts()
    });

    it ( 'should be default prepopulated values for OEM Name Field, reset should work' , async () => {
        await ocmsSliderLogic.oemNameChecking()
    });


    it ( 'should be default prepopulated values for OEM Cage Field, reset should work' , async () => {
        await ocmsSliderLogic.oemCageChecking()
    });


    it ( 'should be default prepopulated values for Quantity Field, reset should work' , async () => {
        await ocmsSliderLogic.quantityChecking()
    });

    it ( 'should be default prepopulated values for Part Code Field, reset should work' , async () => {
        await ocmsSliderLogic.partCodeChecking()
    });


    it ( 'should be default prepopulated values for Part Type Field, reset should work' , async () => {
        await ocmsSliderLogic.partTypeChecking()
    });

    it ( 'should be default prepopulated values for Generic  Field, reset should work' , async () => {
        await ocmsSliderLogic.genericChecking()
    });

    it ( 'should be default prepopulated values for Vendor Part Number  Field, reset should work' , async () => {
        await ocmsSliderLogic.vendorPartNumberCheckingPartAlerts()
    });

    it ( 'should be default prepopulated values for Vendor Name  Field, reset should work' , async () => {
        await ocmsSliderLogic.vendorNameCheckingPartAlerts()
    });

    it ( 'should be default prepopulated values for Vendor Class  Field, reset should work' , async () => {
        await ocmsSliderLogic.vendorClassChecking();
    });

    it ( 'should be default prepopulated values for Vendor Package  Field, reset should work' , async () => {
        await ocmsSliderLogic.vendorpackageChecking();
    });

    it ( 'should be default prepopulated values for Problem Field, reset should work' , async () => {
        await ocmsSliderLogic.problemChecking();
    });

    it ( 'should be default prepopulated values for Ship Revision Field, reset should work' , async () => {
        await ocmsSliderLogic.shipRevisionChecking();
    });

    it ( 'should be default prepopulated values for Suggested Solution  Field, reset should work' , async () => {
        await ocmsSliderLogic.suggestedSolutionChecking();
    });

    it ( 'should be close modal when you enter values and try to close slider ' , async () => {
        await ocmsSliderLogic.checkingCloseModal();
    });

    it ( 'should close slider from close modal ' , async () => {
        await ocmsSliderLogic.closeModal();
    });

    it ( 'should be active export button ' , async () => {
        await Slider.openSliderByClickingOnTheButtonName(buttonNames.ocms);
        await ocmsSliderLogic.exportOcmsButton();
    });

    it ( 'should be notification modal when Case Number less than 8 chars  ' , async () => {
        await ocmsSliderLogic.notificationModal();
        await ocmsSliderLogic.closeModal();
    });

    xit ( 'should export OCMS file ' , async () => {
        await Slider.openSliderByClickingOnTheButtonName(buttonNames.ocms);
        await ocmsSliderLogic.exportOcmsButton();
        await ocmsSliderLogic.exportOcmsFile();
        await ocmsSliderLogic.closeModal();
    });
});