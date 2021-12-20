import {Random} from "../utils/random";

const random: Random = new Random();
export const reportsData = {
    reports: {
        reportName: random.randomTextGenerator(10),
        standardReportsList: ['BOM Analysis', 'Part Type Analysis', 'Alert Details', 'Alert Summary',
            'Predicted Status', 'AML Predicted Status', 'Potential Sourcing Issues', 'SO Predicted Status',
            'SO Potential Sourcing', 'SO Part Type', 'Indentured LC Health', 'Indentured Predicted Status Report Tables',
            'Indentured Predicted Status Report Charts', 'Single BOM Dashboard'],
        stepTitles: ['Step 1: Choose from Standard or' +
        ' Advanced report templates', 'Step 2: Enter a name for ' +
        'this report', 'Step 3: Select BOMs to include in this report',
            'Step 4: Apply filters to this report (optional)'],
        advancedReportsList: ['(IHS) Alternates', '(IHS) BasicPlusReport',
            '(IHS) BasicReport', '(IHS) EnvReport', '(IHS) LCReport',
            '(IHS) Procurement Data (3k Max)', '(IHS) Rare Earth Presence', 'Manage Users - Not Delete'],
        step4Labels: ['Internal Part Number', 'Imported P/N', 'Imported Mfr', 'Imported Description',
            'Matched P/N', 'CAGE Code', 'Part Status', 'Life Cycle Code', 'Life Cycle Stage', 'Estimated YTEOL',
            'Availability (YTEOL)', 'LTB Date', 'RoHS Compliant', 'Custom1', 'Custom2'],
        deletedTemplateReportName: 'US180209_DO_NOT_DELETE',
        deletedBomReportName: 'US210390_DO_NOT_DELETE',
        filterValue: '123',
        stdReportTooltipDetails: function () {
            let reportTooltip = new Map<string, string>()
            reportTooltip.set('BOM Analysis', 'BOM Analysis: a multiple page, graphical report using pie charts to show the health of the parts on the BOM. Summary information from the BOM such as Discontinued and End of Life (EOL) parts with and without alternates and also parts with predictive obsolescence information. The report is available as an Adobe PDF file or a compressed PDF file.')
            reportTooltip.set('Part Type Analysis', 'Part Type Analysis: a multiple page, graphical report using bar charts and pie charts to show the health of the parts on the BOM according to the type of parts that are on the BOM. This report is useful for looking at your parts by high level part types (Semiconductors, Passives, Electro-mechanical, etc.).The report is available as an Adobe PDF file or a compressed PDF file.')
            reportTooltip.set('Alert Details', 'Alert Details: an export of all the Alerts associated with the parts that are included in the BOMs submitted. The report contains information on the Alert Category, Alert Type, Alert Status, Alert Number, Alert Description, Mfr Alert Date, IHS Alert Date, LTB and LTD Dates, and others. The report is available as an Excel XLS file, CSV (comma separated values), or a compressed CSV file.')
            reportTooltip.set('Alert Summary', 'Alert Summary: a multiple page, graphical report using pie and bar charts to show the distribution of PCNs, EOLs and PSC (part status change), Discontinuance and Reinstatement for parts on the submitted BOMs. The report is available as an Adobe PDF file or a compressed PDF file.')
            reportTooltip.set('Predicted Status', 'Predicted Status: a multiple page Excel report. Sheet 1 contains a table that shows the predictive status of parts that have life cycle information. The report contains columns for the current, year two, year four, and year eight Status of Manufacturer Sources. Sheet 2 uses a table and bar charts to show the Status of Manufacturer Sources values The report is available as an Excel XLS file, CSV (comma separated values), or a compressed CSV file.')
            reportTooltip.set('AML Predicted Status', 'AML Predicted Status: a multiple page Excel report. Sheet 1 contains a table that shows the predictive status of AML parts that have life cycle information. The report contains columns for the current, year two, year four, and year eight Status of Manufacturer Sources. Sheet 2 uses pie and bar charts to show the number of IPNs with 0 or more active AML parts, and an AML part status summary.')
            reportTooltip.set('Potential Sourcing Issues', 'Potential Sourcing Issues: a multiple page Excel report. Sheet 1 contains a table the shows a listing of all parts with potential sourcing issues based upon the status of the part. Sheet 2 uses a table and bar chart to show the counts of parts with potential sourcing issues. The report is available as an Excel XLS file, CSV (comma separated values), or a compressed CSV file.')
            reportTooltip.set('SO Predicted Status', 'SO Predicted Status: this is the Single Occurrence (SO) Predicted Status (PSR) report. It is the same as the regular PSR except that it removes duplicate parts found across all parts on all submitted BOMs. The report is available as an Excel XLS file, CSV (comma separated values), or a compressed CSV file.')
            reportTooltip.set('SO Potential Sourcing', 'SO Potential Sourcing: this is the Single Occurrence (SO) Potential Sourcing Issues (PSI) report. It is the same as the regular PSI report except that it removes duplicate parts from across all parts on all submitted BOMs. The report is available as an Excel XLS file, CSV (comma separated values), or a compressed CSV file.')
            reportTooltip.set('SO Part Type', 'SO Part Type: this is the Single Occurrence (SO) Part Type report. It is the same as the regular Part Type Analysis report except that it removes duplicate parts found across all parts on all submitted BOMs. The report is available as an Adobe PDF file or a compressed PDF file.')
            reportTooltip.set('Indentured LC Health', 'Indentured LC Health: an export of all the assembly and sub-assembly levels of an indentured BOM. It provides summary information such as total number of parts, not matched, discontinued (with and without alternates), EOL, and Active (Available) parts. Status values are highlighted in colors. The report is available as an Excel XLS file, CSV (comma separated values), or a compressed CSV file.')
            reportTooltip.set('Indentured Predicted Status Report Tables', 'Indentured Predicted Status Report Tables: an export of all parts with predictive obsolescence information for each level of the indentured BOM. The report is available as an Excel XLS file, CSV (comma separated values), or a compressed CSV file.')
            reportTooltip.set('Indentured Predicted Status Report Charts', 'Indentured Predicted Status Report Charts: a multiple page, graphical report. The report contains a table and cylindrical chart showing the predictive status of parts at each level of the indentured BOM. The report is available as an Adobe PDF file or a compressed PDF file')
            reportTooltip.set('Single BOM Dashboard', 'Single BOM Dashboard: a multi-page, graphical report that provides part, manufacturer and life cycle summaries of your BOM, as well as charts and tables for matching, life cycle, RoHS & REACH, EU RoHS version counts, REACH Candidate List Date counts, assembly health risk, BOM info, summary alert counts by type and time period, and BOM import options. The report is available as an Adobe PDF file, or as a compressed PDF file.')
            return reportTooltip;
        },
        multiselectMessage: 'When selecting multiple reports to run at one time, you cannot select a combination of Standard and Advanced reports.'
    },

    templates: {
        templateName: random.randomTextGenerator(10),
        optionsList: ['All', 'Default', 'Additional BOM Data',
            'Detailed Life Cycle', 'Detailed RoHS Data',
            'Detailed China RoHS Data', 'REACH Data',
            'Packaging Data', 'Alternates', 'Pricing and Availability',
            'Corporate Parts List', 'DRC/Prop65 Data', 'Export Control Data',
            'Part Notes', 'Manufacturer Preferences'],
        additionalBomList: ['Active Generics', 'Active Mfrs', 'AMLS', 'CAGE Code', 'Description', 'DLA Qualification', 'External URL References', 'Generic', 'IHS Part ID', 'Latest Datasheet URL', 'Latest PCN Document', 'Manufacturer Support Status', 'Match Type', 'Matched Mfr',
            'Matched Mfr (long)', 'Matched Mfr ID', 'Matched PN', 'Mfr Part Description', 'NSN', 'Part Category', 'Part Status', 'Part Type', 'QPEI', 'Qualifications', 'Reference Designator', 'Reliability Data', 'Risk - Environmental', 'Risk - Lifecycle', 'Risk - Supply Chain', 'Screening Level/Reference Std', 'Status of Mfr Sources',
            'Temperature Grade'],
        allAttributesList: ['Alphanumeric Indenture Code', 'Assembly', 'BOM Name', 'Bom Path', 'BOM Qty', 'Custom 1', 'Custom 2', 'Imported Description', 'Imported Mfr', 'Imported Mfr P/N', 'Internal PN', 'NHA Indenture Code', 'Preferred', 'Active Generics', 'Active Mfrs', 'AMLS', 'CAGE Code',
            'Description', 'DLA Qualification', 'External URL References', 'Generic', 'IHS Part ID', 'Latest Datasheet URL', 'Latest PCN Document', 'Manufacturer Support Status', 'Match Type', 'Matched Mfr', 'Matched Mfr (long)', 'Matched Mfr ID', 'Matched PN', 'Mfr Part Description', 'NSN', 'Part Category', 'Part Status',
            'Part Type', 'QPEI', 'Qualifications', 'Reference Designator', 'Reliability Data', 'Risk - Environmental', 'Risk - Lifecycle', 'Risk - Supply Chain', 'Screening Level/Reference Std', 'Status of Mfr Sources', 'Temperature Grade', 'Alert Prediction Date', 'Availability YTEOL', 'CEYTEOL', 'Date of Intro',
            'Latest EOL Document', 'Life Cycle Code', 'Life Cycle Comments', 'Life Cycle Info Source', 'Life Cycle Stage', 'LTB Date', 'LTD Date', 'Predicted AML Status', 'Predicted Status', 'YTEOL', 'Additional Env Info', 'BBP (mg)', 'Cd (mg)', 'China RoHS Compliant', 'Cr VI (mg)', 'DBP (mg)', 'DEHP (mg)', 'DIBP (mg)', 'EFUP', 'EU RoHS Compliant',
            'EU RoHS Version', 'Hg (mg)', 'Item Weight (mg)', 'Latest Environmental Doc URLs', 'Pb (mg)', 'PBB (mg)', 'PBDE (mg)', 'RoHS Compliant Identifiers', 'RoHS Compliant PN', 'RoHS Exemptions', 'RoHS5 Compliant', 'Cadmium Below Threshold', 'Chromium Below Threshold', 'Lead Below Threshold', 'Mercury Below Threshold',
            'PBB Below Threshold', 'PBDE Below Threshold', 'Candidate List Date', 'CAS Accounted for Weight (%)', 'FMD Exists', 'Low Halogen', 'REACH Compliant', 'SVHC Over MCV', 'Electrostatic Discharge', 'Height (mm)', 'J-STD-609 Code', 'JESD30 Code', 'Manufacturer Package Description', 'Max Time at Peak Temperature (s)', 'Moisture Sensitivity Level',
            'Number of Terminals', 'Operating Temperature Max Cel', 'Operating Temperature Min Cel', 'Package Body Material', 'Package Code', 'Package Shape', 'Package Style', 'Packaging Method', 'Packing Quantity', 'Peak Package Temperature (Deg C)', 'Terminal Plating / Grid Array Material', 'Alternates Active Mfrs',
            'FFF Alternates', 'Functional Equivalent Alternates', 'Mfr Suggested Replacements', 'Avg Lead Time', 'Avg Price', 'Country/Region of Origin', 'Distributor Data', 'Inventory Available', 'Total Inventory', 'Corp P/N Desc', 'Corp Part Status', 'CPL Comments', 'CPL Corp Name', 'CPL Corp P/N', 'CPL Custom 1',
            'CPL Custom 10', 'CPL Custom 2', 'CPL Custom 3', 'CPL Custom 4', 'CPL Custom 5', 'CPL Custom 6', 'CPL Custom 7',
            'CPL Custom 8', 'CPL Custom 9', 'CPL Match Status', 'CPL Matched Mfr P/N Desc', 'CPL Mfr Name', 'CPL Mfr P/N',
            'CPL Preferred (Y/N)', 'Generic Number', 'Mfr P/N Desc', 'Mfr Part Status',
            'Conflict Mineral', 'Conflict Mineral Source', 'DRC Declaration Level', 'DRC Due Diligence Description', 'DRC Due Diligence Level', 'DRC Status', 'DRC Status Source', 'Latest DRC Doc URLs', 'Prop65 CAS Numbers', 'Prop65 Presence', 'ECCN', 'ECCN Governance', 'HTS Code', 'SB Code', 'Average Cost', 'Case Number', 'Date Ordered',
            'Date Required By', 'Expected Product Lifecycle', 'Note Create Date', 'Note Modified Date', 'Part Note Comments', 'Procurability Details', 'Procurability Reason', 'Procurability Status', 'Quantity in Stock', 'Quantity Ordered', 'Quantity Required', 'Redesign Planned Date', 'Replacement Mfr',
            'Replacement Part', 'Manufacturer ID', 'Manufacturer Preference', 'Manufacturer Preference Comments'
        ],
        defaultList: ['Alphanumeric Indenture Code', 'Assembly', 'BOM Name', 'Bom Path', 'BOM Qty', 'Custom 1', 'Custom 2', 'Imported Description', 'Imported Mfr', 'Imported Mfr P/N', 'Internal PN', 'NHA Indenture Code', 'Preferred'],
        DetailedLifeCycle: ['Alert Prediction Date', 'Availability YTEOL', 'CEYTEOL', 'Date of Intro', 'Latest EOL Document',
            'Life Cycle Code', 'Life Cycle Comments', 'Life Cycle Info Source', 'Life Cycle Stage', 'LTB Date', 'LTD Date', 'Predicted AML Status', 'Predicted Status', 'YTEOL'],
        DetailedRoHSData: ['Additional Env Info', 'BBP (mg)', 'Cd (mg)', 'China RoHS Compliant', 'Cr VI (mg)', 'DBP (mg)', 'DEHP (mg)', 'DIBP (mg)', 'EFUP', 'EU RoHS Compliant',
            'EU RoHS Version', 'Hg (mg)', 'Item Weight (mg)', 'Latest Environmental Doc URLs', 'Pb (mg)', 'PBB (mg)', 'PBDE (mg)', 'RoHS Compliant Identifiers', 'RoHS Compliant PN', 'RoHS Exemptions', 'RoHS5 Compliant'],
        DetailedChinaRoHSData: ['Cadmium Below Threshold', 'Chromium Below Threshold', 'Lead Below Threshold', 'Mercury Below Threshold',
            'PBB Below Threshold', 'PBDE Below Threshold'],
        REACHData: ['Candidate List Date', 'CAS Accounted for Weight (%)', 'FMD Exists', 'Low Halogen', 'REACH Compliant', 'SVHC Over MCV'],
        PackagingData: ['Electrostatic Discharge', 'Height (mm)', 'J-STD-609 Code', 'JESD30 Code', 'Manufacturer Package Description', 'Max Time at Peak Temperature (s)', 'Moisture Sensitivity Level',
            'Number of Terminals', 'Operating Temperature Max Cel', 'Operating Temperature Min Cel', 'Package Body Material', 'Package Code', 'Package Shape', 'Package Style', 'Packaging Method', 'Packing Quantity', 'Peak Package Temperature (Deg C)', 'Terminal Plating / Grid Array Material'],
        CorporatePartsList: ['Corp P/N Desc', 'Corp Part Status', 'CPL Comments', 'CPL Corp Name', 'CPL Corp P/N', 'CPL Custom 1',
            'CPL Custom 10', 'CPL Custom 2', 'CPL Custom 3', 'CPL Custom 4', 'CPL Custom 5', 'CPL Custom 6', 'CPL Custom 7',
            'CPL Custom 8', 'CPL Custom 9', 'CPL Match Status', 'CPL Matched Mfr P/N Desc', 'CPL Mfr Name', 'CPL Mfr P/N',
            'CPL Preferred (Y/N)', 'Generic Number', 'Mfr P/N Desc', 'Mfr Part Status'],
        DRCProp65Data: ['Conflict Mineral', 'Conflict Mineral Source', 'DRC Declaration Level', 'DRC Due Diligence Description', 'DRC Due Diligence Level', 'DRC Status', 'DRC Status Source', 'Latest DRC Doc URLs', 'Prop65 CAS Numbers', 'Prop65 Presence'],
        ExportControlData: ['ECCN', 'ECCN Governance', 'HTS Code', 'SB Code'],
        PartNotes: ['Average Cost', 'Case Number', 'Date Ordered',
            'Date Required By', 'Expected Product Lifecycle', 'Note Create Date', 'Note Modified Date', 'Part Note Comments', 'Procurability Details', 'Procurability Reason', 'Procurability Status', 'Quantity in Stock', 'Quantity Ordered', 'Quantity Required', 'Redesign Planned Date', 'Replacement Mfr',
            'Replacement Part'],
        ManufacturerPreferences: ['Manufacturer ID', 'Manufacturer Preference', 'Manufacturer Preference Comments'],
        alternatesList: ['Alternates Active Mfrs', 'FFF Alternates', 'Functional Equivalent Alternates',
            'Mfr Suggested Replacements'],
        detailedRohsData: ['Latest Environmental Doc URLs', 'Additional Env Info'],
        packagingDataList: ['Electrostatic Discharge', 'Height (mm)', 'J-STD-609 Code', 'JESD30 Code', 'Manufacturer Package Description', 'Max Time at Peak Temperature (s)', 'Moisture Sensitivity Level', 'Number of Terminals', 'Operating Temperature Max Cel', 'Operating Temperature Min Cel',
            'Package Body Material', 'Package Code', 'Package Shape', 'Package Style', 'Packaging Method', 'Packing Quantity', 'Peak Package Temperature (Deg C)', 'Terminal Plating / Grid Array Material'],
        pricingAndAvailabilityList: ['Avg Lead Time', 'Avg Price', 'Country/Region of Origin', 'Distributor Data', 'Inventory Available', 'Total Inventory'],
        pricingAndAvailabilityListForProcData: ["Avg Price", 'Avg Lead Time', 'Inventory Available', 'Total Inventory',
            "Distributor Name"],
        pricingAndAvailabilityListForIhsAlternates: ["Risk - Supply Chain", 'Avg Price', 'Avg Lead Time', 'Inventory Available',
            'Total Inventory', "BOM Name"],
        reachInitalList: ['Candidate List Date',
            'SVHC Over MCV',
            'CAS Accounted for Weight (%)',
            'REACH Compliant',
            'Low Halogen',
            'FMD Exists',
        ],
        step4Labels: ['Internal Part Number', 'Imported P/N', 'Imported Mfr', 'Imported Description',
            'Matched P/N', 'Search for Manufacturers', 'CAGE Code', 'Part Status', 'Life Cycle Code',
            'Life Cycle Stage', 'Estimated YTEOL', 'Availability(YTEOL)', 'LTB Date', 'RoHS Compliant', 'Custom1', 'Custom2'],
        step4LabelsWithSpace: ['', 'Internal Part Number', 'Imported P/N', 'Imported Mfr', 'Imported Description',
            'Matched P/N', 'Search for Manufacturers', 'CAGE Code', 'Part Status', 'Life Cycle Code',
            'Life Cycle Stage', 'Estimated YTEOL', 'Availability (YTEOL)', 'LTB Date', 'RoHS Compliant', 'Custom1', 'Custom2'],
        step4LabelsOnlyForCustomTemplates: ['Internal Part Number', 'Imported P/N', 'Imported Mfr', 'Imported Description',
            'Matched P/N', '', 'Search for Manufacturers', 'CAGE Code', 'Part Status', 'Life Cycle Code',
            'Life Cycle Stage', 'Estimated YTEOL', 'Availability (YTEOL)',
            'LTB Date', 'RoHS Compliant', 'Custom1', 'Custom2']
    }

}