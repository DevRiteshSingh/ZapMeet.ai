"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { NewMeetingDialog } from "./new-meeting-dailog"
import { useState } from "react"
export const MeetingsListHeader = () => {
    const [isDailogOpen , setIsDailogOpen] = useState(false);
    return (
        <>
        <NewMeetingDialog open={isDailogOpen} onOpenChange={setIsDailogOpen}/>
            <div className="py-4 px-4 md:px-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">My Meetings</h5>
                    <Button onClick={() => setIsDailogOpen(true)}>
                        <PlusIcon />
                        New Meeting
                    </Button>
                </div>
                <div className="flex items-center gap-x-2 p-1">
                </div>
            </div>
        </>
    )
}
