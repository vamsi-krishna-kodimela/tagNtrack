import bcrypt from "bcrypt";

export default class EncryptionHelper {
  static hashPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  static comparePassword = (
    password: string,
    hashedPassword: string
  ): boolean => bcrypt.compareSync(password, hashedPassword);
}
