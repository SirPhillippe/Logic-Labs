import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Palette, Zap, Globe } from 'lucide-react';
import MagicButton from '../components/MagicButton';


gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const titleRef = useRef(null);
    const servicesRef = useRef(null);
    const aboutRef = useRef(null);

    useEffect(() => {
        // Calculate delay based on time since page load
        // If < 4500ms, assume layout intro is running (4.5s total)
        // Wait 4.8s total to be safe
        const isInitialLoad = performance.now() < 4500;
        const animationDelay = isInitialLoad ? 4.8 : 0.5;

        // Hero Reveal
        const tl = gsap.timeline();
        tl.fromTo(textRef.current.children,
            { y: 150, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1.5, stagger: 0.2, ease: 'expo.out', delay: 0.5 }
        );

        // Digital Mastery Title Entrance - JS Only Control
        // Setting initial state via JS ensures no CSS conflicts
        gsap.set(titleRef.current, { y: 100, opacity: 0, scale: 1.2, filter: 'blur(20px)' });

        gsap.to(titleRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 2.5, // Slowed down for better experience
            ease: 'power4.out',
            delay: animationDelay
        });

        // Parallax background glow
        gsap.to(".hero-glow", {
            scrollTrigger: {
                trigger: "#home",
                start: "top top",
                end: "bottom top",
                scrub: 1
            },
            y: 300,
            scale: 1.5,
            opacity: 0.2
        });

        // About - Pin and Text Reveal
        gsap.fromTo("#about h2",
            { x: -100, opacity: 0 },
            {
                x: 0, opacity: 1,
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 60%",
                    end: "top 30%",
                    scrub: 1
                }
            }
        );

        // Services - Staggered reveal
        gsap.from(".service-card", {
            scrollTrigger: {
                trigger: "#services",
                start: "top 70%",
            },
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out"
        });

    }, []);

    return (
        <div className="bg-white text-dark overflow-x-hidden">
            {/* 1. HOME / HERO SECTION */}
            {/* 1. HOME / HERO SECTION */}
            <section id="home" ref={heroRef} className="min-h-screen flex flex-col px-6 md:px-20 relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background2.jpg')" }}>
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-white/85 z-0"></div>
                <div className="hero-glow absolute top-0 right-0 w-[60vw] h-[60vw] bg-primary/20 blur-[150px] rounded-full pointer-events-none -translate-y-1/3 translate-x-1/3 z-0" />


                <div ref={textRef} className="container mx-auto z-10" style={{ paddingTop: '180px' }}>
                    {/* Title Container */}
                    <div className="mb-8">
                        <h1 ref={titleRef} className="hover-underline font-heading text-[7vw] md:text-[4.5vw] leading-[0.9] font-bold uppercase tracking-tight relative z-10" style={{ opacity: 0 }}>
                            Digital<br />
                            <span className="text-primary">Mastery</span>
                        </h1>
                    </div>

                    {/* Centered Button */}
                    <div className="flex justify-center mb-8">
                        <MagicButton />
                    </div>

                    {/* Text - removed pill styling */}
                    <div className="max-w-2xl relative z-20 mb-8">
                        <p className="text-xl md:text-2xl text-dark leading-relaxed">
                            We craft <span className="font-bold text-dark">beautiful</span> and <span className="font-bold text-primary">responsive</span> digital systems that captivate audiences and drive results.
                        </p>
                        <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                            Building high-performance digital systems. We merge <span className="font-bold text-dark">logic</span> with <span className="font-bold text-primary">emotion</span>.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. ABOUT SECTION - HIGH CONTRAST RED */}
            <section id="about" className="py-40 px-6 md:px-20 bg-primary text-white relative">
                <div className="container mx-auto grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-[10vw] md:text-[8vw] font-heading uppercase font-bold leading-none mb-10">
                            The<br />Logic
                        </h2>
                    </div>
                    <div>
                        <p className="text-2xl md:text-4xl font-light leading-tight mb-12">
                            Standard websites are forgotten. We create digital assets that <span className="font-bold underline">demand</span> attention.
                        </p>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
                            Using React, GSAP, and custom-built architectures, we transform your simple web presence into a high-performance interactive performance. No templates. No shortcuts. Just results.
                        </p>
                        <div className="grid grid-cols-2 gap-10 mt-16 border-t border-white/20 pt-10">
                            <div>
                                <h3 className="text-5xl font-bold font-heading">0.1s</h3>
                                <p className="text-sm uppercase tracking-widest opacity-60">Avg. Load Time</p>
                            </div>
                            <div>
                                <h3 className="text-5xl font-bold font-heading">100%</h3>
                                <p className="text-sm uppercase tracking-widest opacity-60">Bespoke Design</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SERVICES SECTION - LIGHT GRAY */}
            <section id="services" ref={servicesRef} className="py-40 px-6 md:px-20 bg-light-dim">
                <div className="container mx-auto">
                    <div className="mb-24">
                        <h2 className="text-primary text-xl font-heading tracking-[0.2em] uppercase mb-4 font-bold">Capabilities</h2>
                        <h3 className="text-6xl md:text-9xl font-heading font-bold uppercase leading-none">What We<br />Deliver</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-1 grid-flow-row">
                        {[
                            { icon: <Globe className="w-12 h-12" />, title: "Web Architecture", desc: "Scalable backend systems and lightning-fast frontend frameworks built for enterprise needs." },
                            { icon: <Palette className="w-12 h-12" />, title: "Visual Redesign", desc: "Transformative UI/UX overhauls that elevate your brand to the top 1% of the web." },
                            { icon: <Zap className="w-12 h-12" />, title: "Interactive Motion", desc: "Immersive WebGL and GSAP animations that turn visitors into fans." }
                        ].map((service, i) => (
                            <div key={i} className="service-card group p-12 bg-white border border-black/5 hover:bg-dark hover:text-white transition-all duration-700 cursor-pointer">
                                <div className="mb-12 text-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">{service.icon}</div>
                                <h4 className="text-3xl font-heading uppercase font-bold mb-6">{service.title}</h4>
                                <p className="text-gray-500 text-lg group-hover:text-gray-400 transition-colors leading-relaxed">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. FOOTER / CONTACT */}
            <section id="contact" className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-white text-dark relative">
                <div className="absolute inset-0 bg-primary/5 opacity-30 pointer-events-none"></div>
                <h2 className="text-primary font-heading tracking-[0.4em] uppercase mb-8 text-xl">Let's Connect</h2>
                <h3 className="text-[15vw] md:text-[12vw] font-heading font-bold uppercase leading-none mb-12">
                    Ready to<br />Master?
                </h3>
                <button className="bg-primary text-white px-16 py-6 text-2xl font-heading uppercase font-bold hover:bg-dark transition-all duration-500 z-10 shadow-2xl tracking-widest">
                    Build My Vision
                </button>
                <div className="mt-24 text-gray-400 font-heading uppercase tracking-widest text-sm">
                    Logic Labs © 2026 / All Rights Reserved
                </div>
            </section>
        </div>
    );
};

export default Home;
