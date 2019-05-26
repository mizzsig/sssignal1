class Hello extends React.Component {
  render() {
    return (
      <div>Hello, React.js</div>
    );
  }
}
ReactDOM.render(
  <Hello />,
  document.getElementById('content')
);