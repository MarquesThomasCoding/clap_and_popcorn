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
import { getToSeeMovies, getSeenMovies, updateDisplayName } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MoviesListPreview from "@/components/moviesListPreview";
import { Edit2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Page() {
  const { user, loading } = useAuth();
  const [toSeeMovies, setToSeeMovies] = useState([]);
  const [seenMovies, setSeenMovies] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [newUsername, setNewUsername] = useState("");
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
      const fetchMovies = async () => {
        if (user.uid) {
          const toSeeMovies = await getToSeeMovies(user.uid);
          const seenMovies = await getSeenMovies(user.uid);
          setToSeeMovies(toSeeMovies.slice(0, 10));
          setSeenMovies(seenMovies.slice(0, 10));
          setPageLoading(false);
        }
      };

      fetchMovies();
    }
  }, [user, loading, router]);

  const handleUpdateUsername = async () => {
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
        <MoviesListPreview
          movies={toSeeMovies}
          title="Mes films à voir"
          href="/profile/lists/to-see"
          seeMore
        />
        <MoviesListPreview
          movies={seenMovies}
          title="Mes films vus"
          href="/profile/lists/seen"
          seeMore
        />
      </section>
    </div>
  );
}
