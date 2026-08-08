const quizData = [
    { question: "ما اسمك؟", options: ["يجب إدخال اسمك الحقيقي", "اسم لعبة", "لا يهم"] },
    { question: "كم عمرك؟", options: ["أقل من 13", "من 13 إلى 18", "أكثر من 18"] },
    { question: "هل تستطيع الكذب في الرول؟", options: ["نعم", "لا - يجب الالتزام بالقوانين", "أحياناً"] },
    { question: "هل تستطيع سرقة بدون سبب؟", options: ["نعم", "لا - هذا محظور", "فقط إذا كان هناك سبب"] },
    { question: "إذا رأيت شخصاً لم يلتزم بالقوانين، ماذا تفعل؟", options: ["أتجاهله", "أبلغ الإدارة", "أساعده على الهروب"] },
    { question: "إذا رفع عليك شخصان سلاح وقالا لك قف، ماذا تفعل؟", options: ["أهرب", "أستسلم وأطيع الأوامر", "أقاوم"] },
    { question: "هل تستطيع سرقة بنك في اللعبة؟", options: ["نعم دائماً", "فقط بطرق قانونية", "لا يمكن"] },
    { question: "ما username روبلوكس وديسكورد؟", options: ["يجب كتابته بالكامل", "لا يهم", "سأرسله لاحقاً"] }
];

const correctAnswers = [0, 2, 1, 1, 1, 1, 1, 0];
let currentQuestion = 0;
let userAnswers = [];

function initQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('question-card').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const question = quizData[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('question-number').textContent = `${currentQuestion + 1} / ${quizData.length}`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        if (userAnswers[currentQuestion] === index) optionDiv.classList.add('selected');
        optionDiv.innerHTML = `<div class="option-radio"></div><div class="option-text">${option}</div>`;
        optionDiv.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionDiv);
    });

    updateProgress();
    updateButtons();
}

function selectOption(index) {
    userAnswers[currentQuestion] = index;
    document.querySelectorAll('.option').forEach((opt, i) => {
        opt.classList.toggle('selected', i === index);
    });
}

function nextQuestion() {
    if (userAnswers[currentQuestion] === undefined) return alert('اختر إجابة أولاً!');
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function updateProgress() {
    document.getElementById('progress-fill').style.width = ((currentQuestion + 1) / quizData.length * 100) + '%';
}

function updateButtons() {
    document.getElementById('btn-prev').disabled = currentQuestion === 0;
    document.getElementById('btn-next').textContent = currentQuestion === quizData.length - 1 ? 'إنهاء' : 'التالي';
}

function showResults() {
    let score = userAnswers.reduce((s, a, i) => s + (a === correctAnswers[i] ? 1 : 0), 0);
    const percentage = Math.round((score / quizData.length) * 100);
    
    const resultTitle = document.getElementById('result-title');
    const resultText = document.getElementById('result-text');
    
    if (percentage >= 75) {
        resultTitle.textContent = 'مرحبا بك! 🎉';
        resultText.textContent = 'تم تفعيل حسابك بنجاح في Five City!';
        resultTitle.style.color = 'rgb(0, 255, 127)';
    } else if (percentage >= 50) {
        resultTitle.textContent = 'جيد جداً 👍';
        resultText.textContent = 'حاول مرة أخرى!';
        resultTitle.style.color = 'rgb(0, 255, 255)';
    } else {
        resultTitle.textContent = 'حاول مرة أخرى 📚';
        resultText.textContent = 'افهم القوانين بشكل أفضل!';
        resultTitle.style.color = 'rgb(255, 0, 127)';
    }
    
    document.getElementById('score').textContent = `${score} / ${quizData.length}`;
    document.getElementById('question-card').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
}

function restartQuiz() {
    initQuiz();
}

window.addEventListener('DOMContentLoaded', initQuiz);