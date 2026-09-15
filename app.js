const mentalHealthData = [
  {
    keys: ["sad", "unmotivated", "empty", "hopeless", "low mood", "down", "cry", "depressed"],
    title: "Low mood and loss of motivation",
    intro: "Feeling sad, drained, or less interested in things can happen during stressful or difficult periods. When these feelings are persistent, intense, or start interfering with daily life, they can be worth discussing with a professional.",
    tags: ["low mood", "motivation", "withdrawal"],
    resources: [
      ["Depression — National Institute of Mental Health (NIMH)", "Signs, symptoms, diagnosis, and treatment information", "https://www.nimh.nih.gov/health/publications/depression"]
    ]
  },
  {
    keys: ["anxious", "anxiety", "worry", "overthinking", "nervous", "panic", "fear", "on edge", "stressed"],
    title: "Stress, worry, or anxiety",
    intro: "Stress and anxiety can show up as persistent worry, tension, feeling on edge, or difficulty switching your thoughts off. They can also affect sleep, concentration, and everyday activities.",
    tags: ["worry", "tension", "overthinking"],
    resources: [
      ["I'm So Stressed Out! — NIMH", "A guide to understanding stress and anxiety", "https://www.nimh.nih.gov/health/publications/so-stressed-out-fact-sheet"],
      ["Any Anxiety Disorder — NIMH", "Learn about anxiety disorders and how they can affect daily life", "https://www.nimh.nih.gov/health/statistics/any-anxiety-disorder"]
    ]
  },
  {
    keys: ["social", "people", "talking", "conversation", "avoid people", "avoid socializing", "shy", "judged", "embarrassed", "self-conscious"],
    title: "Social discomfort or fear of judgment",
    intro: "Not wanting to socialize can have many explanations, including being tired, overwhelmed, naturally reserved, or feeling worried about being judged. When fear or avoidance becomes persistent and starts limiting daily life, it may be useful to explore further.",
    tags: ["social situations", "fear of judgment", "avoidance"],
    resources: [
      ["Social Anxiety Disorder — NIMH", "Information about persistent fear in social or performance situations", "https://www.nimh.nih.gov/health/statistics/social-anxiety-disorder"],
      ["Social Anxiety Disorder publications — NIMH", "Signs, symptoms, treatment, and finding help", "https://www.nimh.nih.gov/health/publications/social-anxiety-disorder-listing"]
    ]
  },
  {
    keys: ["insecure", "insecurity", "self-esteem", "self worth", "self worth", "compare", "comparison", "ugly", "not good enough", "unattractive"],
    title: "Self-esteem and self-worth concerns",
    intro: "Comparing yourself with others or feeling “not good enough” can affect confidence and mood. These feelings can be influenced by stress, relationships, social media, perfectionism, or difficult experiences.",
    tags: ["self-esteem", "comparison", "self-worth"],
    resources: [
      ["Depression — NIMH", "Includes information on worthlessness, guilt, and changes in mood", "https://www.nimh.nih.gov/health/publications/depression"],
      ["Mental Health Information — NIMH", "Explore trusted information about mental health conditions and treatment", "https://www.nimh.nih.gov/health"]
    ]
  },
  {
    keys: ["sleep", "insomnia", "can't sleep", "cant sleep", "sleeping", "awake at night"],
    title: "Sleep difficulty",
    intro: "Sleep can be affected by stress, anxiety, routines, environment, and many other factors. Short-term sleep disruption is common; persistent problems that affect daytime functioning deserve attention.",
    tags: ["sleep", "routine", "stress"],
    resources: [
      ["Depression — NIMH", "Sleep changes can be one part of a broader pattern of symptoms", "https://www.nimh.nih.gov/health/publications/depression"],
      ["Mental Health Information — NIMH", "Explore related mental health topics", "https://www.nimh.nih.gov/health"]
    ]
  },
  {
    keys: ["burnout", "overwhelmed", "too much", "exhausted", "exhaustion", "stress at school", "school stress", "work stress"],
    title: "Feeling overwhelmed or worn down",
    intro: "When demands start to feel bigger than your available energy, you may notice exhaustion, irritability, difficulty concentrating, or wanting to withdraw. Taking a small pause can help in the moment, while persistent impairment may call for more support.",
    tags: ["overwhelm", "exhaustion", "stress"],
    resources: [
      ["I'm So Stressed Out! — NIMH", "Understand stress, anxiety, and when to seek help", "https://www.nimh.nih.gov/health/publications/so-stressed-out-fact-sheet"]
    ]
  },
  {
    keys: ["ocd", "obsessive", "compulsion", "intrusive thoughts"],
    title: "Intrusive thoughts or repetitive urges",
    intro: "Unwanted intrusive thoughts can be upsetting, and some people respond to them with repetitive behaviors or mental rituals. Having an unwanted thought does not mean you want it or that you will act on it.",
    tags: ["intrusive thoughts", "repetitions", "distress"],
    resources: [
      ["Mental Health Statistics — NIMH", "Explore information about OCD and related conditions", "https://www.nimh.nih.gov/health/statistics"]
    ]
  },
  {
    keys: ["panic attack", "panic", "heart racing", "shortness of breath", "dizzy", "chest pain"],
    title: "Panic-like symptoms",
    intro: "Sudden episodes of intense fear can come with physical sensations such as a racing heart, shortness of breath, dizziness, or chest discomfort. Similar symptoms can also have medical causes, so severe or new physical symptoms should be evaluated appropriately.",
    tags: ["intense fear", "physical symptoms", "panic"],
    resources: [
      ["Panic Disorder — NIMH", "Information about repeated panic episodes and symptoms", "https://www.nimh.nih.gov/health/statistics/panic-disorder"]
    ]
  }
];

