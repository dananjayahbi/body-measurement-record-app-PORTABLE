const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "server.log");

// Function to write logs
const writeLog = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  console.log(logMessage);
  fs.appendFileSync(logFilePath, logMessage);
};

// Start Next.js server
writeLog("🚀 Starting Next.js production server...");

// ✅ Start server with spawn (NOT exec)
const serverProcess = spawn("npx", ["next", "start", "-p", "3000"], {
  cwd: __dirname,
  shell: true,
  detached: false, // ✅ Ensure child dies when parent dies
});

// ✅ Handle standard output & errors
serverProcess.stdout.on("data", (data) => writeLog(`🟢 SERVER: ${data}`));
serverProcess.stderr.on("data", (data) => writeLog(`⚠️ WARNING: ${data}`));

// ✅ Handle process exit
serverProcess.on("exit", (code, signal) => {
  writeLog(`🛑 Server stopped! Exit Code: ${code}, Signal: ${signal}`);
});

writeLog("✅ Server started at: http://localhost:3000/");
