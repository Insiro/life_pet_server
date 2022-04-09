import crypto from "crypto";
export function hash(pwd: string, salt: string): string {
  var hashPassword = crypto
    .createHash("sha512")
    .update(pwd + salt)
    .digest("hex");
  return hashPassword;
}
