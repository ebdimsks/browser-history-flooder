(() => {
  let counter = Number(location.hash.slice(1)) || 0;
  const intervalMs = 25;

  setInterval(() => {
    history.pushState(null, "", `#${++counter}`);
  }, intervalMs);
})();
