import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request) {
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
            // Ignored
          }
        },
      },
    });

    const body = await request.json();
    const { days = 90 } = body;

    // Calculate the cutoff date
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffTimestamp = cutoffDate.getTime();

    // 1. Fetch items to be deleted to get their image URLs
    const { data: itemsToDelete, error: fetchError } = await supabase
      .from("items")
      .select("id, image")
      .eq("status", true) // Only "Found" items
      .lt("date", cutoffTimestamp); // Older than cutoff date

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!itemsToDelete || itemsToDelete.length === 0) {
      return NextResponse.json(
        { message: "No items found to purge", count: 0 },
        { status: 200 }
      );
    }

    // 2. Delete images from storage
    const imagePaths = itemsToDelete
      .map((item) => {
        if (item.image) {
          const parts = item.image.split("item-images/");
          return parts.length === 2 ? parts[1] : null;
        }
        return null;
      })
      .filter((path) => path !== null);

    if (imagePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("item-images")
        .remove(imagePaths);

      if (storageError) {
        console.error("Error deleting images:", storageError);
        // Continue to delete items even if image deletion fails
      }
    }

    // 3. Delete items from database
    const itemIds = itemsToDelete.map((item) => item.id);
    const { error: deleteError } = await supabase
      .from("items")
      .delete()
      .in("id", itemIds);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Purge successful", count: itemsToDelete.length },
      { status: 200 }
    );
  } catch (error) {
    console.error("Purge API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
