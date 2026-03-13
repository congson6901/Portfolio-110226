const HEADER_HTML = `
<header>
    <div class="container" style="align-items: center;">
        <div class="col-6" style="display: flex; justify-content: space-between; align-items: center;">
            <a href="index.html" style="font-weight: 600; font-size: 1.2rem; z-index: 1003;">Hopesama.</a>
            <button class="hamburger-btn">
                <svg class="hamburger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6H20M4 12H20M4 18H20"/></svg>
            </button>
        </div>
        <div class="col-6">
            <nav class="nav-links">
                <a href="index.html" class="nav-link" data-link="work">Work</a>
                <a href="about.html" class="nav-link" data-link="about">About</a>
                <a href="contact.html" class="nav-link" data-link="contact">Contact</a>
                <button class="theme-btn">Dark</button>
            </nav>
        </div>
    </div>
</header>
`;

const FOOTER_HTML = `
<footer>
    <div class="container">
        <div class="col-6 footer-cta">
            <h2 class="footer-title">Let's create something<br>extraordinary.</h2>
            <a href="mailto:congsondesigner@gmail.com" class="footer-email">congsondesigner@gmail.com</a>
        </div>
        <div class="col-6 footer-nav-wrapper">
            <div class="footer-cols">
                <div class="footer-col">
                    <h4>Menu</h4>
                    <div class="footer-links">
                        <a href="index.html" class="footer-link">Work</a>
                        <a href="about.html" class="footer-link">About</a>
                        <a href="contact.html" class="footer-link">Contact</a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Socials</h4>
                    <div class="footer-links">
                        <a href="https://www.behance.net/sonnguyenc1" class="footer-link" target="_blank">Behance</a>
                        <a href="https://www.facebook.com/congson6901" class="footer-link" target="_blank">Facebook</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="footer-bottom"><span>© 2026 Hopesama Portfolio. All rights reserved.</span></div>
        </div>
    </div>
</footer>
`;

