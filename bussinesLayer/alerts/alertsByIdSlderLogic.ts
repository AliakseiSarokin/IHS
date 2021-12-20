import {
    alertsElements,
    commonElements,
    gridElements,
    partDetailsElements,
    sliderElements
} from "../../elements/elements";
import {Link} from "../../components/simple/link";
import {Slider} from "../../components/slider";
import {Waiters as w} from "../../helper/waiters";
import {linksNames} from "../../testData/global";
import {allureStep} from "../../helper/allure/allureSteps";
import {browser} from "protractor";
const link: Link = new Link();

export class AlertsByIdSlderLogic {

    public async openAlertsByIdSlider() {
        const sliderLink: string = await gridElements.newGridUnlockLinkByRowIndex(0).get(0).getText();
        await Slider.openSliderByClickingOnTheLinkName(sliderLink);
        await expect(await sliderElements.sliderTitle.getText()).toEqual('View Alert ('+sliderLink+')');
    };

    public async openPartsAffectedTabByClickingMfrPNLink() {
        if (await link.returnElementByLinkName(linksNames.viewAffectedParts).isPresent()) {
            await link.clickOnTheLinkByName(linksNames.viewAffectedParts)
        }
        else {
            await alertsElements.alertsByIdSlider.columnValuesNumberLink(1).click();
        }
        await w.waitUntilElementIsDisplayed(gridElements.severalGrid.get(0));
        await w.waitUntilElementIsClickable(gridElements.severalGrid.get(0));
        await expect(commonElements.activeNavTab('Parts Affected').isPresent()).toBeTruthy();
    };

    public async goToTabByTabName(tabName: string) {
        await link.clickOnTheLinkByNameAndWaitForElement(tabName, await gridElements.newGridHeaderNamesInSlider.get(0));
        await expect(commonElements.activeNavTab(tabName).isPresent()).toBeTruthy();
    };

    public async openMfrTabByMfrNameLink() {
        const mfrName: string = await alertsElements.alertsByIdSlider.columnValuesNumberLink(2).getText();
        await link.clickOnTheLinkByNameInSlider(mfrName);
        await w.waitUntilElementIsDisplayed(sliderElements.openSliderBox);
        await w.waitUntilElementIsClickable(sliderElements.openSliderBox);
        await expect(commonElements.activeNavTab('Manufacturer').isPresent()).toBeTruthy();
    };

    public async openWhereUsedTabByClickingOnAffectedBomLink() {
        await allureStep(`go to Where Used tab with cell link`, async() => {
            await w.waitUntilElementIsClickable(await gridElements.rowCellLinksWithContentInSlider(0).get(0));
            await gridElements.rowCellLinksWithContentInSlider(0).get(0).click();
            await w.waitUntilElementIsDisplayed(sliderElements.openSliderBox);
            await w.waitUntilElementIsClickable(sliderElements.openSliderBox);
            await w.waitUntilElementIsDisplayed(commonElements.activeNavTab('Where Used (BOMs)'));
            await expect(await commonElements.activeNavTab('Where Used (BOMs)').isPresent()).toBeTruthy();
        })
    };

    public async verifyAlertTabIsOpened(AlertName:string){
        await browser.waitForAngularEnabled(false);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(partDetailsElements.cell.get(0));
        expect(await partDetailsElements.cellValueDisplayed.getText()).toEqual(AlertName);
    }

}