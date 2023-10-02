import React from 'react';

type useToggleReturnType = [boolean, () => void];

export default function useToggle(initialValue = false): useToggleReturnType {
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