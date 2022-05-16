export const activeTaskUser = (task, user) => {
  if (task.houseUser.user.id === user.id) {
    return true;
  }
  return false
}
