document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.documentElement.setAttribute(
            'data-theme',
            document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
        );
        localStorage.setItem(
            'theme',
            document.documentElement.getAttribute('data-theme')
        );
        updateThemeIcon();
    });

    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    // Check for saved theme preference
    if (localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
        updateThemeIcon();
    }

    // Skills Radar Chart
    const skillsChart = new Chart(document.getElementById('skills-chart'), {
        type: 'radar',
        data: {
            labels: ['C++', 'C#', 'Python', '.NET', 'MySQL', 'Problem Solving'],
            datasets: [{
                label: 'Skill Level',
                data: [90, 85, 80, 85, 80, 95],
                backgroundColor: 'rgba(74, 107, 255, 0.2)',
                borderColor: 'rgba(74, 107, 255, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(74, 107, 255, 1)',
                pointRadius: 4
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Animate skill bars
    document.querySelectorAll('.skill-category li').forEach(item => {
        const level = item.getAttribute('data-level');
        item.style.setProperty('--skill-level', `${level}%`);
        item.innerHTML = `${item.textContent} <span class="skill-level"><span class="skill-progress"></span></span>`;
    });

    // Voice Control
    const voiceControl = document.getElementById('voice-control');
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        voiceControl.addEventListener('click', () => {
            recognition.start();
            voiceControl.classList.add('active');
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                handleVoiceCommand(transcript);
                voiceControl.classList.remove('active');
            };
            
            recognition.onerror = () => {
                voiceControl.classList.remove('active');
            };
        });
    } else {
        voiceControl.style.display = 'none';
    }

    function handleVoiceCommand(command) {
        if (command.includes('about') || command.includes('profile')) {
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        } else if (command.includes('skill') || command.includes('expertise')) {
            document.querySelector('#skills').scrollIntoView({ behavior: 'smooth' });
        } else if (command.includes('project')) {
            document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
        } else if (command.includes('contact')) {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        } else if (command.includes('light') || command.includes('dark')) {
            themeToggle.click();
        }
    }

    // Project Search
    const projectSearch = document.getElementById('project-search');
    projectSearch.addEventListener('input', () => {
        const searchTerm = projectSearch.value.toLowerCase();
        document.querySelectorAll('.project-card').forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const tech = card.querySelector('.project-tech').textContent.toLowerCase();
            if (title.includes(searchTerm) || tech.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.timeline-item, .project-card, .skill-category').forEach(el => {
        observer.observe(el);
    });
});