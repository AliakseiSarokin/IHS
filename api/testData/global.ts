import {browser} from "protractor";

export interface IUserLogin{
    username: string;
    password:  string;
}

export const user = {
    groupAdmin: {
        "username": "b4testadmin",
        "password": "b4testadmin",
    },
    userAdmin: {
        "username": "b4testuseradmin",
        "password": "b4testuseradmin",
    },
    kbAdmin: {
        "username": "b4testkbadmin",
        "password": "b4testkbadmin",
    },
    regural: {
        "username": "b4testuser",
        "password": "b4testuser",
    },
    readonly: {
        "username": "b4testreadonly",
        "password": "b4testreadonly",
    },
    restricted: {
        "username": "b4testrestricted",
        "password": "b4testrestricted",
    }
};


export const envs = {
    apiBaseUrl: browser.baseUrl.slice(0, browser.baseUrl.indexOf('/b')) + '/bomapi/',
};