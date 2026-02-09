import React, { forwardRef } from 'react';

// Animated Logo with SVG paths and flowing energy dots
const AnimatedLogo = forwardRef(({ className, style, isAnimating = true }, ref) => {
    const primaryColor = "#8B1538"; // Dark red from logo

    return (
        <div ref={ref} className={className} style={style}>
            <svg
                viewBox="0 0 200 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Define the gradient for glowing effect */}
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Animated gradient for flowing energy */}
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={primaryColor} stopOpacity="0.3">
                            <animate attributeName="offset" values="-1;1" dur="2s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="50%" stopColor="#FF0000" stopOpacity="1">
                            <animate attributeName="offset" values="-0.5;1.5" dur="2s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="100%" stopColor={primaryColor} stopOpacity="0.3">
                            <animate attributeName="offset" values="0;2" dur="2s" repeatCount="indefinite" />
                        </stop>
                    </linearGradient>
                </defs>

                {/* Main L-shape paths */}
                <g stroke={primaryColor} strokeWidth="4" fill="none" strokeLinecap="round">
                    {/* Left vertical line of first L */}
                    <path d="M 40 20 L 40 180" className="logo-path">
                        <animate
                            attributeName="stroke-dasharray"
                            values="0,200;200,0"
                            dur="0.8s"
                            fill="freeze"
                            begin="0s"
                        />
                    </path>

                    {/* Bottom horizontal of first L */}
                    <path d="M 40 180 L 120 180" className="logo-path">
                        <animate
                            attributeName="stroke-dasharray"
                            values="0,100;100,0"
                            dur="0.5s"
                            fill="freeze"
                            begin="0.8s"
                        />
                    </path>

                    {/* Top horizontal connector */}
                    <path d="M 40 20 L 100 20" className="logo-path">
                        <animate
                            attributeName="stroke-dasharray"
                            values="0,80;80,0"
                            dur="0.4s"
                            fill="freeze"
                            begin="0.3s"
                        />
                    </path>

                    {/* Second L - vertical part */}
                    <path d="M 80 50 L 80 140" className="logo-path">
                        <animate
                            attributeName="stroke-dasharray"
                            values="0,100;100,0"
                            dur="0.5s"
                            fill="freeze"
                            begin="0.5s"
                        />
                    </path>

                    {/* Second L - horizontal part */}
                    <path d="M 80 140 L 160 140" className="logo-path">
                        <animate
                            attributeName="stroke-dasharray"
                            values="0,100;100,0"
                            dur="0.5s"
                            fill="freeze"
                            begin="1s"
                        />
                    </path>

                    {/* Right side connections */}
                    <path d="M 160 90 L 160 140" className="logo-path">
                        <animate
                            attributeName="stroke-dasharray"
                            values="0,60;60,0"
                            dur="0.3s"
                            fill="freeze"
                            begin="1.2s"
                        />
                    </path>

                    <path d="M 130 90 L 160 90" className="logo-path">
                        <animate
                            attributeName="stroke-dasharray"
                            values="0,40;40,0"
                            dur="0.3s"
                            fill="freeze"
                            begin="1.4s"
                        />
                    </path>
                </g>

                {/* Corner Circles / Nodes - animated with sequential pulse */}
                <g fill={primaryColor}>
                    {/* Top-left corner nodes */}
                    <circle cx="40" cy="20" r="0" filter="url(#glow)">
                        <animate attributeName="r" values="0;8;6" dur="0.3s" fill="freeze" begin="0s" />
                        <animate attributeName="opacity" values="0;1" dur="0.2s" fill="freeze" begin="0s" />
                    </circle>

                    <circle cx="70" cy="20" r="0" fill="none" stroke={primaryColor} strokeWidth="2" filter="url(#glow)">
                        <animate attributeName="r" values="0;6;5" dur="0.3s" fill="freeze" begin="0.2s" />
                    </circle>

                    <circle cx="100" cy="20" r="0" fill="none" stroke={primaryColor} strokeWidth="2" filter="url(#glow)">
                        <animate attributeName="r" values="0;6;5" dur="0.3s" fill="freeze" begin="0.4s" />
                    </circle>

                    {/* Second row nodes */}
                    <circle cx="80" cy="50" r="0" fill="none" stroke={primaryColor} strokeWidth="2" filter="url(#glow)">
                        <animate attributeName="r" values="0;6;5" dur="0.3s" fill="freeze" begin="0.5s" />
                    </circle>

                    {/* Mid-right nodes */}
                    <circle cx="130" cy="90" r="0" fill="none" stroke={primaryColor} strokeWidth="2" filter="url(#glow)">
                        <animate attributeName="r" values="0;6;5" dur="0.3s" fill="freeze" begin="1.3s" />
                    </circle>

                    <circle cx="160" cy="90" r="0" fill="none" stroke={primaryColor} strokeWidth="2" filter="url(#glow)">
                        <animate attributeName="r" values="0;6;5" dur="0.3s" fill="freeze" begin="1.5s" />
                    </circle>

                    {/* Second L connection nodes */}
                    <circle cx="80" cy="140" r="0" fill="none" stroke={primaryColor} strokeWidth="2" filter="url(#glow)">
                        <animate attributeName="r" values="0;6;5" dur="0.3s" fill="freeze" begin="0.9s" />
                    </circle>

                    <circle cx="120" cy="140" r="0" fill="none" stroke={primaryColor} strokeWidth="2" filter="url(#glow)">
                        <animate attributeName="r" values="0;6;5" dur="0.3s" fill="freeze" begin="1.1s" />
                    </circle>

                    <circle cx="160" cy="140" r="0" fill="none" stroke={primaryColor} strokeWidth="2" filter="url(#glow)">
                        <animate attributeName="r" values="0;6;5" dur="0.3s" fill="freeze" begin="1.4s" />
                    </circle>

                    {/* Bottom row nodes */}
                    <circle cx="40" cy="180" r="0" fill="none" stroke={primaryColor} strokeWidth="2" filter="url(#glow)">
                        <animate attributeName="r" values="0;6;5" dur="0.3s" fill="freeze" begin="0.7s" />
                    </circle>

                    <circle cx="80" cy="180" r="0" fill="none" stroke={primaryColor} strokeWidth="2" filter="url(#glow)">
                        <animate attributeName="r" values="0;6;5" dur="0.3s" fill="freeze" begin="0.85s" />
                    </circle>

                    <circle cx="120" cy="180" r="0" fill="none" stroke={primaryColor} strokeWidth="2" filter="url(#glow)">
                        <animate attributeName="r" values="0;6;5" dur="0.3s" fill="freeze" begin="1s" />
                    </circle>
                </g>

                {/* Flowing energy dot */}
                {isAnimating && (
                    <circle r="4" fill="#FF0000" filter="url(#glow)">
                        <animateMotion
                            dur="2s"
                            repeatCount="indefinite"
                            path="M 40 20 L 40 180 L 120 180 L 120 140 L 160 140 L 160 90 L 130 90 L 80 50 L 80 140 L 40 20"
                        />
                        <animate attributeName="opacity" values="1;0.5;1" dur="0.5s" repeatCount="indefinite" />
                    </circle>
                )}

                {/* "Logic Labs" text */}
                <text
                    x="100"
                    y="240"
                    textAnchor="middle"
                    fill={primaryColor}
                    fontFamily="'Oswald', sans-serif"
                    fontSize="28"
                    fontWeight="500"
                    opacity="0"
                >
                    Logic Labs
                    <animate attributeName="opacity" values="0;1" dur="0.5s" fill="freeze" begin="1.8s" />
                </text>
            </svg>
        </div>
    );
});

AnimatedLogo.displayName = 'AnimatedLogo';

export default AnimatedLogo;
