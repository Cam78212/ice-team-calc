/**
 * Copyright 2025 Cameron Gould
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./lib/number-input.js";

/**
 * `ice-team-calc` - Hockey Team Cost Calculator
 * 
 * @demo index.html
 * @element ice-team-calc
 */
export class IceTeamCalc extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ice-team-calc";
  }

  constructor() {
    super();
    this.teamName = "";
    this.costPerHour = 200;
    this.hours = 10;
    this.coachCost = 500;
    this.jerseyCost = 50;
    this.transactionFeePercent = 3;
    this.transactionFeeFixed = 0.99;
    this.numberOfPlayers = 12;
    this.totalCost = 0;
    this.costPerPlayer = 0;
    
    this.loadFromStorage();
    this.loadFromURL();
    
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Ice Team Calculator",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ice-team-calc.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      teamName: { type: String, attribute: 'team-name' },
      costPerHour: { type: Number, attribute: 'cost-per-hour' },
      hours: { type: Number },
      coachCost: { type: Number, attribute: 'coach-cost' },
      jerseyCost: { type: Number, attribute: 'jersey-cost' },
      transactionFeePercent: { type: Number, attribute: 'transaction-fee-percent' },
      transactionFeeFixed: { type: Number, attribute: 'transaction-fee-fixed' },
      numberOfPlayers: { type: Number, attribute: 'number-of-players' },
      totalCost: { type: Number },
      costPerPlayer: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        max-width: 1200px;
        margin: 0 auto;
        padding: var(--ddd-spacing-4);
        font-family: var(--ddd-font-navigation);
        background: var(--ddd-theme-default-white);
        border-radius: var(--ddd-radius-md);
        box-shadow: var(--ddd-boxShadow-sm);
      }

      .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--ddd-spacing-6);
        align-items: start;
      }

      .input-section {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-4);
      }

      .results-section {
        background: var(--ddd-theme-default-limestoneLight);
        padding: var(--ddd-spacing-4);
        border-radius: var(--ddd-radius-sm);
        position: sticky;
        top: var(--ddd-spacing-4);
      }

      .app-title {
        text-align: center;
        margin-bottom: var(--ddd-spacing-6);
        color: var(--ddd-theme-primary);
        font-size: var(--ddd-font-size-xl);
        font-weight: var(--ddd-font-weight-bold);
      }

      .team-name-input {
        margin-bottom: var(--ddd-spacing-4);
      }

      .team-name-input input {
        width: 90%;
        padding: var(--ddd-spacing-3);
        font-size: var(--ddd-font-size-m);
        font-weight: var(--ddd-font-weight-medium);
        border: var(--ddd-border-md);
        border-radius: var(--ddd-radius-sm);
        background: var(--ddd-theme-default-white);
        color: var(--ddd-theme-primary);
        outline: none;
        transition: border-color 0.2s ease;
      }

      .team-name-input input:focus {
        border-color: var(--ddd-theme-default-pughBlue);
        box-shadow: 0 0 0 2px var(--ddd-theme-default-pughBlue-light);
      }

      .team-name-input label {
        display: block;
        margin-bottom: var(--ddd-spacing-2);
        font-weight: var(--ddd-font-weight-medium);
        color: var(--ddd-theme-primary);
      }

      fieldset {
        border: var(--ddd-border-md);
        border-radius: var(--ddd-radius-sm);
        padding: var(--ddd-spacing-1) var(--ddd-spacing-4) var(--ddd-spacing-4);
        margin: var(--ddd-spacing-2) 0;
        background: var(--ddd-theme-default-limestoneLight);
        position: relative;
      }

      .results-title {
        font-size: var(--ddd-font-size-l);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-primary);
        margin-bottom: var(--ddd-spacing-4);
        text-align: center;
      }

      .result-item {
        display: flex;
        justify-content: space-between;
        padding: var(--ddd-spacing-2) 0;
        border-bottom: 1px solid var(--ddd-theme-default-limestoneGray);
      }

      .result-item:last-child {
        border-bottom: none;
        font-weight: var(--ddd-font-weight-bold);
        font-size: var(--ddd-font-size-m);
        color: var(--ddd-theme-default-pughBlue);
      }

      .result-label {
        color: var(--ddd-theme-primary);
      }

      .result-value {
        font-weight: var(--ddd-font-weight-medium);
        color: var(--ddd-theme-default-coalyGray);
      }

      .actions {
        display: flex;
        gap: var(--ddd-spacing-2);
        margin-top: var(--ddd-spacing-4);
        flex-wrap: wrap;
      }

      .btn {
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        border: none;
        border-radius: var(--ddd-radius-sm);
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-medium);
        cursor: pointer;
        transition: all 0.2s ease;
        flex: 1;
        min-width: fit-content;
      }

      .btn-primary {
        background: var(--ddd-theme-default-pughBlue);
        color: var(--ddd-theme-default-white);
      }

      .btn-primary:hover {
        background: var(--ddd-theme-default-navy80);
      }

      .btn-secondary {
        background: var(--ddd-theme-default-limestoneGray);
        color: var(--ddd-theme-default-coalyGray);
      }

      .btn-secondary:hover {
        background: var(--ddd-theme-default-coalyGray);
        color: var(--ddd-theme-default-white);
      }

      /* Mobile responsive */
      @media (max-width: 768px) {
        :host {
          padding: var(--ddd-spacing-2);
        }

        .container {
          grid-template-columns: 1fr;
          gap: var(--ddd-spacing-4);
        }

        .results-section {
          position: static;
          order: 2;
        }

        .input-section {
          order: 1;
        }

        .app-title {
          font-size: var(--ddd-font-size-l);
        }
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        :host {
          background: var(--ddd-theme-default-coalyGray);
          color: var(--ddd-theme-default-white);
        }

        .results-section,
        fieldset {
          background: var(--ddd-theme-default-limestoneGray);
        }

        .team-name-input input {
          background: var(--ddd-theme-default-coalyGray);
          color: var(--ddd-theme-default-white);
          border-color: var(--ddd-theme-default-limestoneGray);
        }

        .result-label,
        .app-title,
        legend,
        .results-title {
          color: var(--ddd-theme-default-white);
        }

        .result-value {
          color: var(--ddd-theme-default-limestoneLight);
        }
      }
    `];
  }

  connectedCallback() {
    super.connectedCallback();
    this.calculateCosts();
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    // Recalculate when any input changes
    if (changedProperties.has('costPerHour') || changedProperties.has('hours') || 
        changedProperties.has('coachCost') || changedProperties.has('jerseyCost') ||
        changedProperties.has('transactionFeePercent') || changedProperties.has('transactionFeeFixed') ||
        changedProperties.has('numberOfPlayers')) {
      this.calculateCosts();
      this.saveToStorage();
      this.updateURL();
    }
  }

  calculateCosts() {
    if (this.numberOfPlayers <= 0) {
      this.totalCost = 0;
      this.costPerPlayer = 0;
      return;
    }

    const iceCost = this.costPerHour * this.hours;
    const totalJerseys = this.jerseyCost * this.numberOfPlayers;
    const subtotal = iceCost + this.coachCost + totalJerseys;
    const transactionFee = (subtotal * this.transactionFeePercent / 100) + this.transactionFeeFixed;
    
    this.totalCost = subtotal + transactionFee;
    this.costPerPlayer = this.totalCost / this.numberOfPlayers;
  }

  _handleValueChange(property, event) {
    this[property] = event.detail.value;
  }

  _handleTeamNameChange(e) {
    this.teamName = e.target.value;
    this.saveToStorage();
    this.updateURL();
  }

  saveToStorage() {
    const data = {
      teamName: this.teamName,
      costPerHour: this.costPerHour,
      hours: this.hours,
      coachCost: this.coachCost,
      jerseyCost: this.jerseyCost,
      transactionFeePercent: this.transactionFeePercent,
      transactionFeeFixed: this.transactionFeeFixed,
      numberOfPlayers: this.numberOfPlayers
    };
    localStorage.setItem('ice-team-calc', JSON.stringify(data));
  }

  loadFromStorage() {
    const stored = localStorage.getItem('ice-team-calc');
    if (stored) {
      const data = JSON.parse(stored);
      Object.assign(this, data);
    }
  }

  loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('teamName')) this.teamName = params.get('teamName');
    if (params.has('costPerHour')) this.costPerHour = parseFloat(params.get('costPerHour'));
    if (params.has('hours')) this.hours = parseFloat(params.get('hours'));
    if (params.has('coachCost')) this.coachCost = parseFloat(params.get('coachCost'));
    if (params.has('jerseyCost')) this.jerseyCost = parseFloat(params.get('jerseyCost'));
    if (params.has('transactionFeePercent')) this.transactionFeePercent = parseFloat(params.get('transactionFeePercent'));
    if (params.has('transactionFeeFixed')) this.transactionFeeFixed = parseFloat(params.get('transactionFeeFixed'));
    if (params.has('numberOfPlayers')) this.numberOfPlayers = parseFloat(params.get('numberOfPlayers'));
  }

  updateURL() {
    const params = new URLSearchParams({
      teamName: this.teamName,
      costPerHour: this.costPerHour,
      hours: this.hours,
      coachCost: this.coachCost,
      jerseyCost: this.jerseyCost,
      transactionFeePercent: this.transactionFeePercent,
      transactionFeeFixed: this.transactionFeeFixed,
      numberOfPlayers: this.numberOfPlayers
    });
    const newURL = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newURL);
  }

  resetForm() {
    this.teamName = "";
    this.costPerHour = 200;
    this.hours = 10;
    this.coachCost = 500;
    this.jerseyCost = 50;
    this.transactionFeePercent = 3;
    this.transactionFeeFixed = 0.99;
    this.numberOfPlayers = 12;
    localStorage.removeItem('ice-team-calc');
    window.history.replaceState({}, '', window.location.pathname);
  }

  shareResults() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      prompt('Copy this link:', window.location.href);
    });
  }

  // Lit render the HTML
  render() {
    return html`
      <h1 class="app-title"> Ice Team Cost Calculator</h1>
        <div class="team-name-input">
            <label for="team-name">Team Name</label>
            <input 
              id="team-name"
              type="text" 
              value="${this.teamName}"
              @input="${this._handleTeamNameChange}"
              placeholder="Enter your team name"
            />
          </div>
      <div class="container">
        <div class="input-section">
        

          <fieldset>
            <number-input
              label="Cost of Ice per Hour"
              value="${this.costPerHour}"
              prefix="$"
              min="0"
              step="5"
              @value-changed="${(e) => this._handleValueChange('costPerHour', e)}"
            ></number-input>
            
            <number-input
              label="Number of Hours"
              value="${this.hours}"
              suffix="hrs"
              min ="1"
              step ="0.5"
              @value-changed="${(e) => this._handleValueChange('hours', e)}"
            ></number-input>
          </fieldset>

          <fieldset>
            <number-input
              label="Coach Cost (Total)"
              value="${this.coachCost}"
              prefix="$"
              min="0"
              step="25"
              @value-changed="${(e) => this._handleValueChange('coachCost', e)}"
            ></number-input>
            
            <number-input
              label="Cost per Jersey"
              value="${this.jerseyCost}"
              prefix="$"
              min="0"
              step="5"
              @value-changed="${(e) => this._handleValueChange('jerseyCost', e)}"
            ></number-input>
          </fieldset>

          <fieldset>
            <number-input
              label="Transaction Fee (%)"
              value="${this.transactionFeePercent}"
              suffix="%"
              min="0"
              max="10"
              step="0.1"
              @value-changed="${(e) => this._handleValueChange('transactionFeePercent', e)}"
            ></number-input>
            
            <number-input
              label="Fixed Transaction Fee"
              value="${this.transactionFeeFixed}"
              prefix="$"
              min="0"
              step="0.01"
              @value-changed="${(e) => this._handleValueChange('transactionFeeFixed', e)}"
            ></number-input>
          </fieldset>

          <fieldset>
            <number-input
              label="Number of Players"
              value="${this.numberOfPlayers}"
              suffix="players"
              min="1"
              max="30"
              @value-changed="${(e) => this._handleValueChange('numberOfPlayers', e)}"
            ></number-input>
          </fieldset>
        </div>

        <div class="results-section">
          <div class="results-title">
            ${this.teamName ? `${this.teamName} Costs` : 'Total Costs'}
          </div>
          
          <div class="result-item">
            <span class="result-label">Ice Time:</span>
            <span class="result-value">$${(this.costPerHour * this.hours).toFixed(2)}</span>
          </div>
          
          <div class="result-item">
            <span class="result-label">Coach:</span>
            <span class="result-value">$${this.coachCost.toFixed(2)}</span>
          </div>
          
          <div class="result-item">
            <span class="result-label">Jerseys (${this.numberOfPlayers}):</span>
            <span class="result-value">$${(this.jerseyCost * this.numberOfPlayers).toFixed(2)}</span>
          </div>
          
          <div class="result-item">
            <span class="result-label">Transaction Fees:</span>
            <span class="result-value">$${(((this.costPerHour * this.hours) + this.coachCost + (this.jerseyCost * this.numberOfPlayers)) * this.transactionFeePercent / 100 + this.transactionFeeFixed).toFixed(2)}</span>
          </div>
          
          <div class="result-item">
            <span class="result-label">Cost per Player:</span>
            <span class="result-value">$${this.costPerPlayer.toFixed(2)}</span>
          </div>
          
          <div class="actions">
            <button class="btn btn-primary" @click="${this.shareResults}">Share Results</button>
            <button class="btn btn-secondary" @click="${this.resetForm}">Reset</button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(IceTeamCalc.tag, IceTeamCalc);