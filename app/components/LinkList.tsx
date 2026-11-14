"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/page.module.scss';

export const navLinks = [
    { href: '/', label: 'TOP' },
    { href: '/about', label: 'ABOUT' },
    { href: '/service', label: 'SERVICE' },
    { href: '/blog', label: 'BLOG' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'CONTACT' },
];

export const isActive = (pathname: string | null, href: string) => {
    if (!pathname) return false;
    if (href === '/') return pathname === '/';
    // Blog articles live under /articles
    if (href === '/blog' && pathname.startsWith('/articles')) return true;
    return pathname === href || pathname.startsWith(`${href}/`);
};

interface LinkListProps {
    /** "big" renders the numbered, large links used in the fullscreen menu */
    variant?: 'default' | 'big';
}

export const LinkList = ({ variant = 'default' }: LinkListProps) => {
    const pathname = usePathname();

    return (
        <>
            {navLinks.map(({ href, label }, index) => {
                const active = isActive(pathname, href);
                const className = [variant === 'big' ? styles.big : '', active ? styles.active : '']
                    .filter(Boolean)
                    .join(' ') || undefined;

                return (
                    <Link
                        key={href}
                        href={href}
                        className={className}
                        aria-current={active ? 'page' : undefined}
                    >
                        {variant === 'big' ? (
                            <>
                                <span>{String(index).padStart(2, '0')}</span>
                                {label.charAt(0) + label.slice(1).toLowerCase()}
                            </>
                        ) : (
                            label
                        )}
                    </Link>
                );
            })}
        </>
    );
};
