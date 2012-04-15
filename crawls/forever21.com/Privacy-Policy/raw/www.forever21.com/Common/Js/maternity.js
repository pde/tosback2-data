function fnBabyTalkMagazine() {
    document.getElementById('maternitymagazine').style.display = 'block';
    parent.document.getElementById('maternityframe').height = '755';
    document.getElementById('maternityframe').src = '/love21maternity/babytalkmagazine.aspx';
}

function fnCloseMagazine() {
    document.getElementById('maternitymagazine').style.display = 'none';
    document.getElementById('maternityframe').src = '/love21maternity/babytalkmagazine.aspx';
}

function fnShowMaternitySizeChart() {
    if (document.getElementById('maternity_size').style.display == 'none') {
        document.getElementById('maternity_size').style.display = 'block';
    } else {
        document.getElementById('maternity_size').style.display = 'none';
    }
}

function goLeft() {
    var curpos;

    for (i = 1; i < 4; i++) {
        if (document.getElementById('maternity_lb' + i).style.display == 'block') {
            curpos = i;
            break;
        }
    }

    if (curpos == 1) curpos = 3;
    else curpos = i - 1;

    fnShowMaternityLookbook(curpos);
}

function goRight() {
    var curpos;
    for (i = 1; i < 4; i++) {
        if (document.getElementById('maternity_lb' + i).style.display == 'block') {
            curpos = i;
            break;
        }
    }

    if (curpos == 3) curpos = 1;
    else curpos = i + 1;

    fnShowMaternityLookbook(curpos);
}

function fnShowMaternityLookbook(id) {
    document.getElementById('maternity_img').style.display = 'none';
    for (i = 1; i < 4; i++) {
        document.getElementById('maternity_lb' + i).style.display = 'none';
    }

    document.getElementById('maternity_lb' + id).style.display = 'block';
}

function fnCloseLookbook() {
    for (i = 1; i < 4; i++) {
        document.getElementById('maternity_lb' + i).style.display = 'none';
    }
    document.getElementById('maternity_img').style.display = 'block';
}