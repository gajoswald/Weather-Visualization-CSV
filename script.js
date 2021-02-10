let table;
let hSpacing;
let rows;
let cols;
let r;
let selectedIndex; 
let infoBox;

function preload() {
	// https://p5js.org/reference/#/p5/loadTable
	table = loadTable('KPHL.csv','csv','header');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	ellipseMode(RADIUS);
	rows = table.getRowCount();
	cols = table.getColumnCount();
	hSpacing = width/rows;
	r = hSpacing/2;
	selectedIndex = int(rows/2);
	infoBox = {
		x: width * 0.25,
		y: height * 0.03,
		w: width * 0.5,
		h: 0.44 * height,
		fontSize: ( 0.44 * height ) / cols
	}
}

function draw() {
	background(100);
	for( let i = 0; i < rows; i++ ) {
		let x = i * hSpacing + r;
		let y = height/2;
		fill(200);
		if( i === selectedIndex ) {
			rect(infoBox.x, infoBox.y, infoBox.w, infoBox.h);		
			const row = table.getRow(i);
			textSize(infoBox.fontSize);
			fill(0);
			for( let j = 0; j < cols; j++ ) {
				text(`${table.columns[j]}: ${row.get(j)}`,infoBox.x,infoBox.y + infoBox.h - j*infoBox.fontSize);
			}
			fill(255,0,0);
			line(x,y,infoBox.x,infoBox.y+infoBox.h);
		} else {
			fill(255);
		}
		ellipse(x, y, r, r);
	}
}

function keyPressed() {
	if( keyCode === LEFT_ARROW ) {
		selectedIndex--;
		if( selectedIndex < 0 ) {
			selectedIndex = rows - 1;
		}
	}
	if( keyCode === RIGHT_ARROW ) { 
		selectedIndex++;
		if( selectedIndex >= rows ) {
			selectedIndex = 0;
		}
	}
	if( keyCode === UP_ARROW ) {
		selectedIndex = (selectedIndex + 10) % rows
	}
	if( keyCode === DOWN_ARROW ) {
		selectedIndex = (rows + (selectedIndex - 10)) % rows
	}
}