const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

//TODO: use axios
export const uploadImageToImgBB = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: "POST",
    body: formData
  });

  const result = await response.json();
  if (result.success) {
    return result.data.url;
  } else {
    throw new Error("Image upload failed");
  }
};

// TODO: shift delete to backend to resolve CORS Error
// Delete Image from ImgBB
export const deleteImageFromImgBB = async (imageUrl: string): Promise<void> => {
  const imageId = imageUrl.split("/").pop()?.split(".")[0];
  if (!imageId) return;

  await fetch(`https://api.imgbb.com/1/image/${imageId}?key=${IMGBB_API_KEY}`, {
    method: "DELETE"
  });
};
