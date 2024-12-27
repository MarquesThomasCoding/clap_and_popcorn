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
    return (
        <NavigationMenu className="fixed top-0 left-0 w-full max-w-none justify-between px-20">
            <NavigationMenuList className="py-4">
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