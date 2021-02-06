import {QuestionType,QuizType} from './../types/questiontypes';

const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)

export const api = async (totalQuestions: number, level: string): Promise<QuizType[]> => {
    const url: string = 'https://opentdb.com/api.php?amount='+totalQuestions+'&difficulty='+level+'&type=multiple';
    const res = await fetch(url);
    const {results} = await res.json();
    const Quiz: QuizType[] = results.map((Obj: QuestionType) => {
        return {
            question: Obj.question,
            answer: Obj.correct_answer,
            correct_answer: Obj.correct_answer,
            option: shuffleArray(Obj.incorrect_answers.concat(Obj.correct_answer)),
        }
        
    })
    return Quiz;
}