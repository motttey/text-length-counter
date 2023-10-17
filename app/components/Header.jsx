export default function Header() {
    const style = {
      width: "100%",
      padding: 0
    };
  
    return (
      <header className="hero is-dark is-bold">
        <div className="hero-body">
          <div className="container" style={style}>
            <h1 className="title">文字数 & 単語数 カウンタ</h1>
          </div>
        </div>
      </header>
    );
}
