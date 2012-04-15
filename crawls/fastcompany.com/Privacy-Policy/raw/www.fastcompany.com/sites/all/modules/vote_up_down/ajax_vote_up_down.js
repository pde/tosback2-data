// $Id: ajax_vote_up_down.js,v 1.5 2006/11/24 13:18:35 frjo Exp $

Drupal.voteUpDownAutoAttach = function() {
  var vdb = [];
  $('span.vote-up-inact, span.vote-down-inact, span.vote-up-act, span.vote-down-act').each(function () {
    // Read in the path to the PHP handler
    uri = $(this).attr('title');
    // Remove the title, so no tooltip will display
    $(this).removeAttr('title');
    // remove href link
    $(this).html('');
    // Create an object with this uri. Because
    // we feed in the span as an argument, we'll be able
    // to attach events to this element.
    if (!vdb[uri]) {
      vdb[uri] = new Drupal.VDB(this, uri);
    }
  });
}

/**
 * A Vote DataBase object
 */
Drupal.VDB = function(elt, uri, id) {
  var db = this;
  // By making the span element a property of this object,
  // we get the ability to attach behaviours to that element.
  this.elt = elt;
  this.uri = uri;
  this.id = $(elt).attr('id');
  this.dir1 = this.id.indexOf('vote_up') > -1 ? 'up' : 'down';
  this.dir2 = this.dir1 == 'up' ? 'down' : 'up';
  $(elt).click(function() {
    // Ajax GET request for vote data
    $.ajax({
      type: "GET",
      url: db.uri,
      success: function (data) {
        // extract the cid so we can change other elements for the same cid
        var cid = db.id.match(/[0-9]+$/);
        var pid = 'vote_points_' + cid;
        //update the voting arrows
        $('#' + db.id + '.vote-' + db.dir1 + '-inact')
          .removeClass('vote-' + db.dir1 + '-inact')
          .addClass('vote-' + db.dir1 + '-act');
        $('#' + 'vote_' + db.dir2 + '_' + cid)
          .removeClass('vote-' + db.dir2 + '-act')
          .addClass('vote-' + db.dir2 + '-inact');
        // update the points
        $('#' + pid).html(data);
      },
      error: function (xmlhttp) {
        alert('An HTTP error '+ xmlhttp.status +' occured.\n'+ db.uri);
      }
    });
  });
}

// Global killswitch
if (Drupal.jsEnabled) {
  $(document).ready(Drupal.voteUpDownAutoAttach);
}
