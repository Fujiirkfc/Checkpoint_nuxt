import UserEvent from "../../utils/models/user-event";
import { checkUserSession } from "../../utils/index";

export default defineEventHandler(async (event) => {
  try {
    await dbConnect();
    const session = await checkUserSession(event);

    const body = await readBody(event);
    const eventId = body.id;
    const action = body.action;

    if (!eventId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Event ID required",
      });
    }

    if (action === "delete") {
      const deleteEvent = await UserEvent.findOneAndDelete({
        _id: eventId,
        owner: session.id,
      });

      if (!deleteEvent) {
        throwNotFoundError();
      }
    } else {
      const updateEvent = await UserEvent.findOneAndUpdate(
        { _id: eventId, owner: session.id },
        { status: "completed" },
      );
      if (!updateEvent) {
        throwNotFoundError();
      }
    }

    function throwNotFoundError() {
      throw createError({
        statusCode: 404,
        statusMessage: "Event not found or not allowed",
      });
    }
    return { message: "success" };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: err.statusMessage || "Internal server error",
    });
  }
});
