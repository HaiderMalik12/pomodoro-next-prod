import { create } from "zustand";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PomodoroSession {
  id: number;
  typpe: "pomodoro" | "short_break" | "long_break";
  startedAt: string;
  startTime: string;
  endTime: string;
  duration: number;
  expectedDuration: number;
}

interface PomodoroSessionState {
  currentSession: PomodoroSession | null;
  startSession: (
    type: "pomodoro" | "short_break" | "long_break"
  ) => Promise<void>;
  getCurrentSession: () => Promise<void>;
  endSession: () => Promise<void>;
}

export const usePomodoroSessionStore = create<PomodoroSessionState>((set) => ({
  currentSession: null,
  startSession: async (type) => {
    try {
      const response = await axios.post(
        `${API_URL}/pomodoro-session/start`,
        {
          type,
        },
        { withCredentials: true }
      );
      set({ currentSession: response.data });
    } catch (error) {
      console.error("Failed to start session:", error);
    }
  },
  getCurrentSession: async () => {
    try {
      const response = await axios.get(`${API_URL}/pomodoro-session/current`, {
        withCredentials: true,
      });
      set({ currentSession: response.data || null });
    } catch (error) {
      console.error("Failed to fetch current session:", error);
    }
  },
  endSession: async () => {
    try {
      const { currentSession } = usePomodoroSessionStore.getState();
      if (!currentSession) return;

      await axios.patch(
        `${API_URL}/pomodoro-session/${currentSession.id}/end`,
        {},
        { withCredentials: true }
      );
      set({ currentSession: null });
    } catch (error) {
      console.error("Failed to end session:", error);
    }
  },
}));
