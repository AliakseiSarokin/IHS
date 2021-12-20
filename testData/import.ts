import {Random} from "../utils/random";
const random: Random = new Random();
export const importItems = {
    saveConfigName: 'Automation Tests Config',
    bomImportName: random.randomTextGenerator(10),
    cancelModalTitle: 'Cancel BOM Import?',
    cancelModalText:  [ 'Are you sure you want to CANCEL this BOM Import?',
        'Click YES to cancel this import and start again.',
        'Click NO to return to the BOM Import process and continue the import.' ],
    removeModalText: 'NOTE: clicking CLEAR will clear the selected ' +
        'BOM File and disable selections. Selections will be enabled if you select another file.',
    removeModalTitle: 'Clear File',
    invalidBomNameModalTitle: 'Invalid BOM Name',
    invalidBomNameModalText: 'The BOM name cannot be blank or "Vault". Please enter a valid name for this BOM.',
    leaveModalTitle: 'Leave this page?',
    leaveModalText: 'Are you sure you want to leave without importing your BOM?',
    column1: 'MFR',
    column2: 'Part Number',
    column3: 'Internal Part Number',
    validEmail: 'test@test.te',
    secondSheetName: ' Sheet2 (3 rows) ',
    thirdSheetName: ' Sheet3 (3 rows) ',
    worksheetErrorMessage: 'The Worksheet names in the import file do not match the original import file or configuration selected. Please select the correct worksheet from the dropdown.',
    optionTitles: {
        bomImport: {
            optionTitles: [ 'Destination Folder', 'Column Mapping', 'Alert Notifications',
                'Import Options', 'CPL Match Options',  'Optional Attributes'],
                alertNotifications: 'Alert Notifications',
            importOptions: 'Import Options',
        },
    },
};