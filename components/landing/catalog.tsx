import type { Product } from "@/app/generated/prisma/client";
import Link from "next/link"; 

export default function Catalog({ products }: { products: Product[] }) {
    return (
        <section id="catalog" className="py-24 bg-surface border-b border-border">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <span className="text-xs font-black uppercase tracking-widest text-accent border-b-2 border-accent pb-2 inline-block">
                            KATALOG JUAL-BELI PILIHAN
                        </span>
                        <h2 className="text-4xl font-black uppercase tracking-tight text-foreground">
                            JUAL & TITIP BELI <span className="text-accent">KENDARAAN BERKELAS</span>
                        </h2>
                        <p className="text-muted max-w-xl font-medium">
                            Temukan motor kustom impian atau mobil retro legendaris yang telah kami kurasi dan periksa secara menyeluruh.
                        </p>
                    </div>


                    <div className="flex flex-wrap gap-2 text-xs font-black tracking-widest uppercase">
                        <button className="bg-accent text-accent-foreground px-4 py-2 border border-accent transform -skew-x-12 cursor-pointer">
                            SEMUA UNIT
                        </button>
                        <button className="bg-transparent text-foreground hover:bg-foreground/5 px-4 py-2 border border-border transform -skew-x-12 cursor-pointer">
                            MOTOR KUSTOM
                        </button>
                        <button className="bg-transparent text-foreground hover:bg-foreground/5 px-4 py-2 border border-border transform -skew-x-12 cursor-pointer">
                            MOBIL RETRO
                        </button>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border bg-background">
                        <p className="text-muted font-bold uppercase tracking-widest text-sm">Belum ada unit kendaraan tersedia saat ini.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {products.map((product) => {
                            
                            
                            const year = product.year || product.name.match(/\b(19\d\d|20\d\d)\b/)?.[0] || "2023";
                            const status = product.status || (product.stock > 0 ? "TERSEDIA" : "SOLD OUT");
                            const isAvailable = status.toUpperCase() === "TERSEDIA" || status.toUpperCase() === "READY";

                            return (
                                <div
                                    key={product.id}
                                    className="group bg-background border border-border hover:border-accent/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
                                >

                                    <div className="absolute top-0 left-0 w-full h-[3px] bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 z-10" />

                                    <div>

                                        <div className="w-full h-48 overflow-hidden relative border-b border-border bg-black">
                                            {product.imageUrl && (
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                                />
                                            )}
                                            <span className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 transform -skew-x-12 ${isAvailable ? 'bg-accent text-accent-foreground' : 'bg-red-600 text-white'}`}>
                                                {status} / {year}
                                            </span>
                                        </div>

                                        <div className="p-6 space-y-4">
                                            <h3 className="text-xl font-black uppercase tracking-wider text-foreground group-hover:text-accent transition-colors line-clamp-1">
                                                {product.name}
                                            </h3>
                                            <p className="text-lg font-black text-accent tracking-wider">
                                                Rp {product.price.toLocaleString("id-ID")}
                                            </p>
                                            <p className="text-muted text-sm leading-relaxed line-clamp-2">
                                                {product.description}
                                            </p>


                                            <div className="pt-4 border-t border-border/60 grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                                                <div className="flex items-center gap-2 text-muted">
                                                    <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                    <span className="font-bold uppercase tracking-wider text-[10px] text-foreground truncate">100% KUSTOM</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted">
                                                    <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                    </svg>
                                                    <span className="font-bold uppercase tracking-wider text-[10px] text-foreground truncate">TER-SERTIFIKASI</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="p-6 pt-0 grid grid-cols-2 gap-3 mt-auto relative z-10">
                                        <Link
                                            href={`?productId=${product.id}`}
                                            scroll={false}
                                            className="bg-transparent flex items-center justify-center text-foreground hover:bg-foreground/5 transition-all text-xs font-black uppercase tracking-widest py-3 border border-border transform -skew-x-12"
                                        >
                                            <span className="transform skew-x-12">SPESIFIKASI</span>
                                        </Link>
                                        <a
                                            href={`https://wa.me/6281234567890?text=Halo%20Greenhauzgarage,%20saya%20tertarik%20dengan%20unit%20${encodeURIComponent(product.name)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-accent flex items-center justify-center text-accent-foreground hover:bg-accent/90 transition-all text-xs font-black text-center uppercase tracking-widest py-3 border border-accent transform -skew-x-12"
                                        >
                                            <span className="transform skew-x-12">WHATSAPP</span>
                                        </a>
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
