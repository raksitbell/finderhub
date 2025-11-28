import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
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
    }
  );
}

export async function GET(request, { params }) {
  const supabase = await createSupabaseServerClient();
  try {
    const { id } = await params;
    const { data: item, error } = await supabase
      .from("items")
      .select("*, categories(label)")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const supabase = await createSupabaseServerClient();
  try {
    const { id } = await params;
    const body = await request.json();

    // Extract claim data if present
    const {
      claimer_name,
      claimer_phone,
      claimer_social,
      proof_image_url,
      status,
      ...itemUpdates
    } = body;

    // 1. Check for image replacement and delete old image if necessary
    if (itemUpdates.image) {
      const { data: currentItem, error: fetchError } = await supabase
        .from("items")
        .select("image")
        .eq("id", id)
        .single();

      if (!fetchError && currentItem?.image) {
        const oldImageUrl = currentItem.image;
        const newImageUrl = itemUpdates.image;

        // Only delete if the image URL has actually changed
        if (oldImageUrl !== newImageUrl) {
          const parts = oldImageUrl.split("item-images/");
          if (parts.length === 2) {
            const filePath = parts[1];
            const { error: storageError } = await supabase.storage
              .from("item-images")
              .remove([filePath]);

            if (storageError) {
              console.error(
                "Error deleting old image from storage:",
                storageError
              );
            }
          }
        }
      }
    }

    // 2. Update item status and other fields
    const { data: updatedItem, error: itemError } = await supabase
      .from("items")
      .update({ status, ...itemUpdates })
      .eq("id", id)
      .select()
      .single();

    if (itemError) {
      return NextResponse.json({ error: itemError.message }, { status: 500 });
    }

    // 2. If item is being returned (status === false) and claim data is provided, insert into claims table
    if (status === false && (claimer_name || claimer_phone)) {
      const { error: claimError } = await supabase.from("claims").insert({
        item_id: id,
        claimer_name,
        claimer_phone,
        claimer_social,
        proof_image_url,
      });

      if (claimError) {
        console.error("Error inserting claim record:", claimError);
        // We don't fail the request here, but we log the error.
        // Ideally we might want to rollback the item update, but for simplicity we proceed.
      }
    }

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error("PUT API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const supabase = await createSupabaseServerClient();
  try {
    const { id } = await params;

    // 1. Fetch the item to get the image URL
    const { data: item, error: fetchError } = await supabase
      .from("items")
      .select("image")
      .eq("id", id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 404 });
    }

    // 2. Delete the image from storage if it exists
    if (item?.image) {
      const imageUrl = item.image;
      const parts = imageUrl.split("item-images/");
      if (parts.length === 2) {
        const filePath = parts[1];
        const { error: storageError } = await supabase.storage
          .from("item-images")
          .remove([filePath]);

        if (storageError) {
          console.error("Error deleting image from storage:", storageError);
        }
      }
    }

    // 3. Delete the item from the database
    const { error } = await supabase.from("items").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
