import { unstable_cache } from "next/cache";
import prisma from "../prisma";

export const getSiteSettings = unstable_cache(
  async () => {
    const settings = await prisma.siteSetting.findUnique({
      where: { id: "global" },
    });

    return settings || { name: "Greenhauzgarage", logoUrl: null };
  },
  ["site-settings-key"],
  {
    tags: ["site-settings"],
    revalidate: 86400
  }
);
