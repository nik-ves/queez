import supabase from "./supabase";

export async function getQuestonById(id) {
  const { data, error } = await supabase
    .from("get_random_question")
    .select(
      `
        id, 
        answerType, 
        answer ( * ),
        question_details ( id, header, text, correctAnswers )
        `
    )
    .eq("quiz_id", "1")
    .eq("id", id)
    .limit(1)
    .single();

  return {
    data,
    error,
  };
}

export async function getAllQuestionsId() {
  const { data, error } = await supabase
    .from("get_all_questions_id")
    .select(`*`);

  return data;
}
