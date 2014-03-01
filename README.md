# HTML5でファイルをドラッグして読み込むやつ

http://qiita.com/ginpei/items/5cebb14e210fc0770e94

## ブラウザーでファイルを開かないようにする

* 受け付けたい要素の`dragover`イベントと`drop`イベントを監視する。
* それぞれで`event.preventDefault()`する。

## ファイルをドラッグしてきたら見た目を変える

* 要素のクラスをon/offする場合
* `dragover`でonにする
* `dragleave`と`drop`でoffにする

## ドロップされたファイルの情報を取得する

* `drop`イベントの`event.dataTransfer.files`にファイル情報が入る。
* 形式は`File`オブジェクトの配列。
* `File`オブジェクト:
  * `name`
  * `size`
  * `type` … (ex: `"image/png"`)

## ドロップされたものが画像であるか判別する

* `File`オブジェクトの`type`を確認する。
* `type.indexOf('image/')===0`なら画像。

## 画像だったら表示する

* `File`オブジェクトから`FileReader`オブジェクトの`readAsDataURL()`メソッドを使って読み込む。
* 読み込み成功すると`load`イベントが発火し、その`event.target.result`に画像のData-URIが格納されている。

## 参考

* [JavaScript でのローカル ファイルの読み込み - HTML5 Rocks](http://www.html5rocks.com/ja/tutorials/file/dndfiles/)