document.addEventListener("DOMContentLoaded", () => {
    const init = () => {
        _initHeader();
        _initTheme();
        _initMobileMenu();
        _initCursor();
        _initAnimation();
        _initContactForm();
    };

    const _initHeader = () => {
        const headerContainer = document.getElementById("app-header");
        const footerContainer = document.getElementById("app-footer");
        if (headerContainer) headerContainer.innerHTML = HEADER_HTML;
        if (footerContainer) footerContainer.innerHTML = FOOTER_HTML;

        const currentPath = window.location.pathname;
        document.querySelectorAll(".nav-link").forEach(link => {
            const href = link.getAttribute("href");
            link.classList.toggle("active", 
                currentPath.includes(href) || 
                (currentPath.endsWith("/") && href === "index.html") ||
                (currentPath.includes("project-") && href === "index.html")
            );
        });

        const footerYear = document.querySelector(".footer-bottom span");
        if (footerYear) {
            footerYear.innerText = `© ${new Date().getFullYear()} Hopesama Portfolio. All rights reserved.`;
        }
    };

    const _initTheme = () => {
        const body = document.body;
        const themeBtns = document.querySelectorAll(".theme-btn");
        const savedTheme = localStorage.getItem("theme");
        
        if (savedTheme === "dark") {
            body.classList.add("dark-mode");
            themeBtns.forEach(btn => btn.innerText = "Light");
        } else {
            themeBtns.forEach(btn => btn.innerText = "Dark");
        }
        
        themeBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const isDark = body.classList.toggle("dark-mode");
                localStorage.setItem("theme", isDark ? "dark" : "light");
                themeBtns.forEach(b => b.innerText = isDark ? "Light" : "Dark");
            });
        });
    };

    const _initMobileMenu = () => {
        const navLinks = document.querySelector(".nav-links");
        const hamburgerBtn = document.querySelector(".hamburger-btn");
        const body = document.body;
        
        if (!hamburgerBtn || !navLinks) return;
        
        hamburgerBtn.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            body.style.overflow = isOpen ? "hidden" : "";
        });
        
        navLinks.addEventListener("click", (e) => {
            if (e.target.classList.contains("nav-link")) {
                navLinks.classList.remove("open");
                body.style.overflow = "";
            }
        });
    };

    const _initCursor = () => {
        const cursorDot = document.querySelector("[data-cursor-dot]");
        const cursorOutline = document.querySelector("[data-cursor-outline]");
        const isDesktop = window.matchMedia("(min-width: 993px)").matches;
        const hasGSAP = typeof gsap !== 'undefined';

        if (isDesktop && hasGSAP && cursorDot && cursorOutline) {
            document.body.classList.add("mouse-active");
            cursorDot.style.visibility = "visible";
            cursorOutline.style.visibility = "visible";
            
            gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
            gsap.set(cursorOutline, { xPercent: -50, yPercent: -50 });
            
            const xTo = gsap.quickTo(cursorOutline, "left", { duration: 0.5, ease: "power3" });
            const yTo = gsap.quickTo(cursorOutline, "top", { duration: 0.5, ease: "power3" });
            
            document.addEventListener("mousemove", (e) => {
                gsap.set(cursorDot, { left: e.clientX, top: e.clientY });
                xTo(e.clientX);
                yTo(e.clientY);
            }, { passive: true });
            
            document.addEventListener("mouseover", (e) => {
                const target = e.target.closest('a, button, input, textarea, .project-item, .submit-btn, .card, blockquote');
                if (target) {
                    cursorOutline.classList.add("cursor-hover");
                    gsap.to(cursorDot, { opacity: 0, duration: 0.2 });
                } else {
                    cursorOutline.classList.remove("cursor-hover");
                    gsap.to(cursorDot, { opacity: 1, duration: 0.2 });
                }
            }, { passive: true });
        }
    };

    const _initAnimation = () => {
        if (typeof Lenis !== 'undefined') {
            const lenis = new Lenis({ duration: 1.2, smooth: true });
            const raf = (time) => {
                lenis.raf(time);
                requestAnimationFrame(raf);
            };
            requestAnimationFrame(raf);
        }
        
        const hasGSAP = typeof gsap !== 'undefined';
        if (hasGSAP && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            const fadeIns = document.querySelectorAll(".fade-in");
            if (fadeIns.length > 0) {
                gsap.from(fadeIns, { y: 30, opacity: 0, duration: 1, delay: 0.2, stagger: 0.1 });
            }
            gsap.utils.toArray(".fade-up").forEach(el => {
                gsap.from(el, {
                    y: 50, opacity: 0, duration: 0.8, ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 85%" }
                });
            });
        }
    };

    const _initContactForm = () => {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById("submit-btn");
            const formStatus = document.getElementById("form-status");
            const formData = new FormData(contactForm);

            submitBtn.disabled = true;
            submitBtn.innerText = "Đang gửi...";
            formStatus.innerText = "";

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    submitBtn.innerText = "Đã gửi thành công!";
                    submitBtn.style.backgroundColor = "#4BB543";
                    formStatus.innerText = "Cảm ơn bạn! Hopesama sẽ phản hồi sớm nhất.";
                    formStatus.style.color = "green";
                    contactForm.reset();
                    setTimeout(() => _resetForm(submitBtn, formStatus), 3000);
                } else {
                    const data = await response.json();
                    const errMsg = data.errors?.map(e => e.message).join(", ") || "Có lỗi xảy ra, vui lòng thử lại.";
                    formStatus.innerText = errMsg;
                    formStatus.style.color = "red";
                    submitBtn.innerText = "Gửi thất bại";
                    submitBtn.style.backgroundColor = "#ff3333";
                    submitBtn.disabled = false;
                }
            } catch (error) {
                formStatus.innerText = "Lỗi kết nối mạng! Hãy thử lại.";
                formStatus.style.color = "red";
                submitBtn.innerText = "Thử lại";
                submitBtn.style.backgroundColor = "#ff3333";
                submitBtn.disabled = false;
            }
        });
    };

    const _resetForm = (btn, status) => {
        btn.innerText = "Gửi";
        btn.style.backgroundColor = "";
        btn.style.color = "";
        status.innerText = "";
    };

    init();
});