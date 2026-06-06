import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function deleteFromR2(key: string) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    });

    await r2Client.send(command);
    console.log(`Berhasil menghapus file dari R2: ${key}`);
    return { success: true };
  } catch (error) {
    console.error(`Gagal menghapus file dari R2 (${key}):`, error);
    throw new Error("Gagal menghapus gambar dari penyimpanan.");
  }
}
