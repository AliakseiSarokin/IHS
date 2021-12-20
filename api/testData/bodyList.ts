import {DateTime} from "../../utils/dateTime";

export const requestBody = {
    alerts: {
        alerts: {
            count: true,
            facet: [],
            fields: [],
            filter: "",
            keyword: [],
            mod: {searchfields: [], operator: ""},
            noresults: false,
            orderby: [{field: "BM_BOM_NAME", direction: "asc"}],
            q: "",
            skip: 0,
            take: 25
        },

        alertsSortedAsk: {
            orderby: [{field: "BM_BOM_NAME", direction: "asc"}],
            take: 25
        },

        alertsSortedDesc: {
            orderby: [{field: "BM_BOM_NAME", direction: "desc"}],
            take: 25
        },

        allAlertsExportBody: (format: string): any => {
            return {
                take: 1000,
                skip: 0,
                count: false,
                meta: false,
                request: false,
                mod: {format: format, filename: "ihs_alerts"},
                facet: [],
                keyword: [{field: "BM_ALERT_DATE", operator: "greaterthanequals", values: []}],
                state: "",
                fields: [],
                orderby: [{field: "P8000000028", direction: "asc"}, {field: "P29557", direction: "asc"}],
                q: ""
            }
        },
        selectedAlertsExportBody: (format: string, id: number): any => {
            return {
                take: 1000,
                skip: 0,
                count: false,
                meta: false,
                request: false,
                mod: {format: format, filename: "ihs_alerts"},
                facet: [{field: "OBJ_ID", values: [id]}],
                keyword: [{field: "BM_ALERT_DATE", operator: "greaterthanequals", values: []}],
                state: "",
                fields: [],
                orderby: [{field: "P8000000028", direction: "asc"}, {field: "P29557", direction: "asc"}],
                q: ""
            }
        },
        all: {
            allByDays: (days:number) =>{
                return {
                    count: false,
                    facet: [{field: "P4001057687", values: ["End of Life Notice"]}, {field: "P29557", values: ["b4testuseradmin"]}],
                    fields: [],
                    filter: "",
                    keyword: [{field: "P4001057690", operator: "greaterthanequals",
                        values: [DateTime.substractDaysFromCurrentDateByFormat(days,'DD-MMM-YYYY')]}],
                    mod: {searchfields: [], operator: ""},
                    noresults: false,
                    orderby: [],
                    q: "",
                    skip: 0,
                    take: 500,
                }
            },
            exportByFormatAndDays: (format:string, days:number): any => {
                return {
                    take: 500,
                    skip: 0,
                    count: false,
                    meta: false,
                    request: false,
                    mod: {format: format, filename: "ihs_alerts_by_ID"},
                    facet: [{field: "P4001057687", values: ["End of Life Notice"]},
                        {field: "P29557", values: ["b4testadmin"]}],
                    keyword: [
                        {
                            "field":"CHANGE_DATE",
                            "operator":"equals",
                            "values":[DateTime.substractDaysFromCurrentDateByFormat(days, "DD-MMM-YYYY")]
                        },
                        {
                        field: "CF_MOD_DATE",
                        operator: "equals",
                        values: [DateTime.substractDaysFromCurrentDateByFormat(days, "DD-MMM-YYYY")]
                    }],
                    state: "",
                    fields: [],
                    orderby: [],
                    q: "",
                }
            },
            exportByFormatDaysAndAlertsId: (format:string, days:number, alertsID:string[]) => {
                return {
                    take: 500,
                    skip: 0,
                    count: false,
                    meta: false,
                    request: false,
                    mod: {format: format, filename: "ihs_alerts_by_ID"},
                    facet: [
                        {field: "P4001057687", values: ["End of Life Notice"]},
                        {field: "P29557", values: ["b4testuseradmin"]},
                        {field: "OBJ_ID", values: alertsID}
                    ],
                    keyword: [
                        {
                            "field":"CHANGE_DATE",
                            "operator":"greaterthanequals",
                            "values":[DateTime.substractDaysFromCurrentDateByFormat(days, 'DD-MMM-YYYY')]
                        },
                        {
                        field: "CF_MOD_DATE",
                        operator: "greaterthanequals",
                        values: [DateTime.substractDaysFromCurrentDateByFormat(days, 'DD-MMM-YYYY')]
                    }],
                    state: "",
                    fields: [],
                    orderby: [],
                    q: "",
                }
            }
        }
    },
    boms: {
        boms: {
            count: false,
            facet: [],
            fields: [],
            filter: "",
            keyword: [],
            mod: {searchfields: [], operator: ""},
            noresults: false,
            orderby: [{field: "BM_MOD_DATE", direction: "desc"}],
            q: "*",
            skip: 0,
            take: 50
        },

        bomIdDetails: {
            default: {"take":50,
                "skip":0,
                "count":false,
                "noresults":false,
                "filter":"",
                "q":"*",
                "fields":[],
                "mod":{"layout":"3901636108","lockipn":false},
                "orderby":[],
                "facet":[{"field":"BM_PREFERRED","values":["Y"]}],
                "keyword":[]
            },
            byIpnAndOperator: (ipn:string, operator: string) => {
                return {"take":50,
                    "skip":0,
                    "count":false,
                    "noresults":false,
                    "filter":"",
                    "q":"*",
                    "fields":[],
                    "mod":{"layout":"3901636108","lockipn":false},
                    "orderby":[],
                    "facet":[{"field":"BM_PREFERRED","values":["Y"]}],
                    "keyword": [{"field":"BM_IPN","operator": operator, "values": [ipn]}]
                }
            },
            addSinglePart:(partNumber: string, mfrName: string, id: number) => {
                return {parts:
                    [
                        {
                            BM_MFR_PRT: partNumber,
                            BM_MFR_NAME: mfrName,
                            BM_REF_PART: id
                        }
                    ]}
            },
            addSingleStatic: (ipn:string, mfr:string)=> {
                return {parts: [{BM_IPN: ipn, BM_MFR_PRT: mfr}]}
            },
            deleteParts: (ids: number[]) => {
                return {
                    OBJ_ID: ids
                }
            }

        },

        bomsSortedAsk: {
            orderby: [{field: "BM_BOM_NAME", direction: "asc"}],
            take: 50
        },

        bomsSortedDesc: {
            orderby: [{field: "BM_BOM_NAME", direction: "desc"}],
            take: 50
        },
        exportBomVaultAllBoms: {
            take: 500,
            skip: 0,
            count: false,
            meta: false,
            request: false,
            mod: {format: 'XLS', filename: 'ihs_summary'},
            facet: [],
            keyword: [],
            state: '',
            fields: [],
            orderby: [{field: 'P8000000050', direction: 'desc'}],
            q: '*'
        },

        exportBomVaultSelectedBom: (id: number): any => {
            return {
                count: false,
                facet: [{field: "BM_HDR_PTR", values: [id]}],
                fields: [],
                keyword: [],
                meta: false,
                mod: {format: "XLS", filename: "ihs_summary"},
                orderby: [{field: "P8000000050", direction: "desc"}],
                q: "*",
                request: false,
                skip: 0,
                state: "",
                take: 500
            }
        },

        bomSummaryAllExportBody: {
            count: false,
            facet: [],
            fields: [],
            keyword: [],
            meta: false,
            mod: {format: "xls", filename: "BOMSummary"},
            orderby: [{field: "P8000000050", direction: "desc"}],
            q: "",
            request: false,
            skip: 0,
            state: "",
            take: 200
        },

        bomSummaryExportBodyById: (id: number): any => {
            return {
                count: false,
                facet: [{field: "BM_HDR_PTR", values: [id]}],
                fields: [],
                keyword: [],
                meta: false,
                mod: {format: "xls", filename: "BOMSummary"},
                orderby: [],
                q: "",
                request: false,
                skip: 0,
                state: "",
                take: 0
            }
        },

        bomTreeExportBody: (id: number): any => {
            return {
                take: 0,
                skip: 0,
                count: false,
                meta: false,
                request: false,
                mod: {format: "XLS", filename: "ihs_summary"},
                facet: [{field: "BM_HDR_PTR", values: [id]}],
                keyword: [],
                state: '',
                fields: [],
                orderby: [],
                q: ''
            }
        },


    },
    knowledgebase: {
        mfr: {
            count: false,
            facet: [],
            fields: [],
            filter: "",
            keyword: [],
            mod: {searchfields: [], operator: ""},
            noresults: false,
            orderby: [{field: "BM_MOD_DATE", direction: "desc"}],
            q: "",
            skip: 0,
            take: 25,
        },
        parts: {
            count: false,
            facet: [],
            fields: [],
            filter: "",
            keyword: [],
            mod: {searchfields: [], operator: ""},
            noresults: false,
            orderby: [{field: "BM_MOD_DATE", direction: "desc"}],
            q: "",
            skip: 0,
            take: 25
        },
        exportMfrByFormat:(format: string) => {
            return {
                count: false,
                facet: [],
                fields: [],
                keyword: [],
                meta: false,
                mod: {format: format, filename: "manufacturers_kb"},
                orderby: [{direction: "desc", field: "P8000000120"}],
                request: false,
                q: "",
                skip: 0,
                state: "",
                take: 500,
            }
        },
        exportPartsByFormat:(format: string) => {
            return {
                count: false,
                facet: [],
                fields: [],
                keyword: [],
                meta: false,
                mod: {format: format, filename: "parts_kb"},
                orderby: [{direction: "desc", field: "P8000000106"}],
                request: false,
                q: "",
                skip: 0,
                state: "",
                take: 500,
            }
        },
        exportMfrByFormByIdList:(format: string, idList: string[]) => {
            return {
                count: false,
                facet: [{field: "OBJ_ID", values: idList}],
                fields: [],
                keyword: [],
                meta: false,
                mod: {format: format, filename: "manufacturers_kb"},
                orderby: [{direction: "desc", field: "P8000000120" }],
                request: false,
                q: "",
                skip: 0,
                state: "",
                take: 500,

            }
        },
        exportPartsByFormByIdList:(format: string, idList: string[]) => {
            return {
                count: false,
                facet: [{field: "OBJ_ID", values: idList}],
                fields: [],
                keyword: [],
                meta: false,
                mod: {format: format, filename: "parts_kb"},
                orderby: [{direction: "desc", field: "P8000000106"}],
                request: false,
                q: "",
                skip: 0,
                state: "",
                take: 500,

            }
        }

    },
    parts: {
        parts: {
            count: false,
            facet: [],
            fields: [],
            filter: "",
            keyword: [],
            meta: false,
            mod: null,
            orderby: [],
            q: "",
            request: false,
            skip: 0,
            state: "",
            take: 50
        },
    },
    researchRequest: {
        exportByFormat: (format:string) => {
            return {
                count: false,
                facet: [],
                fields: [],
                keyword: [],
                meta: false,
                mod: {format: format, filename: "ResearchRequestResultsExport"},
                orderby: [{field: "CF_CREATE_TIME", direction: "desc"}],
                q: "",
                request: false,
                skip: 0,
                state: "",
                take: 10
            }
        }
    },
    search: {

        parts: {
            count: false,
            facet: [],
            fields: [],
            keyword: [],
            meta: false,
            mod: {operator: "startswith", searchfields: ["V_STRIPPED_PN"], layout: "3901637792", matchcpl: null},
            orderby: [],
            q: "",
            request: false,
            skip: 0,
            state: "",
            take: 500,
        },

        cpl: {
            cplByQuery: (query:string) => {
                return {
                    count: false,
                    facet: [],
                    fields: [],
                    filter: "",
                    keyword: [],
                    mod: {searchfields: [], operator: ""},
                    noresults: false,
                    orderby: [],
                    q: query,
                    skip: 0,
                    take: 25
                }
            },

            exportAllByFormatByQuery:(format:string, query:string) => {
                return {
                    count: false,
                    facet: [],
                    fields: [],
                    keyword: [],
                    meta: false,
                    mod: {format: format, filename: "ihs-cpl-export", layout: 'Default'},
                    orderby: [],
                    q: query,
                    request: false,
                    skip: 0,
                    state: "",
                    take: 1000,
                }
            },

            exportSelectedByPartIdFormatAndQuery: (partsID: string[], format:string, query: string) => {
                return { count: false,
                    facet: [{field: "OBJ_ID", values: partsID}],
                    fields: [],
                    keyword: [],
                    meta: false,
                    mod: {format: format, filename: "ihs-cpl-export", layout: 'Default'},
                    orderby: [],
                    q: query,
                    request: false,
                    skip: 0,
                    state: "",
                    take: 1000,
                }
            }
        },
        documents: {
            defaultSearchByQuery: (query:string) => {
                return {
                    count: false,
                    facet: [{field: "S_GPH_TYPE", values: ["DS1", "ART1"]}],
                    fields: [],
                    filter: "",
                    keyword: [],
                    mod: {searchfields: [], operator: ""},
                    noresults: false,
                    orderby: [{field: "S_GPH_CO_DATE", direction: "desc"}],
                    q: query,
                    skip: 0,
                    take: 25
                }
            },
            exportDefaultSearchByFormatAndQuery: (format:string, query:string) => {
                return {
                    count: false,
                    facet: [{field: "P30203", values: ["DS1", "ART1"]}],
                    fields: [],
                    keyword: [],
                    meta: false,
                    mod: {format: format, filename: "ihs_docsearchresults"},
                    orderby: [{field: "P30216", direction: "desc"}],
                    q: query,
                    request: false,
                    skip: 0,
                    state: "",
                    take: 1000}
            },
            viewRelatedParts: {
                count: false,
                facet: [],
                fields: [],
                filter: "",
                keyword: [],
                mod: {matchcpl: true},
                noresults: false,
                orderby: [],
                q: "",
                skip: 0,
                take: 25,
            },
            exportViewRelatedPartsByFormat: (format:string) => {
                return {
                    count: false,
                    facet: [],
                    fields: [],
                    keyword: [],
                    meta: false,
                    mod: {format: format, filename: "ihs_results", layout: "Default"},
                    orderby: [],
                    q: "",
                    request: false,
                    skip: 0,
                    state: "",
                    take: 1000
                }
            },
            exportViewRelatedPartsByFormatById: (format:string, idList:string[]) => {
                return {
                    count: false,
                    facet: [{field: "OBJ_ID", values: idList}],
                    fields: [],
                    keyword: [],
                    meta: false,
                    mod: {format: format, filename: "ihs_results", layout: "Default"},
                    orderby: [],
                    q: "",
                    request: false,
                    skip: 0,
                    state: "",
                    take: 1000,
                }
            }
        },
        exportComparePartsByIdList:(idList: string[]) => {
            return {
                count: false,
                facet: [{field: "OBJ_ID", values: idList}],
                fields: [],
                keyword: [],
                meta: false,
                mod: {format: "XLS", filename: "ihs_compare"},
                orderby: [],
                q: "",
                request: false,
                skip: 0,
                state: "",
                take: 0,
            }
        },
        whereUsed: {
            exportAllByFormat: (format: string): any => {
                return {
                    count: false,
                    facet: [],
                    fields: [],
                    keyword: [{field: "P8000000005", operator: "equals", values: ["1"]}],
                    meta: false,
                    mod: {format: format, filename: "ihs_whereused", layout: "Default"},
                    orderby: [],
                    q: "",
                    request: false,
                    skip: 0,
                    state: "",
                    take: 500
                }
            },
            exportBySelectedItemByFormat: (format:string, id:string) => {
                return {
                    count: false,
                    facet: [{field: "OBJ_ID", values: [id]}],
                    fields: [],
                    keyword: [{field: "P8000000005", operator: "equals", values: ["1"]}],
                    meta: false,
                    mod: {format: format, filename: "ihs_whereused", layout: "Default"},
                    orderby: [],
                    q: "",
                    request: false,
                    skip: 0,
                    state: "",
                    take: 500,
                }
            },
            whereUsedByFieldOperatorAndValue: (field: string, operator: string, value: string) => {
                return {
                    count: false,
                    facet: [],
                    fields: [],
                    filter: "",
                    keyword: [{field: field, operator: operator, values: [value]}],
                    mod: {searchfields: [], operator: ""},
                    noresults: false,
                    orderby: [],
                    q: "",
                    skip: 0,
                    take: 25,
                }
            }
        },
    },
    workspaces: {
        boms: (bomId: number): object => {
            return {WS_ITEM_ID: [bomId]}
        },
        deleteBoms: (bomId: number): object => {
            return {OBJ_ID: [bomId]}
        },
        parts: (bomId: number): object => {
            return {WS_ITEM_ID: [bomId]}
        },
        exportBoms: {
            count: false,
            facet: [],
            fields: [],
            filter: "",
            keyword: [],
            mod: {format: "XLS"},
            noresults: false,
            orderby: [],
            q: "",
            skip: 0,
            take: 0
        },
        exportParts: {
            count: false,
            facet: [],
            fields: [],
            filter: "",
            keyword: [],
            mod: {format: "XLS"},
            noresults: false,
            orderby: [],
            q: "",
            skip: 0,
            take: 0,
        }
    },
    users: {
        users: {
            count: false,
            facet: [],
            fields: [],
            keyword: [],
            meta: false,
            mod: {layout: "online"},
            orderby: [],
            q: "",
            request: false,
            skip: 0,
            state: "",
            take: 500
        },

        allUsersExportBody: (format: string, layout: string): any => {
            return {
                count: false,
                facet: [],
                fields: [],
                keyword: [],
                meta: false,
                mod: {format: format, filename: "ihs_users", layout: layout},
                orderby: [],
                q: "",
                request: false,
                skip: 0,
                state: "",
                take: 0
            }
        },

        selectedUsersExportBody: (format: string, id: number, layout: string): any => {
            return {
                count: false,
                facet: [{field: "OBJ_ID", values: [id]}],
                fields: [],
                keyword: [],
                meta: false,
                mod: {format: format, filename: "ihs_users", layout: layout},
                orderby: [],
                q: "",
                request: false,
                skip: 0,
                state: "",
                take: 0
            }
        }
    },

    settings: {
        search: {
            alternateQualifications: {'AEC-Q100': false, 'AEC-Q101': false, 'AEC-Q200': false, 'DLA': false},
            alternateTypes: {similar: false, formFitFunction: true, functional: false, direct: true},
            distributorInfo: "all",
            gridType: "rowsColumns",
            id: "15245929288",
            ignoreSpecialChars: true,
            itemsPerPage: 25,
            keywordSearch: "and",
            layoutView: "Default",
            matchCpl: false,
            partNumberSearch: "startswith",
            qualifications: {'AEC-Q100': false, 'AEC-Q101': false, 'AEC-Q200': false, 'DLA': false},
        },
    },
};