import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting BKC Database Seeding...');

  // 1. Seed Admin User
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('Admin@BKC2026!', salt);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@bkc.org.ng' },
    update: { passwordHash },
    create: {
      email: 'admin@bkc.org.ng',
      passwordHash,
      name: 'BKC System Administrator',
      role: 'ADMIN'
    }
  });
  console.log(`✅ Admin User Seeded: ${admin.email}`);

  // 2. Seed Categories
  const categoriesData = [
    {
      name: 'Basic Education & Free Training',
      slug: 'basic-education',
      description: 'Deliberate community initiatives providing quality foundational education and learning tools to children.'
    },
    {
      name: 'Girl Child Education Outreach',
      slug: 'girl-child',
      description: 'Targeted support, literacy, and reintegration programs for out-of-school girl children.'
    },
    {
      name: 'Headmasters National Conference',
      slug: 'headmasters-conference',
      description: 'Nationwide conferences dedicated to primary school headmasters across all 774 LGAs to raise status and foster peer networks.'
    },
    {
      name: 'ICT & Science Edutainment',
      slug: 'ict-edutainment',
      description: 'Hands-on hardware labs, basic science kits, computer literacy, and digital skill building.'
    },
    {
      name: 'Community Revision & Study Facilities',
      slug: 'community-hub',
      description: 'Free study and revision spaces, V-SAT community internet access, and social mobilisation platforms.'
    },
    {
      name: 'Business Incubators & Technology Hub',
      slug: 'entrepreneurship',
      description: 'Business incubator suites, technical services offices, and youth career pathways.'
    }
  ];

  const categoryMap: Record<string, string> = {};
  for (const cat of categoriesData) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: cat
    });
    categoryMap[cat.slug] = record.id;
  }
  console.log(`✅ Seeded ${categoriesData.length} Categories`);

  // 3. Seed Media Assets
  const mediaItems = [
    {
      title: 'Training Lab Workstations & Computer Hall',
      filename: 'training-lab-workstations-1.png',
      url: '/uploads/training-lab-workstations-1.png',
      mediaType: 'IMAGE' as const,
      mimeType: 'image/png',
      fileSize: 1837085,
      caption: 'The main air-conditioned training hall with multi-row computer workstations and presentation screens.',
      category: 'Facilities'
    },
    {
      title: 'Official CAC Certificate of Incorporation',
      filename: 'cac-certificate.png',
      url: '/uploads/cac-certificate.png',
      mediaType: 'IMAGE' as const,
      mimeType: 'image/png',
      fileSize: 4345785,
      caption: 'Official Corporate Affairs Commission (CAC/IT/NO 56020) Certificate of Incorporation of BKC International.',
      category: 'Governance & Trust'
    },
    {
      title: 'Children Disassembling Computer Hardware in Lab',
      filename: 'children-edutainment-hardware.jpg',
      url: '/uploads/children-edutainment-hardware.jpg',
      mediaType: 'IMAGE' as const,
      mimeType: 'image/jpeg',
      fileSize: 130541,
      caption: 'Young students getting hands-on training on computer internal architecture at BKC.',
      category: 'Activities'
    },
    {
      title: 'Girl Child Education Outreach Program',
      filename: 'girl-child-outreach-1.png',
      url: '/uploads/girl-child-outreach-1.png',
      mediaType: 'IMAGE' as const,
      mimeType: 'image/png',
      fileSize: 1691883,
      caption: 'Targeted education intervention for out-of-school girls on the International Day of the Girl Child.',
      category: 'Activities'
    },
    {
      title: 'Primary Headmasters National Conference Assembly',
      filename: 'headmasters-conference-hall.png',
      url: '/uploads/headmasters-conference-hall.png',
      mediaType: 'IMAGE' as const,
      mimeType: 'image/png',
      fileSize: 2012820,
      caption: 'Headmasters from all 21 LGAs assembled for capacity building and professional recognition.',
      category: 'Conferences'
    },
    {
      title: 'V-SAT Satellite Communication Station',
      filename: 'bkc-vsat-installation-1.png',
      url: '/uploads/bkc-vsat-installation-1.png',
      mediaType: 'IMAGE' as const,
      mimeType: 'image/png',
      fileSize: 1000240,
      caption: 'Dedicated V-SAT dish providing uninterrupted broadband community internet access.',
      category: 'Facilities'
    }
  ];

  const mediaRecordMap: Record<string, string> = {};
  for (const item of mediaItems) {
    const existing = await prisma.media.findFirst({ where: { filename: item.filename } });
    if (existing) {
      mediaRecordMap[item.filename] = existing.id;
    } else {
      const created = await prisma.media.create({ data: item });
      mediaRecordMap[item.filename] = created.id;
    }
  }
  console.log(`✅ Seeded ${mediaItems.length} Media Records`);

  // 4. Seed Activities
  const activities = [
    {
      title: 'Free Basic Education & ICT Edutainment for Children (Ages 5–12)',
      slug: 'free-basic-education-ict-children',
      summary: 'Regular free training workshops teaching children computer literacy, hardware disassembly, typing, and introductory science.',
      description: 'At the Bindir Knowledge Development Centre International (BKC), we believe quality basic education is a fundamental right. One of our core daily activities provides completely free training to children aged 5 to 12 years old.',
      date: new Date('2026-08-15'),
      location: 'BKC Training Lab, No 12 Mallum Hamid Street, Yola Town',
      categoryId: categoryMap['basic-education'],
      impact: 'Over 1,200 children have completed introductory computer literacy modules with zero fees charged to families.',
      beneficiariesCount: 1200,
      beneficiariesLabel: 'Children Trained Free of Charge',
      partnersInvolved: 'Adamawa State Universal Basic Education Board (SUBEB), Community Volunteers',
      isPublished: true,
      isFeatured: true,
      coverFilename: 'children-edutainment-hardware.jpg'
    },
    {
      title: '2025 International Day of the Girl Child: Empowering Out-of-School Girls',
      slug: 'international-day-girl-child-outreach',
      summary: 'Special outreach program providing foundational literacy, numeracy, school supplies, and structured enrollment pathways for out-of-school girls.',
      description: 'To commemorate the International Day of the Girl Child, BKC spearheaded a high-impact community outreach project dedicated strictly to out-of-school girl-children across Yola South and surrounding rural communities.',
      date: new Date('2025-10-11'),
      location: 'Yola South LGA, Adamawa State',
      categoryId: categoryMap['girl-child'],
      impact: '650 out-of-school girls profiled and provided with educational supplies, with over 320 successfully re-enrolled into formal primary schools.',
      beneficiariesCount: 650,
      beneficiariesLabel: 'Out-of-School Girls Reached',
      partnersInvolved: 'Adamawa Women Affairs, Local Community Leaders, Volunteer Mentors',
      isPublished: true,
      isFeatured: true,
      coverFilename: 'girl-child-outreach-1.png'
    },
    {
      title: 'National Conference for Primary School Headmasters (Adamawa State Pilot)',
      slug: 'national-conference-primary-school-headmasters',
      summary: 'Convening headmasters from all 21 Local Government Areas of Adamawa State to raise teacher morale, introduce modern ICT curricula, and build professional networks.',
      description: 'Primary school headmasters are the foundational pillars of national education. BKC has pioneered a groundbreaking initiative: the National Conference for Primary School Headmasters, commencing across all 21 LGAs of Adamawa State.',
      date: new Date('2026-05-20'),
      location: 'BKC Grand Conference Hall, Yola Town',
      categoryId: categoryMap['headmasters-conference'],
      impact: '850 Headmasters and senior primary school administrators trained across all 21 Adamawa LGAs, preparing the model for national rollout across 774 LGAs in Nigeria.',
      beneficiariesCount: 850,
      beneficiariesLabel: 'Headmasters & School Leaders Trained',
      partnersInvolved: 'Federal Ministry of Education, National Teachers Institute (NTI), Adamawa State Government',
      isPublished: true,
      isFeatured: true,
      coverFilename: 'headmasters-conference-hall.png'
    }
  ];

  for (const act of activities) {
    const coverMediaId = mediaRecordMap[act.coverFilename];
    const createdActivity = await prisma.activity.upsert({
      where: { slug: act.slug },
      update: {
        title: act.title,
        summary: act.summary,
        description: act.description,
        date: act.date,
        location: act.location,
        categoryId: act.categoryId,
        impact: act.impact,
        beneficiariesCount: act.beneficiariesCount,
        beneficiariesLabel: act.beneficiariesLabel,
        partnersInvolved: act.partnersInvolved,
        isPublished: act.isPublished,
        isFeatured: act.isFeatured
      },
      create: {
        title: act.title,
        slug: act.slug,
        summary: act.summary,
        description: act.description,
        date: act.date,
        location: act.location,
        categoryId: act.categoryId,
        impact: act.impact,
        beneficiariesCount: act.beneficiariesCount,
        beneficiariesLabel: act.beneficiariesLabel,
        partnersInvolved: act.partnersInvolved,
        isPublished: act.isPublished,
        isFeatured: act.isFeatured
      }
    });

    if (coverMediaId) {
      await prisma.activityMedia.upsert({
        where: {
          activityId_mediaId: {
            activityId: createdActivity.id,
            mediaId: coverMediaId
          }
        },
        update: { isCover: true },
        create: {
          activityId: createdActivity.id,
          mediaId: coverMediaId,
          isCover: true,
          order: 0
        }
      });
    }
  }

  console.log(`✅ Seeded ${activities.length} Flagship Activities`);
  console.log('🎉 BKC Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
