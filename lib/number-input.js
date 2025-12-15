/**
 * Copyright 2025 Cameron Gould
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `number-input`
 * Reusable number input component with validation and styling
 * 
 * @element number-input
 */
export class NumberInput extends DDDSuper(LitElement) {

  static get tag() {
    return "number-input";
  }

  constructor() {
    super();
    this.label = "";
    this.value = 0;
    this.min = null;
    this.max = null;
    this.step = 1;
    this.placeholder = "";
    this.required = false;
    this.disabled = false;
    this.prefix = "";
    this.suffix = "";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      label: { type: String },
      value: { type: Number },
      min: { type: Number },
      max: { type: Number },
      step: { type: Number },
      placeholder: { type: String },
      required: { type: Boolean },
      disabled: { type: Boolean },
      prefix: { type: String },
      suffix: { type: String }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        margin: var(--ddd-spacing-2) 0;
      }

      .field-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-1);
      }

      .label {
        font-family: var(--ddd-font-navigation);
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-medium);
        color: var(--ddd-theme-primary);
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-1);
      }

      .input-container {
        display: flex;
        align-items: center;
        border: var(--ddd-border-sm);
        border-radius: var(--ddd-radius-sm);
        background-color: var(--ddd-theme-default-white);
        transition: border-color 0.2s ease;
        flex: 1;
      }

      .input-container:focus-within {
        border-color: var(--ddd-theme-default-pughBlue);
        box-shadow: 0 0 0 2px var(--ddd-theme-default-pughBlue-light);
      }

      .button {
        display: inline-block;
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
  
        color: var(--ddd-theme-default-roarMaxlight);
        font-size: var(--ddd-font-size-s);
        text-transform: uppercase;
        border-radius: var(--ddd-radius-sm);
        padding: var(--ddd-spacing-4);
      }

      .button.red{
        background-color: var(--ddd-theme-default-original87Pink);
      }

      .button.green{
        background-color: var(--ddd-theme-default-opportunityGreen);
      }

      .button.red:focus,
      .button.red:hover {
        background-color: var(--ddd-theme-default-potential50);
       color: var(--ddd-theme-default-original87Pink);
      }

      .button.green:focus,
      .button.green:hover {
        background-color: var(--ddd-theme-default-potential50);
        color: var(--ddd-theme-default-opportunityGreen);
      }

      .control-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border: none;
        border-radius: var(--ddd-radius-sm);
        cursor: pointer;
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-bold);
        transition: all 0.2s ease;
        user-select: none;
      }


      .control-btn:hover:not(:disabled) {
        transform: scale(1.05);
        box-shadow: var(--ddd-boxShadow-sm);
      }

      .control-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }

      .control-btn:disabled:hover {
        transform: none;
        box-shadow: none;
      }

      .prefix, .suffix {
        padding: var(--ddd-spacing-2);
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-default-coalyGray);
        background-color: var(--ddd-theme-default-lightGray);
        border-right: var(--ddd-border-sm);
      }

      .suffix {
        border-right: none;
        border-left: var(--ddd-border-sm);
      }

      input {
        flex: 1;
        border: none;
        padding: var(--ddd-spacing-3);
        font-size: var(--ddd-font-size-s);
        font-family: var(--ddd-font-primary);
        background: transparent;
        outline: none;
        width: 100%;
        box-sizing: border-box;
      }

      input:disabled {
        background-color: var(--ddd-theme-default-lightGray);
        color: var(--ddd-theme-default-coalyGray);
        cursor: not-allowed;
      }

      input::placeholder {
        color: var(--ddd-theme-default-coalyGray);
      }

      /* Mobile responsive */
      @media (max-width: 768px) {
        .field-wrapper {
          gap: var(--ddd-spacing-1);
        }
        
        input {
          padding: var(--ddd-spacing-2);
          font-size: var(--ddd-font-size-xs);
        }
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        .input-container {
          background-color: var(--ddd-theme-default-coalyGray);
          border-color: var(--ddd-theme-default-limestoneGray);
        }

        input {
          color: var(--ddd-theme-default-white);
        }

        input::placeholder {
          color: var(--ddd-theme-default-limestoneGray);
        }

        .prefix, .suffix {
          background-color: var(--ddd-theme-default-limestoneGray);
          color: var(--ddd-theme-default-white);
        }

        .label {
          color: var(--ddd-theme-default-white);
        }
      }
    `];
  }

  
  // Lit render the HTML
  render() {
    const canIncrement = this.max === null || this.value < this.max;
    const canDecrement = this.min === null || this.value > this.min;
    
    return html`
      <div class="field-wrapper">
        ${this.label ? html`<label class="label">${this.label}${this.required ? ' *' : ''}</label>` : ''}
        <div class="input-wrapper">
          <button class="button red" @click=${this._decrement}>-</button>
          <div class="input-container">
            ${this.prefix ? html`<span class="prefix">${this.prefix}</span>` : ''}
           
            <input
              type="number"
              value="${this.value || ''}"
              .min="${this.min}"
              .max="${this.max}"
              step="${this.step}"
              .placeholder="${this.placeholder}"
              ?required="${this.required}"
              ?disabled="${this.disabled}"
              @input="${this._handleInput}"
            />
            ${this.suffix ? html`<span class="suffix">${this.suffix}</span>` : ''}
          </div>
          <button class="button green" @click=${this._increment}>+</button>
        </div>
      </div>
    `;
  }
  _handleInput(e) {
    const newValue = parseFloat(e.target.value) || 0;
    this.value = newValue;
    this._dispatchChange(newValue);
  }

  _increment() {
    const newValue = this.value + this.step;
    if (this.max === null || newValue <= this.max) {
      this.value = newValue;
      this._dispatchChange(newValue);
    }
  }

  _decrement() {
    const newValue = this.value - this.step;
    if (this.min === null || newValue >= this.min) {
      this.value = newValue;
      this._dispatchChange(newValue);
    }
  }

  _dispatchChange(value) {
    // Dispatch change event
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: value },
      bubbles: true,
      composed: true
    }));
  }
  
}

globalThis.customElements.define(NumberInput.tag, NumberInput);
