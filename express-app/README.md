# express-app

## Important Components

- `app.js`

  - our app's main entry point
  - when creating a new page, add a corresponding router to `app.js`

    ```javascript
    ...
    // require page routers
    const indexRouter = require("./routes/index");
    ...
    const <example>Router = require("./routes/<example>";)
    ...
    ...
    // use page routers
    app.use("/", indexRouter);
    ...
    app.use("/<example>", <example>Router)
    ```

### `\config`

- `database.js`

  - enables use of our MySQL database

  - `require` this file for database-related functionality

- `passport.js`

  - handles user login

  - `require` this file for login functionality (login page only)

### `\routes`

- contains routing files (JavaScript), one per page

### `\views`

- `\partials`

  - contains reusable elements, such as headers, footers, etc.

- contains view files (Pug), one per page

## Other Components

- `.eslintrc.js`

  - config file for [ESLint](https://eslint.org/)

- `package-lock.json`

  - describes app dependencies

  - automatically updated when installing / updating packages

- `package.json`

  - describes app details, dependencies

  - automatically updated when installing / updating packages

### `\bin`

- `www`
  - creates an HTTP server for `app.js`

### `\node_modules`

- contains libraries downloaded via `npm`

### `\public\stylesheets`

- `style.css`

  - describes the presentation of our content

  - mostly overridden since we are using [Bootstrap](https://getbootstrap.com/)
