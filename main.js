// Inicialização do GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Garantir que todos os elementos estejam visíveis por padrão
document.addEventListener('DOMContentLoaded', () => {
  gsap.set('body', { visibility: 'visible' });
  
  // Inicializa as animações com delay para garantir que tudo seja carregado
  setTimeout(() => {
    setupAnimations();
  }, 100);
});

// Configuração para navegação com scroll suave
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

// Atualiza a navegação durante o scroll
function updateNavigation() {
  const scrollPos = window.scrollY + 200;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      const currentId = section.getAttribute('id');
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Atualiza a navegação quando a página é rolada
window.addEventListener('scroll', updateNavigation);

// Configuração das transições fade entre seções
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    // Adiciona transição fade-out a todos os sections
    gsap.to(sections, {
      opacity: 0.3,
      duration: 0.3,
      ease: 'power1.out'
    });
    
    // Adiciona transição fade-in para a seção alvo
    gsap.to(targetSection, {
      opacity: 1,
      duration: 0.5,
      ease: 'power1.in',
      onComplete: () => {
        // Volta a visibilidade dos outros sections após a transição
        gsap.to(sections, {
          opacity: 1,
          duration: 0,
          overwrite: true
        });
      }
    });
    
    // Rola suavemente para a seção
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth'
    });
  });
});

// Configuração das animações
function setupAnimations() {
  // Home - animações imediatas na carga da página
  gsap.from('.hero img', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });
  
  gsap.from('.hero h1', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    delay: 0.3,
    ease: 'power2.out'
  });
  
  gsap.from('.hero p', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    delay: 0.5,
    ease: 'power2.out'
  });
  
  // Correção: Garantindo que os links de redes sociais no hero permaneçam visíveis
  gsap.from('.hero .social-links a', {
    y: 15,
    opacity: 0,
    stagger: 0.1,
    duration: 0.4,
    delay: 0.7,
    ease: 'power1.out',
    onComplete: () => {
      // Força visibilidade após a animação
      gsap.set('.hero .social-links a', { opacity: 1, y: 0, clearProps: "all" });
    }
  });
  
  // Projetos - animação baseada em scroll
  ScrollTrigger.batch('.project-card', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: true
    }),
    start: 'top bottom-=100',
    once: true
  });
  
  // Experiência - animação baseada em scroll
  ScrollTrigger.batch('.experience-photo', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: true
    }),
    start: 'top bottom-=100',
    once: true
  });
  
  ScrollTrigger.batch('.experience-item', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      x: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: true
    }),
    start: 'top bottom-=100',
    once: true
  });
  
  // Contato - animação baseada em scroll
  ScrollTrigger.batch('.contact-info', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: true
    }),
    start: 'top bottom-=100',
    once: true
  });
}

// Inicialização
window.addEventListener('load', () => {
  // Determinar a seção inicial
  const initialSection = window.location.hash ? window.location.hash.substring(1) : sections[0].id;
  
  // Ativa o link de navegação correspondente
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${initialSection}`) {
      link.classList.add('active');
    }
  });
  
  // Atualiza a navegação inicialmente
  updateNavigation();
});