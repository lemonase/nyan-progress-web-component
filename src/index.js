const template = document.createElement('template');
template.innerHTML = `<div id='progress-container'></div>`;

class NyanProgressBar extends HTMLElement {
    static observedAttributes = ["value"];

    constructor() {
        super();

        // consider doing start/stop animation sequence for gifs
        // https://stackoverflow.com/a/45040337
        this.assets = {
            rainbow: "./assets/rainbow.png",
            nyan: "./assets/cat.gif",
            background: "./assets/night-sky.gif",
        }
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));

        let catContainer = document.createElement('div');
        catContainer.id = 'cat-container';
        shadow.querySelector('#progress-container').appendChild(catContainer);

        catContainer.innerHTML = `
            <img src=${this.assets.rainbow} id='rainbow'></img>
            <img src=${this.assets.nyan} id='nyan'></img>
        `;

        const style = document.createElement("style");
        style.textContent = `
          #progress-container {
              background: url(${this.assets.background});
              width: 100%;
              height: 50px;
              z-index: -1;
          }
          #cat-container {
              position: absolute;
              display: flex;
              padding-right: 10%;
              height: 50px;
          }
          #nyan {
              margin-left: 90%;
              z-index: 1;
          }
          #rainbow {
              position: absolute;
              height: 45px;
              top: 5%;
          }
        `;
        shadow.appendChild(style);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == "value") {
            let cc = this.shadowRoot?.querySelector('#cat-container');
            if (newValue <= 0 && newValue >= 100) {
                return
            }
            if (cc !== undefined && cc !== null) {
                cc.style.left = newValue;
            }
        }
    }
}

customElements.define('nyan-progress-bar', NyanProgressBar);
