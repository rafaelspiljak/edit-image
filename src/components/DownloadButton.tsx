import React from "react";

interface DownloadButtonProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  fileName?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  canvasRef,
  fileName,
}) => {
  const downloadImage = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL(); // Converts the canvas content to a data URL
      link.download = `${fileName ?? "modified-file"}.png`;
      link.click();
    }
  };

  return (
    <button className="rounded bg-green-800 p-2" onClick={downloadImage}>
      Download
    </button>
  );
};

export default DownloadButton;
