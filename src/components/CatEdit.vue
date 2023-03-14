<template>
    <div>
        <h1>Edit Category</h1>
        <div style="width: 50%; margin-left: 25%; margin-right: 25%;">
            <form @submit.prevent="editar()">
                <div class="mb-3">
                    <label class="form-label">Category</label>
                    <input type="text" class="form-control" v-model="payload.name">
                </div>
                <div class="mb-3">
                    <label class="form-label">Brand</label>
                    <input type="text" class="form-control" v-model="payload.brand">
                </div>
                <div class="mb-3 form-check" style="text-align: left;">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" class="btn btn-primary">Edit</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            categoryId: 0,
            payload: {
                name: "",
                brand: ""
            }
        }
    },
    methods: {
        load() {
            this.categoryId = this.$route.params.id;
        },
        getCategory() {
            axios
                .get('http://localhost:3000/categories/' + this.categoryId)
                .then(response => {
                    this.payload = response.data;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        editar() {
            axios
                .patch('http://localhost:3000/categories/' + this.categoryId, this.payload)
                .then(response => {
                    this.payload = response.data;
                    window.history.back();
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    mounted() {
        this.load();
        this.getCategory();
    }
}
</script>