import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
	href: string;
	className?: string;
};

export const LinkTo: FC<Props> = ({ children, href, className }) => {
	return (
		<Link href={href} passHref>
			<a href={href} className={className ? className : ''}>
				{children}
			</a>
		</Link>
	);
};
