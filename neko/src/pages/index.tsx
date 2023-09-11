import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "../styles/index.module.css"
import Head from "next/head";

/**
 * サバイバルナイフTypeScript 作って学ぶ「Next.jsで猫画像ジェネレーターを作ろう」
 * 
 * ・The Cat APIにリクエストし、猫の画像を取得する関数を実装
*/

type Props = {
  initialImageUrl: string;
}

// Next.jsでは、1ファイルにつき1ページコンポーネントを作成
// NextPage: ページコンポーネントを表す型
const IndexPage: NextPage<Props> = ({initialImageUrl}) => {
  const [count, setCount] = useState(100);
  const onClickCountButton = () => {
    setCount(count + 1);
  };

  // 1. useStateで状態を定義する。loadingはAPIを呼び出し中かどうかを管理する変数。
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);

  // ↓ 初期画像はサーバーサイドで取得するようにしたので、クライアントサイドで初期画像を取得していた以下の記述は不要となる
  // 2. マウント時に画像を読み込む。useEffectは2つの引数を指定
  // useEffect(() => {
  //   fetchCatsImage().then((newImage) => {
  //     // console.log(catsImage.alt); id, url, width, heightだけあるので、altは存在しない。catsImagesがany型だと、誤ったコードを書いてもエラーにならない。
  //     setImageUrl(newImage.url);
  //     setLoading(false);
  //   });
  // }, []); // 第2引数が空 ＝ コンポーネントがマウントされたときのみ実行するという意味

  // ボタンクリックで他の写真を表示
  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchCatsImage();
    setImageUrl(newImage.url);
    setLoading(false);
    setCount(100);
  };

  return (
    <section className={styles.section}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" rel="stylesheet" />
        <title>CATS SPACE by The Cat Api | 「かわいい！」と思ったら「かわいいねボタン」をクリックしよう。</title>
        <meta name="description" content="CATS SPACE | ランダムで猫が表示されます。「かわいい！」と思ったら、ぜひ「かわいいねボタン」をクリックしていいね数を増やしてください。" />
      </Head>
      <div className={styles.wrap}>
        <h1 className={styles.index}>CATS SPACE</h1>
        <div className={styles.imageWrap}>
          {loading ? <p className={styles.loading}>loading cats..</p> : <img src={imageUrl} className={styles.img} /> }
          <div className={styles.moon}></div>
        </div>
        <p className={styles.text}>KAWAIINE</p>
        <div onClick={onClickCountButton} className={styles.goodbutton}>{count}</div>
      </div>
      <div className={styles.bottom} onClick={handleClick}>
        <p className={styles.nextbutton}>Next cat</p>
      </div>
    </section>
  );
};

export default IndexPage;
// Next.jsにページコンポーネントと認識させるためexport default

// データフェッチAPIのgetServerSidePropsを使い、サーバーサイドで実行する処理。
// Next.jsに認識させるためにexportしておく必要がある。
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchCatsImage();
  return {
    props: {
      initialImageUrl: image.url, // IndexPageコンポーネントが引数として受け取るpropを戻り値に含める
    },
  };
};

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