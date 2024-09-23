// Get DOM elements
const accountBalanceElement = document.getElementById("accountBalance");
const accountBalanceMobileElement = document.getElementById(
  "accountBalanceMobile"
);
const donationSection = document.getElementById("donationSection");
const historySection = document.getElementById("historySection");
const donationBtn = document.getElementById("donationBtn");
const historyBtn = document.getElementById("historyBtn");
const donationModal = document.getElementById("donationModal");

// Set initial balance
let accountBalance = 10000;

// Update account balance
function updateAccountBalance() {
  accountBalanceElement.textContent = accountBalance + " BDT";
  if (accountBalanceMobileElement) {
    accountBalanceMobileElement.textContent = accountBalance + " BDT";
  }
}

// Add donation to history
function addToHistory(donationTitle, amount) {
  const historyItem = document.createElement("div");
  historyItem.className = "bg-white rounded-lg shadow-md p-4 mb-4";
  historyItem.innerHTML = `
    <p class="font-bold">${amount} Taka is donated for ${donationTitle}</p>
    <p class="text-sm text-gray-500">Date: ${new Date().toLocaleString(
      "en-US",
      { timeZone: "Asia/Dhaka" }
    )} (Bangladesh Standard Time)</p>
  `;
  historySection.insertBefore(historyItem, historySection.firstChild);
}

// Update donation amount on card
function updateDonationAmount(card, amount) {
  const amountSpan = card.querySelector(".text-sm.font-semibold");
  const currentAmount = parseInt(amountSpan.textContent);
  amountSpan.textContent = currentAmount + amount + " BDT";
}

// Show donation modal
function showModal() {
  donationModal.showModal();
}

// Event listener for donation button
donationBtn.onclick = function () {
  donationSection.style.display = "block";
  historySection.style.display = "none";

  donationBtn.classList.add("bg-lime-400", "text-black");
  donationBtn.classList.remove("btn-ghost");

  historyBtn.classList.add("btn-ghost");
  historyBtn.classList.remove("bg-lime-400", "text-black");
};

// Event listener for history button
historyBtn.onclick = function () {
  donationSection.style.display = "none";
  historySection.style.display = "block";

  historyBtn.classList.add("bg-lime-400", "text-black");
  historyBtn.classList.remove("btn-ghost");

  donationBtn.classList.add("btn-ghost");
  donationBtn.classList.remove("bg-lime-400", "text-black");
};

// Event listener for donations
donationSection.onclick = function (event) {
  if (event.target.className.includes("btn-primary")) {
    const card = event.target.parentElement.parentElement;
    const donationTitle = card.querySelector(".uppercase").textContent;
    const amountInput = event.target.previousElementSibling;
    const amount = parseInt(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    if (amount > accountBalance) {
      alert("Insufficient balance for this donation.");
      return;
    }

    accountBalance -= amount;
    updateAccountBalance();
    updateDonationAmount(card, amount);
    addToHistory(donationTitle, amount);
    showModal();
    amountInput.value = "";
  }
};

// Event listener to close modal
donationModal.querySelector(".btn").onclick = function () {
  donationModal.close();
};

// Initial balance update
updateAccountBalance();
