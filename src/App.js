import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import React from 'react';

function Form(props) {

  function handleSubmit(event) {
    event.preventDefault();
    props.onChangeInput('');
  }
  return (
    <div className="container">
      <form>
        <div className="control">
          <div class="field is-expanded">
            <label class="label">文字列を入力してください</label>
            <div class="control">
              <TextareaAutosize
                class="textarea"
                placeholder="文字列を入力してください"
                type="text"
                name="text"
                maxRows="20"
                value={props.textInput}
                onChange={(e) => props.onChangeInput(e.target.value)}
              >
              </TextareaAutosize>
            </div>
          </div>
          <div class="field is-right">
            <div class="control">
              <button class="button" onClick={handleSubmit}>
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
  const orgRound = (value, base) => {
    return Math.round(value * base) / base;
  };

  const getReadTIme = (str) => {
    const englishCount = (str.match(/[ -~]/g) || []).length;
    return orgRound((str.length - englishCount) / japaneseCpm + englishCount / englishWpm, 100);
  };
  
  return (
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-info">
              <p class="title is-5">文字数</p>
              <p>{props.textInput.length} 文字</p>
            </article>
            <article class="tile is-child notification is-primary">
              <p class="title is-5">スペースなし</p>
              <p>
                {props.textInput.replace(/\s/g, '').length} 文字
              </p>
            </article>
            <article class="tile is-child notification is-success">
              <p class="title is-5">改行</p>
              <p>
                {props.textInput.split("\n").length - 1} 個
              </p>
            </article>
            <article class="tile is-child notification is-link">
              <p class="title is-5">単語数 (英数字)</p>
              <p>
                {props.textInput.split(/[\x20\u3000]/)
                  .filter((s) => s.length >= 1).length} 個
              </p>
            </article>
            <article class="tile is-child notification is-danger">
              <p class="title is-5">読了時間</p>
              <p>
                {getReadTIme(props.textInput)}  分
              </p>
            </article>
          </div>
        </div>
        <div class="column">
          <div class="tile is-parent">
            <article class="tile is-child notification">
              <p class="title is-5">改行を除去した文字列</p>
              <p>
                {props.textInput.replace(/\n/g, ' ')}
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">文字数 & 単語数 カウンタ</h1>
        </div>
      </div>
    </header>
  );
}

function Main() {
  const [textInput, setTextInput] = useState('');

  function onChangeInput(input) {
    setTextInput(input);
  }
  // 属性名は on に UpperCamelCase のイベント名をつけたもの
  return (
    <main>
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

function Footer() {
  const style = {
    width: "100%",
    position: "absolute",
    bottom: 0
  };

  return (
    <footer className="footer" style={style}>
      <div className="content has-text-centered">
        <p>Text counter by motttey</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
