export function appendObjectToFormData(
  formData: FormData,
  data: Record<string, any>,
  parentKey?: string,
): void {
  Object.entries(data).forEach(([key, value]) => {
    const formKey = parentKey ? `${parentKey}[${key}]` : key;

    if (value instanceof File) {
      formData.append(formKey, value);
    } else if (typeof value === "object" && value !== null) {
      appendObjectToFormData(formData, value, formKey); // Recursively handle nested objects
    } else {
      formData.append(formKey, String(value));
    }
  });
}
