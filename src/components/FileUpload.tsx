import React, { ChangeEvent, useState, useRef, useEffect } from "react";

interface FileUploadProps {
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ setImage }) => {
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImage(event.target?.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return <input type="file" accept="image/*" onChange={handleImageUpload} />;
};

export default FileUpload;
