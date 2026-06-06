import prisma from "@/lib/prisma";
import CreateUserModal from "@/components/admin/create-user-modal";
import UserTable from "@/components/admin/user-table";

export default async function UsersPage() {
	const users = await prisma.user.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<div className="p-6 space-y-6">
			{/* HEADER */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">User Management</h1>

					<p className="text-sm text-gray-500">Manage users, roles, and access control</p>
				</div>

				<CreateUserModal />
			</div>

			<div className="rounded-lg border p-4">
				<UserTable initialUsers={users} />
			</div>
		</div>
	);
}
