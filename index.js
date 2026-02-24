// SICA Celestún - Proyecto Tigger Swan
export const html = `
    <div id="sica-wrapper" style="background: #0d0d0d; color: #ffffff; padding: 15px; border-radius: 12px; border: 1px solid #333; font-family: sans-serif; width: 220px;">
        <div style="border-bottom: 2px solid #ff4444; margin-bottom: 10px; padding-bottom: 5px;">
            <h3 style="margin: 0; font-size: 14px;">SICA CELESTÚN</h3>
            <small style="color: #ff4444; font-weight: bold;">MONITOREO CICLÓNICO</small>
        </div>
        <div style="margin-bottom: 10px;">
            <span style="font-size: 10px; color: #888;">VIENTO:</span>
            <span id="v-val" style="font-size: 20px; font-weight: bold;">--</span> <small>km/h</small>
        </div>
        <div id="alert-box" style="padding: 8px; border-radius: 6px; text-align: center; background: #1a1a1a;">
            <span id="sica-emoji" style="font-size: 24px;">⚪</span>
            <p id="sica-text" style="font-size: 11px; margin: 5px 0 0 0;">ESPERANDO CLIC</p>
        </div>
    </div>
`;

export const onmount = () => {
    // Usamos el objeto global W que Windy ya tiene cargado
    if (typeof W !== 'undefined' && W.map) {
        W.map.on('click', (e) => {
            const lat = e.latlng.lat;
            const lon = e.latlng.lng;
            
            // Llamada directa a los datos de clima de Windy
            W.utils.getWeatherData(lat, lon, (data) => {
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
    }
};
