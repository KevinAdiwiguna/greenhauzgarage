import prisma from "@/lib/prisma";
import ProductManager from "@/components/admin/product-manager";

export default async function AdminProductsPage() {
	const products = await prisma.product.findMany({
		orderBy: { createdAt: "desc" },
	});

	return (
		<div className="flex flex-col gap-8 pb-12 w-full animate-in fade-in duration-500">
			<div className="flex flex-col gap-1">
				<h1 className="text-3xl font-extrabold text-foreground tracking-tight">Inventaris</h1>
				<p className="text-base text-muted">Kelola ketersediaan suku cadang, merchandise, atau kendaraan yang siap dijual.</p>
			</div>

			<ProductManager initialProducts={products} />
		</div>
	);
}
