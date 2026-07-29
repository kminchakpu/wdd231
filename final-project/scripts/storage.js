const STORAGE_KEY = "preferredCategory";

export function saveCategory(category) {
    localStorage.setItem(
        STORAGE_KEY,
        category
    );

}


export function getCategory() {
    return localStorage.getItem(
        STORAGE_KEY
    );

}