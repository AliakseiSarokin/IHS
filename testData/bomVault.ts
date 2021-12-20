import {Random} from "../utils/random";

const random: Random = new Random();
export const bomVaultData = {
    bomVault: {
        modifyOwnerShadeUserList: [
            'b4testuser (b4testuser)',
            'BOM4 Test Group Admin (b4testadmin)',
            'BOM4 Test KB Admin (b4testkbadmin)',
            'BOM4 Test Restricted (b4testrestricted)',
            'BOM4 Test User Admin (b4testuseradmin)'
        ],
        filters: ['Clear Filter', 'View Only My BOMs', 'View BOMs Imported/Modified Today',
            'View BOMs Imported/Modified Yesterday', 'View BOMs Imported/Modified in the Last 7 days',
            'View BOMS that have not been modified in the last 30 days',
            'View BOMs that have not been modified in the last 60 days', 'View Only BOMs that Have Been Edited (History)',
            'View Only BOMs with Part Exceptions', 'View Only BOMs with Manufacturer Exceptions'],
    },
    attributes: {
        newBomName: random.randomTextGenerator(5),
        newDesc: random.randomTextGenerator(10),
        newEmail: 'newemailtest' + random.randomTextGenerator(4) + (new Date().getTime()).toString(6) + '@test.com',
    },
    bomTree: {
        newFolderDesc: 'test',
        newFolderName: '1111',
        modifiedFolderName: '2222',
    },
    vaultSummary: {
        tableHeaders: ['Summary Data', 'Alerts Summary', 'BOMs by Owner'],
        summaryDataHeaders: ['Summary Data Type', 'Count'],
        summaryDataKeys: ['Total number of BOMs loaded', 'Unique number of imported manufacturer parts',
            'Unique number of matched manufacturer parts', 'Unique number of Active parts',
            'Unique number of EOL parts', 'Unique number of NRFND parts',
            'Unique number of Active-Unconfirmed or Active-Contact Mfr parts',
            'Unique number of Discontinued parts without Alternates',
            'Unique number of Discontinued parts with Alternates', 'Unique number of Unmatched Parts',
            'Unique number of parts with Exceptions', 'Unique number of EU RoHS Compliant parts',
            'Unique number of China RoHS Compliant parts', 'Unique number of REACH Compliant parts'],
        alertSummaryHeaders: ['Alert Type', 'All BOMs', 'Email Notifications'],
        alertSummaryValues: ['- Unique number of notices', '- Total number of parts impacted', '- Total number of lists impacted',
            '- Unique number of notices', '- Total number of parts impacted',
            '- Total number of lists impacted', '- Unique number of notices',
            '- Total number of parts impacted', '- Total number of lists impacted',
            '- Unique number of notices', '- Total number of parts impacted', '- Total number of lists impacted'],
        alertSummarySubHeaders: ['End of Life Notices this week', 'Part Status Changes this week',
            'Product Change Notices this week', 'Product Failure/Counterfeit Notices this week'],
        bomsByOwnerHeaders: ['BOM Owner Name', 'Total Count of BOMs'],

    }
};