const fallback = {
  title: "Something difficult may be weighing on you",
  intro: "A single feeling or behavior can have many possible explanations. What you described does not automatically mean you have a mental health condition, but it may be worth paying attention to how often it happens, how intense it feels, and whether it affects sleep, school, work, relationships, or daily life.",
  tags: ["self-reflection", "stress", "well-being"],
  resources: [
    ["Mental Health Information — NIMH", "Trusted information about mental health topics", "https://www.nimh.nih.gov/health"]
  ]
};

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s']/g, " ").replace(/\s+/g, " ").trim();
}

function findResult(query) {
  const text = normalize(query);
  let best = null;
  let bestScore = 0;
  for (const item of mentalHealthData) {
    let score = 0;
    for (const key of item.keys) {
      const k = normalize(key);
      if (text.includes(k)) score += k.includes(" ") ? 3 : 1;
    }
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }
  return best || fallback;
}

function renderResults(query) {
  const result = findResult(query);
  const resources = result.resources.map(r => `<a class="resource" href="${r[2]}" target="_blank" rel="noopener noreferrer"><strong>${r[0]}</strong><span>${r[1]} →</span></a>`).join("");
  const tags = result.tags.map(tag => `<span class="signal">${tag}</span>`).join("");
  const content = `
    <div class="result-grid">
      <article class="panel">
        <h3>${result.title}</h3>
        <p>${result.intro}</p>
        <div class="signal-list">${tags}</div>
        <div class="notice" style="margin-top:20px"><strong>Remember:</strong> these patterns are clues for reflection, not a diagnosis. If your feelings are persistent, worsening, or interfering with everyday life, consider talking with a doctor or mental health professional.</div>
      </article>
      <aside class="panel">
        <h3>Trusted reading</h3>
        <p>These resources can help you learn more from a reputable source.</p>
        <div class="resource-list">${resources}</div>
        <h3 style="margin-top:24px">Support at the University of Utah</h3>
        <p>If you are a U student, these official services can help you decide what kind of support fits your situation.</p>
        <div class="resource-list">
          <a class="resource" href="https://counselingcenter.utah.edu/" target="_blank" rel="noopener noreferrer"><strong>University Counseling Center</strong><span>Counseling, workshops, crisis services, and referrals →</span></a>
          <a class="resource" href="https://wellness.utah.edu/" target="_blank" rel="noopener noreferrer"><strong>Center for Campus Wellness</strong><span>Wellness coaching, peer navigation, and student resources →</span></a>
        </div>
      </aside>
    </div>
  `;
  document.getElementById("resultsContent").innerHTML = content;
  document.getElementById("resultsSection").classList.remove("hidden");
  document.getElementById("resultsSection").scrollIntoView({ behavior: "smooth", block: "start" });
}

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    searchInput.focus();
    return;
  }
  renderResults(query);
});

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    searchInput.value = chip.dataset.query;
    renderResults(chip.dataset.query);
  });
});

