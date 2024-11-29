import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { clientAPI } from "../api/axios";
import { ResDataContext } from "../lib/Context";
import DOMPurify from "dompurify";

const OpenEditModal = ({ open, onClose }) => {
  const { setCloseModal, closeModal } = useContext(ResDataContext);

  const [formData, setFormData] = useState({});

  // Update formData whenever open changes
  useEffect(() => {
    if (open) {
      setFormData({
        firstName: open.stuFname || "",
        lastName: open.stuLname || "",
        email: open.stuEmail || "",
        department: open.stuDepartment || "",
      });
    }
  }, [open]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // API call to send the edited data
  const editAPICall = async () => {
    try {
      // Sanitize input data before making the API call
      const sanitizedData = {
        firstName: DOMPurify.sanitize(formData.firstName),
        lastName: DOMPurify.sanitize(formData.lastName),
        email: DOMPurify.sanitize(formData.email),
        department: DOMPurify.sanitize(formData.department),
      };
      const response = await clientAPI.put(`/${open.stuID}`, sanitizedData);
      if (response.status === 200) {
        alert("Edited Successfully!");
        setCloseModal(!closeModal);
      }
    } catch (error) {
      if (error) {
        alert("Something went wrong. Please try again");
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    editAPICall();
  };

  return (
    open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-auto">
          <div className="p-4 border-b flex justify-between">
            <h2 className="text-lg font-bold">Edit Student</h2>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={onClose}
            >
              Close
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="text-left block text-sm font-medium text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="text-left block text-sm font-medium text-gray-600"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-left block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring"
              />
            </div>

            {/* Department */}
            <div>
              <label
                htmlFor="department"
                className="text-left block text-sm font-medium text-gray-600"
              >
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department || ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring"
              />
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
      </div>
    )
  );
};

OpenEditModal.propTypes = {
  open: PropTypes.shape({
    stuID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stuFname: PropTypes.string,
    stuLname: PropTypes.string,
    stuEmail: PropTypes.string,
    stuDepartment: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OpenEditModal;
