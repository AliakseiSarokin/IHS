import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {bomVaultElements, gridElements, partDetailsElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {Grid} from "../../../../components/grid";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {meganavItems, commonData, modalTitles, buttonNames} from "../../../../testData/global";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {partDetailsData} from "../../../../testData/partDetails";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {VideoSliderLogic} from "../../../../bussinesLayer/home/videoSliderLogic";
import {Waiters, Waiters as w} from "../../../../helper/waiters";

const bomTreePartsLogic = new BomTreePartsLogic();
const grid: Grid = new Grid();
const helpLogic: HelpLogic = new HelpLogic();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const singleBonLogic: SingleBomLogic = new SingleBomLogic();

describe('Part Details - Distributors - BOM Tree Parts', () => {
    let yellowRowsCount: number;
    let normalRowsCount: number;
    let averagePrice: string;
    let averageLeadTime: string;

    beforeAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = 360000;
    });

    afterAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.defaultElementWaitTime;
    });

    it('should be documents icon in the BOM Tree Parts grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(1));
        await bomTreePartsLogic.expandFolderBomTreeParts();
        await singleBonLogic.openSingleBomByName(commonData.bomNameWithIcons);
        await w.waitUntilElementIsClickable(partDetailsElements.distribIcon.first());
    });

    it('should be tooltip for the Distributors icon', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.distribIcon, partDetailsData.tooltips.distributors);
    });

    it('should open part details modal by clicking on the Distributors icon', async () => {
        await modal.openModalWithElement(partDetailsElements.distribIcon.get(1));
        await w.waitUntilElementIsClickable(link.returnElementByLinkName(partDetailsData.leftNav.itemManufacturer));
        await modal.checkSubstringModalTitleNames(modalTitles.partDetails, ':');
    });

    it('should open help panel and check title', async () => {
        await helpLogic.openAndCheckHelpPanelTitle('View part details');
    });

    it('should open Video slider, play video and close', async () => {
        await VideoSliderLogic.openVideoSlider();
        await VideoSliderLogic.playingVideoChecking();
        await VideoSliderLogic.closeVideoSlider();
    });

    it('should be attribute names in distributors grid', async () => {
        const visibleCols: any = await partDetailsElements.allAttributeColumnName.getText();
        await expect(partDetailsData.attributeNames).toEqual(visibleCols);
    });

    it('should be export dropdown', async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be transpose button', async () => {
        await partDetailsLogic.switchTransposeButton();
    });

    it('should be first distributors info column with average Price and average Lead Time (Weeks) values', async () => {
        await partDetailsLogic.switchAuthorizedDistributorsLinkByName(partDetailsData.distributors.thirdInfoColumnText[1],
            partDetailsData.distributors.showAll);
        await Waiters.waitUntilElementIsDisplayed(gridElements.newGridRowsInModal.get(0));
        const valueForParsing: string = await partDetailsElements.firstDistributorsInfoColumn.get(0).getText();
        const numberAmount: string = (valueForParsing.split(' '))[2];
        const fraction: number = (numberAmount.slice(numberAmount.indexOf('.')+1)).length;
        //set lead time instead of Price because of bad grid
        averagePrice = await partDetailsLogic.calculateAverageValue('Lead Time (Weeks)', fraction);
        averageLeadTime = await partDetailsLogic.calculateAverageValue('Quantity in Stock', 2);
        if(averagePrice!='') {
            await expect(valueForParsing)
                .toEqual(partDetailsData.distributors.firstInfoColumnText[0] + averagePrice +
                    partDetailsData.distributors.firstInfoColumnText[1]);
        }
        if(averageLeadTime!='') {
            await expect(await partDetailsElements.firstDistributorsInfoColumn.get(1).getText())
                .toEqual(partDetailsData.distributors.firstInfoColumnText[2] + Math.ceil(Number(averageLeadTime)) +
                    partDetailsData.distributors.firstInfoColumnText[3]);
        }
        await partDetailsLogic.switchAuthorizedDistributorsLinkByName(partDetailsData.distributors.showAll,
            partDetailsData.distributors.thirdInfoColumnText[1]);
        await Waiters.waitUntilElementIsDisplayed(await gridElements.newGridRowsInModal.get(0));
    });

    it('should be second distributors info column', async () => {
        await expect(await partDetailsElements.secondDistributorsInfoColumn.get(0).getText())
            .toContain(partDetailsData.distributors.secondInfoColumnText[0]);
        await expect(await partDetailsElements.secondDistributorsInfoColumn.get(1).getText())
            .toContain(partDetailsData.distributors.secondInfoColumnText[1]);
        await expect(await partDetailsElements.secondDistributorsInfoColumn.get(2).getText())
            .toContain(partDetailsData.distributors.secondInfoColumnText[2]);
        await expect(await partDetailsElements.substringSecondDistributorsInfoColumn.getCssValue('background-color'))
            .toEqual(partDetailsData.distributors.secondInfoColumnText[3]);
    });

    it('should be third distributors info column', async () => {
        await expect(await partDetailsElements.thirdDistributorsInfoColumn.get(0).getText())
            .toContain(partDetailsData.distributors.thirdInfoColumnText[0]);
        await expect(await partDetailsElements.thirdDistributorsInfoColumn.get(1).getText())
            .toContain(partDetailsData.distributors.thirdInfoColumnText[1]);
    });

    it('should be option to click on Show Authorized Only link and display only authorised distributors in grid', async () => {
        await browser.sleep(1000);
        yellowRowsCount = await gridElements.yellowGridRows.count();
        normalRowsCount = await gridElements.normalGridRows.count();
        await partDetailsLogic.switchAuthorizedDistributorsLinkByName(partDetailsData.distributors.thirdInfoColumnText[1],
            partDetailsData.distributors.showAll);
        await Waiters.waitUntilElementIsDisplayed(gridElements.newGridRowsInModal.get(0));
        await expect(await gridElements.newGridRowsInModal.count()).toEqual(yellowRowsCount);
    });

    it('should include only authorised distributors in Distributors Information segment - Print Preview All modal', async () => {
        await partDetailsLogic.checkPrintModalIncludeTypeDistributors(buttonNames.printPreviewAll, yellowRowsCount);
    });

    it('should include only authorised distributors in Distributors Information segment - Print Distributors modal', async () => {
        await partDetailsLogic.checkPrintModalIncludeTypeDistributors(buttonNames.printDistributors, yellowRowsCount);
    });

    it('should be option to click on Show All link and display all distributors in grid', async () => {
        await partDetailsLogic.switchAuthorizedDistributorsLinkByName(partDetailsData.distributors.showAll,
            partDetailsData.distributors.thirdInfoColumnText[1]);
        await Waiters.waitUntilElementIsDisplayed(gridElements.newGridRowsInModal.get(0));
        await expect(await gridElements.newGridRowsInModal.count()).toEqual(yellowRowsCount + normalRowsCount);
        await expect(await gridElements.yellowGridRows.count()).toEqual(yellowRowsCount);
        await expect(await gridElements.normalGridRows.count()).toEqual(normalRowsCount);
    });

    it('should include all distributors in Distributors Information segment - Print Preview All modal', async () => {
        await partDetailsLogic.checkPrintModalIncludeTypeDistributors(buttonNames.printPreviewAll, yellowRowsCount + normalRowsCount);
    });

    it('should include all distributors in Distributors Information segment - Print Distributors modal', async () => {
        await partDetailsLogic.checkPrintModalIncludeTypeDistributors(buttonNames.printDistributors, yellowRowsCount + normalRowsCount);
    });

    it('should be add button with dropdown list', async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal', async () => {
        await partDetailsLogic.addToBomModal();
    });

    it('should open view alternates modal', async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it('should open res request modal and be pre populated values', async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open Print Preview All modal and check modal title', async () => {
        await partDetailsLogic.printModal();
    });

    it('should be specific options in print dropdown and subtitle in print preview modals', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should include the Average Price/Average lead Time in Distributors Information segment - Print Preview All modal', async () => {
        await partDetailsLogic.checkPrintModalDistributorsPreamble(buttonNames.printPreviewAll,
            partDetailsData.distributors.firstInfoColumnText, averagePrice, averageLeadTime);
    });

    it('should include the Average Price/Average lead Time in Distributors Information segment - Print Distributors modal', async () => {
        await partDetailsLogic.checkPrintModalDistributorsPreamble(buttonNames.printDistributors,
            partDetailsData.distributors.firstInfoColumnText, averagePrice, averageLeadTime);
    });

    it('should go to parametric by clicking on the search by example', async () => {
        await partDetailsLogic.searchByExample();
    });
});

