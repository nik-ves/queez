import supabase from "./supabase";

export async function getQuestion(quizId, questionId) {
  const { data, error } = await supabase
    .from("question")
    .select(
      `
        answerType,
        numOfCorrectAnswers,
        text,
        image,
        answer ( * )
        `
    )
    .eq("quizId", quizId)
    .eq("id", questionId)
    .limit(1)
    .single();

  return {
    data,
    error,
  };
}

export async function getAllQuestionsId(quizId) {
  const { data, error } = await supabase
    .from("get_all_question_ids")
    .select(`id, quizId`)
    .eq("quizId", quizId);

  return { data, error };
}
