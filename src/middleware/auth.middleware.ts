import { decodeToken } from "../helpers/jwt.helper";
import User from "../schema/user.schema";

const protectedRoute = async (req: any, res: any, next: any) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer")) {
    const token = authorization.split(" ")[1];
    if (token) {
      const { id } = decodeToken(token) as { id: string };
      const user: any = await User.findById(id).select("-password");
      console.log(user);
      
      if (user) {
        req.user = {
          ...user._doc,
          _id: user._id?.toString(),
        };
      } else {
        res.status(401).send("Unauthorized access!");
        return;
      }
    } else {
      res.status(401).send("Unauthorized access!");
      return;
    }
  } else {
    res.status(401).send("Unauthorized access!");
    return;
  }
  next();
};

export { protectedRoute };
