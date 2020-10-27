import AsyncStorage from '@react-native-community/async-storage';

import SharedConstants from '../constants/SharedConstants';

class AsyncStorageService {
    setAuthData = async (authObject: {
        userId: number;
        passwordHash: string;
    }): Promise<void> => {
        await AsyncStorage.setItem(
            SharedConstants.USER_STORAGE_NAME,
            JSON.stringify(authObject)
        );
    };

    getAuthData = async (): Promise<{
        userId: number;
        passwordHash: string;
    }> => {
        return JSON.parse(
            await AsyncStorage.getItem(SharedConstants.USER_STORAGE_NAME)
        );
    };

    setDomain = async (domain: string): Promise<void> => {
        await AsyncStorage.setItem(
            SharedConstants.DOMAIN_STORAGE_NAME,
            JSON.stringify(domain)
        );
    };

    getDomain = async (): Promise<string> => {
        return JSON.parse(
            await AsyncStorage.getItem(SharedConstants.DOMAIN_STORAGE_NAME)
        );
    };

    setInstanceName = async (name: string): Promise<void> => {
        await AsyncStorage.setItem(
            SharedConstants.CLUB_NAME_STORAGE_NAME,
            JSON.stringify(name)
        );
    };

    getInstanceName = async (): Promise<string> => {
        return JSON.parse(
            await AsyncStorage.getItem(SharedConstants.CLUB_NAME_STORAGE_NAME)
        );
    };

    setUserPicturePath = async (path: string): Promise<void> => {
        await AsyncStorage.setItem(
            SharedConstants.USER_PICTURE_PATH_STORAGE_NAME,
            JSON.stringify(path)
        );
    };

    getUserPicturePath = async (): Promise<string> => {
        return JSON.parse(
            await AsyncStorage.getItem(
                SharedConstants.USER_PICTURE_PATH_STORAGE_NAME
            )
        );
    };

    setUserName = async (name: string): Promise<void> => {
        await AsyncStorage.setItem(
            SharedConstants.USER_NAME_STORAGE_NAME,
            JSON.stringify(name)
        );
    };

    getUserName = async (): Promise<string> => {
        return JSON.parse(
            await AsyncStorage.getItem(SharedConstants.USER_NAME_STORAGE_NAME)
        );
    };

    clearAsyncStorage = async (): Promise<void> => {
        await AsyncStorage.clear();
    };
}

export default AsyncStorageService;
