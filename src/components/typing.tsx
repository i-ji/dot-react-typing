import { useEffect, useState } from "react";

let startTime: number;
const Typing = () => {
  const list = [
    "red",
    "blue",
    "pink",
    "yellow",
    "green",
    "white",
    "black",
    "gray",
    "brown",
  ];

  // 問題一覧
  const [words, setWords] = useState(list);

  // 問題ワード
  const [word, setWord] = useState<string>("Press enter or spacebar");
  // 現在の文字数
  const [loc, setLoc] = useState(0);
  // 結果
  const [result, setResult] = useState("");
  // やり直しボタン
  const [reset, setReset] = useState(false);

  // 画面をクリックしたらスタート
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        startTime = Date.now();
        setWord(words[Math.floor(Math.random() * words.length)]);

        document.removeEventListener("keydown", handleKeyDown);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 入力したら_で置き換える処理
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== word[loc]) {
        return;
      }
      setLoc((prev) => prev + 1);
      setWord("_".repeat(loc + 1) + word.substring(loc + 1));
    };
    document.addEventListener("keydown", handleKeyDown);

    // 次の問題の表示
    if (loc === word.length) {
      if (words.length === 0) {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        setWord("Congratulations!");
        setResult(`Finished! ${elapsedTime} seconds!`);
        setReset(true);
        return;
      }
      setWord(words[Math.floor(Math.random() * words.length)]);
      setLoc(0);
    }

    // 問題が終わると問題集から削除
    if (words.includes(word)) {
      words.splice(words.indexOf(word), 1);
      setWords(words);
    }

    if (words.length === 0) {
      return;
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word, loc]);

  const rechallenge = () => {
    setReset(false);
    window.location.reload();
  };

  return (
    <main className="text-center pt-20">
      <p className=" text-5xl tracking-widest mb-5">{word}</p>
      <p className="mb-5">{result}</p>
      {reset && <button onClick={rechallenge}>もう一度チャレンジする</button>}
    </main>
  );
};
export default Typing;
