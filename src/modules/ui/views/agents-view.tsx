"use client";

import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-tabel";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";

export const AgentsViews = () => {
    const [fileres, setFilters] = useAgentsFilters()
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...fileres,
    }));
    return (
        <div className="flex-1 pb-4 px-4 flex flex-col md:px-8 gap-y-4">
            <DataTable data={data.items} columns={columns}/>
            <DataPagination 
             page= {fileres.page}
             totalPage= {data.totalPages}
             onPageChange= {(page) => setFilters({ page })}
            />
            {data.items.length === 0 && (
                <EmptyState 
                title="Create your first agent"
                description="Create your agent to join meetings."
                />
            )}
        </div>
    );
}

export const AgentsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            description="This may take few seconds"
        />
    )
}

export const AgentsViewError = () => {
    return (
        <ErrorState
            title="Error loading Agents"
            description="Try again later"
        />
    )
}