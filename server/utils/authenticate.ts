import jwt from "jsonwebtoken";


export const authenticate = token => {
  userInfo = jwt.verify(token, "yep_session");
  if (userInfo.PersonId) {
    valid = true;
  }
};

export const newToken = (userInfo) => {
  var token = jwt.sign(JSON.parse(userInfo), "cloud_sql_session", { expiresIn: "7d" });
  return token
}