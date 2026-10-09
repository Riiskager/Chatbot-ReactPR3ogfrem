
import { ChatMessages, ChatInput } from "../components/Chat.jsx";
import { useLoaderData } from "react-router";

/**
 * INITIAL THREAD MESSAGES DATA
 *
 * This is placeholder data for any thread.
 * Later, this will be replaced with data fetched from the database.
 */


/**
 * Chat Thread Route Component
 *
 * This route displays an individual chat conversation thread.
 * Now uses useParams() to access the threadId from the URL!
 *
 * Key concepts:
 * 1. useParams() HOOK: Extracts URL parameters from the route
 * 2. The `messages` state is currently shared among all threads, this will be fixed later.
 */

export async function clientLoader({params}){
  // const { threadID } = params;

  const mockMessages=[
    {
      id: 1,
      type: "user",
      content: `This is a message from thread ${params.threadId}`
    },
    {
      id: 2,
      type: "bot",
      content: `This is the bots response in thread ${params.threadId}`
    }
  ]
 await new Promise((resolve) => setTimeout(resolve, 500))
  

 return{
    threadID:params.threadId,
    messages: mockMessages,
  }

}

export default function ChatThread() {
  // Extract the threadId from the URL using useParams()
  const { threadId, messages } = useLoaderData();



  const addMessage = (content) => {
    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: content,
    };

   console.log("message submtted:", content)
  };

  return (
    <main className="chat-container">
      <div className="chat-thread-header">
        <h2>Conversation Thread #{threadId}</h2>
      </div>
      <ChatMessages messages={messages} />
      <ChatInput onAddMessage={addMessage} />
    </main>
  );
}
