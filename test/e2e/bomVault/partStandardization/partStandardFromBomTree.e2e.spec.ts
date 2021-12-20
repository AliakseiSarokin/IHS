import {Button} from "../../../../components/simple/button";
import {
    bomElements, dropdownElements, gridElements, importElements, pageTitles, partStandardization, sliderElements
} from "../../../../elements/elements";
import {browser, element, by} from "protractor";
import {buttonNames, columnHeaders, leftNavItems, linksNames, meganavItems, titles} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Toolbar} from "../../../../components/toolbar";
import {Input} from "../../../../components/simple/input";
import {Random} from "../../../../utils/random";
import {PartStandardizationLogic} from "../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {Slider} from "../../../../components/slider";
import {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic";


const button: Button = new Button;
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const input: Input = new Input();
const random: Random = new Random();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const bomTreeName: string ='PartFromBomTree'+ random.randomTextGenerator(5);
const bomTreeNameSecond: string ='PartFromBomTree'+ random.randomTextGenerator(5);
describe('Bom Tree Part standardization ', ()=> {
    it('should button Add be disabled', async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.gridWrapper);
        await bomTreeLogic.checkNewGridCheckBox(1);
        await expect(await toolbar.returnToolbarButton(buttonNames.add).isEnabled()).toBeTruthy();
    });

    it(`should button Add BOM(s) to Part Standardization be enable `, async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await toolbar.returnToolbarDropdownOption(buttonNames.addBomsToPartStandardization));
    });

    it('should check slider title', async () =>{
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addBomsToPartStandardization));
        await expect(await sliderElements.sliderTitle.getText()).toEqual(titles.partStandardizationSlider);
    });

    it('should add new view from slider', async () => {
        await partStandardizationLogic.addNewViewFromSlider(bomTreeName);
    });

    it('should reset button be enable after fill description field', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addBomsToPartStandardization));
        await input.fillFieldWithValue(partStandardization.descriptionField, random.randomTextGenerator(10));
        await expect(await button.returnButtonByTextInSlider(buttonNames.reset).isEnabled()).toBe(true);
    });

    it('should reset button be disable after reset', async () => {
        await button.clickOnTheElement(button.returnButtonByTextInSlider(buttonNames.reset));
        await expect(await button.returnButtonByTextInSlider(buttonNames.reset).isEnabled()).toBe(false);
    });

    it('should add bom to view', async () => {
        await partStandardizationLogic.addBomsToViewBomTree(bomTreeNameSecond);
    });

    it(`should delete all created view`, async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await partStandardizationLogic.deleteViewByName(bomTreeName);
        await partStandardizationLogic.deleteViewByName(bomTreeNameSecond);
    });
});