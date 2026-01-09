export function isAdmin() {
  try {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return false;
    return user.role === "admin";
  } catch {
    return false;
  }
}
