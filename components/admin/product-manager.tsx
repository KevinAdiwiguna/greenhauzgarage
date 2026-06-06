"use client";

import { useState, useRef } from "react";
import { Button, Spinner, Input, TextArea, Label, Table, Modal } from "@heroui/react";
import { addProduct, deleteProduct } from "@/app/actions/products";

type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	imageUrl: string | null;
	category: string;
	status: string;
	year: string | null;
};

export default function ProductManager({ initialProducts }: { initialProducts: Product[] }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const [file, setFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		const formElement = e.currentTarget;
		const formData = new FormData(formElement);

		const name = formData.get("name") as string;
		const description = formData.get("description") as string;
		const price = parseInt(formData.get("price") as string);
		const stock = parseInt(formData.get("stock") as string);

		const category = formData.get("category") as string;
		const status = formData.get("status") as string;
		const year = formData.get("year") as string;

		let finalImageUrl = null;

		try {
			if (file) {
				if (file.size > 5242880) {
					alert("Ukuran foto produk maksimal 5MB ya!");
					setIsSubmitting(false);
					return;
				}

				const uploadFormData = new FormData();
				uploadFormData.append("file", file);

				const res = await fetch("/api/upload", {
					method: "POST",
					body: uploadFormData,
				});

				const uploadData = await res.json();

				if (!res.ok || !uploadData.success) {
					throw new Error(uploadData.error || "Gagal mengunggah foto ke server.");
				}

				finalImageUrl = uploadData.url;
			}

			const result = await addProduct({
				name,
				description,
				price,
				stock,
				imageUrl: finalImageUrl,
				category,
				status,
				year: year || null,
			});

			if (!result.success) throw new Error(result.error);

			setFile(null);
			setIsOpen(false);
		} catch (error: unknown) {
			alert((error as Error).message || "Terjadi kesalahan saat menyimpan produk.");
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async (id: string, imageUrl: string | null) => {
		if (!confirm("Yakin ingin menghapus item ini?")) return;
		setDeletingId(id);
		await deleteProduct(id, imageUrl);
		setDeletingId(null);
	};

	return (
		<div className="flex flex-col gap-6">
			<div className="flex justify-end">
				<Button variant="primary" onPress={() => setIsOpen(true)} className="font-medium shadow-md">
					+ Tambah Item
				</Button>
			</div>

			<div className="border border-border rounded-xl overflow-hidden bg-surface">
				<Table>
					<Table.ScrollContainer>
						<Table.Content aria-label="Tabel inventaris produk" className="w-full">
							<Table.Header>
								<Table.Column isRowHeader>PRODUK</Table.Column>
								<Table.Column>KATEGORI</Table.Column>
								<Table.Column>HARGA</Table.Column>
								<Table.Column>STOK/STATUS</Table.Column>
								<Table.Column>AKSI</Table.Column>
							</Table.Header>
							<Table.Body items={initialProducts}>
								{(item) => (
									<Table.Row key={item.id} className="border-b border-border/50 last:border-0 hover:bg-surface-secondary/50">
										<Table.Cell>
											<div className="flex items-center gap-4 py-2">
												{item.imageUrl ? (
													<div className="w-12 h-12 rounded-lg bg-surface-secondary overflow-hidden shrink-0">
														<img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
													</div>
												) : (
													<div className="w-12 h-12 rounded-lg bg-surface-secondary border border-dashed border-border flex items-center justify-center shrink-0">
														<span className="text-xs text-muted">No Pic</span>
													</div>
												)}
												<div className="flex flex-col max-w-[200px]">
													<span className="font-bold text-foreground truncate">{item.name}</span>
													<span className="text-xs text-muted truncate">{item.description}</span>
												</div>
											</div>
										</Table.Cell>
										<Table.Cell>
											<span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${item.category === "vehicle" ? "bg-blue-500/10 text-blue-500" : "bg-orange-500/10 text-orange-500"}`}>{item.category === "vehicle" ? "Katalog Unit" : "Layanan"}</span>
										</Table.Cell>
										<Table.Cell>
											<span className="font-medium">Rp {item.price.toLocaleString("id-ID")}</span>
										</Table.Cell>
										<Table.Cell>
											<div className="flex flex-col gap-1">
												<span className={`w-fit px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${item.stock > 0 ? "bg-success/10 text-success" : "bg-danger-50/10 text-danger"}`}>{item.stock} unit</span>
												<span className="text-[10px] text-muted font-bold tracking-wider">
													{item.status} {item.year ? `/ ${item.year}` : ""}
												</span>
											</div>
										</Table.Cell>
										<Table.Cell>
											<div className="flex justify-center">
												<Button size="sm" variant="danger" isIconOnly isPending={deletingId === item.id} onPress={() => handleDelete(item.id, item.imageUrl)}>
													{deletingId === item.id ? <Spinner size="sm" /> : "X"}
												</Button>
											</div>
										</Table.Cell>
									</Table.Row>
								)}
							</Table.Body>
						</Table.Content>
					</Table.ScrollContainer>
				</Table>
			</div>

			<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
				<Modal.Backdrop>
					<Modal.Container>
						<Modal.Dialog className="sm:max-w-[600px]">
							<Modal.CloseTrigger />

							<form onSubmit={handleSubmit} className="w-full">
								<Modal.Header>
									<Modal.Heading className="text-xl">Tambah Inventaris Baru</Modal.Heading>
								</Modal.Header>

								<Modal.Body className="gap-5 py-4 w-full">
									<div className="flex gap-4 w-full">
										<div className="flex flex-col gap-2 w-2/3">
											<Label htmlFor="name">Nama Produk / Kendaraan</Label>
											<Input id="name" name="name" required variant="secondary" />
										</div>
										<div className="flex flex-col gap-2 w-1/3">
											<Label htmlFor="category">Kategori</Label>
											<select id="category" name="category" required className="flex w-full h-10 px-3 py-2 text-sm bg-surface-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground" defaultValue="service">
												<option value="service">Layanan</option>
												<option value="vehicle">Katalog Unit</option>
											</select>
										</div>
									</div>

									<div className="flex flex-col gap-2">
										<Label htmlFor="description">Deskripsi Singkat / Spesifikasi</Label>
										<TextArea id="description" name="description" required variant="secondary" rows={3} />
									</div>

									<div className="flex gap-4 w-full">
										<div className="flex flex-col gap-2 w-1/2">
											<Label htmlFor="price">Harga (Rp)</Label>
											<Input id="price" name="price" type="number" required variant="secondary" />
										</div>
										<div className="flex flex-col gap-2 w-1/2">
											<Label htmlFor="stock">Jumlah Stok</Label>
											<Input id="stock" name="stock" type="number" required variant="secondary" />
										</div>
									</div>

									<div className="flex gap-4 w-full">
										<div className="flex flex-col gap-2 w-1/2">
											<Label htmlFor="status">Status Label</Label>
											<Input id="status" name="status" defaultValue="TERSEDIA" required variant="secondary" placeholder="Contoh: TERSEDIA, SOLD OUT" />
										</div>
										<div className="flex flex-col gap-2 w-1/2">
											<Label htmlFor="year">Tahun (Hanya Kendaraan)</Label>
											<Input id="year" name="year" variant="secondary" placeholder="Contoh: 1982" />
										</div>
									</div>

									<div className="flex flex-col gap-2 mt-2">
										<Label htmlFor="foto" className="text-sm font-medium text-foreground">
											Foto Produk (Opsional)
										</Label>
										<div className="flex items-center gap-4">
											<input id="foto" type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={(e) => setFile(e.target.files?.[0] || null)} />
											<Button variant="secondary" onPress={() => fileInputRef.current?.click()}>
												Pilih Gambar
											</Button>
											<span className="text-sm text-muted">{file ? file.name : "Tidak ada file dipilih"}</span>
										</div>
									</div>
								</Modal.Body>

								<Modal.Footer className="w-full justify-end">
									<Button variant="ghost" onPress={() => setIsOpen(false)} isDisabled={isSubmitting}>
										Batal
									</Button>
									<Button type="submit" isPending={isSubmitting}>
										{({ isPending }) => (
											<>
												{isPending ? <Spinner color="current" size="sm" /> : null}
												{isPending ? "Menyimpan..." : "Simpan Data"}
											</>
										)}
									</Button>
								</Modal.Footer>
							</form>
						</Modal.Dialog>
					</Modal.Container>
				</Modal.Backdrop>
			</Modal>
		</div>
	);
}
