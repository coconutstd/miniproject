const checkLoggedIn = (ctx, next) => {
  if (!ctx.state.user) {
    ctx.statue = 401
    return
  }
  return next()
}

export default checkLoggedIn
