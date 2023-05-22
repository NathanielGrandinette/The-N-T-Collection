import React from "react";

export const FileUpload = ({ handleSelectedFiles, selected }) => {
  return (
   
      <input type="file" name="file" onChange={handleSelectedFiles} />
    
  );
};
