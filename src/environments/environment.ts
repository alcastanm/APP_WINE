// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  uri_api:'https://localhost:4437/api/',
  uri_apiPython:'http://127.0.0.1:8000',
  // uri_apiPython:window.location.origin,
  wineImages:'https://res.cloudinary.com/dn2qs6ce4/image/upload/Images/',
  winesFolder: "wine/",
  geojsonRoute:'http://localhost:8000/geojson/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
