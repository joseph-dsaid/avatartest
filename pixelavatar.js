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

class GameEngine
{
    //Keys
    SPACEBAR = "SPACEBAR";
    ENTER = "ENTER";
    ESCAPE = "ESCAPE";
    ONE = "ONE";
    TWO = "TWO";
    THREE = "THREE";
    FOUR = "FOUR";
    FIVE = "FIVE";
    
    constructor(document, stage, ctx)
    {
        // console.log("GameEngine constructed")
        this.document = document;
        this.stage = stage;
        this.ctx = stage.getContext("2d");

        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseclicked = false;
        this.shiftmouseclicked = false;
        this.mousedown = false;
        this.mousemove = false;
    }

    init(w, h, state, framerate, style, fonts, images_list, sounds_list)
    {   
        // console.log("GameEngine init")  

        this.stage.width = w;
        this.stage.height = h;

        this.state = state;
        this.nextstate = "";
        this.state_exitcounter = 0;

        this.framerate = framerate;
        this.ctx.fillStyle = style;
        this.ctx.font = fonts;

        this.pause = false;

        this.prop = {};

        //Init keys
        this.keys = {};
        this.keys[this.SPACEBAR] = false;
        this.keys[this.ESCAPE] = false;
        this.keys[this.ONE] = false;
        this.keys[this.TWO] = false;
        this.keys[this.THREE] = false;
        this.keys[this.FOUR] = false;
        this.keys[this.FIVE] = false;


        //Init images and sounds
        this.images = {};
        this.sounds = {};

        var counter = 0;
        for (const [key, value] of Object.entries(images_list)) 
        {
            if (value != "")
            {
                // console.log(key, value, counter);
                counter += 1;
                this.images[key] = this.loadimgasset(value);
            }
        }

        // console.log(this.images);

        counter = 0;
        for (const [key, value] of Object.entries(sounds_list)) 
        {
            // console.log(key, value, counter);
            counter += 1;
            this.sounds[key] = this.loadsndasset(value);
        }

        this.setupgroups();
    }

    debug(...others)
    {
        let x = "";
        for (let val of others)
        {
            x += " " + val;
        }
        console.log(x);
    }

    turnoff_mouseclick()
    {
        this.mouseclicked = false;
        this.shiftmouseclicked = false;
    }

    setupgroups()
    {
        //predefined groups
        this.bg = [];
        this.ui = [];
        this.uitext = [];
        this.buttons = {};
        this.effx = [];

        //create a list of 3 empty lists
        this.layer1 = [];
        this.layer2 = [];
        this.layer3 = [];

        //Standard Game Groups
        this.groups = {};
    }

    loadimgasset(path)
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

    loadsndasset(path)
    {
        var asset = new Audio();
        // asset.ready = false;
        // asset.onload = setAssetReady;
        asset.src = path;
        return asset;
    }

    playsound(assetname,volume = 1)
    {
        var newsnd = this.sounds[assetname].cloneNode(true);

        newsnd.volume = volume;
        newsnd.play();
    }

    preloading_done(t, x, y)
    {	
        this.ctx.textBaseline = "top";
        this.ctx.fillStyle = "#000";
        this.ctx.fillText(t, x, y);

        var preload_ready = true;
        // for (const item in this.images)
        //     preload_ready = preload_ready && this.images[item].ready;

        for (const [key, value] of Object.entries(this.images)) 
        {
            preload_ready = preload_ready && this.images[key].ready;
            // console.log(key,value);
        }

        return preload_ready;
    }
    
    collided(x, y, obj)
    {
        // console.log(mouseX, mouseY);
        // console.log(obj);
        // console.log(btnPlay);

        if ((obj == null) || (obj == undefined))
        {
            // console.log("obj to be checked against is undefined or null");
            return false;
        }

        if ((x >= obj.x && x <= obj.x + obj.w) &&
            (y >= obj.y && y <= obj.y + obj.h))
            return true;
        else
            return false;
    }

    collidedobj(obj1, obj2)
    {
        if(((obj1.x < obj2.right()) && (obj1.right() > obj2.x) && (obj1.bottom() > obj2.top()) && (obj1.top() < obj2.bottom())))
        {      
            return true; 
        }
        else
            return false;
    }

    setProp(propname, value)
    {
        this.prop[propname] = value;
    }

    getProp(propname)
    {
        return this.prop[propname];
    }

    addProp(propname, value)
    {
        this.setProp(propname, this.prop[propname] + value);
    }

    minusProp(propname, value)
    {
        this.setProp(propname, this.prop[propname] - value);
    }

    addUI(ui_element)
    {
        this.ui.push(ui_element);
    }

    addUIText(uit)
    {
        this.uitext.push(uit);
    }

    clearUIText()
    {
        this.uitext = [];
    }

    resetUI()
    {
        this.ui = [];
    }

    addButton(btn, name)
    {
        // if (this.groups["BUTTONS"] == null)
        // {
        //     this.groups["BUTTONS"] = {};
        // }
        this.buttons[name] = btn;
    }

    // removeButton(name)
    // {
    //     // if (this.groups["BUTTONS"] == null)
    //     // {
    //     //     this.groups["BUTTONS"] = {};
    //     // }
    //     this.buttons[name] = null;
    // }

    addBackground(obj)
    {
        this.bg.push(obj);
    }

    addEffx(effx, delay, x, y, center = true, jitter = false)
    {
        var newEffx = new Effx(effx, delay, x, y, center, jitter);

        this.effx.push(newEffx);
    }

    nomoreEffx()
    {
        return this.effx.length == 0;
    }

    makeGroup(groupname, layer)
    {
        this.groups[groupname] = [];
        // console.log("pushing into",layer);

        if (layer == 1)
            this.layer1.push(groupname);
        else if (layer == 2)
            this.layer2.push(groupname);
        else if (layer == 3)
            this.layer3.push(groupname);
    }

    clearGroup(groupname)
    {
        this.groups[groupname] = [];
    }

    addGameObj(groupname, obj)
    {        
        this.groups[groupname].push(obj);
        return obj;
    }

