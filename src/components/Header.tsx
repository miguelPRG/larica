import logo from "../assets/logo.png"

export default function Header() {
    return(
        <header className="w-full p-5 h-15 bg-dark-one flex items-center">
            <nav className="list-none text-24xl text-light-one flex gap-6">
                <li>
                    <img src={logo} alt="Larica Logo" className="w-40 h-40" />
                </li>
            </nav>
        </header>
    )
}
