"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname} from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher"

export const NavbarRoutes = () =>{ 

    const { userId } = useAuth();
    const pathname = usePathname();
    
    const isTeacherPage = pathname?.startsWith("/teacher")
    const isCoursePage = pathname?.includes("/chapter"); // chapter

    const isSearchPage = pathname === "/search";
    
    return(
    <>    
        {isSearchPage && (
            <div className="hidden md:block">
                <SearchInput/>
            </div>
        )}
        <div className="flex gap-x-2 ml-auto">
            {isTeacherPage || isCoursePage ? (
                <Link href="/">
                    <Button size="sm" variant="ghost">
                        <LogOut className="h-4 w-4 mr-2"/>
                        Выйти
                    </Button>
                </Link>
            ): isTeacher(userId) ?( 
            <Link href="/teacher/courses">
                <Button size="sm" variant="ghost">
                     Режим преподавателя
                </Button>
            </Link>
            ): null}
            <UserButton
              afterSignOutUrl="/"
            />
        </div>
    </>    
    )
}