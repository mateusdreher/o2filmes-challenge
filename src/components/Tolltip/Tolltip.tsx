import React, { ReactNode, useState } from 'react';
import styles from './Tooltip.module.css';

export function Tooltip({ content, children }: { content: string, children: ReactNode }) {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div className={styles.tooltipContainer}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}
			{isHovered && (
				<div className={styles.tooltip}>
					{content}
				</div>
			)}
		</div>
	);
}
