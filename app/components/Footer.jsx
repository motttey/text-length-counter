export default function Footer() {
    const style = {
      width: "100%",
      minHeight: "5vh",
      position: "relative",
      padding: "1rem",
      bottom: 0
    };
  
    return (
      <footer className="footer" style={style}>
        <div className="content has-text-centered">
          <p>text-length-counter</p>
        </div>
      </footer>
    );
}
