import Base64 from 'Base64';
import SharedConstants from '../constants/SharedConstants';

class BackendDatabaseService {
    getInstances = async (): Promise<[{ club: string; domain: string }]> => {
        const response = await fetch(
            SharedConstants.BACKEND_API_PATH + 'list-clubs',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization:
                        'Basic ' + Base64.btoa(SharedConstants.BACKEND_API_PW),
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
