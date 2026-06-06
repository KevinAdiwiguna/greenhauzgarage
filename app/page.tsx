import prisma from "@/lib/prisma";
import { Suspense } from "react";
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import About from "@/components/landing/about";
import Services from "@/components/landing/services";
import Catalog from "@/components/landing/catalog";
import InstaFeed from "@/components/landing/insta-feed";
import Contact from "@/components/landing/contact";
import Footer from "@/components/landing/footer";

export default async function Home() {
	const [settings, servicesProducts, catalogProducts, galleryImages] = await Promise.all([
		prisma.siteSetting.findUnique({ where: { id: "global" } }),
		prisma.product.findMany({
			where: { category: "service" },
			take: 5,
			orderBy: { createdAt: "desc" },
		}),
		prisma.product.findMany({
			where: { category: "vehicle" },
			take: 5,
			orderBy: { createdAt: "desc" },
		}),
		prisma.gallery.findMany({ take: 6, orderBy: { createdAt: "desc" } }),
	]);

	return (
		<main className="min-h-screen">
			<div className="dark bg-background text-foreground">
				<Navbar settings={settings} />
				<Hero settings={settings}/>
			</div>

			<About />

			<div className="dark bg-background text-foreground">
				<Services products={servicesProducts} />
			</div>

			<div className="dark bg-background text-foreground">
				<Catalog products={catalogProducts} />
			</div>

			<div className="dark bg-background text-foreground">
				<InstaFeed gallery={galleryImages} />
			</div>

			<div className="dark bg-background text-foreground">
				<Contact settings={settings} />
			</div>

			<Footer settings={settings} />
		</main>
	);
}
