class createSVG_Line {
	constructor(box) {
		this.box = box;
		this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		this.svg.setAttribute('height', '100%');
		this.svg.setAttribute('width', '100%');
		this.line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
		this.svg.appendChild(this.line);
		this.box.appendChild(this.svg);
	}
	setData(data, listIndex) {
		let height = parseInt(this.box.offsetHeight / 2);

		if(data.y1 === 'Average') {
			data.y1 = height;
		}
		if(data.y2 === 'Average') {
			data.y2 = height;
		}

		this.line.setAttribute("points",`0,${data.y1} 150,${data.y1} 180,${height} 220,${height} 250,${data.y2} 400,${data.y2}`);
		this.line.setAttribute("stroke", '#aaa');
		this.line.setAttribute("fill", 'none');
		this.line.setAttribute("stroke-width", '1');

		if(listIndex) {
			this.line.setAttribute("stroke", '#fb452f');
		}
	}

}
export default createSVG_Line;