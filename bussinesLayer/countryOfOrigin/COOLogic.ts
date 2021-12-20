import {gridElements, COOElements, partDetailsElements} from "../../elements/elements";
import {Waiters as w} from "../../helper/waiters";
import {allureStep} from "../../helper/allure/allureSteps";
import {NewBrowserTab} from "../../utils/newBrowserTab";

const newBrowserTab: NewBrowserTab = new NewBrowserTab();

export class COOLogic {
    countryName: string;
    public async openCOOPopOver(rowNumber:number){
        await allureStep('open country of origin popover' , async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(await gridElements.gridWrapper);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(await gridElements.newGridCheckboxSelectorByIndex(0));
            await w.waitUntilElementIsClickable(await COOElements.COOLinksInGrid(rowNumber));
            await COOElements.COOLinksInGrid(rowNumber).click();
            await w.waitUntilElementIsDisplayed(await COOElements.COOPopOver);
            await expect(await COOElements.COOPopOver.isPresent()).toBeTruthy();
        });
    };

    public async openCOOPopOverAndVerifyCountryName(rowNumber:number){
        await allureStep('open country of origin popover and verify country name', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(await gridElements.gridWrapper);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(await gridElements.newGridCheckboxSelectorByIndex(0));
            await w.waitUntilElementIsClickable(await COOElements.COOLinksInGrid(rowNumber));
            this.countryName= await COOElements.COOLinksInGrid(rowNumber).getText();
            await COOElements.COOLinksInGrid(rowNumber).click();
            await w.waitUntilElementIsDisplayed(await COOElements.COOPopOver.get(0));
            await expect(await COOElements.COOPopOver.isPresent()).toBeTruthy();
            await expect(await COOElements.heading.getText()).toContain(this.countryName);
        });
    };

    public async openCOOPopOverPartDetails(){
        await allureStep('open country of origin popover and verify country name inside part details modal', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(await partDetailsElements.cellLinks.last());
            await w.waitUntilWorkingModalNotDisplayed();
            this.countryName= await partDetailsElements.cellLinks.last().getText();
            await partDetailsElements.cellLinks.last().click();
            await w.waitUntilElementIsDisplayed(await COOElements.COOPopOver.get(0));
            await expect(await COOElements.COOPopOver.isPresent()).toBeTruthy();
            await expect(await COOElements.heading.getText()).toContain(this.countryName);
        });
    };
    public async openCOOPopOverPartDetailsMultipleCountryName(countryIndex:number){
        await allureStep('open country of origin popover and verify country name inside part details modal', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(await partDetailsElements.cellLinks.last());
            await w.waitUntilWorkingModalNotDisplayed();
            this.countryName= await COOElements.COOLinksInGridMultipleModal(countryIndex).getText();
            await COOElements.COOLinksInGridMultipleModal(countryIndex).click();
            await w.waitUntilElementIsDisplayed(await COOElements.COOPopOver.get(0));
            await expect(await COOElements.COOPopOver.isPresent()).toBeTruthy();
            await expect(await COOElements.heading.getText()).toContain(this.countryName);
        });
    };
    public async verifyIndicators(){
        await allureStep(' Verify indicators inside country of origin popover ', async () => {
            const expectedIndicators:string[] = ['Overall','Political','Economic','Legal','Tax','Operational','Security'];
            await w.waitUntilElementIsDisplayed(await COOElements.COOPopOver.get(0));
            await expect(await COOElements.indicators.getText()).toEqual(expectedIndicators);
        });
    };

    public async verifyOverallIndicatorCalcuation(){
        await allureStep(' Verify overall indicator calculation inside country of origin popover ', async () => {
            await w.waitUntilElementIsDisplayed(await COOElements.COOPopOver.get(0));
            const indicatorScoreRaw:string[] = await COOElements.indicatorScore.getText();
            const scoreAfterSlice:number[]=[];
            let sum:number = 0;
            for(let i:number=0;i<indicatorScoreRaw.length;i++)
            {
                scoreAfterSlice[i]=parseFloat(indicatorScoreRaw[i].slice(0,3));
                sum = sum + scoreAfterSlice[i]
            }
            const averageScore:number = Number((sum/scoreAfterSlice.length).toFixed(1));
            await expect(scoreAfterSlice[0]).toEqual(averageScore);
        });
    };

    public async verifyParagraphText(){
        await allureStep(' Verify paragragraph text inside country of origin popover ', async () => {
            const paragraphTxt:string = 'Risk is scored on a 0.1-10 scale. The scale is logarithmic (base 2.2), with intervals of 0.1 magnitude. This range is split into seven bands, ranging from Low to Extreme risk.';
            await w.waitUntilElementIsDisplayed(await COOElements.COOPopOver.get(0));
            await expect(paragraphTxt).toEqual(COOElements.paragraphText.get(0).getText());
        });
    }

    public async verifySourceLogoText(){
        await allureStep(' Verify source logo and text inside country of origin popover ', async () => {
            const paragraphTxt:string = 'Risk is scored on a 0.1-10 scale. The scale is logarithmic (base 2.2), with intervals of 0.1 magnitude. This range is split into seven bands, ranging from Low to Extreme risk.';
            await w.waitUntilElementIsDisplayed(await COOElements.COOPopOver.get(0));
            await expect(await COOElements.ihsLogo.isPresent()).toBeTruthy();
            await expect(await COOElements.h1.get(0).getText()).toEqual('IHS Markit');
            await expect(await COOElements.h2.get(0).getText()).toEqual('Economics & Country Risk');
        });
    }

    public async verifyToLearnMoreLink(){
        await allureStep(' Verify to learn more link inside country of origin popover redirects to proper page  ', async () => {
            await w.waitUntilElementIsDisplayed(await COOElements.COOPopOver.get(0));
            const learnMoreURL:string = 'https://ihsmarkit.com/industry/economics-country-risk.html';
            await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(await COOElements.toLearnMoreLink.get(0),
                learnMoreURL);
        });
    }

    public async verifyCloseButtonLearnMoreLink(){
        await allureStep(' Verify close button inside learn more link closes the popover ', async () => {
            await w.waitUntilElementIsDisplayed(await COOElements.COOPopOver.get(0));
            await COOElements.close.click();
            await expect(COOElements.COOPopOver.get(0).isPresent()).toBeFalsy();
        });
    }

    public async openCOOPopOverAndVerifyMultipleCountryName(rowNumber:number, countryIndex:number){
        await allureStep('open country of origin popover for and verify for multiple country name', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(await gridElements.gridWrapper);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(await gridElements.newGridCheckboxSelectorByIndex(0));
            await w.waitUntilElementIsClickable(await COOElements.COOLinksInGrid(rowNumber));
            this.countryName= await COOElements.COOLinksInGridMultiple(rowNumber,countryIndex).getText();
            await COOElements.COOLinksInGridMultiple(rowNumber,countryIndex).click();
            await w.waitUntilElementIsDisplayed(await COOElements.COOPopOver.get(0));
            await expect(await COOElements.COOPopOver.isPresent()).toBeTruthy();
            await expect(await COOElements.heading.getText()).toContain(this.countryName);
        });
    };

}