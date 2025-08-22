export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { uuid } = req.query;
  if (!uuid) {
    return res.status(400).json({ success: false, error: "UUID required" });
  }

  const API_KEY = "3e6f76ed-09e6-465d-972f-08716da6009a"; // replace with your Hypixel API key

  try {
    // Player data
    const playerRes = await fetch(`https://api.hypixel.net/player?key=${API_KEY}&uuid=${uuid}`);
    const playerData = await playerRes.json();

    if (!playerData.success) {
      return res.status(500).json(playerData);
    }

    // Guild data
    const guildRes = await fetch(`https://api.hypixel.net/guild?key=${API_KEY}&player=${uuid}`);
    const guildData = await guildRes.json();

    res.status(200).json({
      success: true,
      player: playerData.player,
      guild: guildData.guild || null
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch Hypixel API" });
  }
}
