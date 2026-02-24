<section bind:this={pluginElement} class="sica-container">
    <div class="header">
        <h3>SICA CELESTÚN</h3>
        <small>MODELO 7 - PROYECTO TIGGER SWAN</small>
    </div>

    <div class="data-display">
        <p>VIENTO DETECTADO:</p>
        <h2 id="v-val">--</h2> <span>km/h</span>
    </div>

    <div id="alert-box" class="status-box">
        <span id="sica-emoji" style="font-size: 40px;">⚪</span>
        <p id="sica-text">SELECCIONE PUNTO EN MAPA</p>
    </div>
</section>

<script>
    import { onMount } from 'svelte';

    let pluginElement;

    onMount(() => {
        // Acceso al mapa global de Windy
        if (window.W && W.map) {
            W.map.on('click', (e) => {
                const { lat, lng } = e.latlng;
                
                W.utils.getWeatherData(lat, lng, (data) => {
                    const wind = Math.round(data.wind || 0);
                    const vVal = pluginElement.querySelector('#v-val');
                    const emoji = pluginElement.querySelector('#sica-emoji');
                    const text = pluginElement.querySelector('#sica-text');

                    vVal.innerText = wind;

                    // Lógica SICA 4 Celestún
                    if (wind > 118) { emoji.innerText = '⚫'; text.innerText = 'HURACÁN'; }
                    else if (wind > 63) { emoji.innerText = '🟣'; text.innerText = 'TORMENTA'; }
                    else if (wind > 35) { emoji.innerText = '🔵'; text.innerText = 'DEPRESIÓN'; }
                    else { emoji.innerText = '⚪'; text.innerText = 'SITUACIÓN ESTABLE'; }
                });
            });
        }
    });
</script>

<style>
    .sica-container {
        background: #0d0d0d;
        color: white;
        padding: 2em;
        height: 100%;
        font-family: sans-serif;
    }
    .header { border-bottom: 2px solid #ff4444; margin-bottom: 20px; }
    .header h3 { color: #ff4444; margin: 0; }
    .status-box { 
        background: #1a1a1a; 
        border-radius: 12px; 
        text-align: center; 
        padding: 20px; 
        margin-top: 30px; 
    }
</style>
