import {Button} from "../../../../../components/simple/button";
import {browser, by} from "protractor";
import {buttonNames, meganavItems} from "../../../../../testData/global";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {Input} from "../../../../../components/simple/input";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {ParametricSearchLogic} from "../../../../../bussinesLayer/search/parametricSearchLogic";
import {searchElements} from "../../../../../elements/elements";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input = new Input();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();
describe('Parametric Search - Search Page - Desired Capacitance textbox', () => {

    beforeAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.maxElementWaitTime;
    });

    afterAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.defaultElementWaitTime;
    });

    it('should go to parametric', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await expect(await  browser.getCurrentUrl()).toContain("/search/parametric")
    });

    it("should select 'Passives' commodity, 'Capacitors' part type, any category and show 'By Value' box", async () => {
        await parametricSearchLogic.selectCommodities(4);
        await parametricSearchLogic.selectPartTypes(1);
        await parametricSearchLogic.selectCategoriesDesiredByValue(2);
        await expect(button.returnButtonByText(buttonNames.findMatchingValues).isEnabled()).toBeFalsy();
    });

    it('should be selected commodities > part type > categories in entry text box', async () => {
        await parametricSearchLogic.entryBoxChecking(parametricSearchLogic.selectedCommodities + ' > '
            + parametricSearchLogic.selectedPartTypes + ' > ' + parametricSearchLogic.selectedCategory);
    });

    it("should be 'By Value' box title", async () => {
        await parametricSearchLogic.boxLabelChecking(3, 'By Value');
    });

    //this test is failed, because 'By Value'-block title is partially missed (DE103421)
    it("should check 'By Value' box", async () => {
        await expect(await searchElements.parametric.byValueLabel.getText()).toEqual( 'Desired Capacitance (uF)');
        await parametricSearchLogic.fillDesiredByValue('100000000000');
        const actualValue: string = await elementAttributes.getElementAttribute(searchElements.parametric.byValueInput, 'value');
        await expect(actualValue.length).toEqual(10);
        await expect(await searchElements.parametric.byValueDiv.get(0).getText()).toContain('limit 10 characters');
        const text:string = 'Please enter the desired Capacitance (uF) value. When you select the Find Matching Values button,' +
            ' you will be presented with multiple values that are close to the value entered.';
        await expect(await searchElements.parametric.byValueDiv.get(1).getText()).toContain(text);
    });

    it("should select 'Passives' commodity, 'Resistors' part type, any category and show 'By Value' box", async () => {
        await parametricSearchLogic.selectPartTypes(6);
        await expect(await searchElements.parametric.boxesLabels.get(3).isPresent()).toBeFalsy();
        await parametricSearchLogic.selectCategoriesDesiredByValue(3);
        await expect(button.returnButtonByText(buttonNames.findMatchingValues).isEnabled()).toBeFalsy();
    });

    it('should be selected commodities > part type > categories in entry text box', async () => {
        await parametricSearchLogic.entryBoxChecking(parametricSearchLogic.selectedCommodities + ' > '
            + parametricSearchLogic.selectedPartTypes + ' > ' + parametricSearchLogic.selectedCategory);
    });

    //this test is failed, because 'By Value'-block title is partially missed (DE103421)
    it("should check 'By Value' box", async () => {
        await expect(await searchElements.parametric.byValueLabel.getText()).toEqual( 'Desired Resistance (ohm)');
        await parametricSearchLogic.fillDesiredByValue('100000000000');
        const actualValue: string = await elementAttributes.getElementAttribute(searchElements.parametric.byValueInput, 'value');
        await expect(actualValue.length).toEqual(10);
        await expect(await searchElements.parametric.byValueDiv.get(0).getText()).toContain('limit 10 characters');
        const text: string ='Please enter the desired Resistance (ohm) value. When you select the Find Matching Values button,' +
            ' you will be presented with multiple values that are close to the value entered.';
        await expect(await searchElements.parametric.byValueDiv.get(1).getText()).toContain(text);
    });
})