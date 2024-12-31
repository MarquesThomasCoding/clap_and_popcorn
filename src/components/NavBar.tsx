"use client";

import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import useAuth from "@/hooks/useAuth";

export const NavBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTop = React.useRef(0);

  const { user, loading } = useAuth();

  useEffect(() => {
      console.log("User:", user); // Ajoutez ce log pour vérifier l'état de l'utilisateur
  
      if (loading) {
        // Si l'état de chargement est en cours, ne rien faire
        return;
      }
    }, [user, loading]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop.current) {
        // Scroll vers le bas
        setIsVisible(false);
      } else {
        // Scroll vers le haut
        setIsVisible(true);
      }

      lastScrollTop.current = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NavigationMenu
      className={`fixed top-0 left-0 w-full max-w-none justify-between px-20 bg-black bg-opacity-50 backdrop-blur-sm transition-transform duration-300 ${
        isVisible ? "transform-none" : "-translate-y-full"
      }`}
    >
      <NavigationMenuList>
        <NavigationMenuItem className="flex items-center">
          <Link href="/" legacyBehavior passHref>
            <Image
              className="w-20 h-20"
              src="/imgs/logo_v1-without_bg.png"
              alt="Logo"
              width={500}
              height={500}
            />
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/movies" legacyBehavior passHref>
            <NavigationMenuLink
              className={
                navigationMenuTriggerStyle() +
                " bg-transparent hover:bg-transparent"
              }
            >
              Films
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/tv" legacyBehavior passHref>
            <NavigationMenuLink
              className={
                navigationMenuTriggerStyle() +
                " bg-transparent hover:bg-transparent"
              }
            >
              Séries
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList className="py-4">
        <NavigationMenuItem>
          <SearchBar />
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
            {user ? (
            <DropdownMenu>
                <DropdownMenuTrigger>{user.displayName}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link href="/profile">Profil</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/profile/lists/to-see">Mes films à voir</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/profile/lists/seen">Déjà vu</Link></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Me déconnecter</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            ) :
            <Link href="/signin" legacyBehavior passHref>
                <NavigationMenuLink
                    className={
                    navigationMenuTriggerStyle() +
                    " bg-transparent hover:bg-transparent"
                    }
                >
                    Se connecter
                </NavigationMenuLink>
            </Link>
            }
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
