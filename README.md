# Angular Shopping Cart
## Introduction

The app called Shopping cart app is a reactive app, where all components automatically react to new data.
For a  better user experience actions are immediately reflected in all components before data is uploaded to the server.
Angular services and reactive GUI elements are used for that purpose.

---

## Problem statement

Your task is to fix a few issues with data synchronization across the app and to add few customisation features.

### 1. Cart status is not shown until the user makes a change
- Make changes to cart service so that subscribing to changes immediately updates the state.
- Resubscribing to cart state should broadcast the most recent cart state, so that when component subscribes after events were broadcast, it still gets most recent state

### 2. Cart item control has a potential memory leak
- Sorting and filtering products leave dangling subscriptions in cart control component.
- Make sure components unsubscribe when they get destroyed. (You can also use async pipe)
- Try to limit yourself to one subscription per cart control component

### 3. Dynamic product template
- Marketing requested that some products listed need customisable product item visuals.
- `ProductsList` component detects templates with `forProduct` directives to provide custom item template
- If product doesn't have 'type' property matching 'ofType' param it defaults to `default` template
- Modify `ProductsList` component so that when it has `forProduct=let product ofType default` for a child it overrides built-in default template

---

For comprehensive feedback regarding the quality of your solution it is strongly suggested that you upload your code to the Devskiller.com online code editor.

## Setup

1. `npm install` to get dependencies
2. Start app with `npm run start` and point webbrowser to `http://localhost:4200/`
3. Use `npm run test:watch` to see tests failing
4. Fix issues so that tests pass
5. Solve all issues mentioned here
6. Submit your code on Devskiller platform to see if task is completed

## Good Luck!
