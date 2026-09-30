/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

(async () => {

    // Run a function that gets data from main.js
    console.log(await window.exposed.getStuffFromMain())
    
    // Run a function sends data to main.js
    await window.exposed.sendStuffToMain('Stuff from renderer')
    
    console.log(await window.exposed.listProducts())

    async function getProduct(id) {
        const p = await window.exposed.getProduct(id)

        document.getElementById('product').innerHTML = `
            ${p.id} - ${p.name} - ${p.price} €
        `;
    }

    for (p of await window.exposed.listProducts()) {
        document.getElementById('products').innerHTML += `
            <li data-id="${p.id}">${p.id} - ${p.name}</li>
        `;
    }

    document.getElementById('products').addEventListener('click', (e) => {
        getProduct(e.target.dataset.id);
    })


})()