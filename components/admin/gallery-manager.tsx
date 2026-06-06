"use client";

import { useState, useRef } from "react";
import { Button, Spinner } from "@heroui/react";
import { addGalleryRecord, deleteGalleryRecord } from "@/app/actions/gallery";

import { useRouter } from "next/navigation";

interface GalleryImage {
	id: string;
	imageUrl: string;
	altText: string | null;
}

export default function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
	const [isUploading, setIsUploading] = useState(false);
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter(); 

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		
		if (file.size > 5242880) {
			alert("Ukuran foto maksimal 5MB.");
			e.target.value = "";
			return;
		}

		setIsUploading(true);

		try {
			
			const formData = new FormData();
			formData.append("file", file);

			
			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			const uploadRes = await response.json();

			
			if (!response.ok || !uploadRes.success || !uploadRes.url) {
				throw new Error(uploadRes.error || "Gagal mengunggah gambar ke penyimpanan.");
			}

			
			const dbResult = await addGalleryRecord(uploadRes.url, `Portofolio ${file.name}`);

			if (!dbResult.success) {
				throw new Error(dbResult.error);
			}

			
			router.refresh();
		} catch (error: unknown) {
			alert((error as Error).message || "Terjadi kesalahan saat mengunggah gambar.");
			console.error("Error Upload:", error);
		} finally {
			setIsUploading(false);
			if (fileInputRef.current) {
				fileInputRef.current.value = ""; 
			}
		}
	};

	const handleDelete = async (id: string, imageUrl: string) => {
		if (!confirm("Apakah kamu yakin ingin menghapus gambar ini?")) return;

		setDeletingId(id);
		const result = await deleteGalleryRecord(id, imageUrl);

		if (!result.success) {
			alert(result.error);
		} else {
			
			router.refresh();
		}

		setDeletingId(null);
	};

	return (
		<div className="flex flex-col gap-6 w-full">
			<div className="flex items-center justify-between bg-surface border border-border p-6 rounded-xl">
				<div className="flex flex-col gap-1">
					<h2 className="text-xl font-bold text-foreground">Koleksi Portofolio</h2>
					<p className="text-sm text-muted">Kelola foto hasil modifikasi dan perbaikan bengkel.</p>
				</div>

				<div>
					<input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
					<Button variant="primary" onPress={() => fileInputRef.current?.click()} isPending={isUploading}>
						{({ isPending }) => (
							<>
								{isPending ? <Spinner color="current" size="sm" /> : null}
								{isPending ? "Mengunggah..." : "Unggah Foto Baru"}
							</>
						)}
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{initialImages.length === 0 ? (
					<div className="col-span-full p-12 flex items-center justify-center border-2 border-dashed border-border rounded-xl">
						<p className="text-muted font-medium">Belum ada foto galeri.</p>
					</div>
				) : (
					initialImages.map((image) => (
						<div key={image.id} className="group relative aspect-square overflow-hidden bg-surface border border-border rounded-xl">
							<img src={image.imageUrl} alt={image.altText || "Gallery image"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
							<div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
								<Button variant="danger" size="sm" onPress={() => handleDelete(image.id, image.imageUrl)} isPending={deletingId === image.id}>
									{({ isPending }) => (
										<>
											{isPending ? <Spinner color="current" size="sm" /> : null}
											{isPending ? "Menghapus..." : "Hapus Foto"}
										</>
									)}
								</Button>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
