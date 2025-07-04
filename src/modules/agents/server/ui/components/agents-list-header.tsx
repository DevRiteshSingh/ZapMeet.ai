"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { NewAgentDailog } from "./new-agent-dailog"
import { useState } from "react"

export const AgentsListHeader = () => {
    const [isDailogOpen, setIsDailofOpen] = useState(false);
    return (
        <>
        <NewAgentDailog  open={isDailogOpen} onOpenChange={setIsDailofOpen}/>
            <div className="py-4 px-4 md:px-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">Agents List</h5>
                    <Button onClick={() => setIsDailofOpen(true)}>
                        <PlusIcon />
                        New Agent
                    </Button>
                </div>
            </div>
        </>
    )
}
