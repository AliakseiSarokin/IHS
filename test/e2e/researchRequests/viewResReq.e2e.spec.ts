import {Login} from "../../../components/login";
const login: Login = new Login();
import {Header} from "../../../components/header";
import {headerItems, modalTitles, buttonNames, fieldStatuses, linksNames, titles, exportOptions,columnHeaders} from "../../../testData/global";
import {resReqData} from "../../../testData/researchRequests";
import {resReqElements, pageTitles, gridElements, dropdownElements, headerElements} from "../../../elements/elements";
import {browser} from "protractor";
import {Modal} from "../../../components/modal";
const modal:Modal = new Modal();
import {Button} from "../../../components/simple/button";
const button: Button = new Button;
import {Link} from "../../../components/simple/link";
const link: Link = new Link();
import {Dropdown} from "../../../components/dropdown";
import {ResRequestLogic} from "../../../bussinesLayer/resRequest/resRequestLogic";
const resReqLogic: ResRequestLogic = new ResRequestLogic();
import {ElementAttributes} from "../../../utils/elementAttributes";
const elementAttributes: ElementAttributes = new ElementAttributes();
import {InstructionPanel} from "../../../components/instructionPanel";
const instructionPanel: InstructionPanel = new InstructionPanel();
import {Toolbar} from "../../../components/toolbar";
const toolbar: Toolbar = new Toolbar();
import {Grid} from "../../../components/grid";
const grid = new Grid();
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
const helpLogic: HelpLogic = new HelpLogic();
import {RadioButton} from "../../../components/simple/radioButton";
import {GetPerformanceLogs} from "../../../utils/getPerformanceLogs";
import {IRequestInfoType} from "../../../testData/getPerformLogsInterfaces";
import {StringArray} from "../../../utils/stringArray";
import {endpoints} from "../../../api/testData/endpointList";
import {requestBody} from "../../../api/testData/bodyList";
const radioButton: RadioButton = new RadioButton();

describe('View Research Request', () => {

    it('should go to View Research Requests from Home ? icon',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.helpIcon, headerItems.viewResReq, gridElements.grid);
        await expect(pageTitles.pageTitleShim2.getText()).toEqual(titles.viewResReq);
    });

    it('should open export modal, should be export modal attributes - View Research Requests page', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.exportModalAttributes(exportOptions.common.labels, exportOptions.common.options );
        await modal.closeModalWithXButton();
    });

    it("should open export modal, open help panel and check opened subitem", async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.exportModalAttributes(exportOptions.common.labels, exportOptions.common.options );
        await helpLogic.openAndCheckHelpPanelTitle('Research requests');
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('View research requests');
        await modal.closeModalWithXButton();
    });

    it("should export xls file", async () =>{
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.researchRequest.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.researchRequest.exportByFormat(exportOptions.fileFormat[0]));
    });

    it("should export csv file", async () =>{
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.researchRequest.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.researchRequest.exportByFormat(exportOptions.fileFormat[1]));
    });

    it("should export txt file", async () =>{
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[4]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.researchRequest.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.researchRequest.exportByFormat(exportOptions.fileFormat[2]));
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Research requests');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Research requests');
    });

    it('should be unhide button with dropdown list  - View Research Requests',  async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column - View Research Requests',  async () => {
        await grid.newGridHideColumnByName('Status');
        await toolbar.displayHiddenColumnInDropdonwToolbar('Status');
    });

    it('should unhide the column with Unhode All -  View Research Requests',  async () => {
        await toolbar.unhideCellNameWithUnhideAll('Status');
    });

   it('should be filters dropdown on View Research Requests page',  async () => {
       await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
       await expect(dropdownElements.dropdownValues.getText()).toEqual(resReqData.filters);
       await Dropdown.closeDropdownByClickOnElement(toolbar.simpleFilterButton);
   });

   it('should select option and display tag - View Research Requests page ',  async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter);
   });

   it('should display one tag - View Research Requests page ',  async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
   });

   it('should remove tag by clicking on clear all tags link -View Research Requests page',  async () => {
        await toolbar.removeWithClearAll();
   });

   it('should remove tag by clicking on X - View Research Requests page ',  async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
   });

   it('should show only my requests using filter',  async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.returnToolbarButton(buttonNames.filter));
        await Dropdown.selectValueInDropdownByValueName(resReqData.filters[1], gridElements.newGridCellByRowIndex(0).get(0));
        const createdByValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,'Created By' );
        for(let i:number = 0; i < createdByValues.length; i++) {
            await expect(createdByValues[i]).toEqual('b4testadmin')
        }
   });


   it(" should be headers for locked and unlocked columns - View Research Requests", async () => {
       await grid.newGridCheckingUnlockedColumnHeaders( columnHeaders.researchReq.unlockedColumns());

   });

    it(" should open View Research Request modal", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.helpIcon, headerItems.viewResReq, gridElements.grid);
        await resReqLogic.openViewResReqModal();
        await expect(resReqElements.viewResReqSubtitle.getText()).toEqual(resReqData.viewResReqSubtitle);
        await expect(resReqElements.viewResResTopBarTitles.getText()).toEqual(resReqData.topBarLabels);
   });

    it("should open help panel and check opened subitem", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Research requests');
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('View research requests');
    });

   it(" should be highlighted left nav and Res Req Det  -  View Research Request modal", async () => {
        await expect(elementAttributes.getElementAttribute(resReqElements.leftNavItems.get(0), 'class'))
            .toContain(fieldStatuses.active);
        await expect(resReqElements.leftNavLinks.getText()).toEqual(resReqData.leftNavLinks);
   });

    it(" should go to add comment section -  View Research Request modal", async () => {
        await resReqLogic.goToTheNextTab(1);
    });

    it(" should be a large text area with gost text -  View Research Request modal", async () => {
        await expect(resReqElements.textAreaComment.get(0).isDisplayed()).toBeTruthy();
        await expect(await elementAttributes.getElementAttribute(resReqElements.textAreaComment.get(0), 'placeholder'))
            .toEqual(resReqData.ghostText)
    });

    it(" should be a 1000 char limin and countdown for text area -  View Research Request modal", async () => {
        await resReqLogic.largeTextAreaCounterChecking(0);
    });

    it(" should upload a file less than 2 MB", async () => {
        await resReqLogic.uploadFileChecking(resReqLogic.fileToUploadLess2MB);
    });

    it(" should clear by clicking on the clear all link", async () => {
        await resReqLogic.clearAllChecking();
    });

    it(" should upload a file exect 2 MB", async () => {
        await resReqLogic.uploadFileChecking(resReqLogic.fileToUploadExect2MB);
    });

    it(" should go to comment history section -  View Research Request modal", async () => {
        await resReqLogic.goToTheNextTab(2)
    });

    it(" should go to escalate section -  View Research Request modal", async () => {
        await resReqLogic.goToTheNextTab(3)

    });

    it(" should be a large text area with gost text -  Escalation", async () => {
        await expect(await elementAttributes.getElementAttribute(resReqElements.textAreaComment.get(1), 'placeholder'))
            .toEqual(resReqData.ghostTextEscalate);
    });


    it(" should be a 1000 char limin and countdown for text area -  View Research Request modal", async () => {
        await browser.sleep(2000); //spinner appears twice
        await resReqLogic.largeTextAreaCounterChecking(1);
    });
});