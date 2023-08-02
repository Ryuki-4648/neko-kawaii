import { NextPage } from "next";

/**
 * サバイバルナイフTypeScript 作って学ぶ「Next.jsで猫画像ジェネレーターを作ろう」
 * 
 * ・The Cat APIにリクエストし、猫の画像を取得する関数を実装
*/

const IndexPage: NextPage = () => {
  return <div>ねこ</div>;
};
// Next.jsでは、1ファイルにつき1ページコンポーネントを作成
// NextPage: ページコンポーネントを表す型

export default IndexPage;
// Next.jsにページコンポーネントと認識させるためexport default

const fetchCatsImage = async () => {
  const response = await fetch("https://api.thecatapi.com/v1/images/search"); // Responseオブジェクトを返す
  const catsImages = await response.json(); // Responseオブジェクトのjson()メソッドを実行 -> レスポンスのボディーをJSONとしてパースし、jsのオブジェクトとして取得
  console.log(catsImages);
  return catsImages[0];
}

// fetchCatsImage();