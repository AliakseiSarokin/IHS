import {Random} from "../../utils/random";

const random: Random = new Random();

export const adminPage: any = {
    siteAdminLogin: 'site-admin/#/login',
    siteAdminHome: 'site-admin/#/home',
};

export const meganavItem: any = {
    toolbarNames: ['HOME', 'USERS', 'USER GROUPS', 'MFR ALIASES' ],
    adminHome: 'HOME',
};

export const sidebar: any = {
    users: 'Users',
    userGroups: 'User Groups',
    mfrAliases: 'Mfr Aliases',

};

export const usersElements: any = {
    columnHeaderNames: [
        '', 'User Name', 'User Group Name', 'Active Status', 'Email', 'Full Name', 'Group Admin',
        'KB Admin', 'User Admin', 'Restricted User', 'Read Only User', '', ''
          ],
    columnHeaderUserGroupsNames: [
        '', 'User Group Name', 'User Group Label', 'Hazmat', 'ERC', 'Modified Date', 'Commodity',
        'Authorized Distributors', 'Boeing OCMS Export', 'Follow Xfer History', ''
    ],
    columnHeaderNamesMfrAlliases: ['', 'Long Mfr Name', 'Short Mfr Name', 'Mfr Alias', 'Alias Description', 'Support Status'],

    lockedColumnHeaderUserGroupsNames: [
        '', 'User Group Name', 'User Group Label'],
    unlockedColumnHeaderUserGroupsNames: [
        'Hazmat', 'ERC', 'Modified Date', 'Commodity', 'Authorized Distributors', 'Boeing OCMS Export',
        'Follow Xfer History', ''],
    lockedColumnHeaderNames: [ '', 'User Name', 'User Group Name' ],
    unlockedColumnHeaderNames: [
        'Active Status', 'Email', 'Full Name', 'Group Admin',
        'KB Admin', 'User Admin', 'Restricted User', 'Read Only User', '', ''
    ],

};

export const userGroupGridElements: any = {
    activeButtons: ['Add New User Group', 'Reset'],
    disabledButtons: ['Modify User Group', 'Export', 'ReGen Key', 'Delete'],
};

export const usersGridElements: any = {
    activeButtons: ['Add New User', 'Reset'],
    disabledButtons: ['Modify User', 'Modify Multiple Users', 'Export', 'Delete'],
};

export const modalElements: any = {
    userName: 'User Name:',
    cancelChanges: 'Cancel Changes',
    users: 'edit-user-shade works!',
    exportUserGroupRows: ['Selected User Groups Only', 'All User Groups',
        'Excel Spreadsheet (XLS)', 'Comma-Separated Values (CSV)'],
    exportUsersRows: ['Selected Users Only', 'All Users', 'Excel Spreadsheet (XLS)', 'Comma-Separated Values (CSV)'],

};
export const userGroupModalElements: any = {
    inputFieldNames: ['User Group Name:', 'User Group Label:', 'Commodity:', 'Modified Date:', 'ObjectId:'],
};

export const adminLeftSidebar: any = {
    names: ['Users', 'User Groups', 'Mfr Aliases'],

};

export const adminManageUser: any = {
    newCustomUserName: random.randomTextGenerator(10),

};
export const adminManageUserGroup: any = {
    newCustomUserGroupName: random.randomTextWithoutNumbersGenerator(10).toUpperCase(),

};
