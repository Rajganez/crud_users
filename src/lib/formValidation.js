// /Error validation function
export const validateForm = (formData) => {
  const errors = {};
  if (
    !formData.firstName ||
    formData.firstName.length < 3 ||
    formData.firstName.length > 50
  ) {
    errors.firstName = "First Name atleast 3 characters.";
  }
  if (
    !formData.lastName ||
    formData.lastName.length < 1 ||
    formData.lastName.length > 50
  ) {
    errors.lastName = "Last Name atleast 1 character.";
  }
  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (
    !formData.department ||
    formData.department.length < 1 ||
    formData.department.length > 50
  ) {
    errors.department = "Department is required";
  }
  return errors;
};
