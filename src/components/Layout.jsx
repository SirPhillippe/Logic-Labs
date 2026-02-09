import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from './Logo';

gsap.registerPlugin(ScrollTrigger);

const Layout = ({ children }) => {
    const logoRef = useRef(null);
    const navRef = useRef(null);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });


        // Connect Lenis to ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame to GSAP's ticker
        // This ensures they are perfectly synced
        const update = (time) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);

        gsap.ticker.lagSmoothing(0);

        // Logo Animation Timeline
        const tl = gsap.timeline({
            onComplete: () => setAnimationComplete(true)
        });

        // Initial State: Centered and LARGER
        gsap.set(logoRef.current, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            xPercent: -50,
            yPercent: -50,
            width: '45vw', // Increased from 35vw
            height: 'auto',
            zIndex: 100,
            filter: 'drop-shadow(0 0 0px transparent)',
        });

        // 1. LOADING PHASE: 3-second Pulse & Glow
        tl.to(logoRef.current, {
            scale: 1.15,
            filter: 'drop-shadow(0 0 40px #FF0000)',
            duration: 1,
            repeat: 2, // Repeats 2 more times = 3 total pulses (3 seconds)
            yoyo: true,
            ease: "sine.inOut"
        });

        // 2. MOVE TO NAVBAR (larger final size)
        tl.to(logoRef.current, {
            duration: 1.5,
            ease: "expo.inOut",
            top: '1.5rem',
            left: '2rem',
            xPercent: 0,
            yPercent: 0,
            width: '350px', // Much larger logo in navbar
            scale: 1,
            filter: 'drop-shadow(0 0 0px transparent)',
        })
            .fromTo(".nav-items",
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
                , "-=0.5");

        // 3. SCROLL HIDE: Logo fades when user scrolls down
        ScrollTrigger.create({
            trigger: "body",
            start: "top -50px",
            onEnter: () => gsap.to(logoRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none' }),
            onLeaveBack: () => gsap.to(logoRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' }),
        });


        // Navbar Hide on Scroll Down
        ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: 99999,
            onUpdate: (self) => {
                const scrollY = window.scrollY;
                console.log('Scroll Y:', scrollY); // Debug log
                // Hide navbar when scrolled down past 100px
                if (scrollY > 100) {
                    console.log('Hiding navbar');
                    gsap.to(navRef.current, {
                        y: -100,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                } else {
                    console.log('Showing navbar');
                    gsap.to(navRef.current, {
                        y: 0,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                }

                // Show/Hide BackToTop Button
                if (scrollY > 500) {
                    setShowBackToTop(true);
                } else {
                    setShowBackToTop(false);
                }
            }
        });

        return () => {
            lenis.destroy();
            gsap.ticker.remove(update);
            tl.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="bg-white text-dark min-h-screen font-body selection:bg-primary selection:text-white">

            {/* Background overlay during logo animation */}
            <div
                className={`fixed inset-0 z-[99] transition-opacity duration-1000 ${animationComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <img
                    src="/background.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Navbar - Fixed & Centered */}
            <div className={`fixed inset-0 bg-white z-[60] flex items-center justify-center transition-opacity duration-500 ${animationComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                {/* Loading overlay - keeping as is */}
            </div>

            {/* Logo with pulse/glow animation - uses original PNG */}
            <Logo ref={logoRef} className="fixed" />

            <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-center items-center">
                {/* Centered Nav with spacing and hover animations */}
                <div className="nav-items flex items-center gap-6 md:gap-10 font-heading uppercase tracking-[0.2em] text-sm md:text-base">
                    <a href="#home" className="nav-link">
                        Home
                    </a>
                    <span style={{ color: '#FF0000' }} className="text-xl font-bold">•</span>
                    <a href="#about" className="nav-link">
                        About
                    </a>
                    <span style={{ color: '#FF0000' }} className="text-xl font-bold">•</span>
                    <a href="#services" className="nav-link">
                        Capabilities
                    </a>
                    <span style={{ color: '#FF0000' }} className="text-xl font-bold">•</span>
                    <a href="#contact" className="nav-link">
                        Contact
                    </a>
                </div>
            </nav>

            <main className={`relative z-10 transition-opacity duration-1000 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
                {children}
            </main>

            {/* Back To Top Button */}
            <div className={`fixed bottom-10 right-10 z-[49] transition-all duration-500 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <button className="back-to-top-btn" onClick={scrollToTop}>
                    <svg className="back-to-top-icon" viewBox="0 0 384 512">
                        <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Layout;
