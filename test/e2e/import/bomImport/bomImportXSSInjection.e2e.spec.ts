import {browser} from "protractor";
import {buttonNames, headerItems, leftNavItems, meganavItems} from "../../../../testData/global";
import {
    bomElements,
    cplImportElements,
    gridElements, headerElements,
    importElements,
    modalElements, settings
} from "../../../../elements/elements";
import {Waiters as w} from "../../../../helper/waiters";
import {Header} from "../../../../components/header";
import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";
import {Link} from "../../../../components/simple/link";
import {Button} from "../../../../components/simple/button";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Input} from "../../../../components/simple/input";
import {Grid} from "../../../../components/grid";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Random} from "../../../../utils/random";


const bomVaultLogic = new BomVaultLogic();
const link = new Link();
const button: Button = new Button();
const importLogic: ImportLogic = new ImportLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const input = new Input();
const grid: Grid = new Grid();
const singlebomlogic: SingleBomLogic = new SingleBomLogic();
const random: Random = new Random();

describe('BOM import, Import new BOM with xss injection text entered in BOM description, US277194', () => {

    it('BOM description field must be resistant for any XSS injection malicious text', async () => {
        let bomName: string = 'XSSInjectionTestBOM' + random.randomTextGenerator(3);
        let xssInjection: string = "This is a <img src=x onerror=alert(3) /> test";

        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setExactBomName(bomName);
        await input.fillFieldWithValue(importElements.descriptionField, xssInjection);
        await importLogic.importBom();
        await button.clickByButtonName(buttonNames.viewBom);
        await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(0));
        await singlebomlogic.openSingleBomByName(bomName);
        await w.waitUntilTextToBePresent(cplImportElements.validationErrorTitle, 'BOM Details')
        await link.clickOnTheLinkByNameAndWaitForElement('Attributes', await button.returnButtonByText(buttonNames.editAttributes));
        await expect(await bomElements.attributes.desc.getText()).toEqual('This is a test');
        await grid.changeGridWithLeftNavOptionByName(leftNavItems.bomOptions.viewAllBoms, gridElements.selectAllCheckbox);
        await bomVaultLogic.deleteExactBom(bomName);

    });

    it('BOM Import Configuration description field must be resistant for any XSS injection malicious text', async () => {
        let configName: string = 'XSSInjectionTestImportConfig' + random.randomTextGenerator(3);
        let xssInjection: string = "This is a <img src=x onerror=alert(3) /> test";

        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await button.clickByButtonNameAndWait('Save as New', importElements.savedConfName);
        await input.fillFieldWithValue(importElements.savedConfName, configName);
        await input.fillFieldWithValue(importElements.savedConfDesc, xssInjection);
        await button.clickByButtonName(buttonNames.save);
        await w.waitUntilWorkingModalNotDisplayed();
        await meganav.goToFeatureWithMeganav(meganavItems.home, modalElements.modalTitle);
        await modal.closeModalWithButton(buttonNames.leaveAndDiscardUnsavedChanges);
        await w.waitUntilWorkingModalNotDisplayed();
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await importLogic.verifyAndDeleteSavedImportConfig(configName);
    });
});

