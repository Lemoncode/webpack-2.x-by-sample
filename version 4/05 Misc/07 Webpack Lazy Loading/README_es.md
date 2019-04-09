# 06 Lazy Loading

En este ejemplo cargaremos paquetes de forma asíncrona a través de npm.

Partiremos del ejemplo _00 intro/05 jquery_.

Pasos resumidos:

- Requisitos previos:
  - Los paquetes nodejs deben estar instalados
  - (Opcional) punto de partida _00 intro/05 jquery_
- Instalar el paquete @babel/plugin-syntax-dynamic-import a través de npm
- Configurar el fichero de configuración de Babel (_.babelrc_)
- Cambiar la importación sincrónica del módulo en students.js y cargar el módulo averageService de forma diferida (_lazy loading_).
- Añadir el contenedor div en index.html

# Pasos para realizarlo

## Requisitos previos

Necesitará tener _nodejs_ instalado (al menos v 8.9.2) en su ordenador. Si desea seguir los pasos de esta guía, deberá tomar como punto de partida el ejemplo _00 intro/05 jquery_.

## Pasos

- `npm install` para instalar los paquetes del ejemplo anterior:

```bash
npm install
```

- Empecemos por descargar la biblioteca _@babel/plugin-syntax-dynamic-import_ a través de npm. En este caso ejecutaremos el siguiente comando en la línea de comandos: `npm install --save-dev @babel/plugin-syntax-dynamic-import`.

```
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

Esto añade automáticamente esa entrada a nuestro _package.json_.

### ./package.json

```diff
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.3.4",
+    "@babel/plugin-syntax-dynamic-import": "^7.2.0",
    "@babel/preset-env": "^7.3.4",
    "babel-loader": "^8.0.5",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.29.6",
    "webpack-cli": "^3.2.3",
    "webpack-dev-server": "^3.2.1"
  },
```

- Ahora configuraremos la importación dinámica en la sección de plugins del archivo _.babelrc_:

### ./.babelrc

```diff
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ]
  ],
+  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

- Ahora está listo para ser usado. Sólo para probarlo, cambiemos la importación sincrónica en el archivo _students.js_. Importemos el módulo _averageService_ de forma diferida cuando se pulse el botón.

### ./students.js

```diff
- import {getAvg} from "./averageService";
$('body').css('background-color', 'lightSkyBlue');
- const scores = [90, 75, 60, 99, 94, 30];
- const averageScore = getAvg(scores);
- const messageToDisplay = `average score ${averageScore}`;
- document.write(messageToDisplay);
```

- Cree la función _getComponent_, cargue el módulo _averageService_ de forma diferida y devuelva el elemento div de forma asíncrona con la puntuación media:

```diff
$('body').css('background-color', 'lightSkyBlue');

+ const getComponent = () =>
+   import(/* webpackChunkName "averageService" */ "./averageService").then(
+     averageServiceModule => {
+       const scores = [90, 75, 60, 99, 94, 30];
+       const averageScore = averageServiceModule.getAvg(scores);
+       const messageToDisplay = `average score ${averageScore}`;
+
+       const element = document.createElement("div");
+       element.innerText = messageToDisplay;
+
+       return element;
+     }
+   );
```

- La función _handleOnClick_ llamará a la función _getComponent_ y añadirá la puntuación media al contenedor:

```diff
...
+ const handleOnClick = () => {
+   getComponent().then(element =>
+     document.getElementById("container").append(element)
+   );
+ };
```

- Cree un botón para manejar el evento de click y cargar la puntuación media:

```diff
...
+ const button = document.createElement("button");
+ button.innerText = "Lazy loading sample";
+ button.onclick = handleOnClick;
+ document.getElementById("container").append(button);
```

Ahora, nuestro archivo _students.js_ tiene este aspecto:

### ./students.js

```
$("body").css("background-color", "lightSkyBlue");

const getComponent = () =>
  import(/* webpackChunkName "averageService" */ "./averageService").then(
    averageServiceModule => {
      const scores = [90, 75, 60, 99, 94, 30];
      const averageScore = averageServiceModule.getAvg(scores);
      const messageToDisplay = `average score ${averageScore}`;

      const element = document.createElement("div");
      element.innerText = messageToDisplay;

      return element;
    }
  );

const handleOnClick = () => {
  getComponent().then(element =>
    document.getElementById("container").append(element)
  );
};

const button = document.createElement("button");
button.innerText = "Lazy loading sample";
button.onclick = handleOnClick;
document.getElementById("container").append(button);

```

- Finalmente necesitamos añadir el contenedor _div_ en _index.html_:

### ./index.html

```diff

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webpack 4.x by sample</title>
  </head>
  <body>
    Hello Webpack 4!
+    <div id="container"></div>
  </body>
</html>

```

## Ejecutando y Probando

- Ahora podemos simplemente ejecutar la aplicación (`npm start`) y comprobar cómo se carga el paquete _averageService_ al pulsar el botón _Lazy loading sample_ (comprobándolo en la pestaña _network_ de las herramientas de desarrollo del navegador).

```bash
npm start
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
