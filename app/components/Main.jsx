"use client"
import { useState, useEffect, useRef } from "react";

function Form(props) {
    const textarea = useRef(null);

    /* 入力文字数に応じてテキストエリアの縦幅を調整 */
    const adjustHeight = () => {
      textarea.current.style.height = "inherit";
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }

    const handleOnchange = (event) => {
      event.preventDefault();
      adjustHeight();
      props.onChangeInput(event.target.value);
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      props.onChangeInput('');
    }
  
    return (
      <div className="container">
        <form>
          <div className="control">
            <div className="field is-expanded">
              <label className="label">文字列を入力してください</label>
              <div className="control">
                <textarea
                  ref={textarea}
                  className="textarea"
                  placeholder="文字列を入力してください"
                  type="text"
                  name="text"
                  value={props.textInput}
                  style={{
                    formSizing: "content",
                    minHeight: "4lh"
                  }}
                  onChange={(e) => handleOnchange(e)}
                >
                </textarea>
              </div>
            </div>
            <div className="field is-right">
              <div className="control">
                <button className="button" onClick={handleSubmit}>
                  Clear
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
  
  function Output(props) {
    const japaneseCpm = 600.0;
    const englishWpm = 800.0;
  
    const [hasCopied, setHasCopied] = useState(false);
  
    const orgRound = (value, base) => {
      return Math.round(value * base) / base;
    };
  
    const getReadTIme = (str) => {
      const englishCount = (str.match(/[ -~]/g) || []).length;
      return orgRound((str.length - englishCount) / japaneseCpm + englishCount / englishWpm, 100);
    };
  
    const textWithoutNewLine = props.textInput.replace(/\n/g, ' ')
  
    const handleCopy = async () => {
      // clickboard apiでコピー
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textWithoutNewLine)
          .then(() =>{
            setHasCopied(true);
          })
      }
    }
  
    useEffect(() => {
      // 入力文字列が更新されたらされたらCopied!を消す
      setHasCopied(false);
    }, [props.textInput])
  
    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="tile is-parent is-vertical">
              <article className="tile is-child notification is-info">
                <p className="title is-5">文字数</p>
                <p>{props.textInput.length} 文字</p>
              </article>
              <article className="tile is-child notification is-primary">
                <p className="title is-5">スペースなし</p>
                <p>
                  {props.textInput.replace(/\s/g, '').length} 文字
                </p>
              </article>
              <article className="tile is-child notification is-success">
                <p className="title is-5">改行</p>
                <p>
                  {props.textInput.split("\n").length - 1} 個
                </p>
              </article>
              <article className="tile is-child notification is-link">
                <p className="title is-5">単語数 (英数字)</p>
                <p>
                  {props.textInput.split(/[\x20\u3000]/)
                    .filter((s) => s.length >= 1).length} 個
                </p>
              </article>
              <article className="tile is-child notification is-danger">
                <p className="title is-5">読了時間</p>
                <p>
                  {getReadTIme(props.textInput)}  分
                </p>
              </article>
            </div>
          </div>
          <div className="column">
            <div className="tile is-parent">
              <div className="tile is-child ">
                <article className="notification">
                  <p className="title is-5">改行を除去した文字列</p>
                  <p>
                    {textWithoutNewLine}
                  </p>
                </article>
                <div className="tile is-child ">
                  <button className="button" onClick={handleCopy}>
                    Copy
                  </button>
                  {hasCopied &&
                    <span className="tag is-success is-large mx-1">
                      Copied!
                    </span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default function Main() {
    const [textInput, setTextInput] = useState('');
  
    // 属性名は on に UpperCamelCase のイベント名をつけたもの
    const onChangeInput = (input) => {
      setTextInput(input);
    }
  
    return (
      <main style={{
        minHeight: "80vh"
      }}>
        <section className="section">
          <div className="columns">
            <div className="column is-one-third">
              <Form
                onChangeInput={onChangeInput}
                textInput={textInput}
              />
            </div>
            <div className="column">
              <Output textInput={textInput} />
            </div>
          </div>
        </section>
      </main>
    );
}
