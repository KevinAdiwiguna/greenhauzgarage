import { getSettings } from "@/app/actions/settings";
import SettingsForm from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
	const settings = await getSettings();

	if (!settings) {
		return <div className="p-8 text-center text-danger font-medium">Gagal memuat pengaturan sistem. Silakan periksa koneksi database.</div>;
	}

	return (
		<div className="flex flex-col gap-8 pb-12 w-full animate-in fade-in duration-500">
			<div className="flex flex-col gap-1">
				<h1 className="text-3xl font-extrabold text-foreground tracking-tight">Pengaturan Website</h1>
				<p className="text-base text-muted">Kelola informasi nama, kontak, dan lokasi Google Maps bengkel Greenhauzgarage.</p>
			</div>

			<SettingsForm initialSettings={settings} />
		</div>
	);
}
