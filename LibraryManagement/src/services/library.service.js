import createApiClient from './api.service';

class LibraryService {
    constructor (baseUrl = '/api/librarymanagement/libraryService') {
        this.api = createApiClient(baseUrl);
    }

    async borrowRequest(borrowData) {
        return (await this.api.post('/', borrowData)).data;
    }

    async getAllBorrowRequest() {
        return (await this.api.get('/')).data;
    }

    async approveRequest(approveData) {
        return (await this.api.put('/approve', approveData)).data;
    }

    async rejectRequest(rejectData) {
        return (await this.api.put('/rejected', rejectData)).data;
    }

    async getRequestByStatus(status) {
        return (await this.api.get(`/status/${status}`)).data;
    }

 

    async getRequestsByReaderId(readerID) {
        return (await this.api.post('/reader/requests', { readerId: readerID })).data;
    }

    async getRequestsHistoryByReaderId(readerID) {
        return (await this.api.post('/reader/history', { readerId: readerID })).data;
    }


    async returnBook(returnData) {
        return (await this.api.put('/return', returnData)).data;
    }

    async lostBook(lostData) {
        return (await this.api.put('/lost', lostData)).data;
    }

    async getRequestById(requestId) {
        return (await this.api.get(`/${requestId}`)).data;
    }

    async deleteRequest(requestId) {
        return (await this.api.delete(`/${requestId}`)).data;
    }



}

export default new LibraryService();