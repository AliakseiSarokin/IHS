export const partDetailsData: any = {

    leftNav: {
        itemPartDetails: 'Part Details',
        activePartDetails: 'Technical Characteristics',
        attributePartDetails: 'IHS Objectid',
        itemManufacturer: 'Manufacturer',
        manufacturerInform: 'Manufacturer Information',

    },

    tooltips: {
        viewAlternates: 'View Alternates',
        nsn: 'Haystack Gold NSN Data.',
        lifeCycle: 'Part Active - View Details.',
        lifeCycleBlack: 'View Life Cycle Info.',
        lifeCycleDisc: 'Part Discontinued - View Details.',
        lifeCycleEOL: 'Part End of Life - View Details.',
        lifeCycleBlue:'Part Reactived - View Details.',
        documents: 'View Part and Environmental Documents.',
        distributors: 'View Pricing & Availability.',
        alerts: 'Historical Alerts - View Details.',
        cpl: 'CPL',
        bodyMessageText: "Your subscription license is not entitled to view the Authorized Distributor location data. " +
        "Please contact your IHS Markit Sales or Support representative for information about how to get access to this content.",
    },

    distributors: {
        firstInfoColumnText: ['Average Price: ', ' (USD)', 'Average Lead Time: ', ' (weeks)'],
        secondInfoColumnText: ['Inventory Available:', 'Total Inventory:', 'Authorized Distributors (highlighted in yellow)', 'rgba(254, 255, 161, 1)'],
        thirdInfoColumnText: ['Authorized Distributor Locations', 'Show Authorized Only'],
        showAll: 'Show All'
    },

    viewAlternatesFilterOptions: ['Form, Fit, & Functional (FFF)', 'Functionally Equivalent (F=)',
        'Direct (DIR)', 'Similar (SIM)', 'Include Discontinued Parts', 'AEC-Q100', 'AEC-Q101', 'AEC-Q200', 'DLA', 'Rad Hard', 'Space', 'UL', 'CPL Only'],

    viewAlternatesFilterOptionsUpper: ['Form, Fit, & Functional (FFF)', 'Functionally Equivalent (F=)',
        'Direct (DIR)', 'Similar (SIM)', 'Include Discontinued Parts', 'AEC-Q100', 'AEC-Q101', 'AEC-Q200', 'DLA', 'RAD HARD', 'SPACE'],

    columnHeaders: ['Source', 'Quantity in Stock', 'Lead Time (Weeks)', 'Price', 'Currency', 'Quantity-Min', 'Quantity-Max',
        'Quantity-Multiples', 'Packaging', 'Packaging Quantity', 'Volume Pricing / Additional Info', 'Source Region', 'Price Type',
        'Telephone', 'Email'],
    attributeNames: [
        'Region',            'Price',
        'Lead Time',         'Qty in Stock',
        'Buy Now',           'Best Price',
        'Qty Best Price',    '1-Price Break',
        '1-Qty Price Break', '2-Price Break',
        '2-Qty Price Break', '3-Price Break',
        '3-Qty Price Break', '4-Price Break',
        '4-Qty Price Break', '5-Price Break',
        '5-Qty Price Break', 'Qty Min',
        'Qty Multiple',      'Additional Feature',
        'Packaging',         'Packaging Qty',
        'Description',       'Distributor Name',
        'Update Frequency',  'Distributor Email',
        'Distributor Phone'
    ],
    ESDRows:['Classification','Voltage Range (V)','0Z','< 50','0A','50 to < 125','0B','125 < 250','1A','250 to < 500','1B','500 to < 1000','1C','1000 to < 2000','2','2000 to < 4000','3A','4000 to < 8000','3B','≥ 8000','ESD sensitive components are classified according to their HBM withstand voltage, regardless of polarity.']
};