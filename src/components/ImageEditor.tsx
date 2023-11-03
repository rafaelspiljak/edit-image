import React, { useEffect } from "react";

interface ImageEditorProps {
  image: string | null;
  texts: string[];
  canvasRef: React.RefObject<HTMLCanvasElement>;
  textColor: string;
  fontSize: number;
  textPositions: number[];
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  image,
  texts,
  canvasRef,
  textColor,
  fontSize,
  textPositions,
}) => {
  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const img = new Image();

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          ctx.font = `${fontSize}px Arial`; // Set the font size
          ctx.fillStyle = textColor; // Set the text color

          texts.forEach((text, index) => {
            wrapText(
              ctx,
              text,
              textPositions[index * 2],
              textPositions[index * 2 + 1],
              300,
              30
            );
          });
        };

        img.src = image;
      }
    }
  }, [image, texts, canvasRef, textColor, fontSize, textPositions]);

  // Function to wrap text within a specified width
  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }

  return <canvas ref={canvasRef} />;
};

ImageEditor.defaultProps = {
  texts: ["", "", ""], // Default value with 3 empty lines
};

export default ImageEditor;
