import {Random} from "../utils/random";

const random: Random = new Random();

export const searchItems: any = {
    leftNav: {
        parts: 'Parts',
        parametric: 'Parametric',
        documents: 'Documents',
        cpl: 'CPL',
        whereUsedParts: 'Where Used Parts',
        whereUsedSubstances: 'Where Used Substances',
        manufacturer: 'Manufacturer',
        haystack: 'Haystack'
    }
};

export const quickSearchData = {
    typeLabels: ['Part # Starts With', 'Part # Contains', 'Exact Part #', 'Keyword Search','ObjectID Search']
};

export const haystackSearchConst = {
    partNumberInputGhostText: 'Enter part number...',
    nsnInputGhostText: 'Enter NSN or NIIN. E.g., 5961-00-001-8811, 000018811',
    vendorInputGhostText: 'Enter Vendor Name or CAGE Code...',
    vendorFieldLabel: 'Vendor Name or CAGE Code:',
    partNumberIntrText: 'Search by one or more alphanumeric characters. Select' +
    ' a manufacturer from the Vendor Name or CAGE Code type-ahead to further ' +
    'refine your part number search. You may also search for a manufacturer on its own.',
    nsnInstrText: 'Search by NSN (National/NATO Stock Number) or NIIN (National/NATO ' +
    'Item Identification Number). You may search by the full NSN or NIIN, either with' +
    ' our without hyphens. For example, 5935-00-534-7553, 5935005347553, 00-534-7553 or ' +
    '005347553 will all return the same result.',
    searchValue: '2',
    searchValue2: '1',
    partNumberForCageCode: '0515-1121',
    cageCodeSearchValue: '28480',
    partNumberFuzzySearchValue: 'DICOR',
    nsnFuzzySearchValue: 'sdfsdfsdf',
    nsnValidSearchCriteria: '5935-00-534-7553',
    fuzzyModalText: 'No matches were found. Would you like to search all of Haystack for a match?',
    noMatchFuzzyModalTitile: 'No Haystack Results Found',
    noMatchFuzzyModalText: 'No matching Haystack results were found. Please modify your search term(s) and try again.',
    fuzzyModalPartNumberCageCode: function (partNumber, cageCode) {
        return 'Part Number: ' + partNumber + ' and CAGE Code: ' + cageCode
    },
    fuzzyModalPartNumber: function (partNumber) {
        return 'Part Number: ' + partNumber
    },
    fuzzyModalPartNsn: function (nsn) {
        return 'NSN or NIIN: ' + nsn
    },
    haystackSliderTitle: 'Haystack/DoD Logistics Data',
    haystackSliderNsnLabel: function (value) {
        return 'NSN: ' + value
    },
    haystackSliderNameLabel: function (value) {
        return 'Name: ' + value
    },
    segmentAAtrributes: ['FSC', 'NIIN', 'Item Name', 'INC', 'CRIT',
        'ISC', 'Status', 'TIIC', 'RPDMRC', 'ADP', 'DEMIL',
        'DEMIL Integrity Code', 'HMIC', 'ESDEMI',
        'PMI', 'Schedule B', 'ENAC', 'Assign Date'],
    cageDataAttributes: ['Company Name', 'CAGE Code', 'Associated CAGE Code', 'Address1', 'Address2',
        'City', 'State/Prov', 'ZIP/Postal Code', 'Country', 'Phone Number', 'FAX',
        'SIC Code', 'NAICS Code', 'DUNS Number', 'Business Size', 'Business Category',
        'Company Status', 'Type of Organization', 'CAO', 'Woman Owned', 'Business Type Code'],
    segmentA: 'Segment A',
    mclr: 'MCRL (',
    mlc: 'ML-C (',
    cageData: 'CAGE Data',
    parametric: 'Parametric',
    procurement: 'Procurement',
    qpd: 'QPD',
    mclrColumnHeaders: ['RNCC', 'RNVC', 'RNFC', 'RNJC', 'RNSC', 'RNAAC',
        'SADC', 'DAC', 'HCC', 'MSDSID', 'CAGE Code', 'Vendor Name', 'dsfs'],
    mlcColumnHeaders: ['SA', 'SOS', 'MCD', 'COG', 'UI', 'UI Conversion', 'QUP',
        'AAC', 'SLC', 'RC', 'CIIC', 'Effective Date', 'USC', 'Price'],
    parametricColumnHeaders: ['MRC', 'Requirement', 'Reply'],
    procuramentColumnHeaders: ['Date', 'Contract Number', 'X1', 'X2', 'X3', 'SOS', 'Quantity',
        'Price', 'Total', 'UI', 'CAGE Code', 'Vendor Name'],
    qpdColumnHeaders: ['NSN', 'Govt Designation', 'Manufacturer\'s Designation', 'Test or Qualification Reference',
        'Manufacturer\'s Name', 'CAGE Code', 'QPL Number', 'Title', 'Governing Specification Number', 'Document Status',
        'QA', 'Document Date', 'Last Update Date'],
    sliderPrintTitle: 'BOM Intelligence - Haystack Data Print Preview',
    sliderPrintSubTitle: 'Haystack Data Details',
    searchResultsGrid: ['NSN', 'ISC', 'Item Name', 'INC', 'Part Number', 'RNCC', 'RNVC', 'CAGE Code', 'Vendor Name', 'Latest ML-C Price'],

};