    random(low, high)
    {
        return Math.floor(Math.random()*high) + low;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      
          // swap elements array[i] and array[j]
          // we use "destructuring assignment" syntax to achieve that
          // you'll find more details about that syntax in later chapters
          // same can be written as:
          // let t = array[i]; array[i] = array[j]; array[j] = t
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
    

    update()
    {
        // console.log("runnning", this.state);
        switch(this.state) 
        {
            case GAMESTATE_MENU_INIT:
                this.menu_init();
                break;
            case GAMESTATE_MENU_UPDATE:
                this.menu_update();
                break;
            case GAMESTATE_TUTORIAL_INIT:
                this.tutorial_init();
                break;
            case GAMESTATE_TUTORIAL_UPDATE:
                this.tutorial_update();
                break;
            case GAMESTATE_GAMEPLAY_INIT:
                this.gameplay_init();
                break;
            case GAMESTATE_GAMEPLAY_UPDATE:
                this.gameplay_update();
                break;
            case GAMESTATE_RESULTS_INIT:
                this.results_init();
                break;
            case GAMESTATE_RESULTS_UPDATE:
                this.results_update();
                break;
            default:
              // code block
              console.log("ERROR. SHOULD NOT COME HERE.")
        }

        //Handle Effx Engine
        for (var i = this.effx.length-1; i >= 0; i--)
        {
            // console.log("updating effx", this.effx[i].frame);

            this.effx[i].update();

            if (this.effx[i].dead)
                this.effx.splice(i,1);
        }

        this.draw();

        //Check for state transitions 
        if (this.state_exitcounter > 0)
        {
            // console.log("counting down",this.state_exitcounter);
            this.state_exitcounter--;
            if (this.state_exitcounter <= 0)
            {
                this.state = this.nextstate;

                this.setupgroups();
            }
        }
    }

    draw()
    {
        //Handle Draw
        // console.log("Game Engine draw");

        //Order of Draw is
        // this.bg
        // this.layer1 <-- all groups registered to it
        // this.layer2 <-- all groups registered to it (usually player)
        // this.layer3 <-- all groups registered to it
        // this.ui
        // this.uitext <-- makes use of UIText class
        // this.buttons
        // this.effx

        //Clear Canvas
        ge.ctx.fillStyle = "#000";
        ge.ctx.fillRect(0, 0, ge.stage.width, ge.stage.height);	
        
        //Draw Background
        for (var i = this.bg.length-1; i >= 0; i--)
        {
            var item = this.bg[i];
            
            //img - Specifies the image, canvas, or video element to use
            //sx - Optional. The x coordinate where to start clipping
            //sy - Optional. The y coordinate where to start clipping
            //swidth - Optional. The width of the clipped image
            //sheight - Optional. The height of the clipped image
            //x - The x coordinate where to place the image on the canvas
            //y - The y coordinate where to place the image on the canvas
            //width - Optional. The width of the image to use (stretch or reduce the image)
            //height - Optional. The height of the image to use (stretch or reduce the image)
            
            if (ge.images[item.type] != "")
                this.ctx.drawImage(ge.images[item.type], item.drawx, item.drawy, item.w, item.h, item.x, item.y, item.w, item.h);
        }

        //Draw Game Objects
        //Draw Layer 1        
        for (var i = this.layer1.length-1; i >= 0; i--)
        {
            var group = this.groups[ this.layer1[i] ];

            for (var j = 0; j < group.length; j++)
            {
                var item = group[j];
                
                if (ge.images[item.type] != "")
                    this.ctx.drawImage(ge.images[item.type], item.drawx, item.drawy, item.w, item.h, item.x, item.y, item.w, item.h);
            }
        }

        //Draw Layer 2        
        for (var i = this.layer2.length-1; i >= 0; i--)
        {
            var group = this.groups[ this.layer2[i] ];

            for (var j = 0; j < group.length; j++)
            {
                var item = group[j];

                this.ctx.drawImage(ge.images[item.type], item.drawx, item.drawy, item.w, item.h, item.x, item.y, item.w, item.h);
            }
        }

        //Draw Layer 3        
        for (var i = this.layer3.length-1; i >= 0; i--)
        {
            var group = this.groups[ this.layer3[i] ];
            
            for (var j = 0; j < group.length; j++)
            {
                var item = group[j];
                
                if (ge.images[item.type] != "")
                    this.ctx.drawImage(ge.images[item.type], item.drawx, item.drawy, item.w, item.h, item.x, item.y, item.w, item.h);
            }
        }

        //Draw UI
        for (var i = this.ui.length-1; i >= 0; i--)
        {
            var item = this.ui[i];
            
            if (ge.images[item.type] != "")
                this.ctx.drawImage(ge.images[item.type], item.drawx, item.drawy, item.w, item.h, item.x, item.y, item.w, item.h);
        }

        //Draw UI Text
        for (var i = this.uitext.length-1; i >= 0; i--)
        {
            var item = this.uitext[i];
            
            // this.ctx.drawImage(ge.images[item.type], item.drawx, item.drawy, item.w, item.h, item.x, item.y, item.w, item.h);
            this.ctx.font = item.fonts;
            this.ctx.fillStyle = item.fillStyle;
            this.ctx.textAlign = item.textAlign;
            this.ctx.fillText(item.value, item.x, item.y);

            if (item.wipe)
            {
                this.uitext.splice(i,1);
            }
        }

        //Draw Buttons
        for (const [key, value] of Object.entries(this.buttons)) 
        {
            var item = value;

            if (ge.images[item.type] != "")
                this.ctx.drawImage(ge.images[item.type], item.drawx, item.drawy, item.w, item.h, item.x, item.y, item.w, item.h);
        }

        //Draw Effects
        for (var i = this.effx.length-1; i >= 0; i--) 
        {
            var item = this.effx[i];
            
            if (ge.images[item.type] != "")
                this.ctx.drawImage(ge.images[item.type], item.drawx, item.drawy, item.w, item.h, item.x, item.y, item.w, item.h);
        }
    }
}


// //-------------------------
// //Generate new Game Engine
// //-------------------------
// var stage = document.getElementById("gameCanvas");
// //Update constants
// // var GAMESCREEN_LEFT = 8;//+stage.offsetLeft;
// // var GAMESCREEN_TOP = 8;//+stage.offsetTop;
// // var GAMESCREEN_RIGHT = 790;//+stage.offsetLeft;

// // var PLAYERSCREEN_LEFT = 15;//+stage.offsetLeft;
// // var PLAYERSCREEN_RIGHT = 780;//+stage.offsetLeft;

// var ge = new GameEngine(document, stage);

// var images_list = IMAGES_ASSETS;
// var sounds_list = SOUNDS_ASSETS;

// // ge.init(STAGE_WIDTH, STAGE_HEIGHT, GAMESTATE_GAMEPLAY_INIT, TIME_PER_FRAME, DEFAULT_STYLE, GAME_FONTS, images_list, sounds_list);
// ge.init(STAGE_WIDTH, STAGE_HEIGHT, GAMESTATE_MENU_INIT, TIME_PER_FRAME, DEFAULT_STYLE, GAME_FONTS, images_list, sounds_list);


// //---------------
// //Preloading ...
// //---------------
// var preloader, gameloop;
// function preloading()
// {
// 	//Assign all relevant functions
// 	ge.menu_init = run_menu_init;
// 	ge.menu_update = run_menu_update;

// 	ge.gameplay_init = run_gameplay_init;
// 	ge.gameplay_update = run_gameplay_update;

// 	ge.tutorial_init = run_tutorial_init;
// 	ge.tutorial_update = run_tutorial_update;
	
// 	ge.results_init = run_results_init;
// 	ge.results_update = run_results_update;

// 	if (ge.preloading_done(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y))
// 	{
// 		// console.log("preloading done");
// 		clearInterval(preloader);

// 		gameloop = setInterval(gametick, ge.framerate);

//         stage.addEventListener("click", canvasClick, false);
//         stage.addEventListener("mousemove", canvasMouseMove, false);
//         stage.addEventListener("mousedown", canvasMouseDown, false);	
//         document.addEventListener("keyup", keyUpHandler, false);
// 	}
// }
// preloader = setInterval(preloading, ge.framerate);

// //--------------------------------
// //Register Mouse and Keyboard ...
// //--------------------------------
// function canvasClick(event)
// {	
//     ge.mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
//     ge.mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;

//     // console.log("canvasclick", ge.mouseX, ge.mouseY);
// 	// console.log("mouseX, mouseY", event.clientX, event.clientY);
// 	// console.log("stage offset", stage.offsetLeft, stage.offsetTop);
// 	// console.log("document offset", document.documentElement.scrollLeft, document.documentElement.scrollTop);
// 	// console.log("--------------");
    
//     ge.mouseclicked = true;

// 	if (event.shiftKey)
// 		ge.shiftmouseclicked = true;
// }

// function canvasMouseDown(event)
// {
//     // console.log("mouse down", this.mouseX, this.mouseY);

//     ge.mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
//     ge.mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;

//     ge.mousedown = true;
// }

// function canvasMouseMove(event)
// {
//     // console.log("mouse move", this.mouseX, this.mouseY);

//     ge.mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
//     ge.mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;

//     ge.mousemove = true;
// }

// function keyUpHandler(event)
// {
// 	var keyPressed = String.fromCharCode(event.keyCode);
// 	// ge.debug(keyPressed, event.keyCode);
	
// 	if (event.keyCode == 32) // SPACEBAR KEY
// 	{
// 		ge.keys[ge.SPACEBAR] = true;
// 	}
// 	else if (event.keyCode == 13)
// 	{
// 		ge.keys[ge.ENTER] = true;
// 	}
// 	else if (event.keyCode == 27) // ESCAPE KEY
// 	{
// 		ge.keys[ge.ESCAPE] = true;
// 	}
// 	else if (event.keyCode == 49) //1 Key
// 	{
// 		ge.keys[ge.ONE] = true;
// 	}
// 	else if (event.keyCode == 50) //2 Key
// 	{
// 		ge.keys[ge.TWO] = true;

// 		// ge.setProp("nextstagedelay",0);
// 	}
// 	else if (event.keyCode == 51) //3 Key
// 	{
// 		ge.keys[ge.THREE] = true;

// 	}
// 	else if (event.keyCode == 52) //4 Key
// 	{
// 		ge.keys[ge.FOUR] = true;
// 	}
// 	else if (event.keyCode == 53) //5 Key
// 	{
// 		ge.keys[ge.FIVE] = true;
// 	}
// 	// else if (event.keyCode == 16) //SHIFT Key
// 	// {
// 	// 	ge.keys[ge.SHIFT] = true;
// 	// }
// }

// function gametick()
// {
// 	// console.log(ge.state);
// 	ge.update();
// }

// //#####################
// //#####################
// //MENU FUNCTIONS
// //#####################
// //#####################

// function run_menu_init()
// {
// 	// console.log("menu init");

// 	ge.addBackground(new GameObj(OBJ_BACKGROUND_HOME));

// 	// // ge.mkgroup(GROUP_UI, LAYER_UI);

// 	var newbtn = new Button(OBJ_BTN_START);
// 	ge.addButton(newbtn, "Start");
	
// 	// var newbtn = new Button(OBJ_BTN_TUTORIAL);
// 	// ge.addButton(newbtn, "Tutorial");

// 	ge.state = GAMESTATE_MENU_UPDATE;
// }

// function run_menu_update()
// {
// 	// console.log("menu update");
// 	// console.log("Mouse:", ge.mouseX, ge.mouseY);

// 	//handle input
// 	if (ge.mouseclicked)
// 	{
// 		//clicks detected
// 		ge.turnoff_mouseclick(); //mouseclicked = false;
// 		ge.mousedown = false;

// 		//check if it is the Play button
// 		if (ge.collided(ge.mouseX, ge.mouseY, ge.buttons["Start"]))
// 		{	
// 			// console.log("go to next screen");

// 			ge.state_exitcounter = STATE_EXITCOUNTER;
// 			ge.nextstate = GAMESTATE_TUTORIAL_INIT;

// 			ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, ge.mouseX, ge.mouseY);
// 			ge.playsound(SND_CLICK);
// 		}
// 		//check if it is the Tutorial button
// 		// else if (ge.collided(ge.mouseX, ge.mouseY, ge.buttons["Tutorial"]))
// 		// {	
// 		// 	// console.log("go to next screen");

// 		// 	ge.state_exitcounter = STATE_EXITCOUNTER;
// 		// 	ge.nextstate = GAMESTATE_TUTORIAL_INIT;

// 		// 	// ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, ge.mouseX, ge.mouseY);
// 		// 	// ge.playsound(SND_BTN_PLAY);
// 		// }
// 	}
// 	else if (ge.mousedown)
// 	{
// 		//check if it is the Play button
// 		if (ge.collided(ge.mouseX, ge.mouseY, ge.buttons["Play"]))
// 		{	
// 			ge.buttons["Play"].set_mouseDown();
// 		}
// 		//check if it is the Play button
// 		// else if (ge.collided(ge.mouseX, ge.mouseY, ge.buttons["Tutorial"]))
// 		// {	
// 		// 	ge.buttons["Tutorial"].set_mouseDown();
// 		// }
// 	}
// 	else
// 	{
// 		//no clicks detected
// 		// for (i in ge.groups["BUTTONS"]) 
// 		for (const [key, item] of Object.entries(ge.buttons)) 
// 		{
// 			// console.log(item);
// 			if (ge.collided(ge.mouseX, ge.mouseY, item))
// 			{
// 				item.set_mouseOver();
// 			}
// 			else
// 				item.set_idle();
// 		}
// 	}
// }

// //#####################
// //#####################
// //TUTORIAL FUNCTIONS
// //#####################
// //#####################
// function run_tutorial_init()
// {
// 	// console.log("tutorial init");

// 	ge.addBackground(new GameObj(OBJ_BACKGROUND_TUTORIAL));

// 	var newbtn = new Button(OBJ_BTN_TUTORIAL_NEXT);

// 	ge.addButton(newbtn, "Next");

// 	//show ProTip
// 	let randomtip = ge.random(0,TIPS.length-1);
// 	ge.addUIText(new UIText("#000","center",TIPS[randomtip],500, 550, fo=PROTIP_FONTS, wipe=false));


// 	ge.state = GAMESTATE_TUTORIAL_UPDATE;
// }

// function run_tutorial_update()
// {
// 	// console.log("tutorial update");

// 	//handle input
// 	if (ge.mouseclicked)
// 	{
// 		//clicks detected
// 		ge.turnoff_mouseclick(); //ge.mouseclicked = false;
// 		ge.mousedown = false;

// 		//check if it is the Back button
// 		// console.log(ge.mouseX, ge.mouseY, ge.buttons["Back"]);
// 		if (ge.collided(ge.mouseX, ge.mouseY, ge.buttons["Next"]))
// 		{	
// 			// console.log("go to next screen");

// 			ge.state_exitcounter = STATE_EXITCOUNTER;
// 			ge.nextstate = GAMESTATE_GAMEPLAY_INIT;

// 			ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, ge.mouseX, ge.mouseY);
// 			ge.playsound(SND_RUN);
// 		}
// 	}
// 	else if (ge.mousedown)
// 	{
// 		//check if it is the Back button
// 		if (ge.collided(ge.mouseX, ge.mouseY, ge.buttons["Next"]))
// 		{	
// 			ge.buttons["Next"].set_mouseDown();
// 		}
// 	}
// 	else
// 	{
// 		//no clicks detected
// 		// for (i in ge.groups["BUTTONS"]) 
// 		for (const [key, item] of Object.entries(ge.buttons)) 
// 		{
// 			// console.log(item);
// 			if (ge.collided(ge.mouseX, ge.mouseY, item))
// 			{
// 				item.set_mouseOver();
// 			}
// 			else
// 				item.set_idle();
// 		}
// 	}
// }

// //#####################
// //#####################
// //RESULTS FUNCTIONS
// //#####################
// //#####################
// function run_results_init()
// {
// 	// console.log("results init");

// 	// if (ge.getProp("win"))
// 	// {
// 	// 	ge.addBackground(new GameObj(OBJ_BACKGROUNDRESULTS_WIN));
// 	// 	//play sound
// 	// 	ge.playsound(SND_CONGRATS);
// 	// }
// 	// else
// 	// {
// 	// 	ge.addBackground(new GameObj(OBJ_BACKGROUNDRESULTS_LOSE));
// 	// 	//play sound
// 	// 	ge.playsound(SND_LOSE);
// 	// }

// 	ge.addBackground(new GameObj(OBJ_BACKGROUND_WIN));
// 	var newbtn = new Button(OBJ_BTN_BACK);
// 	ge.addButton(newbtn, "Back");

// 	ge.playsound(SND_RUN);

// 	// //add UI
// 	// console.log("score",ge.getProp("score"));
// 	// ge.addUIText(new UIText("#FFF","center",ge.getProp("score"),RESULTS_SCORE_X, RESULTS_SCORE_Y, fo=POINTS_FONTS, wipe=false));

// 	ge.state = GAMESTATE_RESULTS_UPDATE;
// }

// function run_results_update()
// {
// 	// console.log("results update");

// 	//handle input
// 	if (ge.mouseclicked)
// 	{
// 		//clicks detected
// 		ge.turnoff_mouseclick(); //ge.mouseclicked = false;
// 		ge.mousedown = false;

// 		//check if it is the Back button
// 		// console.log(ge.mouseX, ge.mouseY, ge.buttons["Back"]);
// 		if (ge.collided(ge.mouseX, ge.mouseY, ge.buttons["Back"]))
// 		{	
// 			// console.log("go to next screen");

// 			ge.state_exitcounter = STATE_EXITCOUNTER;
// 			ge.nextstate = GAMESTATE_MENU_INIT;

// 			ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, ge.mouseX, ge.mouseY);
// 			ge.playsound(SND_RUN);
// 		}
// 	}
// 	else if (ge.mousedown)
// 	{
// 		//check if it is the Back button
// 		if (ge.collided(ge.mouseX, ge.mouseY, ge.buttons["Back"]))
// 		{	
// 			ge.buttons["Back"].set_mouseDown();
// 		}
// 	}
// 	else
// 	{
// 		//no clicks detected
// 		// for (i in ge.groups["BUTTONS"]) 
// 		for (const [key, item] of Object.entries(ge.buttons)) 
// 		{
// 			// console.log(item);
// 			if (ge.collided(ge.mouseX, ge.mouseY, item))
// 			{
// 				item.set_mouseOver();
// 			}
// 			else
// 				item.set_idle();
// 		}
// 	}
// }

// //#####################
// //#####################
// //GAMEPLAY FUNCTIONS
// //#####################
// //#####################
// function run_gameplay_init()
// {
// 	// console.log("gameplay init");

// 	ge.addBackground(new GameObj(OBJ_BACKGROUND_GAME));

// 	//make cancel button
// 	ge.makeGroup(GROUP_CANCEL,3);
// 	var btnCancel = ge.addGameObj(GROUP_CANCEL, new ButtonCancel(OBJ_CANCEL, OBJ_CANCEL_PROP));
// 	ge.setProp(CANCEL, btnCancel);

// 	//make execute button
// 	// var btnExecute = new ButtonExecute(OBJ_BTN_EXECUTE, OBJ_BTN_EXECUTE_PROP);
// 	var btn_execute = new Button(OBJ_BTN_EXECUTE);
// 	ge.addButton(btn_execute,BTN_EXECUTE);
// 	ge.setProp(BTN_EXECUTE, btn_execute);

// 	//make retry button
// 	var btnRetry = new Button(OBJ_BTN_RETRY);
// 	ge.addButton(btnRetry, BTN_RETRY);
// 	ge.setProp(BTN_RETRY, btnRetry);
// 	btnRetry.setPos(-1000,-1000);

// 	//make next button
// 	var btnNext = new Button(OBJ_BTN_NEXT);
// 	ge.addButton(btnNext, BTN_NEXT);
// 	ge.setProp(BTN_NEXT, btnNext);
// 	btnNext.setPos(-1000,-1000);

// 	//make game back button
// 	var btnGameBack = new Button(OBJ_BTN_GAMEBACK);
// 	ge.addButton(btnGameBack, BTN_GAMEBACK);
// 	ge.setProp(BTN_GAMEBACK, btnGameBack);
// 	btnGameBack.setPos(-1000,-1000);

// 	//make sockets
// 	ge.makeGroup(GROUP_SOCKETS, 1); 
	
// 	ge.addGameObj(GROUP_SOCKETS, new Socket(OBJ_SOCKET1, OBJ_SOCKET_PROP1));
// 	ge.addGameObj(GROUP_SOCKETS, new Socket(OBJ_SOCKET2, OBJ_SOCKET_PROP2));
// 	ge.addGameObj(GROUP_SOCKETS, new Socket(OBJ_SOCKET3, OBJ_SOCKET_PROP3));
// 	ge.addGameObj(GROUP_SOCKETS, new Socket(OBJ_SOCKET4, OBJ_SOCKET_PROP4));
// 	ge.addGameObj(GROUP_SOCKETS, new Socket(OBJ_SOCKET5, OBJ_SOCKET_PROP5));
// 	ge.addGameObj(GROUP_SOCKETS, new Socket(OBJ_SOCKET6, OBJ_SOCKET_PROP6));

// 	ge.setProp(SOCKET_CLICKED, -1);

// 	//make code tiles
// 	ge.makeGroup(GROUP_CODE_TILES,2);
// 	var active_socket = -1;

// 	ge.setProp(CODE,[null, null, null, null, null, null]);
// 	ge.setProp(RUNCODE,false);

// 	//make small tiles
// 	ge.setProp(HELP_TILES_IN, false);
// 	ge.makeGroup(GROUP_TILES_SMALL, 3); 

// 	ge.addGameObj(GROUP_TILES_SMALL, new Tile_Small(OBJ_TILE_XY_SMALL, OBJ_TILE_XY_SMALL_PROP));
// 	ge.addGameObj(GROUP_TILES_SMALL, new Tile_Small(OBJ_TILE_YX_SMALL, OBJ_TILE_YX_SMALL_PROP));
// 	ge.addGameObj(GROUP_TILES_SMALL, new Tile_Small(OBJ_TILE_YZ_SMALL, OBJ_TILE_YZ_SMALL_PROP));
// 	ge.addGameObj(GROUP_TILES_SMALL, new Tile_Small(OBJ_TILE_ZY_SMALL, OBJ_TILE_ZY_SMALL_PROP));
// 	ge.addGameObj(GROUP_TILES_SMALL, new Tile_Small(OBJ_TILE_XSWAPY_SMALL, OBJ_TILE_XSWAPY_SMALL_PROP));
// 	ge.addGameObj(GROUP_TILES_SMALL, new Tile_Small(OBJ_TILE_YSWAPZ_SMALL, OBJ_TILE_YSWAPZ_SMALL_PROP));

	
// 	ge.addGameObj(GROUP_TILES_SMALL, new Tile_Small(OBJ_TILE_XPRIME_SMALL, OBJ_TILE_XPRIME_SMALL_PROP));
// 	ge.addGameObj(GROUP_TILES_SMALL, new Tile_Small(OBJ_TILE_YPRIME_SMALL, OBJ_TILE_YPRIME_SMALL_PROP));
// 	ge.addGameObj(GROUP_TILES_SMALL, new Tile_Small(OBJ_TILE_ZPRIME_SMALL, OBJ_TILE_ZPRIME_SMALL_PROP));
	
// 	ge.addGameObj(GROUP_TILES_SMALL, new Tile_Small(OBJ_TILE_XCOLSWAPY_SMALL, OBJ_TILE_XCOLSWAPY_SMALL_PROP));
// 	ge.addGameObj(GROUP_TILES_SMALL, new Tile_Small(OBJ_TILE_YCOLSWAPZ_SMALL, OBJ_TILE_YCOLSWAPZ_SMALL_PROP));


// 	ge.makeGroup(GROUP_HISTORY1, 2);
// 	ge.makeGroup(GROUP_HISTORY2, 2);

// 	ge.setProp(HISTORY1, []);
// 	ge.setProp(HISTORY2, []);

// 	//make blocks
// 	ge.makeGroup(GROUP_BLOCKS, 2); 

	

// 	//make pointer
// 	ge.makeGroup(GROUP_POINTER,2);
// 	ge.addGameObj(GROUP_POINTER, new GameObj(OBJ_POINTER, OBJ_POINTER_PROP));
// 	ge.setProp(POINTER_INDEX, 0);
// 	pointer_hide();
// 	// colx = new Stack(COLX_X, COL_Y);
// 	// coly = new Stack(COLY_X, COL_Y);
// 	// colz = new Stack(COLZ_X, COL_Y);


// 	//set up stage
// 	// var originalsetup = setup();
// 	// ge.setProp(ORIGINALSETUP, originalsetup);

// 	var stages = STAGES;
// 	var curr_stage = 1;
// 	var originalsetup = setup(stages[curr_stage-1]);
// 	ge.setProp(ORIGINALSETUP, originalsetup);
// 	ge.setProp(CURR_STAGE, curr_stage);

	
// 	//make block guides
// 	ge.makeGroup(GROUP_BLOCKGUIDES,2);
// 	setup_blockguides(originalsetup);

// 	//make selector
// 	ge.makeGroup(GROUP_SELECTOR,3);
// 	var selector = new Selector(OBJ_SELECTOR, {});
// 	ge.addGameObj(GROUP_SELECTOR, selector);
// 	ge.setProp(SELECTOR, selector);

// 	//make code help
// 	ge.makeGroup(GROUP_CODEHELP,1);
// 	var codehelp = new CodeHelp(OBJ_CODEHELP, {});
// 	ge.addGameObj(GROUP_CODEHELP, codehelp);
// 	ge.setProp(CODEHELP, codehelp);

// 	ge.setProp(CURR_RUN, 1);
	
// 	//check win
// 	ge.setProp(CHECKWIN, false);

// 	ge.setProp(LOST, false);

// 	ge.state = GAMESTATE_GAMEPLAY_UPDATE;

// 	//add UI
	
// 	// ge.addUIText(new UIText("#FFF","left","STAGE",20, 25, fo=GAME_FONTS, wipe=false));
// 	// ge.addUIText(new UIText("#000","left","Insert Your Codes Here",90, 160, fo=GAME_FONTS, wipe=false));

// 	ge.setProp("Freeze", false);

// 	ge.setProp(FIRSTHELP, true);
// 	ge.setProp(FIRSTHELPCOUNTER, FIRSTHELPCOUNTERMAX);


// // 	ge.playsound(SND_START_GAME);
// }

// function run_gameplay_update()
// {
// 	// console.log("gameplay update");

// 	//HANDLE HELP
// 	//-------------
// 	if (ge.getProp(FIRSTHELP))
// 	{
// 		ge.addProp(FIRSTHELPCOUNTER, -1);

// 		if (ge.getProp(FIRSTHELPCOUNTER) == 0)
// 		{
// 			ge.setProp(FIRSTHELPCOUNTER, FIRSTHELPCOUNTERMAX);

// 			//add effx
			
// 			ge.addEffx(OBJ_BIGSPARKLE2, EFFX_DELAY, OBJ_SOCKET1[3]+OBJ_SOCKET1[1]/2, OBJ_SOCKET1[4]+OBJ_SOCKET1[2]/2);
// 		}
// 	}

// 	//HANDLE CODE RUN
// 	//---------------
// 	if (ge.keys[ge.ENTER])
// 	{
// 		// console.log("ENTER KEY");
// 		// ge.keys[ge.ENTER] = false;

// 		// // ge.pause = !ge.pause;

// 		// shift_small_tiles_out();

// 		// ge.setProp(RUNCODE,true);
// 	}

// 	if (ge.keys[ge.ESCAPE])
// 	{
// 		// console.log("ESCAPE KEY");
// 		// ge.keys[ge.ESCAPE] = false;

// 		// //clear all code tiles
// 		// ge.setProp(CODE,[null,null,null,null,null,null]);
		
// 		// ge.clearGroup(GROUP_CODE_TILES);

// 		// ge.setProp(RUNCODE,false);

// 		// shift_small_tiles_out();

// 		// var colx = ge.getProp(COLX);
// 		// colx.peekcolour();
// 	}



// 	//HANDLE INPUTS
// 	//-------------
// 	if (ge.mousemove)
// 	{
// 		ge.mousemove = false;

// 		// console.log("Freeze",ge.getProp("Freeze"));
// 		if (!ge.getProp("Freeze"))
// 		{
// 			//check if interaction is with codes
// 			var collidedWithCode = false;
// 			var btnCancel = ge.getProp(CANCEL);
// 			// console.log(btnCancel);

// 			var itemlist = ge.getProp(CODE);

// 			for (var i = 0; i < itemlist.length; i++)
// 			{
// 				var item = itemlist[i];
	
// 				if (item !== null)
// 				{
// 					if (ge.collided(ge.mouseX, ge.mouseY, item))
// 					{
	
// 						btnCancel.setPos(item.right()-CANCEL_OFFSET_X,
// 							item.top()-CANCEL_OFFSET_Y);
	
// 						btnCancel.prop[INDEX] = i;
	
// 						collidedWithCode = true;
// 					}
// 				}
// 			}
	

// 			//check to set help for mouse over of code tiles

// 			var itemlist = ge.groups[GROUP_TILES_SMALL];
// 			var did_collide = false;
			
// 			var codehelp = ge.getProp(CODEHELP);
	
// 			for (var i = itemlist.length-1; i >= 0; i--)
// 			{
// 				var item = itemlist[i];
	
// 				if (ge.collided(ge.mouseX, ge.mouseY, item))
// 				{	
// 					did_collide = true;
// 					codehelp.goto(item.prop[CODE]);
// 				}
// 			}
// 			if (!did_collide)
// 				codehelp.goto(TILE_NULL);

// 			//------------
		
// 			if (!collidedWithCode)
// 			{
// 				btnCancel.setPos(-1000,-1000);
// 			}

// 			ge.setProp(CANCEL, btnCancel);
// 		}
// 	}

// 	if (ge.mouseclicked)
// 	{
// 		//clicks detected
// 		let shift_is_held = false;
// 		if (ge.shiftmouseclicked)
// 			shift_is_held = true;

// 		ge.turnoff_mouseclick(); //ge.mouseclicked = false;
// 		ge.mousedown = false;

// 		//check if interaction is with btnGameBack
// 		var btnGameBack = ge.getProp(BTN_GAMEBACK);
// 		if (ge.collided(ge.mouseX, ge.mouseY, btnGameBack))
// 		{
// 			ge.setProp(LOST, false);

// 			ge.state_exitcounter = STATE_EXITCOUNTER;
// 			ge.nextstate = GAMESTATE_MENU_INIT;

// 			ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, ge.mouseX, ge.mouseY);

// 			ge.setProp("Freeze", false);

// 			btnGameBack.setPos(-1000,-1000);
// 		}

// 		//check if interaction is with btnRetry
// 		var btnRetry = ge.getProp(BTN_RETRY);
// 		if (ge.collided(ge.mouseX, ge.mouseY, btnRetry))
// 		{	
// 			// console.log("clicked on retry");

// 			ge.setProp(LOST, false);

// 			ge.clearUIText();

// 			//shift the retry button away
// 			btnRetry.setPos(-1000,-1000);

// 			//setup again
// 			var originalsetup = ge.getProp(ORIGINALSETUP);
// 			setup(originalsetup);

// 			//add in history
// 			var history;
// 			var currhistorygroup;
// 			if (ge.getProp(CURR_RUN) == 1)
// 			{
// 				history = ge.getProp(HISTORY1);
// 				currhistorygroup = GROUP_HISTORY1;
// 				historyprop = OBJ_HISTORY1_PROP;
// 				historyposx = HISTORY1_X;
// 				historyposy = HISTORY1_Y;
// 			}
// 			else if (ge.getProp(CURR_RUN) == 2)
// 			{
// 				history = ge.getProp(HISTORY2);
// 				currhistorygroup = GROUP_HISTORY2;
// 				historyprop = OBJ_HISTORY2_PROP;
// 				historyposx = HISTORY2_X;
// 				historyposy = HISTORY2_Y;
// 			}

// 			for (var i = 0; i < history.length; i++)
// 			{
// 				var obj = null;
// 				switch(history[i]) 
// 				{
// 					case TILE_NULL:
// 						break;
// 					case TILE_XY:
// 						obj = ge.addGameObj(currhistorygroup, new Tile_Small(OBJ_TILE_XY_SMALL, historyprop));
// 						break;
// 					case TILE_YX:
// 						obj = ge.addGameObj(currhistorygroup, new Tile_Small(OBJ_TILE_YX_SMALL, historyprop));
// 						break;
// 					case TILE_YZ:
// 						obj = ge.addGameObj(currhistorygroup, new Tile_Small(OBJ_TILE_YZ_SMALL, historyprop));
// 						break;
// 					case TILE_ZY:
// 						obj = ge.addGameObj(currhistorygroup, new Tile_Small(OBJ_TILE_ZY_SMALL, historyprop));
// 						break;
					
// 					case TILE_XPRIME:
// 						obj = ge.addGameObj(currhistorygroup, new Tile_Small(OBJ_TILE_XPRIME_SMALL, historyprop));
// 						break;
// 					case TILE_YPRIME:
// 						obj = ge.addGameObj(currhistorygroup, new Tile_Small(OBJ_TILE_YPRIME_SMALL, historyprop));
// 						break;
// 					case TILE_ZPRIME:
// 						obj = ge.addGameObj(currhistorygroup, new Tile_Small(OBJ_TILE_ZPRIME_SMALL, historyprop));
// 						break;
					
// 					case TILE_XSWAPY:
// 						obj = ge.addGameObj(currhistorygroup, new Tile_Small(OBJ_TILE_XSWAPY_SMALL, historyprop));
// 						break;
// 					case TILE_YSWAPZ:
// 						obj = ge.addGameObj(currhistorygroup, new Tile_Small(OBJ_TILE_YSWAPZ_SMALL, historyprop));
// 						break;

// 					case TILE_XCOLSWAPY:
// 						obj = ge.addGameObj(currhistorygroup, new Tile_Small(OBJ_TILE_XCOLSWAPY_SMALL, historyprop));
// 						break;
// 					case TILE_YCOLSWAPZ:
// 						obj = ge.addGameObj(currhistorygroup, new Tile_Small(OBJ_TILE_YCOLSWAPZ_SMALL, historyprop));
// 						break;
					
// 					default:
// 						// code block
// 						console.log("ERROR. SHOULD NOT COME HERE.")
// 				}
// 				// console.log("tracking",history[i],historyposx[i]);
// 				if (obj!=null)
// 					obj.setPos(historyposx[i], historyposy);
// 			}

// 			//increament history run
// 			ge.addProp(CURR_RUN, 1);

// 			//clear code tiles
// 			ge.clearGroup(GROUP_CODE_TILES);
// 			ge.setProp(CODE,[null, null, null, null, null, null]);

// 			//bring run button back
// 			shift_btn_execute_in();

// 			ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, ge.mouseX, ge.mouseY);
// 			ge.playsound(SND_RUN);

// 			ge.setProp("Freeze", false);

// 			return;
// 		}

// 		if (ge.getProp(LOST))
// 			return;

// 		//check if interaction is with btnExecute
// 		if (ge.collided(ge.mouseX, ge.mouseY, ge.buttons[BTN_EXECUTE]))
// 		{	
// 			// console.log("clicked on execute");

// 			shift_small_tiles_out();
// 			shift_btn_execute_out();

// 			ge.setProp(RUNCODE,true);

// 			//add in setting runcode codes into an array already
// 			var tiles=[];
// 			let codelist = ge.getProp(CODE);

// 			for (var i = 0; i<codelist.length; i++)
// 			{
// 				var code = codelist[i];
				
// 				var curr_code;
// 				if (code !== null)
// 				{
// 					curr_code = code.prop[CODE];
// 				}
// 				else
// 				{
// 					curr_code = TILE_NULL;
// 					// console.log("it is null, so ignore");
// 				}
// 				tiles.push(curr_code);
// 			}
// 			// console.log(tiles);

// 			ge.setProp("Freeze", true);
// 			ge.setProp(RUNCODE_TILES,tiles);

// 			ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, ge.mouseX, ge.mouseY);
// 			ge.playsound(SND_RUN);
// 		}

// 		//check if interaction is with btnNext
// 		var btnNext = ge.getProp(BTN_NEXT);
// 		if (ge.collided(ge.mouseX, ge.mouseY, btnNext))
// 		{	
// 			// console.log("clicked on next");

// 			ge.clearUIText();

// 			//shift the retry button away
// 			btnNext.setPos(-1000,-1000);

// 			//increament history run
// 			ge.setProp(CURR_RUN, 1);

// 			//clear code tiles and history
// 			ge.clearGroup(GROUP_CODE_TILES);
// 			ge.setProp(CODE,[null, null, null, null, null, null]);
// 			ge.setProp(HISTORY1, []);
// 			ge.setProp(HISTORY2, []);
// 			ge.clearGroup(GROUP_HISTORY1);
// 			ge.clearGroup(GROUP_HISTORY2);


// 			var stages = STAGES;
// 			ge.addProp(CURR_STAGE,1);

// 			//see if win all already
// 			var curr_stage = ge.getProp(CURR_STAGE);
// 			if (curr_stage > MAX_STAGES)
// 			{
// 				ge.clearUIText();

// 				//game completed
// 				ge.state_exitcounter = STATE_EXITCOUNTER;
// 				ge.nextstate = GAMESTATE_RESULTS_INIT;

// 				ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, ge.mouseX, ge.mouseY);
// 			}
// 			else
// 			{
// 				var originalsetup = setup(stages[curr_stage-1]);
// 				ge.setProp(ORIGINALSETUP, originalsetup);
// 				// setup(originalsetup);

// 				setup_blockguides(originalsetup);
	
// 				//bring run button back
// 				shift_btn_execute_in();

// 				ge.setProp(FIRSTHELP, true);
// 			}

// 			ge.setProp("Freeze", false);
// 			// ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, ge.mouseX, ge.mouseY);
// 			ge.playsound(SND_RUN);
// 		}
		
		
// 		//check if interaction is with btnCancel
// 		var btnCancel = ge.getProp(CANCEL);
// 		if (ge.collided(ge.mouseX, ge.mouseY, btnCancel))
// 		{
// 			// console.log("clicked on cancel button with index",btnCancel.prop[INDEX]);

// 			let code = ge.getProp(CODE);
// 			// console.log("codelist",code);

// 			var obj = code[btnCancel.prop[INDEX]];
// 			obj.remove();

// 			// console.log("test",obj);
			
// 			code[btnCancel.prop[INDEX]] = null;
// 			ge.setProp(CODE,code);

// 			// console.log("CANCELLING",btnCancel.prop[INDEX]);

// 			ge.setProp(SOCKET_CLICKED, -1);

// 			//shift the cancel button away
// 			btnCancel.setPos(-1000,-1000);
// 			shift_small_tiles_out();

// 			// ge.clearGroup(GROUP_TILES_SMALL);

// 			ge.playsound(SND_CANCEL);

// 			return;
// 		}

// 		//check if interaction is with sockets
// 		if (!ge.getProp("Freeze"))
// 		{
// 			var itemlist = ge.groups[GROUP_SOCKETS];
// 			for (var i = itemlist.length-1; i >= 0; i--)
// 			{
// 				var item = itemlist[i];
	
// 				if (ge.collided(ge.mouseX, ge.mouseY, item))
// 				{	
// 					// console.log("clicked on socket",item.prop["index"],i);
	
// 					ge.setProp(FIRSTHELP, false);
	
// 					// console.log("comparing", ge.getProp(SOCKET_CLICKED), item.prop["index"]);
// 					if (ge.getProp(SOCKET_CLICKED) == item.prop["index"])
// 					{
// 						shift_small_tiles_out();
	
// 						ge.setProp(SOCKET_CLICKED, -1);
// 					}
// 					else
// 					{
// 						// var selector = ge.getProp(SELECTOR);
// 						// selector.goto(item.prop["index"]);
// 						// selector.setPos(SELECTOR_POS[item.prop["index"]][0], SELECTOR_POS[item.prop["index"]][1]);
	
// 						// console.log("item prop",item.prop["index"]);
// 						shift_small_tiles_in(i);
	
// 						ge.setProp(SOCKET_CLICKED, item.prop["index"]);
// 					}
	
					
	
// 					//make socket tiles help
					
// 					// if (ge.getProp(HELP_TILES_IN))
// 					// 	shift_small_tiles_out();
// 					// else
// 						// shift_small_tiles_in(i);
	
// 					active_socket = item.prop["index"];
	
// 					// ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, ge.mouseX, ge.mouseY);
// 					ge.playsound(SND_SELECT,0.5);
	
// 					break;
// 				}
// 			}
// 		}

// 		// check if interaction is with tiles_small
// 		var itemlist = ge.groups[GROUP_TILES_SMALL];
// 		for (var i = itemlist.length-1; i >= 0; i--)
// 		{
// 			var item = itemlist[i];

// 			if (ge.collided(ge.mouseX, ge.mouseY, item))
// 			{	
// 				// console.log("clicked on tile_small",i);
// 				// console.log(CODE_TILE_POS[active_socket-1][0], CODE_TILE_POS[active_socket-1][1])
// 				// console.log("------------");

// 				var obj;
// 				switch(item.prop[CODE]) 
// 				{
// 					case TILE_XY:
// 						obj = ge.addGameObj(GROUP_CODE_TILES, new Code_Tile(OBJ_TILE_XY, OBJ_TILE_XY_PROP));
// 						break;
// 					case TILE_YX:
// 						obj = ge.addGameObj(GROUP_CODE_TILES, new Code_Tile(OBJ_TILE_YX, OBJ_TILE_YX_PROP));
// 						break;
// 					case TILE_YZ:
// 						obj = ge.addGameObj(GROUP_CODE_TILES, new Code_Tile(OBJ_TILE_YZ, OBJ_TILE_YZ_PROP));
// 						break;
// 					case TILE_ZY:
// 						obj = ge.addGameObj(GROUP_CODE_TILES, new Code_Tile(OBJ_TILE_ZY, OBJ_TILE_ZY_PROP));
// 						break;
					
// 					case TILE_XPRIME:
// 						obj = ge.addGameObj(GROUP_CODE_TILES, new Code_Tile(OBJ_TILE_XPRIME, OBJ_TILE_XPRIME_PROP));
// 						break;
// 					case TILE_YPRIME:
// 						obj = ge.addGameObj(GROUP_CODE_TILES, new Code_Tile(OBJ_TILE_YPRIME, OBJ_TILE_YPRIME_PROP));
// 						break;
// 					case TILE_ZPRIME:
// 						obj = ge.addGameObj(GROUP_CODE_TILES, new Code_Tile(OBJ_TILE_ZPRIME, OBJ_TILE_ZPRIME_PROP));
// 						break;
					
// 					case TILE_XSWAPY:
// 						obj = ge.addGameObj(GROUP_CODE_TILES, new Code_Tile(OBJ_TILE_XSWAPY, OBJ_TILE_XSWAPY_PROP));
// 						break;
// 					case TILE_YSWAPZ:
// 						obj = ge.addGameObj(GROUP_CODE_TILES, new Code_Tile(OBJ_TILE_YSWAPZ, OBJ_TILE_YSWAPZ_PROP));
// 						break;

// 					case TILE_XCOLSWAPY:
// 						obj = ge.addGameObj(GROUP_CODE_TILES, new Code_Tile(OBJ_TILE_XCOLSWAPY, OBJ_TILE_XCOLSWAPY_PROP));
// 						break;
// 					case TILE_YCOLSWAPZ:
// 						obj = ge.addGameObj(GROUP_CODE_TILES, new Code_Tile(OBJ_TILE_YCOLSWAPZ, OBJ_TILE_YCOLSWAPZ_PROP));
// 						break;
					
// 					default:
// 						// code block
// 						console.log("ERROR. SHOULD NOT COME HERE.")
// 				}
// 				// var obj = ge.addGameObj(GROUP_CODE_TILES, new Tile(OBJ_TILE_XY, OBJ_TILE_XY_PROP));
// 				obj.setPos(CODE_TILE_POS[active_socket-1][0], CODE_TILE_POS[active_socket-1][1]);

// 				let code = ge.getProp(CODE);

// 				//mark original code to remove first if any
// 				if (code[active_socket-1] !== null)
// 				{
// 					code[active_socket-1].remove();
// 					// console.log("removing",code[active_socket-1]);
// 				}

// 				code[active_socket-1] = obj;
// 				ge.setProp(CODE,code);

// 				//NEW TRY: Advance small tiles to next socket after click
// 				// console.log("before joining", ge.getProp(SOCKET_CLICKED));
// 				if (shift_is_held)
// 				{
// 					if (ge.getProp(SOCKET_CLICKED) < 6)
// 					{
// 						ge.addProp(SOCKET_CLICKED,1);
// 						active_socket += 1;
						
// 						shift_small_tiles_in(ge.getProp(SOCKET_CLICKED)-1);
// 					}
// 					else
// 					{
// 						active_socket = -1;
// 						ge.setProp(SOCKET_CLICKED, -1);
// 						shift_small_tiles_out();
// 					}
// 				}
// 				else
// 				{
// 					active_socket = -1;
// 					ge.setProp(SOCKET_CLICKED, -1);
// 					shift_small_tiles_out();
// 				}

// 				// ge.clearGroup(GROUP_TILES_SMALL);

// 				// console.log("Added ",obj, ge.groups[GROUP_CODE_TILES]);

// 				ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, ge.mouseX, ge.mouseY);
// 				ge.playsound(SND_SELECT2,0.1);

// 				break;
// 			}
// 		}
// 	}
// 	else if (ge.mousedown)
// 	{
// 		//check if it is the Execute button
// 		if (ge.collided(ge.mouseX, ge.mouseY, ge.buttons[BTN_EXECUTE]))
// 		{	
// 			ge.buttons[BTN_EXECUTE].set_mouseDown();
// 		}
// 	}
// 	else
// 	{
// 		//no clicks detected
// 		for (const [key, item] of Object.entries(ge.buttons)) 
// 		{
// 			// console.log(item);
// 			if (ge.collided(ge.mouseX, ge.mouseY, item))
// 			{
// 				item.set_mouseOver();
// 			}
// 			else
// 				item.set_idle();
// 		}
// 	}

// 	// console.log("code tiles",ge.groups[GROUP_CODE_TILES].length);
// 	// console.log("codes",code);


// 	//HANDLE GAME
// 	//-----------
// 	// console.log("checking RUNCODE",ge.getProp(RUNCODE));
// 	if (ge.getProp(CURR_STAGE) <= MAX_STAGES)
// 		ge.addUIText(new UIText("#FFF","center","STAGE "+ge.getProp(CURR_STAGE)+" OF "+MAX_STAGES,500, 25, fo=GAME_FONTS, wipe=true));
	
// 	if (ge.getProp(RUNCODE))
// 	{
// 		// let history = [];
// 		let codelist = ge.getProp(RUNCODE_TILES);

// 		// console.log("***",codelist);

// 		var colx = ge.getProp(COLX);
// 		var coly = ge.getProp(COLY);
// 		var colz = ge.getProp(COLZ);

// 		if (codelist.length == 0)
// 		{
// 			//finished processing

// 			ge.setProp(RUNCODE, false);

// 			ge.setProp(CHECKWIN, true);

// 			pointer_hide();

// 			// console.log("reached end of animated loop for runcode");

			
// 		}
// 		else
// 		{
// 			//pick out the first code tile to process
// 			var code = codelist[0];
// 			var history = null;
			
// 			switch(code) 
// 			{
// 				case TILE_NULL:
// 					//do nothing
// 					codelist.splice(0,1);

// 					pointer_advance();

// 					break;
// 				//--------------------------------------------------
// 				case TILE_XY:
// 					//move top of X to top of Y
// 					pointer_advance();

// 					codelist.splice(0,1);
// 					history = code;

// 					if (coly.size() < MAX_STACK_SIZE)
// 					{
// 						if (!colx.isEmpty())
// 						{
// 							// console.log("entered here");
// 							codelist = [TILE_XY_ANIMATE, TILE_XY_DO].concat(codelist);

// 							var obj = colx.peek();
// 							var destxy = coly.topPos();

// 							obj.setDest(destxy[0], destxy[1], STEPS);

// 							ge.setProp(BLOCKS_TO_TRACK, [obj]);
// 						}
// 					}
// 					else
// 					{
// 						ge.playsound(SND_BAM);
// 					}
					
// 					break;
// 				case TILE_XY_ANIMATE:
// 					//move top of X to top of Y
// 					var blockslist = ge.getProp(BLOCKS_TO_TRACK);

// 					var all_reached = true;
// 					for (var i=0; i<blockslist.length; i++)
// 					{
// 						blockslist[i].moveToDest();
// 						// console.log("interim--->",blockslist[i].x, blockslist[i].y);
// 						all_reached = all_reached && blockslist[i].reached;
// 					}

// 					if (all_reached)
// 					{
// 						codelist.splice(0,1);
// 						// console.log("all reached");
// 					}

// 					break;
// 				case TILE_XY_DO:
// 					//move top of X to top of Y
// 					if (coly.size() < MAX_STACK_SIZE)
// 					{
// 						if (!colx.isEmpty())
// 						{
// 							var obj = colx.pop();
// 							coly.push(obj);
// 						}
// 					}

// 					codelist.splice(0,1);
					
// 					break;
// 				//--------------------------------------------------
// 				case TILE_YX:
// 					//move top of Y to top of X
// 					pointer_advance();

// 					codelist.splice(0,1);
// 					history = code;

// 					if (colx.size() < MAX_STACK_SIZE)
// 					{
// 						if (!coly.isEmpty())
// 						{
// 							codelist = [TILE_YX_ANIMATE, TILE_YX_DO].concat(codelist);

// 							var obj = coly.peek();
// 							var destxy = colx.topPos();

// 							obj.setDest(destxy[0], destxy[1], STEPS);

// 							ge.setProp(BLOCKS_TO_TRACK, [obj]);
// 						}
// 					}
// 					else
// 					{
// 						ge.playsound(SND_BAM);
// 					}

// 					break;
// 				case TILE_YX_ANIMATE:
// 					//move top of Y to top of X
// 					var blockslist = ge.getProp(BLOCKS_TO_TRACK);

// 					var all_reached = true;
// 					for (var i=0; i<blockslist.length; i++)
// 					{
// 						blockslist[i].moveToDest();
// 						// console.log("interim--->",blockslist[i].x, blockslist[i].y);
// 						all_reached = all_reached && blockslist[i].reached;
// 					}

// 					if (all_reached)
// 					{
// 						codelist.splice(0,1);
// 						// console.log("all reached");
// 					}

// 					break;
// 				case TILE_YX_DO:
// 					//move top of Y to top of X
// 					if (colx.size() < MAX_STACK_SIZE)
// 					{
// 						if (!coly.isEmpty())
// 						{
// 							var obj = coly.pop();
// 							colx.push(obj);
// 						}
// 					}

// 					codelist.splice(0,1);

// 					break;
// 				//--------------------------------------------------
// 				case TILE_YZ:
// 					//move top of Y to top of Z
// 					pointer_advance();

// 					codelist.splice(0,1);
// 					history = code;

// 					if (colz.size() < MAX_STACK_SIZE)
// 					{
// 						if (!coly.isEmpty())
// 						{
// 							codelist = [TILE_YZ_ANIMATE, TILE_YZ_DO].concat(codelist);

// 							var obj = coly.peek();
// 							var destxy = colz.topPos();

// 							obj.setDest(destxy[0], destxy[1], STEPS);

// 							ge.setProp(BLOCKS_TO_TRACK, [obj]);
// 						}
// 					}
// 					else
// 					{
// 						ge.playsound(SND_BAM);
// 					}

// 					break;
// 				case TILE_YZ_ANIMATE:
// 					//move top of Y to top of Z
// 					var blockslist = ge.getProp(BLOCKS_TO_TRACK);

// 					var all_reached = true;
// 					for (var i=0; i<blockslist.length; i++)
// 					{
// 						blockslist[i].moveToDest();
// 						// console.log("interim--->",blockslist[i].x, blockslist[i].y);
// 						all_reached = all_reached && blockslist[i].reached;
// 					}

// 					if (all_reached)
// 					{
// 						codelist.splice(0,1);
// 						// console.log("all reached");
// 					}

// 					break;
// 				case TILE_YZ_DO:
// 					//move top of Y to top of Z
// 					if (colz.size() < MAX_STACK_SIZE)
// 					{
// 						if (!coly.isEmpty())
// 						{
// 							var obj = coly.pop();
// 							colz.push(obj);
// 						}
// 					}

// 					codelist.splice(0,1);

// 					break;
// 				//--------------------------------------------------
// 				case TILE_ZY:
// 					//move top of Z to top of Y
// 					pointer_advance();

// 					codelist.splice(0,1);
// 					history = code;

// 					if (coly.size() < MAX_STACK_SIZE)
// 					{
// 						if (!colz.isEmpty())
// 						{
// 							codelist = [TILE_ZY_ANIMATE, TILE_ZY_DO].concat(codelist);

// 							var obj = colz.peek();
// 							var destxy = coly.topPos();

// 							obj.setDest(destxy[0], destxy[1], STEPS);

// 							ge.setProp(BLOCKS_TO_TRACK, [obj]);
// 						}
// 					}
// 					else
// 					{
// 						ge.playsound(SND_BAM);
// 					}

// 					break;
// 				case TILE_ZY_ANIMATE:
// 					//move top of Z to top of Y
// 					var blockslist = ge.getProp(BLOCKS_TO_TRACK);

// 					var all_reached = true;
// 					for (var i=0; i<blockslist.length; i++)
// 					{
// 						blockslist[i].moveToDest();
// 						// console.log("interim--->",blockslist[i].x, blockslist[i].y);
// 						all_reached = all_reached && blockslist[i].reached;
// 					}

// 					if (all_reached)
// 					{
// 						codelist.splice(0,1);
// 						// console.log("all reached");
// 					}

// 					break;
// 				case TILE_ZY_DO:
// 					//move top of Z to top of Y
// 					if (coly.size() < MAX_STACK_SIZE)
// 					{
// 						if (!colz.isEmpty())
// 						{
// 							var obj = colz.pop();
// 							coly.push(obj);
// 						}
// 					}

// 					codelist.splice(0,1);

// 					break;
// 				//--------------------------------------------------		
// 				case TILE_XPRIME:
// 					//flip order of colx
// 					pointer_advance();

// 					codelist.splice(0,1);
// 					history = code;

// 					if (colx.size() > 0)
// 					{
// 						codelist = [TILE_XPRIME_ANIMATE, TILE_XPRIME_DO].concat(codelist);


// 						var items = colx.items;
// 						let half_loop = Math.floor(items.length/2);

// 						//go from bottom up
// 						for (var i = 0; i < half_loop; i++)
// 						{
// 							var targetBlock = items[ items.length-i-1 ];
// 							items[i].setDest(targetBlock.x, targetBlock.y, STEPS);
// 						}

// 						//go from top down
// 						for (var i = items.length-1; i >= half_loop; i--)
// 						{
// 							var targetBlock = items[ items.length-i-1 ];
// 							items[i].setDest(targetBlock.x, targetBlock.y, STEPS);
// 						}

// 						ge.setProp(BLOCKS_TO_TRACK, items);
// 					}

// 					break;
// 				case TILE_XPRIME_ANIMATE:
// 					//flip order of colx
// 					var blockslist = ge.getProp(BLOCKS_TO_TRACK);

// 					var all_reached = true;
// 					for (var i=0; i<blockslist.length; i++)
// 					{
// 						blockslist[i].moveToDest();
// 						// console.log("interim--->",blockslist[i].x, blockslist[i].y);
// 						all_reached = all_reached && blockslist[i].reached;
// 					}

// 					if (all_reached)
// 					{
// 						codelist.splice(0,1);
// 						// console.log("all reached");
// 					}

// 					break;
// 				case TILE_XPRIME_DO:
// 					//flip order of colx
// 					if (colx.size() > 0)
// 					{
// 						var newcol = new Stack(COLX_X, COL_Y);;
// 						while (!colx.isEmpty())
// 						{
// 							newcol.push(colx.pop());
// 							// console.log("doing popping");
// 						}
						
// 						colx = newcol;
// 					}
						
// 					codelist.splice(0,1);

// 					break;
// 				//--------------------------------------------------	
// 				case TILE_YPRIME:
// 					//flip order of coly
// 					pointer_advance();
					
// 					codelist.splice(0,1);
// 					history = code;

// 					if (coly.size() > 0)
// 					{
// 						codelist = [TILE_YPRIME_ANIMATE, TILE_YPRIME_DO].concat(codelist);

// 						var items = coly.items;
// 						let half_loop = Math.floor(items.length/2);

// 						//go from bottom up
// 						for (var i = 0; i < half_loop; i++)
// 						{
// 							var targetBlock = items[ items.length-i-1 ];
// 							items[i].setDest(targetBlock.x, targetBlock.y, STEPS);
// 						}

// 						//go from top down
// 						for (var i = items.length-1; i >= half_loop; i--)
// 						{
// 							var targetBlock = items[ items.length-i-1 ];
// 							items[i].setDest(targetBlock.x, targetBlock.y, STEPS);
// 						}

// 						ge.setProp(BLOCKS_TO_TRACK, items);
// 					}

// 					break;

// 				case TILE_YPRIME_ANIMATE:
// 					//flip order of coly
// 					var blockslist = ge.getProp(BLOCKS_TO_TRACK);

// 					var all_reached = true;
// 					for (var i=0; i<blockslist.length; i++)
// 					{
// 						blockslist[i].moveToDest();
// 						// console.log("interim--->",blockslist[i].x, blockslist[i].y);
// 						all_reached = all_reached && blockslist[i].reached;
// 					}

// 					if (all_reached)
// 					{
// 						codelist.splice(0,1);
// 						// console.log("all reached");
// 					}

// 					break;

// 				case TILE_YPRIME_DO:
// 					//flip order of coly
// 					// console.log("at yprime");
// 					if (coly.size() > 0)
// 					{
// 						var newcol = new Stack(COLY_X, COL_Y);;
// 						while (!coly.isEmpty())
// 						{
// 							newcol.push(coly.pop());
// 						}
						
// 						coly = newcol;
// 					}
						
// 					codelist.splice(0,1);

// 					break;
// 				//--------------------------------------------------		
// 				case TILE_ZPRIME:
// 					//flip order of colz
// 					pointer_advance();
					
// 					codelist.splice(0,1);
// 					history = code;

// 					if (colz.size() > 0)
// 					{
// 						codelist = [TILE_ZPRIME_ANIMATE, TILE_ZPRIME_DO].concat(codelist);

// 						var items = colz.items;
// 						let half_loop = Math.floor(items.length/2);

// 						//go from bottom up
// 						for (var i = 0; i < half_loop; i++)
// 						{
// 							var targetBlock = items[ items.length-i-1 ];
// 							items[i].setDest(targetBlock.x, targetBlock.y, STEPS);
// 						}

// 						//go from top down
// 						for (var i = items.length-1; i >= half_loop; i--)
// 						{
// 							var targetBlock = items[ items.length-i-1 ];
// 							items[i].setDest(targetBlock.x, targetBlock.y, STEPS);
// 						}

// 						ge.setProp(BLOCKS_TO_TRACK, items);
// 					}

// 					break;

// 				case TILE_ZPRIME_ANIMATE:
// 					//flip order of colz
// 					var blockslist = ge.getProp(BLOCKS_TO_TRACK);

// 					var all_reached = true;
// 					for (var i=0; i<blockslist.length; i++)
// 					{
// 						blockslist[i].moveToDest();
// 						// console.log("interim--->",blockslist[i].x, blockslist[i].y);
// 						all_reached = all_reached && blockslist[i].reached;
// 					}

// 					if (all_reached)
// 					{
// 						codelist.splice(0,1);
// 						// console.log("all reached");
// 					}

// 					break;

// 				case TILE_ZPRIME_DO:
// 					//flip order of colz
// 					if (colz.size() > 0)
// 					{
// 						var newcol = new Stack(COLZ_X, COL_Y);
// 						while (!colz.isEmpty())
// 						{
// 							newcol.push(colz.pop());
// 						}
// 						colz = newcol;
// 					}
						
// 					codelist.splice(0,1);

// 					break;
// 				//--------------------------------------------------
// 				case TILE_XSWAPY:
// 					//swap x and y
// 					pointer_advance();

// 					codelist.splice(0,1);
// 					history = code;

// 					var obj_x = null;
// 					var obj_y = null;
// 					var obj = [];
// 					if (colx.size() > 0)
// 					{
// 						obj_x = colx.peek();
// 						obj.push(obj_x);
// 					}

// 					if (coly.size() > 0)
// 					{
// 						obj_y = coly.peek();
// 						obj.push(obj_y);
// 					}

// 					if (obj_x != null || obj_y != null)
// 					{
// 						codelist = [TILE_XSWAPY_ANIMATE, TILE_XSWAPY_DO].concat(codelist);
// 						// console.log("objects",obj_x, obj_y);
// 					}

// 					if (obj_x != null)
// 					{
// 						if (obj_y != null)
// 						{
// 							//swap to the obj_to's location
// 							obj_x.setDest(obj_y.x, obj_y.y, STEPS);
// 							// console.log("setting obj_x to another block",obj_y.x, obj_y.y);
// 						}
// 						else
// 						{
// 							//swap to the bottom of the column
// 							var destxy = coly.topPos();
// 							obj_x.setDest(destxy[0], destxy[1], STEPS);
							
// 							// console.log("setting obj_x to bottom",destxy[0], destxy[1]);
// 						}
// 					}

// 					if (obj_y != null)
// 					{
// 						if (obj_x != null)
// 						{
// 							//swap to the obj_from's location
// 							obj_y.setDest(obj_x.x, obj_x.y, STEPS);
// 						}
// 						else
// 						{
// 							//swap to the bottom of the column
// 							var destxy = colx.topPos();
// 							obj_y.setDest(destxy[0], destxy[1], STEPS);
// 						}
// 					}

// 					ge.setProp(BLOCKS_TO_TRACK, obj);

// 					break;

// 				case TILE_XSWAPY_ANIMATE:
// 					//swap x and y
// 					var blockslist = ge.getProp(BLOCKS_TO_TRACK);

// 					var all_reached = true;
// 					for (var i=0; i<blockslist.length; i++)
// 					{
// 						blockslist[i].moveToDest();
// 						// console.log("interim--->",blockslist[i].x, blockslist[i].y);
// 						all_reached = all_reached && blockslist[i].reached;
// 					}

// 					if (all_reached)
// 					{
// 						codelist.splice(0,1);
// 						// console.log("all reached");
// 					}

// 					break;

// 				case TILE_XSWAPY_DO:
// 					//swap x and y

// 					var temp_obj = null;
// 					//unload colx into temp obj
// 					if (colx.size() > 0)
// 					{
// 						temp_obj = colx.pop();
// 					}

// 					//unload coly into colx
// 					if (coly.size() > 0)
// 					{
// 						colx.push(coly.pop());
// 					}

// 					//push temp_obj into coly
// 					if (temp_obj !== null)
// 					{
// 						coly.push(temp_obj);
// 					}

// 					codelist.splice(0,1);

// 					break;
// 				//--------------------------------------------------
	
// 				case TILE_YSWAPZ:
// 					//swap y and z
// 					pointer_advance();
					
// 					codelist.splice(0,1);
// 					history = code;

// 					var obj_y = null;
// 					var obj_z = null;
// 					var obj = [];
// 					if (coly.size() > 0)
// 					{
// 						obj_y = coly.peek();
// 						obj.push(obj_y);
// 					}

// 					if (colz.size() > 0)
// 					{
// 						obj_z = colz.peek();
// 						obj.push(obj_z);
// 					}

// 					if (obj_y != null || obj_z != null)
// 					{
// 						codelist = [TILE_YSWAPZ_ANIMATE, TILE_YSWAPZ_DO].concat(codelist);
// 						// console.log("objects",obj_x, obj_y);
// 					}

// 					if (obj_y != null)
// 					{
// 						if (obj_z != null)
// 						{
// 							//swap to the obj_z's location
// 							obj_y.setDest(obj_z.x, obj_z.y, STEPS);
// 							// console.log("setting obj_x to another block",obj_y.x, obj_y.y);
// 						}
// 						else
// 						{
// 							//swap to the bottom of the column
// 							var destxy = colz.topPos();
// 							obj_y.setDest(destxy[0], destxy[1], STEPS);
							
// 							// console.log("setting obj_x to bottom",destxy[0], destxy[1]);
// 						}
// 					}

// 					if (obj_z != null)
// 					{
// 						if (obj_y != null)
// 						{
// 							//swap to the obj_y's location
// 							obj_z.setDest(obj_y.x, obj_y.y, STEPS);
// 						}
// 						else
// 						{
// 							//swap to the bottom of the column
// 							var destxy = coly.topPos();
// 							obj_z.setDest(destxy[0], destxy[1], STEPS);
// 						}
// 					}

// 					ge.setProp(BLOCKS_TO_TRACK, obj);

// 					break;

// 				case TILE_YSWAPZ_ANIMATE:
// 					//swap y and z
// 					var blockslist = ge.getProp(BLOCKS_TO_TRACK);

// 					var all_reached = true;
// 					for (var i=0; i<blockslist.length; i++)
// 					{
// 						blockslist[i].moveToDest();
// 						// console.log("interim--->",blockslist[i].x, blockslist[i].y);
// 						all_reached = all_reached && blockslist[i].reached;
// 					}

// 					if (all_reached)
// 					{
// 						codelist.splice(0,1);
// 						// console.log("all reached");
// 					}

// 					break;

// 				case TILE_YSWAPZ_DO:
// 					//swap y and z
// 					// console.log("at swap y and z");

// 					var temp_obj = null;
// 					//unload coly into temp obj
// 					if (coly.size() > 0)
// 					{
// 						temp_obj = coly.pop();
// 					}

// 					//unload colz into coly
// 					if (colz.size() > 0)
// 					{
// 						coly.push(colz.pop());
// 					}

// 					//push temp_obj into colz
// 					if (temp_obj !== null)
// 					{
// 						colz.push(temp_obj);
// 					}

// 					codelist.splice(0,1);

// 					break;
// 				//--------------------------------------------------
// 				case TILE_XCOLSWAPY:
// 					//swap col x and y
// 					pointer_advance();
					
// 					codelist.splice(0,1);
// 					history = code;

// 					var obj = [];

// 					if (colx.size() > 0 || coly.size() > 0)
// 					{
// 						codelist = [TILE_XCOLSWAPY_ANIMATE, TILE_XCOLSWAPY_DO].concat(codelist);
// 					}

// 					if (colx.size() > 0)
// 					{
// 						var items = colx.items;
// 						for (var i=0; i<items.length; i++)
// 						{
// 							items[i].setDest(COLY_X, items[i].y, STEPS);
// 						}

// 						obj = obj.concat(items);
// 					}

// 					if (coly.size() > 0)
// 					{
// 						var items = coly.items;
// 						for (var i=0; i<items.length; i++)
// 						{
// 							items[i].setDest(COLX_X, items[i].y, STEPS);
// 						}

// 						obj = obj.concat(items);
// 					}

// 					ge.setProp(BLOCKS_TO_TRACK, obj);

// 					break;
// 				case TILE_XCOLSWAPY_ANIMATE:
// 					//swap x and y
// 					var blockslist = ge.getProp(BLOCKS_TO_TRACK);

// 					var all_reached = true;
// 					for (var i=0; i<blockslist.length; i++)
// 					{
// 						blockslist[i].moveToDest();
// 						// console.log("interim--->",blockslist[i].x, blockslist[i].y);
// 						all_reached = all_reached && blockslist[i].reached;
// 					}

// 					if (all_reached)
// 					{
// 						codelist.splice(0,1);
// 						// console.log("all reached");
// 					}

// 					break;

// 				case TILE_XCOLSWAPY_DO:
// 					//swap x and y
// 					// console.log("at swap col x and y");
					
// 					var newcol_x = new Stack(COLX_X, COL_Y);
// 					var newcol_y = new Stack(COLY_X, COL_Y);

// 					//unload colx into newcol_x
// 					if (colx.size() > 0)
// 					{
// 						while (!colx.isEmpty())
// 						{
// 							newcol_x.push(colx.pop());
// 							// console.log("doing popping");
// 						}
// 					}

// 					//unload coly into newcol_y
// 					if (coly.size() > 0)
// 					{
// 						while (!coly.isEmpty())
// 						{
// 							newcol_y.push(coly.pop());
// 							// console.log("doing popping");
// 						}
// 					}

// 					//load back newcol_x into coly
// 					if (newcol_x.size() > 0)
// 					{
// 						while (!newcol_x.isEmpty())
// 						{
// 							coly.push(newcol_x.pop());
// 							// console.log("doing popping");
// 						}
// 					}

// 					//load back newcol_y into colx
// 					if (newcol_y.size() > 0)
// 					{
// 						while (!newcol_y.isEmpty())
// 						{
// 							colx.push(newcol_y.pop());
// 							// console.log("doing popping");
// 						}
// 					}

// 					codelist.splice(0,1);

// 					break;
// 				//--------------------------------------------------
// 				case TILE_YCOLSWAPZ:
// 					//swap col y and z
// 					pointer_advance();
					
// 					codelist.splice(0,1);
// 					history = code;

// 					var obj = [];

// 					if (coly.size() > 0 || colz.size() > 0)
// 					{
// 						codelist = [TILE_YCOLSWAPZ_ANIMATE, TILE_YCOLSWAPZ_DO].concat(codelist);
// 					}

// 					if (coly.size() > 0)
// 					{
// 						var items = coly.items;
// 						for (var i=0; i<items.length; i++)
// 						{
// 							items[i].setDest(COLZ_X, items[i].y, STEPS);
// 						}

// 						obj = obj.concat(items);
// 					}

// 					if (colz.size() > 0)
// 					{
// 						var items = colz.items;
// 						for (var i=0; i<items.length; i++)
// 						{
// 							items[i].setDest(COLY_X, items[i].y, STEPS);
// 						}

// 						obj = obj.concat(items);
// 					}

// 					ge.setProp(BLOCKS_TO_TRACK, obj);

// 					break;
// 				case TILE_YCOLSWAPZ_ANIMATE:
// 					//swap col y and z
// 					var blockslist = ge.getProp(BLOCKS_TO_TRACK);

// 					var all_reached = true;
// 					for (var i=0; i<blockslist.length; i++)
// 					{
// 						blockslist[i].moveToDest();
// 						// console.log("interim--->",blockslist[i].x, blockslist[i].y);
// 						all_reached = all_reached && blockslist[i].reached;
// 					}

// 					if (all_reached)
// 					{
// 						codelist.splice(0,1);
// 						// console.log("all reached");
// 					}

// 					break;

// 				case TILE_YCOLSWAPZ_DO:
// 					//swap col y and z
// 					// console.log("at swap col y and z");
					
// 					var newcol_y = new Stack(COLY_X, COL_Y);
// 					var newcol_z = new Stack(COLZ_X, COL_Y);

// 					//unload coly into newcol_y
// 					if (coly.size() > 0)
// 					{
// 						while (!coly.isEmpty())
// 						{
// 							newcol_y.push(coly.pop());
// 							// console.log("doing popping");
// 						}
// 					}

// 					//unload colz into newcol_z
// 					if (colz.size() > 0)
// 					{
// 						while (!colz.isEmpty())
// 						{
// 							newcol_z.push(colz.pop());
// 							// console.log("doing popping");
// 						}
// 					}

// 					//load back newcol_z into coly
// 					if (newcol_z.size() > 0)
// 					{
// 						while (!newcol_z.isEmpty())
// 						{
// 							coly.push(newcol_z.pop());
// 							// console.log("doing popping");
// 						}
// 					}

// 					//load back newcol_y into colz
// 					if (newcol_y.size() > 0)
// 					{
// 						while (!newcol_y.isEmpty())
// 						{
// 							colz.push(newcol_y.pop());
// 							// console.log("doing popping");
// 						}
// 					}

// 					codelist.splice(0,1);

// 					break;
// 			//--------------------------------------------------		
// 				default:
// 					// code block
// 					console.log("ERROR. SHOULD NOT COME HERE.")
// 			}

// 			// console.log("setting back codelist",codelist);
// 			//set back the codelist for next loop
// 			ge.setProp(RUNCODE_TILES, codelist);

// 			//add to history
// 			if (history != null)
// 			{
// 				var curr_run = ge.getProp(CURR_RUN);
// 				if (curr_run == 1)
// 				{
// 					var pasthistory = ge.getProp(HISTORY1);
// 					history = pasthistory.concat(history);
	
// 					ge.setProp(HISTORY1, history);
// 					// console.log("pushing in ", history, "into", HISTORY1);
// 				}
// 				else if (curr_run == 2)
// 				{
// 					var pasthistory = ge.getProp(HISTORY2);
// 					history = pasthistory.concat(history);
	
// 					ge.setProp(HISTORY2, history);
// 					// console.log("pushing in ", history, "into", HISTORY2);
// 				}
// 			}
// 		}

// 		//set back the colx, coly, colyz
// 		ge.setProp(COLX, colx);
// 		ge.setProp(COLY, coly);
// 		ge.setProp(COLZ, colz);
// 	}

// 	//update the various groups
// 	var itemlist = ge.groups[GROUP_CODE_TILES];
// 	for (var i = itemlist.length-1; i >= 0; i--)
// 	{
// 		var item = itemlist[i];
// 		if (item.toremove)
// 			itemlist.splice(i,1);
// 	}

// 	if (ge.getProp(CHECKWIN))
// 	{
// 		var colx = ge.getProp(COLX);
// 		var coly = ge.getProp(COLY);
// 		var colz = ge.getProp(COLZ);

// 		// console.log("colx",colx.allsame());
// 		// console.log("coly",coly.allsame());
// 		// console.log("colz",colz.allsame());

// 		var win_x = false;
// 		var win_y = false;
// 		var win_z = false;

// 		// if (colx.allsame() && coly.allsame() && colz.allsame())
// 		// {
// 		// 	// ge.setProp(WIN, true);
// 		// 	console.log("Win!");
// 		// }

// 		if (colx.allsame() && 
// 			(colx.peekcolour() == ge.getProp(COLX_WINCOLOUR) || ge.getProp(COLX_WINCOLOUR) == BLOCK_ANY)
// 			)
// 		{
// 			win_x = true;
// 			// console.log("setting win_x to true");
// 		}

// 		if (coly.allsame() && 
// 			(coly.peekcolour() == ge.getProp(COLY_WINCOLOUR) || ge.getProp(COLY_WINCOLOUR) == BLOCK_ANY)
// 			)
// 		{
// 			win_y = true;
// 			// console.log("setting win_y to true");
// 		}

// 		if (colz.allsame() && 
// 			(colz.peekcolour() == ge.getProp(COLZ_WINCOLOUR) || ge.getProp(COLZ_WINCOLOUR) == BLOCK_ANY)
// 			)
// 		{
// 			win_z = true;
// 			// console.log("setting win_z to true");
// 		}

// 		if (win_x && win_y && win_z)
// 		{
// 			//really win
// 			// console.log("Win!");
// 			// ge.clearUIText();
			

// 			ge.addUIText(new UIText("#4f7a22","left","SUCCESS!",195, 330, fo=GAME_FONTS, wipe=false));

// 			// var codehelp = ge.getProp(CODEHELP);
// 			// codehelp.goto(SUCCESSFUL);

// 			var btnNext = ge.getProp(BTN_NEXT);
// 			btnNext.setPos(OBJ_BTN_NEXT[3],OBJ_BTN_NEXT[4]);

// 			ge.playsound(SND_WIN);
// 		}
// 		else
// 		{
// 			if (ge.getProp(CURR_RUN) == 3)
// 			{
// 				ge.addUIText(new UIText("#bf3d3d","left","BETTER LUCK NEXT TIME.",80, 330, fo=GAME_FONTS, wipe=false));
				
// 				var btnGameBack = ge.getProp(BTN_GAMEBACK);
// 				btnGameBack.setPos(OBJ_BTN_GAMEBACK[3],OBJ_BTN_GAMEBACK[4]);

// 				ge.setProp(LOST, true);

// 				ge.playsound(SND_LOSE);
// 			}
// 			else
// 			{
// 				// ge.clearUIText();
// 				ge.addUIText(new UIText("#bf3d3d","left","OH NO. TRY AGAIN.",140, 330, fo=GAME_FONTS, wipe=false));
	
// 				var btnRetry = ge.getProp(BTN_RETRY);
// 				btnRetry.setPos(OBJ_BTN_RETRY[3],OBJ_BTN_RETRY[4]);

// 				ge.setProp(LOST, true);

// 				ge.playsound(SND_BAD);
// 			}

// 		}

// 		ge.setProp(CHECKWIN, false);

		
// 		// console.log("history",ge.getProp(HISTORY1), ge.getProp(HISTORY2));
// 	}
// }

// function generatestage()
// {
// 	var randomstage = [
// 		[],
// 		[],
// 		[]
// 	]

// 	var confirmblocks = [R,G,B]; //always need to have at least 1 R, 1 G, 1 B
// 	var randomblocks = [R,R,R,G,G,G,B,B,B];

// 	// console.log("bef",randomblocks);
// 	ge.shuffle(randomblocks);
// 	// console.log("after",randomblocks);
// 	confirmblocks = confirmblocks.concat(randomblocks.slice(0,4));

// 	ge.shuffle(confirmblocks);
// 	// console.log("confirmblocks",confirmblocks);

// 	var randomstacks = [0,0,0,0,1,1,1,1,1,2,2,2,2,2];
// 	ge.shuffle(randomstacks);

// 	for (var i = 0; i < MAXBLOCKS; i++)
// 	{
// 		var randomstack = randomstacks[0];
// 		randomstacks.splice(0,1);

// 		var confirmblock = confirmblocks[0];
// 		confirmblocks.splice(0,1);

		
// 		randomstage[randomstack].push(confirmblock);		
// 	}

// 	console.log(randomstage);

// 	//add in the blockguide
// 	randomstage.push([BLOCK_RED, BLOCK_GREEN, BLOCK_BLUE]);
// 	// randomstage.push([BLOCK_ANY, BLOCK_ANY, BLOCK_ANY]);
// 	// randomstage.push([BLOCK_RED, BLOCK_RED, BLOCK_RED]);
// 	// randomstage.push([BLOCK_GREEN, BLOCK_GREEN, BLOCK_GREEN]);
// 	// randomstage.push([BLOCK_BLUE, BLOCK_BLUE, BLOCK_BLUE]);

// 	return randomstage;
// }

// function setup(stage = null)
// {
// 	// console.log("in setup");

// 	ge.clearGroup(GROUP_BLOCKS);

// 	var colx = new Stack(COLX_X, COL_Y);
// 	var coly = new Stack(COLY_X, COL_Y);
// 	var colz = new Stack(COLZ_X, COL_Y);

// 	// console.log(colx.size());
// 	// console.log(coly.size());
// 	// console.log(colz.size());

// 	if (stage == null)
// 	{
// 		stage = generatestage();

// 		console.log("random generation of stage");

// 		// // standard random code
// 		// var totalblocks = [
// 		// 	new Block(OBJ_BLOCK_RED, OBJ_BLOCK_RED_PROP),
// 		// 	new Block(OBJ_BLOCK_RED, OBJ_BLOCK_RED_PROP),
// 		// 	new Block(OBJ_BLOCK_RED, OBJ_BLOCK_RED_PROP),
// 		// 	new Block(OBJ_BLOCK_RED, OBJ_BLOCK_RED_PROP),
// 		// 	new Block(OBJ_BLOCK_RED, OBJ_BLOCK_RED_PROP),

// 		// 	new Block(OBJ_BLOCK_GREEN, OBJ_BLOCK_GREEN_PROP),
// 		// 	new Block(OBJ_BLOCK_GREEN, OBJ_BLOCK_GREEN_PROP),
// 		// 	new Block(OBJ_BLOCK_GREEN, OBJ_BLOCK_GREEN_PROP),
// 		// 	new Block(OBJ_BLOCK_GREEN, OBJ_BLOCK_GREEN_PROP),
// 		// 	new Block(OBJ_BLOCK_GREEN, OBJ_BLOCK_GREEN_PROP),

// 		// 	new Block(OBJ_BLOCK_BLUE, OBJ_BLOCK_BLUE_PROP),
// 		// 	new Block(OBJ_BLOCK_BLUE, OBJ_BLOCK_BLUE_PROP),
// 		// 	new Block(OBJ_BLOCK_BLUE, OBJ_BLOCK_BLUE_PROP),
// 		// 	new Block(OBJ_BLOCK_BLUE, OBJ_BLOCK_BLUE_PROP),
// 		// 	new Block(OBJ_BLOCK_BLUE, OBJ_BLOCK_BLUE_PROP),
// 		// ];

// 		// var totalstacks = [1,1,1,1,1,2,2,2,2,2,3,3,3,3,3];

// 		// for (var i = 0; i < 7; i++)
// 		// {
// 		// 	var randomblockpos = ge.random(0,totalblocks.length-1);
// 		// 	var randomblock = totalblocks[randomblockpos];
// 		// 	totalblocks.splice(randomblockpos,1);

// 		// 	var randomstackpos = ge.random(0,totalstacks.length-1);
// 		// 	var randomstack = totalstacks[randomstackpos];
// 		// 	totalstacks.splice(randomstackpos,1);

// 		// 	ge.addGameObj(GROUP_BLOCKS,randomblock);
			
// 		// 	// console.log(randomblock);
// 		// 	// console.log(randomstack);

// 		// 	if (randomstack == 1)
// 		// 	{
// 		// 		colx.push(randomblock);
// 		// 		// console.log("pushing in to colx");
// 		// 	}
// 		// 	else if (randomstack == 2)
// 		// 	{
// 		// 		coly.push(randomblock);
// 		// 		// console.log("pushing in to coly");
// 		// 	}
// 		// 	else if (randomstack == 3)
// 		// 	{
// 		// 		colz.push(randomblock);
// 		// 		// console.log("pushing in to colz");
// 		// 	}
			
// 		// }
// 	}


// 	stage_colx = stage[0];
// 	stage_coly = stage[1];
// 	stage_colz = stage[2];

// 	for (var i = 0; i<stage_colx.length; i++)
// 	{
// 		var obj;
// 		if (stage_colx[i] == R)
// 			obj = ge.addGameObj(GROUP_BLOCKS, new Block(OBJ_BLOCK_RED, OBJ_BLOCK_RED_PROP));
// 		else if (stage_colx[i] == G)
// 			obj = ge.addGameObj(GROUP_BLOCKS, new Block(OBJ_BLOCK_GREEN, OBJ_BLOCK_GREEN_PROP));
// 		else if (stage_colx[i] == B)
// 			obj = ge.addGameObj(GROUP_BLOCKS, new Block(OBJ_BLOCK_BLUE, OBJ_BLOCK_BLUE_PROP));

// 		if (stage_colx[i] != O)
// 		{
// 			// console.log("pushing in x",stage_colx[i]);
// 			colx.push(obj);
// 		}
// 	}

// 	for (var i = 0; i<stage_coly.length; i++)
// 	{
// 		var obj;
// 		if (stage_coly[i] == R)
// 			obj = ge.addGameObj(GROUP_BLOCKS, new Block(OBJ_BLOCK_RED, OBJ_BLOCK_RED_PROP));
// 		else if (stage_coly[i] == G)
// 			obj = ge.addGameObj(GROUP_BLOCKS, new Block(OBJ_BLOCK_GREEN, OBJ_BLOCK_GREEN_PROP));
// 		else if (stage_coly[i] == B)
// 			obj = ge.addGameObj(GROUP_BLOCKS, new Block(OBJ_BLOCK_BLUE, OBJ_BLOCK_BLUE_PROP));

// 		if (stage_coly[i] != O)
// 		{
// 			// console.log("pushing in y",stage_coly[i]);
// 			coly.push(obj);
// 		}
// 	}

// 	for (var i = 0; i<stage_colz.length; i++)
// 	{
// 		var obj;
// 		if (stage_colz[i] == R)
// 			obj = ge.addGameObj(GROUP_BLOCKS, new Block(OBJ_BLOCK_RED, OBJ_BLOCK_RED_PROP));
// 		else if (stage_colz[i] == G)
// 			obj = ge.addGameObj(GROUP_BLOCKS, new Block(OBJ_BLOCK_GREEN, OBJ_BLOCK_GREEN_PROP));
// 		else if (stage_colz[i] == B)
// 			obj = ge.addGameObj(GROUP_BLOCKS, new Block(OBJ_BLOCK_BLUE, OBJ_BLOCK_BLUE_PROP));

// 		if (stage_colz[i] != O)
// 		{
// 			// console.log("pushing in z",stage_colz[i]);
// 			colz.push(obj);
// 		}
// 	}

// 	ge.setProp(COLX, colx);
// 	ge.setProp(COLY, coly);
// 	ge.setProp(COLZ, colz);

// 	return stage;

// }

// function shift_btn_execute_out()
// {
// 	var btn_execute = ge.getProp(BTN_EXECUTE);
// 	btn_execute.setPos(-1000,-1000);
// }

// function shift_btn_execute_in()
// {
// 	var btn_execute = ge.getProp(BTN_EXECUTE);
// 	btn_execute.setPos(OBJ_BTN_EXECUTE[3],OBJ_BTN_EXECUTE[4]);
// }

// function shift_small_tiles_in(index)
// {
// 	ge.setProp(HELP_TILES_IN, true);
// 	// var start_x = index*SOCKET_HELP_OFFSET;

// 	var base_x = SOCKET_HELP_POS_X[index];
// 	var itemlist = ge.groups[GROUP_TILES_SMALL];
// 	if (ge.getProp(CURR_STAGE) <= 2)
// 	{
// 		for (var i = 0 ; i < itemlist.length; i++)
// 		{
// 			var item = itemlist[i];

// 			if (i <= 3) //these are the positional tiles
// 			{
// 				var start_x = base_x + i*SOCKET_HELP_OFFSET;
// 				item.setPos(start_x, SOCKET_HELP_POS_Y);
// 			}
			
// 			// console.log("putting",item,"at",start_x, SOCKET_HELP_POS_Y);
// 		}
// 	}
// 	else if (ge.getProp(CURR_STAGE) <= 3)
// 	{
// 		for (var i = 0 ; i < itemlist.length; i++)
// 		{
// 			var item = itemlist[i];
	
// 			if (i <= 5) //these are the positional tiles
// 			{
// 				var start_x = base_x + i*SOCKET_HELP_OFFSET;
// 				item.setPos(start_x, SOCKET_HELP_POS_Y);
// 			}
			
// 			// console.log("putting",item,"at",start_x, SOCKET_HELP_POS_Y);
// 		}
// 	}
// 	else if (ge.getProp(CURR_STAGE) <= 4)
// 	{
// 		for (var i = 0 ; i < itemlist.length; i++)
// 		{
// 			var item = itemlist[i];
	
// 			if (i <= 5) //these are the positional tiles
// 			{
// 				var start_x = base_x + i*SOCKET_HELP_OFFSET;
// 				item.setPos(start_x, SOCKET_HELP_POS_Y);
// 			}
// 			else if (i<=8) //these are the prime tiles
// 			{
// 				base_x = SOCKET_HELP_2_POS_X[index];
// 				var start_x = base_x + (i-5)*SOCKET_HELP_OFFSET;
// 				item.setPos(start_x, SOCKET_HELP_2_POS_Y);
// 			}
			
// 			// console.log("putting",item,"at",start_x, SOCKET_HELP_POS_Y);
// 		}
// 	}
// 	else
// 	{
// 		for (var i = 0 ; i < itemlist.length; i++)
// 		{
// 			var item = itemlist[i];
	
// 			if (i <= 5) //these are the positional tiles
// 			{
// 				var start_x = base_x + i*SOCKET_HELP_OFFSET;
// 				item.setPos(start_x, SOCKET_HELP_POS_Y);
// 			}
// 			else if (i<=8) //these are the prime tiles
// 			{
// 				base_x = SOCKET_HELP_2_POS_X[index];
// 				var start_x = base_x + (i-5)*SOCKET_HELP_OFFSET;
// 				item.setPos(start_x, SOCKET_HELP_2_POS_Y);
// 			}
// 			else if (i<=10) //these are the swap tiles
// 			{
// 				base_x = SOCKET_HELP_2_POS_X[index];
// 				var start_x = base_x + (i-5)*SOCKET_HELP_OFFSET;
// 				item.setPos(start_x, SOCKET_HELP_2_POS_Y);
// 			}
			
// 			// console.log("putting",item,"at",start_x, SOCKET_HELP_POS_Y);
// 		}
// 	}

// 	// console.log("index",index);
// 	ge.getProp(SELECTOR).goto(index+1);
// 	ge.getProp(SELECTOR).setPos(SELECTOR_POS[index+1][0], SELECTOR_POS[index+1][1]);
// 	// console.log("x pos is at",ge.getProp(SELECTOR).x);
// }

// function shift_small_tiles_out()
// {
// 	ge.setProp(HELP_TILES_IN, false);
// 	// var start_x = index*SOCKET_HELP_OFFSET;

// 	var itemlist = ge.groups[GROUP_TILES_SMALL];
// 	for (var i = 0 ; i < itemlist.length; i++)
// 	{
// 		var item = itemlist[i];

// 		item.setPos(-1000, -1000);
// 		// item.setPos(10, 10);
// 	}

// 	ge.getProp(SELECTOR).setPos(SELECTOR_POS[0][0], SELECTOR_POS[0][1]);
// }

// function pointer_hide()
// {
// 	var pointer = ge.groups[GROUP_POINTER][0];
// 	pointer.setPos(-1000, -1000);
// 	ge.setProp(POINTER_INDEX,-1);
// }

// function pointer_advance()
// {
// 	var pointer = ge.groups[GROUP_POINTER][0];

// 	ge.addProp(POINTER_INDEX,1);
// 	var index = ge.getProp(POINTER_INDEX);
	
// 	if (index >= POINTER_POS.length)
// 	{
// 		// index = 0;
// 		// ge.setProp(POINTER_INDEX,-1);
// 		// console.log("should not come here in pointer");
// 	}
// 	else
// 	{
// 		pointer.setPos(POINTER_POS[index][0], POINTER_POS[index][1]);
// 	}
// }

// function setup_blockguides(setup)
// {
// 	ge.clearGroup(GROUP_BLOCKGUIDES);

// 	var newbg = new BlockGuide(OBJ_BLOCKGUIDE, OBJ_BLOCKGUIDE_PROP);

// 	newbg.goto(setup[3][0]);
// 	newbg.setPos(COLX_BLOCKGUIDE_X,BLOCKGUIDE_Y);
// 	ge.addGameObj(GROUP_BLOCKGUIDES, newbg);
// 	ge.setProp(COLX_WINCOLOUR, setup[3][0]);

// 	newbg = new BlockGuide(OBJ_BLOCKGUIDE, OBJ_BLOCKGUIDE_PROP);
// 	newbg.goto(setup[3][1]);
// 	newbg.setPos(COLY_BLOCKGUIDE_X,BLOCKGUIDE_Y);
// 	ge.addGameObj(GROUP_BLOCKGUIDES, newbg);
// 	ge.setProp(COLY_WINCOLOUR, setup[3][1]);

// 	newbg = new BlockGuide(OBJ_BLOCKGUIDE, OBJ_BLOCKGUIDE_PROP);
// 	newbg.goto(setup[3][2]);
// 	newbg.setPos(COLZ_BLOCKGUIDE_X,BLOCKGUIDE_Y);
// 	ge.addGameObj(GROUP_BLOCKGUIDES, newbg);
// 	ge.setProp(COLZ_WINCOLOUR, setup[3][2]);
// }


// // function shift_pointer_out()
// // {
// // 	var item = ge.groups[GROUP_POINTER][0];

// // 	item.setPos(-1000, -1000);
// // }

// // function get_small_tile(code)
// // {
// // 		var curr_code;
// // 		if (code !== null)
// // 		{
// // 			curr_code = code.prop[CODE];
// // 		}
// // 		else
// // 		{
// // 			curr_code = TILE_NULL;
// // 		}

// // 		// console.log(curr_code);
// // 		switch(curr_code) 
// // 		{
// // 			case TILE_NULL:
// // 				//do nothing
// // 				break;
// // 			case TILE_XY:
// // 				//move top of X to top of Y
// // 				if (coly.size() < MAX_STACK_SIZE)
// // 				{
// // 					if (!colx.isEmpty())
// // 					{
// // 						var obj = colx.pop();
// // 						coly.push(obj);
// // 					}
// // 				}
				
// // 				break;
// // 			case TILE_YX:
// // 				//move top of Y to top of X
// // 				if (colx.size() < MAX_STACK_SIZE)
// // 				{
// // 					if (!coly.isEmpty())
// // 					{
// // 						var obj = coly.pop();
// // 						colx.push(obj);
// // 					}
// // 				}

// // 				break;
// // 			case TILE_YZ:
// // 				//move top of Y to top of Z
// // 				if (colz.size() < MAX_STACK_SIZE)
// // 				{
// // 					if (!coly.isEmpty())
// // 					{
// // 						var obj = coly.pop();
// // 						colz.push(obj);
// // 					}
// // 				}

// // 				break;
// // 			case TILE_ZY:
// // 				//move top of Z to top of Y
// // 				if (coly.size() < MAX_STACK_SIZE)
// // 				{
// // 					if (!colz.isEmpty())
// // 					{
// // 						var obj = colz.pop();
// // 						coly.push(obj);
// // 					}
// // 				}

// // 				break;
				
// // 			case TILE_XPRIME:
// // 				//flip order of colx
// // 				// console.log("at xprime");
// // 				if (colx.size() > 0)
// // 				{
// // 					var newcol = new Stack(COLX_X, COL_Y);;
// // 					while (!colx.isEmpty())
// // 					{
// // 						newcol.push(colx.pop());
// // 						// console.log("doing popping");
// // 					}
					
// // 					console.log(newcol.items);
// // 					colx = newcol;
// // 				}

// // 				break;
			
// // 			case TILE_YPRIME:
// // 				//flip order of coly
// // 				// console.log("at yprime");
// // 				if (coly.size() > 0)
// // 				{
// // 					var newcol = new Stack(COLY_X, COL_Y);;
// // 					while (!coly.isEmpty())
// // 					{
// // 						newcol.push(coly.pop());
// // 						// console.log("doing popping");
// // 					}
					
// // 					console.log(newcol.items);
// // 					coly = newcol;
// // 				}

// // 				break;
			
// // 			case TILE_ZPRIME:
// // 				//flip order of colz
// // 				// console.log("at zprime");
// // 				if (colz.size() > 0)
// // 				{
// // 					var newcol = new Stack(COLZ_X, COL_Y);
// // 					while (!colz.isEmpty())
// // 					{
// // 						newcol.push(colz.pop());
// // 						// console.log("doing popping");
// // 					}
					
// // 					console.log(newcol.items);
// // 					colz = newcol;
// // 				}

// // 				break;

// // 			case TILE_XSWAPY:
// // 				//swap x and y
// // 				console.log("at swap x and y");
				
// // 				var temp_obj = null;
// // 				//unload colx into temp obj
// // 				if (colx.size() > 0)
// // 				{
// // 					temp_obj = colx.pop();
// // 					// console.log("extracting from colx",temp_obj);
// // 				}

// // 				//unload coly into colx
// // 				if (coly.size() > 0)
// // 				{
// // 					colx.push(coly.pop());
// // 					// console.log("extracting from coly");
// // 				}

// // 				//push temp_obj into coly
// // 				// console.log("CHECKING",temp_obj !== null);
// // 				if (temp_obj !== null)
// // 				{
// // 					coly.push(temp_obj);
// // 					// console.log("pushing",temp_obj,"into colx");
// // 				}

// // 				break;

// // 			case TILE_YSWAPZ:
// // 				//swap y and z
// // 				console.log("at swap y and z");

// // 				var temp_obj = null;
// // 				//unload coly into temp obj
// // 				if (coly.size() > 0)
// // 				{
// // 					temp_obj = coly.pop();
// // 					// console.log("extracting from coly",temp_obj);
// // 				}

// // 				//unload colz into coly
// // 				if (colz.size() > 0)
// // 				{
// // 					coly.push(colz.pop());
// // 					// console.log("pushing into coly");
// // 				}

// // 				//push temp_obj into colz
// // 				if (temp_obj !== null)
// // 				{
// // 					colz.push(temp_obj);
// // 					// console.log("pushing ",temp_obj, "into colz");
// // 				}

// // 				break;

// // 			case TILE_XCOLSWAPY:
// // 				//swap x and y
// // 				console.log("at swap col x and y");
				
// // 				var newcol_x = new Stack(COLX_X, COL_Y);
// // 				var newcol_y = new Stack(COLY_X, COL_Y);

// // 				//unload colx into newcol_x
// // 				if (colx.size() > 0)
// // 				{
// // 					while (!colx.isEmpty())
// // 					{
// // 						newcol_x.push(colx.pop());
// // 						// console.log("doing popping");
// // 					}
// // 				}

// // 				//unload coly into newcol_y
// // 				if (coly.size() > 0)
// // 				{
// // 					while (!coly.isEmpty())
// // 					{
// // 						newcol_y.push(coly.pop());
// // 						// console.log("doing popping");
// // 					}
// // 				}

// // 				//load back newcol_x into coly
// // 				if (newcol_x.size() > 0)
// // 				{
// // 					while (!newcol_x.isEmpty())
// // 					{
// // 						coly.push(newcol_x.pop());
// // 						// console.log("doing popping");
// // 					}
// // 				}

// // 				//load back newcol_y into colx
// // 				if (newcol_y.size() > 0)
// // 				{
// // 					while (!newcol_y.isEmpty())
// // 					{
// // 						colx.push(newcol_y.pop());
// // 						// console.log("doing popping");
// // 					}
// // 				}

// // 				break;

// // 			case TILE_YCOLSWAPZ:
// // 				//swap y and z
// // 				console.log("at swap col y and z");
				
// // 				var newcol_y = new Stack(COLY_X, COL_Y);
// // 				var newcol_z = new Stack(COLZ_X, COL_Y);

// // 				//unload coly into newcol_y
// // 				if (coly.size() > 0)
// // 				{
// // 					while (!coly.isEmpty())
// // 					{
// // 						newcol_y.push(coly.pop());
// // 						// console.log("doing popping");
// // 					}
// // 				}

// // 				//unload colz into newcol_z
// // 				if (colz.size() > 0)
// // 				{
// // 					while (!colz.isEmpty())
// // 					{
// // 						newcol_z.push(colz.pop());
// // 						// console.log("doing popping");
// // 					}
// // 				}

// // 				//load back newcol_z into coly
// // 				if (newcol_z.size() > 0)
// // 				{
// // 					while (!newcol_z.isEmpty())
// // 					{
// // 						coly.push(newcol_z.pop());
// // 						// console.log("doing popping");
// // 					}
// // 				}

// // 				//load back newcol_y into colz
// // 				if (newcol_y.size() > 0)
// // 				{
// // 					while (!newcol_y.isEmpty())
// // 					{
// // 						colz.push(newcol_y.pop());
// // 						// console.log("doing popping");
// // 					}
// // 				}

// // 				break;
			
// // 			default:
// // 				// code block
// // 				console.log("ERROR. SHOULD NOT COME HERE.")
// // 		}
// // }

// // 	// console.log("STAGE", ge.getProp("stage"), ge.getProp("totalstage"));
	
// // 	//update UI
// // 	ge.addUIText(new UIText("#FFF","right",ge.getProp("score"),SCORE_X, SCORE_Y, fo=GAME_FONTS, wipe=true));
// // 	ge.addUIText(new UIText("#FFF","center",ge.getProp("stage")+" / "+ge.getProp("totalstage"),STAGE_X, STAGE_Y, fo=GAME_FONTS, wipe=true));
	
// // 	if (ge.getProp("congratsdelay") > 0)
// // 	{
// // 		ge.minusProp("congratsdelay",1);

// // 		ge.addUIText(new UIText("#FFF","right","STAGE CLEARED!",
// // 			CONGRATS_X, CONGRATS_Y, fo=GAME_FONTS, wipe=true));

// // 		return;
// // 	}

// // 	if (ge.getProp("createStage"))
// // 	{
// // 		createStage(ge.getProp("nextGameStage"));
// // 		ge.setProp("createStage",false);
// // 	}

// // 	if (ge.getProp("nextstagedelay") > 0)
// // 	{
// // 		ge.minusProp("nextstagedelay",1);

// // 		if (ge.getProp("life") > 0)
// // 		{
// // 			ge.addUIText(new UIText("#FFF","right","GET READY ... " + 
// // 				(Math.floor(ge.getProp("nextstagedelay")/TIME_PER_FRAME) + 1),
// // 				GETREADY_X, GETREADY_Y, fo=GAME_FONTS, wipe=true));
// // 		}

// // 		var player = ge.groups[GROUP_PLAYER][0];
// // 		player.setPos(OBJ_PLAYER[3], OBJ_PLAYER[4]);

// // 		return;
// // 	}

// // 	if (ge.getProp("restart"))
// // 	{
// // 		ge.groups[GROUP_BALL] = [];
// // 		ge.groups[GROUP_ITEM] = [];
// // 		ge.groups[GROUP_MISSILE] = [];

// // 		// console.log("entered lose life restart",ge.getProp("nextstagedelay"));
// // 		ge.addGameObj( GROUP_BALL, new Ball(OBJ_BALL, OBJ_BALL_INIT_PROP));
// // 		ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, OBJ_BALL[3], OBJ_BALL[4], center=false);

// // 		ge.playsound(SND_SHOOT);

// // 		ge.setProp("nofirsthit", true);

// // 		ge.setProp("restart", false)
// // 	}
	
// // 	//handle input
// // 	if (ge.keys[ge.SPACEBAR])
// // 	{
// // 		console.log("enter space");
// // 		ge.keys[ge.SPACEBAR] = false;

// // 		ge.pause = !ge.pause;

// // 	}
// // 	if (ge.keys[ge.ESCAPE])
// // 	{
// // 		ge.keys[ge.ESCAPE] = false;

// // 		var player = ge.groups[GROUP_PLAYER][0];
// // 		// console.log("points",player.prop["points"]);
// // 		// console.log("charge",player.prop["charge"]);
// // 		ge.setProp("cannonshootduration", 99);
// // 	}
// // 	if (ge.keys[ge.ONE])
// // 	{
// // 		ge.keys[ge.ONE] = false;

// // 		var player = ge.groups[GROUP_PLAYER][0];
// // 		player.prop["charge"] = 5;
// // 	}
// // 	if (ge.keys[ge.TWO])
// // 	{
// // 		ge.keys[ge.TWO] = false;

// // 		var bricks = ge.groups[GROUP_BRICK];
// // 		for (var i = 0; i < bricks.length; i++)
// // 		{
// // 			var brick = bricks[i];
// // 			if (brick.type != BRICK_METAL)
// // 				brick.hit(10);
// // 		}
// // 	}

// // 	if (ge.pause)
// // 	{
// // 		return;
// // 	}

// // 	//check for click and fire
// // 	if (ge.mouseclicked)
// // 	{
// // 		//clicks detected
// // 		ge.mouseclicked = false;
// // 		ge.mousedown = false;

// // 		var player = ge.groups[GROUP_PLAYER][0];
// // 		player.fire(ge);
// // 	}

// // 	//update cannon shoot duration
// // 	if (ge.getProp("cannonshootduration") > 0)
// // 	{
// // 		if (ge.getProp("cannonshootduration") % TIME_PER_FRAME == 0)
// // 		{
// // 			if (Math.random() < 0.5)
// // 				ge.addGameObj( GROUP_BALL, new Ball(OBJ_BALL, OBJ_BALL_CANNON1_PROP));
// // 			else
// // 				ge.addGameObj( GROUP_BALL, new Ball(OBJ_BALL, OBJ_BALL_CANNON2_PROP));
// // 			ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, OBJ_BALL[3], OBJ_BALL[4], center=false);

// // 			ge.playsound(SND_SHOOT);
// // 		}
// // 		ge.minusProp("cannonshootduration",1);
// // 	}

// // 	//update fireball duration
// // 	if (ge.getProp("fireballduration") > 0)
// // 	{
// // 		var group = ge.groups[GROUP_BALL];

// // 		for (var i = group.length-1; i >= 0; i--)
// // 		{
// // 			var ball = group[i];
// // 			ball.togglefireball();
// // 		}
		
// // 		ge.minusProp("fireballduration",1);

// // 		if (ge.getProp("fireballduration") <= 0)
// // 		{
// // 			for (var i = group.length-1; i >= 0; i--)
// // 			{
// // 				var ball = group[i];
				
// // 				ball.togglenormalball();
// // 			}

// // 		}
// // 	}

// // 	//update points x 2 or x 3
// // 	if (ge.getProp("pointsupduration") > 0)
// // 	{
// // 		ge.minusProp("pointsupduration",1);
// // 	}

// // 	//update ball speed up
// // 	if (ge.getProp("ballspeedupduration") > 0)
// // 	{
// // 		var group = ge.groups[GROUP_BALL];

// // 		for (var i = group.length-1; i >= 0; i--)
// // 		{
// // 			var ball = group[i];
// // 			ball.togglespeedup();
// // 		}
		
// // 		ge.minusProp("ballspeedupduration",1);

// // 		if (ge.getProp("ballspeedupduration") <= 0)
// // 		{
// // 			for (var i = group.length-1; i >= 0; i--)
// // 			{
// // 				var ball = group[i];
// // 				ball.togglespeednormal();
// // 			}

// // 		}
// // 	}

// // 	//update zap
// // 	if (ge.getProp("zapduration") > 0)
// // 	{
// // 		var player = ge.groups[GROUP_PLAYER][0];
// // 		player.togglezap();
		
// // 		ge.minusProp("zapduration",1);

// // 		if (ge.getProp("zapduration") <= 0)
// // 		{
// // 			player.toggleunzap();
// // 		}
// // 	}

// // 	//update player
// // 	var player = ge.groups[GROUP_PLAYER][0];
// // 	player.update(ge);

// // 	if (ge.mouseX < player.midX() - player.BUFFER_X)
// // 		player.moveLeft(PLAYERSCREEN_LEFT);
// // 	else if (ge.mouseX > player.midX() + player.BUFFER_X)
// // 		player.moveRight(PLAYERSCREEN_RIGHT);

// // 	//update balls
// // 	var group = ge.groups[GROUP_BALL];
// // 	var bricks = ge.groups[GROUP_BRICK];
// // 	var monsters = ge.groups[GROUP_MONSTER];

// // 	for (var i = group.length-1; i >= 0; i--)
// // 	{
// // 		var ball = group[i];
		
// // 		ball.update();

// // 		if (ge.getProp("nofirsthit"))
// // 		{
// // 			// console.log(ge.effx, ge.nomoreEffx());
// // 			if (ge.nomoreEffx())
// // 				ge.addEffx(OBJ_ULTRASPARKLE, EFFX_DELAY, ball.midX(), ball.midY(), jitter=true);
// // 		}

// // 		//check for collision of ball with player
// // 		if (!ball.isImmune() && ge.collided(ball.midX(), ball.midY(), player))
// // 		{
// // 			//hit the player, trigger off first hit
// // 			ge.setProp("nofirsthit", false);

// // 			//gain charge
// // 			player.prop["charge"] += 1;

// // 			// ball.resetPrevPos();
			
// // 			var diffX = ball.midX() - player.midX();

// // 			if (diffX < 0)
// // 			{
// // 				if (diffX < -55)
// // 				{
// // 					//25 deg
// // 					ball.prop["dx"] = -Math.cos(DEGREE_20);
// // 					ball.prop["dy"] = -Math.sin(DEGREE_20);
// // 				}
// // 				else if (diffX < -35)
// // 				{
// // 					//40 deg
// // 					ball.prop["dx"] = -Math.cos(DEGREE_40);
// // 					ball.prop["dy"] = -Math.sin(DEGREE_40);
// // 				}
// // 				else if (diffX < -15)
// // 				{
// // 					//60 deg
// // 					ball.prop["dx"] = -Math.cos(DEGREE_60);
// // 					ball.prop["dy"] = -Math.sin(DEGREE_60);
// // 				}
// // 				else
// // 				{
// // 					//75 deg
// // 					ball.prop["dx"] = -Math.cos(DEGREE_80);
// // 					ball.prop["dy"] = -Math.sin(DEGREE_80);
// // 				}
// // 			}
// // 			else
// // 			{
// // 				if (diffX > 55)
// // 				{
// // 					//25 deg
// // 					ball.prop["dx"] = Math.cos(DEGREE_20);
// // 					ball.prop["dy"] = -Math.sin(DEGREE_20);
// // 				}
// // 				else if (diffX > 35)
// // 				{
// // 					//40 deg
// // 					ball.prop["dx"] = Math.cos(DEGREE_40);
// // 					ball.prop["dy"] = -Math.sin(DEGREE_40);
// // 				}
// // 				else if (diffX > 15)
// // 				{
// // 					//60 deg
// // 					ball.prop["dx"] = Math.cos(DEGREE_60);
// // 					ball.prop["dy"] = -Math.sin(DEGREE_60);
// // 				}
// // 				else
// // 				{
// // 					//75 deg
// // 					ball.prop["dx"] = Math.cos(DEGREE_80);
// // 					ball.prop["dy"] = -Math.sin(DEGREE_80);
// // 				}
// // 			}

// // 			ball.hit();
			
// // 			//add effx
// // 			ge.addEffx(OBJ_SPARKLE, EFFX_DELAY, ball.midX(), ball.midY());

// // 			//add sounds
// // 			ge.playsound(SND_IMPACT);
// // 		}


// // 		//check for collision of ball with walls
// // 		if (ball.x <= GAMESCREEN_LEFT)
// // 		{
// // 			ball.resetPrevPos();
			
// // 			ball.prop["dx"] = -ball.prop["dx"];
			
// // 			//add effx
// // 			ge.addEffx(OBJ_SPARKLE, EFFX_DELAY, ball.midX(), ball.midY());

// // 			//play sound
// // 			ge.playsound(SND_HIT, 0.5);
// // 		}
// // 		else if (ball.right() >= GAMESCREEN_RIGHT)
// // 		{
// // 			ball.resetPrevPos();
// // 			ball.prop["dx"] = -ball.prop["dx"];

// // 			//add effx
// // 			ge.addEffx(OBJ_SPARKLE, EFFX_DELAY, ball.midX(), ball.midY());

// // 			//play sound
// // 			ge.playsound(SND_HIT, 0.5);
// // 		}
// // 		else if (ball.top() <= GAMESCREEN_TOP)
// // 		{
// // 			ball.resetPrevPos();
// // 			ball.prop["dy"] = -ball.prop["dy"];

// // 			//add effx
// // 			ge.addEffx(OBJ_SPARKLE, EFFX_DELAY, ball.midX(), ball.midY());

// // 			//play sound
// // 			ge.playsound(SND_HIT, 0.5);
// // 		}
// // 		else if (ball.y >= STAGE_HEIGHT)
// // 		{
// // 			//temp only. need to change to lose life
// // 			// ball.resetPrevPos();
// // 			// ball.prop["dy"] = -ball.prop["dy"];
// // 			ball.prop["hp"] -= 1;

// // 			//add effx
// // 			ge.addEffx(OBJ_SPARKLE, EFFX_DELAY, ball.midX(), ball.midY());

// // 			//add sounds

// // 			if (ge.getProp("nofirsthit"))
// // 			{
// // 				//player didn't hit the ball. free 1 ball
// // 				ge.addGameObj( GROUP_BALL, new Ball(OBJ_BALL, OBJ_BALL_INIT_PROP));
// // 				ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, OBJ_BALL[3], OBJ_BALL[4], center=false);

// // 				ge.playsound(SND_SHOOT);
// // 			}
			
// // 		}

// // 		if (!ball.isImmune())
// // 		{
// // 			//check for collision of ball with bricks
// // 			for (var j = bricks.length-1; j >= 0; j--)
// // 			{
// // 				var brick = bricks[j];

// // 				// if (ge.collided(ball.midX(), ball.midY(), brick))
// // 				if (ge.collidedobj(ball, brick))
// // 				{
// // 					// console.log("collided",ball.x, ball.y, brick.x, brick.y);
// // 					var hitX = ball.x;
// // 					var hitY = ball.y;
// // 					ball.resetPrevPos();
					
// // 					// console.log("reset",ball.x, ball.y, brick.x, brick.y);

// // 					// console.log("compare:",ball.bottom(), "<=", brick.top());
// // 					// console.log("compare:",ball.top(), ">=" , brick.bottom());
// // 					// console.log("compare:",ball.right(), "<=", brick.left());
// // 					// console.log("compare:",ball.left(), ">=", brick.right());


// // 					// if (ball.midY() <= brick.top())
// // 					// {
// // 					// 	ball.prop["dy"] *= -1;
// // 					// 	// console.log("flipping dy");
// // 					// }
// // 					// else if (ball.midY() >= brick.bottom())
// // 					// {
// // 					// 	ball.prop["dy"] *= -1;
// // 					// 	// console.log("flipping dy");
// // 					// }
// // 					// else if (ball.midX() <= brick.left())
// // 					// {
// // 					// 	ball.prop["dx"] *= -1;
// // 					// 	// console.log("flipping dx");
// // 					// }
// // 					// else if (ball.midX() >= brick.right())
// // 					// {
// // 					// 	ball.prop["dx"] *= -1;
// // 					// 	// console.log("flipping dx");
// // 					// }

// // 					if (Math.round(ball.bottom()) <= brick.top())
// // 					{
// // 						if (!ball.isfireball())
// // 							ball.prop["dy"] *= -1;
// // 						// console.log("flipping dy");
// // 					}
// // 					else if (Math.round(ball.top()) >= brick.bottom())
// // 					{
// // 						if (!ball.isfireball())
// // 							ball.prop["dy"] *= -1;
// // 						// console.log("flipping dy");
// // 					}
// // 					else if (Math.round(ball.right()) <= brick.left())
// // 					{
// // 						if (!ball.isfireball())
// // 							ball.prop["dx"] *= -1;	
// // 						// console.log("flipping dx");
// // 					}
// // 					else if (Math.round(ball.left()) >= brick.right())
// // 					{
// // 						if (!ball.isfireball())
// // 							ball.prop["dx"] *= -1;
// // 						// console.log("flipping dx");
// // 					}
					
// // 					ball.hit(); //give it immunity for 2 frames.
// // 					brick.hit(ball.dmg());

// // 					//add effx
// // 					ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, hitX, hitY, center=false);

// // 					//play sound
// // 					ge.playsound(SND_IMPACT2);
// // 				}

// // 			}

// // 			//check for collision of ball with monsters
// // 			for (var j = monsters.length-1; j >= 0; j--)
// // 			{
// // 				var monster = monsters[j];
				
// // 				if (!monster.isImmune())
// // 				{
// // 					if (ge.collidedobj(ball, monster))
// // 					{
// // 						// console.log("collided",ball.x, ball.y, brick.x, brick.y);
// // 						var hitX = ball.x + ball.prop["dx"] * ball.prop["power"] ;
// // 						var hitY = ball.y + ball.prop["dy"] * ball.prop["power"] ;
// // 						ball.resetPrevPos();

// // 						if (monster.type == BOSS1)
// // 						{
// // 							// console.log("here");
// // 							//if boss, need to toggle fireball away
// // 							ge.setProp("fireballduration", 0);
// // 							ball.togglenormalball();
// // 						}
	
// // 						if (Math.round(ball.bottom()) <= monster.top())
// // 						{
// // 							if (!ball.isfireball())
// // 							{
// // 								ball.prop["dy"] *= -1;
// // 							}
// // 							// console.log("flipping dy");
// // 						}
// // 						else if (Math.round(ball.top()) >= monster.bottom())
// // 						{
// // 							if (!ball.isfireball())
// // 							{
// // 								ball.prop["dy"] *= -1;
// // 							}
// // 							// console.log("flipping dy");
// // 						}
// // 						else if (Math.round(ball.right()) <= monster.left())
// // 						{
// // 							if (!ball.isfireball())
// // 							{
// // 								ball.prop["dx"] *= -1;	
// // 							}
// // 							// console.log("flipping dx");
// // 						}
// // 						else if (Math.round(ball.left()) >= monster.right())
// // 						{
// // 							if (!ball.isfireball())
// // 							{
// // 								ball.prop["dx"] *= -1;
// // 							}
// // 							// console.log("flipping dx");
// // 						}
						
// // 						ball.hit(); //give it immunity for 2 frames.
// // 						monster.hit(ball.dmg());
	
// // 						//add effx
// // 						// ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, hitX, hitY, center=false);
// // 						ge.addEffx(OBJ_HITBOSS, EFFX_DELAY, hitX, hitY, center=false);
	
// // 						if (monster.type == BOSS1)
// // 						{
// // 							//play sound
// // 							ge.playsound(SND_BOSSGRUNT);
// // 						}
// // 					}
// // 				}
// // 			}
// // 		}

// // 		if (ball.isDead())
// // 		{
// // 			group.splice(i,1);

// // 			//check if no more balls
// // 			if (group.length == 0 && !ge.getProp("nofirsthit"))		
// // 			{
// // 				//minus life
// // 				ge.minusProp("life",1);

// // 				//play sound
// // 				ge.playsound(SND_BALLDROP);

// // 				ge.setProp("restart",true);
// // 				ge.setProp("nextstagedelay", NEXTSTAGEDELAY);

// // 				// console.log("life left",ge.getProp("life"));

// // 			}
// // 		}
// // 	}

// // 	//update bricks
// // 	var group = ge.groups[GROUP_BRICK];
// // 	var bricks_cleared = true;

// // 	for (var i = group.length-1; i >= 0; i--)
// // 	{
// // 		var brick = group[i];

// // 		if (brick.type == BRICK_BLUE || brick.type == BRICK_GREY || brick.type == BRICK_RED ||
// // 			brick.type == BRICK_YELLOW || brick.type == BRICK_GREEN || brick.type == BRICK_WHITE ||
// // 			brick.type == BRICK_ITEM || brick.type == BRICK_CORRUPTED || brick.type == BRICK_LIFE)
// // 			bricks_cleared = false;

// // 		if (brick.isDead())
// // 		{
// // 			if (brick.type == BRICK_RED)
// // 			{
// // 				//set off explosion
// // 				var newBallFireProp = {...OBJ_BALLFIRE_PROP};
// // 				newBallFireProp["dx"] = -1;
// // 				var newBallFire = new BallFire(OBJ_BALLFIRE, newBallFireProp);
// // 				newBallFire.setPos(brick.midX(), brick.midY());
// // 				ge.addGameObj( GROUP_MISSILE, newBallFire);

// // 				newBallFireProp = {...OBJ_BALLFIRE_PROP};
// // 				newBallFireProp["dx"] = -1;
// // 				newBallFireProp["dy"] = -1;
// // 				newBallFire = new BallFire(OBJ_BALLFIRE, newBallFireProp);
// // 				newBallFire.setPos(brick.midX(), brick.midY());
// // 				ge.addGameObj( GROUP_MISSILE, newBallFire);

// // 				newBallFireProp = {...OBJ_BALLFIRE_PROP};
// // 				newBallFireProp["dy"] = -1;
// // 				newBallFire = new BallFire(OBJ_BALLFIRE, newBallFireProp);
// // 				newBallFire.setPos(brick.midX(), brick.midY());
// // 				ge.addGameObj( GROUP_MISSILE, newBallFire);

// // 				newBallFireProp = {...OBJ_BALLFIRE_PROP};
// // 				newBallFireProp["dx"] = 1;
// // 				newBallFireProp["dy"] = -1;
// // 				newBallFire = new BallFire(OBJ_BALLFIRE, newBallFireProp);
// // 				newBallFire.setPos(brick.midX(), brick.midY());
// // 				ge.addGameObj( GROUP_MISSILE, newBallFire);

// // 				newBallFireProp = {...OBJ_BALLFIRE_PROP};
// // 				newBallFireProp["dx"] = 1;
// // 				newBallFire = new BallFire(OBJ_BALLFIRE, newBallFireProp);
// // 				newBallFire.setPos(brick.midX(), brick.midY());
// // 				ge.addGameObj( GROUP_MISSILE, newBallFire);

// // 				newBallFireProp = {...OBJ_BALLFIRE_PROP};
// // 				newBallFireProp["dx"] = 1;
// // 				newBallFireProp["dy"] = 1;
// // 				newBallFire = new BallFire(OBJ_BALLFIRE, newBallFireProp);
// // 				newBallFire.setPos(brick.midX(), brick.midY());
// // 				ge.addGameObj( GROUP_MISSILE, newBallFire);

// // 				newBallFireProp = {...OBJ_BALLFIRE_PROP};
// // 				newBallFireProp["dx"] = -1;
// // 				newBallFireProp["dy"] = 1;
// // 				newBallFire = new BallFire(OBJ_BALLFIRE, newBallFireProp);
// // 				newBallFire.setPos(brick.midX(), brick.midY());
// // 				ge.addGameObj( GROUP_MISSILE, newBallFire);


// // 				//add effx
// // 				ge.addEffx(OBJ_EXPLODE, EFFX_DELAY, brick.midX(), brick.midY());

// // 				//add sound
// // 				ge.playsound(SND_EXPLODE);
// // 			}
// // 			else if (brick.type == BRICK_WHITE)
// // 			{
// // 				//set off new balls
// // 				var newBallProp = {...OBJ_BALL_PROP};
// // 				newBallProp["dx"] = -Math.cos(DEGREE_60);
// // 				newBallProp["dy"] = -Math.sin(DEGREE_60);
// // 				var newBall = new Ball(OBJ_BALL, newBallProp);
// // 				newBall.setPos(brick.midX(), brick.midY());
// // 				ge.addGameObj( GROUP_BALL, newBall);

// // 				newBallProp = {...OBJ_BALL_PROP};
// // 				newBallProp["dx"] = Math.cos(DEGREE_60);
// // 				newBallProp["dy"] = -Math.sin(DEGREE_60);
// // 				newBall = new Ball(OBJ_BALL, newBallProp);
// // 				newBall.setPos(brick.midX(), brick.midY());
// // 				ge.addGameObj( GROUP_BALL, newBall);

// // 				//play sound
// // 				ge.playsound(SND_SHOOT);
// // 			}
// // 			else if (brick.type == BRICK_ITEM)
// // 			{
// // 				var ran = Math.random();

// // 				// if (ran < 0.3)
// // 				// {
// // 				// 	var newItem = new Item(OBJ_ITEM_SCORE2, OBJ_ITEM_SCORE2_PROP);
// // 				// 	newItem.setPos(brick.midX(), brick.midY(), center=true);
// // 				// 	ge.addGameObj(GROUP_ITEM, newItem);
// // 				// }
// // 				// else if (ran < 0.4)
// // 				// {
// // 				// 	var newItem = new Item(OBJ_ITEM_SCORE3, OBJ_ITEM_SCORE3_PROP);
// // 				// 	newItem.setPos(brick.midX(), brick.midY(), center=true);
// // 				// 	ge.addGameObj(GROUP_ITEM, newItem);
// // 				// }
// // 				if (ran < 0.2)
// // 				{
// // 					var newItem = new Item(OBJ_ITEM_SPEEDUP, OBJ_ITEM_SPEEDUP_PROP);
// // 					newItem.setPos(brick.midX(), brick.midY(), center=true);
// // 					ge.addGameObj(GROUP_ITEM, newItem);
// // 				}
// // 				else if (ran < 0.4)
// // 				{
// // 					var newItem = new Item(OBJ_ITEM_CHARGE, OBJ_ITEM_CHARGE_PROP);
// // 					newItem.setPos(brick.midX(), brick.midY(), center=true);
// // 					ge.addGameObj(GROUP_ITEM, newItem);
// // 				}
// // 				else if (ran < 0.6)
// // 				{
// // 					var newItem = new Item(OBJ_ITEM_CANNON, OBJ_ITEM_CANNON_PROP);
// // 					newItem.setPos(brick.midX(), brick.midY(), center=true);
// // 					ge.addGameObj(GROUP_ITEM, newItem);
// // 				}
// // 				else if (ran < 0.8)
// // 				{
// // 					var newItem = new Item(OBJ_ITEM_FIREBALL, OBJ_ITEM_FIREBALL_PROP);
// // 					newItem.setPos(brick.midX(), brick.midY(), center=true);
// // 					ge.addGameObj(GROUP_ITEM, newItem);
// // 				}
// // 				else 
// // 				{
// // 					var newItem = new Item(OBJ_ITEM_BALLSPEEDUP, OBJ_ITEM_BALLSPEEDUP_PROP);
// // 					newItem.setPos(brick.midX(), brick.midY(), center=true);
// // 					ge.addGameObj(GROUP_ITEM, newItem);
// // 				}
// // 				// else
// // 				// {
// // 				// 	var newItem = new Item(OBJ_ITEM_LIFE, OBJ_ITEM_LIFE_PROP);
// // 				// 	newItem.setPos(brick.midX(), brick.midY(), center=true);
// // 				// 	ge.addGameObj(GROUP_ITEM, newItem);
// // 				// }
// // 				// else
// // 				// {
// // 				// 	var newItem = new Item(OBJ_ITEM_ZAP, OBJ_ITEM_ZAP_PROP);
// // 				// 	newItem.setPos(brick.midX(), brick.midY(), center=true);
// // 				// 	ge.addGameObj(GROUP_ITEM, newItem);
// // 				// }
// // 				// else if (ran < 0.95)
// // 				// {
// // 				// 	var newItem = new Item(OBJ_ITEM_SPEEDDOWN, OBJ_ITEM_SPEEDDOWN_PROP);
// // 				// 	newItem.setPos(brick.midX(), brick.midY(), center=true);
// // 				// 	ge.addGameObj(GROUP_ITEM, newItem);
// // 				// }

// // 			}
// // 			else if (brick.type == BRICK_CORRUPTED)
// // 			{
// // 				var newMonster = new Monster(OBJ_MONSTER1, OBJ_MONSTER1_PROP);
// // 				newMonster.setPos(brick.midX(), brick.midY(), center=true);
// // 				// console.log(brick.x, brick.y, brick.midX(), brick.midY());
// // 				// console.log(newMonster.x, newMonster.y, newMonster.w, newMonster.h);
// // 				ge.addGameObj(GROUP_MONSTER, newMonster);
// // 			}
// // 			else if (brick.type == BRICK_LIFE)
// // 			{
// // 				var newItem = new Item(OBJ_ITEM_LIFE, OBJ_ITEM_LIFE_PROP);
// // 				newItem.setPos(brick.midX(), brick.midY(), center=true);
// // 				ge.addGameObj(GROUP_ITEM, newItem);
// // 			}

// // 			// player.getPoints(brick);
// // 			if (ge.getProp("pointsupduration") > 0)
// // 				ge.addProp("score", brick.prop["pointsreward"] * ge.getProp("pointsup"));
// // 			else
// // 				ge.addProp("score", brick.prop["pointsreward"]);
				
// // 			//add effx
// // 			if (brick.type == BRICK_ITEM)
// // 			{
// // 				ge.addEffx(OBJ_BIGBRICKDIE, EFFX_DELAY, brick.midX(), brick.midY());
// // 			}
// // 			else
// // 			{
// // 				ge.addEffx(OBJ_BRICKDIE, EFFX_DELAY, brick.midX(), brick.midY());
// // 			}

// // 			//play sound
// // 			ge.playsound(SND_BRICKBREAK);
			
// // 			// player.getCharge(brick);
// // 			group.splice(i,1);

// // 		}
// // 	}	

// // 	//update missiles
// // 	var group = ge.groups[GROUP_MISSILE];

// // 	for (var i = group.length-1; i >= 0; i--)
// // 	{
// // 		var missile = group[i];

// // 		missile.update();

// // 		if (missile.y <= GAMESCREEN_TOP)
// // 		{
// // 			missile.prop["hp"] = 0;
			
// // 			//add effx
// // 			ge.addEffx(OBJ_BURST, EFFX_DELAY, missile.midX(), missile.midY(), center = true, jitter=true);
// // 		}
// // 		else if (missile.x <= GAMESCREEN_LEFT)
// // 		{
// // 			missile.prop["hp"] = 0;
			
// // 			//add effx
// // 			ge.addEffx(OBJ_BURST, EFFX_DELAY, missile.midX(), missile.midY(), center = true, jitter=true);
// // 		}
// // 		else if (missile.right() >= GAMESCREEN_RIGHT)
// // 		{
// // 			missile.prop["hp"] = 0;
			
// // 			//add effx
// // 			ge.addEffx(OBJ_BURST, EFFX_DELAY, missile.midX(), missile.midY(), center = true, jitter=true);
// // 		}

// // 		//check for interaction with the bricks
// // 		var bricks = ge.groups[GROUP_BRICK];

// // 		for (var j = bricks.length-1; j >= 0; j--)
// // 		{
// // 			var brick = bricks[j];

// // 			if (ge.collided(missile.midX(), missile.midY(), brick))
// // 			{
// // 				brick.hit(missile.prop["dmg"]);
// // 				missile.hit();

// // 				//add effx
// // 				ge.addEffx(OBJ_BURST, EFFX_DELAY, missile.midX(), missile.midY(), center = true, jitter=true);
// // 			}
// // 		}

// // 		//check for interaction with the monsters
// // 		var monsters = ge.groups[GROUP_MONSTER];
// // 		for (var j = monsters.length-1; j >= 0; j--)
// // 		{
// // 			var monster = monsters[j];

// // 			if (ge.collided(missile.midX(), missile.midY(), monster))
// // 			{
// // 				if (monster.type == MONSTER1)
// // 				{
// // 					monster.hit(missile.prop["dmg"]);
// // 				}
// // 				else if (monster.type == BOSS1)
// // 				{
// // 					//add effx
// // 					ge.addEffx(OBJ_BIGSPARKLE, EFFX_DELAY, missile.midX(), missile.midY(), center = true, jitter=false);
// // 					//play sound
// // 					ge.playsound(SND_NOEFFX);
// // 				}

// // 				missile.hit();

// // 				// //add effx
				
// // 			}
// // 		}

// // 		if (missile.isDead())
// // 		{
// // 			if (missile.type == BIGMISSILE)
// // 			{
// // 				//set off new balls
// // 				var newBallProp = {...OBJ_BALL_PROP};
// // 				newBallProp["dx"] = -Math.cos(DEGREE_30);
// // 				newBallProp["dy"] = Math.sin(DEGREE_30);
// // 				var newBall = new Ball(OBJ_BALL, newBallProp);
// // 				newBall.togglefireball(BIGMISSILEFIREDURATION);
// // 				newBall.setPos(missile.midX(), missile.midY()+10);
// // 				ge.addGameObj( GROUP_BALL, newBall);

// // 				newBallProp = {...OBJ_BALL_PROP};
// // 				newBallProp["dx"] = Math.cos(DEGREE_30);
// // 				newBallProp["dy"] = Math.sin(DEGREE_30);
// // 				newBall = new Ball(OBJ_BALL, newBallProp);
// // 				newBall.togglefireball(BIGMISSILEFIREDURATION);
// // 				newBall.setPos(missile.midX(), missile.midY()+10);
// // 				ge.addGameObj( GROUP_BALL, newBall);

// // 				// ge.setProp("fireballduration", 33);

// // 				//play sound
// // 				ge.playsound(SND_EXPLODE);
// // 			}

// // 			group.splice(i,1);
// // 		}
// // 	}

// // 	//update items
// // 	var group = ge.groups[GROUP_ITEM];

// // 	for (var i = group.length-1; i >= 0; i--)
// // 	{
// // 		var item = group[i];
// // 		// console.log("updating", item);
		
// // 		item.update();

// // 		//check for collision with player
// // 		if (ge.collided(item.midX(), item.midY(), player))
// // 		{
// // 			item.prop["hp"] = 0;

// // 			//Gain benefit of item
// // 			if (item.type == ITEM_SPEEDUP)
// // 			{
// // 				player.prop["power"] += item.prop["reward"];

// // 				//add effx
// // 				ge.addEffx(OBJ_SPEEDUP, EFFX_DELAY, player.midX(), player.midY()-40);
// // 			}
// // 			else if (item.type == ITEM_CHARGE)
// // 			{
// // 				player.prop["charge"] += item.prop["reward"];
// // 			}
// // 			else if (item.type == ITEM_CANNON)
// // 			{
// // 				ge.setProp("cannonshootduration",item.prop["reward"]);
// // 			}

// // 			else if (item.type == ITEM_FIREBALL)
// // 			{
// // 				// ge.setProp("fireballduration",item.prop["reward"]);

// // 				//loop through all balls to give them fireball
// // 				var balls = ge.groups[GROUP_BALL];

// // 				for (var j = balls.length-1; j >= 0; j--)
// // 				{
// // 					var ball = balls[j];
					
// // 					ball.togglefireball(item.prop["reward"]);
// // 				}
// // 			}
// // 			else if (item.type == ITEM_SCORE2)
// // 			{
// // 				ge.setProp("pointsupduration",item.prop["reward"]);
// // 				ge.setProp("pointsup",2);
// // 			}
// // 			else if (item.type == ITEM_SCORE3)
// // 			{
// // 				ge.setProp("pointsupduration",item.prop["reward"]);
// // 				ge.setProp("pointsup",3);
// // 			}
// // 			else if (item.type == ITEM_BALLSPEEDUP)
// // 			{
// // 				ge.setProp("ballspeedupduration",item.prop["reward"]);
// // 			}
// // 			else if (item.type == ITEM_LIFE)
// // 			{
// // 				if (ge.getProp("life") < 4)
// // 					ge.addProp("life",item.prop["reward"]);
// // 			}
// // 			else if (item.type == ITEM_ZAP)
// // 			{
// // 				ge.setProp("zapduration",item.prop["reward"]);
// // 			}

// // 			//play sound
// // 			ge.playsound(SND_GLITTER);
// // 		}

// // 		if (item.y >= STAGE_HEIGHT)
// // 		{
// // 			item.prop["hp"] = 0;
// // 		}

// // 		if (item.isDead())
// // 		{
// // 			group.splice(i,1);
// // 		}
// // 	}

// // 	//update monsters
// // 	var monsters = ge.groups[GROUP_MONSTER];
// // 	for (var i = monsters.length-1; i >= 0; i--)
// // 	{
// // 		var monster = monsters[i];

// // 		monster.update(ge);

// // 		// console.log("loop monster",i, monster);
// // 		var playzapsound = false;

// // 		//check if collide with player
// // 		if (ge.collidedobj(monster, player))
// // 		{
// // 			monster.prop["hp"] = 0;

// // 			ge.setProp("zapduration", monster.prop["zapduration"]);

// // 			//addeffx
// // 			ge.addEffx(OBJ_HITBOSS,EFFX_DELAY3, player.left(), player.midY(), center=true, jitter=true);
// // 			ge.addEffx(OBJ_HITBOSS,EFFX_DELAY, player.midX(), player.midY(), center=true, jitter=true);
// // 			ge.addEffx(OBJ_HITBOSS,EFFX_DELAY4, player.right(), player.midY(), center=true, jitter=true);

// // 			//play sound
// // 			ge.playsound(SND_SHOCK);
// // 			playzapsound = true;
// // 		}

// // 		//check that monster has gone off screen
// // 		if (monster.y > STAGE_HEIGHT)
// // 		{
// // 			monster.prop["hp"] = 0;
// // 			monster.prop["killedbyoffscreen"] = true;
// // 			// console.log("I have killed a monster when it goes off the screen");
// // 		}

// // 		//if boss exists
// // 		if (monster.type == BOSS1)
// // 		{
// // 			ge.setProp("bosslife",monster.prop["hp"]);
// // 		}

// // 		if (monster.isDead())
// // 		{
// // 			//add effx
// // 			if (monster.type == MONSTER1)
// // 			{
// // 				ge.addEffx(OBJ_MONSTERDIE, EFFX_DELAY, monster.midX(), monster.midY());
// // 			}
// // 			else if (monster.type == BOSS1)
// // 			{
// // 				var bricks = ge.groups[GROUP_BRICK];
// // 				for (var j = 0; j < bricks.length; j++)
// // 				{
// // 					var brick = bricks[j];
// // 					if (brick.type != BRICK_METAL)
// // 						brick.hit(10);
// // 				}
// // 			}

// // 			if (!monster.prop["killedbyoffscreen"] && !playzapsound)
// // 			{
// // 				//play sound
// // 				ge.playsound(SND_MONSTERDIE);
// // 			}

// // 			monsters.splice(i,1);
// // 		}
// // 	}

// // 	//check if we need to make a new stage
// // 	// var group = ge.groups[GROUP_BRICK];
// // 	// var indestruct = ge.getProp("indestruct");
// // 	// if (group.length <= indestruct)
// // 	var monsters = ge.groups[GROUP_MONSTER];

// // 	// console.log("win condition",bricks_cleared, monsters.length, ge.getProp("win"));
// // 	if ((bricks_cleared) && (monsters.length == 0) && !ge.getProp("win"))
// // 	{
// // 		ge.addProp("currStageIndex",1);
// // 		if (ge.getProp("currStageIndex") > GAME_1.length-1)
// // 		{
// // 			//Win!!
// // 			ge.state_exitcounter = STATE_EXITCOUNTER;
// // 			ge.nextstate = GAMESTATE_RESULTS_INIT;

// // 			ge.setProp("win", true);
// // 			return;
// // 		}
// // 		else
// // 		{
// // 			var gamestage = GAME_1[ge.getProp("currStageIndex")];
// // 			// console.log("game stage",ge.getProp("currStageIndex"),gamestage);
			
// // 			// createStage(gamestage);	
	
// // 			ge.setProp("createStage", true);
// // 			ge.setProp("nextGameStage", gamestage);
	
// // 			//add delay till next stage
// // 			ge.setProp("restart",true);
// // 			ge.setProp("congratsdelay",CONGRATSDELAY);
// // 			ge.setProp("nextstagedelay",NEXTSTAGEDELAY);
	
			
// // 		}

// // 		//play sounds
// // 		ge.playsound(SND_WIN);
// // 	}

// // 	//check if player is dead
// // 	if (ge.getProp("life") <= 0)
// // 	{
// // 		ge.state_exitcounter = STATE_EXITCOUNTER;
// // 		ge.nextstate = GAMESTATE_RESULTS_INIT;

// // 		ge.setProp("win", false);
// // 		return;
// // 	}

	
// // 	//handle the UI
// // 	var ui = [];
// // 	ge.resetUI();

// // 	var life = ge.getProp("life");
// // 	// console.log("lives left",life);
// // 	if (life >= 1)
// // 	{
// // 		// console.log("added 1 life");
// // 		var newGameObj = new GameObj(OBJ_LIVES, {});
// // 		ge.addUI(newGameObj);
// // 	}
// // 	if (life >= 2)
// // 	{
// // 		var newGameObj = new GameObj(OBJ_LIVES2, {});
// // 		ge.addUI(newGameObj);
// // 	}
// // 	if (life >= 3)
// // 	{
// // 		var newGameObj = new GameObj(OBJ_LIVES3, {});
// // 		ge.addUI(newGameObj);
// // 	}
// // 	if (life >= 4)
// // 	{
// // 		var newGameObj = new GameObj(OBJ_LIVES4, {});
// // 		ge.addUI(newGameObj);
// // 	}

// // 	if (ge.getProp("bosslife") > 0)
// // 	{
// // 		var life = ge.getProp("bosslife");
// // 		if (life >= 1)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES, {});
// // 			ge.addUI(newGameObj);
// // 		}
// // 		if (life >= 2)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES_2, {});
// // 			ge.addUI(newGameObj);
// // 		}
// // 		if (life >= 3)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES_3, {});
// // 			ge.addUI(newGameObj);
// // 		}
// // 		if (life >= 4)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES_4, {});
// // 			ge.addUI(newGameObj);
// // 		}

// // 		if (life >= 5)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES_5, {});
// // 			ge.addUI(newGameObj);
// // 		}
// // 		if (life >= 6)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES_6, {});
// // 			ge.addUI(newGameObj);
// // 		}
// // 		if (life >= 7)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES_7, {});
// // 			ge.addUI(newGameObj);
// // 		}
// // 		if (life >= 8)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES_8, {});
// // 			ge.addUI(newGameObj);
// // 		}

// // 		if (life >= 9)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES_9, {});
// // 			ge.addUI(newGameObj);
// // 		}
// // 		if (life >= 10)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES_10, {});
// // 			ge.addUI(newGameObj);
// // 		}
// // 		if (life >= 11)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES_11, {});
// // 			ge.addUI(newGameObj);
// // 		}
// // 		if (life >= 12)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES_12, {});
// // 			ge.addUI(newGameObj);
// // 		}

// // 		if (life >= 13)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES_13, {});
// // 			ge.addUI(newGameObj);
// // 		}
// // 		if (life >= 14)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES_14, {});
// // 			ge.addUI(newGameObj);
// // 		}
// // 		if (life >= 15)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES_15, {});
// // 			ge.addUI(newGameObj);
// // 		}
// // 		if (life >= 16)
// // 		{
// // 			var newGameObj = new GameObj(OBJ_BOSS_LIVES_16, {});
// // 			ge.addUI(newGameObj);
// // 		}
// // 	}
// // 	else
// // 	{
// // 		ge.addUIText(new UIText("#AAA","center","Enemy boss",
// // 			ENEMY_X, ENEMY_Y, fo=SMALL_FONTS, wipe=true));
			
// // 		ge.addUIText(new UIText("#AAA","center","not detected",
// // 			ENEMY_X, ENEMY_Y+30, fo=SMALL_FONTS, wipe=true));
// // 	}	
// // }


// //#####################
// //#####################
// //GAMEPLAY FUNCTIONS
// //#####################
// //#####################
// // function createStage(gamestage)
// // {
// // 	ge.addProp("stage", 1);

// // 	//clear away all existing balls, items
// // 	ge.groups[GROUP_BALL] = [];
// // 	ge.groups[GROUP_ITEM] = [];
// // 	ge.groups[GROUP_MISSILE] = [];
// // 	ge.groups[GROUP_BRICK] = [];

// // 	//clear away missile
// // 	ge.setProp("cannonshootduration",0);
// // 	ge.setProp("fireballduration",0);
// // 	ge.setProp("pointsupduration",0);
// // 	ge.setProp("ballspeedupduration",0);
// // 	ge.setProp("zapduration",0);

// // 	//clear away player missile
// // 	var player = ge.groups[GROUP_PLAYER][0];
// // 	// player.stopfire();

// // 	// var indestruct = 0;

// // 	for (var i=0; i< gamestage.length; i++)
// // 	{
// // 		var line = gamestage[i];

// // 		for (var j=0; j<line.length; j++)
// // 		{
// // 			var bricktype = line[j];
// // 			if (bricktype == "B")
// // 			{
// // 				var newBrick = new Brick(OBJ_BRICK_BLUE, OBJ_BRICK_BLUE_PROP);

// // 				//set brick position
// // 				newBrick.setPos(j*BRICKOFFSET_X + BRICK_STARTX, i*BRICKOFFSET_Y + BRICK_STARTY); 

// // 				ge.addGameObj(GROUP_BRICK,newBrick);
// // 			}
// // 			else if (bricktype == "Y")
// // 			{
// // 				var newBrick = new Brick(OBJ_BRICK_YELLOW, OBJ_BRICK_YELLOW_PROP);

// // 				//set brick position
// // 				newBrick.setPos(j*BRICKOFFSET_X + BRICK_STARTX, i*BRICKOFFSET_Y + BRICK_STARTY); 

// // 				ge.addGameObj(GROUP_BRICK,newBrick);
// // 			}
// // 			else if (bricktype == "G")
// // 			{
// // 				var newBrick = new Brick(OBJ_BRICK_GREEN, OBJ_BRICK_GREEN_PROP);

// // 				//set brick position
// // 				newBrick.setPos(j*BRICKOFFSET_X + BRICK_STARTX, i*BRICKOFFSET_Y + BRICK_STARTY); 

// // 				ge.addGameObj(GROUP_BRICK,newBrick);
// // 			}
// // 			else if (bricktype == "E")
// // 			{
// // 				var newBrick = new Brick(OBJ_BRICK_GREY, OBJ_BRICK_GREY_PROP);

// // 				//set brick position
// // 				newBrick.setPos(j*BRICKOFFSET_X + BRICK_STARTX, i*BRICKOFFSET_Y + BRICK_STARTY); 

// // 				ge.addGameObj(GROUP_BRICK,newBrick);
// // 			}
// // 			else if (bricktype == "R")
// // 			{
// // 				var newBrick = new Brick(OBJ_BRICK_RED, OBJ_BRICK_RED_PROP);

// // 				//set brick position
// // 				newBrick.setPos(j*BRICKOFFSET_X + BRICK_STARTX, i*BRICKOFFSET_Y + BRICK_STARTY); 

// // 				ge.addGameObj(GROUP_BRICK,newBrick);
// // 			}
// // 			else if (bricktype == "W")
// // 			{
// // 				var newBrick = new Brick(OBJ_BRICK_WHITE, OBJ_BRICK_WHITE_PROP);

// // 				//set brick position
// // 				newBrick.setPos(j*BRICKOFFSET_X + BRICK_STARTX, i*BRICKOFFSET_Y + BRICK_STARTY); 

// // 				ge.addGameObj(GROUP_BRICK,newBrick);
// // 			}
// // 			else if (bricktype == "M")
// // 			{
// // 				var newBrick = new Brick(OBJ_BRICK_METAL, OBJ_BRICK_METAL_PROP);

// // 				//set brick position
// // 				newBrick.setPos(j*BRICKOFFSET_X + BRICK_STARTX, i*BRICKOFFSET_Y + BRICK_STARTY); 

// // 				ge.addGameObj(GROUP_BRICK,newBrick);

// // 				// indestruct++;
// // 			}
// // 			else if (bricktype == "I")
// // 			{
// // 				var newBrick = new Brick(OBJ_BRICK_ITEM, OBJ_BRICK_ITEM_PROP);

// // 				//set brick position
// // 				newBrick.setPos(j*BRICKOFFSET_X + BRICK_STARTX, i*BRICKOFFSET_Y + BRICK_STARTY); 

// // 				ge.addGameObj(GROUP_BRICK,newBrick);
// // 			}
// // 			else if (bricktype == "C")
// // 			{
// // 				var newBrick = new Brick(OBJ_BRICK_CORRUPTED, OBJ_BRICK_CORRUPTED_PROP);

// // 				//set brick position
// // 				newBrick.setPos(j*BRICKOFFSET_X + BRICK_STARTX, i*BRICKOFFSET_Y + BRICK_STARTY); 

// // 				ge.addGameObj(GROUP_BRICK,newBrick);
// // 			}
// // 			else if (bricktype == "L")
// // 			{
// // 				var newBrick = new Brick(OBJ_BRICK_LIFE, OBJ_BRICK_LIFE_PROP);

// // 				//set brick position
// // 				newBrick.setPos(j*BRICKOFFSET_X + BRICK_STARTX, i*BRICKOFFSET_Y + BRICK_STARTY); 

// // 				ge.addGameObj(GROUP_BRICK,newBrick);
// // 			}
// // 			else if (bricktype == "X")
// // 			{
// // 				//add boss
// // 				var newMonster = new Boss(OBJ_BOSS1, OBJ_BOSS1_PROP);

// // 				//set brick position
// // 				newMonster.setPos(j*BRICKOFFSET_X + BRICK_STARTX, i*BRICKOFFSET_Y + BRICK_STARTY); 

// // 				ge.addGameObj(GROUP_MONSTER,newMonster);

// // 				//play sound
// // 				ge.playsound(SND_ROAR);
// // 			}
// // 		}
// // 	}

// // 	// ge.setProp("indestruct", indestruct);
// // 	// console.log("indestruct", indestruct);
// // 	ge.setProp("nofirsthit", true);
// // }