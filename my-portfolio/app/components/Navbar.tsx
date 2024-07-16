import Link from 'next/link';

const Navbar = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => {
  return (
    <nav className="bg-gray-200 dark:bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-xl font-bold pl-4">
        <Link href="/">Simon&apos;s Portfolio</Link>
      </div>
      <div className="flex items-center space-x-8">
        <ul className="flex space-x-8 text-lg">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/projects" legacyBehavior>
              <a className="mr-4">Projects</a>
            </Link>
          </li>
          <li>
            <Link href="/stats">Stats</Link>
          </li>
          <li>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">CV</a>
          </li>
        </ul>
        <button onClick={toggleTheme} className="bg-gray-300 dark:bg-gray-600 p-2 rounded-full">
          <span role="img" aria-label="toggle dark mode">{theme === 'light' ? '🌞' : '🌜'}</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
