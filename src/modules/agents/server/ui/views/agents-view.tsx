"use client";

import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentsViews = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
    return (
        <div>
            {JSON.stringify(data, null, 2)}
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