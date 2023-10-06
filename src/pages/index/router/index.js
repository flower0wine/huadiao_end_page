'use strict';
import VueRouter from "vue-router";

export default new VueRouter({
    base: '/',
    routes: [
        {
            path: '/',
            component: () => import ('@/pages/index/components/ManageNavigation'),
            children: [
                {
                    name: 'manageHome',
                    path: 'manageHome',
                    component: () => import("@/pages/index/views/manageHome"),
                },
                {
                    name: 'systemAnnouncement',
                    path: 'systemAnnouncement',
                    component: () => import("@/pages/index/views/systemAnnouncement")
                },
                {
                    name: 'userCollection',
                    path: 'userCollection',
                    component: () => import ("@/pages/index/views/userInfo"),
                },
            ]
        },
    ]
})