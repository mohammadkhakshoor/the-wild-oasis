import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins data cannot be loaded");
  }
  return data;
}

export async function createCabin(CabinObj) {
  const { data, error } = await supabase.from("cabins").insert([CabinObj]).select();

  if (error) {
    console.log(error);
    throw new Error("could not create the cabin.");
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
