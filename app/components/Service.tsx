"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/page.module.scss';

export const services = [
	{
		title: "About",
		text: "I established this business in 2023 with a mission to leverage technology and accelerate businesses — supporting your success with experience and skill.",
		href: "/about",
		image: "/1.webp",
	},
	{
		title: "Service",
		text: "Tailor-made web solutions using HTML, CSS, JavaScript, Python and more — from online shops to corporate websites.",
		href: "/service",
		image: "/2.webp",
	},
	{
		title: "Blog",
		text: "Regular articles on the latest technology trends, programming tutorials and up-to-date industry insights.",
		href: "/blog",
		image: "/3.webp",
	},
	{
		title: "FAQ",
		text: "Pricing, post-development support, the technologies I use — common questions, answered in one place.",
		href: "/faq",
		image: "/4.webp",
	},
];

/** Index rows with a cursor-following image preview (desktop only). */
export const Service = () => {
	const previewRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState<number | null>(null);

	// Smoothly follow the pointer while a row is hovered
	useEffect(() => {
		if (active === null) return;
		const pv = previewRef.current;
		if (!pv) return;

		let mx = lastPointer.x, my = lastPointer.y;
		let px = mx, py = my;
		let raf = 0;

		const onMove = (e: PointerEvent) => {
			mx = e.clientX;
			my = e.clientY;
			lastPointer.x = mx;
			lastPointer.y = my;
		};
		const loop = () => {
			px += (mx - px) * 0.14;
			py += (my - py) * 0.14;
			pv.style.left = `${px}px`;
			pv.style.top = `${py}px`;
			raf = requestAnimationFrame(loop);
		};

		window.addEventListener('pointermove', onMove, { passive: true });
		raf = requestAnimationFrame(loop);
		return () => {
			window.removeEventListener('pointermove', onMove);
			cancelAnimationFrame(raf);
		};
	}, [active]);

	return (
		<>
			<ul className={styles.rows}>
				{services.map((service, index) => (
					<li
						className={styles.row}
						key={service.title}
						data-reveal={index ? String(index) : ''}
						onPointerEnter={(e) => {
							lastPointer.x = e.clientX;
							lastPointer.y = e.clientY;
							setActive(index);
						}}
						onPointerLeave={() => setActive(null)}
					>
						<Link href={service.href}>
							<span className={styles.num}>{String(index + 1).padStart(2, '0')}</span>
							<h3>{service.title}</h3>
							<p>{service.text}</p>
							<span className={styles.go} aria-hidden="true">→</span>
							<span className={styles.thumb}>
								<Image src={service.image} alt="" width={640} height={360} sizes="(max-width: 980px) 90vw, 1px" />
							</span>
						</Link>
					</li>
				))}
			</ul>

			<div
				ref={previewRef}
				className={`${styles.preview} ${active !== null ? styles.previewShow : ''}`}
				aria-hidden="true"
			>
				{services.map((service, index) => (
					<Image
						key={service.image}
						src={service.image}
						alt=""
						width={600}
						height={450}
						sizes="300px"
						className={index === active ? styles.previewOn : undefined}
					/>
				))}
			</div>
		</>
	);
};

// Shared last-known pointer position so the preview starts where the cursor is
const lastPointer = { x: 0, y: 0 };
