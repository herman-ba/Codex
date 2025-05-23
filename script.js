// Custom cursor with smooth trail effect
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // More direct movement for the small cursor
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;
    
    // Keep the follower movement more fluid
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Enhanced cursor effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .expertise-card, .project-card, .stat-item');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.2)';
        cursorFollower.style.background = 'rgba(41, 151, 255, 0.1)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.background = 'rgba(41, 151, 255, 0.05)';
    });
});

// Smooth scroll with custom easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1200;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            // Apple-like easing function
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    });
});

// Enhanced Intersection Observer with subtle animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            if (entry.target.id === 'hero') {
                entry.target.style.transform = `translateX(${window.pageYOffset * 0.2}px)`;
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections with subtle animations
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateX(20px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Subtle parallax effect for hero section
const hero = document.querySelector('#hero');
let lastScrollY = window.pageYOffset;

window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;
    const scrollDelta = currentScrollY - lastScrollY;
    
    hero.style.transform = `translateX(${currentScrollY * 0.2}px)`;
    hero.style.opacity = 1 - (currentScrollY * 0.002);
    
    lastScrollY = currentScrollY;
});

// Dynamic project cards with subtle animations
const projects = [
    {
        title: 'AI-Powered SMS Communication System',
        description: 'Developed an AI-based communication algorithm for sales and customer experience, utilizing natural language processing to enhance customer interactions through SMS.',
        technologies: ['Python', 'NLP', 'Machine Learning', 'SMS API'],
        image: 'path/to/project1.jpg'
    },
    {
        title: 'Market Prediction Model',
        description: 'Created a sophisticated LSTM-based market prediction model with multi-layer attention mechanisms for accurate market trend forecasting.',
        technologies: ['Python', 'LSTM', 'Attention Mechanism', 'Data Analysis'],
        image: 'path/to/project2.jpg'
    },
    {
        title: 'Automated Code Review System',
        description: 'Built an intelligent system that automates code review processes, providing real-time feedback and suggestions for code improvements.',
        technologies: ['Python', 'Static Analysis', 'Machine Learning', 'API Integration'],
        image: 'path/to/project3.jpg'
    }
];

// Function to create project cards with subtle staggered animation
function createProjectCards() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.opacity = '0';
        card.style.transform = 'translateX(20px)';
        card.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`;
        
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;
        
        projectsGrid.appendChild(card);
        
        // Trigger animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 100);
    });
}

// Initialize project cards
createProjectCards();

// Add CSS for enhanced project cards
const style = document.createElement('style');
style.textContent = `
    .project-card {
        background: var(--gray-color);
        padding: 3rem;
        border-radius: 30px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(255, 255, 255, 0.1);
        position: relative;
        overflow: hidden;
    }

    .project-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent, rgba(0, 102, 204, 0.1), transparent);
        transform: translateX(-100%);
        transition: transform 0.6s ease;
    }

    .project-card:hover::before {
        transform: translateX(100%);
    }

    .project-card:hover {
        transform: translateY(-15px);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        border-color: var(--accent-color);
    }

    .tech-tag {
        display: inline-block;
        padding: 0.5rem 1.5rem;
        background: var(--light-gray);
        color: var(--accent-color);
        border-radius: 20px;
        font-size: 1rem;
        margin: 0.5rem;
        border: 1px solid var(--accent-color);
        transition: all 0.3s ease;
    }

    .tech-tag:hover {
        background: var(--accent-color);
        color: white;
        transform: scale(1.05);
        box-shadow: 0 0 20px var(--glow-color);
    }

    .fade-in {
        opacity: 1 !important;
        transform: translateX(0) !important;
    }
