const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const readline = require("readline");
const path = require("path");
const { spawn } = require("child_process");

const envPath = path.join(process.cwd(), ".env");

const parseEnv = (content) => {
  const env = {};
  content.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      env[match[1].trim()] = match[2].trim();
    }
  });
  return env;
};

const startDevServer = () => {
  console.log("\n⏳ Starting development server in 3 seconds...");
  let seconds = 3;
  const timer = setInterval(() => {
    if (seconds > 0) {
      process.stdout.write(`... ${seconds} `);
    }
    seconds--;
    if (seconds < 0) {
      clearInterval(timer);
      console.log("\n\n🚀 Starting Next.js...");
      console.log("----------------------------------------");

      // Use npx to ensure next is found
      const nextDev = spawn("npx", ["next", "dev"], {
        stdio: "inherit",
        shell: true,
      });

      nextDev.on("error", (err) => {
        console.error("❌ Failed to start Next.js:", err);
        process.exit(1);
      });

      nextDev.on("close", (code) => {
        process.exit(code);
      });
    }
  }, 1000);
};

const checkConnectionAndStart = async (url, key) => {
  console.log("🔄 Testing Supabase connection...");
  try {
    if (!url || !key || url === "undefined" || key === "undefined") {
      throw new Error("Missing URL or Key");
    }
    const supabase = createClient(url, key);
    // Simple check: get session (doesn't require tables)
    const { error } = await supabase.auth.getSession();
    if (error) throw error;
    console.log("✅ Connection successful!");
  } catch (error) {
    console.warn("⚠️  Connection warning:", error.message);
    console.warn(
      "   (The server will still start, but Supabase features might not work)"
    );
  }

  startDevServer();
};

const supabaseInit = async () => {
  let url, key;

  if (fs.existsSync(envPath)) {
    console.log("✅ .env file found.");
    const envContent = fs.readFileSync(envPath, "utf8");
    const env = parseEnv(envContent);
    url = env.NEXT_PUBLIC_SUPABASE_URL;
    key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  } else {
    console.log("⚠️  .env file not found!");
    console.log("🚀 Initializing Supabase configuration...");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const askQuestion = (query) =>
      new Promise((resolve) => rl.question(query, resolve));

    try {
      url = await askQuestion("Enter Supabase URL: ");
      key = await askQuestion("Enter Supabase Anon Key: ");

      // Basic validation
      if (!url || !url.trim()) {
        console.error("❌ Supabase URL cannot be empty.");
        rl.close();
        process.exit(1);
      }
      try {
        const parsedUrl = new URL(url.trim());
        if (!parsedUrl.protocol.startsWith("https")) {
          throw new Error();
        }
      } catch {
        console.error("❌ Supabase URL must be a valid https URL.");
        rl.close();
        process.exit(1);
      }
      if (!key || !key.trim()) {
        console.error("❌ Supabase Anon Key cannot be empty.");
        rl.close();
        process.exit(1);
      }

      url = url.trim();
      key = key.trim();

      const envContent = `NEXT_PUBLIC_SUPABASE_URL=${url}\nNEXT_PUBLIC_SUPABASE_ANON_KEY=${key}\n`;

      fs.writeFileSync(envPath, envContent);
      console.log("✅ .env file created successfully!");
      rl.close();
    } catch (error) {
      console.error("❌ Error creating .env file:", error);
      rl.close();
      process.exit(1);
    }
  }

  await checkConnectionAndStart(url, key);
};

supabaseInit();
