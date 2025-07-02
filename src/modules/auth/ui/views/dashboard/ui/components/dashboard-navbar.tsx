"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeftClose, PanelLeftIcon, SearchCheckIcon } from "lucide-react"
import { DashboardCommand } from "./dashboard-command"
import { useEffect, useState } from "react"

export const DashboardNavbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar();
    const [commandOpen, setcommandOpen] = useState(false);
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setcommandOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [])
    return (
        <>
            <DashboardCommand open={commandOpen} setOpen={setcommandOpen} />
            <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
                <Button className="size-9" variant={"outline"} onClick={toggleSidebar}>
                    {(state === "collapsed" || isMobile)
                        ? <PanelLeftIcon className="size-4" />
                        : <PanelLeftClose className="size-4" />
                    }
                </Button>
                <Button
                    className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
                    variant={"outline"}
                    size="sm"
                    onClick={() => setcommandOpen((open) => !open)}
                >
                    <SearchCheckIcon />
                    Search
                    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none gap-1 items-center rounded
                border bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground">
                        <span className="text-xs">
                            &#8984; /
                        </span>
                    </kbd>
                </Button>
            </nav>
        </>
    )
}