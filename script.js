// Rejestracja wtyczki ScrollTrigger z biblioteki GSAP
gsap.registerPlugin(ScrollTrigger);

// 1. Animacja wejściowa (Hero Section)
const heroTimeline = gsap.timeline();

heroTimeline.fromTo(".subtitle", 
    { opacity: 0, y: 20 }, 
    { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
)
.fromTo(".title", 
    { opacity: 0, y: 40 }, 
    { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 
    "-=0.6" // Rozpocznij przed końcem poprzedniej animacji
)
.fromTo(".scroll-indicator", 
    { opacity: 0 }, 
    { opacity: 0.5, duration: 1 }, 
    "-=0.4"
);

// 2. Kinematograficzne odsłanianie stref (Scrollytelling)
const zones = gsap.utils.toArray('.tactical-zone');

zones.forEach((zone) => {
    // Animacja nagłówków sekcji
    const header = zone.querySelector('.zone-header');
    
    gsap.fromTo(header, 
        { opacity: 0, x: -50 },
        { 
            opacity: 1, 
            x: 0, 
            duration: 1, 
            ease: "power2.out",
            scrollTrigger: {
                trigger: zone,
                start: "top 75%", // Rozpocznij gdy góra sekcji jest w 75% ekranu
                toggleActions: "play none none reverse" // Odtwarzaj w dół, cofaj w górę
            }
        }
    );

    // Sekwencyjne (stagger) pojawianie się kafelków Bento
    const bentoItems = zone.querySelectorAll('.bento-item');
    
    gsap.fromTo(bentoItems,
        { opacity: 0, y: 50, scale: 0.95 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15, // Opóźnienie między pojawianiem się kolejnych kafelków
            ease: "back.out(1.2)", // Lekkie "odbicie" na końcu ruchu
            scrollTrigger: {
                trigger: zone,
                start: "top 60%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Opcjonalnie: Delikatny efekt paralaksy dla kursora w sekcji Hero
document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    gsap.to(".hero-content", {
        x: x,
        y: y,
        duration: 1,
        ease: "power1.out"
    });
});
