import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER;
if (!CLOUDINARY_FOLDER) {
  throw new Error("Please define the CLOUDINARY_FOLDER environment variable");
}

export async function upload(file: File) {
  if (!(file instanceof File)) {
    throw new Error("Invalid file parameter: expected File instance");
  }

  // Convert File -> Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadAPIResponse: UploadApiResponse = await new Promise(
    (resolve, reject) =>
      cloudinary.uploader
        .upload_stream({ folder: CLOUDINARY_FOLDER }, (error, result) => {
          if (error) reject(error);
          else if (!result)
            reject(new Error("Cloudinary upload failed: no result returned"));
          else resolve(result);
        })
        .end(buffer),
  );

  return uploadAPIResponse.secure_url;
}
