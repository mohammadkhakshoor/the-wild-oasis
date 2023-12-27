import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins data cannot be loaded");
  }
  return data;
}
// https://zglvcunhukakbjlqdheq.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
export async function createAndEditCabin(CabinObj, editId) {
  const hasImagepath = CabinObj.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${CabinObj.image.name}`.replaceAll("/", "");
  const imagepath = hasImagepath ? CabinObj.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // const { data, error } = await supabase.from("cabins").insert([{ ...CabinObj, image: imagepath }]);

  let query = supabase.from("cabins");
  if (!editId) {
    console.log(CabinObj);
    query = query.insert([{ ...CabinObj, image: imagepath }]);
  }
  if (editId) {
    query = query
      .update({ ...CabinObj, image: imagepath })
      .eq("id", editId)
      .select();
  }

  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("could not create the cabin.");
  }
  const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, CabinObj.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", CabinObj.id);
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  console.log(id);
  if (error) {
    console.error(error);
    throw new Error("cabins data cannot be deleted");
  }
  return data;
}
