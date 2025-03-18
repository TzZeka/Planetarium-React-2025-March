import './header.css';

const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contacts', path: '/contacts' },
    { name: 'Planets', path: '/planets' },
];

export default function Header() {
    return (
        <header className="header">
            <nav className="nav-container">
                <div className="logo-container">
                    <a href="/" className="nav-link">Planetarium</a>
                </div>
                <div className="desktop-nav-links">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.path}
                            className="nav-link"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
    );
}
