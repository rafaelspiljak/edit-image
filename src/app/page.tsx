"use client";
import DownloadButton from "@/components/DownloadButton";
import FileUpload from "@/components/FileUpload";
import ImageEditor from "@/components/ImageEditor";
import { useRef, useState } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [fileName, setFileName] = useState("");
  const [textColor, setTextColor] = useState("#000000"); // State for the text color

  // Other state variables and handlers for image, text, etc.

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextColor(e.target.value);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="flex flex-col">
      <div>
        <FileUpload setImage={setImage} />
      </div>
      <div className="flex flex-col gap-4 color-black text-black m-2 p-2">
        <input
          className="rounded p-1"
          type="text"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          placeholder="input 1"
        />
        <input
          className="rounded p-1"
          type="text"
          value={text2}
          onChange={(e) => setText2(e.target.value)}
          placeholder="input 2"
        />
        <input
          className="rounded p-1"
          type="text"
          value={text3}
          onChange={(e) => setText3(e.target.value)}
          placeholder="input 3"
        />

        <input
          className="rounded p-1"
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="File name"
        />
        <label className="text-white">Color picker</label>
        <input
          placeholder="color picker"
          type="color"
          value={textColor}
          onChange={handleTextColorChange}
        />
      </div>
      {image && (
        <div className="flex justify-center items-center m-2">
          <DownloadButton canvasRef={canvasRef} fileName={fileName} />
        </div>
      )}

      <div className="max-h-[50vh] max-w-[50vw]">
        <ImageEditor
          image={image}
          text1={text1}
          text2={text2}
          text3={text3}
          canvasRef={canvasRef}
          textColor={textColor}
        />
      </div>
    </div>
  );
}
