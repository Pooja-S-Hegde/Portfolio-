// Typing animation function
function initTypingAnimation() {
    // Get all elements with text-typing class that haven't been animated yet
    const elements = document.querySelectorAll('.text-typing:not(.typing-complete)');
    
    elements.forEach((element, index) => {
        const text = element.getAttribute('data-text');
        if (!text) return;
        
        // Mark as being processed to prevent duplicate animations
        element.classList.add('typing-in-progress');
        
        // Clear any existing content and set initial styles
        element.textContent = '';
        element.style.visibility = 'visible';
        element.style.display = 'inline-block'; // Ensure consistent layout
        
        // Add cursor effect
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        element.appendChild(cursor);
        
        // Set up the typing effect with a small delay between elements
        setTimeout(() => {
            let charIndex = 0;
            const typeSpeed = 50; // Speed in milliseconds
            
            function type() {
                if (charIndex < text.length) {
                    // Update text content
                    element.textContent = text.substring(0, charIndex + 1);
                    // Re-append cursor
                    element.appendChild(cursor);
                    charIndex++;
                    setTimeout(type, typeSpeed);
                } else {
                    // Animation complete
                    element.classList.remove('typing-in-progress');
                    element.classList.add('typing-complete');
                    // Remove cursor when done
                    if (cursor.parentNode === element) {
                        element.removeChild(cursor);
                    }
                }
            }
            
            type();
        }, index * 300); // Stagger the start of each animation
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Initialize typing animation
    initTypingAnimation();
    
  // Certificate Modal Functionality
  const modal = document.getElementById('certificateModal');
  const enlargedCertificate = document.getElementById('enlargedCertificate');
  const closeBtn = document.querySelector('.close');
  const certificateItems = document.querySelectorAll('.certificate-item');
  const modalContent = document.querySelector('.certificate-modal .modal-content');

  // Function to open modal
  function openModal(imgSrc) {
    if (modal && enlargedCertificate) {
      enlargedCertificate.src = imgSrc;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  // Function to close modal
  function closeModal() {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
  }

  // Add click event listeners to all certificate items
  if (certificateItems.length > 0) {
    certificateItems.forEach(item => {
      item.addEventListener('click', function(e) {
        const img = this.querySelector('img');
        if (img && img.src) {
          openModal(img.src);
        }
      });
    });
  }

  // Close the modal when clicking the close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close the modal when clicking outside the content
  if (modal && modalContent) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close the modal when pressing the Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
      closeModal();
    }
  });

  // Navbar Active Link Highlighting
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
              else {
                console.warn(`No matching navlink found for: ${targetId}`);
              }
          }
      },
      { rootMargin:"0px", threshold: [0.3,0.5,0.7] }
  );

  sections.forEach((section) => observer.observe(section));
  // Typing Effect
 
    const typingElements = document.querySelectorAll(".text-typing");
    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (!entry.target.classList.contains("typed")) {  // Prevent multiple executions
                    startTyping(entry.target);
                    entry.target.classList.add("typed");  // Mark as typed
                }
            }
           
        });
    }, { threshold: 0.5 });

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
    history.replaceState(null, null, "#home"); // Keeps the URL but doesn't force a reload
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
