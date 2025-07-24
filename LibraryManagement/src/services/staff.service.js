import createApiClient from './api.service';
class StaffService {
    constructor(baseUrl = '/api/staff') {
        this.api = createApiClient(baseUrl);
    }

    async getAllStaff() {
        return (await this.api.get('/')).data;
    }
    
    async getStaffById(staffId) {
        return (await this.api.get(`/${staffId}`)).data;
    }

    async createStaff(staffData) {
        return (await this.api.post('/', staffData)).data;
    }


    async login(staffData) {
        return (await this.api.post('/login', staffData)).data;
    }

    async updateStaffInfo(staffId, staffData) {
        return  ( await this.api.put(`/${staffId}`, staffData)).data;
    }

    async changePassword(staffId, newPassword) {
        return (await this.api.put(`/${staffId}/password`, { newPassword })).data;
    }

    async logout() {
        return (await this.api.post('/logout')).data;
    }

    async deleteStaff(staffId) {
        return (await this.api.delete(`/${staffId}`)).data;
    }
}

export default new StaffService();