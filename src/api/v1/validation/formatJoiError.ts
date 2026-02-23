import { ValidationErrorItem } from "joi";

export function formatJoiErrors(details: ValidationErrorItem[]) {
  return details.map((d) => ({
    field: d.context?.key,
    message: d.message,
  }));
}