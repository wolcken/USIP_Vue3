<template>
    <div>
        <h1 class="title">Categories</h1>

        <div class="mb-3" style="display: flex; justify-content: center; margin: 10px 10%;">
            <button type="button" class="btn btn-outline-success btn-sm" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                New
            </button>
            <input type="text" class="form-control" id="name" placeholder="Search" v-model="search"
                @keypress.enter="getCategories()" @search="getCategories()">
            <button type="submit" class="btn btn-outline-primary btn-sm" @click="getCategories()">Search</button>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">New Category</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit="addCategory()">
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
            <table class="table table-primary table-striped">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="cat in categories" :key="cat.id">
                        <th scope="row">{{ cat.id }}</th>
                        <td>{{ cat.name }}</td>
                        <td>{{ cat.brand }}</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-success btn-sm" @click="editar(cat)">Edit</button>
                                <button type="button" class="btn btn-danger btn-sm" @click="eliminar(cat)">Delet</button>
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
            categories: [],
            search: "",
            payload: {
                name: "",
                brand: ""
            }
        }
    },
    methods: {
        getCategories() {
            axios
                .get('http://localhost:3000/categories?q=' + this.search)
                .then(response => {
                    this.categories = response.data;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        addCategory() {
            axios
                .post('http://localhost:3000/categories', this.payload)
                .then(response => {
                    this.categories.push(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        editar(item) {
            this.$router.push('categories/' + item.id + '/editar')
        },
        eliminar(item) {
            axios
                .delete('http://localhost:3000/categories/' + item.id)
                .then(response => {
                    console.log(response);
                    this.getCategories();
                    location.reload();
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    mounted() {
        this.getCategories();
    }
}
</script>