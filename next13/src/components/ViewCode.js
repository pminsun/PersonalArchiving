export default function ViewCode(props) {
  const { react } = props;
  return (
    <section className="viewCode_container">
      <div>
        <p className="title">React Code</p>
        <div>
          <pre className="code-style">{react}</pre>
        </div>
      </div>
    </section>
  );
}