export const commonSearch = {
    fuzzySearchModalTitle: 'No Results Found',
    fuzzySearchValue: 'dfgdfgdfgdfg',
    commonValue: 'lm311',
    partWithoutDatasheet: 'RNC55C3520BS',
    partWithMfrSuggestedAlternates: 'CHV1808A2K0272FCT-LF',
    validPartNUmberContainsValue: '1234',
    validExactPartNumberValue: 'NBXDPA019LNHTAG',
    validKeywordValue: 'test',
    specialCharactersSearchValue: `~$\`\'@%^&()-_={}\\[]:;<>/|"?.`,
    cplSearch: 'IDCS7328ER330M',
    savedSearchTypes: ['All Types', 'Show Part Number Searches', 'Show Document Searches', 'Show Parametric Searches',
        'Show Where Used Searches', 'Show Manufacturer Searches', 'Show CPL Searches', 'Show Haystack Searches'],
    savedSearchTypesPI: [ 'All Types', 'Show Part Number Searches', 'Show Document Searches', 'Show Parametric Searches',
        'Show Manufacturer Searches', 'Show CPL Searches', 'Show Haystack Searches' ],
    partsLayout: ['Default', 'Life Cycle', 'Environmental', 'Combined'],
    groupTitle: ['IHS Defined'],
    parametricLayout: ['Default', 'Add Risk Attributes'],
    comparePartsSubtitle: function (number: string) {
        return 'Compare ' + number + ' Parts from Part Search Results'
    },
    comparePartsAlternatesSubtitle: function (number: string) {
        return 'Compare ' + number + ' Parts from Alternates Results'
    },
    compareBomDetailsSubtitle: function (number: string) {
        return 'Compare ' + number + ' Parts from BOM Details'
    },
    searchArray: ['lm311', 'lm312', 'lm313', 'lm314', 'lm315'],
    haystackSearchArray: ['lm311', 'lm313', '123', '1234', '12345'],
    mfrSearchArray: ['1', '2', '3', '4', '5'],
    de84896searchCriteria: 'thyXR-2207M.mn | WE2n22TR | we234rty | ASXR-2207DGFD',
    fuzzyInstrText2: 'Fuzzy search did not find any meaningful results. Please modify your part number search string.\n' +
    'If you feel your part number search was correct and would like to add this part to the database, create a Research Request',
    fuzzyInstrText: 'No parts found, would you like to have the application try fuzzy part matching using your search string?',
    manageLayout: {
        applySupplyChainAttributes: ['Avg Price', 'Avg Lead Time', 'Available Inventory', 'Total Inventory'],
        newCustomLayoutName: random.randomTextGenerator(10),
        sharedValues: ['IHS Defined',
            'Shared Layouts'],
        defaultValues: ['IHS Defined',
            'My Layouts'],
        defineValue: ['IHS Defined'],
        sharedCPLValues: ['IHS Defined',
            'Shared CPL Layouts'],
        defaultCPLValues: ['IHS Defined',
            'My CPL Layouts'],
        defaultValuesWithShared: ['IHS Defined',
            'My Layouts','Shared Layouts'],
    },
    savedSearchName: random.randomTextGenerator(10),
    spacesValue: '       ',
    modalTitleText_1: 'No Results Found',
    modalTitleText_2: 'Notification',
    modalTitleText_3: 'Error Notification',
    modalBodyText_1: 'A Part Number Contains search does not support the use of the Boolean OR search operator. ' +
    'Please limit your search to a single part number, or change your search type to Part # Starts With or Exact Part #',
    modalBodyText_2: 'Attribute sorting cannot be used because the number of parts in the result set is too large. ' +
    'Please define additional search criteria to reduce the number of parts.',
    modalBodyCritariaText_1: "Part number (exact) = ",
    modalBodyCritariaText_2: "Part number (starts with) = ",
    modalBodyCritariaText_3:  "Part Number: ",
    modalBodyQuestionText_1: "No parts found, would you like to have the application try fuzzy part matching using your search string?",
    modalBodyQuestionText_2: "No matches were found. Would you like to search all of Haystack for a match?",
    modalBodyTextEnterAlphanumeric: "Please enter at least one alphanumeric character to perform Exact Part# search.",
    modalNoDatasheetForThisPart: 'There are no datasheets for this part.'
};

