import createApiClient from './api.service'

class ReaderService {
    constructor(baseUrl= '/api/librarymanagement/reader') {
        this.api = createApiClient(baseUrl);
    }

    async getAllReader() {
        return (await this.api.get('/')).data;
    }

    async createReader(readerData) {
        return (await this.api.post('/', readerData)).data;
    }

    async getReaderById(readerId) {
        return (await this.api.get(`/${readerId}`)).data;
    }

    async updateInfoReader(readerId, readerData) {
        return (await this.api.put(`/${readerId}`, readerData)).data;
    }

    async changePasswordReader(readerId, newPassword) {
        return (await this.api.put(`/${readerId}`/password, newPassword)).data;
    }

    async login(readerData) {
        return (await this.api.post(`/login`, readerData)).data;
    }

    async deleteReader(readerId) {
        return (await this.api.delete(`/${readerId}`)).data;
    }

    async payFine(readerId) {
        return (await this.api.get(`/payfine/${readerId}`)).data;
    }

    async logout() {
        return (await this.api.post('/logout')).data;
    }
 }

 export default new ReaderService();    