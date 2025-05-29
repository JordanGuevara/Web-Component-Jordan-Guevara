class CardPelicula extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"})
    }
    static get observedAttributes() {
        return ["img", "titulo", "sinopsis", "valoracion"];
    }

    attributeChangedCallback() {
        this.render();
    }
    getStyles(){
        return `
        <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                    max-width: 300px;
                    min-width: auto;
                    margin-left: 700px;
                    margin-top: 50px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                    border-radius: 10px;
                    overflow: hidden;
                    background-color: #fff;
                    transition: transform 0.2s ease;
                    --primary-color: #f39c12;
                    --secondary-color: rgb(51, 233, 81);
                    --title-color: rgb(135, 30, 167);
                    
                    
                }

                :host(:hover) {
                    transform: scale(1.08);
                    align-items: center;
                    justify-content: center;
                    justify-items: center;
                }

                .card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    justify-items: center;
                }

                .poster {
                    width: 100%;
                    height: auto;
                    border-bottom: 1px solid #ddd;
                }

                .contenido {
                    padding: 16px;
                }

                h2 {
                    margin: 0 0 8px;
                    font-size: 1.2em;
                    color: var(--title-color);
                }

                .sinopsis {
                    font-size: 0.9em;
                    color: #444;
                }

                .valoracion {
                    margin-top: 10px;
                    font-weight: bold;
                    color: var(--primary-color);
                }
                .enlace ::slotted(a), .enlace ::slotted(button) {
                    display: inline-block;
                    margin-top: 12px;
                    padding: 8px 12px;
                    background-color:var(--secondary-color);
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: 0.9em;
                    border: none;
                    cursor: pointer;
                    text-align: center;
                }
            </style>
        `;

    }
    getTemplate(){
        const template =document.createElement("template");
        template.innerHTML=`
        <section class="card">
            <img class="poster" src="${this.getAttribute("img") || ""}" alt="Póster de película">
                <div class="contenido">
                    <h2>${this.getAttribute("titulo") || "Sin título"}</h2>
                    <p class="sinopsis">${this.getAttribute("sinopsis") || "Sinopsis no disponible."}</p>
                    <p class="valoracion">${this.getAttribute("valoracion") || "0"}/10</p>
                    <div class="enlace">
                        <slot name="link"></slot>
                    </div>
                </div>
        </section>
        ${this.getStyles()};
        
        `;
        return template;

    }
    render(){
        this.shadowRoot.innerHTML = "";
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }
    connectedCallback(){
        this.render();
    }
}
customElements.define('movie-preview',CardPelicula);