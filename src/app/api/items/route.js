import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

console.log("API Route /api/items loaded");

function logError(error) {
  const logPath = path.join(process.cwd(), "error.log");
  const timestamp = new Date().toISOString();
  const message = `${timestamp} - ${error.message}\n${error.stack}\n\n`;
  try {
    fs.appendFileSync(logPath, message);
  } catch (e) {
    console.error("Failed to write to error log:", e);
  }
}

export async function GET() {
  try {
    console.log("GET /api/items called");
    const cookieStore = await cookies();

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    });

    const { data: items, error } = await supabase
      .from("items")
      .select("*, categories(label)")
      .order("date", { ascending: false });

    if (error) {
      console.error("Supabase Query Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("GET API Error:", error);
    logError(error);
    return NextResponse.json(
      {
        error: error.message || "Internal Server Error",
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const cookieStore = await cookies();

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    });

    const body = await request.json();
    const { data: newItem, error } = await supabase
      .from("items")
      .insert([body])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("POST API Error:", error);
    logError(error);
    return NextResponse.json(
      {
        error: error.message || "Internal Server Error",
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
