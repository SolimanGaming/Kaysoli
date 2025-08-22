// Glowing links hover effect
document.querySelectorAll('.glow-link, .links a').forEach(link => {
  link.addEventListener('mousemove', e => {
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    link.style.boxShadow = `${x / 2}px ${y / 2}px 20px rgba(255,255,255,0.9)`;
  });
  link.addEventListener('mouseleave', () => {
    link.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.3)";
  });
});

// =========================
// Bedwars Stats Popup Logic
// =========================

// Replace these with your own details
const UUID = "PUT-YOUR-UUID-HERE";
const PLAYER_NAME = "PUT-YOUR-NAME-HERE";

document.getElementById('bw-stats-btn').addEventListener('click', async (e) => {
  e.preventDefault();
  document.getElementById('bw-popup').style.display = 'block';
  document.getElementById('bw-content').innerHTML = "Loading...";

  try {
    // Call Vercel API (player + guild merged)
    const res = await fetch(`/api/hypixel?uuid=${UUID}`);
    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch stats");
    }

    const player = data.player;
    const bedwars = player?.stats?.Bedwars || {};
    const level = player?.achievements?.bedwars_level || 0;
    const rank = player?.newPackageRank || "Default";
    const guildName = data.guild?.name || "No Guild";

    const skinURL = `https://crafatar.com/avatars/${UUID}?overlay`;

    document.getElementById('bw-content').innerHTML = `
      <img src="${skinURL}" width="100" height="100">
      <h2>${PLAYER_NAME}</h2>
      <p><strong>Rank:</strong> ${rank}</p>
      <p><strong>Guild:</strong> ${guildName}</p>
      <p><strong>Bedwars Level:</strong> ${level}</p>
      <p><strong>Wins:</strong> ${bedwars.wins_bedwars || 0}</p>
      <p><strong>Losses:</strong> ${bedwars.losses_bedwars || 0}</p>
      <p><strong>Final Kills:</strong> ${bedwars.final_kills_bedwars || 0}</p>
      <p><strong>Final Deaths:</strong> ${bedwars.final_deaths_bedwars || 0}</p>
      <p><strong>Beds Broken:</strong> ${bedwars.beds_broken_bedwars || 0}</p>
      <p><strong>Beds Lost:</strong> ${bedwars.beds_lost_bedwars || 0}</p>
    `;
  } catch (err) {
    document.getElementById('bw-content').innerHTML = "Error: " + err.message;
    console.error(err);
  }
});

// Close popup
document.getElementById('popup-close').addEventListener('click', () => {
  document.getElementById('bw-popup').style.display = 'none';
});
