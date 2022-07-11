export const activeTaskUser = (task, user) => {
  if (task.Active.User.id === user.id) {
    return true;
  }
  return false
}
