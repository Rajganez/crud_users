import { createContext, useState } from "react";
import PropTypes from "prop-types";

const ResDataContext = createContext();
const Context = ({ children }) => {
  const [renderAfterAction, setRenderAfterAction] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  
  return (
    <>
      <ResDataContext.Provider
        value={{
          renderAfterAction,
          setRenderAfterAction,
          closeModal,
          setCloseModal,
        }}
      >
        {children}
      </ResDataContext.Provider>
    </>
  );
};

Context.propTypes = {
  children: PropTypes.object,
};

export { Context, ResDataContext };
