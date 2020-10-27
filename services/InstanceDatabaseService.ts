import AsyncStorage from '@react-native-community/async-storage';

import SharedConstants from '../constants/SharedConstants';
import AsyncStorageService from './AsyncStorageService';

class InstanceDatabaseService {
    loginUser = async (
        name: string,
        password: string,
        dev?: boolean
    ): Promise<boolean> => {
        console.log('logging in...');
        console.log(name + ' ' + password);
        const asyncStorageService: AsyncStorageService = new AsyncStorageService();
        let domain = await asyncStorageService.getDomain();
        if (dev) {
            let domainz = domain.split('.');
            domain = domainz[0] + '.' + 'themostawesomeserver.de';
        }
        console.log({ domain: domain });
        const url = `https://${domain}${SharedConstants.INSTANCE_AUTH_API_PATH}`;
        const formData: any = new FormData();
        formData.append('userName', name);
        formData.append('password', password);
        const response = await fetch(`${url}loginUser`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        });

        console.log({ response: response });
        const data = await response.json();
        if (response.status !== 200) {
            throw { code: -1, message: data.message };
        }
        await asyncStorageService.setAuthData({
            userId: data.message.id,
            passwordHash: data.message.passwordHash,
        });

        console.log({ data: data });
        return true;
    };

    _handleGetRequest = async (fn: string, params: object) => {
        const asyncStorageService: AsyncStorageService = new AsyncStorageService();
        let url = `https://${await asyncStorageService.getDomain()}${
            SharedConstants.INSTANCE_INTERNAL_API_PATH
        }${fn}`;
        if (Object.keys(params).length > 0) {
            // add url params
            for (const id in params) {
                if (params[id]) {
                    url += `/${params[id]}`;
                }
            }
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                ...(await asyncStorageService.getAuthData()),
            },
        });
        const data = await response.json();
        if (response.status !== 200) {
            throw { code: -1, message: data.message };
        }
        return data.message;
    };

    _handlePostRequest = async (fn: string, params: object) => {
        const asyncStorageService: AsyncStorageService = new AsyncStorageService();
        const url = `https://${await asyncStorageService.getDomain()}${
            SharedConstants.INSTANCE_INTERNAL_API_PATH
        }${fn}`;
        const formData = new FormData();
        for (const id in params) {
            if (params[id]) {
                formData.append(id, params[id]);
            }
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                ...(await asyncStorageService.getAuthData()),
            },
            body: formData,
        });
        const data = await response.json();
        if (response.status !== 200) {
            throw { code: -1, message: data.message };
        }
        return data.message;
    };

    getGroups = async (): any[] => {
        return await this._handleGetRequest('getGroups', {});
    };

    getMessages = async (
        groupId: number,
        count: number,
        timestamp?: string
    ): any[] => {
        const params = {
            groupId,
            count,
            timestamp,
        };
        return await this._handlePostRequest('getMessages', params);
    };

    getComments = async (
        messageId: number,
        count: number,
        timestamp?: string
    ): any[] => {
        const params = {
            socialTeamNewsId: messageId,
            count,
            timestamp,
        };
        return await this._handlePostRequest('getComments', params);
    };

    addMessage = async (groupId: number, message: string): any[] => {
        const params = {
            groupId,
            text: message,
        };
        return await this._handlePostRequest('addMessage', params);
    };

    deleteMessage = async (messageId: number): any[] => {
        const params = {
            messageId,
        };
        return await this._handlePostRequest('deleteMessage', params);
    };

    addComment = async (messageId: number, comment: string): any[] => {
        const params = {
            socialTeamNewsId: messageId,
            commentText: comment,
        };
        return await this._handlePostRequest('addComment', params);
    };

    deleteComment = async (commentId: number): any[] => {
        const params = {
            commentId,
        };
        return await this._handlePostRequest('deleteComment', params);
    };

    getUserInformation = async (): Promise<void> => {
        const asyncStorageService: AsyncStorageService = new AsyncStorageService();
        const authData: {
            userId: number;
            passwordHash: string;
        } = await asyncStorageService.getAuthData();
        const params = {
            userId: authData.userId,
        };
        const userInformation: {
            first_name: string;
            last_name: string;
            path: string;
        } = await this._handlePostRequest('getUserInformation', params);
        await asyncStorageService.setUserName(
            `${userInformation.first_name} ${userInformation.last_name}`
        );
        await asyncStorageService.setUserPicturePath(userInformation.path);
    };
}

export default InstanceDatabaseService;
