
// //------------
// //Preloading
// //------------
const TEXT_PRELOADING = "Loading ...";
const TEXT_PRELOADING_X = 100;
const TEXT_PRELOADING_Y = 100;

const DEFAULT_SCREEN_CLEAR = "#EFE";
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

const TIME_PER_FRAME = 33; //this equates to 30 fps. If set to 1000, it executes once per second.

const IMAGES_ASSETS = {
	base_m_001 : "img/base_m_001.png",
	base_m_002 : "img/base_m_002.png",
	base_m_003 : "img/base_m_003.png",
	base_f_001 : "img/base_f_001.png",
	base_f_002 : "img/base_f_002.png",
	base_f_003 : "img/base_f_003.png",
	
	//head
	head_001_tophat : "img/head_001_tophat.png",
	head_002_roundhat_black : "img/head_002_roundhat_black.png",
	head_002_roundhat_blue : "img/head_002_roundhat_blue.png",
	head_002_roundhat_gold : "img/head_002_roundhat_gold.png",
	head_002_roundhat_green : "img/head_002_roundhat_green.png",
	head_002_roundhat_red : "img/head_002_roundhat_red.png",
	head_003_casualcap_black : "img/head_003_casualcap_black.png",
	head_003_casualcap_blue : "img/head_003_casualcap_blue.png",
	head_003_casualcap_green : "img/head_003_casualcap_green.png",
	head_003_casualcap_red : "img/head_003_casualcap_red.png",
	head_004_piratehat : "img/head_004_piratehat.png",
	//----------

	//hair
	hair_001_short : "img/hair_001_short.png",
	hair_002_crewcut : "img/hair_002_crewcut.png",
	hair_003_f4 : "img/hair_003_f4.png",
	hair_004_side : "img/hair_004_side.png",
	hair_005_tall : "img/hair_005_tall.png",
	hair_006_puffy : "img/hair_006_puffy.png",
	hair_007_centre : "img/hair_007_centre.png",
	hair_008_straight : "img/hair_008_straight.png",
	hair_009_balding : "img/hair_009_balding.png",
	hair_010_punk : "img/hair_010_punk.png",
	hair_011_wrap : "img/hair_011_wrap.png",
	hair_012_pony : "img/hair_012_pony.png",
	hair_013_long : "img/hair_013_long.png",
	hair_014_longstraight : "img/hair_014_longstraight.png",
	hair_015_hairband : "img/hair_015_hairband.png",
	//----------

	//eye
	eye_001_specs_black : "img/eye_001_specs_black.png",
	eye_001_specs_blue : "img/eye_001_specs_blue.png",
	eye_001_specs_green : "img/eye_001_specs_green.png",
	eye_001_specs_red : "img/eye_001_specs_red.png",
	eye_002_bigspecs_black : "img/eye_002_bigspecs_black.png",
	eye_002_bigspecs_blue : "img/eye_002_bigspecs_blue.png",
	eye_002_bigspecs_green : "img/eye_002_bigspecs_green.png",
	eye_002_bigspecs_red : "img/eye_002_bigspecs_red.png",
	eye_003_piratepatch_black_left : "img/eye_003_piratepatch_black_left.png",
	eye_003_piratepatch_black_right : "img/eye_003_piratepatch_black_right.png",
	eye_004_cyclops : "img/eye_004_cyclops.png",
	eye_005_mask : "img/eye_005_mask.png",
	eye_006_shades_black : "img/eye_006_shades_black.png",
	eye_006_shades_blue : "img/eye_006_shades_blue.png",
	eye_006_shades_green : "img/eye_006_shades_green.png",
	eye_006_shades_red : "img/eye_006_shades_red.png",
	//----------

	//neck
	neck_001_scarf_black : "img/neck_001_scarf_black.png",
	neck_001_scarf_blue : "img/neck_001_scarf_blue.png",
	neck_001_scarf_green : "img/neck_001_scarf_green.png",
	neck_001_scarf_red : "img/neck_001_scarf_red.png",
	neck_002_medal : "img/neck_002_medal.png",

	//----------

	//body
	body_001_tshirt_black : "img/body_001_tshirt_black.png",
	body_001_tshirt_blue : "img/body_001_tshirt_blue.png",
	body_001_tshirt_green : "img/body_001_tshirt_green.png",
	body_001_tshirt_red : "img/body_001_tshirt_red.png",

	body_002_singlet_blue : "img/body_002_singlet_blue.png",
	body_002_singlet_green : "img/body_002_singlet_green.png",
	body_002_singlet_grey : "img/body_002_singlet_grey.png",
	body_002_singlet_red : "img/body_002_singlet_red.png",

	body_003_suit_black : "img/body_003_suit_black.png",
	body_003_suit_blue : "img/body_003_suit_blue.png",
	body_003_suit_green : "img/body_003_suit_green.png",
	body_003_suit_red : "img/body_003_suit_red.png",
	
	body_004_dress_black : "img/body_004_dress_black.png",
	body_004_dress_blue : "img/body_004_dress_blue.png",
	body_004_dress_green : "img/body_004_dress_green.png",
	body_004_dress_red : "img/body_004_dress_red.png",
	
	body_005_jacket_black : "img/body_005_jacket_black.png",
	body_005_jacket_blue : "img/body_005_jacket_blue.png",
	body_005_jacket_green : "img/body_005_jacket_green.png",
	body_005_jacket_red : "img/body_005_jacket_red.png",
	//----------
	
	//leg
	leg_001_shorts_black : "img/leg_001_shorts_black.png",
	leg_001_shorts_blue : "img/leg_001_shorts_blue.png",
	leg_001_shorts_green : "img/leg_001_shorts_green.png",
	leg_001_shorts_red : "img/leg_001_shorts_red.png",
	leg_002_pants_black : "img/leg_002_pants_black.png",
	leg_002_pants_blue : "img/leg_002_pants_blue.png",
	leg_002_pants_green : "img/leg_002_pants_green.png",
	leg_002_pants_red : "img/leg_002_pants_red.png",
	leg_003_trackpants_black : "img/leg_003_trackpants_black.png",
	leg_003_trackpants_blue : "img/leg_003_trackpants_blue.png",
	leg_003_trackpants_green : "img/leg_003_trackpants_green.png",
	leg_003_trackpants_red : "img/leg_003_trackpants_red.png",

	//----------

	//feet
	feet_001_shoes_black : "img/feet_001_shoes_black.png",
	feet_001_shoes_blue : "img/feet_001_shoes_blue.png",
	feet_001_shoes_green : "img/feet_001_shoes_green.png",
	feet_001_shoes_red : "img/feet_001_shoes_red.png",
	//----------
	
	//hand
	hand_001_woodensword : "img/hand_001_woodensword.png",
	hand_002_sword : "img/hand_002_sword.png",
	hand_003_stick : "img/hand_003_stick.png",
	hand_004_club : "img/hand_004_club.png",
	hand_005_barbedclub : "img/hand_005_barbedclub.png",
	hand_006_spear : "img/hand_006_spear.png",
	hand_007_axe : "img/hand_007_axe.png",
	hand_008_whip : "img/hand_008_whip.png",
	hand_009_dagger : "img/hand_009_dagger.png",
	hand_010_rapier : "img/hand_010_rapier.png",
	hand_011_briefcase : "img/hand_011_briefcase.png",
	hand_012_walkingstick : "img/hand_012_walkingstick.png",
	hand_013_flower : "img/hand_013_flower.png",
	hand_014_kite : "img/hand_014_kite.png",
	//----------
	
	//pet
	pet_001_python : "img/pet_001_python.png",
	pet_002_panda : "img/pet_002_panda.png",
	//----------

	//addon
	addon_001_moustache : "img/addon_001_moustache.png",
	addon_001_moustache_grey : "img/addon_001_moustache_grey.png",

	addon_002_beard : "img/addon_002_beard.png",
	addon_002_beard_grey : "img/addon_002_beard_grey.png",
	
	addon_003_longbeard : "img/addon_003_longbeard.png",
	addon_003_longbeard_grey : "img/addon_003_longbeard_grey.png",
	
	addon_004_bushy : "img/addon_004_bushy.png",
	addon_004_bushy_grey : "img/addon_004_bushy_grey.png",
	//----------

}

