export const name = 'sica-celestun';
export const title = 'SICA Celestún';
export const icon = '🛡️';

export const html = `
    <div id="sica-wrapper" style="background: #0d0d0d; color: #ffffff; padding: 15px; border-radius: 12px; border: 1px solid #333; font-family: sans-serif; min-width: 200px;">
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

        <div style="margin-top: 15px; font-size: 9px; color: #444; text-align: center;">
            PROYECTO TIGGER SWAN | LORD BALLIWNS
        </div>
    </div>
`;

export const onmount = () => {
    // Escucha el clic en el mapa para obtener datos del ciclón
    W.on('click', (e) => {
        const { lat, lon } = e;
        
        W.utils.getWeatherData(lat, lon, (data) => {
            const wind = Math.round(data.wind);
            const vDisplay = document.getElementById('v-val');
            const emojiDisplay = document.getElementById('sica-emoji');
            const textDisplay = document.getElementById('sica-text');

            vDisplay.innerText = wind;

            // Lógica SICA Celestún para Ciclones
            if (wind > 118) {
                emojiDisplay.innerText = '⚫';
                textDisplay.innerText = 'HURACÁN / IMPACTO';
                textDisplay.style.color = '#ff4444';
            } else if (wind > 85) {
                emojiDisplay.innerText = '🟤';
                textDisplay.innerText = 'ALERTA MÁXIMA';
                textDisplay.style.color = '#a1887f';
            } else if (wind > 63) {
                emojiDisplay.innerText = '🟣';
                textDisplay.innerText = 'TORMENTA TROPICAL';
                textDisplay.style.color = '#ba68c8';
            } else if (wind > 35) {
                emojiDisplay.innerText = '🔵';
                textDisplay.innerText = 'DEPRESIÓN / AVISO';
                textDisplay.style.color = '#64b5f6';
            } else {
                emojiDisplay.innerText = '⚪';
                textDisplay.innerText = 'MONITOREO ESTABLE';
                textDisplay.style.color = '#00ffcc';
            }
        });
    });
};
