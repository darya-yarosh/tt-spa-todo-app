import React from 'react';

export default function useToggle(initialValue = false) {
	if (typeof initialValue !== 'boolean') {
		console.warn('Invalid type for useToggle');
	}

	const [value, setValue] = React.useState<boolean>(
		initialValue
	);

	const toggleValue = React.useCallback(() => {
		setValue((currentValue: boolean) => !currentValue);
	}, []);

	return [value, toggleValue];
}