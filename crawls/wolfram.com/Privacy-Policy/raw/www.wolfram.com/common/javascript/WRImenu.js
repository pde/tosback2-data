$(document).ready(function(){
    
var hoverIntentConfig = {    
    sensitivity: 1,  
    interval: 0,  
    over: hoverOn, 
    timeout: 0,  
    out: hideMenu
};

//in case we ever want to make submenus easier to get to
var hoverIntentConfig2 = {    
    sensitivity: 1,  
    interval: 0,  
    over: hoverOn, 
    timeout: 0,  
    out: hideMenu
};

$('.WRImenuWrap').hoverIntent(hoverIntentConfig);
$('.WRImenuWrap .WRImenuWrap').hoverIntent(hoverIntentConfig2);

function hoverOn(){
    if($(this).hasClass('WRIdropMenu')){
        //it's a drop menu
        showDropMenu($(this));
    }else{
        //it's a sliding menu
        if($(this).hasClass('WRIslideLeftMenu')){
            //it's a slide left menu
            showSlideLeftMenu($(this));
        }else{
            //it's a slide right menu
            showSlideRightMenu($(this));
        }
    }
}

function showDropMenu(obj){
    var ref = obj.children('.WRImenuLink');
    var offset = ref.position();
    var top = offset.top + ref.height();
    var left = offset.left;
    obj.children('.WRImenuLink').toggleClass('WRImenuHover');
    obj.children('.WRImenuContents').css('display','inline');
    obj.children('.WRImenuContents').css('left',left + 'px');
    obj.children('.WRImenuContents').css('top', top + 'px');
}

function showSlideRightMenu(obj){
    var ref = obj.children('.WRImenuLink');
    var offset = ref.position();
    var top = offset.top;
    var left = offset.left + obj.parent().width();
    obj.children('.WRImenuLink').toggleClass('WRImenuHover');
    obj.children('.WRImenuContents').css('display','inline');
    obj.children('.WRImenuContents').css('left',left + 'px');
    obj.children('.WRImenuContents').css('top', top + 'px');
}

function showSlideLeftMenu(obj){
    var ref = obj.children('.WRImenuLink');
    var offset = ref.position();
    var top = offset.top;
    var left = offset.left - obj.children('.WRImenuContents').width();
    obj.children('.WRImenuLink').toggleClass('WRImenuHover');
    obj.children('.WRImenuContents').css('display','inline');
    obj.children('.WRImenuContents').css('left',left + 'px');
    obj.children('.WRImenuContents').css('top', top + 'px');
}

function hideMenu(){
    $(this).children('.WRImenuContents').css('display','none');
    $(this).children('.WRImenuContents').css('-2000px');
    $(this).children('.WRImenuContents').css('-2000px'); 
    $(this).children('.WRImenuLink').toggleClass('WRImenuHover');
}
  
});
