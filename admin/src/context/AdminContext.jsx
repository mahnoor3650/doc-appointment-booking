import { createContext } from "react";
export const AdminContext = createContext();

const AdimContextProvider = (props) => {
  const value = {};
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdimContextProvider;
