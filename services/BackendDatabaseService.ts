import Base64 from 'Base64';

import SharedConstants from '../constants/SharedConstants';

class BackendDatabaseService {
    getInstances = async (): Promise<[{ club: string; domain: string }]> => {
        console.log({
            Authorization: 'Basic ' + Base64.btoa('admin:Alex2002#'),
        });
        const response = await fetch(
            SharedConstants.BACKEND_API_PATH + 'list-clubs',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Basic ' + Base64.btoa('admin:Alex2002#'),
                },
            }
        );

        const list = await response.json();

        if (response.status !== 200) {
            throw { code: -1, message: list };
        }

        return list;
    };
}

export default BackendDatabaseService;
