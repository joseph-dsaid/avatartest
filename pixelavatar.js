image_assets = {};
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.useCORS = true;

ctx.textBaseline = "top";
ctx.fillStyle = DEFAULT_SCREEN_CLEAR;
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);

var avatar = {};
avatar['base'] = "base_m_001";
avatar['head'] = "";
avatar['hair'] = "";
avatar['eye'] = "";
avatar['neck'] = "";
avatar['body'] = "";
avatar['leg'] = "";
avatar['feet'] = "";
avatar['hand'] = "";
avatar['pet'] = "";
avatar['addon'] = "";

//Add all onchange events
document.getElementById("gender").onchange = gender_select;

function preloading_done()
{

	var preload_ready = true;
	for (const [key, value] of Object.entries(image_assets)) 
	{
		preload_ready = preload_ready && image_assets[key].ready;
		// console.log(key,value);
	}
    console.log(image_assets);
	return preload_ready;
}

function loadimgasset(path)
{
	var asset = new Image();
	asset.ready = false;

	function setAssetReady()
	{
		this.ready = true;
	}

	asset.onload = setAssetReady;
	asset.src = path;
	return asset;
}

function preloading()
{
	if (preloading_done())
	{
		console.log("preloading done");
		clearInterval(preloader);

		loadpixelavatar();

        // stage.addEventListener("click", canvasClick, false);
        // stage.addEventListener("mousemove", canvasMouseMove, false);
        // stage.addEventListener("mousedown", canvasMouseDown, false);	
        // document.addEventListener("keyup", keyUpHandler, false);
	}
}
preloader = setInterval(preloading, TIME_PER_FRAME);

var counter = 0;
for (const [key, value] of Object.entries(IMAGES_ASSETS)) 
{
	if (value != "")
	{
		// console.log(key, value, counter);
		counter += 1;
		image_assets[key] = this.loadimgasset(value);
	}
}

function loadpixelavatar()
{
	clear_screen();
	
	ctx.drawImage(image_assets['base_m_001'], 0,0);
}

function download_avatar()
{
    console.log("download avatar");

    var image = canvas.toDataURL("image/png");

    var anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = "avatar.png";
    anchor.click();
}

function gender_select()
{
	console.log("gender select", this.value);
    avatar['base'] = this.value;

    redraw_avatar();
}

function selected(part,item)
{
    console.log("selected",item);
    avatar[part] = item;

    redraw_avatar();
}

function redraw_avatar()
{
    clear_screen();

    //draw hand
    if (avatar['hand'] != "")
        ctx.drawImage(image_assets[avatar['hand']], 0,0);
    
    //draw base
    if (avatar['base'] != "")
        ctx.drawImage(image_assets[avatar['base']], 0,0);


    //draw eye
    if (avatar['eye'] != "")
        ctx.drawImage(image_assets[avatar['eye']], 0,0);

    //draw hair
    if (avatar['hair'] != "")
        ctx.drawImage(image_assets[avatar['hair'] ], 0,0);

    //draw head
    if (avatar['head'] != "")
        ctx.drawImage(image_assets[avatar['head'] ], 0,0);



    //draw leg
    if (avatar['leg'] != "")
        ctx.drawImage(image_assets[avatar['leg']], 0,0);        

    //draw body
    if (avatar['body'] != "")
    ctx.drawImage(image_assets[avatar['body']], 0,0);

    //draw neck
    if (avatar['neck'] != "")
        ctx.drawImage(image_assets[avatar['neck']], 0,0);
        
    //draw feet
    if (avatar['feet'] != "")
        ctx.drawImage(image_assets[avatar['feet'] ], 0,0);

    //draw pet
    if (avatar['pet'] != "")
        ctx.drawImage(image_assets[avatar['pet']], 0,0);

    //draw addon
    if (avatar['addon'] != "")
        ctx.drawImage(image_assets[avatar['addon']], 0,0);
}

// function candown(target, type) {
// 	// (B1) GET CANVAS
// 	let canvas = document.getElementById(target);

// 	// (B2) CREATE LINK
// 	let anchor = document.createElement("a");
// 	anchor.download = "download." + type;
// 	anchor.href = canvas.toDataURL("image/" + type);

// 	// (B3) "FORCE DOWNLOAD"
// 	anchor.click();
// 	anchor.remove();

// 	// (B4) SAFER ALTERNATIVE - LET USER CLICK ON LINK
// 	// anchor.innerHTML = "Download";
// 	// document.body.appendChild(anchor);
//   }

function clear_screen()
{
	ctx.fillStyle = DEFAULT_SCREEN_CLEAR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);	
}

