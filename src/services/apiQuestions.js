import supabase from "./supabase";

export async function getRandomQuestion() {
  const { data, error } = await supabase
    .from("get_random_question")
    .select(
      `
        id, 
        answerType, 
        answer ( * ),
        question_details ( id, header, text )
        `
    )
    .eq("quiz_id", "1")
    .limit(1)
    .single();

  return {
    data: [data, data?.question_details, data.answer],
    error,
  };
}

export async function getAllQuestionsId() {
  const { data, error } = await supabase
    .from("get_all_questions_id")
    .select(`*`);

  return data;
}
