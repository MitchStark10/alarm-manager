import { useCallback, useState } from 'react';

export default function useToggle(
    initValue: boolean = false,
): [boolean, () => void] {
    const [value, setValue] = useState(initValue);

    const toggleValue = useCallback(() => {
        setValue((v) => !v);
    }, []);

    return [value, toggleValue];
}
