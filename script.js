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
const PROXY = "https://corsproxy.io/?";

document.getElementById('bw-stats-btn').addEventListener('click', async (e) => {
    e.preventDefault();
    document.getElementById('bw-popup').style.display = 'block';
    document.getElementById('bw-content').innerHTML = "Loading...";

    try {
        // 1. Get UUID from Mojang API (no proxy needed)
        const mojangRes = await fetch(`https://api.mojang.com/users/profiles/minecraft/${PLAYER_NAME}`);
        const mojangData = await mojangRes.json();
        const uuid = mojangData.id;

        // 2. Get player info from Hypixel API (via proxy)
        const hypixelRes = await fetch(`${PROXY}https://api.hypixel.net/player?key=${API_KEY}&uuid=${uuid}`);
        const hypixelData = await hypixelRes.json();

        if (!hypixelData.success) {
            throw new Error(hypixelData.cause || "Failed to fetch player data");
        }

        const player = hypixelData.player;
        const bedwars = player?.stats?.Bedwars || {};
        const level = player?.achievements?.bedwars_level || 0;
        const rank = player?.newPackageRank || "Default";

        // 3. Get guild info (via proxy)
        const guildRes = await fetch(`${PROXY}https://api.hypixel.net/guild?key=${API_KEY}&player=${uuid}`);
        const guildData = await guildRes.json();
        const guildName = guildData.guild?.name || "No Guild";

        // 4. Player skin
        const skinURL = `https://crafatar.com/avatars/${uuid}?overlay`;

        // 5. Build popup content
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
        document.getElementById('bw-content').innerHTML = "Error loading stats: " + err.message;
        console.error(err);
    }
});

// Close popup
document.getElementById('popup-close').addEventListener('click', () => {
    document.getElementById('bw-popup').style.display = 'none';
});
