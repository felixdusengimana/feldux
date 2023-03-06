'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes'

interface INavKeys {
    name: string;
    x: number;
    y: number;
    w: string;
  }
  
  interface INavItems {
    [key: string]: INavKeys;
  }

const navItems: INavItems = {
  '/': {
    name: 'home',
    x: 0,
    y: 0,
    w: '64px',
  },
  '/about': {
    name: 'about',
    x: 64,
    y: 35,
    w: '65px',
  },
  '/blog': {
    name: 'blog',
    x: 127,
    y: 69,
    w: '56px',
  },
  // '/guestbook': {
  //   name: 'guestbook',
  //   x: 182,
  //   y: 104,
  //   w: '100px',
  // },
};

function Logo() {
  return (
    <Link aria-label="Felix Dusengimana" href="/">
      <motion.svg 
      width="40" height="39" viewBox="0 0 40 39"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg">
        <motion.path
          initial={{
            opacity: 0,
            pathLength: 0,
          }}
          animate={{
            opacity: 1,
            pathLength: 1,
          }}
          transition={{
            duration: 1,
            type: 'spring',
            stiffness: 50,
          }}
          strokeWidth={78}
          fill="currentColor"
          d="M0.304016 38V36.656C2.60802 36.656 3.95202 36.2293 4.33602 35.376V3.184C3.95202 2.33067 2.60802 1.904 0.304016 1.904V0.559998H16.496V1.904C14.192 1.904 12.848 2.33067 12.464 3.184V35.376C12.848 36.2293 14.192 36.656 16.496 36.656V38H0.304016Z"/>
        <motion.path
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            stiffness: 50,
          }} 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M18 38.1315H20.4546C25.8733 38.1315 30.396 36.3822 34.0226 32.8835C37.692 29.3422 39.5266 24.8195 39.5266 19.3155C39.5266 13.8542 37.6493 9.39553 33.8946 5.93953C30.1826 2.44086 25.4466 0.691528 19.6866 0.691528H18V2.54753H19.6866C22.8866 2.54753 25.5533 3.95553 27.6866 6.77153C29.82 9.54486 30.8866 13.7475 30.8866 19.3795C30.8866 24.9689 29.8626 29.1289 27.8146 31.8595C25.8093 34.5902 23.356 35.9555 20.4546 35.9555H18V38.1315Z" 
          fill="currentColor"/>
      </motion.svg>
    </Link>
  );
}

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  let pathname = usePathname() || '/';
  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }

  return (
    <aside className="md:w-[150px] md:flex-shrink-0 -mx-4 md:mx-0 md:px-0 font-serif">
      <div className="lg:sticky lg:top-20">
        <div className="ml-2 md:ml-[12px] mb-2 px-4 md:px-0 md:mb-8 space-y-10 flex flex-col md:flex-row items-start ">
          <Logo />
        </div>
        <nav
          className="flex flex-row md:flex-col items-start relative overflow-scroll px-4 md:px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row md:flex-col space-x-0 pr-10 mb-2 mt-2 md:mt-0">
            {navItems[pathname] ? (
              <>
                {/* Desktop version, hidden on mobile, animates y axis */}
                <div className="hidden md:block">
                  <motion.div
                    className="absolute bg-neutral-100 dark:bg-neutral-800 h-[34px] rounded-md z-[-1]"
                    layoutId="test2"
                    initial={{ opacity: 0, y: navItems[pathname].y }}
                    animate={{
                      opacity: 1,
                      y: navItems[pathname].y,
                      width: navItems[pathname].w,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                </div>
                {/* Mobile version, hidden on desktop, animates x axis */}
                <div className="block md:hidden">
                  <motion.div
                    className="absolute bg-neutral-100 dark:bg-neutral-800 h-[34px] rounded-md z-[-1]"
                    layoutId="test"
                    initial={{ opacity: 0, x: navItems[pathname].x }}
                    animate={{
                      opacity: 1,
                      x: navItems[pathname].x,
                      width: navItems[pathname].w,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                </div>
              </>
            ) : null}

            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = path === pathname;

              return (
                <Link
                  key={path}
                  href={path}
                  className={clsx(
                    'transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-[5px] px-[10px]',
                    {
                      'text-neutral-500': !isActive,
                      'font-bold': isActive,
                    }
                  )}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}