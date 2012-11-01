var sayReloader = {

  totalCount: 0,
  maxReloads: 1000,
  minReloadTimeMs: 1000,
  lastReloadTime: [],

  reloadAd: function(divId, intgId) {
    var rightNow, thisProd, oldAdDiv, scriptTags, tagUrl, newScriptElt;

    rightNow = new Date().getTime();

    //make sure a takeover is not open
    for (thisProd in veprods) {
      if (veprods[thisProd].takeovershowing) {
        // a takeover is open so we can't reload nothing
        return;
      }
    }

    // throttle the reloads
    if ((sayReloader.totalCount >= sayReloader.maxReloads) || ((typeof sayReloader.lastReloadTime[divId] != "undefined") && (rightNow - sayReloader.lastReloadTime[divId] < sayReloader.minReloadTimeMs))) {
      return;
    }

    oldAdDiv = document.getElementById(divId);

    // clear out the old div
    while (oldAdDiv.childNodes.length) {
      oldAdDiv.removeChild(oldAdDiv.childNodes[0]);
    }

    tagUrl = intgId;

    newScriptElt = document.createElement('script');
    newScriptElt.setAttribute('type', 'text/javascript');
    newScriptElt.setAttribute('src', tagUrl);
    oldAdDiv.appendChild(newScriptElt);

    sayReloader.totalCount++;
    sayReloader.lastReloadTime[divId] = rightNow;

  }
}