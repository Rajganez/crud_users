import { lazy, useContext, useEffect, useState } from "react";
import { clientAPI } from "../api/axios";
import { ResDataContext } from "../lib/Context";
const OpenEditModal = lazy(() => import("./OpenEditModal"));

const ViewUsers = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(null);
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
      }
    } catch (error) {
      if (error) {
        alert("Failed to remove student. Please try again later.");
      }
    }
  };

  const handleEdit = async (
    stuID,
    stuFname,
    stuLname,
    stuEmail,
    stuDepartment
  ) => {
    // Navigate to the edit form with the selected student's ID
    setEditModalOpen({ stuID, stuFname, stuLname, stuEmail, stuDepartment });
  };

  //Whenevr there is a change in the state the API call is triggered
  useEffect(() => {
    getStudents();
    if (closeModal) {
      setEditModalOpen(null);
    }
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
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      {editModalOpen && (
        <OpenEditModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(null)}
        />
      )}
    </>
  );
};

export default ViewUsers;
