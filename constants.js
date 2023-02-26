
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
	base_m_004 : "img/base_m_004.png",
	base_f_001 : "img/base_f_001.png",
	base_f_002 : "img/base_f_002.png",
	base_f_003 : "img/base_f_003.png",
	base_f_004 : "img/base_f_004.png",

	//head
	head_001_tophat : "img/head_001_tophat.png",
	head_002_roundhat_black : "img/head_002_roundhat_black.png",
	head_002_roundhat_blue : "img/head_002_roundhat_blue.png",
	head_002_roundhat_gold : "img/head_002_roundhat_gold.png",
	head_002_roundhat_green : "img/head_002_roundhat_green.png",
	head_002_roundhat_red : "img/head_002_roundhat_red.png",
	head_002_roundhat_orange : "img/head_002_roundhat_orange.png",
	head_002_roundhat_pink : "img/head_002_roundhat_pink.png",
	head_002_roundhat_purple : "img/head_002_roundhat_purple.png",


	head_003_casualcap_black : "img/head_003_casualcap_black.png",
	head_003_casualcap_blue : "img/head_003_casualcap_blue.png",
	head_003_casualcap_green : "img/head_003_casualcap_green.png",
	head_003_casualcap_red : "img/head_003_casualcap_red.png",
	head_003_casualcap_orange : "img/head_003_casualcap_orange.png",
	head_003_casualcap_pink : "img/head_003_casualcap_pink.png",
	head_003_casualcap_purple : "img/head_003_casualcap_purple.png",

	head_004_piratehat : "img/head_004_piratehat.png",
	head_005_xmas : "img/head_005_xmas.png",
	head_006_batman : "img/head_006_batman.png",
	
	head_007_cap_blue : "img/head_007_cap_blue.png",
	head_007_cap_green : "img/head_007_cap_green.png",
	head_007_cap_grey : "img/head_007_cap_grey.png",
	head_007_cap_red : "img/head_007_cap_red.png",
	head_007_cap_orange : "img/head_007_cap_orange.png",
	head_007_cap_pink : "img/head_007_cap_pink.png",
	head_007_cap_purple : "img/head_007_cap_purple.png",

	head_008_police : "img/head_008_police.png",
	head_009_viking : "img/head_009_viking.png",
	head_010_halo : "img/head_010_halo.png",
	head_011_centurion : "img/head_011_centurion.png",

	head_012_mccarthy : "img/head_012_mccarthy.png",
	head_013_prisoner : "img/head_013_prisoner.png",

	//----------

	//hair
	hair_001_short : "img/hair_001_short.png",
	hair_001_short_grey : "img/hair_001_short_grey.png",
	hair_002_crewcut : "img/hair_002_crewcut.png",
	hair_002_crewcut_grey : "img/hair_002_crewcut_grey.png",
	hair_003_f4_grey : "img/hair_003_f4_grey.png",
	hair_003_f4 : "img/hair_003_f4.png",
	hair_004_side : "img/hair_004_side.png",
	hair_004_side_grey : "img/hair_004_side_grey.png",
	hair_005_tall : "img/hair_005_tall.png",
	hair_005_tall_grey : "img/hair_005_tall_grey.png",
	hair_006_puffy : "img/hair_006_puffy.png",
	hair_007_centre : "img/hair_007_centre.png",
	hair_007_centre_grey : "img/hair_007_centre_grey.png",
	hair_008_straight : "img/hair_008_straight.png",
	hair_009_balding : "img/hair_009_balding.png",
	hair_009_balding_grey : "img/hair_009_balding_grey.png",
	hair_010_punk : "img/hair_010_punk.png",
	hair_011_wrap : "img/hair_011_wrap.png",
	hair_011_wrap_grey : "img/hair_011_wrap_grey.png",
	hair_012_pony : "img/hair_012_pony.png",
	hair_012_pony_grey : "img/hair_012_pony_grey.png",
	hair_013_long : "img/hair_013_long.png",
	hair_013_long_grey : "img/hair_013_long_grey.png",
	hair_014_longstraight : "img/hair_014_longstraight.png",
	hair_015_hairband : "img/hair_015_hairband.png",
	hair_015_hairband_blue : "img/hair_015_hairband_blue.png",
	hair_015_hairband_green : "img/hair_015_hairband_green.png",
	hair_015_hairband_orange : "img/hair_015_hairband_orange.png",
	hair_015_hairband_red : "img/hair_015_hairband_red.png",
	hair_015_superman : "img/hair_015_superman.png",
	hair_016_shortcool : "img/hair_016_shortcool.png",
	hair_017_curls : "img/hair_017_curls.png",
	
	hair_018_mccarthy : "img/hair_018_mccarthy.png",
	hair_019_sidebald : "img/hair_019_sidebald.png",
	hair_019_sidebald_grey : "img/hair_019_sidebald_grey.png",
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
	eye_007_minion : "img/eye_007_minion.png",
	//----------

	//neck
	neck_001_scarf_black : "img/neck_001_scarf_black.png",
	neck_001_scarf_blue : "img/neck_001_scarf_blue.png",
	neck_001_scarf_green : "img/neck_001_scarf_green.png",
	neck_001_scarf_red : "img/neck_001_scarf_red.png",
	neck_001_scarf_orange : "img/neck_001_scarf_orange.png",
	neck_001_scarf_pink : "img/neck_001_scarf_pink.png",
	neck_001_scarf_purple : "img/neck_001_scarf_purple.png",

	neck_002_medal : "img/neck_002_medal.png",
	neck_003_cape_black : "img/neck_003_cape_black.png",
	neck_003_cape_red : "img/neck_003_cape_red.png",
	neck_003_cape_blue : "img/neck_003_cape_blue.png",
	neck_003_cape_green : "img/neck_003_cape_green.png",
	neck_003_cape_orange : "img/neck_003_cape_orange.png",
	neck_003_cape_pink : "img/neck_003_cape_pink.png",
	neck_003_cape_purple : "img/neck_003_cape_purple.png",

	neck_004_necklace : "img/neck_004_necklace.png",
	neck_005_pendant_green : "img/neck_005_pendant_green.png",
	neck_005_pendant_red : "img/neck_005_pendant_red.png",
	neck_005_pendant_blue : "img/neck_005_pendant_blue.png",
	neck_005_pendant_orange : "img/neck_005_pendant_orange.png",
	neck_005_pendant_pink : "img/neck_005_pendant_pink.png",
	neck_005_pendant_purple : "img/neck_005_pendant_purple.png",
	//----------

	//body
	body_001_tshirt_black : "img/body_001_tshirt_black.png",
	body_001_tshirt_blue : "img/body_001_tshirt_blue.png",
	body_001_tshirt_green : "img/body_001_tshirt_green.png",
	body_001_tshirt_red : "img/body_001_tshirt_red.png",
	body_001_tshirt_grey : "img/body_001_tshirt_grey.png",
	body_001_tshirt_orange : "img/body_001_tshirt_orange.png",
	body_001_tshirt_pink : "img/body_001_tshirt_pink.png",
	body_001_tshirt_purple : "img/body_001_tshirt_purple.png",

	body_002_singlet_blue : "img/body_002_singlet_blue.png",
	body_002_singlet_green : "img/body_002_singlet_green.png",
	body_002_singlet_grey : "img/body_002_singlet_grey.png",
	body_002_singlet_red : "img/body_002_singlet_red.png",
	body_002_singlet_black : "img/body_002_singlet_black.png",
	body_002_singlet_orange : "img/body_002_singlet_orange.png",
	body_002_singlet_pink : "img/body_002_singlet_pink.png",
	body_002_singlet_purple : "img/body_002_singlet_purple.png",

	body_003_suit_black : "img/body_003_suit_black.png",
	body_003_suit_blue : "img/body_003_suit_blue.png",
	body_003_suit_green : "img/body_003_suit_green.png",
	body_003_suit_red : "img/body_003_suit_red.png",
	
	body_004_dress_black : "img/body_004_dress_black.png",
	body_004_dress_blue : "img/body_004_dress_blue.png",
	body_004_dress_green : "img/body_004_dress_green.png",
	body_004_dress_red : "img/body_004_dress_red.png",
	body_004_dress_orange : "img/body_004_dress_orange.png",
	body_004_dress_pink : "img/body_004_dress_pink.png",
	body_004_dress_purple : "img/body_004_dress_purple.png",
	
	body_005_jacket_black : "img/body_005_jacket_black.png",
	body_005_jacket_blue : "img/body_005_jacket_blue.png",
	body_005_jacket_green : "img/body_005_jacket_green.png",
	body_005_jacket_red : "img/body_005_jacket_red.png",
	body_005_jacket_orange : "img/body_005_jacket_orange.png",
	body_005_jacket_pink : "img/body_005_jacket_pink.png",
	body_005_jacket_purple : "img/body_005_jacket_purple.png",
	
	
	body_006_santa : "img/body_006_santa.png",
	body_007_superman : "img/body_007_superman.png",
	body_008_batman : "img/body_008_batman.png",
	body_009_labcoat : "img/body_009_labcoat.png",

	body_010_mccarthy : "img/body_010_mccarthy.png",
	body_011_council : "img/body_011_council.png",
	body_012_prisoner : "img/body_012_prisoner.png",
	body_014_vampire : "img/body_014_vampire.png",
	body_015_longdress_black : "img/body_015_longdress_black.png",
	body_015_longdress_blue : "img/body_015_longdress_blue.png",
	body_015_longdress_green : "img/body_015_longdress_green.png",
	body_015_longdress_orange : "img/body_015_longdress_orange.png",
	body_015_longdress_pink : "img/body_015_longdress_pink.png",
	body_015_longdress_purple : "img/body_015_longdress_purple.png",
	body_015_longdress_red : "img/body_015_longdress_red.png",
	body_016_gymtop_black : "img/body_016_gymtop_black.png",
	body_016_gymtop_blue : "img/body_016_gymtop_blue.png",
	body_016_gymtop_green : "img/body_016_gymtop_green.png",
	body_016_gymtop_orange : "img/body_016_gymtop_orange.png",
	body_016_gymtop_pink : "img/body_016_gymtop_pink.png",
	body_016_gymtop_purple : "img/body_016_gymtop_purple.png",
	body_016_gymtop_red : "img/body_016_gymtop_red.png",
	body_017_minion : "img/body_017_minion.png",



	//----------
	
	//leg
	leg_001_shorts_black : "img/leg_001_shorts_black.png",
	leg_001_shorts_blue : "img/leg_001_shorts_blue.png",
	leg_001_shorts_green : "img/leg_001_shorts_green.png",
	leg_001_shorts_red : "img/leg_001_shorts_red.png",
	leg_001_shorts_orange : "img/leg_001_shorts_orange.png",
	leg_001_shorts_pink : "img/leg_001_shorts_pink.png",
	leg_001_shorts_purple : "img/leg_001_shorts_purple.png",

	leg_002_pants_black : "img/leg_002_pants_black.png",
	leg_002_pants_blue : "img/leg_002_pants_blue.png",
	leg_002_pants_green : "img/leg_002_pants_green.png",
	leg_002_pants_red : "img/leg_002_pants_red.png",
	leg_002_pants_orange : "img/leg_002_pants_orange.png",
	leg_002_pants_pink : "img/leg_002_pants_pink.png",
	leg_002_pants_purple : "img/leg_002_pants_purple.png",

	leg_003_trackpants_black : "img/leg_003_trackpants_black.png",
	leg_003_trackpants_blue : "img/leg_003_trackpants_blue.png",
	leg_003_trackpants_green : "img/leg_003_trackpants_green.png",
	leg_003_trackpants_red : "img/leg_003_trackpants_red.png",

	leg_004_santa : "img/leg_004_santa.png",
	leg_005_superman : "img/leg_005_superman.png",
	leg_006_batman : "img/leg_006_batman.png",
	
	leg_007_mccarthy : "img/leg_007_mccarthy.png",
	leg_008_council : "img/leg_008_council.png",
	leg_009_prisoner : "img/leg_009_prisoner.png",
	leg_010_jeans_black : "img/leg_010_jeans_black.png",
	leg_010_jeans_blue : "img/leg_010_jeans_blue.png",
	leg_010_jeans_white : "img/leg_010_jeans_white.png",
	leg_011_stripedpants_blue : "img/leg_011_stripedpants_blue.png",
	leg_011_stripedpants_green : "img/leg_011_stripedpants_green.png",
	leg_011_stripedpants_orange : "img/leg_011_stripedpants_orange.png",
	leg_011_stripedpants_pink : "img/leg_011_stripedpants_pink.png",
	leg_011_stripedpants_purple : "img/leg_011_stripedpants_purple.png",
	leg_011_stripedpants_red : "img/leg_011_stripedpants_red.png",
	leg_012_skirt_blue : "img/leg_012_skirt_blue.png",
	leg_012_skirt_green : "img/leg_012_skirt_green.png",
	leg_012_skirt_grey : "img/leg_012_skirt_grey.png",
	leg_012_skirt_orange : "img/leg_012_skirt_orange.png",
	leg_012_skirt_pink : "img/leg_012_skirt_pink.png",
	leg_012_skirt_purple : "img/leg_012_skirt_purple.png",
	leg_012_skirt_red : "img/leg_012_skirt_red.png",
	leg_013_longskirt_blue : "img/leg_013_longskirt_blue.png",
	leg_013_longskirt_green : "img/leg_013_longskirt_green.png",
	leg_013_longskirt_grey : "img/leg_013_longskirt_grey.png",
	leg_013_longskirt_orange : "img/leg_013_longskirt_orange.png",
	leg_013_longskirt_pink : "img/leg_013_longskirt_pink.png",
	leg_013_longskirt_purple : "img/leg_013_longskirt_purple.png",
	leg_013_longskirt_red : "img/leg_013_longskirt_red.png",

	//----------

	//feet
	feet_001_shoes_black : "img/feet_001_shoes_black.png",
	feet_001_shoes_blue : "img/feet_001_shoes_blue.png",
	feet_001_shoes_green : "img/feet_001_shoes_green.png",
	feet_001_shoes_red : "img/feet_001_shoes_red.png",
	feet_001_shoes_grey : "img/feet_001_shoes_grey.png",
	feet_001_shoes_orange : "img/feet_001_shoes_orange.png",
	feet_001_shoes_pink : "img/feet_001_shoes_pink.png",
	feet_001_shoes_purple : "img/feet_001_shoes_purple.png",

	feet_002_largeshoes_black : "img/feet_002_largeshoes_black.png",
	feet_002_largeshoes_blue : "img/feet_002_largeshoes_blue.png",
	feet_002_largeshoes_green : "img/feet_002_largeshoes_green.png",
	feet_002_largeshoes_grey : "img/feet_002_largeshoes_grey.png",
	feet_002_largeshoes_orange : "img/feet_002_largeshoes_orange.png",
	feet_002_largeshoes_pink : "img/feet_002_largeshoes_pink.png",
	feet_002_largeshoes_purple : "img/feet_002_largeshoes_purple.png",
	feet_002_largeshoes_red : "img/feet_002_largeshoes_red.png",

	feet_003_mccarthy : "img/feet_003_mccarthy.png",
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

	addon_005_bigearring_black : "img/addon_005_bigearring_black.png",
	addon_005_bigearring_blue : "img/addon_005_bigearring_blue.png",
	addon_005_bigearring_green : "img/addon_005_bigearring_green.png",
	addon_005_bigearring_orange : "img/addon_005_bigearring_orange.png",
	addon_005_bigearring_pink : "img/addon_005_bigearring_pink.png",
	addon_005_bigearring_purple : "img/addon_005_bigearring_purple.png",
	addon_005_bigearring_red : "img/addon_005_bigearring_red.png",

	addon_006_exclaim : "img/addon_006_exclaim.png",
	addon_007_question : "img/addon_007_question.png",
	addon_008_vampireteeth : "img/addon_008_vampireteeth.png",
	addon_009_eyeglow_blue : "img/addon_009_eyeglow_blue.png",
	addon_009_eyeglow_green : "img/addon_009_eyeglow_green.png",
	addon_009_eyeglow_red : "img/addon_009_eyeglow_red.png",
	addon_010_handcuffs : "img/addon_010_handcuffs.png",
	addon_011_prisonball : "img/addon_011_prisonball.png",
	addon_012_eyebrows_grey : "img/addon_012_eyebrows_grey.png",
	addon_013_slingbag_black : "img/addon_013_slingbag_black.png",
	addon_013_slingbag_blue : "img/addon_013_slingbag_blue.png",
	addon_013_slingbag_green : "img/addon_013_slingbag_green.png",
	addon_013_slingbag_orange : "img/addon_013_slingbag_orange.png",
	addon_013_slingbag_pink : "img/addon_013_slingbag_pink.png",
	addon_013_slingbag_purple : "img/addon_013_slingbag_purple.png",
	addon_013_slingbag_red : "img/addon_013_slingbag_red.png",
	//----------

}