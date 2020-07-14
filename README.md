# binoculars

## Project setup

```
npm install
```

Set your webservice base url for :

- dev env in the file 'dev.env.js' in **config** folder

  ```
  VUE_APP_WS_URL=https://preprod.citypassenger.com
  ```

- prod env in the file 'prod.env.js' in **config** folder

  ```
  VUE_APP_WS_URL=https://admin.citypassenger.com
  ```

---

## Compiles and hot-reloads for development

1. Set the port as a env variable (replace XXX by 30006 or 80 )

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

### Compiles for development

```
npm run build --env=development
```

### Compiles and minifies for production

```
npm run build --env=production
```

---

### Run tests (unit & e2e)

```
npm run test
```
