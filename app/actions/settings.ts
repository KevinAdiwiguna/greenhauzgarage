"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  try {
    const settings = await prisma.siteSetting.findUnique({
      where: { id: "global" },
    });

    if (!settings) {
      return await prisma.siteSetting.create({
        data: { id: "global" },
      });
    }

    return settings;
  } catch (error) {
    console.error("Gagal mengambil pengaturan:", error);
    return null;
  }
}


export async function updateSettings(data: {
	name: string;
	phoneNumber: string;
	email: string;
	mapsIframe: string;
	instagram: string;
	facebook: string;
	openingHours: string;
	logoUrl?: string;
}) {
	try {
		await prisma.siteSetting.upsert({
			where: { id: "global" },
			update: data,
			create: {
				id: "global",
				...data,
			},
		});

		revalidatePath("/admin/settings");

		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Gagal menyimpan settings" };
	}
}
