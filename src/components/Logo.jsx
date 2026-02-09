import React, { forwardRef } from 'react';
import logoSrc from '../assets/Logo.png';

const Logo = forwardRef(({ className, style }, ref) => {
    return (
        <div ref={ref} className={`relative z-50 ${className}`} style={style}>
            <img
                src={logoSrc}
                alt="Logic Labs Logo"
                className="w-full h-full object-contain"
            />
        </div>
    );
});

export default Logo;
