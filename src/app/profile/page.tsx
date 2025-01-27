"use client";

import Loader from "@/components/Loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import { getToSeeMovies, getSeenMovies, getToSeeSeries, getSeenSeries, updateDisplayName } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import MediaListPreview from "@/components/MediaListPreview";
import { Edit2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Movie, Serie } from "@/types/types";

export default function Page(): JSX.Element {
  const { user, loading } = useAuth();
  const [toSeeMovies, setToSeeMovies] = useState<Movie[]>([]);
  const [seenMovies, setSeenMovies] = useState<Movie[]>([]);
  const [toSeeSeries, setToSeeSeries] = useState<Serie[]>([]);
  const [seenSeries, setSeenSeries] = useState<Serie[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [newUsername, setNewUsername] = useState<string>("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.push("/signin");
    } else {
      setNewUsername(user.displayName || "");
      const fetchMedias = async (): Promise<void> => {
        if (user.uid) {
          const toSeeMovies: Movie[] = await getToSeeMovies();
          const seenMovies: Movie[] = await getSeenMovies();
          const toSeeSeries: Serie[] = await getToSeeSeries();
          const seenSeries: Serie[] = await getSeenSeries();
          setToSeeMovies(toSeeMovies.slice(0, 10));
          setSeenMovies(seenMovies.slice(0, 10));
          setToSeeSeries(toSeeSeries.slice(0, 10));
          setSeenSeries(seenSeries.slice(0, 10));
          setPageLoading(false);
        }
      };

      fetchMedias();
    }
  }, [user, loading, router]);

  const handleUpdateUsername = async (): Promise<void> => {
    if (newUsername.trim() === "") return;
    if (user) {
      await updateDisplayName(newUsername)
        .then((data) => {
          if (data?.success) {
            toast({
              title: "Nom d'utilisateur mis à jour avec succès",
              description: `${newUsername}`,
            });
          } else {
            toast({
              title: "Erreur lors de la mise à jour du nom d'utilisateur",
              description: `Erreur lors  de la mise à jour du nom d'utilisateur`,
              variant: "destructive",
            });
          }
        })
        .catch((error) => {
          toast({
            title: "Erreur lors de la mise à jour du nom d'utilisateur",
            description: `${error}`,
            variant: "destructive",
          });
        });
    }
  };

  if (pageLoading) {
    return <Loader message="Profil en cours de chargement..." />;
  }

  return (
    <div>
      <section className="m-20 flex flex-col gap-16">
        <h1 className="flex items-center gap-8 text-5xl">
          Bonjour {newUsername}
          <Dialog>
            <DialogTrigger>
              <Edit2 className="text-muted-foreground hover:text-white transition-colors" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Mise à jour du profil</DialogTitle>
                <DialogDescription>
                  Mettez à jour votre nom d&apos;utilisateur ici
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom d&apos;utilisateur
                  </Label>
                  <Input
                    id="username"
                    value={newUsername}
                    className="col-span-3"
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" onClick={handleUpdateUsername}>
                    Sauvegarder
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </h1>
        <MediaListPreview medias={toSeeMovies} type="movie" title="Mes films à voir" href="/profile/lists/to-see" seeMore />
        <MediaListPreview medias={seenMovies} type="movie" title="Mes films vus" href="/profile/lists/seen" seeMore />
        <MediaListPreview medias={toSeeSeries} type="serie" title="Mes séries à voir" href="/profile/lists/to-see" seeMore />
        <MediaListPreview medias={seenSeries} type="serie" title="Mes séries vues" href="/profile/lists/seen" seeMore />
      </section>
    </div>
  );
}
