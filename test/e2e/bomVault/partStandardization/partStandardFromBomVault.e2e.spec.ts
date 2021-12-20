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


const button: Button = new Button;
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const input: Input = new Input();
const random: Random = new Random();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const bomVaultName: string ='PartFromBomVault'+ random.randomTextGenerator(5);
const bomVaultNameSecond: string ='PartFromBomVault'+ random.randomTextGenerator(5);

describe('Part Standardization from Bom Vault ', ()=> {
    it('should button Add BOM(s) to Part Standardization be disabled', async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(3));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.addBomsToPartStandardization).isEnabled()).toBeFalsy();
    });

    it('should select bom and check button Add BOM(s) to Part Standardization be enable', async () => {
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.addBomsToPartStandardization).isEnabled()).toBeTruthy();
    });

    it('should check slider title', async () =>{
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addBomsToPartStandardization));
        await expect(await sliderElements.sliderTitle.getText()).toEqual(titles.partStandardizationSlider);
    });

    it('should add new view from slider', async () => {
        await partStandardizationLogic.addNewViewFromSlider(bomVaultName);
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
        await partStandardizationLogic.addBomsToViewForNewGrid(bomVaultNameSecond);
    });

    it('should close slider with X button', async ()=>{
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Slider.openSliderByClickingOnTheButtonName(buttonNames.addBomsToPartStandardization);
        await Slider.closeSlider(partStandardization.buttonX, gridElements.gridWrapper);
        await expect(sliderElements.sliderTitle.isPresent()).toBeFalsy();
    });

    it('should close slider with button arrow icon', async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Slider.openSliderByClickingOnTheButtonName(buttonNames.addBomsToPartStandardization);
        await Slider.closeSlider(partStandardization.closeSliderArrow, gridElements.gridWrapper);
        await expect(sliderElements.sliderTitle.isPresent()).toBeFalsy();
    });

    it('should close slider with cancel button', async() =>{
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Slider.openSliderByClickingOnTheButtonName(buttonNames.addBomsToPartStandardization);
        await Slider.closeSliderWithButtonName(buttonNames.cancel, gridElements.newGridRows.get(1));
        await expect(sliderElements.sliderTitle.isPresent()).toBeFalsy();
    });

    it(`should delete all created view`, async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await partStandardizationLogic.deleteViewByName(bomVaultName);
        await partStandardizationLogic.deleteViewByName(bomVaultNameSecond);
    });
});