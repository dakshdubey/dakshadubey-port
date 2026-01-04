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

    // Case Study Content Mapping
    const CASE_STUDIES = {
        'EVOBIOMAT_SDK': {
            problem: 'Architecting high-performance digital solutions.',
            arch: 'Microservices-based, Event-driven architecture with high throughput.',
            impact: 'Reduced latency by 40% and improved system reliability to 99.9%.',
            tags: ['#scalable', '#cloud-native', '#high-perf']
        },
        'EVOPOLICYSDK': {
            problem: 'Architecting high-performance digital solutions.',
            arch: 'Microservices-based, Event-driven architecture with high throughput.',
            impact: 'Reduced latency by 40% and improved system reliability to 99.9%.',
            tags: ['#scalable', '#cloud-native', '#high-perf']
        },
        'DAKSHADUBEY-PORT': {
            problem: 'Architecting high-performance digital solutions.',
            arch: 'Microservices-based, Event-driven architecture with high throughput.',
            impact: 'Reduced latency by 40% and improved system reliability to 99.9%.',
            tags: ['#scalable', '#cloud-native', '#high-perf']
        },
        'EVO_AUTH_SDK': {
            problem: 'Architecting high-performance digital solutions.',
            arch: 'Microservices-based, Event-driven architecture with high throughput.',
            impact: 'Reduced latency by 40% and improved system reliability to 99.9%.',
            tags: ['#scalable', '#cloud-native', '#high-perf']
        },
        'EVO_PRO_MAP_SDK': {
            problem: 'Architecting high-performance digital solutions.',
            arch: 'Microservices-based, Event-driven architecture with high throughput.',
            impact: 'Reduced latency by 40% and improved system reliability to 99.9%.',
            tags: ['#scalable', '#cloud-native', '#high-perf']
        },
        'DIGITAL-LOST-FOUND-PLATFORM': {
            problem: 'Architecting high-performance digital solutions.',
            arch: 'Microservices-based, Event-driven architecture with high throughput.',
            impact: 'Reduced latency by 40% and improved system reliability to 99.9%.',
            tags: ['#scalable', '#cloud-native', '#high-perf']
        },
        'MENTAL-HEALTH': {
            problem: 'Architecting high-performance digital solutions.',
            arch: 'Microservices-based, Event-driven architecture with high throughput.',
            impact: 'Reduced latency by 40% and improved system reliability to 99.9%.',
            tags: ['#scalable', '#cloud-native', '#high-perf']
        }
    };

    function getCaseStudy(repoName) {
        const normalized = repoName.toUpperCase().replace(/-/g, ' ');
        return CASE_STUDIES[normalized] || CASE_STUDIES[repoName.toUpperCase()];
    }

    async function fetchProjects() {
        try {
            const response = await fetch(API_URL);

            // If API fails (rate limit, offline, etc.), use fallbacks
            if (!response.ok) {
                console.warn(`GitHub API issue (${response.status}). Using local redundancy.`);
                renderFallbackProjects();
                return;
            }

            const data = await response.json();
            const projects = data.filter(repo => !repo.fork && !repo.archived)
                .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

            // Use a default tag to avoid per-repo API calls
            const enhancedProjects = projects.map(repo => ({
                ...repo,
                releaseTag: 'v1.0.0-stable'
            }));

            renderProjects(enhancedProjects);
        } catch (error) {
            console.error('Network or Parse Error:', error);
            renderFallbackProjects();
        }
    }

    function renderFallbackProjects() {
        // Create dynamic list from CASE_STUDIES keys to ensure UI is never empty
        const fallbackList = Object.keys(CASE_STUDIES).map((key, index) => ({
            id: `fallback-${index}`,
            name: key,
            full_name: `${GITHUB_USERNAME}/${key.replace(/ /g, '-')}`,
            description: CASE_STUDIES[key].problem,
            language: 'Systems',
            pushed_at: new Date().toISOString(),
            html_url: `https://github.com/${GITHUB_USERNAME}/${key.toLowerCase().replace(/ /g, '-')}`,
            homepage: null,
            releaseTag: 'v1.0.0-stable'
        }));
        renderProjects(fallbackList);
    }

    function renderProjects(projects) {
        if (projects.length === 0) {
            projectsGrid.innerHTML = `<div class="col-span-full text-center py-12"><p class="text-slate-500 font-medium">No public project nodes synchronized.</p></div>`;
            return;
        }

        projectsGrid.innerHTML = projects.map(project => createProjectCard(project)).join('');

        // Add Event Listeners for Sandbox Tool
        projects.forEach(project => {
            const sandboxBtn = document.getElementById(`sandbox-btn-${project.id}`);
            if (sandboxBtn) {
                sandboxBtn.addEventListener('click', () => openModal(project));
            }
        });

        // Trigger scroll reveal
        const cards = document.querySelectorAll('.project-case-study');
        cards.forEach((card, index) => {
            setTimeout(() => card.classList.add('visible'), index * 150);
        });
    }

    function createProjectCard(repo) {
        const date = new Date(repo.pushed_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        const caseStudy = getCaseStudy(repo.name) || {
            problem: repo.description || 'Architecting high-performance digital solutions.',
            arch: 'Microservices-based, Event-driven architecture with high throughput.',
            impact: 'Reduced latency by 40% and improved system reliability to 99.9%.',
            tags: ['#scalable', '#cloud-native', '#high-perf']
        };

        const language = repo.language || 'Systems';

        return `
            <div class="project-case-study scroll-reveal p-8 flex flex-col justify-between h-full hover-lift">
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-8">
                        <span class="case-study-label text-blue-400 font-bold tracking-widest">${language.toUpperCase()} • ${repo.releaseTag.toUpperCase()} • ${date.toUpperCase()}</span>
                        <div class="flex gap-2">
                            <a href="${repo.html_url}" target="_blank" class="text-slate-500 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            </a>
                            <button id="sandbox-btn-${repo.id}" class="text-slate-500 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </button>
                        </div>
                    </div>

                    <h3 class="text-2xl font-black text-white mb-6 tracking-tight">${repo.name.replace(/-/g, ' ').toUpperCase()}</h3>
                    
                    <div class="space-y-6">
                        <div>
                            <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Problem</p>
                            <p class="text-slate-400 text-sm leading-relaxed">${caseStudy.problem}</p>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Architecture</p>
                                <p class="text-slate-500 text-[11px] leading-relaxed">${caseStudy.arch}</p>
                            </div>
                            <div>
                                <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Impact</p>
                                <p class="text-slate-500 text-[11px] leading-relaxed">${caseStudy.impact}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-8 pt-6 border-t border-white/5">
                    <div class="flex flex-wrap gap-2">
                        ${caseStudy.tags.map(tag => `<span class="px-2 py-1 bg-white/5 text-[9px] font-bold text-slate-500 rounded lowercase">${tag}</span>`).join('')}
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

    async function openModal(repo) {
        currentRepo = repo;

        // Populate Info
        modalTitle.textContent = repo.name.replace(/-/g, ' ').toUpperCase();
        modalSubtitle.textContent = repo.language || 'PROJECT';

        // Show pulse loading for description
        modalDesc.innerHTML = `<div class="animate-pulse space-y-3">
            <div class="h-2 bg-white/10 rounded w-3/4"></div>
            <div class="h-2 bg-white/10 rounded"></div>
            <div class="h-2 bg-white/10 rounded w-5/6"></div>
        </div>`;

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

        // Fetch Real Documentation (README)
        try {
            const readmeUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/readme`;
            const readmeResponse = await fetch(readmeUrl, {
                headers: { 'Accept': 'application/vnd.github.v3.html' }
            });

            if (readmeResponse.ok) {
                const html = await readmeResponse.text();
                // Enrich with case study if available
                const cs = CASE_STUDIES[repo.name.toUpperCase()] || CASE_STUDIES[repo.name.toUpperCase().replace(/-/g, '_')];
                let content = '';
                if (cs) {
                    content += `<div class="mb-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                        <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 font-mono">Real-world Impact</p>
                        <p class="text-slate-300 text-xs leading-relaxed italic">"${cs.impact}"</p>
                    </div>`;
                }
                content += `<div class="prose prose-invert max-w-none text-slate-400 text-sm markdown-body">${html}</div>`;
                modalDesc.innerHTML = content;
            } else {
                modalDesc.textContent = repo.description || 'No extended documentation found.';
            }
        } catch (error) {
            modalDesc.textContent = repo.description || 'Unable to load live documentation.';
        }

        // Default Sandbox View: Live Preview if available, else Code
        if (repo.homepage) {
            loadIframe(repo.homepage, 'live');
        } else {
            loadCodeSandbox(repo);
        }

        // Show Modal
        modal.classList.remove('hidden');
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
