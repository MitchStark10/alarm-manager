import { useState } from "react";

export default function useTempText(): [string, (val: string, millis: number) => void] {
	const [value, setValue] = useState('');

	const setValueAndAutoUnset = (newValue: string, millisForTextToStay: number) => {
		setValue(newValue);
		setTimeout(() => {
			setValue('');
		}, millisForTextToStay)
	};

	return [value, setValueAndAutoUnset];
}