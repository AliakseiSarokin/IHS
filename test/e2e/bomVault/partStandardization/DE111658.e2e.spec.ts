import {Button} from "../../../../components/simple/button";
import {sliderElements, gridElements, partStandardization,
} from "../../../../elements/elements";
import {browser, element, by} from "protractor";
import {
    buttonNames,
    meganavItems,
} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Toolbar} from "../../../../components/toolbar";
import {Slider} from "../../../../components/slider";
import {Input} from "../../../../components/simple/input";

const button: Button = new Button;
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const input: Input = new Input();

describe(`Past Standardization, DE111658`, () => {
   it(`should not be possibility create View with special characters`, async () =>{
       await login.loginWithDirectLink(browser.params.groupAdminUrl);
       await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
           meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(3));
       await grid.newMechanismCheckboxRangeChecking(0, 1);
       await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
       await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addBomsToPartStandardization));
       await input.fillFieldWithValue(partStandardization.partNameField, '!,@,#,$,%,^,^,&,(,),+,=,');
       await expect(await partStandardization.partNameField.getAttribute('value')).toEqual('');
       await expect(await button.returnButtonByText(buttonNames.createViewAndAddBoms).isEnabled()).toBeFalsy();
   });

   it(`should not be possibility add special characters in field Name`, async()=> {
       await input.fillFieldWithValue(partStandardization.partNameField, 'aaaaa!,@,#,$,%,^,^,&,(,),+,=,');
       await expect(await partStandardization.partNameField.getAttribute('value')).toEqual('aaaaa');
       await Slider.closeSlider(sliderElements.closeSliderTab, partStandardization.checkboxSelectorOnAddBomsShade.get(0));
   })
});