`;
document.head.appendChild(style);

// Skill data
const skillData = {
    javascript: {
        title: "JavaScript",
        description: "Proficient in modern JavaScript development with expertise in ES6+, async programming, and frontend frameworks. Experience in building interactive web applications and implementing complex UI features.",
        examples: [
            "Modern web application development",
            "Frontend framework implementation",
            "State management solutions",
            "API integration and data handling"
        ]
    },
    htmlcss: {
        title: "HTML/CSS",
        description: "Expert in creating responsive, accessible, and modern web interfaces. Strong focus on semantic HTML, CSS animations, and responsive design principles.",
        examples: [
            "Responsive web layouts",
            "Modern UI/UX implementation",
            "CSS animations and transitions",
            "Cross-browser compatibility"
        ]
    },
    python: {
        title: "Python",
        description: "Skilled in Python development with focus on data analysis, automation, and backend services. Experience with popular frameworks and libraries for various applications.",
        examples: [
            "Data analysis and processing",
            "Backend service development",
            "Automation scripting",
            "API development"
        ]
    },
    swift: {
        title: "Swift",
        description: "Proficient in iOS development using Swift, with experience in building native applications and implementing modern iOS features and design patterns.",
        examples: [
            "iOS application development",
            "SwiftUI implementation",
            "Core iOS features integration",
            "App Store deployment"
        ]
    },
    llm: {
        title: "LLM",
        description: "Experience in working with Large Language Models, including implementation, fine-tuning, and integration into various applications. Focus on practical AI solutions.",
        examples: [
            "LLM implementation and integration",
            "Model fine-tuning",
            "AI-powered applications",
            "Natural language processing"
        ]
    },
    lstm: {
        title: "LSTM",
        description: "Expertise in Long Short-Term Memory networks for sequence prediction and time series analysis. Experience in implementing complex neural network architectures.",
        examples: [
            "Time series prediction",
            "Sequence modeling",
            "Pattern recognition",
            "Neural network architecture"
        ]
    },
    transformers: {
        title: "Transformers",
        description: "Deep understanding of transformer architecture and its applications in natural language processing. Experience in implementing and optimizing transformer models.",
        examples: [
            "Transformer model implementation",
            "NLP applications",
            "Model optimization",
            "Attention mechanism"
        ]
    },
    neural: {
        title: "Neural Networks",
        description: "Comprehensive knowledge of neural network architectures and deep learning principles. Experience in designing and implementing various types of neural networks.",
        examples: [
            "Deep learning implementation",
            "Network architecture design",
            "Model training and optimization",
            "Feature extraction"
        ]
    },
    git: {
        title: "Git",
        description: "Proficient in version control using Git, with experience in collaborative development workflows and repository management.",
        examples: [
            "Version control management",
            "Collaborative development",
            "Branch strategy implementation",
            "Code review workflow"
        ]
    },
    docker: {
        title: "Docker",
        description: "Experience in containerization and deployment using Docker. Knowledge of container orchestration and microservices architecture.",
        examples: [
            "Container management",
            "Microservices deployment",
            "Environment configuration",
            "CI/CD integration"
        ]
    },
    cicd: {
        title: "CI/CD",
        description: "Expertise in implementing and maintaining continuous integration and deployment pipelines. Focus on automation and efficient development workflows.",
        examples: [
            "Pipeline automation",
            "Build process optimization",
            "Deployment automation",
            "Quality assurance integration"
        ]
    },
    aws: {
        title: "AWS",
        description: "Experience with Amazon Web Services, including cloud infrastructure management, serverless architecture, and cloud-based solutions.",
        examples: [
            "Cloud infrastructure",
            "Serverless architecture",
            "Service integration",
            "Resource optimization"
        ]
    },
    sql: {
        title: "SQL",
        description: "Proficient in database design and management using SQL. Experience in optimizing queries and implementing efficient database solutions.",
        examples: [
            "Database design",
            "Query optimization",
            "Data modeling",
            "Performance tuning"
        ]
    },
    mongodb: {
        title: "MongoDB",
        description: "Experience with MongoDB for NoSQL database solutions. Knowledge of document-based data modeling and database optimization.",
        examples: [
            "NoSQL database design",
            "Document modeling",
            "Query optimization",
            "Data aggregation"
        ]
    },
    analysis: {
        title: "Data Analysis",
        description: "Expertise in data analysis and visualization. Experience in extracting insights from complex datasets and presenting findings effectively.",
        examples: [
            "Data visualization",
            "Statistical analysis",
            "Pattern recognition",
            "Insight extraction"
        ]
    },
    etl: {
        title: "ETL",
        description: "Experience in Extract, Transform, Load processes for data integration and warehousing. Focus on efficient data pipeline implementation.",
        examples: [
            "Data pipeline development",
            "Data transformation",
            "Integration workflows",
            "Process automation"
        ]
    },
    ios: {
        title: "iOS Development",
        description: "Expertise in native iOS development with a focus on Swift and SwiftUI. Experience in building high-performance, user-friendly iOS applications with modern Apple frameworks and best practices.",
        examples: [
            "Native iOS app development",
            "SwiftUI and UIKit implementation",
            "Core iOS features integration",
            "App Store optimization"
        ]
    },
    reactnative: {
        title: "React Native",
        description: "Proficient in cross-platform mobile development using React Native. Experience in building performant mobile applications that work seamlessly across iOS and Android platforms.",
        examples: [
            "Cross-platform mobile development",
            "Native module integration",
            "Performance optimization",
            "Mobile UI/UX implementation"
        ]
    },
    flutter: {
        title: "Flutter",
        description: "Skilled in Flutter development for creating beautiful, natively compiled applications. Experience in building responsive UIs and implementing complex mobile features using Dart.",
        examples: [
            "Cross-platform Flutter apps",
            "Custom widget development",
            "State management solutions",
            "Native feature integration"
        ]
    },
    react: {
        title: "React",
        description: "Expert in React development with deep knowledge of modern React features and best practices. Experience in building scalable, performant single-page applications with advanced state management and component architecture.",
        examples: [
            "Complex SPA development",
            "State management (Redux/Context)",
            "Component architecture",
            "Performance optimization"
        ]
    },
    vue: {
        title: "Vue.js",
        description: "Proficient in Vue.js development with experience in building reactive, component-based applications. Skilled in Vue 3 composition API, Vuex state management, and Vue Router implementation.",
        examples: [
            "Vue 3 application development",
            "Composition API implementation",
            "Vuex state management",
            "Component architecture"
        ]
    },
    api: {
        title: "API Design",
        description: "Expertise in designing and implementing RESTful and GraphQL APIs. Experience in creating scalable, secure, and well-documented API architectures with proper authentication and rate limiting.",
        examples: [
            "RESTful API architecture",
            "GraphQL implementation",
            "API security & authentication",
            "API documentation"
        ]
    },
    database: {
        title: "Database Design",
        description: "Comprehensive experience in database design and management across SQL and NoSQL solutions. Expertise in data modeling, optimization, and implementing efficient database architectures.",
        examples: [
            "Database architecture",
            "Query optimization",
            "Data modeling",
            "Performance tuning"
        ]
    },
    nodejs: {
        title: "Node.js",
        description: "Expert in Node.js development with extensive experience in building scalable server-side applications. Proficient in Express.js, real-time applications with Socket.io, and implementing microservices architecture.",
        examples: [
            "Server-side application development",
            "Express.js framework",
            "Real-time application implementation",
            "Microservices architecture"
        ]
    }
};

// Popup functionality
const popup = document.getElementById('skillPopup');
const popupTitle = popup.querySelector('.popup-title');
const popupDescription = popup.querySelector('.popup-description');
const examplesList = popup.querySelector('.examples-list');
const closeButton = popup.querySelector('.popup-close');

// Function to show popup
function showPopup(skillId) {
    const skill = skillData[skillId];
    if (!skill) return;

    popupTitle.textContent = skill.title;
    popupDescription.textContent = skill.description;
    
    // Clear and populate examples
    examplesList.innerHTML = '';
    skill.examples.forEach(example => {
        const li = document.createElement('li');
        li.textContent = example;
        examplesList.appendChild(li);
    });

    // Show popup
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to hide popup
function hidePopup() {
    popup.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners
document.querySelectorAll('.expertise-card li').forEach(item => {
    item.addEventListener('click', () => {
        const skillId = item.getAttribute('data-skill');
        showPopup(skillId);
    });
});

closeButton.addEventListener('click', hidePopup);
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        hidePopup();
    }
});

// Close popup on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
        hidePopup();
    }
});

// Typing animation for the title
let typingTimeoutId = null;
let typingAnimationFrame = null;

function typeText(element, text, speed = 50) {
    // Clean up any existing animation
    if (typingTimeoutId) {
        clearTimeout(typingTimeoutId);
    }
    if (typingAnimationFrame) {
        cancelAnimationFrame(typingAnimationFrame);
    }

    let index = 0;
    element.textContent = '';
    element.classList.add('typing');

    const lines = text.split('\n');
    let currentLine = 0;
    let firstLineText = '';
    let secondLineText = '';
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    // Handle visibility changes
    const handleVisibilityChange = () => {
        if (document.hidden) {
            if (typingTimeoutId) {
                clearTimeout(typingTimeoutId);
            }
        } else {
            type();
        }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    function type() {
        if (currentLine < lines.length) {
            if (index < lines[currentLine].length) {
                if (currentLine === 0) {
                    firstLineText += lines[currentLine].charAt(index);
                    element.textContent = firstLineText;
                    element.appendChild(cursor);
                } else {
                    secondLineText += lines[currentLine].charAt(index);
                    element.textContent = firstLineText + '\n' + secondLineText;
                    element.appendChild(cursor);
                }
                index++;
                typingTimeoutId = setTimeout(type, speed);
            } else {
                currentLine++;
                if (currentLine < lines.length) {
                    index = 0;
                    typingTimeoutId = setTimeout(type, speed);
                } else {
                    element.classList.remove('typing');
                    element.classList.add('typing-complete');
                    // Remove cursor after 2 seconds
                    typingTimeoutId = setTimeout(() => {
                        element.textContent = firstLineText + '\n' + secondLineText;
                        document.querySelector('.hero-story').classList.add('visible');
                        // Clean up
                        document.removeEventListener('visibilitychange', handleVisibilityChange);
                    }, 2000);
                }
            }
        }
    }

    type();
}

// Initialize typing animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.glitch-text');
    const fullText = "Hi, my name is Heine Bautz,\nI'm a Developer & AI Specialist";
    
    // Add no-js class to body if JavaScript is disabled
    document.body.classList.remove('no-js');
    
    // Set text direction based on language
    title.dir = document.documentElement.lang === 'ar' || document.documentElement.lang === 'he' ? 'rtl' : 'ltr';
    
    // Custom typeText to handle <br> for line breaks
    function typeTextWithBr(element, text, speed = 50) {
        if (typingTimeoutId) clearTimeout(typingTimeoutId);
        if (typingAnimationFrame) cancelAnimationFrame(typingAnimationFrame);
        let index = 0;
        element.innerHTML = '';
        element.classList.add('typing');
        const lines = text.split('\n');
        let currentLine = 0;
        let firstLineText = '';
        let secondLineText = '';
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.setAttribute('aria-hidden', 'true');
        function type() {
            if (currentLine < lines.length) {
                if (index < lines[currentLine].length) {
                    if (currentLine === 0) {
                        firstLineText += lines[currentLine].charAt(index);
                        element.innerHTML = firstLineText;
                        element.appendChild(cursor);
                    } else {
                        secondLineText += lines[currentLine].charAt(index);
                        element.innerHTML = firstLineText + '<br>' + secondLineText;
                        element.appendChild(cursor);
                    }
                    index++;
                    typingTimeoutId = setTimeout(type, speed);
                } else {
                    currentLine++;
                    if (currentLine < lines.length) {
                        index = 0;
                        typingTimeoutId = setTimeout(type, speed);
                    } else {
                        element.classList.remove('typing');
                        element.classList.add('typing-complete');
                        typingTimeoutId = setTimeout(() => {
                            element.innerHTML = firstLineText + '<br>' + secondLineText;
                            document.querySelector('.hero-story').classList.add('visible');
                        }, 2000);
                    }
                }
            }
        }
        type();
    }
    typeTextWithBr(title, fullText, 50);
});

// Contact Form Popup
const contactPopup = document.getElementById('contactPopup');
const contactForm = document.getElementById('contactForm');
const contactButtons = document.querySelectorAll('.contact-button:not(.fixed-contact)');
const fixedContactButton = document.querySelector('.fixed-contact');
const closeContactButton = contactPopup.querySelector('.popup-close');

// Show contact popup
contactButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        contactPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Show contact popup for fixed button
fixedContactButton.addEventListener('click', (e) => {
    e.preventDefault();
    contactPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Hide contact popup
function hideContactPopup() {
    contactPopup.classList.remove('active');
    document.body.style.overflow = '';
}

closeContactButton.addEventListener('click', hideContactPopup);
contactPopup.addEventListener('click', (e) => {
    if (e.target === contactPopup) {
        hideContactPopup();
    }
});

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    // Remove the default alert since formsubmit.co will handle the success page
    // The form will submit normally to formsubmit.co
    // The _next parameter will handle the redirect after successful submission
});

// Fixed contact button visibility
const contactSection = document.querySelector('#contact');

function updateFixedButtonVisibility() {
    const contactSectionRect = contactSection.getBoundingClientRect();
    const isContactSectionVisible = contactSectionRect.top <= window.innerHeight && contactSectionRect.bottom >= 0;
    
    if (isContactSectionVisible) {
        fixedContactButton.classList.remove('visible');
    } else {
        fixedContactButton.classList.add('visible');
    }
}

// Update on scroll
window.addEventListener('scroll', updateFixedButtonVisibility);
// Initial check
updateFixedButtonVisibility(); 