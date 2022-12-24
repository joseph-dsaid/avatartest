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