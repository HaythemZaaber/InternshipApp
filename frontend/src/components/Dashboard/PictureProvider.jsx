// PictureContext.js
import React, { createContext, useState, useContext } from "react";

const PictureContext = createContext();

export const PictureProvider = ({ children }) => {
  const [picture, setPicture] = useState("");

  return (
    <PictureContext.Provider value={{ picture, setPicture }}>
      {children}
    </PictureContext.Provider>
  );
};

export const usePicture = () => {
  const context = useContext(PictureContext);
  if (!context) {
    throw new Error("usePicture must be used within a PictureProvider");
  }
  return context;
};
