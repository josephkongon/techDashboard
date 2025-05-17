export const convertToPng = async (file) => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          const pngFile = new File(
            [blob],
            file.name.replace(/\.\w+$/, ".png"),
            {
              type: "image/png",
              lastModified: Date.now(),
            },
          );
          resolve(pngFile);
        }, "image/png");
      };
      //@ts-ignore
      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
};
