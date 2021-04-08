import Vue from "vue";
import Router from "vue-router";
import VueResource from 'vue-resource';
//import { authGuard } from "./auth/authGuard";

Vue.use(Router);
Vue.use(VueResource);


export default new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            alias: "/graf",
            name: "Graf",
            component: () => import("./components/Graf")
        },
        {
            path: "/about",
            name: "About",
            component: () => import("./components/About"),
        }
    ]
})
;