// //------------
// //System Values
// //------------
// var STAGE_WIDTH = 1000,
// 	STAGE_HEIGHT = 600,
// 	DEFAULT_STYLE = "black",
// 	TIME_PER_FRAME = 33, //this equates to 30 fps. If set to 1000, it executes once per second.
// 	SMALL_FONTS = "bold 20px sans-serif",
// 	NORMAL_FONTS = "normal 25px sans-serif",
// 	GAME_FONTS = "bold 30px sans-serif",
// 	POINTS_FONTS = "bold 60px sans-serif";
// 	PROTIP_FONTS = "20px sans-serif";

// var NEW_FONT = "bold 50px fonts/changa.ttf";
	
// //Game States
// var GAMESTATE_MENU_INIT = "menu_init";
// var GAMESTATE_MENU_UPDATE = "menu_update";
// // var GAMESTATE_MENU_EXIT = "menu_exit";

// var GAMESTATE_TUTORIAL_INIT = "tutorial_init";
// var GAMESTATE_TUTORIAL_UPDATE = "tutorial_update";
// // var GAMESTATE_TUTORIAL_EXIT = "menu_exit";

// var GAMESTATE_GAMEPLAY_INIT = "gameplay_init";
// var GAMESTATE_GAMEPLAY_UPDATE = "gameplay_update";
// // var GAMESTATE_GAMEPLAY_EXIT = "gameplay_exit";

// var GAMESTATE_RESULTS_INIT = "results_init";
// var GAMESTATE_RESULTS_UPDATE = "results_update";

// var STATE_EXITCOUNTER = 10;
	

	
// //-----------------
// //ART ASSETS PATHS
// //-----------------
// var BACKGROUND_HOME = "BACKGROUND_HOME";
// var BACKGROUND_GAME = "BACKGROUND_GAME";
// var BACKGROUND_WIN = "BACKGROUND_WIN";
// var BACKGROUND_LOSE = "BACKGROUND_LOSE";
// var BACKGROUND_TUTORIAL = "BACKGROUND_TUTORIAL";

// var POINTER = "POINTER";
// var POINTER_INDEX = "POINTER_INDEX";
// var OBJ_POINTER = [POINTER, 30,30,-1000,-1000];
// var POINTER_X = 92;
// var POINTER_Y = 300;
// var POINTER_POS = [
// 	[POINTER_X,POINTER_Y],
// 	[POINTER_X+70,POINTER_Y],
// 	[POINTER_X+140,POINTER_Y],
// 	[POINTER_X+210,POINTER_Y],
// 	[POINTER_X+280,POINTER_Y],
// 	[POINTER_X+350,POINTER_Y]
// ]
// var OBJ_POINTER_PROP = {};
// var GROUP_POINTER = "GROUP_POINTER";

