export const saveStorage = (data) => {
    Object.keys(data).forEach((key) => {
        localStorage.setItem(key, data[key]);
    });
};

export const isStore = (key) => {
    return localStorage.getItem(key);
};

export const getStoreElements = (fields) => {
    const data = {};
    fields.forEach((field) => {
        data[field] = isStore(field);
    });
    return data;
};