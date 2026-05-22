/* ================================================================
   FEFEH — PORTFOLIO
   Script único, organizado por módulos auto-executáveis.
   Sem dependências externas.
   ================================================================ */

(() => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* ============================================================
       1. ANO DINÂMICO NO FOOTER
       ============================================================ */
    const footerYear = document.getElementById('footerYear');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    /* ============================================================
       2. TOGGLE TEMA DARK/LIGHT (persistido em localStorage)
       ============================================================ */
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    const storedTheme = localStorage.getItem('fefeh-theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
        html.setAttribute('data-theme', storedTheme);
    }
    // dark é padrão (já no HTML)

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('fefeh-theme', next);
        });
    }

    /* ============================================================
       3. HAMBURGER MOBILE
       ============================================================ */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const closeMobileMenu = () => {
        hamburger?.classList.remove('is-open');
        mobileMenu?.classList.remove('is-open');
        hamburger?.setAttribute('aria-expanded', 'false');
        mobileMenu?.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('is-open');
            mobileMenu.classList.toggle('is-open');
            hamburger.setAttribute('aria-expanded', String(isOpen));
            mobileMenu.setAttribute('aria-hidden', String(!isOpen));
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    /* ============================================================
       4. HEADER HIDE-ON-SCROLL-DOWN, SHOW-ON-SCROLL-UP
       ============================================================ */
    const header = document.getElementById('siteHeader');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const onHeaderScroll = () => {
        const currentY = window.scrollY;
        if (currentY > lastScrollY && currentY > 100) {
            header?.classList.add('is-hidden');
        } else {
            header?.classList.remove('is-hidden');
        }
        lastScrollY = currentY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(onHeaderScroll);
            ticking = true;
        }
    }, { passive: true });

    /* ============================================================
       5. BACK-TO-TOP (aparece da seção 2 em diante)
       ============================================================ */
    const backToTop = document.getElementById('backToTop');
    const heroSection = document.getElementById('hero');

    if (backToTop && heroSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    backToTop.classList.remove('is-visible');
                } else {
                    backToTop.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(heroSection);

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    /* ============================================================
       6. INDICADOR DE SEÇÃO ATIVA NO MENU
       ============================================================ */
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length && navLinks.length) {
        const setActiveLink = (id) => {
            navLinks.forEach(link => {
                const isActive = link.getAttribute('href') === `#${id}`;
                link.classList.toggle('is-active', isActive);
            });
        };

        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        }, {
            rootMargin: '-40% 0px -55% 0px',
            threshold: 0
        });

        sections.forEach(section => sectionObserver.observe(section));
    }

    /* ============================================================
       7. SCROLL REVEAL (elementos .reveal)
       ============================================================ */
    const revealEls = document.querySelectorAll('.reveal');

    if (revealEls.length) {
        if (prefersReducedMotion) {
            revealEls.forEach(el => el.classList.add('is-visible'));
        } else {
            const revealObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

            revealEls.forEach(el => revealObserver.observe(el));
        }
    }

    /* ============================================================
       8. HERO — TYPEWRITER NA TAGLINE
       ============================================================ */
    const tagline = document.getElementById('heroTagline');

    if (tagline) {
        const text = tagline.dataset.text || '';
        const cursorBlink = tagline.querySelector('.cursor-blink');

        if (prefersReducedMotion || !text) {
            tagline.innerHTML = text + (cursorBlink ? '<span class="cursor-blink"></span>' : '');
        } else {
            tagline.innerHTML = '<span class="cursor-blink"></span>';
            let i = 0;
            const speed = 40;
            const startDelay = 600;

            const typeChar = () => {
                if (i <= text.length) {
                    tagline.innerHTML = text.slice(0, i) + '<span class="cursor-blink"></span>';
                    i++;
                    setTimeout(typeChar, speed);
                }
            };
            setTimeout(typeChar, startDelay);
        }
    }

    /* ============================================================
       9. CONTADOR DE STATS (anima 0 → target ao entrar na viewport)
       ============================================================ */
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    if (statNumbers.length) {
        const statObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);

                if (prefersReducedMotion) {
                    el.textContent = `${target}+`;
                } else {
                    let current = 0;
                    const step = Math.max(1, Math.round(target / 40));
                    const tick = () => {
                        current += step;
                        if (current >= target) {
                            el.textContent = `${target}+`;
                        } else {
                            el.textContent = current;
                            requestAnimationFrame(tick);
                        }
                    };
                    tick();
                }

                statObserver.unobserve(el);
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => statObserver.observe(el));
    }

    /* ============================================================
       10. CURSOR CUSTOMIZADO (desktop apenas)
       ============================================================ */
    const cursor = document.getElementById('customCursor');

    if (cursor && isFinePointer && !prefersReducedMotion) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            // smoothing
            cursorX += (mouseX - cursorX) * 0.22;
            cursorY += (mouseY - cursorY) * 0.22;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // estado hover em elementos interativos
        const hoverables = document.querySelectorAll('a, button, [role="button"], .work-trigger, summary');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
        });
    } else if (cursor) {
        cursor.style.display = 'none';
    }

    /* ============================================================
       11. PORTFÓLIO — FILTRO POR CATEGORIA
       ============================================================ */
    const filterPills = document.querySelectorAll('.filter-pill');
    const works = document.querySelectorAll('.work');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => {
                p.classList.remove('active');
                p.setAttribute('aria-selected', 'false');
            });
            pill.classList.add('active');
            pill.setAttribute('aria-selected', 'true');

            const filter = pill.dataset.filter;

            works.forEach(work => {
                const category = work.dataset.category;
                const matches = filter === 'todos' || category === filter;
                work.classList.toggle('is-hidden', !matches);
            });
        });
    });

    /* ============================================================
       12. LIGHTBOX — abrir, navegar, fechar
       ============================================================ */
    const lightbox = document.getElementById('lightbox');
    const lbImage = document.getElementById('lightboxImage');
    const lbTitle = document.getElementById('lightboxTitle');
    const lbCategory = document.getElementById('lightboxCategory');
    const lbYear = document.getElementById('lightboxYear');
    const lbDescription = document.getElementById('lightboxDescription');
    const lbTools = document.getElementById('lightboxTools');
    const lbTags = document.getElementById('lightboxTags');
    const lbCounter = document.getElementById('lightboxCounter');
    const lbClose = document.getElementById('lightboxClose');
    const lbPrev = lightbox?.querySelector('.lightbox-prev');
    const lbNext = lightbox?.querySelector('.lightbox-next');

    let currentImages = [];
    let currentIndex = 0;

    const renderLightboxImage = () => {
        if (!lbImage || !currentImages.length) return;
        lbImage.src = currentImages[currentIndex];
        lbImage.alt = `${lbTitle?.textContent || 'Trabalho'} — imagem ${currentIndex + 1}`;
        if (lbCounter) {
            lbCounter.textContent = currentImages.length > 1 ? `${currentIndex + 1} / ${currentImages.length}` : '';
        }
        if (lbPrev && lbNext) {
            const hasMulti = currentImages.length > 1;
            lbPrev.style.display = hasMulti ? 'grid' : 'none';
            lbNext.style.display = hasMulti ? 'grid' : 'none';
        }
    };

    const openLightbox = (trigger) => {
        if (!lightbox) return;

        const data = trigger.dataset;
        const images = JSON.parse(data.images || '[]');

        currentImages = images;
        currentIndex = 0;

        if (lbTitle) lbTitle.textContent = data.title || '';
        if (lbCategory) lbCategory.textContent = data.categoryLabel || '';
        if (lbYear) lbYear.textContent = data.year || '';

        if (lbDescription) {
            lbDescription.textContent = data.description || '';
            lbDescription.style.display = data.description ? 'block' : 'none';
        }

        if (lbTools) {
            lbTools.textContent = data.tools || '';
            lbTools.style.display = data.tools ? 'block' : 'none';
        }

        if (lbTags) {
            lbTags.innerHTML = '';
            const tagsAttr = trigger.closest('.work')?.dataset.tags;
            if (tagsAttr) {
                tagsAttr.split(',').map(t => t.trim()).forEach(tag => {
                    const li = document.createElement('li');
                    li.textContent = `#${tag}`;
                    lbTags.appendChild(li);
                });
                lbTags.style.display = 'flex';
            } else {
                lbTags.style.display = 'none';
            }
        }

        renderLightboxImage();

        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        lbClose?.focus();
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    const navigateLightbox = (dir) => {
        if (!currentImages.length) return;
        currentIndex = (currentIndex + dir + currentImages.length) % currentImages.length;
        renderLightboxImage();
    };

    document.querySelectorAll('.work-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => openLightbox(trigger));
    });

    lbClose?.addEventListener('click', closeLightbox);
    lbPrev?.addEventListener('click', () => navigateLightbox(-1));
    lbNext?.addEventListener('click', () => navigateLightbox(1));

    lightbox?.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', e => {
        if (!lightbox?.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    /* ============================================================
       13. CARROSSEL DE DEPOIMENTOS
       ============================================================ */
    const carousel = document.getElementById('testimonialsCarousel');
    const track = document.getElementById('testimonialsTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const carouselPrev = carousel?.querySelector('.carousel-prev');
    const carouselNext = carousel?.querySelector('.carousel-next');

    if (carousel && track) {
        const slides = track.querySelectorAll('.testimonial');
        const slideCount = slides.length;
        let activeIndex = 0;
        let autoplayTimer = null;

        // Cria dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot';
                dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
                dot.setAttribute('role', 'tab');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });
        }

        const updateDots = () => {
            const dots = dotsContainer?.querySelectorAll('.carousel-dot');
            dots?.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
        };

        const goToSlide = (i) => {
            activeIndex = (i + slideCount) % slideCount;
            track.style.transform = `translateX(-${activeIndex * 100}%)`;
            updateDots();
            resetAutoplay();
        };

        // Aplicar transform inicial e CSS para track funcionar como flexível
        track.style.transition = prefersReducedMotion ? 'none' : 'transform 0.5s var(--ease, ease)';
        track.style.willChange = 'transform';
        track.style.overflow = 'visible';

        carouselPrev?.addEventListener('click', () => goToSlide(activeIndex - 1));
        carouselNext?.addEventListener('click', () => goToSlide(activeIndex + 1));

        const startAutoplay = () => {
            if (prefersReducedMotion) return;
            autoplayTimer = setInterval(() => goToSlide(activeIndex + 1), 6000);
        };

        const resetAutoplay = () => {
            if (autoplayTimer) clearInterval(autoplayTimer);
            startAutoplay();
        };

        // Pausa autoplay no hover
        carousel.addEventListener('mouseenter', () => {
            if (autoplayTimer) clearInterval(autoplayTimer);
        });
        carousel.addEventListener('mouseleave', startAutoplay);

        startAutoplay();
    }

    /* ============================================================
       14. FAQ — APENAS 1 ABERTO POR VEZ
       ============================================================ */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                faqItems.forEach(other => {
                    if (other !== item) other.open = false;
                });
            }
        });
    });

    /* ============================================================
       15. SWORD SLASH EASTER EGG (ao chegar no footer)
       ============================================================ */
    const slash = document.getElementById('swordSlash');
    const footer = document.getElementById('siteFooter');
    let slashTriggered = false;

    if (slash && footer && !prefersReducedMotion) {
        const footerObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !slashTriggered) {
                    slashTriggered = true;
                    slash.classList.add('is-active');
                    setTimeout(() => {
                        slash.classList.remove('is-active');
                        // Permite re-trigger se o usuário rolar de volta e voltar ao footer
                        setTimeout(() => { slashTriggered = false; }, 2000);
                    }, 800);
                }
            });
        }, { threshold: 0.3 });

        footerObserver.observe(footer);
    }

    /* ============================================================
       16. SMOOTH SCROLL para links âncora (compat)
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const headerOffset = 64;
            const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({
                top,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });
    });

    /* ============================================================
       17. CONSOLE EGG (geek touch)
       ============================================================ */
    console.log('%c FEFEH ', 'background:#000;color:#fff;font-family:monospace;font-size:24px;padding:8px 16px;border:2px solid #fff;');
    console.log('%c portfolio v1.0 — feito com energético e trilha de anime ', 'color:#888;font-family:monospace;');

})();
