const fs = require("fs");
const readline = require("readline");
const path = require("path");

const envPath = path.join(process.cwd(), ".env");

const supabaseInit = async () => {
  if (fs.existsSync(envPath)) {
    console.log("✅ .env file found. Starting development server...");
    process.exit(0);
  }

  console.log("⚠️  .env file not found!");
  console.log("🚀 Initializing Supabase configuration...");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = (query) =>
    new Promise((resolve) => rl.question(query, resolve));

  try {
    const url = await askQuestion("Enter NEXT_PUBLIC_SUPABASE_URL: ");
    const key = await askQuestion("Enter NEXT_PUBLIC_SUPABASE_ANON_KEY: ");

    const envContent = `NEXT_PUBLIC_SUPABASE_URL=${url}\nNEXT_PUBLIC_SUPABASE_ANON_KEY=${key}\n`;

    fs.writeFileSync(envPath, envContent);
    console.log("✅ .env file created successfully!");

    rl.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating .env file:", error);
    process.exit(1);
  }
};

supabaseInit();
