import {gridElements, sliderElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Button} from "../../../../components/simple/button";
import {Toolbar} from "../../../../components/toolbar";
import {Slider} from "../../../../components/slider";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const button: Button = new Button();
const toolbar: Toolbar = new Toolbar();

describe('Part Standardization, DE110722', ()=> {
    it('should button cancel close slider', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.grid);
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addBomsToPartStandardization));
        await Slider.closeSliderWithButtonName(buttonNames.cancel, gridElements.newGridRows.get(1));
        await expect(await sliderElements.sliderTitle.isPresent()).toBeFalsy();
    });
});