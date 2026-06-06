import type { Product } from "@/app/generated/prisma/client";
import Link from "next/link";

export default function Services({ products }: { products: Product[] }) {
	// Function to generate dynamic bullet points based on product name for aesthetic purposes
	const getBulletPoints = (name: string) => {
		const lowercaseName = name.toLowerCase();
		if (lowercaseName.includes("cat") || lowercaseName.includes("repaint") || lowercaseName.includes("detailing")) {
			return ["Bahan Polyurethane Premium", "Wet Look / Matte Finish", "Garansi Ketahanan 2 Tahun"];
		}
		if (lowercaseName.includes("kustom") || lowercaseName.includes("custom") || lowercaseName.includes("restorasi")) {
			return ["Kustom Rangka Presisi", "Pengerjaan Detail Bodi", "Instalasi Part Aftermarket"];
		}
		if (lowercaseName.includes("servis") || lowercaseName.includes("tune") || lowercaseName.includes("oli")) {
			return ["Diagnostik Scanner Engine", "Pembersihan Karburator / Injektor", "Kalibrasi Ulang Sensor Elektronik"];
		}
		return ["Teknisi Ahli Tersertifikasi", "Suku Cadang Original", "Estimasi Pengerjaan Akurat"];
	};

	return (
		<section id="services" className="py-24 bg-background text-foreground px-6 border-b border-border">
			<div className="max-w-6xl mx-auto space-y-16">
				
				<div className="text-center space-y-4">
					<span className="text-xs font-black uppercase tracking-widest text-accent border-b-2 border-accent pb-2 inline-block">
						LAYANAN TERBAIK DI LOMBOK
					</span>
					<h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
						Servis Berkala & <span className="text-accent">Seni Kustomisasi</span>
					</h2>
					<p className="text-muted max-w-2xl mx-auto font-medium">
						Kami menggabungkan perawatan teknis kendaraan standar pabrikan dengan keahlian seni modifikasi kelas dunia.
					</p>
				</div>

				{products.length === 0 ? (
					<div className="text-center py-12 border border-dashed border-border bg-surface">
						<p className="text-muted font-bold uppercase tracking-widest text-sm">Belum ada layanan tersedia saat ini.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{products.map((product) => {
							const points = getBulletPoints(product.name);
							return (
								<div
									key={product.id}
									className="group bg-surface border border-border hover:border-accent/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
								>
									
									<div className="absolute top-0 left-0 w-full h-[3px] bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

									<div>
										
										<div className="w-full h-52 overflow-hidden relative bg-black border-b border-border">
											{product.imageUrl && (
												<img
													src={product.imageUrl}
													alt={product.name}
													className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
												/>
											)}
											<span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 transform -skew-x-12 z-10">
												PREMIUM SERVICE
											</span>
										</div>

										
										<div className="p-6 space-y-4">
											<h3 className="text-xl font-black uppercase tracking-wider text-foreground group-hover:text-accent transition-colors">
												{product.name}
											</h3>
											<p className="text-muted text-xs leading-relaxed line-clamp-3">
												{product.description}
											</p>

											
											<ul className="space-y-2 pt-2">
												{points.map((point, index) => (
													<li key={index} className="flex items-center gap-2 text-xs font-semibold text-foreground/90">
														<svg className="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
														</svg>
														<span>{point}</span>
													</li>
												))}
											</ul>
										</div>
									</div>

									
									<div className="p-6 pt-0 grid grid-cols-1 gap-3 mt-auto">
										<button className="w-full bg-transparent text-foreground hover:bg-foreground/5 transition-all text-xs font-black uppercase tracking-widest py-3 border border-border transform -skew-x-12">
											DETAIL ALUR KERJA
										</button>
										<Link
											href={`?booking=true&service=${encodeURIComponent(product.name)}`}
											scroll={false}
											className="w-full text-center bg-accent text-accent-foreground hover:bg-accent/90 transition-all text-xs font-black uppercase tracking-widest py-3 border border-accent transform -skew-x-12 block"
										>
											BOOKING LAYANAN INI
										</Link>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
}
