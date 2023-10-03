# sv-finanzen

This project is a simple web application to easily manage new transactions into the Kassenbuch. It is based on [Vue 3](https://v3.vuejs.org/) and [Vite](https://vitejs.dev/).

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


## Feature ideas

- allow "." and "," for input of amount
- When transaction.isExpense == true, then only some taxClass can be possible, the same for false.
- Add Component for Dropdown menu with autofill for content values
- Check if last added transaction and newly added transactions are equal,
if so create Dialog to ask if this transaction should really be added
- Calculate the current balance of each account after each month and each statementofAccountId
- Add sort button for each table head entry
- Refactor the ShowAllEntries components and its children
- Think about the Excel export, could be nicer
- Add Visualizations for balance movement over time
- Improve styling
- Add coloring
- Keep statementOfAccountId after selection of different template
- Add Status for each statementOfAccount like: "ToDo", "InKassenbuch", "Paperwork done"