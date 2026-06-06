"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Spinner, Table } from "@heroui/react";

import { toggleUserStatus, deleteUser } from "@/app/actions/users";
import type { User } from "@/app/generated/prisma/client";

export default function UserTable({ initialUsers }: { initialUsers: User[] }) {
	const router = useRouter();
	const [loading, setLoading] = useState<string | null>(null);

	const handleToggle = async (id: string) => {
		try {
			setLoading(id);
			await toggleUserStatus(id);
			router.refresh();
		} finally {
			setLoading(null);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Yakin ingin menghapus user ini?")) return;

		try {
			setLoading(id);
			await deleteUser(id);
			router.refresh();
		} finally {
			setLoading(null);
		}
	};

	return (
		<Table variant="secondary">
			<Table.ScrollContainer>
				<Table.Content aria-label="Tabel Manajemen User" className="min-w-[800px]">
					<Table.Header>
						<Table.Column isRowHeader>NAMA</Table.Column>

						<Table.Column>EMAIL</Table.Column>

						<Table.Column>STATUS</Table.Column>

						<Table.Column>AKSI</Table.Column>
					</Table.Header>

					<Table.Body renderEmptyState={() => <div className="py-8 text-center">Tidak ada user</div>}>
						{initialUsers.map((user) => (
							<Table.Row key={user.id} id={user.id}>
								<Table.Cell>{user.name ?? "-"}</Table.Cell>

								<Table.Cell>{user.email}</Table.Cell>

								<Table.Cell>
									<span className={user.emailVerified ? "font-bold text-success" : "font-bold text-danger"}>{user.emailVerified ? "AKTIF" : "NONAKTIF"}</span>
								</Table.Cell>

								<Table.Cell>
									<div className="flex gap-2">
										<Button size="sm" variant="outline" isDisabled={loading === user.id} onPress={() => handleToggle(user.id)}>
											{loading === user.id ? <Spinner size="sm" /> : "Toggle"}
										</Button>

										<Button size="sm" variant="outline" isDisabled={loading === user.id} onPress={() => handleDelete(user.id)}>
											Hapus
										</Button>
									</div>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Content>
			</Table.ScrollContainer>
		</Table>
	);
}
