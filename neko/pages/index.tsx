import { NextPage } from "next";
import { useEffect, useState } from "react";

/**
 * サバイバルナイフTypeScript 作って学ぶ「Next.jsで猫画像ジェネレーターを作ろう」
 * 
 * ・The Cat APIにリクエストし、猫の画像を取得する関数を実装
*/

// const [count, setCount] = useState(100);
// const onClickCountButton = () => {
//   setCount(count + 1);
// };

const IndexPage: NextPage = () => {
  // 1. useStateで状態を定義する。loadingはAPIを呼び出し中かどうかを管理する変数。
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // 2. マウント時に画像を読み込む。useEffectは2つの引数を指定
  useEffect(() => {
    fetchCatsImage().then((newImage) => {
      // console.log(catsImage.alt); id, url, width, heightだけあるので、altは存在しない。catsImagesがany型だと、誤ったコードを書いてもエラーにならない。
      setImageUrl(newImage.url);
      setLoading(false);
    });
  }, []); // 第2引数が空 ＝ コンポーネントがマウントされたときのみ実行するという意味

  return (
    <>
      <div>ねこ</div>
      <div>{loading || <img src={imageUrl} />}</div>
      {/* <button onClick={onClickCountButton}>{count}</button> */}
    </>
  );
};
// Next.jsでは、1ファイルにつき1ページコンポーネントを作成
// NextPage: ページコンポーネントを表す型

export default IndexPage;
// Next.jsにページコンポーネントと認識させるためexport default

type Image = {
  url: string;
}
const fetchCatsImage = async (): Promise<Image> => {
  const response = await fetch("https://api.thecatapi.com/v1/images/search"); // Responseオブジェクトを返す
  const catsImages = await response.json(); // Responseオブジェクトのjson()メソッドを実行 -> レスポンスのボディーをJSONとしてパースし、jsのオブジェクトとして取得

  // 配列として表現されているか
  if(!Array.isArray(catsImages)) {
    throw new Error("猫の画像が取得できませんでした。");
  }

  // Imageの構造をなしているか
  const catsImage: unknown = catsImages[0];
  if(!isImage(catsImage)) {
    throw new Error("猫の画像が取得できませんでした。");
  }
  //return catsImage;
  console.log(catsImages);
  return catsImages[0];
}

// 型ガード関数
const isImage = (value: unknown): value is Image => { // 型が不明な値を完全に型付けするunknown型
  // 値がオブジェクトなのか
  if(!value || typeof value !== "object") {
    return false;
  }
  // urlプロパティが存在するかつそれが文字列かどうか
  return "url" in value && typeof value.url === "string";
}

// fetchCatsImage();