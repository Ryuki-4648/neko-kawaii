module.exports = {
  root: true,
  env: { // JavaScript/TypeScriptコードがどの実行環境で使われるかをESLintに伝えるためのオプション
    browser: true, // windowやalertなどのグローバル変数が認識される
    es2021: true, // ES2021までに導入されたグローバル変数が認識される
  },
  parserOptions: { // チェック対象のJavaScriptがどの構文を使っているかをESLintに伝える
    ecmaVersion: "latest", // どのバージョンのECMAScriptの構文を使うか
    sourceType: "module", // モジュールモードでJavaScript/TypeScriptを書くほうが一般的
  },
};