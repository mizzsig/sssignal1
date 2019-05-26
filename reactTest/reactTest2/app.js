class Comment extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    const icons = [
      "https://pbs.twimg.com/profile_images/378800000220029324/fe66faeca20115da8566e51d83447ead_400x400.jpeg",
      "https://pbs.twimg.com/profile_images/3406268893/54b7e1f981b7df7c817af48d1b96ad5e_400x400.jpeg",
      "http://www.jma-net.go.jp/sat/data/web89/parts89/himawari9_first_image/tcr/tcr_s.jpg",
      "http://i.gzn.jp/img/2016/01/29/glittering-blue/00-top.jpg",
      "http://i.gzn.jp/img/2016/01/29/glittering-blue/00-top.jpg",
      "http://i.gzn.jp/img/2016/01/29/glittering-blue/00-top.jpg",
      "http://i.gzn.jp/img/2016/01/29/glittering-blue/00-top.jpg",
      "http://i.gzn.jp/img/2016/01/29/glittering-blue/00-top.jpg",
      "http://i.gzn.jp/img/2016/01/29/glittering-blue/00-top.jpg",
      "http://i.gzn.jp/img/2016/01/29/glittering-blue/00-top.jpg"
    ];

    return(
      <div>
        <div id="optionTitle">
          <Pager>メニュー</Pager>
        </div>
          <Grid id="optionContents">
            <Row>
              <Pager>
                <Col className="col" xs={3}>
                  <Link to="/tags"><i className="fa fa-tags"></i><div className="body">タグ</div></Link>
                </Col>
                <Col className="col" xs={3}>
                  <Link to="/search"><i className="fa fa-search"></i><div className="body">検索</div></Link>
                </Col>
                <Col className="col" xs={3}>
                  <Link to="/setting"><i className="fa fa-cog"></i><div className="body">設定</div></Link>
                </Col>
                <Col className="col" xs={3}>
                  <Link to="/timeline" onClick={() => {
                      console.log("aaa");
                      onSignoutClick();
                    }}><i className="fa fa-sign-out"></i>
                    <div className="body">ログアウト</div>
                  </Link>
                </Col>
              </Pager>
            </Row>
            <Row>
                <div id="icons">
                  {icons.map((icon) => { return (<img className="charaIcon" src={icon} />) })}
                </div>
            </Row>
          </Grid>
        </div>
    )
  }
}

ReactDOM.render(
  <Comment />,
  document.getElementById('content')
);
