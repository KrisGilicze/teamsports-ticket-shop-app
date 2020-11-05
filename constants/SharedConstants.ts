import Constants from 'expo-constants';

export default {
    BACKEND_API_PW: Constants.manifest.extra.backendApiPw,
    BACKEND_API_AUTH_KEY: Constants.manifest.extra.backendApiKey,
    BACKEND_API_PATH: 'https://backend.teamsports2.at/customers/',
    INSTANCE_AUTH_API_PATH: '/Apiv5Auth/',
    INSTANCE_INTERNAL_API_PATH: '/Apiv5Internal/',
    USER_STORAGE_NAME: 'UserData',
    DOMAIN_STORAGE_NAME: 'Domain',
    CLUB_NAME_STORAGE_NAME: 'ClubName',
    USER_NAME_STORAGE_NAME: 'UserName',
    USER_PICTURE_PATH_STORAGE_NAME: 'PicturePath',
};
