import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {Button} from "../../../../components/simple/button";
import {bomVaultElements, gridElements, sliderElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {buttonNames, commonData, meganavItems} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Navigation} from "../../../../utils/navigation";
import {OcmSliderLogic} from "../../../../bussinesLayer/bomVault/ocmSliderLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Slider} from "../../../../components/slider";

const button: Button = new Button();
const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const ocmsSliderLogic: OcmSliderLogic = new OcmSliderLogic();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();

describe(' BOM Tree Parts - OCMS Slider ', () => {

    it('should be OCMS export button  - BOM Tree Parts', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreeRows.get(0));
        await bomTreePartsLogic.expandFolderBomTreePartsByName('AUTOMATION_FOLDER_DO_NOT_DELETE');
        await singleBomLogic.openSingleBomByName(commonData.bomNameWithIcons);
        await expect(await button.returnButtonByText(buttonNames.ocms).isEnabled()).toBeFalsy();
        await grid.newMechanismCheckboxRangeChecking(0, 2);
        await expect(await button.returnButtonByText(buttonNames.ocms).isEnabled()).toBeFalsy();
        await grid.newMechanismCheckboxRangeChecking(1, 2);
        await expect(await button.returnButtonByText(buttonNames.ocms).isEnabled()).toBeTruthy();
    });

    it('should open ocms slider', async () => {
        await ocmsSliderLogic.ocmsGetGridCellDataBomTreeParts();
        await Slider.openSliderByClickingOnTheButtonName(buttonNames.ocms);
    });

    it('should close ocms slider', async () => {
        await Slider.closeSlider(sliderElements.xButtonSlider, gridElements.severalGrid.get(0));
    });

    it('should be field label and field inputs in  ocms slider', async () => {
        await Slider.openSliderByClickingOnTheButtonName(buttonNames.ocms);
        await ocmsSliderLogic.fieldsChecking();
    });

    it('should be default prepopulated values for Case Number Field, reset should work', async () => {
        await ocmsSliderLogic.caseNumberChecking()
    });

    it('should be default prepopulated values for Originator Field, reset should work', async () => {
        await ocmsSliderLogic.originatorChecking()
    });

    it('should be default prepopulated values for Priority Field, reset should work', async () => {
        await ocmsSliderLogic.priorityChecking()
    });

    it('should be default pre populated values for Telephone Field, reset should work', async () => {
        await ocmsSliderLogic.telephoneChecking()
    });

    it('should be default pre populated values for OEM Part Number Field, reset should work', async () => {
        await ocmsSliderLogic.oemPartNumberChecking()
    });

    it('should be default pre populated values for OEM Name Field, reset should work', async () => {
        await ocmsSliderLogic.oemNameChecking()
    });

    it('should be default pre populated values for OEM Cage Field, reset should work', async () => {
        await ocmsSliderLogic.oemCageChecking()
    });

    it('should be default pre populated values for Quantity Field, reset should work', async () => {
        await ocmsSliderLogic.quantityChecking()
    });

    it('should be default pre populated values for Part Code Field, reset should work', async () => {
        await ocmsSliderLogic.partCodeChecking()
    });

    it('should be default pre populated values for Part Type Field, reset should work', async () => {
        await ocmsSliderLogic.partTypeChecking()
    });

    it('should be default pre populated values for Generic Field, reset should work', async () => {
        await ocmsSliderLogic.genericChecking()
    });

    it('should be default pre populated values for Vendor Part Number Field, reset should work', async () => {
        await ocmsSliderLogic.vendorPartNumberChecking()
    });

    it('should be default pre populated values for Vendor Name Field, reset should work', async () => {
        await ocmsSliderLogic.vendorNameChecking()
    });

    it('should be default pre populated values for Vendor Class Field, reset should work', async () => {
        await ocmsSliderLogic.vendorClassChecking();
    });

    it('should be default pre populated values for Vendor Package Field, reset should work', async () => {
        await ocmsSliderLogic.vendorpackageChecking();
    });

    it('should be default pre populated values for Problem Field, reset should work', async () => {
        await ocmsSliderLogic.problemChecking();
    });

    it('should be default pre populated values for Ship Revision Field, reset should work', async () => {
        await ocmsSliderLogic.shipRevisionChecking();
    });

    it('should be default pre populated values for Suggested Solution Field, reset should work', async () => {
        await ocmsSliderLogic.suggestedSolutionChecking();
    });

    it('should be close modal when you enter values and try to close slider', async () => {
        await ocmsSliderLogic.checkingCloseModal();
    });

    it('should close slider from close modal', async () => {
        await ocmsSliderLogic.closeModal();
        await Navigation.refreshPage(bomVaultElements.bomTreeParts.bomTreeRows.get(0));
        await bomTreePartsLogic.expandFolderBomTreeParts();
        await singleBomLogic.openSingleBomByName(commonData.bomNameWithIcons);
    });

    it('should be active export button', async () => {
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await Slider.openSliderByClickingOnTheButtonName(buttonNames.ocms);
        await ocmsSliderLogic.exportOcmsButton();
    });

    it('should be notification modal when Case Number less than 8 chars', async () => {
        await ocmsSliderLogic.notificationModal();
        await ocmsSliderLogic.closeModal();
    });

    xit('should export OCMS file', async () => {
        await ocmsSliderLogic.exportOcmsFile();
        await ocmsSliderLogic.closeModal();
    });
});
