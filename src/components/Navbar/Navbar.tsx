import { forwardRef, type FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#pricing', label: 'Pricing' }
];

const combineClasses = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ');

const Logo: FC = () => (
  <a href="#home" className={styles.brand} aria-label="GenAuxi home">
    GenAuxi
  </a>
);

type NavItemsProps = {
  onNavigate?: () => void;
};

const NavItems: FC<NavItemsProps> = ({ onNavigate }) => (
  <>
    {NAV_LINKS.map((link) => (
      <li key={link.href}>
        <a className={styles.navLink} href={link.href} onClick={onNavigate}>
          {link.label}
        </a>
      </li>
    ))}
  </>
);

type MobileMenuProps = {
  isOpen: boolean;
  onNavigate: () => void;
  menuId: string;
};

const MobileMenu = forwardRef<HTMLUListElement, MobileMenuProps>(({ isOpen, onNavigate, menuId }, ref) => (
  <ul
    ref={ref}
    id={menuId}
    className={combineClasses(styles.navList, isOpen && styles.navListActive)}
    aria-hidden={!isOpen}
    aria-label="Mobile navigation"
  >
    <NavItems onNavigate={onNavigate} />
  </ul>
));

MobileMenu.displayName = 'MobileMenu';

type DesktopMenuProps = {
  menuId: string;
};

const DesktopMenu: FC<DesktopMenuProps> = ({ menuId }) => (
  <ul className={combineClasses(styles.navList, styles.desktopList)} id={`${menuId}-desktop`} aria-label="Primary navigation">
    <NavItems />
  </ul>
);

const Navbar: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLUListElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const menuId = useMemo(() => 'mobile-navigation', []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setMenuOpen((previous) => {
      if (!previous) {
        previousFocusRef.current = document.activeElement as HTMLElement | null;
      }
      return !previous;
    });
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      } else {
        toggleButtonRef.current?.focus();
      }
      return;
    }

    const navNode = navRef.current;
    const menuNode = mobileMenuRef.current;
    if (!navNode || !menuNode) {
      return;
    }

    const focusableItems = menuNode.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    if (focusableItems.length === 0) {
      return;
    }

    const first = focusableItems[0];
    const last = focusableItems[focusableItems.length - 1];

    const handleTrap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
      }
    };

    navNode.addEventListener('keydown', handleTrap);
    navNode.addEventListener('keydown', handleEscape);

    const focusTimer = window.requestAnimationFrame(() => {
      first.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusTimer);
      navNode.removeEventListener('keydown', handleTrap);
      navNode.removeEventListener('keydown', handleEscape);
    };
  }, [closeMenu, menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className={styles.navbar} ref={navRef} aria-label="Main navigation">
      <Logo />
      <button
        ref={toggleButtonRef}
        type="button"
        className={styles.linksToggle}
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={handleToggle}
      >
        <svg className={styles.toggleIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>
      <MobileMenu ref={mobileMenuRef} isOpen={menuOpen} onNavigate={closeMenu} menuId={menuId} />
      <DesktopMenu menuId={menuId} />
    </nav>
  );
};

export default Navbar;
