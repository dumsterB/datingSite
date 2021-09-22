export default function(ctx) {
  if (!localStorage.getItem("token") &&
  ctx.route.path !== "/" &&
  ctx.route.path !== "/en" &&
  ctx.route.path !== "/empty" &&
  ctx.route.path !== "/en/empty") {
    ctx.next(ctx.localePath("/"));
  }
  if (localStorage.getItem("token") && (ctx.route.path === "/" || ctx.route.path === "/en")) {
    ctx.next(ctx.localePath("/profile"));
  }
}
