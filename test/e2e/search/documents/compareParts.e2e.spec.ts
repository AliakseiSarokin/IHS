import {buttonNames, meganavItems, modalTitles, exportOptions} from "../../../../testData/global";
import {browser} from "protractor";
import {Button} from "../../../../components/simple/button";
const button: Button = new Button();
import {Meganav} from "../../../../components/meganav";
const meganav:Meganav = new Meganav();
import {searchElements, gridElements, modalElements} from "../../../../elements/elements";
import {DocumentsSearchLogic} from "../../../../bussinesLayer/search/documentsSearchLogic";
const documentsSearchLogic:DocumentsSearchLogic = new DocumentsSearchLogic();
import {Login} from "../../../../components/login";
const login: Login = new Login();
import {Toolbar} from "../../../../components/toolbar";
const toolbar: Toolbar = new Toolbar();
import {Dropdown} from "../../../../components/dropdown";
const dropdown: Dropdown = new Dropdown();
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
const searchLogic: SearchLogic = new SearchLogic();
import {commonSearch} from "../../../../testData/search";
import {Modal} from "../../../../components/modal";
const modal:Modal = new Modal();
import {Grid} from "../../../../components/grid";
const grid:Grid = new Grid();
import {ComparePartsLogic} from "../../../../bussinesLayer/search/comparePartsLogic";
import {endpoints} from "../../../../api/testData/endpointList";
import {GetPerformanceLogs} from "../../../../utils/getPerformanceLogs";
import {IRequestInfoType} from "../../../../testData/getPerformLogsInterfaces";
import {StringArray} from "../../../../utils/stringArray";
import {requestBody} from "../../../../api/testData/bodyList";
import {Documents} from "../../../../api/logicLayer/search/documents";
import {user} from "../../../../api/testData/global";
const comparePartsLogic = new ComparePartsLogic();

describe('Compare Parts - Documents search', () => {

    it('should be inactive compare button whe one row is selected - Documents search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch('1111'); 
        await documentsSearchLogic.goToViewRelatedParts();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeFalsy();

    });

    it('should open compare button with selected 4 - Documents search', async () => {
        await grid.newMechanismCheckboxRangeChecking(1,4);
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeTruthy();
        await modal.openModalWithButtonByName(buttonNames.compareSelected);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.compareParts('4'));
        await expect(await searchElements.comparePartsSubtitle.getText()).toEqual(commonSearch.comparePartsSubtitle('4'));
    });


    it('should be locked first and second columns for compare selected modal- Documents search ', async () => {
        await expect(await modalElements.newGirdModalLockedHeaderColumns.count()).toEqual(2)
    });

    it('should export file for Compare Parts - Documents search', async () => {
        const docSearchList:any = await Documents.getSearchDefaultPartsListByQuery(user.userAdmin, '1111'); 
        const viewRelatedPartsList: any = await Documents.getViewRelatedPartsListById(user.userAdmin, docSearchList[0].id);
        await button.clickByButtonName(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.search.parts.exportCompare,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.search.exportComparePartsByIdList([viewRelatedPartsList[0].id.toString()
            ,viewRelatedPartsList[1].id.toString(),
            viewRelatedPartsList[2].id.toString(),
            viewRelatedPartsList[3].id.toString()]));
    });

    it('should set as anchor selected part for Compare Selected modal - Documents search ', async () => {
        await comparePartsLogic.setAsAnchorCompareModal();
    });


    it('should remove selected part for Compare Selected modal - Documents search', async () => {
        await comparePartsLogic.removePartCompareModal();
        await modal.closeModalWithXButton();
    });

});