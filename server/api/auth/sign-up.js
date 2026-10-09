import bcrypt from "bcryptjs";
import User from "../../utils/models/user";
import { SignUpSchema } from "../../utils/schemas/signup-schema";

export default defineEventHandler(async (event) => {
  try {
    await dbConnect();
    const body = await readBody(event);
    const { email, password } = body;

    try {
      await SignUpSchema.validate(body, { abortEarly: false });
    } catch (validationError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation failed",
        data: {
          errorsArray: validationError.errors,
        },
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await setUserSession(event, {
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });

    return {
      success: true,
      user: {
        id: user._id,
        email: user.email,
      },
    };
  } catch (e) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.statusMessage || e.message,
      data: e.data || null,
    });
  }
});
