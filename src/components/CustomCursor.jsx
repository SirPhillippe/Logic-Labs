import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;

        if (!cursor || !cursorDot) return;

        // Mouse move handler
        const handleMouseMove = (e) => {
            // Outer cursor follows with slight delay
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power2.out'
            });

            // Inner dot follows immediately
            gsap.to(cursorDot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
        };

        // Hover effects for interactive elements
        const handleMouseEnter = () => {
            gsap.to(cursor, {
                scale: 1.5,
                borderColor: '#FF0000',
                duration: 0.3
            });
            gsap.to(cursorDot, {
                scale: 0,
                duration: 0.3
            });
        };

        const handleMouseLeave = () => {
            gsap.to(cursor, {
                scale: 1,
                borderColor: '#1a1a1a',
                duration: 0.3
            });
            gsap.to(cursorDot, {
                scale: 1,
                duration: 0.3
            });
        };

        // Click effect
        const handleMouseDown = () => {
            gsap.to(cursor, {
                scale: 0.8,
                duration: 0.1
            });
        };

        const handleMouseUp = () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.1
            });
        };

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], .magic-button, .nav-link');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            {/* Outer cursor ring */}
            <div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '40px',
                    height: '40px',
                    border: '2px solid #1a1a1a',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'translate(-50%, -50%)',
                    mixBlendMode: 'difference',
                    backgroundColor: 'transparent'
                }}
            />
            {/* Inner cursor dot */}
            <div
                ref={cursorDotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#FF0000',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'translate(-50%, -50%)'
                }}
            />
        </>
    );
};

export default CustomCursor;
