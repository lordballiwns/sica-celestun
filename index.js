// SICA Celestún - Proyecto Tigger Swan
export const html = `
    <div id="sica-wrapper" style="background: #0d0d0d; color: #ffffff; padding: 15px; border-radius: 12px; border: 1px solid #333; font-family: sans-serif; width: 250px;">
        <div style="border-bottom: 2px solid #ff4444; margin-bottom: 10px; padding-bottom: 5px;">
            <h3 style="margin: 0; font-size: 16px;">SICA CELESTÚN</h3>
            <small style="color: #ff4444; font-weight: bold;">MONITOREO CICLÓNICO</small>
        </div>
        <div style="margin-bottom: 15px;">
            <span style="font-size: 10px; color: #888; display: block;">VELOCIDAD DEL VIENTO</span>
            <span id="v-val" style="font-size: 24px; font-weight: bold;">--</span> <small>km/h</small>
        </div>
        <div id="alert-box" style="padding: 10px; border-radius: 8px; text-align: center; background: #1a1a1a;">
            <span id="sica-emoji" style="font-size: 30px; display: block;">⚪</span>
            <span id="sica-text" style="font-size: 12px; font-weight: bold;">ESPERANDO DATOS</span>
        </div>
    </div>
`;

export const onmount = () => {
    // Escucha clics en el mapa
    W.on('click', e => {
        const { lat, lon } = e;
        W.utils.getWeatherData(lat, lon, data => {
            const wind = Math.round(data.wind || 0);
            document.getElementById('v-val').innerText = wind;
            
            const emoji = document.getElementById('sica-emoji');
            const text = document.getElementById('sica-text');

            if (wind > 118) { emoji.innerText = '⚫'; text.innerText = 'HURACÁN'; }
            else if (wind > 63) { emoji.innerText = '🟣'; text.innerText = 'TORMENTA'; }
            else if (wind > 35) { emoji.innerText = '🔵'; text.innerText = 'DEPRESIÓN'; }
            else { emoji.innerText = '⚪'; text.innerText = 'ESTABLE'; }
        });
    });
};
