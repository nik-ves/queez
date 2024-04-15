import supabase from "./supabase";

export async function getAllQuizzes() {
  const { data, error } = await supabase.from("quiz").select("id, title");

  return { data, error };
}
