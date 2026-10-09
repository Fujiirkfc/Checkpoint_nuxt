import * as yup from "yup";

// Define validation schema
export const EventSchema = yup.object({
  title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
  content: yup
    .string()
    .required("Content is required")
    .min(10, "Content must be at least 10 characters"),
  date: yup.object().default(null).nullable(),
});
