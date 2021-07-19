export default function (ctx) {
  if (!localStorage.getItem('token') && ctx.route.path !== '/') {
    ctx.next('/')
  }
  if (localStorage.getItem('token') && ctx.route.path === '/' && ctx.route.path !== '/profile') {
    ctx.next('/swipes')
  }
}
