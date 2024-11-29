import { useContext, useState } from "react";
import { clientAPI } from "../api/axios";
import { ResDataContext } from "../lib/Context";
import DOMPurify from "dompurify";
import { validateForm } from "../lib/formValidation.js";

const AddUsers = () => {
  // ContextAPI State updated to close the modal window
  const { setCloseModal, closeModal } = useContext(ResDataContext);

  const intialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  };

  const [formData, setFormData] = useState(intialFormData);
  // State for Error handling
  const [errors, setErrors] = useState({});

  // Form On Change function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function for API Call to Add Students
  const addStudentsAPI = async () => {
    try {
      // Sanitize form data
      const sanitizedData = {
        firstName: DOMPurify.sanitize(formData.firstName),
        lastName: DOMPurify.sanitize(formData.lastName),
        email: DOMPurify.sanitize(formData.email),
        department: DOMPurify.sanitize(formData.department),
      };
      const response = await clientAPI.post("", sanitizedData);
      if (response.status === 201) {
        alert("Student successfully added.");
        setCloseModal(!closeModal);
      }
    } catch (error) {
      if (error) {
        alert("Something went wrong. Please try again");
      }
    }
  };

  // Form Submission Function to Add students
  const handleSubmit = (e) => {
    e.preventDefault();
    //Reusable Form validation function called
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      addStudentsAPI();
      setFormData(intialFormData);
    }
  };

  return (
    <div className="md:p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="text-left block text-sm font-medium text-gray-600"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring ${
              errors.firstName
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-blue-300"
            }`}
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="text-left text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="text-left block text-sm font-medium text-gray-600"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring ${
              errors.lastName
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-blue-300"
            }`}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="text-left text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-left block text-sm font-medium text-gray-600"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring ${
              errors.email
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-blue-300"
            }`}
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-left text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Department */}
        <div>
          <label
            htmlFor="department"
            className="text-left block text-sm font-medium text-gray-600"
          >
            Department <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring ${
              errors.lastName
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-blue-300"
            }`}
            placeholder="Enter last name"
          />
          {errors.department && (
            <p className="text-left text-sm text-red-500">
              {errors.department}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUsers;
