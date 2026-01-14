document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');
    const GITHUB_USERNAME = 'dakshdubey';
    // Increased limit as requested to show all active repositories
    const REPO_LIMIT = 100;
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

    // --- Data Fetching Logic ---

    async function fetchProjects() {
        try {
            // Check LocalStorage Cache to save API calls
            // key v3 to invalidate previous 6-item cache
            const cacheKey = 'daksha_port_projects_v3';
            const cachedData = localStorage.getItem(cacheKey);
            const cacheTime = localStorage.getItem(cacheKey + '_time');

            // Cache valid for 15 minutes
            if (cachedData && cacheTime && (Date.now() - cacheTime < 15 * 60 * 1000)) {
                console.log('Using cached project data');
                renderProjects(JSON.parse(cachedData));
                return;
            }

            const response = await fetch(API_URL);

            if (!response.ok) {
                // If rate limited or error, try to show cached data even if old
                if (cachedData) {
                    console.warn(`GitHub API error (${response.status}). Using stale cache.`);
                    renderProjects(JSON.parse(cachedData));
                    return;
                }
                throw new Error(`GitHub API Error: ${response.status}`);
            }

            const data = await response.json();

            // Filter and Sort
            let projects = data
                .filter(repo => !repo.fork && !repo.archived)
                .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
                .slice(0, REPO_LIMIT);

            // Fetch READMEs and Topics in parallel
            // This transforms the repo objects with "real data"
            projects = await Promise.all(projects.map(async (repo) => {
                return await enhanceRepoWithReadme(repo);
            }));

            // Save to Cache
            localStorage.setItem(cacheKey, JSON.stringify(projects));
            localStorage.setItem(cacheKey + '_time', Date.now());

            renderProjects(projects);

        } catch (error) {
            console.error('Project Load Error:', error);
            renderError(error.message);
        }
    }

    async function enhanceRepoWithReadme(repo) {
        // Defaults
        const enhanced = {
            ...repo,
            parsedData: {
                problem: repo.description || 'Solving complex digital challenges.',
                arch: 'Modern Full-Stack Architecture.',
                impact: 'High-performance reliable systems.',
                tags: repo.topics && repo.topics.length > 0 ? repo.topics : ['#software', '#development']
            }
        };

        try {
            // Fetch README
            const readmeRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/readme`, {
                headers: { 'Accept': 'application/vnd.github.v3.raw' } // Get raw markdown
            });

            if (readmeRes.ok) {
                const markdown = await readmeRes.text();
                const parsed = parseReadme(markdown);

                // Merge parsed data if found
                if (parsed.problem) enhanced.parsedData.problem = parsed.problem;
                if (parsed.arch) enhanced.parsedData.arch = parsed.arch;
                if (parsed.impact) enhanced.parsedData.impact = parsed.impact;
                if (parsed.tags && parsed.tags.length > 0) enhanced.parsedData.tags = parsed.tags; // Override if tags found in readme, else use repo topics

                // Store full readme for modal
                enhanced.readmeContent = markdown;
            }
        } catch (e) {
            console.warn(`Could not fetch README for ${repo.name}`, e);
        }

        return enhanced;
    }

    function parseReadme(md) {
        // Simple Regex Parser for specific sections
        // Looks for "## Problem", "## Architecture", "## Impact" (case insensitive)
        const result = {};

        const extractSection = (header) => {
            const regex = new RegExp(`#{1,3}\\s*${header}[\\s\\S]*?(?=(?:#{1,3}\\s)|$)`, 'i');
            const match = md.match(regex);
            if (match) {
                // Remove header and trim
                return match[0].replace(new RegExp(`#{1,3}\\s*${header}`, 'i'), '').trim();
            }
            return null;
        };

        const problem = extractSection('Problem') || extractSection('Challenge') || extractSection('Overview');
        const arch = extractSection('Architecture') || extractSection('Tech Stack') || extractSection('Solution');
        const impact = extractSection('Impact') || extractSection('Results') || extractSection('Features');

        if (problem) result.problem = truncate(problem, 150);
        if (arch) result.arch = truncate(arch, 150);
        if (impact) result.impact = truncate(impact, 150);

        return result;
    }

    function truncate(str, n) {
        return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    }

    function renderProjects(projects) {
        if (projects.length === 0) {
            projectsGrid.innerHTML = `<div class="col-span-full text-center py-12"><p class="text-slate-500 font-medium">No projects found.</p></div>`;
            return;
        }

        projectsGrid.innerHTML = projects.map(project => createProjectCard(project)).join('');

        // Event Listeners for Sandbox
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
        const { problem, arch, impact, tags } = repo.parsedData;
        const language = repo.language || 'Systems';

        // Format tags
        const tagsHtml = tags.slice(0, 3).map(tag =>
            `<span class="px-2 py-1 bg-white/5 text-[9px] font-bold text-slate-500 rounded lowercase">#${tag}</span>`
        ).join('');

        return `
            <div class="project-case-study scroll-reveal p-8 flex flex-col justify-between h-full hover-lift">
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-8">
                        <span class="case-study-label text-blue-400 font-bold tracking-widest">${language.toUpperCase()} • ${date.toUpperCase()}</span>
                        <div class="flex gap-2">
                            <a href="${repo.html_url}" target="_blank" class="text-slate-500 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            </a>
                            <button id="sandbox-btn-${repo.id}" class="text-slate-500 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </button>
                        </div>
                    </div>

                    <h3 class="text-2xl font-black text-white mb-6 tracking-tight leading-tight">${repo.name.replace(/-/g, ' ').toUpperCase()}</h3>
                    
                    <div class="space-y-6">
                        <div>
                            <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Problem / Overview</p>
                            <p class="text-slate-400 text-sm leading-relaxed line-clamp-2">${problem}</p>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Architecture</p>
                                <p class="text-slate-500 text-[11px] leading-relaxed line-clamp-3">${arch}</p>
                            </div>
                            <div>
                                <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Impact / Features</p>
                                <p class="text-slate-500 text-[11px] leading-relaxed line-clamp-3">${impact}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-8 pt-6 border-t border-white/5">
                    <div class="flex flex-wrap gap-2">
                        ${tagsHtml}
                    </div>
                </div>
            </div>
        `;
    }

    function renderError(msg) {
        projectsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="inline-block bg-red-500/10 text-red-400 px-6 py-4 rounded-xl border border-red-500/20">
                    <p class="font-bold">System Sync Failed</p>
                    <p class="text-xs mt-1 opacity-75">${msg}</p>
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

        // Check availability of demo
        if (!repo.homepage) {
            modalBtnDemo.classList.add('opacity-50', 'pointer-events-none', 'grayscale');
            modalBtnDemo.textContent = 'NO LIVE DEMO';
            modalBtnDemo.href = '#';
        } else {
            modalBtnDemo.classList.remove('opacity-50', 'pointer-events-none', 'grayscale');
            modalBtnDemo.textContent = 'OPEN LIVE DEMO';
            modalBtnDemo.href = repo.homepage;
        }
        modalBtnGithub.href = repo.html_url;

        // Render Content
        let content = '';

        // Add Impact Highlight if available
        if (repo.parsedData && repo.parsedData.impact && repo.parsedData.impact !== 'High-performance reliable systems.') {
            content += `<div class="mb-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                 <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 font-mono">Real-world Impact</p>
                 <p class="text-slate-300 text-xs leading-relaxed italic">"${repo.parsedData.impact}"</p>
             </div>`;
        }

        // Render Markdown
        // If we already fetched the README content during list generation, use it
        // Otherwise, we might have to fetch it now (but we likely have it or parsed data)

        let markdownHTML = '';
        if (repo.readmeContent) {
            // Very simple markdown to HTML converter for display
            // In a real app we'd use a library like marked.js
            // Here we just display the raw text or wrap paragraphs
            // Since we can't import libraries easily without CDN, let's use a simple strategy
            // or if the user provided marked.js in head (they didn't), we rely on simple formatting

            // However, the original code used github's HTML accept header. 
            // Our new fetch uses raw markdown for parsing. 
            // Let's re-fetch as HTML for the modal if we want pretty display?
            // OR just display the text.

            // Let's try to fetch HTML version if we opened the modal, 
            // but we can fallback to repo.description if that fails.

            modalDesc.innerHTML = `<div class="animate-pulse space-y-3"><div class="h-2 bg-white/10 rounded w-3/4"></div></div>`;

            try {
                const readmeRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/readme`, {
                    headers: { 'Accept': 'application/vnd.github.v3.html' }
                });
                if (readmeRes.ok) {
                    markdownHTML = await readmeRes.text();
                    content += `<div class="prose prose-invert max-w-none text-slate-400 text-sm markdown-body">${markdownHTML}</div>`;
                } else {
                    content += `<p>${repo.description || 'No detailed documentation.'}</p>`;
                }
            } catch (e) {
                content += `<p>${repo.description || 'No detailed documentation.'}</p>`;
            }

        } else {
            content += `<p>${repo.description || 'No description available.'}</p>`;
        }

        modalDesc.innerHTML = content;

        // Sandbox View
        if (repo.homepage) {
            loadIframe(repo.homepage, 'live');
        } else {
            loadCodeSandbox(repo);
        }

        // Show Modal
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalWindow.classList.remove('scale-100');
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
            modalIframe.src = '';
            document.body.style.overflow = '';
        }, 300);
    }

    function loadIframe(url, mode) {
        modalIframe.classList.add('opacity-0');
        iframeLoader.classList.remove('hidden');
        iframeFallback.classList.add('hidden');

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
    }

    function loadCodeSandbox(repo) {
        const sbUrl = `https://stackblitz.com/github/${repo.full_name}?embed=1&theme=light&hideNavigation=1`;
        loadIframe(sbUrl, 'code');
        modalBtnFallback.href = repo.html_url;
    }

    // Event Listeners
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    btnViewLive.addEventListener('click', () => {
        if (currentRepo && currentRepo.homepage) {
            loadIframe(currentRepo.homepage, 'live');
        } else {
            alert('No live demo available.');
        }
    });

    btnViewCode.addEventListener('click', () => {
        if (currentRepo) loadCodeSandbox(currentRepo);
    });

    // Initialize
    fetchProjects();
});
