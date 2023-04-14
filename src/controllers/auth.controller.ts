import { Request, Response } from "express";
import PopulatedRequest from "../interfaces/populated-payload.interface";
import User from "../schema/user.schema";
import IAuth from "../interfaces/auth.interface";
import IUser from "../interfaces/user.inerface";
import EncryptionHelper from "../helpers/encryption.helper";
import { generateToken } from "../helpers/jwt.helper";

const signupUser = async (req: PopulatedRequest<IAuth>, res: Response) => {
  const signupData = req.body;
  if (
    signupData.name &&
    signupData.mobile &&
    signupData.email &&
    signupData.address &&
    signupData.type &&
    signupData.password
  ) {
    const isEmailExists = await User.findOne<IUser>({
      email: signupData.email,
    });
    const isMobileExists = await User.findOne<IUser>({
      mobile: signupData.mobile,
    });
    if (isEmailExists || isMobileExists) {
      res.status(400).json("User already Exists.");
      return;
    }
    const encrypterPassword = EncryptionHelper.hashPassword(
      signupData.password
    );
    try {
      await User.create({
        ...signupData,
        password: encrypterPassword,
      });
      res.status(200).send("User Created Successfully!");
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).send("Please fill all required fields.");
  }
};

const loginUser = async (req: PopulatedRequest<any>, res: Response) => {
  const signupData = req.body;
  if (signupData.email && signupData.password) {
    try {
      const user = await User.findOne<IAuth>({
        email: signupData.email,
      });
      if (user) {
        const password = user.password!;
        if (EncryptionHelper.comparePassword(signupData.password, password)) {
          console.log(user);

          const token = generateToken(user._id!.toString());
          console.log(token);
          
          res.json({
            token: token,
            name: user.name,
            type: user.type,
          });
          return;
        }
        res.status(400).send("Invalid Credentials!");
        return;
      }
      res.status(400).send("User not found.");
    } catch (error) {
      console.log(error);

      res.status(400).send("Fail to create user.");
    }
  } else {
    res.status(400).send("Email and password are required.");
  }
};

const getUser = async (req: PopulatedRequest<any>, res: Response) => {
  const user = req.user;
  res.json(user);
};

const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user: any = await User.findById(userId).select("-password");
    if (user) {
      res.json({
        ...user._doc,
        _id: user._id?.toString(),
      });
    } else {
      res.status(400).send("User Not found.");
    }
  } catch (err) {
    res.status(400).send("Somthing went wrong.");
  }
};

export { signupUser, loginUser, getUser, getUserById };