// // Game States
// var LOST = "LOST";
// var CODE = "CODE";
// var RUNCODE = "RUNCODE";
// var RUNCODE_TILES = "RUNCODE_TILES";
// var MAX_STACK_SIZE = 5;
// var STEPS = 25;
// var BLOCKS_TO_TRACK = "BLOCKS_TO_TRACK";
// var INDEX = "INDEX";
// var WIN = "WIN";
// var CHECKWIN = "CHECKWIN";

// var ORIGINALSETUP = "ORIGINALSETUP";
// var CURR_RUN = "CURR_RUN";
// var HISTORY1 = "HISTORY1";
// var HISTORY2 = "HISTORY2";
// var HISTORY3 = "HISTORY3";

// var GROUP_HISTORY1 = "GROUP_HISTORY1";
// var GROUP_HISTORY2 = "GROUP_HISTORY2";

// // -------
// var FIRSTHELP = "FIRSTHELP";
// var FIRSTHELPCOUNTER = "FIRSTHELPCOUNTER";
// var FIRSTHELPCOUNTERMAX = 30;
// // -------
// var GROUP_CANCEL = "GROUP_CANCEL";
// var CANCEL = "CANCEL";
// var OBJ_CANCEL = [CANCEL, 22,22,-1000,-1000];
// var OBJ_CANCEL_PROP = {"index":-1};
// var CANCEL_OFFSET_X = 16;
// var CANCEL_OFFSET_Y = 6;
// // -------
// var BTN_START = "BTN_START";
// var OBJ_BTN_START = [BTN_START, 416,65,297,446];

// var BTN_EXECUTE = "BTN_EXECUTE";
// var OBJ_BTN_EXECUTE = [BTN_EXECUTE, 416,65,70,400];

// var BTN_RETRY = "BTN_RETRY";
// // var OBJ_BTN_RETRY = [BTN_RETRY, 50,50,520,250];
// var OBJ_BTN_RETRY = [BTN_RETRY, 416,65,70,400];

// var BTN_NEXT = "BTN_NEXT";
// var OBJ_BTN_NEXT = [BTN_NEXT, 416,65,70,400];

// // var BTN_TUTORIAL_NEXT = "BTN_TUTORIAL_NEXT";
// var OBJ_BTN_TUTORIAL_NEXT = [BTN_NEXT, 416,65,297,446];

// var BTN_GAMEBACK = "BTN_GAMEBACK";
// var OBJ_BTN_GAMEBACK = [BTN_GAMEBACK, 416,65,70,400];

// var BTN_BACK = "BTN_BACK";
// var OBJ_BTN_BACK = [BTN_BACK, 416,65,291,496];


// var GROUP_SOCKETS = "GROUP_SOCKETS";
// var SOCKET = "SOCKET";
// var OBJ_SOCKET1 = [SOCKET, 62, 62, 70, 230];
// var OBJ_SOCKET2 = [SOCKET, 62, 62, 140, 230];
// var OBJ_SOCKET3 = [SOCKET, 62, 62, 210, 230];
// var OBJ_SOCKET4 = [SOCKET, 62, 62, 280, 230];
// var OBJ_SOCKET5 = [SOCKET, 62, 62, 350, 230];
// var OBJ_SOCKET6 = [SOCKET, 62, 62, 420, 230];

// var CODE_TILE_POS = [
// 	[70,230],
// 	[140,230],
// 	[210,230],
// 	[280,230],
// 	[350,230],
// 	[420,230]
// ]

// var OBJ_SOCKET_PROP1 = {"index":1};
// var OBJ_SOCKET_PROP2 = {"index":2};
// var OBJ_SOCKET_PROP3 = {"index":3};
// var OBJ_SOCKET_PROP4 = {"index":4};
// var OBJ_SOCKET_PROP5 = {"index":5};
// var OBJ_SOCKET_PROP6 = {"index":6};

// var GROUP_CODEHELP = "GROUP_CODEHELP";
// var CODEHELP = "CODEHELP";
// var OBJ_CODEHELP = [CODEHELP, 380, 70, 90,320];
// //---------------------

// var GROUP_BLOCKS = "GROUP_BLOCKS";
// var GROUP_BLOCKGUIDES = "GROUP_BLOCKGUIDES";
// var BLOCK_ANY = "BLOCK_ANY";
// var BLOCK_RED = "BLOCK_RED";
// var BLOCK_GREEN = "BLOCK_GREEN";
// var BLOCK_BLUE = "BLOCK_BLUE";
// var BLOCKGUIDE = "BLOCKGUIDE";

// var COLX_WINCOLOUR = "COLX_WINCOLOUR";
// var COLY_WINCOLOUR = "COLY_WINCOLOUR";
// var COLZ_WINCOLOUR = "COLZ_WINCOLOUR";

// var COLX = "COLX";
// var COLY = "COLY";
// var COLZ = "COLZ";

// var COLX_X = 625;
// var COLY_X = 734;
// var COLZ_X = 843;
// var COL_Y = [360,300,240,180,120,0]; //but the 6th one will not be reached if max stack size is 5

// var OBJ_BLOCKGUIDE = [BLOCKGUIDE, 60,30,10,10];

// var COLX_BLOCKGUIDE_X = COLX_X;
// var COLY_BLOCKGUIDE_X = COLY_X;
// var COLZ_BLOCKGUIDE_X = COLZ_X;
// var BLOCKGUIDE_Y = 472;

