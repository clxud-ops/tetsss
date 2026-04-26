// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ JS подключен и работает!');
    
    // Пример: плавное появление контента
    const main = document.querySelector('main');
    if (main) {
        main.style.opacity = '0';
        main.style.transition = 'opacity 0.5s ease';
        setTimeout(() => main.style.opacity = '1', 100);
    }

    // Пример: интерактив кнопки
    const btn = document.querySelector('.btn');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Кнопка работает! 🚀');
        });
    }
});