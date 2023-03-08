// Smooth scrolling for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');

for (let anchorLink of anchorLinks) {
  anchorLink.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    const distanceToTarget = targetElement.getBoundingClientRect().top;
    const headerOffset = document.querySelector("header").offsetHeight;

    window.scrollBy({
      top: distanceToTarget - headerOffset,
      behavior: "smooth",
    });
  });
}

// Form submission
const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };

  // Here, you can use the formData object to send the form data to a server using AJAX or fetch
  // For the purpose of this example, we'll just log the formData object to the console
  console.log(formData);

  // Reset the form fields
  form.reset();
});