// var OBJ_BLOCK_RED = [BLOCK_RED, 66, 66, 245, 230];
// var OBJ_BLOCK_GREEN = [BLOCK_GREEN, 66, 66, 345, 230];
// var OBJ_BLOCK_BLUE = [BLOCK_BLUE, 66, 66, 445, 230];

// var OBJ_BLOCK_RED_PROP = {"colour":"red"};
// var OBJ_BLOCK_GREEN_PROP = {"colour":"green"};
// var OBJ_BLOCK_BLUE_PROP = {"colour":"blue"};
// var OBJ_BLOCKGUIDE_PROP = {};

// //---------------------
// var GROUP_SELECTOR = "GROUP_SELECTOR";
// var SOCKET_CLICKED = "SOCKET_CLICKED";
// var SELECTOR = "SELECTOR";
// // var OBJ_SELECTOR = [SELECTOR, 280,120, -1000, -1000];
// var OBJ_SELECTOR = [SELECTOR, 280,120, -1000, -1000];
// var SELECTOR_POS = 
// [
// 	[-1000,-1000],
// 	[16,120],
// 	[33,120],
// 	[103,120],
// 	[173,120],
// 	[243,120],
// 	[262,120]
// ]
// //---------------------

// var GROUP_TILES = "GROUP_TILES";
// var TILE_XY = "TILE_XY";
// var TILE_XY_ANIMATE = "TILE_XY_ANIMATE";
// var TILE_XY_DO = "TILE_XY_DO";

// var TILE_YZ = "TILE_YZ";
// var TILE_YZ_ANIMATE = "TILE_YZ_ANIMATE";
// var TILE_YZ_DO = "TILE_YZ_DO";

// var TILE_YX = "TILE_YX";
// var TILE_YX_ANIMATE = "TILE_YX_ANIMATE";
// var TILE_YX_DO = "TILE_YX_DO";

// var TILE_ZY = "TILE_ZY";
// var TILE_ZY_ANIMATE = "TILE_ZY_ANIMATE";
// var TILE_ZY_DO = "TILE_ZY_DO";

// var TILE_NULL = "TILE_NULL";

// var OBJ_TILE_XY = [TILE_XY,66,66,-1,-1];
// var OBJ_TILE_YX = [TILE_YX,66,66-1,-1];
// var OBJ_TILE_YZ = [TILE_YZ,66,66,-1,-1];
// var OBJ_TILE_ZY = [TILE_ZY,66,66,-1,-1];
// // var OBJ_TILE_NULL = [TILE_NULL, 66,66,-1,-1];

// var OBJ_TILE_XY_PROP = {CODE:TILE_XY};
// var OBJ_TILE_YX_PROP = {CODE:TILE_YX};
// var OBJ_TILE_YZ_PROP = {CODE:TILE_YZ};
// var OBJ_TILE_ZY_PROP = {CODE:TILE_ZY};
// // var OBJ_TILE_NULL_PROP = {CODE:TILE_NULL}

// var TILE_XPRIME = "TILE_XPRIME";
// var TILE_XPRIME_ANIMATE = "TILE_XPRIME_ANIMATE";
// var TILE_XPRIME_DO = "TILE_XPRIME_DO";

// var TILE_YPRIME = "TILE_YPRIME";
// var TILE_YPRIME_ANIMATE = "TILE_YPRIME_ANIMATE";
// var TILE_YPRIME_DO = "TILE_YPRIME_DO";

// var TILE_ZPRIME = "TILE_ZPRIME";
// var TILE_ZPRIME_ANIMATE = "TILE_ZPRIME_ANIMATE";
// var TILE_ZPRIME_DO = "TILE_ZPRIME_DO";

// var OBJ_TILE_XPRIME = [TILE_XPRIME,66,66,-1,-1];
// var OBJ_TILE_YPRIME = [TILE_YPRIME,66,66-1,-1];
// var OBJ_TILE_ZPRIME = [TILE_ZPRIME,66,66,-1,-1];

// var OBJ_TILE_XPRIME_PROP = {CODE:TILE_XPRIME};
// var OBJ_TILE_YPRIME_PROP = {CODE:TILE_YPRIME};
// var OBJ_TILE_ZPRIME_PROP = {CODE:TILE_ZPRIME};


// var TILE_XSWAPY = "TILE_XSWAPY";
// var TILE_XSWAPY_ANIMATE = "TILE_XSWAPY_ANIMATE";
// var TILE_XSWAPY_DO = "TILE_XSWAPY_DO";

// var TILE_YSWAPZ = "TILE_YSWAPZ";
// var TILE_YSWAPZ_ANIMATE = "TILE_YSWAPZ_ANIMATE";
// var TILE_YSWAPZ_DO = "TILE_YSWAPZ_DO";

// var OBJ_TILE_XSWAPY = [TILE_XSWAPY,66,66,-1,-1];
// var OBJ_TILE_YSWAPZ = [TILE_YSWAPZ,66,66-1,-1];

// var OBJ_TILE_XSWAPY_PROP = {CODE:TILE_XSWAPY};
// var OBJ_TILE_YSWAPZ_PROP = {CODE:TILE_YSWAPZ};

// var TILE_XCOLSWAPY = "TILE_XCOLSWAPY";
// var TILE_XCOLSWAPY_ANIMATE = "TILE_XCOLSWAPY_ANIMATE";
// var TILE_XCOLSWAPY_DO = "TILE_XCOLSWAPY_DO";