const resets = [
  { title: "Listen to one comforting song", text: "Choose one song that feels familiar or calming. Put your phone down for a few minutes and let yourself just listen.", tip: "If music feels overwhelming today, silence is also a valid choice." },
  { title: "Watch something light", text: "Pick one short, comforting video or a familiar episode. Give yourself permission to enjoy something without turning it into a productivity task.", tip: "A small distraction can be useful, but it is not a substitute for professional care when you need more support." },
  { title: "Read a few pages", text: "Open a book, comic, or short story and read just two or three pages. You do not need to finish anything.", tip: "Gentle activities can help you pause; they do not diagnose or treat a mental health condition." },
  { title: "Reach out to someone safe", text: "Send a simple message: “Hey, I’m having a rough day. Can you talk for a few minutes?” You do not have to explain everything.", tip: "A trusted person can offer connection, while a clinician can offer professional support when needed." },
  { title: "Step outside for five minutes", text: "Get some fresh air, notice three things you can see, and take a slow walk without needing to go anywhere specific.", tip: "Movement and fresh air may feel soothing in the moment, but they are not a treatment for a mental health disorder." },
  { title: "Make a tiny comfort ritual", text: "Make tea, wash your face, change into comfortable clothes, or tidy one small corner. Pick one tiny action that tells your brain: I’m here with you.", tip: "Small routines can support well-being, but persistent symptoms deserve proper assessment." },
  { title: "Try a 60-second breathing reset", text: "Relax your shoulders. Breathe in gently, then make the exhale a little longer than the inhale. Repeat for about a minute.", tip: "Stop if breathing exercises make you feel worse, and seek professional guidance when symptoms are severe or persistent." },
  { title: "Write the “right now” version", text: "Finish this sentence three times: “Right now, I need…” Keep it practical and tiny. You are only solving the next few minutes.", tip: "Journaling can support self-reflection, but it is not a replacement for mental health care." },
  { title: "Change your sensory environment", text: "Dim the lights, open a window, wrap yourself in a blanket, or play a steady background sound. Choose one gentle change.", tip: "Comfort strategies can reduce distress temporarily; they do not replace evaluation or treatment when needed." }
];
const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
const diceButton = document.getElementById("diceButton");
const diceFace = document.getElementById("diceFace");
const resetResult = document.getElementById("resetResult");
let lastReset = -1;

diceButton.addEventListener("click", () => {
  let index;
  do { index = Math.floor(Math.random() * resets.length); } while (index === lastReset && resets.length > 1);
  lastReset = index;
  diceFace.textContent = diceFaces[Math.floor(Math.random() * diceFaces.length)];
  diceButton.animate([{transform:"rotate(-7deg)"},{transform:"rotate(7deg)"},{transform:"rotate(0deg)"}], {duration:320});
  const reset = resets[index];
  resetResult.innerHTML = `<h3>${reset.title}</h3><p>${reset.text}</p><div class="notice"><strong>A gentle reminder:</strong> ${reset.tip}</div>`;
  resetResult.classList.remove("hidden");
  resetResult.scrollIntoView({behavior:"smooth", block:"center"});
});

let selectedRating = 0;
document.querySelectorAll(".star").forEach(star => {
  star.addEventListener("click", () => {
    selectedRating = Number(star.dataset.rating);
    document.querySelectorAll(".star").forEach(s => s.classList.toggle("active", Number(s.dataset.rating) <= selectedRating));
  });
});

// Google Forms configuration for GitHub Pages.
// 1) Create a Google Form with these questions:
//    - Rating (required)
//    - Feedback (optional)
// 2) Use the field entry IDs shown in the pre-filled link.
// 3) Paste the form URL and entry IDs below.
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf6YJw0TPFIZZuHqMrQA21CybhXkIIrtMh2Ug2sdUuxxsZ3zA/formResponse";
const GOOGLE_FORM_RATING_ENTRY = "1907288098";
const GOOGLE_FORM_FEEDBACK_ENTRY = "2145460381";

const feedbackForm = document.getElementById("feedbackForm");
feedbackForm.addEventListener("submit", async e => {
  e.preventDefault();
  if (!selectedRating) {
    document.querySelector(".star").focus();
    return;
  }

  const box = document.getElementById("feedbackThankyou");
  const feedback = document.getElementById("feedbackText").value.trim();
  const submitButton = feedbackForm.querySelector("button[type=submit]");

  const payload = new URLSearchParams();
  payload.set(`entry.${GOOGLE_FORM_RATING_ENTRY}`, String(selectedRating));
  payload.set(`entry.${GOOGLE_FORM_FEEDBACK_ENTRY}`, feedback);
  payload.set("submit", "Submit");

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString()
    });

    const messages = [
      "You made it through this moment. That counts.",
      "You do not have to solve everything today.",
      "One small step is still a step forward.",
      "Be gentle with yourself while you figure things out.",
      "Even difficult seasons can change. Keep going, one day at a time.",
      "You are allowed to rest before you feel finished."
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];
    box.innerHTML = `Thank you for your ${selectedRating}-star rating. ♡<br><span style="font-weight:400">${message}</span>`;
    feedbackForm.classList.add("hidden");
    box.classList.remove("hidden");
  } catch (error) {
    submitButton.disabled = false;
    submitButton.textContent = "Send feedback";
    box.innerHTML = `Something went wrong while sending your feedback. Please try again.`;
    box.classList.remove("hidden");
  }
});
