export default function(ctx) {
  if (!localStorage.getItem("token") && ctx.route.path !== "/" && ctx.route.path !== "/en") {
    ctx.next(ctx.localePath("/"));
  }
  if (localStorage.getItem("token") && (ctx.route.path === "/" || ctx.route.path === "/en")) {
    ctx.next(ctx.localePath("/swipes"));
  }
}
