
            // Theme toggle functionality
            const themeToggle = document.getElementById('themeToggle');
            themeToggle.addEventListener('change', () => {
                document.body.classList.toggle('dark');
                localStorage.setItem('darkMode', themeToggle.checked);
            });
            
            // Check for saved theme preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark');
                themeToggle.checked = true;
            }
            
            // Smooth scrolling for navigation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
            
            // Lightning animation
            function createLightning() {
                const container = document.getElementById('lightningContainer');
                for (let i = 0; i < 8; i++) {
                    const lightning = document.createElement('div');
                    lightning.className = 'lightning';
                    lightning.style.left = `${Math.random() * 100}%`;
                    lightning.style.animationDelay = `${Math.random() * 5}s`;
                    container.appendChild(lightning);
                }
            }
            
            createLightning();
            
            // Download button functionality
            document.querySelector('.download-btn').addEventListener('click', function(e) {
                e.preventDefault();
                // Replace with actual download link
                alert('Resume download would start here');
            });
        