import { useCallback, useState } from 'react';

export default function useInputState(initialValue: any) {
    const [value, setValue] = useState(initialValue);

    const setValueFromInputChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }, []);

    return [value, setValue, setValueFromInputChange];
}
