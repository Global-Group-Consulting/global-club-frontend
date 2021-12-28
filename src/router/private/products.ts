const prefix = "/products";
const meta = {
  isPrivate: true
}

export default [
  {
    path: prefix,
    component: () => import("@/views/private/products/Home.vue"),
    name: "private.products",
    meta
  },
  {
    path: prefix + "/favourites",
    component: () => import("@/views/private/Favourites.vue"),
    name: "private.products.favourites",
    meta
  },
  {
    path: prefix + "/:id",
    component: () => import("@/views/private/products/Details.vue"),
    name: "private.products.details",
    meta
  },
];