export const whereUsedSearchConst: any = {
    searchCriteria: '1',
    searchCriteria2: '2',
    exactIpnTwoFieldsSearchCriteria: ['1', 'PN057817'],
    exactMatchMfrPNTwoFieldsSearchCriteria: ['1', '200-MR'],
    exactIportedMfrNameTwoFieldsSearchCriteria: ['1', 'DATA DISPLAY PRODUCTS'],
    searchCriterias: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
    dropdownValues: ['Exact', 'Starts With'],
    fullColumnNames: ['Matched Manufacturer Part Number', 'Imported Manufacturer Part Number', 'Imported Manufacturer Name',
        'Matched Manufacturer Name']
};

export const whereUsedSubstancesSearchConst: any = {
    searchIn: 'Search in:',
};

export const cplSearchConst: any = {
    searchCriteria: '1234',
    searchCriteria2: '123',
    infoSectionText: 'The CPL Keyword Search searches across the corporate part number, corporate manufacturer name, ' +
    'corporate part description, manufacturer part number, manufacturer name, and manufacturer part description.' +
    '\nThe minimum search term is 4 characters.',
    viewSearchCriteriaParams: 'keyword: ',
};

export const mfrSearchConst: any = {
    searchCriteria: '123',
    sliderLeftNavItems: ['Manufacturer Information', 'Part Categories', 'Authorized Distributor Locations', 'Transfer Information'],
    sliderExportDropdownOptions: ['Export All', 'Export Manufacturer Information', 'Export Part Categories',
        'Export Authorized Distributor Locations'],
    // searchCriteria2: '123',
    // infoSectionText: 'The CPL Keyword Search searches across the corporate part number, corporate manufacturer name, ' +
    // 'corporate part description, manufacturer part number, manufacturer name, and manufacturer part description.' +
    // '\nThe minimum search term is 4 characters.',
    // viewSearchCriteriaParams: 'keyword:',
};

export const docSearchConst: any = {
    searchCriteria: 'lm311',
    searchCriteriaWithViewReatedParts: 'km311',
    searchCriteria2: 'km435',
    searchCriterias: ['0', '1', '2', '3', '4', '5', '6', '7', '8', 'TEXAS'],
    searchCriteriasLabels: ['Keyword:', 'Document Types:', 'Additional Filters:', 'Manufacturer Name:', 'Manufacturers:'],
    searchCheckboxLabels: ['Datasheets', 'PCN, EOL, PDN, and other notices', 'Environmental',
        'Packaging / Ordering Information', 'Addendum / Errata'],
};

export const partsSearchConst: any = {
    searchCriteria: '123sdfdsf',
};