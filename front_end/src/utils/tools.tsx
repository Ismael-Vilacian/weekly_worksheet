export const generateRandomClassName = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let className = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        className += characters[randomIndex];
    }
    return className;
};

export const loading = (add) => {
    const loading: any = document.querySelector('.loading');
    const action = add ? 'block' : 'none';
    loading.style.display = action;
}