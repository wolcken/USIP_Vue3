<template>
    <div>
        <h1>Edit Product</h1>
        <div style="width: 50%; margin-left: 25%; margin-right: 25%;">
            <form @submit.prevent="editar()">
                <div class="mb-3">
                    <label class="form-label">Detail</label>
                    <input type="text" class="form-control" v-model="payload.detail">
                </div>
                <div class="mb-3">
                    <label class="form-label">Price</label>
                    <input type="text" class="form-control" v-model="payload.price">
                </div>
                <div class="mb-3">
                    <label class="form-label">Category</label>
                    <select class="form-select" aria-label="Default select example" v-model="payload.categoryId">
                        <option v-for="cat in categories" :value="cat.id" :key="cat.id">{{ cat.name }}</option>
                    </select>
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
            productId: 0,
            payload: {
                detail: "",
                price: "",
                categoryId: ""
            },
            categories: []
        }
    },
    methods: {
        load() {
            this.productId = this.$route.params.id;
        },
        getProduct() {
            axios
                .get('http://localhost:3000/products/' + this.productId)
                .then(response => {
                    this.payload = response.data;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        editar() {
            axios
                .patch('http://localhost:3000/products/' + this.productId, this.payload)
                .then(response => {
                    this.payload = response.data;
                    window.history.back();
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getCategories() {
            axios
                .get('http://localhost:3000/categories')
                .then(response => {
                    this.categories = response.data;
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
    mounted() {
        this.load();
        this.getProduct();
        this.getCategories();
    }
}
</script>