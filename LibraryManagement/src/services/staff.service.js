import createApiClient from './api.service';
class StaffService {
    constructor(baseUrl = '/api/librarymanagement/staff') {
        this.api = createApiClient(baseUrl);
    }

    async getAllStaff() {
        return (await this.api.get('/')).data;
    }
    
    async getStaffById(staffId) {
        return (await this.api.get(`/${staffId}`)).data;
    }

    async createStaff(staffData) {
       try {
            console.log('Service: Sending data:', staffData); 
            const response = await this.api.post('/', staffData);
            console.log('Service: Success response:', response); 
            return response.data;
        } catch (error) {
            console.log('Service: Error caught:', error); 
            console.log('Service: Error response:', error.response); 
            throw error;
       }
    }


    async login(email, password) {
        console.log('Staff service login called with:', { email, password: password ? '***' : 'empty' });
        
        try {
            const response = await this.api.post('/login', { email, password });
            console.log('Staff service response:', response);
            return response.data;
        } catch (error) {
            console.error('Staff service error:', error);
            throw error;
        }
    }

    async updateStaffInfo(staffId, staffData) {
        return  ( await this.api.put(`/${staffId}`, staffData)).data;
    }

    async changePassword(staffId, newPassword) {
        return (await this.api.put(`/${staffId}/password`,  newPassword )).data;
    }


    async logout() {
        return (await this.api.post('/logout')).data;
    }

    async deleteStaff(staffId) {
        return (await this.api.delete(`/${staffId}`)).data;
    }
}

export default new StaffService();