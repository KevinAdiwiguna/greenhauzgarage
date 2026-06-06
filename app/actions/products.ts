"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { deleteFromR2 } from "@/lib/r2";

export async function addProduct(data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string | null;
    category: string;
    status: string;
    year: string | null;
}) {
    try {
        await prisma.product.create({ data });
        revalidatePath("/admin/products");
        return { success: true };
    } catch (error) {
        console.error("Gagal menambah produk:", error);
        return { success: false, error: "Gagal menyimpan ke database." };
    }
}
export async function deleteProduct(id: string, imageUrl: string | null) {
	try {
		if (imageUrl) {
			const urlParts = imageUrl.split("/");
			const key = urlParts.slice(3).join("/");
			if (key) await deleteFromR2(key);
		}

		await prisma.product.delete({ where: { id } });
		revalidatePath("/admin/products");
		return { success: true };
	} catch (error) {
		console.error("Gagal menghapus produk:", error);
		return { success: false, error: "Gagal menghapus data." };
	}
}
