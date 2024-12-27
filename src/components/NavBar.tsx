"use client"

import React, { useState, useEffect } from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export const NavBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollTop = React.useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop.current) {
                // Scroll vers le bas
                setIsVisible(false);
            } else {
                // Scroll vers le haut
                setIsVisible(true);
            }

            lastScrollTop.current = scrollTop;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <NavigationMenu className={`fixed top-0 left-0 w-full max-w-none justify-between px-20 bg-black bg-opacity-50 backdrop-blur-sm transition-transform duration-300 ${isVisible ? 'transform-none' : '-translate-y-full'}`}>
            <NavigationMenuList>
                <NavigationMenuItem className="flex items-center">
                    <Link href="/" legacyBehavior passHref>
                        <Image className="w-20 h-20" src="/imgs/logo_v1-without_bg.png" alt="Logo" width={500} height={500} />
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle() + ' bg-transparent hover:bg-transparent'}>
                            Films
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/actors" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle() + ' bg-transparent hover:bg-transparent'}>
                            Acteurs
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuList className="py-4">
                <NavigationMenuItem>
                    <SearchBar />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};