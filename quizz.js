// Sample quiz data (full data in separate JSON file)
const quizData = {
    "Cognitive Psychology": [
        {
            question: "What is the primary focus of cognitive psychology?",
            options: ["Behavior analysis", "Mental processes", "Emotional responses", "Social interactions"],
            correct: "Mental processes",
            explanation_correct: "Cognitive psychology focuses on mental processes such as perception, memory, and problem-solving, which govern how people think and process information.",
            explanation_wrong: "The correct answer is Mental processes. Cognitive psychology studies internal mental activities, not primarily behavior, emotions, or social interactions."
        },
        {
            question: "Which memory model proposed by Atkinson and Shiffrin includes sensory, short-term, and long-term memory?",
            options: ["Working Memory Model", "Multi-Store Model", "Levels of Processing", "Baddeley's Model"],
            correct: "Multi-Store Model",
            explanation_correct: "The Multi-Store Model by Atkinson and Shiffrin describes memory as a sequence of sensory, short-term, and long-term stores, explaining how information is processed and stored.",
            explanation_wrong: "The correct answer is Multi-Store Model. This model, unlike others listed, specifically outlines the flow of information through sensory, short-term, and long-term memory."
        }
    ],
    "Biological Psychology": [
        {
            question: "What is the primary focus of biological psychology?",
            options: ["Social behavior", "Cognitive processes", "Biological bases of behavior", "Emotional responses"],
            correct: "Biological bases of behavior",
            explanation_correct: "Biological psychology examines how biological processes, such as brain functions and genetics, influence behavior and mental processes.",
            explanation_wrong: "The correct answer is Biological bases of behavior. This field focuses on the physiological underpinnings of behavior, not social, cognitive, or emotional aspects alone."
        },
        {
            question: "Which part of the neuron transmits signals to other cells?",
            options: ["Dendrite", "Axon", "Soma", "Myelin sheath"],
            correct: "Axon",
            explanation_correct: "The axon is the part of the neuron that carries electrical impulses away from the cell body to other neurons or muscles, facilitating signal transmission.",
            explanation_wrong: "The correct answer is Axon. Dendrites receive signals, the soma processes them, and the myelin sheath insulates the axon, but only the axon transmits signals outward."
        }
    ],
    "Abnormal Psychology": [
        {
            question: "What is the primary focus of abnormal psychology?",
            options: ["Cognitive processes", "Maladaptive behaviors", "Social interactions", "Biological functions"],
            correct: "Maladaptive behaviors",
            explanation_correct: "Abnormal psychology studies maladaptive behaviors and mental disorders that deviate from societal norms and impair functioning.",
            explanation_wrong: "The correct answer is Maladaptive behaviors. Abnormal psychology focuses on dysfunctional behaviors, not primarily cognitive, social, or biological processes."
        },
        {
            question: "Which manual is primarily used to diagnose mental disorders?",
            options: ["ICD-10", "DSM-5", "APA Manual", "WHO Guidelines"],
            correct: "DSM-5",
            explanation_correct: "The DSM-5 (Diagnostic and Statistical Manual of Mental Disorders, 5th Edition) is the primary tool used by clinicians in the U.S. to diagnose mental disorders based on standardized criteria.",
            explanation_wrong: "The correct answer is DSM-5. While ICD-10 is used internationally, DSM-5 is the standard in many clinical settings, particularly in the U.S., unlike the APA Manual or WHO Guidelines."
        }
    ],
    "Developmental Psychology": [
        {
            question: "What is the primary focus of developmental psychology?",
            options: ["Cognitive disorders", "Changes across the lifespan", "Social interactions", "Biological functions"],
            correct: "Changes across the lifespan",
            explanation_correct: "Developmental psychology studies how people grow and change physically, cognitively, and socially from infancy through old age.",
            explanation_wrong: "The correct answer is Changes across the lifespan. This field examines development over time, not just cognitive disorders, social interactions, or biological functions."
        },
        {
            question: "Who proposed the theory of cognitive development with four stages?",
            options: ["Erik Erikson", "Jean Piaget", "Lev Vygotsky", "Sigmund Freud"],
            correct: "Jean Piaget",
            explanation_correct: "Jean Piaget developed the theory of cognitive development, which includes four stages: sensorimotor, preoperational, concrete operational, and formal operational.",
            explanation_wrong: "The correct answer is Jean Piaget. Erikson focused on psychosocial development, Vygotsky on social learning, and Freud on psychosexual stages, not cognitive stages."
        }
    ],
    "Research Methodology": [
        {
            question: "What is the primary goal of research methodology?",
            options: ["Data collection", "Systematic investigation", "Hypothesis testing", "Statistical analysis"],
            correct: "Systematic investigation",
            explanation_correct: "Research methodology aims to provide a systematic approach to investigating questions, ensuring reliable and valid results through structured processes.",
            explanation_wrong: "The correct answer is Systematic investigation. While data collection, hypothesis testing, and statistical analysis are components, the overarching goal is a systematic inquiry."
        },
        {
            question: "Which type of research focuses on describing phenomena?",
            options: ["Experimental", "Descriptive", "Correlational", "Causal-comparative"],
            correct: "Descriptive",
            explanation_correct: "Descriptive research aims to accurately describe characteristics or phenomena without manipulating variables, such as through surveys or observations.",
            explanation_wrong: "The correct answer is Descriptive. Experimental research tests hypotheses, correlational studies examine relationships, and causal-comparative studies explore cause-effect without manipulation."
        }
    ]
};

let currentSubject = "Cognitive Psychology";
let currentQuestionIndex = 0;
let shuffledQuestions = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadSubject() {
    currentSubject = document.getElementById("subject-select").value;
    currentQuestionIndex = 0;
    shuffledQuestions = shuffleArray([...quizData[currentSubject]]);
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
        showModal("Quiz Complete", `You've completed the ${currentSubject} quiz! Select a subject to start again.`);
        document.getElementById("quiz-form").reset();
        return;
    }
    const q = shuffledQuestions[currentQuestionIndex];
    document.getElementById("question-text").innerText = q.question;
    for (let i = 0; i < 4; i++) {
        document.getElementById(`option${i}`).innerText = q.options[i];
    }
    document.getElementById("quiz-form").reset();
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        showModal("Error", "Please select an answer!");
        return;
    }
    const q = shuffledQuestions[currentQuestionIndex];
    const selectedValue = q.options[parseInt(selectedOption.value)];
    if (selectedValue === q.correct) {
        showModal("Correct!", q.explanation_correct);
    } else {
        showModal("Incorrect", `${q.explanation_wrong}`);
    }
    currentQuestionIndex++;
}

function showModal(title, text) {
    document.getElementById("feedback-title").innerText = title;
    document.getElementById("feedback-text").innerText = text;
    document.getElementById("feedback-modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("feedback-modal").classList.add("hidden");
    displayQuestion();
}

// Initialize
loadSubject();