// var TILE_YCOLSWAPZ = "TILE_YCOLSWAPZ";
// var TILE_YCOLSWAPZ_ANIMATE = "TILE_YCOLSWAPZ_ANIMATE";
// var TILE_YCOLSWAPZ_DO = "TILE_YCOLSWAPZ_DO";

// var OBJ_TILE_XCOLSWAPY = [TILE_XCOLSWAPY,66,66,-1,-1];
// var OBJ_TILE_YCOLSWAPZ = [TILE_YCOLSWAPZ,66,66-1,-1];

// var OBJ_TILE_XCOLSWAPY_PROP = {CODE:TILE_XCOLSWAPY};
// var OBJ_TILE_YCOLSWAPZ_PROP = {CODE:TILE_YCOLSWAPZ};


// //---------------------
// var HELP_TILES_IN = "HELP_TILES_IN";
// var GROUP_TILES_SMALL = "GROUP_TILES_SMALL";

// var TILE_XY_SMALL = "TILE_XY_SMALL";
// var TILE_YX_SMALL = "TILE_YX_SMALL";
// var TILE_YZ_SMALL = "TILE_YZ_SMALL";
// var TILE_ZY_SMALL = "TILE_ZY_SMALL";

// var OBJ_TILE_XY_SMALL = [TILE_XY_SMALL,42,42,-1000,-1000];
// var OBJ_TILE_YX_SMALL = [TILE_YX_SMALL,42,42,-1000,-1000];
// var OBJ_TILE_YZ_SMALL = [TILE_YZ_SMALL,42,42,-1000,-1000];
// var OBJ_TILE_ZY_SMALL = [TILE_ZY_SMALL,42,42,-1000,-1000];

// var OBJ_TILE_XY_SMALL_PROP = {CODE:TILE_XY};
// var OBJ_TILE_YX_SMALL_PROP = {CODE:TILE_YX};
// var OBJ_TILE_YZ_SMALL_PROP = {CODE:TILE_YZ};
// var OBJ_TILE_ZY_SMALL_PROP = {CODE:TILE_ZY};

// var TILE_XPRIME_SMALL = "TILE_XPRIME_SMALL";
// var TILE_YPRIME_SMALL = "TILE_YPRIME_SMALL";
// var TILE_ZPRIME_SMALL = "TILE_ZPRIME_SMALL";

// // var OBJ_TILE_XPRIME_SMALL = [TILE_XPRIME_SMALL,33,33,-1000,-1000];
// var OBJ_TILE_XPRIME_SMALL = [TILE_XPRIME_SMALL,42,42,-1000,-1000];
// var OBJ_TILE_YPRIME_SMALL = [TILE_YPRIME_SMALL,42,42,-1000,-1000];
// var OBJ_TILE_ZPRIME_SMALL = [TILE_ZPRIME_SMALL,42,42,-1000,-1000];

// var OBJ_TILE_XPRIME_SMALL_PROP = {CODE:TILE_XPRIME};
// var OBJ_TILE_YPRIME_SMALL_PROP = {CODE:TILE_YPRIME};
// var OBJ_TILE_ZPRIME_SMALL_PROP = {CODE:TILE_ZPRIME};

// var TILE_XSWAPY_SMALL = "TILE_XSWAPY_SMALL";
// var TILE_YSWAPZ_SMALL = "TILE_YSWAPZ_SMALL";

// var OBJ_TILE_XSWAPY_SMALL = [TILE_XSWAPY_SMALL,42,42,-1000,-1000];
// var OBJ_TILE_YSWAPZ_SMALL = [TILE_YSWAPZ_SMALL,42,42,-1000,-1000];

// var OBJ_TILE_XSWAPY_SMALL_PROP = {CODE:TILE_XSWAPY};
// var OBJ_TILE_YSWAPZ_SMALL_PROP = {CODE:TILE_YSWAPZ};

// var TILE_XCOLSWAPY_SMALL = "TILE_XCOLSWAPY_SMALL";
// var TILE_YCOLSWAPZ_SMALL = "TILE_YCOLSWAPZ_SMALL";

// var OBJ_TILE_XCOLSWAPY_SMALL = [TILE_XCOLSWAPY_SMALL,42,42,-1000,-1000];
// var OBJ_TILE_YCOLSWAPZ_SMALL = [TILE_YCOLSWAPZ_SMALL,42,42,-1000,-1000];

// var OBJ_TILE_XCOLSWAPY_SMALL_PROP = {CODE:TILE_XCOLSWAPY};
// var OBJ_TILE_YCOLSWAPZ_SMALL_PROP = {CODE:TILE_YCOLSWAPZ};

// var OBJ_HISTORY1_PROP = {};
// var OBJ_HISTORY2_PROP = {};

// var H1BASE = 200;
// var H2BASE = 660;
// var HISTORY1_X = [H1BASE,H1BASE+43,H1BASE+43*2,H1BASE+43*3,H1BASE+43*4,H1BASE+43*5];
// var HISTORY2_X = [H2BASE,H2BASE+43,H2BASE+43*2,H2BASE+43*3,H2BASE+43*4,H2BASE+43*5];
// // HISTORY2_X = [430,470,510,550,590,630];
// var HISTORY1_Y = 544;
// var HISTORY2_Y = 544;

// var SBX = 25;
// var SBX2 = 0;

