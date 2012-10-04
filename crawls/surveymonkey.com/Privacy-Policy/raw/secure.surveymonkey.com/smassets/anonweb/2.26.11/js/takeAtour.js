(function() {

  var container = document.getElementById('nav'),
  parents = SM.DOM.getElementsByClassName("nav-item-parent", container),
  parent,
  parentLen = parents.length,
  clickedParent,
  clickedMenu,
  openedParent,
  openedMenu,
  i,
  j;

  function getSiblingMenu(parent){
     return SM.DOM.getElementsByClassName("sub_links", parent.parentNode)[0];
  }

  function parentClick(e) {
       e.preventDefault();
       clickedParent = e.target;
       openedParent = SM.DOM.getElementsByClassName('nav-item-parent-on', container)[0];
       openedMenu = SM.DOM.getElementsByClassName('sub_open', container)[0];

       if (!SM.DOM.hasClass(clickedParent, 'nav-item-parent-on')) {

           //open the clicked menu and close the opened one
           clickedMenu = getSiblingMenu(clickedParent);
           openedMenu.style.display = 'none';
           clickedMenu.style.display = '';
           SM.DOM.removeClass(openedMenu, 'sub_open');
           SM.DOM.addClass(clickedMenu,"sub_open");
           SM.DOM.removeClass(openedParent, 'nav-item-parent-on');
           SM.DOM.removeClass(openedParent, 'nav-item-on');
           SM.DOM.addClass(clickedParent, 'nav-item-parent-on');
           SM.DOM.addClass(clickedParent, 'nav-item-on');
        }
  }

  //add a click event to each of the parents
  for(i=0; i < parentLen; i++){
      parent = parents[i];
      SM.Event.add(parent,"click", parentClick);
  }
})();
