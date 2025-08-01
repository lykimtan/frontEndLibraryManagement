<template>
    <div>
        <h3 class="text-center fw-bold p-3">Danh sách NXB</h3>
        <InputSearch @search="handleSearch" />
        <NXBList v-if="filteredNXBCount" :nxbList="filteredNXB" />
          <div v-else class="text-center py-5">
                <i class="fa-solid fa-face-sad-tear"></i>
                <h4 class="text-muted">Không tìm thấy NXB nào phù hợp với từ khoá tìm kiếm</h4>
                <p class="text-muted">
                    {{ searchText ? 'Vui lòng xem lại từ khoá' : 'Loading NXB...' }}
                </p>
            </div>

    </div>
</template>

<script>
import NXBList from '@/components/NXBList.vue';
import nxbService from '@/services/nxb.service';
import InputSearch from '@/components/InputSearch.vue';

export default {
    name: 'NXBPage',
    data() {
        return {
            nxbList: [],
            searchText: '',
            error: null,
            success: null,
            loading: false
        }
    },

    components: {
        NXBList,
        InputSearch
    },

    computed: {
        nxbStrings() {
            return this.nxbList.map((nxb) => {
                const { tennxb, diaChi } = nxb;
                return [tennxb, diaChi]
                    .filter(item => item) 
                    .join(' ')
                    .toLowerCase();
            });
        },
        filteredNXB() {
            if (!this.searchText) return this.nxbList;
            
            const searchLower = this.searchText.toLowerCase();
            return this.nxbList.filter((_nxb, index) => 
                this.nxbStrings[index].includes(searchLower)
            );
        },
        filteredNXBCount() {
            return this.filteredNXB.length;
        }

    },

    methods: {

        handleSearch(searchValue) {
            this.searchText = searchValue;
        },
        async retrieveBooks() {
            this.loading = true;
            try {
                this.nxbList = await nxbService.getAllNXB();
            } catch (error) {
                console.error('Error fetching NXB list:', error);
            } finally {
                this.loading = false;
            }
        },
    },
    async mounted() {
        await this.retrieveBooks();
    }
}
</script>