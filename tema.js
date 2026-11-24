const preferenciaSistema = window.matchMedia('(prefers-color-scheme: dark)');
let temaElegido;

try {
    temaElegido = localStorage.getItem('obradia-web-tema');
} catch {
    // El navegador puede restringir el almacenamiento para las vistas previas locales.
}

function aplicarTema() {
    const oscuro = temaElegido === 'oscuro' || (!temaElegido && preferenciaSistema.matches);
    document.documentElement.dataset.tema = oscuro ? 'oscuro' : 'claro';
    document.querySelector('meta[name="theme-color"]').content = oscuro ? '#1e1d1a' : '#F5F4EE';
    document.querySelector('.tema')?.setAttribute('aria-pressed', String(oscuro));
}

aplicarTema();
preferenciaSistema.addEventListener('change', aplicarTema);

document.addEventListener('DOMContentLoaded', () => {
    const boton = document.querySelector('.tema');
    aplicarTema();
    boton.hidden = false;
    boton.addEventListener('click', () => {
        temaElegido = document.documentElement.dataset.tema === 'oscuro' ? 'claro' : 'oscuro';
        try {
            localStorage.setItem('obradia-web-tema', temaElegido);
        } catch {
            // El selector sigue funcionando durante la visita.
        }
        aplicarTema();
    });
});
