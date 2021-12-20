import {Button} from "../../../../components/simple/button";
import {
    bomElements,
    bomVaultElements,
    dropdownElements,
    gridElements,
    importElements,
    pageTitles,
    partStandardization,
    sliderElements
} from "../../../../elements/elements";
import {browser, element, by} from "protractor";
import {buttonNames, meganavItems, titles} from "../../../../testData/global";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Toolbar} from "../../../../components/toolbar";
import {Input} from "../../../../components/simple/input";
import {Random} from "../../../../utils/random";
import {PartStandardizationLogic} from "../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {Slider} from "../../../../components/slider";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";


const button: Button = new Button;
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const input: Input = new Input();
const random: Random = new Random();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();
const bomTreeName: string ='PartFromBomTree'+ random.randomTextGenerator(5);
const bomTreeNameSecond: string ='PartFromBomTree'+ random.randomTextGenerator(5);
describe('Part Standardization from Bom Tree Parts', ()=> {
    it('should button Add BOM(s) to Part Standardization be disabled', async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(0));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.addBomsToPartStandardization).isEnabled()).toBeFalsy();
    });

    it('should select bom and check button Add BOM(s) to Part Standardization is enable', async () => {
        await bomTreePartsLogic.openFirstBom();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.addBomsToPartStandardization).isEnabled()).toBeTruthy();
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

    it('should add bom to part standardization', async () => {
        await partStandardizationLogic.addBomsToViewBomTreeParts(bomTreeNameSecond);
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