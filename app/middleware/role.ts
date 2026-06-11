import { currentUserData } from "~/services/authService"

export default defineNuxtRouteMiddleware((to) => {

  const user = currentUserData.value

  const roles = to.meta.roles as string[] | undefined

  if (!roles) return

  if (!user || !roles.includes(user.role)) {
    return navigateTo('/dashbord/staff')
  }
})