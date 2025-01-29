import { Suspense } from "react";
import ActorDetails from "@/components/ActorDetails";

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main className="flex flex-col gap-8 m-20 p-8">
      {/* Load Actor Details Separately */}
      <Suspense fallback={<div>Loading actor details...</div>}>
        <ActorDetails slug={slug} />
      </Suspense>
    </main>
  );
}
