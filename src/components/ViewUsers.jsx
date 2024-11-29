import { lazy, useContext, useEffect, useState } from "react";
import { clientAPI } from "../api/axios";
import { ResDataContext } from "../lib/Context";
const OpenEditModal = lazy(() => import("./OpenEditModal"));

const ViewUsers = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  const { closeModal } = useContext(ResDataContext);
  const { renderAfterAction } = useContext(ResDataContext);

  // API function call to get the students details
  const getStudents = async () => {
    try {
      const response = await clientAPI.get("");
      if (response.status === 200) {
        setStudentsData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete API function call
  const handleDelete = async (stuID) => {
    try {
      const response = await clientAPI.delete(`/${stuID}`);
      if (response.status === 200) {
        alert("Student Removed!");
        setDeleteModalOpen(false); // Close the confirmation modal
        getStudents(); // Refresh the students data
      }
    } catch (error) {
      if (error) {
        alert("Failed to remove student. Please try again later.");
      }
    }
  };

  const handleEdit = (stuID, stuFname, stuLname, stuEmail, stuDepartment) => {
    setEditModalOpen({ stuID, stuFname, stuLname, stuEmail, stuDepartment });
  };

  const handleDeleteClick = (stuID) => {
    setDeleteModalOpen(true);
    setDeleteID(stuID); // Saved the ID of the student to be deleted
  };

  useEffect(() => {
    getStudents();
    setEditModalOpen(null);
  }, [closeModal, renderAfterAction]);

  return (
    <>
      <div className="mt-5 overflow-x-auto overflow-y-auto max-h-[500px]">
        <table className="min-w-full border-collapse border-slate-400 bg-white border p-2">
          <thead className="bg-gray-400 border border-slate-400">
            <tr className="border border-slate-400">
              <th className="p-2 px-10 border border-slate-400 z-20 bg-gray-400">
                ID
              </th>
              <th className="p-2 px-10 border border-slate-400 z-20 bg-gray-400">
                First Name
              </th>
              <th className="p-2 px-10 border border-slate-400 z-20 bg-gray-400">
                Last Name
              </th>
              <th className="p-2 px-10 border border-slate-400 z-20 bg-gray-400">
                Email
              </th>
              <th className="p-2 px-10 border border-slate-400 z-20 bg-gray-400">
                Department
              </th>
              <th className="p-2 px-10 border border-slate-400 z-20 bg-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          {studentsData.map((student) => (
            <tbody key={student.id}>
              <tr className="border border-slate-500">
                <td className="p-1 border border-slate-500 md:px-8 px-2 bg-white">
                  {student.id}
                </td>
                <td className="p-1 border border-slate-500 md:px-8 px-2 bg-white">
                  {student.name}
                </td>
                <td className="p-1 border border-slate-500 md:px-8 px-2 bg-white">
                  {student.username}
                </td>
                <td className="p-1 border border-slate-500 md:px-8 px-2 bg-white">
                  {student.email}
                </td>
                <td className="p-1 border border-slate-500 md:px-8 px-2 bg-white">
                  {student.company.name}
                </td>
                <td className="p-1 border border-slate-500 md:px-8 px-2 bg-white">
                  <button
                    className="border hover:bg-yellow-300 px-2"
                    onClick={() =>
                      handleEdit(
                        student.id,
                        student.name,
                        student.username,
                        student.email,
                        student.company.name
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="border hover:bg-red-400 px-2 ml-2"
                    onClick={() => handleDeleteClick(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      {/* Modal opens on click edit button */}
      {editModalOpen && (
        <OpenEditModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-auto p-4">
            <h2 className="text-lg font-bold text-center mb-4">
              Are you sure you want to delete this student?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                onClick={() => handleDelete(deleteID)}
              >
                OK
              </button>
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewUsers;