// var SOCKET_HELP_POS_X = [SBX,SBX+18,SBX+88,SBX+158,SBX+228,SBX+246];
// var SOCKET_HELP_2_POS_X = [SBX2,SBX2+18,SBX2+88,SBX2+158,SBX2+228,SBX2+246];
// var SOCKET_HELP_POS_Y = 173;
// var SOCKET_HELP_2_POS_Y = 130;
// var SOCKET_HELP_OFFSET = 43;


// var GROUP_CODE_TILES = "GROUP_CODE_TILES";
// var TILE_NULL = "NULL";

// var SUCCESSFUL = "SUCCESSFUL";
// var UNSUCCESSFUL = "UNSUCCESSFUL";


// // //Effx
// // var BURST = "BURST";
// // var EXPLODE = "EXPLODE";
// // var SPARKLE = "SPARKLE";
// var BIGSPARKLE = "BIGSPARKLE";
// var BIGSPARKLE2 = "BIGSPARKLE2";
// // var ULTRASPARKLE = "ULTRASPARKLE";
// // var BRICKDIE = "BRICKDIE";
// // var BIGBRICKDIE = "BIGBRICKDIE";
// // var CLICK = "CLICK";
// // var SPEEDUP = "SPEEDUP";
// // var HITBOSS = "HITBOSS";
// // var MONSTERDIE = "MONSTERDIE";

// // //UI
// // var LIVES = "LIVES";
// // var LIVES_BOSS = "LIVES_BOSS";

// // var SND_BTN_PLAY = "SND_BTN_PLAY";
// // var SND_START_GAME = "SND_START_GAME";
// // var SND_IMPACT = "SND_IMPACT";
// // var SND_IMPACT2 = "SND_IMPACT2";
// // var SND_BRICKBREAK = "SND_BRICKBREAK";
// // var SND_ERROR = "SND_ERROR";
// // var SND_SHOCK = "SND_SHOCK";
// // var SND_EXPLODE = "SND_EXPLODE";
// // var SND_SHOOT = "SND_SHOOT";
// // var SND_HIT = "SND_HIT";
// // var SND_MONSTERDIE = "SND_MONSTERDIE";
// // var SND_BOSSGRUNT = "SND_BOSSGRUNT";
// // var SND_NOEFFX = "SND_NOEFFX";
// // var SND_BALLDROP = "SND_BALLDROP";
// var SND_WIN = "SND_WIN";
// var SND_BAD = "SND_BAD";
// var SND_BAM = "SND_BAM";
// // var SND_CONGRATS = "SND_CONGRATS";
// var SND_LOSE = "SND_LOSE";
// var SND_CLICK = "SND_CLICK";
// var SND_RUN = "SND_RUN";
// var SND_CANCEL = "SND_CANCEL";
// var SND_SELECT = "SND_SELECT";
// var SND_SELECT2 = "SND_SELECT2";
// // var SND_ROAR = "SND_ROAR";
// // var SND_GLITTER = "SND_GLITTER";


// var IMAGES_ASSETS = {
// 	BACKGROUND_HOME : "img/background_home.png",
// 	BACKGROUND_GAME : "img/background_game.png",
// 	BACKGROUND_WIN : "img/background_win.png",
// 	BACKGROUND_LOSE : "img/background_lose.png",
// 	BACKGROUND_TUTORIAL : "img/background_tutorial.png",

// 	CANCEL : "img/cancel.png",
// 	// BTN_EXECUTE : "img/runcode.png",
// 	BTN_EXECUTE : "img/btn_run.png",
// 	// BTN_RETRY : "img/retry.png",
// 	BTN_RETRY : "img/btn_retry.png",
// 	BTN_NEXT : "img/btn_next.png",
// 	BTN_START : "img/btn_start.png",
// 	BTN_BACK : "img/btn_back.png",
// 	BTN_GAMEBACK : "img/btn_gameback.png",
	
// 	SELECTOR : "img/selector.png",
// 	POINTER: "img/pointer.png",
// 	CODEHELP: "img/codehelp.png",

// 	SOCKET : "img/socket.png",
// 	BLOCK_RED : "img/block_red.png",
// 	BLOCK_GREEN : "img/block_green.png",
// 	BLOCK_BLUE : "img/block_blue.png",
// 	BLOCKGUIDE : "img/blockguide.png",

// 	TILE_XY : "img/tiles_xy.png",
// 	TILE_XY_SMALL : "img/tiles_xy_small.png",
// 	TILE_YX : "img/tiles_yx.png",
// 	TILE_YX_SMALL : "img/tiles_yx_small.png",
// 	TILE_YZ : "img/tiles_yz.png",
// 	TILE_YZ_SMALL : "img/tiles_yz_small.png",
// 	TILE_ZY : "img/tiles_zy.png",
// 	TILE_ZY_SMALL : "img/tiles_zy_small.png",

// 	TILE_XPRIME : "img/tiles_xprime.png",
// 	TILE_XPRIME_SMALL : "img/tiles_xprime_small.png",
// 	TILE_YPRIME : "img/tiles_yprime.png",
// 	TILE_YPRIME_SMALL : "img/tiles_yprime_small.png",
// 	TILE_ZPRIME : "img/tiles_zprime.png",
// 	TILE_ZPRIME_SMALL : "img/tiles_zprime_small.png",
	
// 	TILE_XSWAPY : "img/tiles_xswapy.png",
// 	TILE_XSWAPY_SMALL : "img/tiles_xswapy_small.png",
// 	TILE_YSWAPZ : "img/tiles_yswapz.png",
// 	TILE_YSWAPZ_SMALL : "img/tiles_yswapz_small.png",
	
