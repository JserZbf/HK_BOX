import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';

import EngineView from '@/components/engine-market/EngineView.vue';
import SetDetailStyle1 from '@/components/engine-market/style1/index.vue';
import SetDetailStyle2 from '@/components/engine-market/style2/index.vue';
import SetDetailStyle3 from '@/components/engine-market/style3/index.vue';
import SetDetailStyle4 from '@/components/engine-market/style4/index.vue';
import SetDetailStyle5 from '@/components/engine-market/style5/index.vue';
import SetDetailStyle6 from '@/components/engine-market/style6/index.vue';
import SetDetailStyle7 from '@/components/engine-market/home/home.vue';
import MainView from '@/components/MainView.vue';
import SetDetail from '@/components/setDetail/oldSetDetail.vue';
const routes: RouteRecordRaw[] = [
    // {
    //     path: "/",
    //     redirect: {
    //         name: "home",
    //     },
    // },
    {
        path: '/',
        component: MainView,
        meta: { auth: [''] },
        children: [
            {
                path: '',
                redirect: {
                    name: 'home'
                }
            },
            {
                path: '/engine',
                component: EngineView,
                children: [
                    {
                        path: '/engine/style1',
                        component: SetDetailStyle1
                    },
                    {
                        path: '/engine/style2',
                        component: SetDetailStyle2
                    },
                    {
                        path: '/engine/style3',
                        component: SetDetailStyle3
                    },
                    {
                        path: '/engine/style4',
                        component: SetDetailStyle4
                    },
                    {
                        path: '/engine/style5',
                        component: SetDetailStyle5
                    },
                    {
                        path: '/engine/style6',
                        component: SetDetailStyle6
                    },
                    {
                        name: 'home',
                        path: '/engine/home',
                        component: SetDetailStyle7
                    }

                ]
            },
            {
                path: '/setDetail',
                component: SetDetail,
            },

        ],
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/engine/home",
    },
];

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
