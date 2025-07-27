import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import type { Channel as StreamChannel } from "stream-chat"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import {
  Chat,
  Channel,
  Window,
  useCreateChatClient,
  MessageList,
  MessageInput,
  Thread
} from "stream-chat-react"
import "stream-chat-react/dist/css/v2/index.css"

interface ChatUIProps {
  meetingId: string,
  meetingName: string,
  userId: string,
  userName: string,
  userImage: string | undefined
}

export const ChatUI = ({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage
}: ChatUIProps) => {
  const trpc = useTRPC()
  const { mutateAsync: generateChatToken } = useMutation(
    trpc.meetings.generateChatToken.mutationOptions(),
  );

  const [channel, setChannel] = useState<StreamChannel>()
  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
    tokenOrProvider: generateChatToken,
    userData: {
      id: userId,
      name: userName,
      image: userImage
    },
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel("messaging", meetingId, {
      members: [userId]
    });

    setChannel(channel);
  }, [client, meetingId, userId, meetingName]);

  if (!client) {
    return (
      <LoadingState
        title="Loading Chat"
        description="This may take few seconds"
      />
    )
  }

  return (
    <div className="bg-white dark:bg-black border dark:border-zinc-800 rounded-lg overflow-hidden">
      <Chat client={client} theme="str-chat__theme-dark">
        <Channel channel={channel}>
          <Window>
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] border-b dark:border-zinc-700">
              <MessageList />
            </div>
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}
