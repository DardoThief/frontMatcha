import { service } from '../service';
import { getApiUrl } from '../settings';

const ENDPOINT_USERS = 'v1/users/';

export default {
  getUsers: async () => {
    try {
      const {status, data} = await service.get(
        getApiUrl(ENDPOINT_USERS),
      );
      if (status === 200 && data) {
        return data;
      }
    } catch (err) {
      console.error('[API]', err);
    }
    return false;
  },
};
