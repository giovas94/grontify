export const handleUserEmails = (user) => {
  if (user && user.emails) {
    return user.emails[0].address
  } else if (user.services && user.services.facebook && user.services.facebook.email) {
    return user.services.facebook.email
  } {
    return ''
  }
}
