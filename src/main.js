import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'

//componentes
import HomeComponent from './components/HomeComponent'
import CategoriesComponent from './components/CategoriesComponent'
import ProductsComponent from './components/ProductsComponent'
import CatEdit from './components/CatEdit'
import ProdEdit from './components/ProdEdit'


//objetos rutas  -- conf
const routes = [
    {
        path: '/', component: HomeComponent
    },
    {
        path: '/categories', component: CategoriesComponent
    },
    {
        path: '/products', component: ProductsComponent
    },
    {
        path: '/categories/:id/editar', name: 'category_editar', component: CatEdit
    },
    {
        path: '/products/:id/editar', name: 'product_editar', component: ProdEdit
    }
]

//rutas -- view
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//instancia
const app = createApp(App)
app.use(router)
app.mount('#app')