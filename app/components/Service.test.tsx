import React from 'react';
import { render, screen } from '@testing-library/react';
import { Service, services } from './Service';
import "@testing-library/jest-dom";

test('renders index rows with correct titles, texts and links', () => {
	render(<Service />);

	const titles = screen.getAllByRole('heading', { level: 3 });
	const links = screen.getAllByRole('link');

	expect(titles).toHaveLength(4);
	expect(links).toHaveLength(4);

	const expected = [
		{ title: 'About', href: '/about' },
		{ title: 'Service', href: '/service' },
		{ title: 'Blog', href: '/blog' },
		{ title: 'FAQ', href: '/faq' },
	];

	expected.forEach((item, index) => {
		expect(titles[index].textContent).toBe(item.title);
		expect(links[index]).toHaveAttribute('href', item.href);
		expect(screen.getByText(services[index].text)).toBeInTheDocument();
	});
});
