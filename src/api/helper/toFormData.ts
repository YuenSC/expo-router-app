/**
 * Converts a JavaScript object to FormData.
 * This method is useful for preparing data to be sent in a web request.
 *
 * @param {Object} obj - The object to convert to FormData.
 * @returns {FormData} The FormData representation of the passed object.
 */
function toFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // If the value is an array, append each item individually.
      value.forEach((item) => formData.append(key + "[]", item));
    } else {
      // For primitive types, append directly.
      formData.append(key, value);
    }
  });
  return formData;
}

export default toFormData;
