const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "server.log");

// Function to write logs without locking the file
const writeLog = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  console.log(logMessage); // Print log to console

  try {
    fs.writeFileSync(logFilePath, logMessage, { flag: "a+" }); // ✅ Open in append mode
  } catch (error) {
    console.error("❌ Failed to write log:", error.message);
  }
};

// Start Next.js server
writeLog("🚀 Starting Next.js production server...");

const serverProcess = exec("npx next start -p 3000", { cwd: __dirname });

// Handle standard output
serverProcess.stdout.on("data", (data) => writeLog(`🟢 SERVER: ${data.trim()}`));

// Handle errors
serverProcess.stderr.on("data", (data) => writeLog(`⚠️ WARNING: ${data.trim()}`));

// Detect server crash or exit
serverProcess.on("exit", (code, signal) => {
  writeLog(`❌ Server crashed! Exit Code: ${code}, Signal: ${signal}`);
});

writeLog("✅ Server started at: http://localhost:3000/");
