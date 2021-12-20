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

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const button: Button = new Button();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();

describe('Part Standardization, DE110641', ()=> {
    it('should check title and body after add bom to view from summary tab', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.gridWrapper);
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addBomsToPartStandardization));
        const viewName = await partStandardizationLogic.addNewViewFromSliderAndReturnName();
        await grid.newMechanismCheckboxRangeChecking(2, 3);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addBomsToPartStandardization));
        await grid.mechanismCheckCheckboxByNameInSlider('Name', viewName);
        await modal.openModalWithButtonByName(buttonNames.addBomsToSelectedViews);
        await expect(await partStandardization.modalTitle.getText()).toEqual('Confirmation');
        await expect(await modal.modalBody.getText()).toEqual('The BOM(s) selected will be added to the selected ' +
            'Part Standardization view(s). Please ensure that you reprocess the selected view(s) on the Part Standardization page.');

        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName(viewName);
    });
});