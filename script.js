const questions = [
    {
        question: "سماء : نجوم",
        options: ["بحر : سمك", "شمس : حرارة", "كتاب : ورق", "مدرسة : طلاب"],
        answer: "بحر : سمك"
    },
    {
        question: "المتفوق يطمح إلى...",
        options: ["الراحة", "التميز", "الخمول", "التراجع"],
        answer: "التميز"
    }
];

let currentIdx = 0;
let score = 0;
let timer;
let timeLeft = 30;

function startQuiz() {
    const name = document.getElementById('student-name').value;
    if(!name) return alert("الرجاء إدخال الاسم");
    document.getElementById('setup-area').classList.add('hidden');
    document.getElementById('quiz-area').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById('timer').innerText = `الوقت المتبقي: ${timeLeft}`;
    
    const q = questions[currentIdx];
    document.getElementById('question-text').innerText = q.question;
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt);
        container.appendChild(btn);
    });

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `الوقت المتبقي: ${timeLeft}`;
        if(timeLeft <= 0) checkAnswer(null);
    }, 1000);
}

function checkAnswer(choice) {
    clearInterval(timer);
    if(choice === questions[currentIdx].answer) score++;
    currentIdx++;
    if(currentIdx < questions.length) showQuestion();
    else showResult();
}

function showResult() {
    document.getElementById('quiz-area').classList.add('hidden');
    document.getElementById('result-area').classList.remove('hidden');
    document.getElementById('score-display').innerText = `حصلت على ${score} من ${questions.length}`;
}
