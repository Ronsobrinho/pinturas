document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                // Fecha o menu mobile ao clicar em um link
                if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                }
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animação do header ao rolar
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Contador de estatísticas
    const stats = document.querySelectorAll('.count');
    const statsSection = document.querySelector('.services-cta');
    
    if (stats.length && statsSection) {
        let counted = false;
        
        window.addEventListener('scroll', function() {
            if (isInViewport(statsSection) && !counted) {
                counted = true;
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    let count = 0;
                    const updateCount = () => {
                        const increment = target / 50;
                        if (count < target) {
                            count += increment;
                            stat.textContent = Math.ceil(count);
                            setTimeout(updateCount, 30);
                        } else {
                            stat.textContent = target;
                        }
                    };
                    updateCount();
                });
            }
        });
    }

    // Filtro de portfolio
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length && portfolioItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove classe active de todos os botões
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Adiciona classe active ao botão clicado
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Modal de Projetos
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const projetoModal = document.getElementById('projetoModal');
    
    if (portfolioLinks.length && projetoModal) {
        portfolioLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const portfolioItem = this.closest('.portfolio-item');
                const img = portfolioItem.querySelector('img').src;
                const title = portfolioItem.querySelector('h3').textContent;
                const category = portfolioItem.querySelector('p').textContent;
                
                // Preencher dados do modal
                document.getElementById('projetoModalImage').src = img;
                document.getElementById('projetoModalTitle').textContent = title;
                document.getElementById('projetoModalCategory').textContent = category;
                
                // Dados fictícios para demonstração
                document.getElementById('projetoModalClient').textContent = 'Cliente Exemplo';
                document.getElementById('projetoModalDate').textContent = 'Janeiro 2023';
                document.getElementById('projetoModalLocation').textContent = 'Andradina - SP';
                document.getElementById('projetoModalDescription').textContent = 'Este projeto envolveu a renovação completa da pintura externa e interna. Utilizamos tintas de alta qualidade e técnicas especiais para garantir um acabamento perfeito e duradouro.';
                
                projetoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }
    
    // Fechar Modais
    const closeModals = document.querySelectorAll('.close-modal');
    if (closeModals.length) {
        closeModals.forEach(closeBtn => {
            closeBtn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Botão Back to Top
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animação de fade-in para as seções
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-out');
        observer.observe(section);
    });

    // Função para verificar se elemento está visível na viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
}); 