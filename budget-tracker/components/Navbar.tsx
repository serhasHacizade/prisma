"use client"

import { UserButton } from "@clerk/nextjs";
import { Logo, MobileLogo } from "./Logo";
import { NavbarItem } from "./NavbarItem";
import { ThemeSwitcherBtn } from "./ThemeSwitcherBtn";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";


const Navbar = () => {
    return (
        <>
            <DesktopNavbar />
            <MobileNavbar />
        </>
    );
}

const items = [
    { label: "Dashboard", link: "/" },
    { label: "Transactions", link: "/transactions" },
    { label: "Manage", link: "/manage" },
];

const DesktopNavbar = () => {
    return <div className="hidden border-separate border-b bg-background md:block">
        <nav className="container flex items-center justify-between px-8">
            <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
                <Logo />
                <div className="flex h-full">
                    {items.map(item => (
                        <NavbarItem key={item.label} link={item.link} label={item.label} />
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <ThemeSwitcherBtn />
                <UserButton afterSignOutUrl="/sign-in" />
            </div>
        </nav>
    </div>
};

const MobileNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="block border-separate bg-background md:hidden">
            <nav className="container flex items-center justify-between px-8">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px]" side="left" >
                        <Logo />
                        <div className="flex flex-col gap-1 pt-4">
                            {items.map(item => (
                                <NavbarItem key={item.label} link={item.link} 
                                label={item.label} clickCallback={() => setIsOpen(prev => !prev)}/>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
                    <MobileLogo />
                </div>
                <div className="flex items-center gap-2">
                    <ThemeSwitcherBtn />
                    <UserButton afterSignOutUrl="/sign-in" />
                </div>
            </nav>
        </div>
    )
};

export default Navbar;