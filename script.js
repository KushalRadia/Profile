// Typed Text
document.addEventListener('DOMContentLoaded', () => {
    const typed = new Typed('.typing-text', {
        strings: ['Data Science and AI Undergraduate', 'Critical Thinker', 'Quant Finance Enthusiast', 'Problem Solver'],
        typeSpeed: 70,
        backSpeed: 35,
        backDelay: 1000,
        loop: true,
    });
});

// --- Universal Scroll Reveal Logic ---
document.addEventListener("DOMContentLoaded", function () {
    // Select all elements that we want to animate on scroll
    const revealElements = document.querySelectorAll(".reveal, .reveal-stagger");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                // When the element enters the screen
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                } 
                // Optional: remove the 'else' block if you only want the animation to happen ONCE. 
                // Keeping it makes them re-animate every time you scroll up and down!
                else {
                    entry.target.classList.remove("active");
                }
            });
        },
        {
            threshold: 0.15 // Triggers when 15% of the element is visible
        }
    );

    revealElements.forEach((el) => {
        revealObserver.observe(el);
    });
});

// --- Skills Section Logic (Grid + Aurora) ---
document.addEventListener("DOMContentLoaded", function () {
    
    // Single source of truth for all skills
    const skillsData = [
        // EXPERT
        { name: "Python", auroraCategory: "coding", gridCategory: "Languages", gridIcon: "fa-solid fa-code", level: "expert", icon: "fa-brands fa-python" },
        { name: "Java", auroraCategory: "coding", gridCategory: "Languages", gridIcon: "fa-solid fa-code", level: "expert", icon: "fa-brands fa-java" },
        { name: "Differential Equations", auroraCategory: "mathematics", gridCategory: "Mathematics", gridIcon: "fa-solid fa-square-root-variable", level: "expert", icon: "fa-solid fa-wave-square" },
        { name: "HTML/CSS/JS", auroraCategory: "coding", gridCategory: "Languages", gridIcon: "fa-solid fa-code", level: "expert", icon: "fa-brands fa-html5" },
        { name: "Linear Algebra", auroraCategory: "mathematics", gridCategory: "Mathematics", gridIcon: "fa-solid fa-square-root-variable", level: "expert", icon: "fa-solid fa-square-root-variable" },
        
        // PROFICIENT

        { name: "C++", auroraCategory: "coding", gridCategory: "Languages", gridIcon: "fa-solid fa-code", level: "proficient", icon: "fa-solid fa-c" },
        { name: "Competitive Programming", auroraCategory: "coding", gridCategory: "Computer Science", gridIcon: "fa-solid fa-diagram-project", level: "proficient", icon: "fa-solid fa-code" },
        { name: "Data Structures & Algos", auroraCategory: "coding", gridCategory: "Computer Science", gridIcon: "fa-solid fa-diagram-project", level: "proficient", icon: "fa-solid fa-diagram-project" },
        { name: "Calculus", auroraCategory: "mathematics", gridCategory: "Mathematics", gridIcon: "fa-solid fa-square-root-variable", level: "proficient", icon: "fa-solid fa-infinity" },

        // FAMILIAR
        { name: "Flask", auroraCategory: "coding", gridCategory: "Domain & Frameworks", gridIcon: "fa-solid fa-chart-line", level: "familiar", icon: "fa-solid fa-pepper-hot" },
    ];

    // --- VIEW TOGGLE LOGIC ---
    const btnGridView = document.getElementById('btn-grid-view');
    const btnAuroraView = document.getElementById('btn-aurora-view');
    const gridViewContainer = document.getElementById('grid-view');
    const auroraViewContainer = document.getElementById('aurora-view');
    const auroraFilters = document.getElementById('aurora-filters');

    btnGridView.addEventListener('click', () => {
        btnGridView.classList.add('active');
        btnAuroraView.classList.remove('active');
        gridViewContainer.style.display = 'block';
        auroraViewContainer.style.display = 'none';
        auroraFilters.style.display = 'none';
    });

    btnAuroraView.addEventListener('click', () => {
        btnAuroraView.classList.add('active');
        btnGridView.classList.remove('active');
        auroraViewContainer.style.display = 'block';
        gridViewContainer.style.display = 'none';
        auroraFilters.style.display = 'flex';
        renderAurora('all');
    });


    // --- GRID VIEW LOGIC ---
    function renderGrid() {
        const gridContainer = document.getElementById('grid-view');
        gridContainer.innerHTML = ''; 
        
        const categories = {};
        skillsData.forEach(skill => {
            if (!categories[skill.gridCategory]) {
                categories[skill.gridCategory] = {
                    icon: skill.gridIcon,
                    skills: []
                };
            }
            categories[skill.gridCategory].skills.push(skill);
        });

        // Build the HTML for each category
        for (const [categoryName, categoryData] of Object.entries(categories)) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'grid-category';
            
            let html = `
                <div class="grid-category-title">
                    <i class="${categoryData.icon}"></i>
                    <span>${categoryName}</span>
                </div>
                <div class="skills-grid">
            `;
            
            categoryData.skills.forEach(skill => {
                html += `
                    <div class="skill-pill">
                        <i class="${skill.icon}"></i>
                        <span>${skill.name}</span>
                    </div>
                `;
            });
            
            html += `</div>`;
            categoryDiv.innerHTML = html;
            gridContainer.appendChild(categoryDiv);
        }
    }


    // --- AURORA VIEW LOGIC ---
    const orbits = {
        expert: { element: document.getElementById('orbit-expert'), radius: 110 },
        proficient: { element: document.getElementById('orbit-proficient'), radius: 200 },
        familiar: { element: document.getElementById('orbit-familiar'), radius: 290 }
    };

    function renderAurora(filter = 'all') {
        if (!orbits.expert.element) return;
        Object.values(orbits).forEach(o => o.element.innerHTML = '');

        const filteredSkills = skillsData.filter(s => filter === 'all' || s.auroraCategory === filter);
        const grouped = { expert: [], proficient: [], familiar: [] };
        filteredSkills.forEach(s => grouped[s.level].push(s));

        Object.keys(grouped).forEach(level => {
            const skills = grouped[level];
            const orbitInfo = orbits[level];
            const numSkills = skills.length;
            
            if (numSkills === 0) return;

            const angleStep = (2 * Math.PI) / numSkills;
            let currentAngle = -Math.PI / 2 + (Math.PI / numSkills); 

            skills.forEach((skill) => {
                const node = document.createElement('div');
                node.className = 'skill-node';

                const x = orbitInfo.radius + orbitInfo.radius * Math.cos(currentAngle);
                const y = orbitInfo.radius + orbitInfo.radius * Math.sin(currentAngle);
                
                node.style.left = `${x}px`;
                node.style.top = `${y}px`;
                
                node.innerHTML = `
                    <i class="${skill.icon}"></i>
                    <span class="skill-tooltip">${skill.name}</span>
                `;
                
                orbitInfo.element.appendChild(node);
                currentAngle += angleStep;
            });
        });
    }

    // --- INITIALIZATION ---
    renderGrid(); 
    renderAurora('all');

    // Aurora filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderAurora(e.target.getAttribute('data-filter'));
        });
    });
});

// --- Formspree Contact Form Handler ---
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.querySelector('.formspree-contact');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevents the default Formspree redirect page

            const data = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success! Clear the fields and notify the user
                    contactForm.reset();
                    alert("Thanks for reaching out! I'll get back to you soon.");
                } else {
                    alert("Oops! There was a problem submitting your form. Please try again.");
                }
            } catch (error) {
                alert("Oops! There was a problem submitting your form. Please try again.");
            }
        });
    }
});

// --- Scroll Progress Bar Logic ---
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    
    // Calculate how far down the user has scrolled
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Convert it to a percentage
    const scroll = `${(totalScroll / windowHeight) * 100}%`;
    
    // Apply the width to the bar
    if (scrollProgress) {
        scrollProgress.style.width = scroll;
    }
});