// ── Smooth scroll ──
    function scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });

      setActiveDock(id);
    }

    // ── Active dock icon on scroll ──
    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
    const dockIcons = document.querySelectorAll('.dock-icon');

    function setActiveDock(id) {
      const idx = sections.indexOf(id);
      if (idx === -1) return;

      dockIcons.forEach(i => i.classList.remove('active'));
      dockIcons[idx].classList.add('active');

      dockIcons.forEach((icon, iconIndex) => {
        const dot = icon.querySelector('.dock-dot');
        if (dot) dot.style.opacity = iconIndex === idx ? '1' : '0';
      });
    }

    function updateActiveDock() {
      const anchor = window.innerHeight * 0.35;
      let activeId = sections[0];

      sections.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.top <= anchor && rect.bottom > anchor) {
          activeId = id;
        }
      });

      setActiveDock(activeId);
    }

    window.addEventListener('scroll', updateActiveDock, { passive: true });
    window.addEventListener('load', updateActiveDock);

    // ── Scroll reveal ──
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-category, .project-card, .fact-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      revealObserver.observe(el);
    });