const Header = React.createClass({
    render: () => {
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

    	for(const i in data){
    		list.push(<a href={domain + data[i].url}>{data[i].text}</a>);
    	}

        return (
        	<div>
	        	<img src={imgUrl} />
	        	<ul>
	        		{list}
	        	</ul>
        	</div>
        );
    }
});
ReactDOM.render(
  <Header />,
  document.getElementById('content')
);