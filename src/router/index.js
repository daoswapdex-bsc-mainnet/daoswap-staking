import Vue from "vue";
import VueRouter from "vue-router";
import StakingInviterForLP1 from "../views/staking-inviter/StakingInviterForLP1.vue";
import StakingInviterForLPHistory1 from "../views/staking-inviter/StakingInviterForLPHistory1.vue";
import StakingInviterForLP2 from "../views/staking-inviter/StakingInviterForLP2.vue";
import StakingInviterForLPHistory2 from "../views/staking-inviter/StakingInviterForLPHistory2.vue";
import StakingInviterForLP3 from "../views/staking-inviter/StakingInviterForLP3.vue";
import StakingInviterForLPHistory3 from "../views/staking-inviter/StakingInviterForLPHistory3.vue";
import StakingInviterForSingle1 from "../views/staking-inviter/StakingInviterForSingle1.vue";
import StakingInviterForSingleHistory1 from "../views/staking-inviter/StakingInviterForSingleHistory1.vue";
import StakingInviterForSingle2 from "../views/staking-inviter/StakingInviterForSingle2.vue";
import StakingInviterForSingleHistory2 from "../views/staking-inviter/StakingInviterForSingleHistory2.vue";

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
            redirect: "/staking/lp/3",
            component: () => import("@/layouts/home/ViewBlank.vue"),
            children: [
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
            redirect: "/staking/single/2",
            component: () => import("@/layouts/home/ViewBlank.vue"),
            children: [
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
