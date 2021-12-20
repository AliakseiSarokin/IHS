import {browser} from "protractor";

export const newsData = {
    whatsNewLink: 'What\'s New',
    database: {
        headers: ['Database Statistics',
            "Previous Week's Updates",
            'Manufacturer Changes',
            'Manufacturer Part Processing'],
        dbStatUrl: '/about_db_stats.pdf',
        mfrPartProcessUrl: '/IHS_mfr_changes_v8.pdf',
    },

    faqs: {
        freqAskQuestionLink: 'Click to read the Frequently Asked Questions (FAQs).',
        freqAskQuestionUrl: '/IHS_BOM_Intelligence_FAQs.pdf',
        joinIhsLink: 'Join IHS product experts and learn how to get most from your subscriptions.',
        joinIhsUrl: 'https://learning.ihsmarkit.com/pages/engineering-intelligence-solutions?labels=%5B%22Learning%20by%20Product%22%5D&values=%5B%22BOM%20Intelligence%22%5D',
    },

    inTheNews: {
        headers: ['February 15, 2021: Whitepaper - Semiconductor Component Supply Chain Shortages',
            'February 2021: Whitepaper - Managing the 2021 automotive chip famine',
            'December 29, 2020: Whitepaper - Compliance Challenges, Expanding Regulations in 2021',
            'October 27, 2020: Whitepaper - Increased Component Manufacturer End of Life and Product Change Notifications',
            'August 21, 2020: Whitepaper - Component Supply Chain and the South China Sea',
            'June 2019: Whitepaper - Understanding the Impacts of US Tariffs on Component Costs',
            'October 2018: Whitepaper - Challenges Navigating the Electronic Component Supply Chain',
            'Monday, May 1, 2017: Low-power consumption: A new mantra, but also driving component obsolescence',
            'Thursday, November 3, 2016: New chip technologies and IoT devices lead to new hacking threats - and solutions',
            'Tuesday, August 16, 2016: New RoHS3 restrictions on banned chemicals can trip up the unprepared',
            'Monday, June 13, 2016: Parts compliance: REACH legislation proves difficult for companies',
            'Wednesday, April 20, 2016 - Shorter life cycles for integrated circuits: It pays to select ICs carefully' +
            ' to ensure supply chain longevity'],
        firstLink: 'Companies producing electronic products will need to plan carefully to dodge some looming component supply chain pitfalls in 2021.',
        firstUrl: 'http://4dsqa.ihs.com/help/bom-intelligence/Semiconductor_Component_Supply_Chain_Shortages.pdf',
        secondLink: 'IHS Technology Blog - Low-power consumption: A new mantra, but also driving component obsolescence (Monday, May 1, 2017)',
        secondUrl: 'https://ihsmarkit.com/research-analysis/low-power-consumption.html',
        thirdLink: 'IHS Technology Blog - New chip technologies and IoT devices lead ' +
        'to new hacking threats—and solutions (Thursday, November 3, 2016)',
        thirdUrl: 'https://ihsmarkit.com/research-analysis/new-chip-technologies-and-iot-devices.html',
        forthLink: 'IHS Technology Blog - New RoHS3 restrictions on banned chemicals can trip up the unprepared (Tuesday 16 August 2016)',
        forthUrl: 'https://ihsmarkit.com/research-analysis/new-rohs3-restrictions-on-banned-chemicals-can-trip-up-the-unprepared.html',
        fifthLink: 'IHS Technology Blog - Parts compliance: REACH legislation proves difficult for companies (Monday 13 June 2016)',
        fifthUrl: 'https://ihsmarkit.com/research-analysis/parts-compliance-reach-legislation-proves-difficult-for-companies.html',
        sixLink: 'IHS Technology Blog - Shorter life cycles for integrated circuits: It pays to select ICs carefully to ensure supply chain longevity (Wednesday, 20 April 2016)',
        sixUrl: 'https://ihsmarkit.com/research-analysis/shorter-life-cycles-for-integrated-circuits-it-pays-to-select-ics-carefully-to-ensure-supply-chain-longevity.html',
        omdiaURL: 'https://omdia.tech.informa.com/',
        sevenLink: 'Companies producing electronic products will need to plan carefully to dodge some looming component supply chain pitfalls in 2021.',
        sevenUrl: 'http://4dsqa.ihs.com/help/bom-intelligence/Semiconductor_Component_Supply_Chain_Shortages.pdf',
        eightLink: 'With chip supply constraints likely to persist until third quarter 2021, IHS Markit analyzes the short and long-term implications for the automotive industry.',
        eightUrl: 'http://4dsqa.ihs.com/help/bom-intelligence/Semiconductor_Chip_Shortage_Whitepaper.pdf',
        nineLink: 'Learn how companies with well-organized material information will be in a much better position to gain market share and stay ahead of their competition.',
        nineUrl: 'http://4dsqa.ihs.com/help/bom-intelligence/Compliance_Challenges_v3.pdf',
    },
    webinars: {
        headers: ['Webinar and Post-Event Replay: California Proposition 65 Warning Regulations – What\'s new?,' +
        ' October 16th, 2018, 3-4 PM CEST', 'Live Webinar and Post-Event Replay: Material Compliance Using SAP Just Got' +
        ' a Lot Easier, October 4th, 2018, 5-6 PM CEST', 'International Institute of Obsolescence Management (IIOM) -' +
        ' Members Meeting, September 25th, 2018', 'ECIA 2018 Executive Conference, October 21-23, 2018', 'Electronica 2018,' +
        ' November 13-16, 2018', 'DMSMS 2018, December 3-6, 2018', 'Replay - Fast Tracking Your Material Compliance Data' +
        ' Collection Program', 'Replay - IHS Special Webcast | 2014 to 2016: The Most Dynamic Years in the Semiconductor ' +
        'Industry in History - Wednesday, May 10, 2017, 2:00 PM ET', 'Replay - IHS Special Webcast | Managing Obsolescence' +
        ' Risks Relative to Advances in Component Technologies', 'Replay - IHS Special Webcast | Supply Chain Constraints' +
        ' Expected for Electronic Components in 2017', 'Partner Webinar Replay - Component Management in the Era of IoT: ' +
        'Lower Costs, Manage Complexity', 'Webinar Replay - Supply Chain Risk Management Success Strategies'],
    },
    whatsNew: {
        whatsNewLink: 'IHS BOM Intelligence Detailed Release Notes',
        whatsNewUrl: 'http://4dsqa.ihs.com/help/bom-intelligence/bom-intelligence-v3-0-4-release-relnotes-detailed.pdf',
        forMoreInfo: 'For more information',
        firstMoreInfoLink: 'http://4dsqa.ihs.com/help/bom-intelligence/Supply+Chain+Impacts-15July2020.pdf' ,
        secondMoreInfoLink: 'https://ihsmarkit.com/products/environmental-conflict-minerals-export-compliance.html',
        thirdMoreInfoLink: 'https://ihsmarkit.com/products/supply-chain-parts-xml-web-services-api.html',
    }

};