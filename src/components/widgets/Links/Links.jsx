const linkLabels = [
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Accessability",
    "Ads Info",
    "More...",
    "© 2024 Constella.",
];

const Links = () => {
    return (
        <div className="links-container">
            {linkLabels.map((label, idx) => (
                <a
                    key={idx}
                    href="https:///"
                    target="__blank"
                    className="link-grey"
                >
                    {label}
                </a>
            ))}
        </div>
    );
};

export default Links;
