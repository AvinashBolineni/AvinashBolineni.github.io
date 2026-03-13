document.addEventListener('DOMContentLoaded', () => {

    /* --- Scroll Reveal Animation --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-scroll');
    hiddenElements.forEach((el) => observer.observe(el));


    /* --- Navbar Scroll Effect --- */
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolled down
        if (scrollTop > 50) {
            navbar.classList.add('nav-shadow');
        } else {
            navbar.classList.remove('nav-shadow');
        }

        // Hide navbar on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        
        lastScrollTop = scrollTop;
    });

    /* --- Staggered Load Animation for Hero --- */
    const heroElements = document.querySelectorAll('.hero > *');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.15}s`;
    });

    /* --- Terminal Typing Animation --- */
    const terminalBody = document.getElementById('terminal-body');
    const terminalLines = [
        '<span class="terminal-prompt">$</span> <span class="terminal-keyword">python</span> get_profile.py',
        '<span class="terminal-string">Loading data engineering profile...</span>',
        '<span class="terminal-prompt">></span> Name: Avinash Bolineni',
        '<span class="terminal-prompt">></span> Role: Data Engineer',
        '<span class="terminal-prompt">></span> Location: Columbus, OH',
        '<span class="terminal-prompt">></span> Status: <span class="terminal-keyword">Building robust pipelines</span>',
        '<span class="terminal-prompt">$</span> <span class="terminal-keyword">echo</span> "Ready for new challenges!"',
        '<span class="terminal-string">"Ready for new challenges!"</span>',
        '<span class="terminal-prompt shadow-cursor">_</span>'
    ];

    let lineIndex = 0;
    let isTyping = false;
    
    // Animate typing into the terminal when it scrolls into view
    const terminalObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isTyping) {
            isTyping = true;
            typeTerminalLines();
            terminalObserver.disconnect();
        }
    });
    
    if (terminalBody) {
        terminalObserver.observe(terminalBody);
    }

    function typeTerminalLines() {
        if (lineIndex < terminalLines.length) {
            const lineDiv = document.createElement('div');
            lineDiv.classList.add('terminal-line');
            lineDiv.innerHTML = terminalLines[lineIndex];
            terminalBody.appendChild(lineDiv);
            lineIndex++;
            
            // Random typing delay
            setTimeout(typeTerminalLines, Math.random() * 400 + 400); 
        } else {
            // Make cursor blink
            setInterval(() => {
                const cursor = document.querySelector('.shadow-cursor');
                if(cursor) cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }

});
