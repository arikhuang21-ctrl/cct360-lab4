// Version 1
const plannerForm = document.getElementById("planner-form");
const minutesInput = document.getElementById("minutes");
const tiredInput = document.getElementById("tired");
const result = document.getElementById("result");
const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");
const completeButton = document.getElementById("complete-button");
const resetButton = document.getElementById("reset-button");
const progress = document.getElementById("progress");

// These variables remember previous actions while the page is open.
let currentState = "ready";
let hasActivePlan = false;
let completedActivities = 0;

function showResult(title, message) {
  result.className = "result " + currentState;
  resultTitle.textContent = title;
  resultText.textContent = message;
}

plannerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let minutes = Number(minutesInput.value);
  let isTired = tiredInput.checked;

  // The first matching condition decides the plan.
  if (isTired === true || minutes < 10) {
    currentState = "break";
    showResult("Take a break", "Use a few minutes to stretch, drink water, or rest your eyes.");
  } else if (minutes < 30) {
    currentState = "review";
    showResult("Quick review", "Review your class notes for " + minutes + " minutes. Write down one key idea.");
  } else {
    currentState = "focus";
    showResult("Focus session", "Spend 25 minutes on one lab task, then take a 5-minute break.");
  }

  hasActivePlan = true;
  completeButton.disabled = false;
});

completeButton.addEventListener("click", function () {
  // Count each generated plan only once.
  if (hasActivePlan === true) {
    completedActivities = completedActivities + 1;
    hasActivePlan = false;
    currentState = "completed";
    showResult("Activity completed", "Nice work! Choose your time and energy again for another plan.");
    progress.textContent = "Activities completed: " + completedActivities;
    completeButton.disabled = true;
  }
});

resetButton.addEventListener("click", function () {
  plannerForm.reset();
  currentState = "ready";
  hasActivePlan = false;
  completedActivities = 0;
  completeButton.disabled = true;
  progress.textContent = "Activities completed: 0";
  showResult("Ready to plan", "Enter your available time, then find your plan.");
});
