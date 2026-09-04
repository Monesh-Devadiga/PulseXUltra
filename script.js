/* ===================================================================
   PulseX Ultra - Interactive Components (Vanilla JS)
   Components: Dark Mode, Carousel, Tabs, Modal, Form Validation
   =================================================================== */

(function () {
    "use strict";

    // ==================== 1. DARK MODE TOGGLE ====================
    function initDarkMode() {
        var toggle = document.getElementById("darkModeToggle");
        var body = document.body;

        // Restore saved preference
        if (localStorage.getItem("pulsex-dark") === "true") {
            body.classList.add("dark-mode");
        }

        toggle.addEventListener("click", function () {
            body.classList.toggle("dark-mode");
            localStorage.setItem("pulsex-dark", body.classList.contains("dark-mode"));
        });
    }

    // ==================== 2. IMAGE CAROUSEL ====================
    function initCarousel() {
        var track = document.getElementById("carouselTrack");
        var slides = track.querySelectorAll(".carousel-slide");
        var prevBtn = document.getElementById("carouselPrev");
        var nextBtn = document.getElementById("carouselNext");
        var dotsContainer = document.getElementById("carouselDots");
        var current = 0;
        var total = slides.length;

        // Build dots
        for (var i = 0; i < total; i++) {
            var dot = document.createElement("button");
            dot.classList.add("carousel-dot");
            dot.setAttribute("aria-label", "Go to slide " + (i + 1));
            if (i === 0) dot.classList.add("active");
            dot.dataset.index = i;
            dotsContainer.appendChild(dot);
        }

        var dots = dotsContainer.querySelectorAll(".carousel-dot");

        function goToSlide(index) {
            if (index < 0) index = total - 1;      // wrap to last
            if (index >= total) index = 0;          // wrap to first
            current = index;
            track.style.transform = "translateX(-" + (current * 100) + "%)";
            // Update dots
            for (var d = 0; d < dots.length; d++) {
                dots[d].classList.toggle("active", d === current);
            }
        }

        prevBtn.addEventListener("click", function () {
            goToSlide(current - 1);
        });

        nextBtn.addEventListener("click", function () {
            goToSlide(current + 1);
        });

        // Dot clicks
        for (var j = 0; j < dots.length; j++) {
            dots[j].addEventListener("click", function () {
                goToSlide(parseInt(this.dataset.index));
            });
        }

        // Keyboard support
        document.addEventListener("keydown", function (e) {
            if (e.key === "ArrowLeft") goToSlide(current - 1);
            if (e.key === "ArrowRight") goToSlide(current + 1);
        });

        // Auto-play (pause on hover)
        var interval = setInterval(function () {
            goToSlide(current + 1);
        }, 4500);

        track.closest(".carousel-container").addEventListener("mouseenter", function () {
            clearInterval(interval);
        });
        track.closest(".carousel-container").addEventListener("mouseleave", function () {
            interval = setInterval(function () {
                goToSlide(current + 1);
            }, 4500);
        });
    }

    // ==================== 3. TABBED INTERFACE ====================
    function initTabs() {
        var tabBtns = document.querySelectorAll(".tab-btn");
        var panels = document.querySelectorAll(".tab-panel");

        function switchTab(tab) {
            var target = tab.dataset.tab;

            // Deactivate all
            for (var i = 0; i < tabBtns.length; i++) {
                tabBtns[i].classList.remove("active");
                tabBtns[i].setAttribute("aria-selected", "false");
            }
            for (var j = 0; j < panels.length; j++) {
                panels[j].classList.remove("active");
            }

            // Activate selected
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            var panel = document.getElementById("panel-" + target);
            if (panel) panel.classList.add("active");
        }

        for (var k = 0; k < tabBtns.length; k++) {
            tabBtns[k].addEventListener("click", function () {
                switchTab(this);
            });
        }
    }

    // ==================== 4. MODAL / DIALOG ====================
    function initModal() {
        var overlay = document.getElementById("modalOverlay");
        var openBtn = document.getElementById("openModal");
        var closeBtn = document.getElementById("modalClose");

        function openModal() {
            overlay.classList.add("open");
            document.body.style.overflow = "hidden";
            // Trap focus
            closeBtn.focus();
        }

        function closeModal() {
            overlay.classList.remove("open");
            document.body.style.overflow = "";
            openBtn.focus();
        }

        openBtn.addEventListener("click", openModal);
        closeBtn.addEventListener("click", closeModal);

        // Close on overlay click
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) closeModal();
        });

        // Close on Escape
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && overlay.classList.contains("open")) {
                closeModal();
            }
        });
    }

    // ==================== 5. FORM VALIDATION ====================
    function initForm() {
        var form = document.getElementById("preorderForm");
        var successMsg = document.getElementById("formSuccess");

        var fields = {
            name: {
                el: document.getElementById("name"),
                error: document.getElementById("nameError"),
                validate: function (val) {
                    if (!val.trim()) return "Please enter your name.";
                    if (val.trim().length < 2) return "Name must be at least 2 characters.";
                    return "";
                }
            },
            email: {
                el: document.getElementById("email"),
                error: document.getElementById("emailError"),
                validate: function (val) {
                    if (!val.trim()) return "Please enter your email.";
                    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRe.test(val)) return "Please enter a valid email address.";
                    return "";
                }
            },
            phone: {
                el: document.getElementById("phone"),
                error: document.getElementById("phoneError"),
                validate: function (val) {
                    if (val.trim() === "") return ""; // optional
                    var phoneRe = /^[+]?[\d\s\-()]{7,15}$/;
                    if (!phoneRe.test(val)) return "Please enter a valid phone number.";
                    return "";
                }
            },
            color: {
                el: document.getElementById("color"),
                error: document.getElementById("colorError"),
                validate: function (val) {
                    if (!val) return "Please select a color.";
                    return "";
                }
            },
            terms: {
                el: document.getElementById("terms"),
                error: document.getElementById("termsError"),
                validate: function () {
                    if (!document.getElementById("terms").checked) return "You must agree to the terms.";
                    return "";
                }
            }
        };

        // Real-time validation on blur
        function setupBlurValidation(field) {
            field.el.addEventListener("blur", function () {
                var msg = field.validate(field.el.value || field.el.checked);
                field.error.textContent = msg;
                field.el.classList.remove("error", "valid");
                if (msg) {
                    field.el.classList.add("error");
                } else if (field.el.value || (field.el.type === "checkbox" && field.el.checked)) {
                    field.el.classList.add("valid");
                }
            });

            // Clear error on input
            field.el.addEventListener("input", function () {
                if (field.el.classList.contains("error")) {
                    var msg = field.validate(field.el.value || field.el.checked);
                    if (!msg) {
                        field.error.textContent = "";
                        field.el.classList.remove("error");
                        field.el.classList.add("valid");
                    }
                }
            });
        }

        for (var key in fields) {
            if (fields.hasOwnProperty(key)) {
                setupBlurValidation(fields[key]);
            }
        }

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var hasError = false;

            for (var key in fields) {
                if (fields.hasOwnProperty(key)) {
                    var field = fields[key];
                    var val = field.el.value || field.el.checked;
                    var msg = field.validate(val);
                    field.error.textContent = msg;
                    field.el.classList.remove("error", "valid");
                    if (msg) {
                        field.el.classList.add("error");
                        hasError = true;
                    } else {
                        field.el.classList.add("valid");
                    }
                }
            }

            if (!hasError) {
                successMsg.classList.add("show");
                form.reset();
                // Remove valid classes after reset
                for (var k in fields) {
                    if (fields.hasOwnProperty(k)) {
                        fields[k].el.classList.remove("valid", "error");
                    }
                }
                // Scroll to success message
                successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    }

    // ==================== INITIALIZE ====================
    document.addEventListener("DOMContentLoaded", function () {
        initDarkMode();
        initCarousel();
        initTabs();
        initModal();
        initForm();
    });

})();
