// ── Page Navigation ──
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const page = document.getElementById(id);
  if (page) { page.classList.add('active'); }

  document.querySelectorAll(`[data-page="${id}"]`).forEach(n => n.classList.add('active'));

  // update hash
  history.replaceState(null, '', '#' + id);

  // close mobile menu
  document.querySelector('.mobile-menu')?.classList.remove('open');

  // scroll to top
  window.scrollTo(0, 0);
}

// ── Init on load ──
document.addEventListener('DOMContentLoaded', () => {
  const hash = location.hash.replace('#', '') || 'home';
  showPage(hash);

  // hamburger toggle
  document.querySelector('.hamburger')?.addEventListener('click', () => {
    document.querySelector('.mobile-menu')?.classList.toggle('open');
  });

  // typing animation on hero
  typeLoop();

  // animate skill bars
  observeSkills();
});

// ── Typing effect ──
const roles = ['Cybersecurity Enthusiast', 'Ethical Hacker', 'Malware Analyst', 'Digital Forensics Expert', 'Python Developer'];
let ri = 0, ci = 0, deleting = false;

function typeLoop() {
  const el = document.getElementById('typed');
  if (!el) return;
  const word = roles[ri];
  if (!deleting) {
    el.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    el.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 55 : 90);
}

// ── Skill bar observer ──
function observeSkills() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w;
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => { b.style.width = '0'; obs.observe(b); });
}

// ── Terminal cycling commands ──
const cmds = ['whoami --cyber', 'nmap -sV target.local', 'python3 threathunter.py --scan', 'cat /etc/skills | grep malware'];
let cmdI = 0;
function nextCmd() {
  const el = document.getElementById('terminal-cmd');
  if (!el) return;
  cmdI = (cmdI + 1) % cmds.length;
  el.style.opacity = 0;
  setTimeout(() => { el.textContent = cmds[cmdI]; el.style.opacity = 1; }, 300);
}
setInterval(nextCmd, 3000);
