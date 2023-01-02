
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
	head_005_xmas : "img/head_005_xmas.png",
	head_006_batman : "img/head_006_batman.png",
	//----------

	//hair
	hair_001_short : "img/hair_001_short.png",
	hair_002_crewcut : "img/hair_002_crewcut.png",
	hair_003_f4_grey : "img/hair_003_f4_grey.png",
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
	hair_015_superman : "img/hair_015_superman.png",
	hair_016_shortcool : "img/hair_016_shortcool.png",
	hair_017_curls : "img/hair_017_curls.png",
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
	neck_003_cape_black : "img/neck_003_cape_black.png",
	neck_003_cape_red : "img/neck_003_cape_red.png",
	neck_003_cape_blue : "img/neck_003_cape_blue.png",

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
	
	body_006_santa : "img/body_006_santa.png",
	body_007_superman : "img/body_007_superman.png",
	body_008_batman : "img/body_008_batman.png",
	body_009_labcoat : "img/body_009_labcoat.png",
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
	leg_004_santa : "img/leg_004_santa.png",
	leg_005_superman : "img/leg_005_superman.png",
	leg_006_batman : "img/leg_006_batman.png",

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
	pet_003_reindeer : "img/pet_003_reindeer.png",
	pet_004_egg : "img/pet_004_egg.png",
	pet_004_egg_cracked : "img/pet_004_egg_cracked.png",
	pet_004_egg_panda : "img/pet_004_egg_panda.png",
	pet_004_egg_python : "img/pet_004_egg_python.png",
	pet_005_dog : "img/pet_005_dog.png",
	pet_005_dog_black : "img/pet_005_dog_black.png",
	pet_006_cat : "img/pet_006_cat.png",
	pet_006_cat_black : "img/pet_006_cat_black.png",
	pet_007_hamster : "img/pet_007_hamster.png",
	pet_007_hamster_black : "img/pet_007_hamster_black.png",
	pet_008_parrot : "img/pet_008_parrot.png",
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