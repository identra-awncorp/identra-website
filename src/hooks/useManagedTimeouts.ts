import { useCallback, useEffect, useRef } from 'react';

export type ManagedTimeoutScheduler = (callback: () => void, delay: number) => number;

export function useManagedTimeouts() {
  const timeoutIdsRef = useRef<Set<number>>(new Set());

  const clearTimeouts = useCallback(() => {
    for (const timeoutId of timeoutIdsRef.current) {
      window.clearTimeout(timeoutId);
    }
    timeoutIdsRef.current.clear();
  }, []);

  const scheduleTimeout = useCallback<ManagedTimeoutScheduler>((callback, delay) => {
    const timeoutId = window.setTimeout(() => {
      timeoutIdsRef.current.delete(timeoutId);
      callback();
    }, delay);
    timeoutIdsRef.current.add(timeoutId);
    return timeoutId;
  }, []);

  useEffect(() => clearTimeouts, [clearTimeouts]);

  return { clearTimeouts, scheduleTimeout };
}
