import React from "react";

interface FileUploadProps {
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ setImage }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return <input type="file" accept="image/*" onChange={handleImageChange} />;
};

export default FileUpload;
