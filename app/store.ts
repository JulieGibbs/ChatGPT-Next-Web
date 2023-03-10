import { create } from "zustand";
import { persist } from "zustand/middleware";

import { type ChatCompletionResponseMessage } from "openai";
import { requestChat, requestWithPrompt } from "./requests";
import { trimTopic } from "./utils";

export type Message = ChatCompletionResponseMessage & {
  date: string;
};

interface ChatConfig {
  maxToken: number;
}

interface ChatStat {
  tokenCount: number;
  wordCount: number;
  charCount: number;
}

interface ChatSession {
  topic: string;
  memoryPrompt: string;
  messages: Message[];
  stat: ChatStat;
  lastUpdate: string;
  deleted?: boolean;
}

const DEFAULT_TOPIC = "新的聊天";

function createEmptySession(): ChatSession {
  const createDate = new Date().toLocaleString();

  return {
    topic: DEFAULT_TOPIC,
    memoryPrompt: "",
    messages: [
      {
        role: "assistant",
        content: "有什么可以帮你的吗",
        date: createDate,
      },
    ],
    stat: {
      tokenCount: 0,
      wordCount: 0,
      charCount: 0,
    },
    lastUpdate: createDate,
  };
}

interface ChatStore {
  sessions: ChatSession[];
  currentSessionIndex: number;
  removeSession: (index: number) => void;
  selectSession: (index: number) => void;
  newSession: () => void;
  currentSession: () => ChatSession;
  onNewMessage: (message: Message) => void;
  onUserInput: (content: string) => Promise<void>;
  onBotResponse: (message: Message) => void;
  summarizeSession: () => void;
  updateStat: (message: Message) => void;
  updateCurrentSession: (updater: (session: ChatSession) => void) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [createEmptySession()],
      currentSessionIndex: 0,

      selectSession(index: number) {
        set({
          currentSessionIndex: index,
        });
      },

      removeSession(index: number) {
        set((state) => {
          let nextIndex = state.currentSessionIndex;
          const sessions = state.sessions;

          if (sessions.length === 1) {
            return {
              currentSessionIndex: 0,
              sessions: [createEmptySession()],
            };
          }

          sessions.splice(index, 1);

          if (nextIndex === index) {
            nextIndex -= 1;
          }

          return {
            currentSessionIndex: nextIndex,
            sessions,
          };
        });
      },

      newSession() {
        set((state) => ({
          currentSessionIndex: state.sessions.length,
          sessions: state.sessions.concat([createEmptySession()]),
        }));
      },

      currentSession() {
        let index = get().currentSessionIndex;
        const sessions = get().sessions;

        if (index < 0 || index >= sessions.length) {
          index = Math.min(sessions.length - 1, Math.max(0, index));
          set(() => ({ currentSessionIndex: index }));
        }

        return sessions[index];
      },

      onNewMessage(message) {
        get().updateCurrentSession((session) => {
          session.messages.push(message);
        });
        get().updateStat(message);
        get().summarizeSession();
      },

      async onUserInput(content) {
        const message: Message = {
          role: "user",
          content,
          date: new Date().toLocaleString(),
        };

        const messages = get().currentSession().messages.concat(message);
        get().onNewMessage(message);

        const res = await requestChat(messages);

        get().onNewMessage({
          ...res.choices[0].message!,
          date: new Date().toLocaleString(),
        });
      },

      onBotResponse(message) {
        get().onNewMessage(message);
      },

      summarizeSession() {
        const session = get().currentSession();

        if (session.topic !== DEFAULT_TOPIC) return;

        requestWithPrompt(
          session.messages,
          "简明扼要地 10 字以内总结主题"
        ).then((res) => {
          get().updateCurrentSession(
            (session) => (session.topic = trimTopic(res))
          );
        });
      },

      updateStat(message) {
        get().updateCurrentSession((session) => {
          session.stat.charCount += message.content.length;
          // TODO: should update chat count and word count
        });
      },

      updateCurrentSession(updater) {
        const sessions = get().sessions;
        const index = get().currentSessionIndex;
        updater(sessions[index]);
        set(() => ({ sessions }));
      },
    }),
    { name: "chat-next-web-store" }
  )
);
