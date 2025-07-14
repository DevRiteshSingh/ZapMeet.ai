import React from 'react';
import { ResponsiveDailog } from '@/components/responsive-dailog';
import { MeetingForm } from './meeting-form';

import { MeetingGetOne } from '../../types';



interface NewMeetingDailogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: MeetingGetOne
}

export const UpdateMeetingDialog = ({
    open,
    onOpenChange,
    initialValues
}: NewMeetingDailogProps) => {
    return (
        <>
            <ResponsiveDailog
                title="Edit Meeting"
                description="Edit a meeting"
                open={open}
                onOpenChange={onOpenChange}
            >
                <MeetingForm
                    onSuccess={() => {
                        onOpenChange(false);
                    }}
                    onCancel={() => onOpenChange(false)}
                    initialValues={initialValues}
                />
            </ResponsiveDailog>
        </>
    )
}