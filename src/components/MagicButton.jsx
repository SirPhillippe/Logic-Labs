import React from 'react';

const MagicButton = () => {
    const handleClick = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <button className="magic-button" onClick={handleClick}>
            <span className="magic-button-lg">
                <span className="magic-button-sl" />
                <span className="magic-button-text">Let's build magic</span>
            </span>
        </button>
    );
};

export default MagicButton;
