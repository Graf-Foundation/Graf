import Vue from "vue";
import Router from "vue-router";
//import { authGuard } from "./auth/authGuard";

Vue.use(Router);


export default new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/graf",
            alias: "/graf",
            name: "Graf",
            component: () => import("./components/Graf")
        },
        {
            path: "/about",
            name: "About",
            component: () => import("./components/About"),
            //beforeEnter: authGuard
        }
    
    
    ]
})
;