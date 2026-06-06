"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export async function toggleUserStatus(id: string) {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        await prisma.user.update({
            where: { id },
            data: { emailVerified: !user?.emailVerified }
        });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Gagal update status user." };
    }
}

export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({ where: { id } });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Gagal menghapus user." };
    }
}


export async function createUser(data: {
    name: string;
    email: string;
    password: string;
}) {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                id: randomUUID(),
                name: data.name,
                email: data.email,
                emailVerified: false,

                accounts: {
                    create: {
                        id: randomUUID(),
                        accountId: randomUUID(),
                        providerId: "credential",
                        password: hashedPassword,
                    },
                },
            },
        });

        revalidatePath("/admin/users");

        return {
            success: true,
            data: user,
        };
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.toLowerCase().includes("unique")
        ) {
            return {
                success: false,
                error: "Email sudah terdaftar.",
            };
        }

        return {
            success: false,
            error: "Gagal membuat user baru.",
        };
    }
}
