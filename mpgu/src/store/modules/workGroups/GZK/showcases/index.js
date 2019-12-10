import meetings from './meetings';
import questions from './questions';
import allQuestions from './allQuestions';
import orders from './orders';
import ordersByExecutors from './ordersByExecutors';
import newReports from './newReports';
import plannedQuestions from './plannedQuestions';

export default {
    namespaced: true,
    modules: {
        meetings,
        question: questions,
        allQuestions,
        orders,
        ordersByExecutors,
        newReports,
        plannedQuestions,
    },
};
