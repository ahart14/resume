(function() {
  // Check for <template> support
  if ('content' in document.createElement('template')) {
    const tmpl = document.createElement('template')

    // Create the web component's template
    // featuring a <slot> for the Light DOM content
    tmpl.innerHTML = `
      <h3>
        <button aria-expanded="false">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 10 10">
            <rect class="vert" height="8" width="2" y="1" x="4"/>
            <rect height="2" width="8" y="4" x="1"/>
          </svg>
        </button>
      </h3>
      <div class="content" hidden>
        <slot></slot>
      </div>
      <style>
        h3 {
          margin: 0;
        }

        h3 button {
          all: inherit;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 1.125rem 0;
          font-size: 1.125rem;
          font-weight: 500;
        }

        h3 button:hover {
          text-decoration: underline;
        }

        h3 button:focus svg,
        h3 button:hover svg {
          outline: 2px solid #ffd346;
        }

        h3 button [aria-expanded="true"] {
          margin-bottom: 30px;
        }

        button svg {
          height: 1.5rem;
          color: #2d3748;
          margin-right: 4px;
        }

        [aria-expanded="true"] .vert {
          display: none;
        }

        [aria-expanded] rect {
          fill: currentColor;
        }
      </style>
    `
    // Check for latest Shadow DOM syntax support
    if (document.head.attachShadow) {
      class ToggleSection extends HTMLElement {
        constructor() {
          super()

          // Make the host element a region
          this.setAttribute('role', 'region')

          // Create a `shadowRoot` and populate from template 
          this.attachShadow({ mode: 'open' })
          this.shadowRoot.appendChild(tmpl.content.cloneNode(true))

          // Assign the toggle button
          this.btn = this.shadowRoot.querySelector('h3 button')

          // Get the first element in Light DOM
          const oldHeading = this.querySelector(':first-child')
          // and cast its heading level (which should, but may not, exist)
          let level = parseInt(oldHeading.tagName.substr(1))
          // Then take its `id` (may be null)
          let id = oldHeading.id

          // Get the Shadow DOM <h3>
          this.heading = this.shadowRoot.querySelector('h3')
          
          // If `id` exists, apply it
          if (id) {
            this.heading.id = id
          }
          
          // If there is no level, there is no heading.
          // Add a warning.
          if (!level) {
            console.warn('The first element inside each <toggle-section> should be a heading of an appropriate level.')
          }
          
          // If the level is a real integer but not 2
          // set `aria-level` accordingly
          if (level && level !== 2) {
            this.heading.setAttribute('aria-level', level)
          }

          // Add the Light DOM heading label to the innerHTML of the toggle button
          // and remove the now unwanted Light DOM heading
          this.btn.innerHTML = oldHeading.textContent + this.btn.innerHTML
          oldHeading.parentNode.removeChild(oldHeading)

          // The main state switching function
          this.switchState = () => {
            let expanded = this.getAttribute('open') === 'true' || false

            // Toggle `aria-expanded`
            this.btn.setAttribute('aria-expanded', expanded)
            // Toggle the `.content` element's visibility
            this.shadowRoot.querySelector('.content').hidden = !expanded
          }

          this.btn.onclick = () => { 
            // Change the component's `open` attribute value on click
            let open = this.getAttribute('open') === 'true' || false
            this.setAttribute('open', open ? 'false' : 'true')
          }
        }
        
        connectedCallback() {
          if (window.location.hash.substr(1) === this.heading.id) {
            this.setAttribute('open', 'true')
            this.btn.focus()
          } 
        }

        // Identify just the `open` attribute as an observed attribute
        static get observedAttributes() {
          return ['open']
        }

        // When `open` changes value, execute switchState()
        attributeChangedCallback(name) {
          if (name === 'open') {
            this.switchState()
          }
        }
      }

      // Add our new custom element to the window for use
      window.customElements.define('toggle-section', ToggleSection) 

      // Get the first `toggle-section` on the page
      // and all toggle sections as a node list
      const first = document.querySelector('toggle-section')
      const all = document.querySelectorAll('toggle-section')
    }
  }
})()