import Vue from "vue";
import VueRouter from "vue-router";
import StakingInviterForLP1 from "../views/staking-inviter/StakingInviterForLP1.vue";
import StakingInviterForLPHistory1 from "../views/staking-inviter/StakingInviterForLPHistory1.vue";
import StakingInviterForLP2 from "../views/staking-inviter/StakingInviterForLP2.vue";
import StakingInviterForLPHistory2 from "../views/staking-inviter/StakingInviterForLPHistory2.vue";
import StakingInviterForLP3 from "../views/staking-inviter/StakingInviterForLP3.vue";
import StakingInviterForLPHistory3 from "../views/staking-inviter/StakingInviterForLPHistory3.vue";
import StakingInviterForLP4 from "../views/staking-inviter/StakingInviterForLP4.vue";
import StakingInviterForLPHistory4 from "../views/staking-inviter/StakingInviterForLPHistory4.vue";
import StakingInviterForLP5 from "../views/staking-inviter/StakingInviterForLP5.vue";
import StakingInviterForLPHistory5 from "../views/staking-inviter/StakingInviterForLPHistory5.vue";
import StakingInviterForLP6 from "../views/staking-inviter/StakingInviterForLP6.vue";
import StakingInviterForLPHistory6 from "../views/staking-inviter/StakingInviterForLPHistory6.vue";
import StakingInviterForLP7 from "../views/staking-inviter/StakingInviterForLP7.vue";
import StakingInviterForLPHistory7 from "../views/staking-inviter/StakingInviterForLPHistory7.vue";
import StakingInviterForLP8 from "../views/staking-inviter/StakingInviterForLP8.vue";
import StakingInviterForLPHistory8 from "../views/staking-inviter/StakingInviterForLPHistory8.vue";
import StakingInviterForLP9 from "../views/staking-inviter/StakingInviterForLP9.vue";
import StakingInviterForLPHistory9 from "../views/staking-inviter/StakingInviterForLPHistory9.vue";
import StakingInviterForLP10 from "../views/staking-inviter/StakingInviterForLP10.vue";
import StakingInviterForLPHistory10 from "../views/staking-inviter/StakingInviterForLPHistory10.vue";
import StakingInviterForLP11 from "../views/staking-inviter/StakingInviterForLP11.vue";
import StakingInviterForLPHistory11 from "../views/staking-inviter/StakingInviterForLPHistory11.vue";
import StakingInviterForLP12 from "../views/staking-inviter/StakingInviterForLP12.vue";
import StakingInviterForLPHistory12 from "../views/staking-inviter/StakingInviterForLPHistory12.vue";
import StakingInviterForLP13 from "../views/staking-inviter/StakingInviterForLP13.vue";
import StakingInviterForLPHistory13 from "../views/staking-inviter/StakingInviterForLPHistory13.vue";
import StakingInviterForSingle1 from "../views/staking-inviter/StakingInviterForSingle1.vue";
import StakingInviterForSingleHistory1 from "../views/staking-inviter/StakingInviterForSingleHistory1.vue";
import StakingInviterForSingle2 from "../views/staking-inviter/StakingInviterForSingle2.vue";
import StakingInviterForSingleHistory2 from "../views/staking-inviter/StakingInviterForSingleHistory2.vue";
import StakingInviterForSingle3 from "../views/staking-inviter/StakingInviterForSingle3.vue";
import StakingInviterForSingleHistory3 from "../views/staking-inviter/StakingInviterForSingleHistory3.vue";
import StakingInviterForSingle4 from "../views/staking-inviter/StakingInviterForSingle4.vue";
import StakingInviterForSingleHistory4 from "../views/staking-inviter/StakingInviterForSingleHistory4.vue";
import StakingInviterForSingle5 from "../views/staking-inviter/StakingInviterForSingle5.vue";
import StakingInviterForSingleHistory5 from "../views/staking-inviter/StakingInviterForSingleHistory5.vue";
import StakingInviterForSingle6 from "../views/staking-inviter/StakingInviterForSingle6.vue";
import StakingInviterForSingleHistory6 from "../views/staking-inviter/StakingInviterForSingleHistory6.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/home/Index.vue"),
    children: [
      {
        path: "",
        name: "Home",
        redirect: "/staking",
        component: () => import("@/views/home/Index.vue")
      },
      {
        path: "/staking",
        name: "Staking",
        redirect: "/staking/lp",
        component: () => import("@/layouts/home/ViewBlank.vue"),
        children: [
          {
            path: "/staking/lp",
            name: "StakingInviterForLP",
            redirect: "/staking/lp/13",
            component: () => import("@/layouts/home/ViewBlank.vue"),
            children: [
              {
                path: "/staking/lp/13",
                name: "StakingInviterForLP13",
                component: StakingInviterForLP13
              },
              {
                path: "/staking/lp/13/history",
                name: "StakingInviterForLP13History",
                component: StakingInviterForLPHistory13
              },
              {
                path: "/staking/lp/12",
                name: "StakingInviterForLP12",
                component: StakingInviterForLP12
              },
              {
                path: "/staking/lp/12/history",
                name: "StakingInviterForLP12History",
                component: StakingInviterForLPHistory12
              },
              {
                path: "/staking/lp/11",
                name: "StakingInviterForLP11",
                component: StakingInviterForLP11
              },
              {
                path: "/staking/lp/11/history",
                name: "StakingInviterForLP11History",
                component: StakingInviterForLPHistory11
              },
              {
                path: "/staking/lp/10",
                name: "StakingInviterForLP10",
                component: StakingInviterForLP10
              },
              {
                path: "/staking/lp/10/history",
                name: "StakingInviterForLP10History",
                component: StakingInviterForLPHistory10
              },
              {
                path: "/staking/lp/9",
                name: "StakingInviterForLP9",
                component: StakingInviterForLP9
              },
              {
                path: "/staking/lp/9/history",
                name: "StakingInviterForLP9History",
                component: StakingInviterForLPHistory9
              },
              {
                path: "/staking/lp/8",
                name: "StakingInviterForLP8",
                component: StakingInviterForLP8
              },
              {
                path: "/staking/lp/8/history",
                name: "StakingInviterForLP8History",
                component: StakingInviterForLPHistory8
              },
              {
                path: "/staking/lp/7",
                name: "StakingInviterForLP7",
                component: StakingInviterForLP7
              },
              {
                path: "/staking/lp/7/history",
                name: "StakingInviterForLP7History",
                component: StakingInviterForLPHistory7
              },
              {
                path: "/staking/lp/6",
                name: "StakingInviterForLP6",
                component: StakingInviterForLP6
              },
              {
                path: "/staking/lp/6/history",
                name: "StakingInviterForLP6History",
                component: StakingInviterForLPHistory6
              },
              {
                path: "/staking/lp/5",
                name: "StakingInviterForLP5",
                component: StakingInviterForLP5
              },
              {
                path: "/staking/lp/5/history",
                name: "StakingInviterForLP5History",
                component: StakingInviterForLPHistory5
              },
              {
                path: "/staking/lp/4",
                name: "StakingInviterForLP4",
                component: StakingInviterForLP4
              },
              {
                path: "/staking/lp/4/history",
                name: "StakingInviterForLP4History",
                component: StakingInviterForLPHistory4
              },
              {
                path: "/staking/lp/3",
                name: "StakingInviterForLP3",
                component: StakingInviterForLP3
              },
              {
                path: "/staking/lp/3/history",
                name: "StakingInviterForLP3History",
                component: StakingInviterForLPHistory3
              },
              {
                path: "/staking/lp/2",
                name: "StakingInviterForLP2",
                component: StakingInviterForLP2
              },
              {
                path: "/staking/lp/2/history",
                name: "StakingInviterForLP2History",
                component: StakingInviterForLPHistory2
              },
              {
                path: "/staking/lp/1",
                name: "StakingInviterForLP1",
                component: StakingInviterForLP1
              },
              {
                path: "/staking/lp/1/history",
                name: "StakingInviterForLP1History",
                component: StakingInviterForLPHistory1
              }
            ]
          },
          {
            path: "/staking/single",
            name: "StakingInviterForSingle",
            redirect: "/staking/single/6",
            component: () => import("@/layouts/home/ViewBlank.vue"),
            children: [
              {
                path: "/staking/single/6",
                name: "StakingInviterForSingle6",
                component: StakingInviterForSingle6
              },
              {
                path: "/staking/single/6/history",
                name: "StakingInviterForSingle6History",
                component: StakingInviterForSingleHistory6
              },
              {
                path: "/staking/single/5",
                name: "StakingInviterForSingle5",
                component: StakingInviterForSingle5
              },
              {
                path: "/staking/single/5/history",
                name: "StakingInviterForSingle5History",
                component: StakingInviterForSingleHistory5
              },
              {
                path: "/staking/single/4",
                name: "StakingInviterForSingle4",
                component: StakingInviterForSingle4
              },
              {
                path: "/staking/single/4/history",
                name: "StakingInviterForSingle4History",
                component: StakingInviterForSingleHistory4
              },
              {
                path: "/staking/single/3",
                name: "StakingInviterForSingle3",
                component: StakingInviterForSingle3
              },
              {
                path: "/staking/single/3/history",
                name: "StakingInviterForSingle3History",
                component: StakingInviterForSingleHistory3
              },
              {
                path: "/staking/single/2",
                name: "StakingInviterForSingle2",
                component: StakingInviterForSingle2
              },
              {
                path: "/staking/single/2/history",
                name: "StakingInviterForSingle2History",
                component: StakingInviterForSingleHistory2
              },
              {
                path: "/staking/single/1",
                name: "StakingInviterForSingle1",
                component: StakingInviterForSingle1
              },
              {
                path: "/staking/single/1/history",
                name: "StakingInviterForSingle1History",
                component: StakingInviterForSingleHistory1
              }
            ]
          }
        ]
      },
      {
        path: "/404",
        component: () => import("@/views/home/Index.vue")
      },
      {
        path: "*",
        redirect: "/"
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash };
    if (savedPosition) return savedPosition;

    return { x: 0, y: 0 };
  },
  routes
});

export default router;
