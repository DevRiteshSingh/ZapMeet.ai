import React, { Suspense } from 'react';
import { ErrorBoundary } from "react-error-boundary"
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import {
  AgentsViewError,
  AgentsViewLoading,
  AgentsViews
} from '@/modules/agents/server/ui/views/agents-view';

import { getQueryClient, trpc } from '@/trpc/server';

const Page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsViewLoading />}>
        <ErrorBoundary fallback={<AgentsViewError />}>

          <AgentsViews />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page;
