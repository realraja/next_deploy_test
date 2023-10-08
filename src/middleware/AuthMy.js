import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

const AuthMy = async () => {
//   const token = req.headers.get("Authorization")?.split(" ")[1];
const token = await Cookies.get('token');
console.log('token========>',token);
  if (!token) return false;

  try {
    const extractAuthUserInfo = jwt.verify(token, "rajesh8875");
    if (extractAuthUserInfo) return extractAuthUserInfo;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default AuthMy;
