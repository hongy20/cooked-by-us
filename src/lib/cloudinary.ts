import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

const folder = "cooked-by-us";

export async function upload(file: File) {
  // Convert File -> Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadAPIResponse: UploadApiResponse = await new Promise(
    (resolve, reject) =>
      cloudinary.uploader
        .upload_stream({ folder }, (error, result) => {
          if (error || !result) reject(error);
          else resolve(result);
        })
        .end(buffer),
  );
  return uploadAPIResponse.secure_url;
}
