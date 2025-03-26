document.addEventListener("DOMContentLoaded", function () {
  // ✅ Navbar Active Link Highlighting
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
      (entries) => {
          entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          let mostVisible = entries.find((entry) => entry.isIntersecting);
          if (mostVisible) {
              navLinks.forEach((link) => link.classList.remove("active"));
              const targetId = mostVisible.target.getAttribute("id");
              const activeLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
              if (activeLink) {
                  activeLink.classList.add("active");
              }
              else{
                console.warn(`no match navlink found for:$targetId}`);
              }
          }
      },
      { rootMargin:"0px", threshold: [0.3,0.5,0.7] }
  );

  sections.forEach((section) => observer.observe(section));

//   document.addEventListener("DOMContentLoaded", function () {
//     const menuToggle = document.querySelector(".menu-toggle");
//     const navMenu = document.querySelector(".nav");

//     menuToggle.addEventListener("click", function () {
//         navMenu.classList.toggle("show");
//     });
// });


  // ✅ Typing Effect
  const typingElements = document.querySelectorAll(".text-typing");
  const typingObserver = new IntersectionObserver(
      (entries) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting) {
                  startTyping(entry.target);
              }
          });
      },
      { threshold: 0.5 }
  );

  typingElements.forEach((element) => typingObserver.observe(element));

  function startTyping(element) {
      const text = element.getAttribute("data-text");
      let index = 0;
      element.textContent = "";

      function type() {
          if (index < text.length) {
              element.textContent += text[index];
              index++;
              setTimeout(type, 100);
          }
      }

      type();
  }

  // ✅ Redirect to Home on Refresh
  if (performance.navigation.type === 1) {
      window.location.href = "#home";
  }

  // ✅ Read More Button Functionality
  document.querySelectorAll(".btn").forEach((button) => {
      button.addEventListener("click", function () {
          const moreText = this.previousElementSibling.querySelector(".more-text");
          if (moreText.style.display === "none" || moreText.style.display === "") {
              moreText.style.display = "inline";
              this.textContent = "Read Less";
          } else {
              moreText.style.display = "none";
              this.textContent = "Read More";
          }
      });
  });

  // ✅ FORM VALIDATION - Display Errors at Top of Columns
  const form = document.querySelector(".contact-form form");

  form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission
      let isValid = true;

      // Remove existing error messages
      document.querySelectorAll(".error-message").forEach((el) => el.remove());

      // Get form values
      const name = document.getElementById("firstName");
      const email = document.getElementById("inputEmail");
      const password = document.getElementById("password");
      const address = document.getElementById("inputAddress");
      const state = document.getElementById("inputState");
      const pin = document.querySelector("input[name='pin']");
      const phone = document.querySelector("input[name='phone']");

      function showError(input, message) {
          if (!input) return; // Prevent errors if input is missing

          // Create error message
          const error = document.createElement("div");
          error.className = "error-message";
          error.style.cssText = `
              
            
              padding: 8px;
            font-size: 14px;
  text-align: center;
  margin-top: 5px;
  border-radius: 5px;
              position: absolute;
              bottom: -17px; /* Move error message to top */
              left:0%;
              width: 100%;
               color: white;
              text-shadow:
              -2px -2px 0 red,
              -2px -2px 0 red,
              -2px  2px 0 red,
               2px 2px 0 red
               `;
          error.textContent = message;

          // Append error message at the top of the column
          const parent = input.closest(".form-group") || input.parentNode;
          parent.style.position = "relative"; // Ensure parent has position for absolute placement
          parent.prepend(error);

          isValid = false;
      }

      // ✅ Form Validations
      if (!name || name.value.trim() === "") showError(name, "Name cannot be empty!");
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) showError(email, "Enter a valid email!");
      if (!password || password.value.length < 6) showError(password, "Password must be at least 6 characters!");
      if (!address || address.value.trim() === "") showError(address, "Address cannot be empty!");
      if (!state || state.value === "Choose...") showError(state, "Please select a state!");
      if (!pin || !/^\d{6}$/.test(pin.value.trim())) showError(pin, "Pin code must be 6 digits!");
      if (phone && !/^\d{10}$/.test(phone.value.trim())) showError(phone, "Phone number must be 10 digits!");

      // ✅ Submit form if valid
      if (isValid) {
          alert("Form submitted successfully!");
          form.submit();
      }
  });

  // ✅ Populate State Dropdown
  const states = [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
      "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
      "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
      "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
      "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const stateDropdown = document.getElementById("inputState");

  // Default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Choose...";
  stateDropdown.appendChild(defaultOption);

  // Add states dynamically
  states.forEach((state) => {
      const option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      stateDropdown.appendChild(option);
  });
});
