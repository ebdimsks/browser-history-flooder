(() => {
  const intervalMs = 25;

  // Generate one 32-bit seed per page load.
  // Xorshift32 gets stuck at zero, so replace that single invalid seed.
  let state = (Math.random() * 0x100000000) | 0;
  if (state === 0) state = 1;

  setInterval(() => {
    // Xorshift32: three bitwise operations per update.
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;

    history.pushState(null, "", `#${state >>> 0}`);
  }, intervalMs);
})();
