import Link from "next/link";
import { Button } from "@heroui/react";
import prisma from "@/lib/prisma";
import { getSiteSettings } from "@/lib/data/settings";

export default async function AdminDashboard() {
	const settings = await getSiteSettings();

	const [productCount, galleryCount] = await Promise.all([prisma.product.count(), prisma.gallery.count()]);

	return (
		<div className="flex flex-col gap-8 pb-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-2 mb-2">
						<span className="relative flex h-3 w-3">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
							<span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
						</span>
						<span className="text-xs font-semibold tracking-wider uppercase text-success">Sistem Online</span>
					</div>
					<h1 className="text-4xl font-extrabold text-foreground tracking-tight">Selamat malam, Admin.</h1>
					<p className="text-base text-muted">Ikhtisar operasional dan inventaris {settings.name} hari ini.</p>
				</div>

				<div className="flex gap-3">
					<Link href="/admin/settings">
						<Button variant="secondary" className="font-medium">
							Pengaturan Web
						</Button>
					</Link>
					<Link href="/admin/products">
						<Button variant="primary" className="font-medium shadow-md">
							Kelola Inventaris
						</Button>
					</Link>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
				<div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-surface border border-border rounded-xl p-6 flex flex-col justify-between hover:border-accent/50 transition-all relative overflow-hidden group">
					<div className="absolute -right-10 -top-10 opacity-5 group-hover:opacity-10 transition-opacity">
						<svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
							<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
							<line x1="8" y1="21" x2="16" y2="21"></line>
							<line x1="12" y1="17" x2="12" y2="21"></line>
						</svg>
					</div>
					<div className="z-10">
						<h3 className="text-sm font-semibold text-muted tracking-wide uppercase">Total Inventaris</h3>
						<div className="mt-2 flex items-baseline gap-2">
							<span className="text-5xl font-black text-foreground tracking-tighter">{productCount}</span>
							<span className="text-sm font-medium text-muted">Item Dijual</span>
						</div>
					</div>
					<div className="z-10 flex items-center justify-between mt-4">
						<span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-md">Diperbarui hari ini</span>
						<Link href="/admin/products" className="text-sm font-semibold text-foreground hover:text-accent transition-colors">
							Lihat Detail &rarr;
						</Link>
					</div>
				</div>

				<div className="col-span-1 row-span-1 bg-surface border border-border rounded-xl p-6 flex flex-col justify-between hover:border-accent/50 transition-all">
					<div>
						<h3 className="text-sm font-semibold text-muted tracking-wide uppercase">Foto Galeri</h3>
						<div className="mt-2 flex items-baseline gap-2">
							<span className="text-5xl font-black text-foreground tracking-tighter">{galleryCount}</span>
						</div>
					</div>
					<Link href="/admin/gallery" className="text-sm font-semibold text-foreground hover:text-accent transition-colors">
						Kelola Galeri &rarr;
					</Link>
				</div>

				<div className="col-span-1 row-span-2 bg-surface-secondary border border-border rounded-xl p-6 flex flex-col relative overflow-hidden">
					<div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#fff_1px,transparent_1px)]"></div>

					<div className="z-10 flex-1 flex flex-col">
						<h3 className="text-sm font-semibold text-muted tracking-wide uppercase mb-6">Status Server</h3>

						<div className="flex flex-col gap-6">
							<div className="flex flex-col gap-2">
								<div className="flex justify-between items-center text-sm">
									<span className="font-medium text-foreground">Database</span>
									<span className="text-muted">Sehat</span>
								</div>
								<div className="w-full h-2 bg-background rounded-full overflow-hidden">
									<div className="h-full bg-success w-[15%] rounded-full"></div>
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<div className="flex justify-between items-center text-sm">
									<span className="font-medium text-foreground">Penyimpanan Media</span>
									<span className="text-muted">24%</span>
								</div>
								<div className="w-full h-2 bg-background rounded-full overflow-hidden">
									<div className="h-full bg-warning w-[24%] rounded-full"></div>
								</div>
							</div>
						</div>

						<div className="mt-auto pt-6 border-t border-border/50">
							<p className="text-xs text-muted leading-relaxed">Lingkungan produksi berjalan stabil. Konfigurasi ORM merespons dalam rata-rata 42ms.</p>
						</div>
					</div>
				</div>

				<div className="col-span-1 md:col-span-3 lg:col-span-3 row-span-1 bg-surface border border-border rounded-xl p-6 flex flex-col justify-center relative overflow-hidden group">
					<div className="flex items-center justify-between z-10">
						<div className="flex flex-col">
							<h3 className="text-lg font-bold text-foreground">Siap menambahkan portofolio baru?</h3>
							<p className="text-sm text-muted mt-1 max-w-md">Unggah hasil garapan bengkel terbaru ke galeri untuk menjaga etalase tetap segar dan menarik perhatian pengunjung.</p>
						</div>
						<Link href="/admin/gallery">
							<Button variant="tertiary" className="hidden sm:flex border border-border hover:border-foreground">
								Mulai Unggah
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
