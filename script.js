
const nameInput = document.getElementById("name");
const birthdayInput = document.getElementById("birthday");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const birthdayForm = document.getElementById("birthdayForm");
const countdownSection = document.getElementById("countdownSection");

let countdownInterval;

startBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const birthdayValue = birthdayInput.value;

  if (!name || !birthdayValue) {
    alert("Please enter your name and birthday!");
    return;
  }

  const [year, month, day] = birthdayValue.split("-").map(Number);

  const today = new Date();
  let targetDate = new Date(
    today.getFullYear(),
    month - 1,
    day
  );

  // If this year's birthday has passed, use next year.
  if (targetDate < new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )) {
    targetDate = new Date(
      today.getFullYear() + 1,
      month - 1,
      day
    );
  }

  document.getElementById("greeting").textContent =
    `Hey ${name}, Your Birthday is Coming!`;

  birthdayForm.hidden = true;
  countdownSection.hidden = false;

  clearInterval(countdownInterval);
  updateCountdown(targetDate, name);

  countdownInterval = setInterval(() => {
    updateCountdown(targetDate, name);
  }, 1000);
});

function updateCountdown(targetDate, name) {
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    clearInterval(countdownInterval);

    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    document.getElementById("greeting").textContent =
      `Happy Birthday, ${name}! 🎂`;

    document.getElementById("message").textContent =
      "Wishing you a day full of happiness and surprises! 🎉";

    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );
  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );
  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

  document.getElementById("message").textContent =
    `${days} days left until your special day! 🎈`;
}

resetBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);

  countdownSection.hidden = true;
  birthdayForm.hidden = false;

  nameInput.value = "";
  birthdayInput.value = "";
});
