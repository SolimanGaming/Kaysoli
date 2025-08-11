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
const API_KEY = "YOUR_API_KEY"; // Replace with your Hypixel API key
const PLAYER_NAME = "YOUR_USERNAME"; // Replace with your Minecraft username

document.getElementById('bw-stats-btn').addEventListener('click', async (e) => {
    e.preventDefault();
    document.getElementById('bw-popup').style.display = 'block';
    document.getElementById('bw-content').innerHTML = "Loading...";

    try {
        // Get UUID from Mojang API
        const mojangRes = await fetch(`https://api.mojang.com/users/profiles/minecraft/${PLAYER_NAME}`);
        const mojangData = await mojangRes.json();
        const uuid = mojangData.id;

        // Get player info from Hypixel API
        const hypixelRes = await fetch(`https://api.hypixel.net/player?key=${API_KEY}&uuid=${uuid}`);
        const hypixelData = await hypixelRes.json();
        const player = hypixelData.player;
        const bedwars = player?.stats?.Bedwars || {};
        const level = player?.achievements?.bedwars_level || 0;
        const rank = player?.newPackageRank || "Default";

        // Get guild info
        const guildRes = await fetch(`https://api.hypixel.net/guild?key=${API_KEY}&player=${uuid}`);
        const guildData = await guildRes.json();
        const guildName = guildData.guild?.name || "No Guild";

        // Player skin
        const skinURL = `https://crafatar.com/avatars/${uuid}?overlay`;

        // Build popup content
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
        document.getElementById('bw-content').innerHTML = "Error loading stats.";
        console.error(err);
    }
});

// Close popup
document.getElementById('popup-close').addEventListener('click', () => {
    document.getElementById('bw-popup').style.display = 'none';
});
