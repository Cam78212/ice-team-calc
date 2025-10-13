# 🏒 Ice Team Cost Calculator

A modern web application for calculating hockey team costs, built with HAX design system and Lit web components. This tool helps hockey team organizers calculate and share cost estimates based on ice time, coaching fees, equipment costs, and transaction fees.

## 📋 Features

### Core Functionality
- **Team Name Input**: Personalize calculations with custom team names
- **Ice Cost Calculation**: Cost per hour × number of hours
- **Coach Fees**: Total coaching cost input
- **Jersey Costs**: Per-jersey cost × number of players
- **Transaction Fees**: Percentage-based + fixed fee calculation
- **Per-Player Cost**: Automatic calculation of individual player costs

### Advanced Features
- **Real-time Calculations**: Updates costs as you type
- **State Persistence**: Saves your inputs using localStorage
- **URL Sharing**: Share calculations via shareable URLs with GET parameters
- **Mobile Responsive**: Optimized for mobile and desktop devices
- **Dark/Light Mode**: Automatic theme support
- **Data Reset**: Clear all inputs and start fresh

## 🛠️ Technical Architecture

### Components
- **`ice-team-calc`**: Main calculator application component
- **`number-input`**: Reusable input component for numeric values

### Technologies Used
- **Lit Element**: For web component architecture
- **HAX Design System (DDD)**: For consistent styling and theming
- **Web Components**: Native browser standards
- **ES6 Modules**: Modern JavaScript module system

## 🚀 Getting Started

### Install dependencies
- `npm install` - installs dependencies so you can work

### Commands
- `npm start` - runs your web component for development, reloading on file changes
- `npm run build` - builds your web component and outputs it in your `dist` directory for placement on web servers in a compiled form. Vercel automatically does this on commit to github.
- `npm run release` - this will build your code, update the version, and publish it to npm for others to use

## 📱 Mobile Responsiveness

The application is fully responsive and adapts to different screen sizes:

- **Desktop**: Two-column layout with inputs on left, results on right
- **Mobile**: Single-column layout with results below inputs
- **Tablet**: Optimized spacing and touch-friendly interactions

## 🎨 Design Features

### Fieldsets Organization
- **💰 Ice Costs**: Ice time rate and hours
- **👨‍🏫 Coach & Equipment**: Coaching fees and jersey costs
- **💳 Transaction Fees**: Percentage and fixed fees
- **👥 Players**: Number of team players

### Visual Indicators
- Color-coded input sections
- Real-time calculation updates
- Sticky results panel (desktop)
- Emojis for visual organization

## 🔗 URL Sharing

The application supports sharing calculations via URL parameters:

```
https://yoursite.com/?teamName=Eagles&costPerHour=200&hours=10&coachCost=500&jerseyCost=50&transactionFeePercent=3&transactionFeeFixed=0.99&numberOfPlayers=12
```

All form data is encoded in the URL for easy sharing and bookmarking.

## 💾 Data Persistence

- **localStorage**: Automatically saves form data locally
- **URL Parameters**: State can be shared via URL
- **Reset Functionality**: Clear all data and start fresh

## 🎯 Calculation Logic

The cost calculation follows this formula:

```
Ice Cost = Cost per Hour × Hours
Total Jerseys = Jersey Cost × Number of Players
Subtotal = Ice Cost + Coach Cost + Total Jerseys
Transaction Fee = (Subtotal × Fee %) + Fixed Fee
Total Cost = Subtotal + Transaction Fee
Cost per Player = Total Cost ÷ Number of Players
```

## Working with your web component
- edit `./ice-team-calc.js`
- edit your 'demo' by modifying `./index.html`
- add dependencies using `npm install --save @whatever/repo` or editing `./package.json` directly
- if you must reference additional non-JS files, ensure you use the `new URL('./my-file.jpg', import.meta.url).href` syntax so that it builds correctly
- if you add additional `.js` files / web components then place them under `/lib/`
- to improve HAX wiring edit file in `/lib/ice-team-calc.haxProperties.json`
- for i18n / internationalization efforts, see associated language `.json` files in `/locales/` as well as `/lib/` for haxProperties related translation examples.

## Recommended setup
- Load VS code in 1 window to project root
- Browser open
- Right click -> Inspect and open the Console to see error output

## Recommended Integrated Development Environment (IDE)
- [VSCode](https://code.visualstudio.com/Download)

### Plugins

Name: lit-html
Description: Syntax highlighting and IntelliSense for html inside of JavaScript and TypeScript tagged template strings
Publisher: Matt Bierner
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=bierner.lit-html

Name: lit-plugin
Description: Syntax highlighting, type checking and code completion for lit-html
Publisher: Rune Mehlsen
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin

# Credits
A brighter future dreamed and developed by the Penn State [HAXTheWeb](https://hax.psu.edu/) initative.

Never. Stop. innovating.