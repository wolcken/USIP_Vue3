<template>
    <div>
        <h1 class="title">Produtcs</h1>

        <div class="mb-3" style="display: flex; justify-content: center; margin: 10px 10%;">
            <button type="button" class="btn btn-outline-success btn-sm" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                New
            </button>
            <input type="text" class="form-control" id="name" placeholder="Search" v-model="search"
                @keypress.enter="getProducts()" @search="getProducts()">
            <button type="submit" class="btn btn-outline-primary btn-sm" @click="getProducts()">Search</button>
        </div>
        <i class="bi bi-funnel-fill">Precio</i> <input type="range" id="volume" min="0" max="100" step="1"
            v-model="range">{{ range }}$

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">New Product</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit="addProduct()">
                            <div class="mb-3">
                                <input type="text" class="form-control" id="name" placeholder="Name Category"
                                    v-model="payload.name">
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="brand" placeholder="Brand Category"
                                    v-model="payload.brand">
                            </div>
                            <button type="submit" class="btn btn-outline-success">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Table -->
        <div style="padding: 10px;">
            <table class="table table-success table-striped">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Detail</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="prod in products" :key="prod.id" v-show="prod.price >= range">
                        <th scope="row">{{ prod.id }}</th>
                        <td>{{ prod.detail }}</td>
                        <td>$ {{ prod.price }}</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-success btn-sm" @click="editar(prod)">Edit</button>
                                <button type="button" class="btn btn-danger btn-sm" @click="eliminar(prod)">Delet</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            products: [],
            search: "",
            range: 0,
            payload: {
                name: "",
                brand: ""
            }
        }
    },
    methods: {
        getProducts() {
            axios
                .get('http://localhost:3000/products?q=' + this.search)
                .then(response => {
                    this.products = response.data;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        addProduct() {
            axios
                .post('http://localhost:3000/products', this.payload)
                .then(response => {
                    this.products.push(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        editar(item) {
            this.$router.push('products/' + item.id + '/editar')
        },
        eliminar(item) {
            axios
                .delete('http://localhost:3000/products/' + item.id)
                .then(response => {
                    console.log(response);
                    this.getProducts();
                    location.reload();
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    mounted() {
        this.getProducts();
    }
}
</script>