export function validateSigninData(email: string, password: string) {
  if (email.length == 0 || password.length == 0) {
    return false;
  }
  return true;
}
