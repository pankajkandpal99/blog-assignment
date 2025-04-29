import { compare, hash } from "bcryptjs";
import { env } from "../../../config/env";
import { RequestContext } from "../../../middleware/context";
import jwt from "jsonwebtoken";
import { User } from "../../../models/user.model";
import { AuthenticationError, ConflictError } from "../../../error-handler";
import { HttpResponse } from "../../../utils/service-response";
import { ROLE } from "../../../config/constants";

const generateToken = (userId: string, role: ROLE) =>
  jwt.sign({ userId, role }, env.JWT_SECRET, { expiresIn: "7d" });

const hashPassword = (password: string) => hash(password, 12);

export const AuthController = {
  register: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { name, email, password } = context.body;

        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser) {
          throw new ConflictError("email already registered", {
            field: "email",
            value: email,
          });
        }

        const hashedPassword = await hashPassword(password);
        const user = new User({
          name: name,
          password: hashedPassword,
          role: "USER",
          ...(email && { email }),
        });

        await user.save({ session });

        return {
          id: user._id.toString(),
          name: user.name,
          role: user.role,
          ...(user.email && { email: user.email }),
        };
      });

      return HttpResponse.send(context.res, result, 201);
    } catch (error) {
      throw error;
    }
  },

  login: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { email, password } = context.body;

        if (!email || !password) {
          throw new AuthenticationError("Email and password are required");
        }

        const user = await User.findOne({ email: email.toLowerCase() })
          .select("+password")
          .session(session);

        if (!user) {
          throw new AuthenticationError("Invalid credentials");
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          throw new AuthenticationError("Invalid credentials");
        }

        const token = generateToken(user._id.toString(), user.role as ROLE);

        context.res.cookie("token", token, {
          httpOnly: false,
          secure: env.NODE_ENV === "production",
          sameSite: env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          domain: env.NODE_ENV === "production" ? env.COOKIE_DOMAIN : undefined,
          path: "/",
        });

        const userObject = user.toObject();
        delete (userObject as { password?: string }).password;
        delete (userObject as { __v?: any }).__v;

        return {
          user: userObject,
        };
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      throw error;
    }
  },
};
