import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import React from 'react';

function Form(props) {

  function handleSubmit(event) {
    event.preventDefault();
    props.onChangeInput('');
  }
  return (
    <div>
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
  return (
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-vertical">
          <div class="tile">
            <div class="tile is-parent">
              <article class="tile is-child notification is-info">
                <p class="title">文字数</p>
                <p class="subtitle">{props.textInput.length} 文字</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification is-primary">
                <p class="title">スペースなし</p>
                <p class="subtitle">
                  {props.textInput.replace(/\s/g, '').length} 文字
                </p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification is-success">
                <p class="title">改行</p>
                <p class="subtitle">
                  {props.textInput.split("\n").length} 個
                </p>
              </article>
            </div>
          </div>
          <div class="tile">
            <div class="tile is-parent">
              <article class="tile is-child notification">
                <p class="title">改行を除去した文字列</p>
                <p class="subtitle">
                  {props.textInput.replace(/\n/g, ' ')}
                </p>
              </article>
            </div>
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
        <div className="container">
          <Form
            onChangeInput={onChangeInput}
            textInput={textInput}
          />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Output textInput={textInput} />
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
