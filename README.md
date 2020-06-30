# binoculars

## Project setup

```
npm install
```

Set your webservice base url for :

- dev env in the file '.env.development' at project root

  ```
  VUE_APP_WS_URL=https://preprod.citypassenger.com
  ```

- prod env in the file '.env.production' at project root

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

### Compiles and minifies for production

```
npm run build
```

---

### Run tests (none atm)

```
npm run test
```
