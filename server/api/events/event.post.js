import UseEvent from "../../utils/models/user-event";
import { checkUserSession } from "../../utils/index";
import { EventSchema } from "../../utils/schemas/event-schema";

export default defineEventHandler(async (event) => {
  try {
    await dbConnect();
    const body = await readBody(event);
    const session = await checkUserSession(event);

    try {
      await EventSchema.validate(body, { abortEarly: false });
    } catch (validationError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation failed",
        data: validationError.errors,
      });
    }

    const userEvent = new UseEvent({
      ...body,
      owner: session.id,
    });
    await userEvent.save();
    return { status: 201, message: "Event created successfully" };
  } catch (err) {
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || err.message,
      data: err.data || null,
    });
  }
});
