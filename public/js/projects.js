document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');
    const GITHUB_USERNAME = 'dakshdubey';
    const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

    // Modal Elements
    const modal = document.getElementById('project-modal');
    const modalWindow = document.getElementById('modal-window');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalClose = document.getElementById('modal-close');

    // Content Elements
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalDesc = document.getElementById('modal-desc');
    const modalBtnDemo = document.getElementById('modal-btn-demo');
    const modalBtnGithub = document.getElementById('modal-btn-github');

    // Sandbox Elements
    const btnViewLive = document.getElementById('btn-view-live');
    const btnViewCode = document.getElementById('btn-view-code');
    const modalIframe = document.getElementById('modal-iframe');
    const iframeLoader = document.getElementById('iframe-loader');
    const iframeFallback = document.getElementById('iframe-fallback');
    const modalBtnFallback = document.getElementById('modal-btn-fallback');

    let currentRepo = null;

    async function fetchProjects() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`GitHub API Error: ${response.status}`);
            }
            const data = await response.json();

            const projects = data.filter(repo => !repo.fork && !repo.archived)
                .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

            renderProjects(projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
            renderError();
        }
    }

    function renderProjects(projects) {
        if (projects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                     <p class="text-slate-500 font-medium">No public projects found.</p>
                </div>`;
            return;
        }

        projectsGrid.innerHTML = projects.map(project => createProjectCard(project)).join('');

        // Add Event Listeners for Cards
        projects.forEach(project => {
            const card = document.getElementById(`project-${project.id}`);
            if (card) {
                card.addEventListener('click', () => openModal(project));
            }
        });

        // Trigger scroll reveal
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }

    function createProjectCard(repo) {
        const date = new Date(repo.pushed_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const description = repo.description || 'No description provided.';
        const language = repo.language || 'Code';

        // NOTE: Adjusted to wrap the card content in a button or clickable div
        return `
            <div id="project-${repo.id}" class="project-card opacity-0 translate-y-10 transition-all duration-700 ease-out h-full cursor-none">
                <div class="card p-8 h-full glass-premium hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden">
                    
                    <!-- Decorative Gradient Blob -->
                    <div class="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>

                    <div class="relative z-10">
                        <div class="flex items-start justify-between mb-6">
                            <div class="w-12 h-12 glass-nav rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <span class="px-3 py-1 bg-white/50 backdrop-blur-md border border-white/40 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm">
                                ${language}
                            </span>
                        </div>
                        
                        <h3 class="text-2xl font-black text-slate-900 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors" title="${repo.name}">
                            ${repo.name.replace(/-/g, ' ').toUpperCase()}
                        </h3>
                        
                        <p class="text-slate-500 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                            ${description}
                        </p>
                    </div>

                    <div class="pt-6 border-t border-slate-200/50 mt-auto relative z-10">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                Updated: ${date}
                            </span>
                        </div>
                        
                        <div class="flex items-center gap-4">
                            <button class="flex-1 btn-secondary py-3 text-[10px] tracking-widest hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
                                EXPLORE NODE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderError() {
        projectsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="inline-block bg-red-50 text-red-500 px-6 py-4 rounded-xl">
                    <p class="font-bold">Unable to load projects at the moment.</p>
                    <p class="text-xs mt-1 opacity-75">Please check your connection or try again later.</p>
                </div>
            </div>
        `;
    }

    // --- Modal Logic ---

    function openModal(repo) {
        currentRepo = repo;

        // Populate Info
        modalTitle.textContent = repo.name.replace(/-/g, ' ').toUpperCase();
        modalSubtitle.textContent = repo.language || 'PROJECT';
        modalDesc.textContent = repo.description || 'No description provided for this project.';

        // Buttons
        modalBtnDemo.href = repo.homepage || '#';
        modalBtnGithub.href = repo.html_url;

        if (!repo.homepage) {
            modalBtnDemo.classList.add('opacity-50', 'pointer-events-none', 'grayscale');
            modalBtnDemo.textContent = 'NO LIVE DEMO';
        } else {
            modalBtnDemo.classList.remove('opacity-50', 'pointer-events-none', 'grayscale');
            modalBtnDemo.textContent = 'OPEN LIVE DEMO';
        }

        // Default Sandbox View: Live Preview if available, else Code
        if (repo.homepage) {
            loadIframe(repo.homepage, 'live');
        } else {
            loadCodeSandbox(repo);
        }

        // Show Modal
        modal.classList.remove('hidden');
        // Small delay for transition
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalWindow.classList.remove('scale-95');
            modalWindow.classList.add('scale-100');
        }, 10);

        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.add('opacity-0');
        modalWindow.classList.remove('scale-100');
        modalWindow.classList.add('scale-95');

        setTimeout(() => {
            modal.classList.add('hidden');
            modalIframe.src = ''; // Stop video/scripts
            document.body.style.overflow = '';
        }, 300);
    }

    // --- Sandbox Logic ---

    function loadIframe(url, mode) {
        // Reset UI
        modalIframe.classList.add('opacity-0');
        iframeLoader.classList.remove('hidden');
        iframeFallback.classList.add('hidden');

        // Update Buttons state
        if (mode === 'live') {
            btnViewLive.classList.add('border-blue-500', 'bg-blue-50', 'text-blue-600');
            btnViewCode.classList.remove('border-blue-500', 'bg-blue-50', 'text-blue-600');
        } else {
            btnViewCode.classList.add('border-blue-500', 'bg-blue-50', 'text-blue-600');
            btnViewLive.classList.remove('border-blue-500', 'bg-blue-50', 'text-blue-600');
        }

        modalIframe.src = url;

        modalIframe.onload = () => {
            iframeLoader.classList.add('hidden');
            modalIframe.classList.remove('opacity-0');
        };

        // If it takes too long (e.g. refused connection), showing fallback isn't easy via JS due to CORS.
        // We rely on visual cue or user using the "Open in New Tab" fallback which we show if "load" doesn't fire fast or we want to handle errors.
        // For now, simpler is better.
    }

    function loadCodeSandbox(repo) {
        // Construct StackBlitz URL
        // Format: https://stackblitz.com/github/{user}/{repo}?embed=1
        const sbUrl = `https://stackblitz.com/github/${repo.full_name}?embed=1&theme=light&hideNavigation=1`;
        loadIframe(sbUrl, 'code');

        // Setup fallback link just in case
        modalBtnFallback.href = repo.html_url;
    }

    // Event Listeners
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    btnViewLive.addEventListener('click', () => {
        if (currentRepo && currentRepo.homepage) {
            loadIframe(currentRepo.homepage, 'live');
        } else {
            alert('This project does not have a linked homepage for live preview.');
        }
    });

    btnViewCode.addEventListener('click', () => {
        if (currentRepo) loadCodeSandbox(currentRepo);
    });

    // Initialize
    fetchProjects();
});
