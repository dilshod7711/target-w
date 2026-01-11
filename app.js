// Phone formatting
const phoneInput = document.getElementById("phoneInput");
const submitBtn = document.getElementById("submitBtn");
const statusMessage = document.getElementById("statusMessage");

phoneInput.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  let formatted = "";

  if (value.length <= 2) {
    formatted = value;
  } else if (value.length <= 5) {
    formatted = value.slice(0, 2) + " " + value.slice(2);
  } else if (value.length <= 8) {
    formatted =
      value.slice(0, 2) + " " + value.slice(2, 5) + " " + value.slice(5);
  } else {
    formatted =
      value.slice(0, 2) +
      " " +
      value.slice(2, 5) +
      " " +
      value.slice(5, 7) +
      " " +
      value.slice(7, 9);
  }

  e.target.value = formatted;
});

// Enter key submit
phoneInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    submitBtn.click();
  }
});

// Submit handler
submitBtn.addEventListener("click", async function () {
  const phone = phoneInput.value.replace(/\s/g, "");

  if (!phone || phone.length < 9) {
    showStatus("error", "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Yuborilmoqda...";

  try {
    // Backend API call
    // const response = await fetch('http://localhost:3001/api/submit-phone', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ phone })
    // });

    // Simulation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    showStatus("success", "✓ Ajoyib! Tez orada siz bilan bog'lanamiz.");
    phoneInput.value = "";

    setTimeout(() => {
      hideStatus();
    }, 5000);
  } catch (error) {
    showStatus("error", "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    setTimeout(() => {
      hideStatus();
    }, 3000);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Bepul konsultatsiya olish";
  }
});

function showStatus(type, message) {
  statusMessage.textContent = message;
  statusMessage.className = "status-message status-" + type;
  statusMessage.style.display = "block";
  statusMessage.style.opacity = "0";

  setTimeout(() => {
    statusMessage.style.transition = "opacity 0.3s";
    statusMessage.style.opacity = "1";
  }, 10);
}

function hideStatus() {
  statusMessage.style.opacity = "0";
  setTimeout(() => {
    statusMessage.style.display = "none";
  }, 300);
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "-100px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in, .fade-in-left").forEach((el) => {
  el.style.animationPlayState = "paused";
  observer.observe(el);
});
