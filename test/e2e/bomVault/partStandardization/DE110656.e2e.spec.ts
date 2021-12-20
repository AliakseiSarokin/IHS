import {gridElements, partStandardization} from "../../../../elements/elements";
import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {Button} from "../../../../components/simple/button";
import {Modal} from "../../../../components/modal";
import {Toolbar} from "../../../../components/toolbar";
import {Slider} from "../../../../components/slider";
import {Input} from "../../../../components/simple/input";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const button: Button = new Button();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const input: Input = new Input();

describe('Part Standardization, DE110656', ()=> {

    it('should check title and body after add bom to view from summary tab', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.grid);
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addBomsToPartStandardization));
        const viewName = await partStandardizationLogic.addNewViewFromSliderAndReturnName();
        await grid.newMechanismCheckboxRangeChecking(2, 3);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addBomsToPartStandardization));
        await input.fillFieldWithValue(partStandardization.partNameField, viewName);
        await browser.sleep(1000); //button become enable after 0,8 second
        await expect(await button.returnButtonByText(buttonNames.createViewAndAddBoms).isEnabled()).toBeFalsy();
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await Slider.closeSliderWithButtonName(buttonNames.yes, gridElements.newGridRows.get(0));

        // await browser.navigate().refresh();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName(viewName);

    });
});