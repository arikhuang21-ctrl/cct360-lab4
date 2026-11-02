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

  // Stop invalid input before choosing a plan.
  if (minutesInput.value.trim() === "" || !Number.isInteger(minutes) || minutes < 1 || minutes > 180) {
    hasActivePlan = false;
    completeButton.disabled = true;
    currentState = "ready";
    showResult("Check your time", "Enter a whole number from 1 to 180.");
    return;
  }

  // The first matching condition decides the plan.
  if (isTired === true || minutes < 10) {
    currentState = "break";
    showResult("Take a break", "Take " + Math.min(minutes, 5) + " minute(s) to stretch, drink water, or rest your eyes.");
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
    let finishedPlan = resultTitle.textContent;
    currentState = "completed";
    showResult("Activity completed", "You completed: " + finishedPlan + ". Choose your next plan when you are ready.");
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

// A changed input needs a new plan before it can be completed.
function clearActivePlan() {
  hasActivePlan = false;
  completeButton.disabled = true;
  currentState = "ready";
  showResult("Ready to plan", "Your choices changed. Click Find my plan to update your activity.");
}
minutesInput.addEventListener("input", clearActivePlan);
tiredInput.addEventListener("change", clearActivePlan);
