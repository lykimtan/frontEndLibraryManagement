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

   async approveRequest(borrowId, staffId) {
        console.log('Approving request:', { borrowId, staffId });
        
        return (await this.api.put('/approve', {
            borrowId: borrowId,
            staffId: staffId
        })).data;
    }

     async borrowed(borrowId, staffId) {
        console.log('Borrowed:', { borrowId, staffId });
        
        return (await this.api.put('/borrowed', {
            borrowId: borrowId,
            staffId: staffId
        })).data;
    }

    async returnBook(borrowId, staffId) {
        console.log('Returning book:', { borrowId, staffId });

        return (await this.api.put('/return', {
            borrowId: borrowId,
            returnStaffId: staffId
        })).data;
    }

    async rejectRequest(borrowId, staffId, reason) {
        const rejectData = { borrowId, staffId, reason };
        return (await this.api.put('/rejected', rejectData)).data;
    }

    async lostBook(borrowId, staffId) {
        console.log('Marking book as lost:', { borrowId, staffId });

        return (await this.api.put('/lost', {
            borrowId: borrowId,
            returnStaffId: staffId
        })).data;
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


    

  

    async getRequestById(requestId) {
        return (await this.api.get(`/${requestId}`)).data;
    }

    async deleteRequest(requestId) {
        return (await this.api.delete(`/${requestId}`)).data;
    }



}

export default new LibraryService();