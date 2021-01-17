const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "dashboard", component: () => import("pages/Dashboard.vue") },
      { path: "tracker", component: () => import("pages/Tracker.vue") },
      { path: "about", component: () => import("pages/About.vue") },
      { path: "auth", component: () => import("pages/Auth.vue") },
      { path: "download", component: () => import("pages/Download.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
