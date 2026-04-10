const activeRunControllers = new Set<AbortController>();

export function registerActiveRun(controller: AbortController): () => void {
  activeRunControllers.add(controller);

  return () => {
    activeRunControllers.delete(controller);
  };
}

export function abortActiveRuns(): void {
  for (const controller of activeRunControllers) {
    controller.abort();
  }

  activeRunControllers.clear();
}