// 	TILE_XCOLSWAPY : "img/tiles_xcolswapy.png",
// 	TILE_XCOLSWAPY_SMALL : "img/tiles_xcolswapy_small.png",
// 	TILE_YCOLSWAPZ : "img/tiles_ycolswapz.png",
// 	TILE_YCOLSWAPZ_SMALL : "img/tiles_ycolswapz_small.png",

// 	BIGSPARKLE : "img/bigsparkle.png",
// 	BIGSPARKLE2 : "img/bigsparkle2.png",
	
// }

// var SOUNDS_ASSETS = {
// // 	SND_BTN_PLAY : "snd/click_button.wav",
// // 	SND_IMPACT : "snd/impact.mp3",
// // 	SND_IMPACT2 : "snd/impact2.mp3",
// // 	SND_BRICKBREAK : "snd/brickbreak.mp3",
// // 	SND_ERROR : "snd/error.mp3",
// // 	SND_SHOCK : "snd/shock.mp3",

// // 	SND_EXPLODE : "snd/explode.wav",
// // 	SND_SHOOT : "snd/shoot.mp3",
// // 	SND_START_GAME : "snd/start_game.mp3",
// // 	SND_HIT : "snd/hit.wav",
// // 	SND_MONSTERDIE : "snd/monsterdie.wav",
// // 	SND_BOSSGRUNT : "snd/bossgrunt.wav",
// // 	SND_NOEFFX : "snd/noeffx.mp3",
// // 	SND_BALLDROP : "snd/balldrop.mp3",
// 	SND_WIN : "snd/win.mp3",
// 	SND_BAD : "snd/bad.mp3",
// 	SND_BAM : "snd/bam.mp3",
// // 	SND_CONGRATS : "snd/congrats.mp3",
// 	SND_LOSE : "snd/lose.mp3",
// 	SND_CLICK : "snd/click.wav",
// 	SND_RUN : "snd/run.wav",
// 	SND_CANCEL : "snd/cancel.wav",
// 	SND_SELECT : "snd/select.wav",
// 	SND_SELECT2 : "snd/select2.wav",
// // 	SND_ROAR : "snd/roar.mp3",
// // 	SND_GLITTER : "snd/glitter.mp3"
// }
	
// // //-----------------
// // //GAME CONSTANTS
// // //-----------------
// // var DEGREE_20 = 0.3491;
// // var DEGREE_25 = 0.4363;
// // var DEGREE_30 = 0.5236;
// // var DEGREE_35 = 0.6109;
// // var DEGREE_40 = 0.6981;
// // var DEGREE_45 = 0.7854;
// // var DEGREE_50 = 0.8727;
// // var DEGREE_55 = 0.9600;
// // var DEGREE_60 = 1.0472;
// // var DEGREE_65 = 1.1345;
// // var DEGREE_70 = 1.2217;
// // var DEGREE_75 = 1.309;
// // var DEGREE_80 = 1.3963;

// // var BRICK_STARTX = 78;
// // var BRICK_STARTY = 40;
// // var BRICKOFFSET_X = 50;
// // var BRICKOFFSET_Y = 30;

// // var GETREADY_X = 525;
// // var GETREADY_Y = 630;
// // var CONGRATS_X = 535;
// // var CONGRATS_Y = 630;
// // var NEXTSTAGEDELAY = 66;
// // var CONGRATSDELAY = 66;

// // var BALL_SPEEDUP = 20;
// // var ZAPPED_SPEED = 0;

// // var STARTINGLIFE = 4;

// // var BIGMISSILEFIREDURATION = 200;

// // var SCORE_X = 950;
// // var SCORE_Y = 115;
// // var STAGE_X = 890;
// // var STAGE_Y = 450;
// // var ENEMY_X = 888;
// // var ENEMY_Y = 630;
// // var RESULTS_SCORE_X = 500;
// // var RESULTS_SCORE_Y = 350;

// // var STARTSTAGE = 0;

// // //BACKGROUND
// var OBJ_BACKGROUND_HOME = [BACKGROUND_HOME, 1000, 600, 0, 0];
// var OBJ_BACKGROUND_GAME = [BACKGROUND_GAME, 1000, 600, 0, 0];
// var OBJ_BACKGROUND_WIN = [BACKGROUND_WIN, 1000, 600, 0, 0];
// var OBJ_BACKGROUND_LOSE = [BACKGROUND_LOSE, 1000, 600, 0, 0];
// var OBJ_BACKGROUND_TUTORIAL = [BACKGROUND_TUTORIAL, 1000, 600, 0, 0];


// var MAXBLOCKS = 7;
// var CURR_STAGE = "CURR_STAGE";
// var MAX_STAGES = 8;

// var R = "R";
// var G = "G";
// var B = "B";
// var O = "O";

// var STAGE_1 = [
// 	[R,G,B,O,O],
// 	[O,O,O,O,O],
// 	[O,O,O,O,O],
// 	[BLOCK_ANY, BLOCK_ANY, BLOCK_ANY]
// ];
// //XY, YZ, XY

// var STAGE_2 = [
// 	[O,O,O,O,O],
// 	[O,O,O,O,O],
// 	[R,G,B,O,O],
// 	[BLOCK_ANY, BLOCK_ANY, BLOCK_ANY]
// ];
// //ZY, YX, ZY

// var STAGE_3 = [
// 	[B,O,O,O,O],
// 	[G,G,R,O,O],
// 	[B,G,O,O,O],
// 	[BLOCK_RED, BLOCK_ANY, BLOCK_ANY]
// ];
// //X-Y,Y-Z 

