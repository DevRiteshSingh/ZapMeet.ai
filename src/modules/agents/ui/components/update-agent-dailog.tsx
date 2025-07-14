import React from 'react';
import { ResponsiveDailog } from '@/components/responsive-dailog';
import { AgentForm } from './agents-form';
import { AgentGetOne } from '@/modules/agents/types';

interface UpdateAgentDailogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AgentGetOne
}

export const UpdateAgentDailog = ({
    open,
    onOpenChange,
    initialValues
}: UpdateAgentDailogProps) => {
    return (
        <ResponsiveDailog 
        title="Edit Agent"
        description="Edit the Agent details"
        open={open}
        onOpenChange={onOpenChange}
        >
            <AgentForm 
             onSuccess={() => onOpenChange(false)}
             onCancel={() => onOpenChange(false)}
             initialValues={initialValues}
             />
        </ResponsiveDailog>
    )
}