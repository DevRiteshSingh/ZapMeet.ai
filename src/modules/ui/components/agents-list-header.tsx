"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { NewAgentDailog } from "./new-agent-dailog"
import { useState } from "react"
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters"
import { AgentsSearchFilter } from "./agents-search-filters"
import { DEFAULT_PAGE } from "@/constants"

export const AgentsListHeader = () => {
    const [filters, setFilters] = useAgentsFilters();
    const [isDailogOpen, setIsDailofOpen] = useState(false);

    const isAnyFilterModified = !!filters.search;
    const onClearFilters = () => {
        setFilters({
            search: "",
            page: DEFAULT_PAGE
        })
    }
    return (
        <>
            <NewAgentDailog open={isDailogOpen} onOpenChange={setIsDailofOpen} />
            <div className="py-4 px-4 md:px-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">Agents List</h5>
                    <Button onClick={() => setIsDailofOpen(true)}>
                        <PlusIcon />
                        New Agent
                    </Button>
                </div>
                <div className="flex items-center gap-x-2 p-1">
                    <AgentsSearchFilter />
                    {isAnyFilterModified && (
                        <Button variant="outline" size="sm" onClick={onClearFilters}>
                            <XCircleIcon />
                            Clear
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}
