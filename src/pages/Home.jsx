import { lazy, Suspense, useContext, useEffect } from "react";
import { useState } from "react";
import { ResDataContext } from "../lib/Context";
const ViewUsers = lazy(() => import("../components/ViewUsers"));
const AddUsers = lazy(() => import("../components/AddUsers"));

const Home = () => {
  const { closeModal } = useContext(ResDataContext);
  //State to conditionally render the component to prevent unwanted rerendering
  const [renderUserComponent, setRenderUserComponent] = useState(false);
  const [renderAddComponent, setRenderAddComponent] = useState(false);

  // Using context API to render the component whenever form triggers submit
  useEffect(() => {
    setRenderAddComponent(false);
  }, [closeModal]);

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white mt-5">
        <div className="flex justify-between h-14 md:mx-10">
          <div>
            <h3 className="md:text-3xl text-lg font-semibold">
              Students Details
            </h3>
          </div>
          <div className="flex flex-col">
            <button
              className="border border-gray-600 md:px-8 px-3 rounded-lg md:mr-10
            hover:bg-slate-500 bg-slate-100 hover:text-white"
              onClick={() => setRenderUserComponent(true)}
            >
              View
            </button>
            {!renderUserComponent && (
              <span className="text-xs text-orange-600 md:mr-10 animate-pulse">
                Click here to View!
              </span>
            )}
          </div>
          {renderUserComponent && (
            <div className="flex flex-col ml-4">
              <button
                className="border border-gray-600 px-3 md:px-8 rounded-lg md:mr-10
            hover:bg-slate-500 bg-slate-100 hover:text-white"
                onClick={() => setRenderAddComponent(true)}
              >
                Add
              </button>
              {!renderAddComponent && (
                <span className="text-xs text-orange-600 md:mr-10 animate-pulse">
                  Click here to Add!
                </span>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Conditional Rendering */}
      {renderUserComponent ? (
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
          }
        >
          <ViewUsers />
        </Suspense>
      ) : (
        // Default Page Description
        <div className="px-4 md:px-10 mt-10">
          <h1 className="md:text-3xl text-xl font-semibold text-gray-800">
            Student Details
          </h1>
          <p className="md:text-lg text-sm text-gray-600 mt-5">
            This is a sample page to where CRUD Operations can be performed on
            the Student Details.
          </p>
          <ul className="md:text-lg text-sm text-gray-600">
            <li className="font-semibold">
              Student Users are viewed on click the View button{" "}
            </li>
            <li className="font-semibold">
              For Each Student Edit and Delete Actions are performed
            </li>
            <li className="font-semibold">And Student can be Added</li>
          </ul>
        </div>
      )}

      {/* Modal for AddUsers */}
      {renderAddComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-auto">
            <div className="p-4 border-b flex justify-between">
              <h2 className="text-lg font-bold">Add Students</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setRenderAddComponent(false)}
              >
                Close
              </button>
            </div>
            <div className="p-4">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                  </div>
                }
              >
                <AddUsers />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
