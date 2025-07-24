import createApiClient from './api.service';

class BookService {
    constructor(baseUrl = '/api/librarymanagement/book') {
        this.api = createApiClient(baseUrl);    
    }
    async getAllBooks() {
        return (await this.api.get("/")).data;
    }

    async getBookById(bookId) {
        return (await this.api.get(`/${bookId}`)).data;
    }

    async createBook(bookData) {
        return (await this.api.post("/", bookData)).data;
    }

    async updateBook(bookId, bookData) {
        return (await this.api.put(`/${bookId}`, bookData)).data;
    }

    async deleteBook(bookId) {
        return (await this.api.delete(`/${bookId}`)).data;
    }

    async deleteAllBooks() {
        return (await this.api.delete('/')).data;
    }

    async getBooksByNXB(nxbId) {
        return (await this.api.get(`/nxb/${nxbId}`)).data;
    }
}

export default new BookService();
