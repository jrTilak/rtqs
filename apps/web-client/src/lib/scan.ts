(async () => {
  const { scan } = await import("react-scan"); // must be imported before React and React DOM

  scan({
    enabled: import.meta.env.DEV,
  });
})();
