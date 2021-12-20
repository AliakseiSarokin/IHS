import {Random} from "../utils/random";
const random: Random = new Random();
export const alertsData = {
  subscribeToShade: {
      invalidEmailMessage: 'Invalid email address format',
      validEmail:  random.randomNumberGenerator(10)+'@test.te',
      validEmailAppend: random.randomNumberGenerator(11)+'@test.te',
  },
    manageEmailAddressShade: {
        invalidEmailMessage: '* Invalid email address',
    },

    alertsByBomFilterDropdownValues: ['View All Alerts', 'View Alerts for Today', 'View Alerts for the Last Week',
            'View Alerts for the Last 30 Days', 'View Alerts for the Last 6 Months',
            'View Alerts for the Last Year'],

    alertsByIdFilterDropdownValues: ['View Today\'s Alerts', 'View Alerts Last 7 Days', 'View Alerts Last 30 Days',
        'View Alerts Last 90 Days', 'View Alerts Last 180 Days' ],

    homePageAlertsFilterDropdownValues: ['View Alerts for Today', 'View Alerts for the Last Week', 'View All Alerts',
        'View All My BOMs Alerts' ],


};