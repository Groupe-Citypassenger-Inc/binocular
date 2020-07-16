# binoculars

#### Project install

```
npm install
```

Set your webservice base url for :

- dev env in the file 'dev.env.js' in **config** folder

  ```js
  module.exports = {
    NODE_ENV: '"development"',
    VUE_APP_WS_URL:'"https://preprod.citypassenger.com"'
  }
  ```

- prod env in the file 'prod.env.js' in **config** folder

  ```js
  module.exports = {
    NODE_ENV: '"production"',
    VUE_APP_WS_URL:'"https://admin.citypassenger.com"'
  }
  ```

#### Install in production
 ```bash
 npm install --production
 ```
 
---

## Compiles and hot-reloads for development

1. Set the port as a env variable (replace XXX by 30006 or 80)

```
 PORT=XXX
```

2. Set the host as env variable (keep the value app.citypassenger.com)

```
 HOST=app.citypassenger.com
```

3. Run command below

```
 npm run serve
```

---

### Compiles and minifies for production

```bash
 npm run build --env=production
```

---

### Run tests, unit and or lint

```
 npm run test
 npm run unit
 npm run lint
```
