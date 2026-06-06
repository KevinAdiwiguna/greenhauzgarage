import prisma from "@/lib/prisma";
import GalleryManager from "@/components/admin/gallery-manager";

export default async function AdminGalleryPage() {
	const galleryImages = await prisma.gallery.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<div className="flex flex-col gap-8 pb-12 w-full animate-in fade-in duration-500">
			<div className="flex flex-col gap-1">
				<h1 className="text-3xl font-extrabold text-foreground tracking-tight">Manajemen Galeri</h1>
				<p className="text-base text-muted">Unggah dan kelola portofolio visual untuk ditampilkan di halaman utama.</p>
			</div>

			<GalleryManager initialImages={galleryImages} />
		</div>
	);
}
