import MediaDetails from "@/components/MediaDetails";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <>
      <main className="flex flex-col gap-8">
        {/* Show Loading UI while movie details load */}
        <Suspense fallback={<div>Loading movie details...</div>}>
          <MediaDetails slug={slug} type="movie" />
        </Suspense>
      </main>
    </>
  );
}