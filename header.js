class Header extends React.Component{
  constructor(props){
    console.log(props);
    super(props);
  }

  render() {
    const domain = "http://sssignal.web.fc2.com";
    let list = [];

    const imgUrl = "http://blog-imgs-83.fc2.com/s/s/s/sssignal/header.png";
    const data = [
      { text : "Top", url : "/"},
      { text : "About", url : "/about.html"},
      { text : "Game & Soft", url : "/gamesoft.html"},
      { text : "CD Review", url : "/review.html"},
      { text : "Column", url : "/column.html"},
      { text : "Link", url : "/link.html"}
    ];

    return (
      <div>
        <img width="100%" src={imgUrl} />
        <ul className="ulbtn">
          {data.map((data, index) => {
            let hl = "";
            console.log(index);
            console.log(highlight);
            if(index == highlight){
              hl = "highlight";
            }

            return(
              <a className={"btn " + hl} key={index} href={domain + data.url}>
                {data.text}
              </a>
            )
          })}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Header />,
  document.getElementById('header')
);
