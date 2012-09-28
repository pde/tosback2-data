
addComment = {
	moveForm : function(commId, parentId, respondId, postId) {
		var t = this, div, comm = t.I(commId), respond = t.I(respondId), cancel = t.I('cancel-comment-reply-link'), parent = t.I('comment_parent'), post = t.I('comment_post_ID');

		if ( ! comm || ! respond || ! cancel || ! parent )
			return;

		t.respondId = respondId;
		
		postId = postId || false;

		if ( post && postId )
			post.value = postId;
		parent.value = parentId;

		cancel.style.display = '';

		cancel.onclick = function() {
			var t = addComment;

			if ( ! respond )
				return;

			t.I('comment_parent').value = '0';

			this.style.display = 'none';
			this.onclick = null;

			try { t.I('comment').value = ''; }
			catch(e) {}

			return false;
		}

		try {
			t.I('comment').value = "> ";
			t.I('comment').focus();
		}
		catch(e) {}

		return false;
	},

	I : function(e) {
		return document.getElementById(e);
	}
}
