import React, { useEffect, useRef } from 'react';

const CursorParticles = () => {
    const containerRef = useRef(null);
    const particlesRef = useRef([]);
    const animationRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const homeSection = container.parentElement;
        if (!homeSection) return;

        // Particle class
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 4 + 2; // 2-6px flakes
                this.speedY = Math.random() * 2 + 1; // Falling speed
                this.speedX = (Math.random() - 0.5) * 2; // Slight horizontal drift
                this.rotation = Math.random() * 360;
                this.rotationSpeed = (Math.random() - 0.5) * 10;
                this.life = 1;
                this.decay = Math.random() * 0.02 + 0.01;

                // Create DOM element
                this.element = document.createElement('div');
                this.element.style.cssText = `
                    position: absolute;
                    width: ${this.size}px;
                    height: ${this.size}px;
                    background: #1a1a1a;
                    pointer-events: none;
                    border-radius: 1px;
                    transform: rotate(${this.rotation}deg);
                    opacity: 1;
                    left: ${this.x}px;
                    top: ${this.y}px;
                    z-index: 100;
                `;
                container.appendChild(this.element);
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;
                this.life -= this.decay;

                if (this.element) {
                    this.element.style.left = `${this.x}px`;
                    this.element.style.top = `${this.y}px`;
                    this.element.style.transform = `rotate(${this.rotation}deg)`;
                    this.element.style.opacity = this.life;
                }

                return this.life > 0;
            }

            destroy() {
                if (this.element && this.element.parentNode) {
                    this.element.parentNode.removeChild(this.element);
                }
            }
        }

        // Mouse move handler - attached to the home section
        const handleMouseMove = (e) => {
            const rect = homeSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create 2-3 particles per move
            for (let i = 0; i < 2 + Math.floor(Math.random() * 2); i++) {
                const offsetX = (Math.random() - 0.5) * 20;
                const offsetY = (Math.random() - 0.5) * 10;
                particlesRef.current.push(
                    new Particle(x + offsetX, y + offsetY)
                );
            }

            // Limit particles to prevent performance issues
            if (particlesRef.current.length > 100) {
                const removed = particlesRef.current.splice(0, 20);
                removed.forEach(p => p.destroy());
            }
        };

        // Animation loop
        const animate = () => {
            particlesRef.current = particlesRef.current.filter(particle => {
                const alive = particle.update();
                if (!alive) {
                    particle.destroy();
                }
                return alive;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        // Attach to parent section instead of container
        homeSection.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            homeSection.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            particlesRef.current.forEach(p => p.destroy());
            particlesRef.current = [];
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                overflow: 'hidden',
                zIndex: 100
            }}
        />
    );
};

export default CursorParticles;
