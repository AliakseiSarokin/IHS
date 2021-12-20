export const endpoints = {
    alerts: {
        alerts: 'alerts',
        export: 'alerts/export',
        all: {
            all: 'alerts/all',
            export: 'alerts/all/export'
        }
    },

    boms: {
        boms: 'boms',
        export: 'boms/export',
        boomsRoot: 'boms/root',
        bomById: (id:string):string => {
            return `boms/${id}`
        },
        bomChildrenById: (id:string):string => {
            return `boms/${id}/children`
        },
        bomDetailsById: (id:string):string => {
            return `boms/${id}/details`
        },
        vaultSummary: 'boms/summary/vault'
    },

    bomsTree: {
        bomsTree: 'boms',
        bomsTreeExport: 'boms/export',
        bomAllChildrenById: (id:string):string => {
            return `boms/${id}/allchildren`
        },
    },

    knowledgebase: {
        mfrExport: 'knowledgebases/manufacturers/export',
        mfr: 'knowledgebases/manufacturers',
        parts: 'knowledgebases/parts',
        partsExport: 'knowledgebases/parts/export'
    },

    researchRequest: {
        export: 'research/requests/export'
    },

    search: {
        cpl: {
            export: 'cpl/export',
            cpl: 'cpl'
        },

        documents: {
            documents: 'documents',
            export: 'documents/export',
            viewRelatedPartsById: (id:string) => {
              return `documents/${id}/parts`
            },
            exportViewRelatedPartsById: (id:string) => {
                return `documents/${id}/parts/export`
            },
        },
        parametric: {
            categories: (query:string): string => {
                return `categories?inputMap=${query}`
            },
            categoriesRootChildren: 'categories/root/children',
            categoriesChildrenById: (id:number): string => {
                return `categories/${id}/children`
            },

        },
        parts: {
            exportCompare: 'parts/compare/export',
            search: 'parts'
        },

        whereUsed: {
            export: '/boms/parts/whereused/export',
            whereUsed: '/boms/parts/whereused/'
        },
    },

    workspaces: {
        workspacesBoms: 'workspaces/boms',
        workspacesParts: 'workspaces/parts',
        workspacesBomsId: (id:string):string => {
            return 'workspaces/boms/' + id
        },
        exportBoms: 'workspaces/boms/export',
        exportParts: 'workspaces/parts/export'
    },

    users: {
        users: 'group/users',
        export: 'group/users/export',
    },

    settings: {
        search: 'user/settings/search',
    }
};