"use client";
import FileUpload from "@/components/FileUpload";
import ImageEditor from "@/components/ImageEditor";
import React, { useRef, useState } from "react";

const YourParentComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(30);
  const [fileName, setFileName] = useState("");
  const [textPositions, setTextPositions] = useState([
    20, 50, 20, 100, 20, 150,
  ]); // Default positions
  const [texts, setTexts] = useState(["", "", ""]); // Default text lines
  const [image, setImage] = useState<string | null>(null);

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

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextColor(e.target.value);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(e.target.value));
  };

  const handleTextPositionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedPositions = [...textPositions];
    updatedPositions[index] = Number(e.target.value);
    setTextPositions(updatedPositions);
  };

  const handleTextsChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedTexts = [...texts];
    updatedTexts[index] = e.target.value;
    setTexts(updatedTexts);
  };

  const addTextLine = () => {
    setTexts([...texts, ""]);
    setTextPositions([...textPositions, 20, 50]); // Add default position for the new line
  };

  const deleteTextLine = (index: number) => {
    const updatedTexts = texts.filter((_, i) => i !== index);
    const updatedPositions = textPositions.filter(
      (_, i) => i !== index * 2 && i !== index * 2 + 1
    );
    setTexts(updatedTexts);
    setTextPositions(updatedPositions);
  };

  const downloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.href = canvasRef.current.toDataURL();
      link.download = `${fileName !== "" ? fileName : "modified-image"}.png`;
      link.click();
    }
  };

  return (
    <div className="m-2">
      <div>
        <FileUpload setImage={setImage} />
      </div>
      <div>
        <div className="flex gap-2">
          <label>Color picker</label>
          <input
            className="text-black"
            type="color"
            value={textColor}
            onChange={handleTextColorChange}
          />
          <label>Font size</label>
          <input
            className="text-black"
            type="number"
            value={fontSize}
            onChange={handleFontSizeChange}
            min="10"
            max="50"
          />
        </div>

        {texts.map((text, index) => (
          <div key={index} className="flex gap-2 m-2">
            <input
              placeholder="x position"
              className="text-black"
              type="number"
              value={textPositions[index * 2]}
              onChange={(e) => handleTextPositionChange(index * 2, e)}
            />
            <input
              placeholder="y position"
              className="text-black"
              type="number"
              value={textPositions[index * 2 + 1]}
              onChange={(e) => handleTextPositionChange(index * 2 + 1, e)}
            />
            <input
              placeholder="text"
              className="text-black"
              type="text"
              value={text}
              onChange={(e) => handleTextsChange(index, e)}
            />
            <button onClick={() => deleteTextLine(index)}>Delete</button>
          </div>
        ))}

        <div className="m-2">
          <input
            placeholder="File name"
            className="text-black"
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.currentTarget.value)}
          />
        </div>
        <div className="flex gap-2 flex-row justify-around m-2">
          <button
            className="rounded p-2 border-2 border-green-800"
            onClick={addTextLine}
          >
            Add Text Line
          </button>
          <button className="rounded p-2 bg-green-800" onClick={downloadImage}>
            Download Image
          </button>
        </div>
      </div>

      <ImageEditor
        image={image}
        texts={texts}
        canvasRef={canvasRef}
        textColor={textColor}
        fontSize={fontSize}
        textPositions={textPositions}
      />
    </div>
  );
};

export default YourParentComponent;
