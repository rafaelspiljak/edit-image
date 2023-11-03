import React, { useEffect } from "react";

interface ImageEditorProps {
  image: string | null;
  text1: string;
  text2: string;
  text3: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  textColor: string; // New prop for text color
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  image,
  text1,
  text2,
  text3,
  canvasRef,
  textColor,
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
          ctx.font = "30px Arial";
          ctx.fillStyle = textColor; // Set the text color
          wrapText(ctx, text1, 20, 50, 300, 30);
          wrapText(ctx, text2, 20, 100, 300, 30);
          wrapText(ctx, text3, 20, 150, 300, 30);
        };

        img.src = image;
      }
    }
  }, [image, text1, text2, text3, canvasRef, textColor]);

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

export default ImageEditor;
