"use client";
import { useState, useEffect, use } from "react";
import { usePomodoroSessionStore } from "@/lib/store/sessionStore";
import moment from "moment";

export default function PomodoroDashboard() {
  const { currentSession, startSession, getCurrentSession, endSession } =
    usePomodoroSessionStore();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //Countdown timer logic
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    const init = async () => {
      await getCurrentSession();
    };
    init();
  }, [getCurrentSession]);

  //When session changes,

  useEffect(() => {
    if (!currentSession) {
      setTimeLeft(0);
      setIsRunning(false);
      return;
    }

    const startedAt = new Date(currentSession.startTime).getTime();
    const elapsed = Math.floor((Date.now() - startedAt) / 1000);
    const remaining = currentSession.expectedDuration - elapsed;

    if (remaining > 0) {
      setTimeLeft(remaining);
      setIsRunning(true);
    } else {
      setTimeLeft(0);
      setIsRunning(false);
    }
  }, [currentSession]);

  const formatTime = (seconds: number) => {
    return moment.utc(seconds * 1000).format("mm:ss");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4">
      <h1 className="text-3xl font-bold mb-8">Pomodoro Dashboard</h1>

      <div className="text-6xl font-mono mb-6">
        {timeLeft > 0 ? formatTime(timeLeft) : "00:00"}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        {!isRunning ? (
          <>
            <button
              onClick={() => startSession("pomodoro")}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded shaddow text-white"
            >
              Start Pomodoro
            </button>

            <button
              onClick={() => startSession("short_break")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded shaddow text-white"
            >
              Short Break
            </button>

            <button
              onClick={() => startSession("short_break")}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded shaddow text-white"
            >
              Long Break
            </button>
          </>
        ) : (
          <button
            onClick={endSession}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded shaddow text-white"
          >
            End Session
          </button>
        )}
      </div>
    </div>
  );
}
