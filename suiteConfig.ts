let loadSpecs = {
    all: ['./helper/beforeAfter.js',
        './test/e2e/**/**/**/*.e2e.spec.js',
    ],
    alerts: [
        './helper/beforeAfter.js',
        './test/e2e/alerts/**/**/*.e2e.spec.js'
    ],

    bomSummary: [
        './helper/beforeAfter.js',
        './test/e2e/bomVault/bomSummary/**/*.e2e.spec.js'
    ],
    bomTree: [
        './helper/beforeAfter.js',
        './test/e2e/bomVault/bomTree/**/*.e2e.spec.js'
    ],
    bomTreeParts: [
        './helper/beforeAfter.js',
        './test/e2e/bomVault/bomTreeParts/*.e2e.spec.js'
    ],
    singleBom: [
        './helper/beforeAfter.js',
        './test/e2e/bomVault/singleBom/**/*.e2e.spec.js'
    ],
    bomVault: [
        './helper/beforeAfter.js',
        './test/e2e/bomVault/bomV*/**/*.e2e.spec.js'
    ],
    partStandard: [
        './helper/beforeAfter.js',
        './test/e2e/bomVault/partStand*/**/**/*.e2e.spec.js'
    ],
    vaultSummary: [
        './helper/beforeAfter.js',
        './test/e2e/bomVault/vaultSummary/**/*.e2e.spec.js'
    ],
    cpl: [
        './helper/beforeAfter.js',
        './test/e2e/cpl/cp*/**/*.e2e.spec.js'
    ],
    deepLink: [
        './helper/beforeAfter.js',
        './test/e2e/search/deepLink/searchUsingDeeplink.e2e.spec.js',
    ],
    manufacturerPreferences: [
        './helper/beforeAfter.js',
        './test/e2e/cpl/manufacturerPrferences/**/*.e2e.spec.js'
    ],
    customAttributes: [
        './helper/beforeAfter.js',
        './test/e2e/administration/**/*Attributes.e2e.spec.js'
    ],
    customTemplates: [
        './helper/beforeAfter.js',
        './test/e2e/reports/cust*/**/*.e2e.spec.js'
    ],
    home: [
        './helper/beforeAfter.js',
        './test/e2e/home/**/**/*.e2e.spec.js'
    ],
    import: [
        './helper/beforeAfter.js',
        './test/e2e/import/**/**/*.e2e.spec.js'
    ],
    bomImport: [
        './helper/beforeAfter.js',
        './test/e2e/import/bomImport/**/*.e2e.spec.js'
    ],
    cplImport: [
        './helper/beforeAfter.js',
        './test/e2e/import/cplImport/**/*.e2e.spec.js'
    ],
    knowledgebase: [
        './helper/beforeAfter.js',
        './test/e2e/knowledgebase/**/**/*.e2e.spec.js'
    ],
    login: [
        './helper/beforeAfter.js',
        './test/e2e/login/**/**/*.e2e.spec.js'
    ],
    news: [
        './helper/beforeAfter.js',
        './test/e2e/news/**/**/*.e2e.spec.js'
    ],
    partDetails: [
        './helper/beforeAfter.js',
        './test/e2e/partDetails/**/**/*.e2e.spec.js'
    ],
    partAlternates: [
        './helper/beforeAfter.js',
        './test/e2e/partAlt*/**/**/*.e2e.spec.js'
    ],
    reports: [
        './helper/beforeAfter.js',
        './test/e2e/reports/rep*/**/*.e2e.spec.js'
    ],
    researchRequest: [
        './helper/beforeAfter.js',
        './test/e2e/researchRequests/**/**/*.e2e.spec.js'
    ],
    search: [
        './helper/beforeAfter.js',
        './test/e2e/search/**/**/*.e2e.spec.js'
    ],
    cplSearch: [
        './helper/beforeAfter.js',
        './test/e2e/search/cpl/**/*.e2e.spec.js'
    ],
    docSearch: [
        './helper/beforeAfter.js',
        './test/e2e/search/documents/**/*.e2e.spec.js'
    ],
    haystackSearch: [
        './helper/beforeAfter.js',
        './test/e2e/search/hay*/**/*.e2e.spec.js'
    ],
    mfrSearch: [
        './helper/beforeAfter.js',
        './test/e2e/search/man*/**/*.e2e.spec.js'
    ],
    parametricSearch: [
        './helper/beforeAfter.js',
        './test/e2e/search/parametric/**/*.e2e.spec.js'
    ],
    partsSearch: [
        './helper/beforeAfter.js',
        './test/e2e/search/parts/**/*.e2e.spec.js'
    ],
    whereUsedSearch: [
        './helper/beforeAfter.js',
        './test/e2e/search/whereUsed/**/*.e2e.spec.js'
    ],
    settings: [
        './helper/beforeAfter.js',
        './test/e2e/settings/**/**/*.e2e.spec.js'
    ],
    manageUsers:[
        './helper/beforeAfter.js',
        './test/e2e/administration/**/**/manageUsers.e2e.spec.js'
    ],
    viewUsers:[
        './helper/beforeAfter.js',
        './test/e2e/administration/**/**/viewUsers.e2e.spec.js'
    ],
    workspace: [
        './helper/beforeAfter.js',
        './test/e2e/workspace/**/**/*.e2e.spec.js'
    ],
    smokeRegression:[
        './helper/beforeAfter.js',
        './test/e2e/smoke/smoke.e2e.spec.js',
        './test/e2e/alerts/viewAllAlerts.e2e.spec.js',
        './test/e2e/bomVault/bomSummary/bomSummary.e2e.spec.js',
        './test/e2e/bomVault/bomTree/bomTree.e2e.spec.js',
        './test/e2e/bomVault/bomTreeParts/bomTreeParts.e2e.spec.js',
        './test/e2e/bomVault/singleBom/bomDetails.e2e.spec.js',
        './test/e2e/cpl/cpl/cplDashboard.e2e.spec.js',
        './test/e2e/cpl/manufacturerPrferences/viewMfrPreferences.e2e.spec.js',
        './test/e2e/home/**/**/*.e2e.spec.js',
        './test/e2e/import/bomImport/bomImport.e2e.spec.js',
        './test/e2e/login/loginLogout.e2e.spec.js',
        './test/e2e/partDetails/parametricSearch/*.e2e.spec.js',
        './test/e2e/partsIntel/search/parts/resultsPage.e2e.spec.js',
        './test/e2e/partAlternates/bomDetails/viewAlternates.e2e.spec.js',
        './test/e2e/reports/reports/reports.e2e.spec.js',
        './test/e2e/researchRequests/viewResReq.e2e.spec.js',
        './test/e2e/search/parts/searchPage.e2e.spec.js',
        './test/e2e/search/parts/resultsPage.e2e.spec.js'
    ],
    partsIntel: [
        './helper/beforeAfter.js',
        './test/e2e/partsIntel/**/**/*.e2e.spec.js'
    ],
    api: [
        './api/**/**/**/**/*.api.spec.js'
    ],
    siteAdmin: [
        './siteAdmin/e2e/**/**/*.e2e.spec.js',
    ],
    newGrid: [
        './helper/beforeAfter.js',
        './test/e2e/bomVault/bomSummary/**/*.e2e.spec.js',
        './test/e2e/bomVault/bomVault/**/*.e2e.spec.js',
        './test/e2e/bomVault/partStandardization/**/*.e2e.spec.js',
        './test/e2e/bomVault/singleBom/columnsSorting/*.e2e.spec.js',
        './test/e2e/bomVault/singleBom/**/bomDetails.e2e.spec.js',
        './test/e2e/bomVault/singleBom/**/bomDetailsReadOnly.e2e.spec.js',
        './test/e2e/bomVault/singleBom/**/partAlerts.e2e.spec.js',
        './test/e2e/knowledgebase/**/**/*.e2e.spec.js',
        './test/e2e/search/parametric/columnsSorting/*.e2e.spec.js',
        './test/e2e/search/parametric/**/transpose.e2e.spec.js',
        './test/e2e/search/parts/resultGrid/*.e2e.spec.js',
        './test/e2e/search/parts/**/resultsPage.e2e.spec.js',
        './test/e2e/search/parts/**/transpose.e2e.spec.js',
        './test/e2e/settings/**/**/bomImportSettings.e2e.spec.js',
        './test/e2e/settings/**/**/searchSettings.e2e.spec.js',
        './test/e2e/workspace/**/**/*.e2e.spec.js',
    ],
    pushNotification:[
        './test/e2e/administration/teamsPost.js'
    ],

}
module.exports = loadSpecs;