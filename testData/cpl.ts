export const cplImportData = {
    settingTitles: ['CPL Import Type', 'Column Mapping', 'CPL Alert Notifications', 'CPL Import Options'],
    settingTypeModalText: ['Any existing Corporate Parts will be deleted and replaced with the part records in the CPL' +
    ' import file. This includes any CPL change history items. Do you want to replace the CPL?', 'Parts from the CPL' +
    ' import file are added to the existing CPL. If a Corporate Part record from the import file matches an existing Corporate' +
    ' Part (based upon the Corp P/N, Corp Name, Mfr P/N, and Mfr Name), it will be skipped during import.', 'New Corporate' +
    ' Parts from the import file are added to the existing CPL. If a Corporate Part from the import file matched an existing' +
    ' Corp Part (based upon the Corp P/N, Corp Name, Mfr P/N, and Mfr Name), any non-null, mapped columns of data from' +
    ' the import file will be updated in the CPL. Use the "Update" option to merge CPL data from multiple import files' +
    ' into a single CPL in BOM Intelligence.'],
};

export const viewMfrPrefData = {
    import: {
        columnMappingOptions: ['Mfr Name', 'Imported Manufacturer ID',
            'Comments', 'prashanth', 'Baliga', 'Not Mapped'],
    },
    viewMfrPref: {
        mfrNameForTesting: 'ZTEST',
    }
};

export const cplData = {
    noMatchesTry: 'No Matches. Try Search...',
    matchMfr: {
        filterOptions: ['Clear Filter', 'Show matched manufacturers',
            'Show all unmatched manufacturers', 'Show manufacturers with 1 possible match found',
            'Show manufacturers with multiple possible matches found', 'Show manufacturers with no matches'],
    },
    matchParts: {
        filterOptions: ['Clear Filter', 'Show all unmatched parts',
            'Show parts with 1 possible match found', 'Show parts with multiple possible matches found',
            'Show parts with no matches'],
    }
};