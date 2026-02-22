(async () => {
  const { scan } = await import("react-scan"); // must be imported before React and React DOM

  scan({
    log: import.meta.env.DEV,
    enabled: import.meta.env.DEV,
  });
})();
