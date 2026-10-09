import UserEvent from "../../utils/models/user-event";
import { checkUserSession } from "../../utils/index";

export default defineEventHandler(async (event) => {
  try {
    await dbConnect();
    const session = await checkUserSession(event);

    const events = await UserEvent.find({
      owner: session.id,
    })
      .sort({ createdAt: -1 })
      .populate("owner");
    return events;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: err.statusMessage || "Internal server error",
    });
  }
});
