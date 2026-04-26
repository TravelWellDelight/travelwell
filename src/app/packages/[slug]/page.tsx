import { notFound } from "next/navigation";
import { getPackageBySlug, packages } from "@/data/packages";
import PackageDetailClient from "@/components/packages/PackageDetailClient";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) return { title: "Package Not Found" };
  return {
    title: pkg.title,
    description: pkg.tagline,
    openGraph: {
      images: [{ url: pkg.images.hero }],
    },
  };
}

export default function PackageDetailPage({ params }: Props) {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) notFound();
  return <PackageDetailClient pkg={pkg} />;
}
