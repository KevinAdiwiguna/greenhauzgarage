"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { deleteFromR2 } from "@/lib/r2";

export async function addGalleryRecord(imageUrl: string, altText: string) {
	try {
		await prisma.gallery.create({
			data: {
				imageUrl,
				altText,
			},
		});

		revalidatePath("/admin/gallery");
		revalidatePath("/");
		return { success: true };
	} catch (error) {
		console.error("Gagal menyimpan data galeri:", error);
		return { success: false, error: "Gagal menyimpan ke database." };
	}
}

export async function deleteGalleryRecord(id: string, imageUrl: string) {
	try {
		const urlParts = imageUrl.split("/");
		const key = urlParts.slice(3).join("/");

		if (key) {
			await deleteFromR2(key);
		}

		await prisma.gallery.delete({
			where: { id },
		});

		revalidatePath("/admin/gallery");
		revalidatePath("/");
		return { success: true };
	} catch (error) {
		console.error("Gagal menghapus data galeri:", error);
		return { success: false, error: "Gagal menghapus gambar." };
	}
}