// var STAGE_4 = [
// 	[R,O,O,O,O],
// 	[R,B,G,G,G],
// 	[B,O,O,O,O],
// 	[BLOCK_RED, BLOCK_GREEN, BLOCK_BLUE]
// ];
// //Y', YX, YZ

// var STAGE_5 = [
// 	[B,B,R,O,O],
// 	[R,B,O,O,O],
// 	[G,G,O,O,O],
// 	[BLOCK_RED, BLOCK_GREEN, BLOCK_BLUE]
// ];
// //X-Y, X|Y, Y|Z

// var STAGE_6 = [
// 	[R,B,R,O,O],
// 	[G,B,B,O,O],
// 	[G,O,O,O,O],
// 	[BLOCK_RED, BLOCK_GREEN, BLOCK_BLUE]
// ];
// //XY, X-Y, Y', YZ, Y|Z

// var STAGE_7 = [
// 	[G,B,O,O,O],
// 	[R,B,G,O,O],
// 	[R,G,O,O,O],
// 	[BLOCK_RED, BLOCK_GREEN, BLOCK_BLUE]
// ];
// //X-Y, Y', Y-Z, YX, Y|Z, X|Y

// var STAGE_8 = [
// 	[R,G,B,O,O],
// 	[G,R,R,O,O],
// 	[R,O,O,O,O],
// 	[BLOCK_RED, BLOCK_GREEN, BLOCK_BLUE]
// ];
// //ZY, X|Y, YZ, X', Y', X-Y

// // var STAGES = [
// // 	STAGE_1,
// // 	STAGE_2,
// // 	STAGE_3,
// // 	STAGE_4,
// // 	STAGE_5,
// // 	STAGE_6,
// // 	STAGE_7,
// // 	STAGE_8
// // ]
// var STAGES = [
// 	STAGE_1,
// 	STAGE_2,
// 	STAGE_3,
// 	STAGE_4,
// 	STAGE_5,
// 	STAGE_6,
// 	STAGE_7,
// 	STAGE_8
// ]






// var STAGE_X = [
// 	[B,R,O,O,O],
// 	[G,G,G,O,O],
// 	[B,G,O,O,O]
// ];

// var STAGE_Y = [
// 	[G,B,O,O,O],
// 	[B,B,O,O,O],
// 	[R,G,R,O,O]
// ];

// var STAGE_Z = [
// 	[G,R,O,O,O],
// 	[R,G,O,O,O],
// 	[R,B,G,O,O]
// ]
// //soln: X<->Y, X|Y, Z->Y, Z', Z->Y, Y->X

// var STAGE_ZP = [
// 	[R,G,O,O,O],
// 	[G,R,O,O,O],
// 	[G,B,R,O,O]
// ]

// var STAGE_Z2 = [
// 	[B,G,O,O,O],
// 	[R,B,B,O,O],
// 	[G,G,O,O,O]
// ]
// //soln: XY,YZ,YX,YX,X-Y,Y-Z

// var STAGE_Z3 = [
// 	[B,O,O,O,O],
// 	[G,B,G,R,O],
// 	[G,B,O,O,O]
// ]
// //soln: need to be able to go from Y to under X or Z
// //Better soln: need swap.
// //X<->Y, Y->Z, Y->Z, Y<->Z, Z', Z->Y

// var STAGE_Z4 = [
// 	[G,R,B,O,O],
// 	[R,G,G,O,O],
// 	[G,O,O,O,O]
// ];
// //soln: Z-Y, X-Y, Y->Z, Y', X', X<->Y

// var STAGE_Z5 = [
// 	[B,B,O,O,O],
// 	[B,G,O,O,O],
// 	[R,R,G,O,O]
// ];
// //soln: Z-Y, Y', Y->X, X|Y, Y|Z, X|Y

// var STAGE_Z6 = [
// 	[O,O,O,O,O],
// 	[B,G,B,R,O],
// 	[G,R,G,O,O]
// ];
// //soln: Y->X, Z->Y, Y<->Z, Y->X, Y->Z, Y<->Z

// var STAGE_TEST = [
// 	[O,O,O,O,O],
// 	[G,B,G,R,O],
// 	[G,B,O,O,O]
// ]

// var STAGE_TEST2 = [
// 	[G,B,G,R,O],
// 	[O,O,O,O,O],
// 	[G,B,O,O,O]
// ]

// var STAGE_BLANK = [
// 	[O,O,O,O,O],
// 	[O,O,O,O,O],
// 	[O,O,O,O,O]
// ];


// // //EFFECTS
// var EFFX_DELAY = 2;
// var OBJ_BIGSPARKLE = [BIGSPARKLE, 40, 40, 4];
// var OBJ_BIGSPARKLE2 = [BIGSPARKLE2, 60, 60, 5];

// // TIPS
// var TIPS = 
// [
// 	"ProTip: Hold down the Shift key when selecting a Code Tile to continue with the next socket.",
// 	"ProTip: The Codes run from left to right. Always!",
// 	"ProTip: You cannot stack more than 5 blocks onto the same column.",
// 	"ProTip: You have 3 attempts to solve the puzzle. Make good use of them!",
// 	"ProTip: You can leave empty spaces in the Codes. It does not affect the overall execution.",
// 	"ProTip: Hover your mouse over the Code and click on the X to remove it."
// ]

// //############# END OF TOWERCUBE #################