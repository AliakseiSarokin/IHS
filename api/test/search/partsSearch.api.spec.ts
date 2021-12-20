import {PartsSearch} from "../../logicLayer/search/partsSearch";
import {endpoints} from "../../testData/endpointList";
import {requestBody} from "../../testData/bodyList";
import {user} from "../../testData/global";
import {getDataFromPartsSearch, searchModels} from "../../models/search/partsSearch";
import {Cpl} from "../../logicLayer/search/cpl";
import {cplModel, getDataFromCpl} from "../../models/cpl/cpl";

describe(`[API] Parts Search`, ()=>{
    it(`check field on data type in part search body`, async ()=>{
        requestBody.search.parts.q = 'lm311';
        const partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        await expect(typeof (searchModels.CF_ENV_RISK[0])).toEqual('string');
        await expect(typeof (searchModels.CF_INV_AVAILABLE[0])).toEqual('string');
        await expect(typeof (searchModels.CF_LC_RISK[0])).toEqual('string');
        await expect(typeof (searchModels.CF_MOD_DATE[0])).toEqual('string');
        await expect(typeof (searchModels.CF_TEMP_GRADE[0])).toEqual('string');
        await expect(typeof (searchModels.CLASS_ID[0])).toEqual('string');
        await expect(typeof (searchModels.DRC_DUE_DLGC_LVL[0])).toEqual('string');
        await expect(typeof (searchModels.DRC_STATUS[0])).toEqual('string');
        await expect(typeof (searchModels.MAT_PACKAGE_PTR[0])).toEqual('string');
        await expect(typeof (searchModels.OBJ_ID[0])).toEqual('number');
        await expect(typeof (searchModels.TREE_ID[0])).toEqual('string');
        await expect(typeof (searchModels.V_CAGE_CODE[0])).toEqual('string');
        await expect(typeof (searchModels.V_DEV_STATUS_SPR[0])).toEqual('string');
        await expect(typeof (searchModels.V_ECCN[0])).toEqual('string');
        await expect(typeof (searchModels.V_ECCN_GOVERNANCE[0])).toEqual('string');
        await expect(typeof (searchModels.V_FFF_GRP_CODE[0])).toEqual('string');
        await expect(typeof (searchModels.V_HTS_CODE[0])).toEqual('string');
        await expect(typeof (searchModels.V_MFR_DESC_SPR[0])).toEqual('string');
        await expect(typeof (searchModels.V_PRT_CTYPE[0])).toEqual('string');
        await expect(typeof (searchModels.V_PRTY_STYPE[0])).toEqual('string');
        await expect(typeof (searchModels.V_PRT_DESCR_SPR[0])).toEqual('string');
        await expect(typeof (searchModels.V_PRT_ECCN_PTR[0])).toEqual('string');
        await expect(typeof (searchModels.V_PRT_GENERIC_SPR[0])).toEqual('string');
        await expect(typeof (searchModels.V_PRT_MFG_PTR_SPR[0])).toEqual('string');
        await expect(typeof (searchModels.V_PRT_NBR_SPR[0])).toEqual('string');
        await expect(typeof (searchModels.V_PRT_REL_INFO[0])).toEqual('string');
        await expect(typeof (searchModels.V_PRT_SOURCE[0])).toEqual('string');
        await expect(typeof (searchModels.V_SB_CODE[0])).toEqual('string');
        await expect(typeof (searchModels.V_SHORT_MANUFACTURER_NAME[0])).toEqual('string');
        await expect(typeof (searchModels.V_STRIPPED_PN[0])).toEqual('string');
        await expect(typeof (searchModels.V_VMF_BUS_STAT[0])).toEqual('string');
        await expect(typeof (searchModels.V_VMF_NAME[0])).toEqual('string');
        await expect(typeof (searchModels.category[0])).toEqual('string');
        await expect(typeof (searchModels.id[0])).toEqual('number');
        await expect(typeof (searchModels.type[0])).toEqual('string');
    });

    it(`should check part number search start with`, async() =>{
        requestBody.search.parts.q = 'lm311';
        requestBody.search.parts.mod.operator = "startswith";
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase().indexOf('lm311') === 0).toBeTruthy();
        }
    });

    it(`should check part number search contains`, async() =>{
        requestBody.search.parts.q = 'lm311';
        requestBody.search.parts.mod.operator = "contains";
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('lm311');
        }
    });

    it(`should check part number search exact`, async() =>{
        requestBody.search.parts.q = 'lm311d';
        requestBody.search.parts.mod.operator = "equals";
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toEqual('lm311d');
        }
    });

    it(`should check part number search All Keyword`, async() =>{
        requestBody.search.parts.q = 'start with';
        requestBody.search.parts.mod.operator = "and";
        requestBody.search.parts.mod.searchfields = ["V_PRT_DESCR_SPR", "V_MFR_DESC_SPR", "V_MFR_PKG_DESC_SPR"];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_DESCR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_DESCR_SPR[i].concat(searchModels.V_MFR_DESC_SPR[i], searchModels.V_MFR_PKG_DESC_SPR[i]).replace(/[^a-zA-Z0-9]/g, '').toLowerCase())
                .toContain('start' && 'with');
        }
    });

    it(`should check part number search Any Keyword`, async() =>{
        requestBody.search.parts.q = 'start with';
        requestBody.search.parts.mod.operator = "and";
        requestBody.search.parts.mod.searchfields = ["V_PRT_DESCR_SPR", "V_MFR_DESC_SPR", "V_MFR_PKG_DESC_SPR"];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_DESCR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_DESCR_SPR[i].concat(searchModels.V_MFR_DESC_SPR[i], searchModels.V_MFR_PKG_DESC_SPR[i]).replace(/[^a-zA-Z0-9]/g, '').toLowerCase())
                .toContain('start' || 'with');
        }
    });

    it(`should check part number search Exact Keyword`, async() =>{
        requestBody.search.parts.q = 'power amp';
        requestBody.search.parts.mod.operator = "equals";
        requestBody.search.parts.mod.searchfields = ["V_PRT_DESCR_SPR", "V_MFR_DESC_SPR", "V_MFR_PKG_DESC_SPR"];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_DESCR_SPR.length; i++) {
            if(searchModels.V_PRT_DESCR_SPR[i] === undefined){
                searchModels.V_PRT_DESCR_SPR[i] = '';
            }
            await expect(await searchModels.V_PRT_DESCR_SPR[i].concat(searchModels.V_MFR_DESC_SPR[i], searchModels.V_MFR_PKG_DESC_SPR[i]).replace(/[^a-zA-Z0-9]/g, ' ').toLowerCase())
                .toContain('power amp');
        }
    });

    it(`should check part number search with manufacturers`, async() =>{
        requestBody.search.parts.q = 'lm311';
        requestBody.search.parts.mod.operator = "startswith";
        requestBody.search.parts.facet = [{field: "P2065198075", values: ["Motorola"]}];
        requestBody.search.parts.keyword = [{field: "P2065198075", operator: "equals", values: ["Motorola"]}];
        requestBody.search.parts.mod.searchfields = ["V_PRT_NBR_SPR"];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase().indexOf('lm311') === 0).toBeTruthy();
            await expect(await searchModels.V_SHORT_MANUFACTURER_NAME[i].toLowerCase()).toEqual('motorola')
        }
    });

    it(`should check search with part status Active`, async() =>{
        requestBody.search.parts.q = 'lm311';
        requestBody.search.parts.mod.operator = "contains";
        requestBody.search.parts.facet = [{field: "P3900000131", values: ["Active"]}];
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.count = true;
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('lm311');
            await expect(await searchModels.V_DEV_STATUS_SPR[i].toLowerCase()).toEqual('active');
        }
    });

    it(`should check search with part status End Of Life Cycle`, async() =>{
        requestBody.search.parts.q = '11111';
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.mod.operator = "contains";
        requestBody.search.parts.facet = [{field: "P3900000131", values: ["EOL"]}];
        requestBody.search.parts.count = true;
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('11111');
            await expect(await searchModels.V_DEV_STATUS_SPR[i].toLowerCase()).toEqual('eol');
        }
    });

    it(`should check search with part status Active`, async() =>{
        requestBody.search.parts.q = '11111';
        requestBody.search.parts.mod.operator = "contains";
        requestBody.search.parts.facet = [{field: "P3900000131", values: ["NRFND"]}];
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.count = true;
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('11111');
            await expect(await searchModels.V_DEV_STATUS_SPR[i].toLowerCase()).toEqual('nrfnd');
        }
    });

    it(`should check search with Automative temperature grade`, async() =>{
        requestBody.search.parts.q = '11111';
        requestBody.search.parts.mod.operator = "contains";
        requestBody.search.parts.keyword = [{field: "P3901637909", operator: "startswith", values: ["Automotive"]}];
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('11111');
            await expect(await searchModels.CF_TEMP_GRADE[i].toLowerCase()).toEqual('automotive: -40c to +125c');
        }
    });

    it(`should check search with Military temperature grade`, async() =>{
        requestBody.search.parts.q = '11111';
        requestBody.search.parts.mod.operator = "contains";
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.keyword = [{field: "P3901637909", operator: "startswith", values: ["Military"]}];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('11111');
            await expect(await searchModels.CF_TEMP_GRADE[i].toLowerCase()).toEqual('military: -55c +125c');
        }
    });

    it(`should check search with Industrial temperature grade`, async() =>{
        requestBody.search.parts.q = '11111';
        requestBody.search.parts.mod.operator = "contains";
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.keyword = [{field: "P3901637909", operator: "startswith", values: ["Industrial"]}];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('11111');
            await expect(await searchModels.CF_TEMP_GRADE[i]).toEqual('Industrial: -40C to +85C');
        }
    });

    it(`should check search with Industrial temperature grade`, async() =>{
        requestBody.search.parts.q = '11111';
        requestBody.search.parts.mod.operator = "contains";
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.keyword = [{field: "P3901637909", operator: "startswith", values: ["Industrial"]}];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('11111');
            await expect(await searchModels.CF_TEMP_GRADE[i]).toEqual('Industrial: -40C to +85C');
        }
    });

    it(`should check search with Commercial temperature grade`, async() =>{
        requestBody.search.parts.q = '11111';
        requestBody.search.parts.mod.operator = "contains";
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.keyword = [{field: "P3901637909", operator: "startswith", values: ["Commercial"]}];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('11111');
            await expect(await searchModels.CF_TEMP_GRADE[i]).toEqual('Commercial: +0C to +70C');
        }
    });

    it(`should check search with Commercial Extended temperature grade`, async() =>{
        requestBody.search.parts.q = '11111';
        requestBody.search.parts.mod.operator = "contains";
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.keyword = [{field: "P3901637909", operator: "startswith", values: ["Commercial Extended"]}];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('11111');
            await expect(await searchModels.CF_TEMP_GRADE[i]).toEqual('Commercial Extended: -20C to +70C');
        }
    });

    it(`should check search with Other temperature grade`, async() =>{
        requestBody.search.parts.q = '11111';
        requestBody.search.parts.mod.operator = "contains";
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.keyword = [{field: "P3901637909", operator: "startswith", values: ["Other"]}];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('11111');
            await expect(await searchModels.CF_TEMP_GRADE[i]).toEqual('Other: -20C to +105C');
        }
    });

    it(`should check search with Other temperature grade`, async() =>{
        requestBody.search.parts.q = '11111';
        requestBody.search.parts.mod.operator = "contains";
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.keyword = [{field: "P3901637909", operator: "startswith", values: ["Other"]}];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('11111');
            await expect(await searchModels.CF_TEMP_GRADE[i]).toEqual('Other: -20C to +105C');
        }
    });

    it(`should check Show Corporate Part List (CPL) Matches`, async() =>{
        const cplPart = await Cpl.cplSearchByQuery(user.userAdmin, '0000');
        await getDataFromCpl(cplPart);
        requestBody.search.parts.q = cplModel.BM_MFR_PN[0];
        requestBody.search.parts.mod.operator = "contains";
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.mod.matchcpl = true;
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_REL_INFO.length; i++) {
            await expect(await searchModels.V_PRT_REL_INFO[i]).toContain('c');
        }
    });

    it(`should check search without REACH Compliant`, async() =>{
        requestBody.search.parts.q = 'lm311';
        requestBody.search.parts.mod.operator = "startswith";
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.facet = [{field: "P3900000413", values: ["0"]}];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('lm311');
            await expect(await searchModels.REACH_FLAG[i]).toEqual('No');
        }
    });

    it(`should check search with REACH Compliant`, async() =>{
        requestBody.search.parts.q = 'lm311';
        requestBody.search.parts.mod.operator = "startswith";
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.facet = [{field: "P3900000413", values: ["1"]}];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('lm311');
            await expect(await searchModels.REACH_FLAG[i]).toEqual('Yes');
        }
    });

    it(`should check search without EU RoHS Compliant`, async() =>{
        requestBody.search.parts.q = 'lm311';
        requestBody.search.parts.mod.operator = "startswith";
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.facet = [{field: "P3900000408", values: ["0"]}];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('lm311');
            await expect(await searchModels.ROHS5_FLAG[i]).toEqual('No');
        }
    });

    it(`should check search with EU RoHS Compliant`, async() =>{
        requestBody.search.parts.q = 'lm311';
        requestBody.search.parts.mod.operator = "startswith";
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.facet = [{field: "P3900000408", values: ["1"]}];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('lm311');
            await expect(await searchModels.ROHS5_FLAG[i]).toEqual('Yes');
        }
    });

    it(`should check search without China RoHS Compliant`, async() =>{
        requestBody.search.parts.q = 'lm311';
        requestBody.search.parts.mod.operator = "startswith";
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.facet = [{field: "P3900000419", values: ["1"]}];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('lm311');
            await expect(await searchModels.ROHS_FLAG[i]).toEqual('No');
        }
    });

    it(`should check search with China RoHS Compliant`, async() =>{
        requestBody.search.parts.q = 'lm311';
        requestBody.search.parts.mod.operator = "startswith";
        requestBody.search.parts.mod.searchfields = ["V_STRIPPED_PN"];
        requestBody.search.parts.facet = [{field: "P3900000419", values: ["1"]}];
        let partSearchResult = await PartsSearch.getPartsSearchResult(user.userAdmin, endpoints.search.parts.search, requestBody.search.parts);
        await getDataFromPartsSearch(partSearchResult);
        for(let i:number = 0; i < searchModels.V_PRT_NBR_SPR.length; i++) {
            await expect(await searchModels.V_PRT_NBR_SPR[i].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()).toContain('lm311');
            await expect(await searchModels.ROHS_FLAG[i]).toEqual('Yes');
        }
    });
});