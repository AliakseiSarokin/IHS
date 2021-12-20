import {SearchSetting} from "../../logicLayer/users/searchSetting";
import {user} from "../../testData/global";
import {endpoints} from "../../testData/endpointList";
import {requestBody} from "../../testData/bodyList";

describe(`[API] Search settings`, ()=>{
   it(`[API] check search setting`, async()=>{
       await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
           requestBody.settings.search);
       const setting: any = await SearchSetting.getSearchSettings(user.userAdmin);
       await expect(requestBody.settings.search).toEqual(setting);
   });

    it(`[API ]should switch grid to transpose`, async ()=>{
        requestBody.settings.search.gridType = 'columnsRows';
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API ]should switch transpose to grid`, async ()=>{
        requestBody.settings.search.gridType = 'rowsColumns';
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API ]should turn off special chars`, async ()=>{
        requestBody.settings.search.ignoreSpecialChars = false;
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should turn on special chars`, async ()=>{
        requestBody.settings.search.ignoreSpecialChars = true;
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should switch keyword search to Any`, async ()=>{
        requestBody.settings.search.keywordSearch = 'or';
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should switch keyword search to Exact`, async ()=>{
        requestBody.settings.search.keywordSearch = 'equals';
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should switch keyword search to All`, async ()=>{
        requestBody.settings.search.keywordSearch = 'all';
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should switch part number search to Contain`, async ()=>{
        requestBody.settings.search.partNumberSearch = 'contains';
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should switch part number search to Equals`, async ()=>{
        requestBody.settings.search.partNumberSearch = 'equals';
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should switch part number search to Starts with`, async ()=>{
        requestBody.settings.search.partNumberSearch = 'startswith';
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should check Qualifications checkboxes`, async ()=>{
        requestBody.settings.search.qualifications.DLA = true;
        requestBody.settings.search.qualifications["AEC-Q100"] = true;
        requestBody.settings.search.qualifications["AEC-Q101"] = true;
        requestBody.settings.search.qualifications["AEC-Q200"] = true;
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should uncheck Qualifications checkboxes`, async ()=>{
        requestBody.settings.search.qualifications.DLA = false;
        requestBody.settings.search.qualifications["AEC-Q100"] = false;
        requestBody.settings.search.qualifications["AEC-Q101"] = false;
        requestBody.settings.search.qualifications["AEC-Q200"] = false;
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should switch layout to Life Cycle`, async ()=>{
        requestBody.settings.search.layoutView = 'Life Cycle';
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should switch layout to Environmental`, async ()=>{
        requestBody.settings.search.layoutView = 'Environmental';
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should switch layout to Combined`, async ()=>{
        requestBody.settings.search.layoutView = 'Combined';
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should switch layout to Default`, async ()=>{
        requestBody.settings.search.layoutView = 'Default';
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should be All items per page`, async ()=>{
        let searchForAllItemsPerPage:any = await requestBody.settings.search;
        searchForAllItemsPerPage.itemsPerPage = 'All';
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should be 500 items per page`, async ()=>{
        requestBody.settings.search.itemsPerPage = 500;
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should be 250 items per page`, async ()=>{
        requestBody.settings.search.itemsPerPage = 250;
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should be 100 items per page`, async ()=>{
        requestBody.settings.search.itemsPerPage = 100;
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should be 50 items per page`, async ()=>{
        requestBody.settings.search.itemsPerPage = 50;
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should be 25 items per page`, async ()=>{
        requestBody.settings.search.itemsPerPage = 25;
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should turn on Identify manufacturer parts that are on my CPL, in search results`, async ()=>{
        requestBody.settings.search.matchCpl = true;
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API ]should turn off Identify manufacturer parts that are on my CPL, in search results`, async ()=>{
        requestBody.settings.search.matchCpl = false;
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should show only authorized distributors`, async ()=>{
        requestBody.settings.search.distributorInfo = 'authorized';
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API ]should show all distributors `, async ()=>{
        requestBody.settings.search.distributorInfo = 'all';
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should check Default Alternates Types checkboxes`, async ()=>{
        requestBody.settings.search.alternateTypes.formFitFunction = false;
        requestBody.settings.search.alternateTypes.functional = true;
        requestBody.settings.search.alternateTypes.direct = false;
        requestBody.settings.search.alternateTypes.similar = true;
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should uncheck Default Alternates Types checkboxes`, async ()=>{
        requestBody.settings.search.alternateTypes.formFitFunction = true;
        requestBody.settings.search.alternateTypes.functional = false;
        requestBody.settings.search.alternateTypes.direct = true;
        requestBody.settings.search.alternateTypes.similar = false;
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should check Alternates Result Qualifications checkboxes`, async ()=>{
        requestBody.settings.search.alternateQualifications.DLA = true;
        requestBody.settings.search.alternateQualifications["AEC-Q100"] = true;
        requestBody.settings.search.alternateQualifications["AEC-Q101"] = true;
        requestBody.settings.search.alternateQualifications["AEC-Q200"] = true;
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });

    it(`[API] should uncheck Alternates Result Qualifications checkboxes`, async ()=>{
        requestBody.settings.search.alternateQualifications.DLA = false;
        requestBody.settings.search.alternateQualifications["AEC-Q100"] = false;
        requestBody.settings.search.alternateQualifications["AEC-Q101"] = false;
        requestBody.settings.search.alternateQualifications["AEC-Q200"] = false;
        await SearchSetting.switchSearchSetting(user.userAdmin, endpoints.settings.search,
            requestBody.settings.search);
        const switchSetting: any = await SearchSetting.getSearchSettings(user.userAdmin);
        await expect(switchSetting).toEqual(requestBody.settings.search);
    });
});