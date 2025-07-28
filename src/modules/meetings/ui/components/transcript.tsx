import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { generateAvatarUri } from "@/lib/avatar"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { SearchIcon } from "lucide-react"
import { useState } from "react"
import Highlighter from "react-highlight-words"

interface Props {
  meetingId: string
}

export const Transcript = ({ meetingId }: Props) => {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.meetings.getTranscript.queryOptions({ id: meetingId }))

  const [searchQuery, setSearchQuery] = useState("")
  const filteredData = (data ?? []).filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-white dark:bg-black border dark:border-zinc-800 rounded-lg px-4 py-5 flex flex-col gap-y-4 w-full">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Transcript</p>
      
      <div className="relative">
        <Input
          placeholder="Search Transcript"
          className="pl-7 h-9 w-[240px] bg-white dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      </div>

      <ScrollArea>
        <div className="flex flex-col gap-y-4">
          {filteredData.map((item) => (
            <div
              key={item.start_ts}
              className="flex flex-col gap-y-4 hover:bg-muted/50 dark:hover:bg-zinc-900 p-4 rounded-md border border-zinc-200 dark:border-zinc-700"
            >
              <div className="flex gap-x-2 items-center">
                <Avatar className="size-6">
                  <AvatarImage
                    src={item.user.image ?? generateAvatarUri({ seed: item.user.name, variant: "initials" })}
                    alt="User Avatar"
                  />
                </Avatar>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{item.user.name}</p>
                <p className="text-sm text-blue-500 font-medium">
                  {format(new Date(0, 0, 0, 0, 0, 0, item.start_ts), "mm:ss")}
                </p>
              </div>

              <Highlighter
                className="text-sm text-zinc-700 dark:text-zinc-300"
                highlightClassName="bg-yellow-300 dark:bg-yellow-600"
                searchWords={[searchQuery]}
                autoEscape={true}
                textToHighlight={item.text}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
