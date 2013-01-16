/*
 * Please add the below code when ever we are replacing script files with latest file set sent by foresee team
 * as the static content will be residing on separate image server.
 * 
var foreseeAssetsPath='/wcsstore/TargetSAS/';

if(typeof(Target) != 'undefined'&& typeof(Target.globals.foreseeAssetsPath) != 'undefined') {

	foreseeAssetsPath=Target.globals.foreseeAssetsPath!=null? Target.globals.foreseeAssetsPath: foreseeAssetsPath;

}
 */
var foreseeAssetsPath='/wcsstore/TargetSAS/';

if(typeof(Target) != 'undefined'&& typeof(Target.globals.foreseeAssetsPath) != 'undefined') {

	foreseeAssetsPath=Target.globals.foreseeAssetsPath!=null? Target.globals.foreseeAssetsPath: foreseeAssetsPath;

}

var $$FSR = {
    'timestamp': 'August 13, 2012 @ 7:53 AM',
    'version': '15.0.0',
    'enabled': true,
    'sessionreplay': false,
    'auto': true,
    'encode': false,
    'files': foreseeAssetsPath+'javascript/foresee/',
    // needs to be set when foresee-transport.swf is not located at 'files'
    //'swf_files': '__swf_files_'
    'id': 'ANNAV9t8VpAFphAdwwd5dA==',
    'definition': 'foresee-surveydef.js',
    'embedded': true,
    'replay_id': 'target.com',
    'renderer': 'W3C', // or "ASRECORDED"
    'layout': 'CENTERFIXED', // or "LEFTFIXED" or "LEFTSTRETCH" or "CENTERSTRETCH"
    'pools': [{
        path: '.',
        sp: 100 // CHANGE ONLY WHEN INCLUDING SESSION REPLAY
    }],
    'sites': [{
        name: 'everest',
        path: /\w+-?\w+\.(com|org|edu|gov|net|co\.uk)/
    }, {
        name: 'everest',
        path: '.',
        domain: 'default'
    }],
    storageOption: 'cookie'
};