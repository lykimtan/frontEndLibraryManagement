import createApiClient from './api.service'

class ReaderService {
    constructor(baseUrl= '/api/librarymanagement/reader') {
        this.api = createApiClient(baseUrl);
    }
    

    async getAllReader() {
        return (await this.api.get('/')).data;
    }

   async createReader(readerData) {
    try {
        console.log('Service: Sending data:', readerData); 
        const response = await this.api.post('/', readerData);
        console.log('Service: Success response:', response); 
        return response.data;
    } catch (error) {
        console.log('Service: Error caught:', error); 
        console.log('Service: Error response:', error.response); 
        throw error; 
    }
    }

    async getReaderById(readerId) {
        return (await this.api.get(`/${readerId}`)).data;
    }

    async updateInfoReader(readerId, readerData) {
        return (await this.api.put(`/${readerId}`, readerData)).data;
    }

    async changePasswordReader(readerId, newPassword) {
        return (await this.api.put(`/${readerId}/password`, newPassword)).data;
    }

    async login(email, password) {
       try {
            const response = await this.api.post('/login', {
                email, 
                password
            });
            return response.data;
       }catch (error) {
        console.error("login service error: ", error);
        throw error;
       }
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