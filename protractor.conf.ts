import {browser, Config} from "protractor";
declare const allure: any;
import {initializeReporters} from "./config/reporters";
var suiteConfig = require('./suiteConfig.js');
import * as process from "process";

export let config: Config = {
    directConnect: true,
    selenium_promise_manager: 0,
    allScriptsTimeout: 60000,
    nativeEvents: false,
    capabilities: {
        // shardTestFiles: true,
        // maxInstances: 2,
        'browserName': 'chrome',
        'platform': 'ANY',
        'version': '11',
        'loggingPrefs': {
            'browser': 'ALL',
            'performance': 'ALL'
        },

        chromeOptions: {
            perfLoggingPrefs: {
                'enableNetwork': true,
                'enablePage': false,
            },
            'args': ['disable-infobars=true',
                'safebrowsing-disable-download-protection',
                '--disable-impl-side-painting',
                '--disable-gpu',
                // '--headless',
                '--no-sandbox',
                '--window-size=1920x1080',
            ],
            prefs: {
                'safebrowsing' : {
                    'enabled' : true,
                    'disable_download_protection': true,
                },
                'download': {
                    'extensions_to_open': 'xml',
                    'behavior': 'allow',
                    'directory_upgrade': true,
                    'prompt_for_download': false,
                    'default_directory': __dirname + '\\utils\\output\\downloads\\'
                },
            }
        }
    },
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    specs: [
        './helper/beforeAfter.js',
        './test/e2e/admi*/**/**/*.e2e.spec.js',
        './test/e2e/aler*/**/**/*.e2e.spec.js',
        './test/e2e/bomV*/**/**/*.e2e.spec.js',
        './test/e2e/cpl*/**/**/*.e2e.spec.js',
        './test/e2e/home*/**/**/*.e2e.spec.js',
        './test/e2e/imp*/**/**/*.e2e.spec.js',
        './test/e2e/knowle*/**/**/*.e2e.spec.js',
        './test/e2e/log*/**/**/*.e2e.spec.js',
        './test/e2e/new*/**/**/*.e2e.spec.js',
        './test/e2e/partAl*/**/**/*.e2e.spec.js',
        './test/e2e/partDe*/**/**/*.e2e.spec.js',
        './test/e2e/re*/**/**/*.e2e.spec.js',
        './test/e2e/se*/**/**/*.e2e.spec.js',
        './test/e2e/works*/**/**/*.e2e.spec.js',

    ],

    exclude: [
        //'./test/e2e/smoke/**/**/*.e2e.spec.js',
       // './test/e2e/bomVault/partStand*/colum*/**/*.e2e.spec.js',
        './test/e2e/search/deepLink/searchUsingDeeplink.e2e.spec.js',
        './siteAdmin/e2e/**/**/*.e2e.spec.js',
    ],

    suites:{
        all: suiteConfig.all,
        alerts: suiteConfig.alerts,
        bomSummary: suiteConfig.bomSummary,
        bomTree: suiteConfig.bomTree,
        bomTreeParts: suiteConfig.bomTreeParts,
        singleBom: suiteConfig.singleBom,
        bomVault:suiteConfig.bomVault,
        partStandard: suiteConfig.partStandard,
        vaultSummary: suiteConfig.vaultSummary,
        cpl: suiteConfig.cpl,
        deepLink: suiteConfig.deepLink,
        manufacturerPreferences: suiteConfig.manufacturerPreferences,
        customAttributes: suiteConfig.customAttributes,
        customTemplates: suiteConfig.customTemplates,
        home: suiteConfig.home,
        import: suiteConfig.import,
        bomImport: suiteConfig.bomImport,
        cplImport: suiteConfig.cplImport,
        knowledgebase: suiteConfig.knowledgebase,
        login: suiteConfig.login,
        news: suiteConfig.news,
        partDetails: suiteConfig.partDetails,
        partAlternates:suiteConfig.partAlternates,
        reports: suiteConfig.reports,
        researchRequest: suiteConfig.researchRequest,
        search: suiteConfig.search,
        cplSearch: suiteConfig.cplSearch,
        docSearch: suiteConfig.docSearch,
        haystackSearch: suiteConfig.haystackSearch,
        mfrSearch: suiteConfig.mfrSearch,
        parametricSearch: suiteConfig.parametricSearch,
        partsSearch: suiteConfig.partsSearch,
        whereUsedSearch: suiteConfig.whereUsedSearch,
        settings: suiteConfig.settings,
        manageUsers:suiteConfig.manageUsers,
        viewUsers:suiteConfig.viewUsers,
        workspace: suiteConfig.workspace,
        smoke: suiteConfig.smokeRegression,
        partsIntel:suiteConfig.partsIntel,
        api: suiteConfig.api,
        siteAdmin: suiteConfig.siteAdmin,
        newGrid: suiteConfig.newGrid,
        pushNotification:suiteConfig.pushNotification,
    },

    baseUrl: 'http://4dsqa.ihs.com/',

    params: {
        waitWebElementMaxTimeout: 50000,
        maxElementWaitTime: 120000,
        defaultElementWaitTime: 120000,
        userAdminUrl: 'bom-intelligence/?username=b4testuseradmin&password=b4testuseradmin#/home',
        groupAdminUrl:  'bom-intelligence/?username=b4testadmin&password=b4testadmin#/home',
        groupAdminUrl1:  'bom-intelligence/?username=b4testadmin&password=b4testadmin#/home',
        regularUserUrl: 'bom-intelligence/?username=b4testuser&password=b4testuser#/home',
        restrictedUserUrl: 'bom-intelligence/?username=b4testrestricted&password=b4testrestricted#/home',
        kbAdminUserUrl: 'bom-intelligence/?username=b4testkbadmin&password=b4testkbadmin#/home',
        readOnlyUserUrl: 'bom-intelligence/?username=b4testreadonly&password=b4testreadonly#/home',
        notAuthorised: 'bom-intelligence/?username=not_authorized&password=not_authorized#/home',
        userAdminUrlPI: 'parts-intelligence/?username=b4testuseradmin&password=b4testuseradmin#/search/parts',
        groupAdminUrlPI:  'parts-intelligence/?username=b4testadmin&password=b4testadmin#/search/parts',
        regularUserUrlPI: 'parts-intelligence/?username=b4testuser&password=b4testuser#/search/parts',
        restrictedUserUrlPI: 'parts-intelligence/?username=b4testrestricted&password=b4testrestricted#/search/parts',
        kbAdminUserUrlPI: 'parts-intelligence/?username=b4testkbadmin&password=b4testkbadmin#/search/parts',
        readOnlyUserUrlPI: 'parts-intelligence/?username=b4testreadonly&password=b4testreadonly#/search/parts',
        notAuthorisedPI: 'parts-intelligence/?username=not_authorized&password=not_authorized#/home',
        domain: '',
    },

    onPrepare: async () => {
        browser.params.domain = browser.baseUrl+ '.ihsglobal.local';
        browser.manage().window().maximize();
        await initializeReporters();
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 120000,
    }

};