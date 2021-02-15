# present-env

* for transpiling syntax (were it not done by TS already) and polyfilling
* by default it transform all ES2015-ES2020 to ES5.
* `useBuiltIns` & `corejs`
  * needed for polyfills, since by default included babel-plugins only transpile syntax
  * former is needed to include polyfills for e.g. `Promise` and `Symbol`.
  * latter needs to match the manually installed corejs version
 
