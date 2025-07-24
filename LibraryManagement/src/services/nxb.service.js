import createApiClient from './api.service'
class NXBService {
    constructor(baseUrl = '/api/nxb') {
        this.api = createApiClient(baseUrl);
    }

    async getAllNXB() {
        return (await this.api.get('/')).data;
    }

    async getNXBById(nxbId) {
        return (await this.api.get(`/${nxbId}`)).data;
    }

    async createNXB(nxbData) {
        return (await this.api.post('/', nxbData)).data;
    }

    async updateNXB(nxbId, nxbData) {
        return (await this.api.put(`/${nxbId}`, nxbData)).data;
    }

    async deleteNXB(nxbId) {
        return (await this.api.delete(`/${nxbId}`)).data;
    }
 }

 export default new NXBService();
