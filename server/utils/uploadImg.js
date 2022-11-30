import { v2 as cloudinary } from "cloudinary";
export const uplaodImg = async (img) => {
  const folder = "/unicar";
  const imageConfig = {
    height: 1080,
    width: 720,
    folder,
    crop: "fit",
    quality: 90,
  };

  const imgObj = await cloudinary.uploader.upload(img, imageConfig);

  return imgObj.secure_url;
};
