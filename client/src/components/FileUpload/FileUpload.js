import React from "react";

export const FileUpload = ({ handleSelectedFiles }) => {
  return (
    <form>
      <input type="file" onChange={handleSelectedFiles} />
    </form>
  );
};
