import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";

async function main() {
  await prisma.siteSetting.upsert({
    where: { id: "global" },
    update: {},
    create: {
      id: "global",
      name: "Greenhauzgarage",
      email: "hello@greenhauzgarage.com",
      phoneNumber: "+62 812-3456-7890",
      mapsIframe: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126214.41400613861!2d116.03154865!3d-8.5833486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdbf5c2462a637%3A0x1030bfbcaf7fc80!2sMataram%20City%2C%20West%20Nusa%20Tenggara!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
    },
  });

  const adminEmail = "admin@mail.com";
  const plainPassword = "admin123#";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const userId = uuidv4();
    const accountId = uuidv4();

    await prisma.user.create({
      data: {
        id: userId,
        name: "Admin Greenhauzgarage",
        email: adminEmail,
        role: "admin",
        emailVerified: true,
        accounts: {
          create: {
            id: accountId,
            accountId: adminEmail,
            providerId: "credential",
            password: hashedPassword,
          }
        }
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
