const useLocalStorageHelper = () => {
    // ✅ Set JSON data to localStorage
    const setItem = (key: string, value: unknown): void => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn(`Error setting item in localStorage: ${error}`);
        }
    };

    // ✅ Get JSON data from localStorage
    const getItem = (key: string) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.warn(`Error getting item from localStorage: ${error}`);
            return null;
        }
    };

    // ✅ Remove item from localStorage
    const removeItem = (key: string) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.warn(`Error removing item from localStorage: ${error}`);
        }
    };

    return { setItem, getItem, removeItem };
};

export default useLocalStorageHelper;
