exports.name = "/react";
exports.index = async function (req, res) {
  try {
    const react = req.query.q.toLowerCase();
    if (!react) {
      res.json({ error: "/react?q=text" });
    } else {
      if (
        react.includes("haha") ||
        react.includes("lol") ||
        react.includes("lmao") ||
        react.includes("abno") ||
        react.includes("kulang") ||
        react.includes("amp") ||
        react.includes("tang") ||
        react.includes("mamaw") ||
        react.includes("xd") ||
        react.includes("palamunin") ||
        react.includes("bobo") ||
        react.includes("self proclaimed") ||
        react.includes("attention seeker") ||
        react.includes("nigga")
      ) {
        res.json({ react: "😆" });
      } else if (
        react.includes("game") ||
        react.includes("cod") ||
        react.includes("valorant") ||
        react.includes("roblox") ||
        react.includes("minecraft") ||
        react.includes("ml")
      ) {
        res.json({ react: "🎮" });
      } else if (
        react.includes("openai") ||
        react.includes("ai") ||
        react.includes("artificial intelligence") ||
        react.includes("machine learning")
      ) {
        res.json({ react: "🤖" });
      } else if (
        react.includes("code") ||
        react.includes("coding") ||
        react.includes("programming") ||
        react.includes("developer") ||
        react.includes("software")
      ) {
        res.json({ react: "💻" });
      } else if (react.includes("morning")) {
        res.json({ react: "☀️" });
      } else if (react.includes("afternoon")) {
        res.json({ react: "🌤️" });
      } else if (react.includes("evening")) {
      } else if (
        react.includes("night") ||
        react.includes("nighty night") ||
        react.includes("sweet dreams")
      ) {
        res.json({ react: "💤" });
      } else if (
        react.includes("love") ||
        react.includes("puke") ||
        react.includes("romantic") ||
        react.includes("finger") ||
        react.includes("sarap") ||
        react.includes("crush")
      ) {
        res.json({ react: "😍" });
      } else {
        res.json({ react: "❓" });
      }
    }
  } catch (error) {
    res.json({ error: "Error fetching autoreact" });
  }
};
