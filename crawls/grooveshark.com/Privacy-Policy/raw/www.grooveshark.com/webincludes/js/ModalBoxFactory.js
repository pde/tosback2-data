/** Factory for creating modal boxes using the jqModal plugin
 *  
 */
 
function ModalBoxFactory()
{
    this.defaultOptions = {
        modal: true,
        overlay: 50,
        onShow: gs.modal_show,
        onHide: gs.modal_hide
    };
    
    this.defaultClass = 'jqmWindow';
    
    /** Create a new modal box
     *
     *  @param modalOptions Hash    modifies the default options to be sent to .jqm()
     *  @param otherOptions Hash    contains id, class, and contents (if not ajax) for the new modal box
     *  @param show Boolean         whether or not to pop the modal box on creation
     */ 
    
    this.newModalBox = function(modalOptions, otherOptions, show)
    {
        var divid = otherOptions.newid ? otherOptions.newid : '';
        var divclass = otherOptions.newclass ? otherOptions.newclass : '';
        divclass += ' '+this.defaultClass;
        var divcontents = otherOptions.contents ? otherOptions.contents : '';
        if (divcontents == '' && modalOptions.ajax) divcontents = '<p>Loading...</p>';
        
        //Prevent ID conflicts by destroying any old divs with that id
        var d = document.getElementById(divid);
        if (d) { this.disposeModalBox(d); }
        
        //Merge defaults and modalOptions without modifying defaults
        var options = {};
        jQuery.extend(options, this.defaultOptions, modalOptions);
        
        var box = $('<div id="'+divid+'" class="'+divclass+'">'+divcontents+'</div>');
        $("body").append(box);
        box.jqm(options);
        
        if (show) box.jqmShow();
        
        return box[0];  //return the DOM element that is the new box
        
    }
    
    /** Destroys a modal box, killing all internal event handlers first to prevent mem leaks
     *
     *  @param box  DOM or jQuery object
     */
    
    this.disposeModalBox = function(box)
    {
        var box = $(box);  //force to jQuery element if not already
        
        //Theoretically we're only passing one element, but since we accept a jQuery object, we should be flexible
        box.each(function(i) {
            if ($(this).css('display') == 'block') $(this).jqmHide();  //make sure modal box is hidden before destroying it
            gs.util.purge(this);   //kills all event handlers to prevent mem leaks
            this.parentNode.removeChild(this);
        });
        
        //this is mostly for the purpose of being able to say something like box = factory.disposeModalBox(box) thus nulling out that ref too
        return null; 
    }
    
}

