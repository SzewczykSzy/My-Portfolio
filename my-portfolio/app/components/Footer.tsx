import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 p-4 text-center dark-mode-transition">
      <p className="text-sm text-gray-700 dark:text-gray-300 dark-mode-transition">© 2024 Your Name. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <Link href="https://www.linkedin.com" target="_blank">
          <Image src="/icons/linkedin-icon.svg" alt="LinkedIn" className="w-6 h-6 dark-mode-transition" width={24} height={24}/>
        </Link>
        <Link href="https://github.com" target="_blank">
          <Image src="/icons/github-icon.svg" alt="GitHub" className="w-6 h-6 dark-mode-transition" width={24} height={24}/>
        </Link>
        <Link href="https://hackerrank.com" target="_blank">
          <Image src="/icons/hackerrank-icon.svg" alt="HackerRank" className="w-6 h-6 dark-mode-transition" width={24} height={24}/>
        </Link>
        <Link href="https://kaggle.com" target="_blank">
          <Image src="/icons/kaggle-icon.svg" alt="Kaggle" className="w-6 h-6 dark-mode-transition" width={24} height={24}/>
        </Link>
      </div>
    </footer>
  );  
};

export default Footer;
