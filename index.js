const express = require("express");
const router = require("./cliff");
const path = require("path");
const app = express();

app.use(router);
app.get("/", async function (req, res) {
  res.sendFile(path.join(__dirname, "/cliff/cliff.html"));
});

app.get("/blackbox", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/blackbox"));
});

app.get("/glm/gpt9/x1", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/gpt9"));
});

app.get("/gpt8/gptfun", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/gpt8"));
});

app.get("/ddos/site/spam", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/spam/ddos"));
});

app.get("/ddos", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/spam/attact"));
});

app.get("/ddos", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/spam/attact"));
});

app.get("/spotify/search", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/spotify"));
});

app.get("/send", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/sms/sms"));
});

app.get("/chat", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/gpt7"));
});

app.get("/downloadFacebook", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/fbdownloader"));
});

app.get("/api/tiktok", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/tiktokDL"));
});

app.get("/yts", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/ytdl"));
});

app.get("/ytv", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/ytv"));
});

app.get("/yta", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/yta"));
});

app.get("/video", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/video"));
});

app.get("/capcut", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/capcut"));
});

app.get("/syugg", async function (req, res) {
  res.sendFile(path.join(__dirname, "/cliff/ugh.html"));
});

app.get("/haha", (req, res) => {
  res.sendFile(__dirname + "/cliff/tiktok.html");
});

app.get("/appstateGetter", async function (req, res) {
  res.sendFile(path.join(__dirname, "/cliff/appstate.html"));
});

app.get("/gpt5", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/gpt4"));
});

app.get("/insta", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/instagram"));
});

app.get("/conversation", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/gpt6"));
});

app.get("/instagram", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/instagram"));
});


app.get("/architecture", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/gpt5"));
});

app.get("/gemini2", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/gemini2"));
});

app.get("/fbdl", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/fbdownload"));
});

app.get("/anydownload", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/fbdownload"));
});

app.get("/boostReaction", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/facebook/fbreact"));
});

app.get("/nglspam", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/spam/nglspam"));
});

app.get("/boostReaction", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/facebook/fbreact"));
});

app.get("/api/pinayflex", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/hentai/pinayflix"));
});

app.get("/gpt4/image", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/gpt4"));
});

app.get("/cliff/gpt3-5-turbo", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/gpt3"));
});

app.get("/submit", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/spam/nglspammer"));
});


app.get("/eaaay/api", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/appstate/eaayyy"));
});

app.get("/acces-token", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/appstate/accestoken"));
});

app.get("/ngl", async function (req, res) {
  res.sendFile(path.join(__dirname, "/cliff/nglspammer.html"));
});

app.get("/gpt4", async function (req, res) {
  res.sendFile(path.join(__dirname, "/cliff/bayot.html"));
});

app.get("/shoti", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/video/shoti"));
});

app.get("/chatbot", async function (req, res) {
  res.sendFile(path.join(__dirname, "/cliff/Chatbot.html"));
});

app.post("/codm", async function (req, res) {
  res.sendFile(path.join(__dirname, "public/video/codm"));
});

app.post("/api/login", async function (req, res) {
  res.sendFile(path.join(__dirname, "public/appstate/login"));
});

app.post("/guard", async function (req, res) {
  res.sendFile(path.join(__dirname, "public/facebook/guard"));
});

app.get("/ugh", async function (req, res) {
  res.sendFile(path.join(__dirname, "/cliff/guard.html"));
});

app.get("/coke", async function (req, res) {
  res.sendFile(path.join(__dirname, "/cliff/cookiegetter.html"));
});

app.get("/gemini", async function (req, res) {
  res.sendFile(path.join(__dirname, "public/chatgpt/gemini"));
});

app.post("/shield", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/facebook/shield"));
});

app.post("/fbshare", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/facebook/fbshare"));
});

app.get("/appstate2", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/appstate/appstate2"));
});

app.get("/fbdownload", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/facebook/fbdownload"));
});

app.get("/emojimix", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/emojimix/emojimix"));
});

app.get("/react", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/autoreact/react"));
});

app.get("/imgur2", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/imgur/imgur2"));
});

app.get("/reaction", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/autoreact/reaction"));
});

app.get("/imagesearch", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/imagesearch"));
});

app.get("/hentai", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/hentai/hentai"));
});

app.get("/tiktrend", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/tiktok/tiktrend"));
});

app.get("/wattpad", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/wattpad/wattpad"));
});

app.get("/meta", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/llma/llama"));
});

app.get("/message", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/message/message-button"));
});

app.get("/getappstate", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/appstate/appstate"));
});

app.get("/home", async function (req, res) {
  res.sendFile(path.join(__dirname, "/cliff/docs.html"));
});

app.get("/sim", async function (req, res) {
res.sendFile(path.join(__dirname, "public/sim/sim"));
});

app.get("/spotifydl", async function (req, res) {
res.sendFile(path.join(__dirname, "public/spotify/spotify"));
});

app.get("/tempmail/gen", async function (req, res) {
res.sendFile(path.join(__dirname, "public/tempmail/gen"));
});

app.get("/tempmail/message", async function (req, res) {
res.sendFile(path.join(__dirname, "public/tempmail/message"));
});


app.get("/removebg", async function (req, res) {
  res.sendFile(path.join(__dirname, "public/removebg/removebg"));
});

app.get("/tikstalk", async function (req, res) {
res.sendFile(path.join(__dirname, "public/tiktok/tikstalk"));
});

app.get("/tikdl", async function (req, res) {
res.sendFile(path.join(__dirname, "/public/tiktok/tikdl"));
});

app.get("/tiksearch", async function (req, res) {
res.sendFile(path.join(__dirname, "public/tiktok/tiksearch"));
});

app.get("/shoti.html", async function (req, res) {
res.sendFile(path.join(__dirname, "cliff/shoti.html"));
});

app.get("/capcutdl", async function (req, res) {
res.sendFile(path.join(__dirname, "public/capcut/capcutdl"));
});

app.get("/hercai", async function (req, res) {
res.sendFile(path.join(__dirname, "public/chatgpt/hercai"));
});

app.get("/chesca", async function (req, res) {
  res.sendFile(path.join(__dirname, "public/chatgpt/cheska"));
});

app.get("/izumi", async function (req , res) {
res.sendFile(path.join(__dirname, "public/chatgpt/izumi"));
});

app.get("/jea", async function (req , res) {
res.sendFile(path.join(__dirname, "public/chatgpt/jea"));
});

app.get("/imgur", async function (req, res) {
res.sendFile(path.join(__dirname, "public/imgur/imgur"));
});

app.post("/stalk", async function (req, res) {
res.sendFile(path.join(__dirname, "public/facebook/stalk"));
});

app.get("/color", async function (req, res) {
res.sendFile(path.join(__dirname, "public/chatgpt/dalle"));
});

app.get("/pinterest/html", async function (req, res) {
res.sendFile(path.join(__dirname, "cliff/pinterest/pinterest.html"));
});

app.get("/translate", async function (req, res) {
res.sendFile(path.join(__dirname, "public/translate/trans"));
});

app.get("/pinterest", async function (req, res) {
res.sendFile(path.join(__dirname, "public/pinterest/pinterest"));
});

app.get("*", async function (req, res) {
  res.sendFile(path.join(__dirname, "cliff/404.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});