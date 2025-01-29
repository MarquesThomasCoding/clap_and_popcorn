import MediaDetails from "@/components/MediaDetails";
import { Suspense } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <main className="flex flex-col gap-8">
        {/* Show Loading UI while movie details load */}
        <Suspense fallback={<div>Loading serie details...</div>}>
          <MediaDetails slug={params.slug} type="serie" />
        </Suspense>
      </main>
    </>
  );
}