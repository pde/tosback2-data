this.WPF_admanager= this.WPF_admanager || this.parent.WPF_admanager || 
    new ((function( awe){
        var module = this.module = this, 
        $log = Logger(this.console, 'advertising'),
        $sizes = {}, 
        $slots = {},
        $frameMaker = adFrameFactory(),
        $ngsidattr = 'data-ngsadid',
        $interstitial = false
    ; 
    advertising.prototype= {
        defineAd: function( opts){ 
            var opts = opts || new Object(), slot, primarySize
            if ( opts.refreshable === 'True')
                opts.refreshable=true
            else opts.refreshable=false
            opts.container = getContainer(opts)

            if(opts.id in $slots) 
                return $slots[opts.id]

            // load ads variable dimensions
            try{
                opts.variable_dimensions = $.parseJSON(opts.variable_dimensions)
                if(!(opts.variable_dimensions instanceof Array)){
                    opts.variable_dimensions = []
                }
            }catch(err){
                opts.variable_dimensions = []
            }

            opts.placement = opts.placement || module.globalPlacement
            opts.dimensions = getDimensions(opts.dimensions)


            // $log.info('creating placement [' + opts.id + '] | ' + opts.placement)

            slot = new dartslot(opts.placement, opts.dimensions, opts.container,
                                opts.refreshable, opts.variable_dimensions)
            slot.setTargeting('kw', this.keywords)
            slot.setTargeting('szi', getSizeIndex(opts.dimensions))
            slot.id = opts.id

            $slots[slot.id] = slot

            if(!$interstitial){
                slot.setInterstitial()
                $interstitial = true
            }

            return slot
        },
        displayAd: function(id,ctx){
           slot = $slots[id]
           if(!slot)
                return $log.error('no slot with id ' + id) 

           ctx = ctx && ctx.document || awe.document
           // $log.info("displaying ad " + id)
           slot.display(ctx)
        },
    refreshAds: function(){
        for(var slot in $slots)
            try{
                $slots[slot].refreshAd()
            }catch(e){}
        return this
    }
    };
    dartslot.prototype = {
        loaded: 0,
        display: function(ctx){

            if(this.loaded && ctx == awe.document){ 
                this.displayHandler = new asyncDisplayHandler(this)
        this.clearContainer()
            }else if(ctx != awe.document) 
                this.displayHandler = new inlineDisplayHandler(this)
            
            this.displayHandler(ctx)

        if(!this.loaded)
                this.loaded= dartslot.ord()
            else
                this.loaded= dartslot.ord(this.loaded === dartslot.ord()) 

            return this
        },
        refreshAd: function( ){
            if( this._refreshable == undefined || ( !this._refreshable))
                return false
            $(this.container).find('iframe').remove()
            return $frameMaker(this.container, this.getUrl(true), undefined, this);
        },
        setTargeting: function(key,value){
            value= value || ""
            var v = this.targeting[key] = this.targeting[key] || []
            // $log.info('setting ' + key + '= ' + value) 

            if( typeof value == 'number')
                value = String( value)

            if(typeof value != 'string' && value.length) 
                for(var i = 0, l= value.length; i < l; i++)
                    this.setTargeting(key, value[i])
            else if(typeof value=='string')
                v[v.length]= value.replace(/\s+/g,'+')
                                  .replace(/[^A-Za-z0-9+]+/g,'')
            else 
                v[v.length] = ""

            return this
        },
        setInterstitial: function(){
            this.setTargeting('dcopt', 'ist')   
        },
        setTile: (function(){
            var tile = 0
            return function(){this._tile = ++tile;return this._tile}
        })(),
        tile: function(){
            return this._tile ? this._tile : this.setTile()
        },
        getUrl: (function(){ 
            var $idxes = {placement:1,targeting: 3,size: 5,tile:7,ord:9 },
                $ord= Math.floor(Math.random()*1e6),
                $darturl = [ 
                    '//ad.doubleclick.net/adj/', null,
                    ';', null, 
                    ';sz=', null, 
                    ';tile=',null,
                    ';ord=',null,
                    '?'
                ]
            ;   
            return getUrl 
            function getUrl(refresh){
                // pass optional param refresh
                // which indicates we need to make our ad url cache bustable
                // e.g. tell dartslot.ord whether it needs to update ord value. This is the
                // Dart cache busting parameter

                var url = $darturl.slice(),x = $idxes

                // If the ad has variable dimensions we should get a random one
                // before calling the adserver
                if(this.variable_dimensions.length>1){
                    var dim = getVariableDimensions(this.variable_dimensions);
                    this.dimensions = [[dim.width, dim.height]];
                }

                url[x.placement] = this.placement
                url[x.size] = dimensionsToString(this.dimensions)
                url[x.targeting] = objectToString(this.targeting, '=', ';') 
                url[x.ord] = dartslot.ord(refresh) 
                url[x.tile] = this.tile()
                url = url.join('')
                return url;
            }
            function dimensionsToString(dims){
                var sb = []
                for(var i=0, l= dims.length; i < l; i++) {
                    sb[sb.length]= dims[i].join('x')
                }
                return sb.join(',') 
            }
            function objectToString(obj,delim1,delim2){
                var sb = []
                delim1 = delim1 || '='
                delim2 = delim2 || ';'
                for(var key in obj){
                    var value = obj[key]
                    if(!obj.hasOwnProperty(key))
                        continue

                    if(typeof value != 'string' && value.join) 
                        value = value.join(',') 
                    sb[sb.length]= [key, value].join(delim1)
                }
                return sb.join(delim2) 
            }
        })(),
        clearContainer: function(ctx){
            clearElement(this.container)
        }
    }
    dartslot.ord= (function(){
    var ord
    setOrd()
    return function(reset){
        if(reset)setOrd()
        return ord
    }
    function setOrd(){ 
        ord = Math.floor(Math.random() * 1e6) + 1
    }
    })();
        
    return advertising 
    function Logger(output,prefix){
        var methods = 'log,error,debug,info'.split(','),
            $default = methods[0],
            $start = new Date,
            self = factory($default) 
        ; 
        for(var i = 0, l = methods.length; i < l; i++) 
            self[methods[i]] = factory(methods[i])

        return self

        function factory(method){
            if(!output) 
                return new Function
            else if (!output[method]) 
                return factory($default) 

            return function(){
                var args = Array.prototype.slice.call(arguments)
                args[0] = [ offset() , ' [' , prefix , '] ' , args[0] ].join('')
                output[method].apply(output, args) 
            }
        }
        function offset(){
            var d = new Date - $start 
            d /= 100; 
            d = Math.floor(d) / 10 
            return '+' + d + 's'
        }

    }

    function advertising( opts){
       opts = opts || new Object();
       this.keywords = opts.keywords || obtain_keywords()
       this.$slots = $slots 
       return this;
    }
    function dartslot(placement, dimensions, container, refreshable, variable_dimensions){
        this.placement = placement.indexOf("ng.") == 0 ? placement : "ng." + String(placement)
        this.dimensions = dimensions
        this.variable_dimensions = variable_dimensions
        this.container = container
        this.targeting = {} 
        if( refreshable){
            this.displayHandler = new asyncDisplayHandler( this);
            this._refreshable=true;
        }
        else
            this.displayHandler = new inlineDisplayHandler(this)
        this.setTile()
    }
    function inlineDisplayHandler(slot){
        var $script = ['<script type="text/javascript" src="', null, '"><\/script>'],
            $slot = slot
        ; 
        return function(ctx){
            $script[1] = $slot.getUrl()
            ctx.write( $script.join('') )
        }
    }
    function asyncDisplayHandler(slot){
        var $slot = slot
        return function(ctx){
            $frameMaker(slot.container, slot.getUrl(), undefined, slot)
        }
    }
    function _escape(str){
        if(typeof str != 'string') 
            return str
        return encodeURIComponent(str)
    }
    function _unescape(str){ 
        if(typeof str != 'string') 
            return str
        return decodeURIComponent(str)
    }
    function obtain_keywords(){
        if(awe.override_words) 
           return awe.override_words
        var keywords= "";
        try{
              keywords = $('meta[name="keywords"]').attr('content') || ""
        }catch(e){
            $log.error('Unable to find meta[name="keywords"] : ' + e.toString())
            try{
                var meta = document.getElementsByTagName('meta');
                for( var i=0; i< meta.length; i++)
                {
                    if( meta[i].name == 'keywords'){
                        keywords = meta[i].content;
                        break;
                    }
                }
            }catch(e ){
                $log.error('Unable to locate meta[name="keywords"] : ' + e.toString())
            }

        }
        var kw = keywords.split(/\s*,\s*/)
        for(var i= 0; i < kw.length; i ++) 
            kw[i] = kw[i].replace(/^\s+|\s+$/g,'')
        return kw
    }
    function getDimensions(dims){
        var _dims = []
        if(typeof dims == 'string') 
            _dims.push(dims.split('x'))
        else if(typeof dims == 'object') 
            _dims = dims
        else 
            _dims.push([1,1])
        return _dims
    }
    function getVariableDimensions(dims){
        // Return an ad dimension using the variability in dims arrays.
        var variability_sum = 0;
        // get a random number between 1 and 100
        var rand_number = Math.floor((Math.random()*100)+1);
        var final_dim = dims.length >= 1 ? dims[0] : {}
        $.each(dims, function(index, dimension){
            variability_sum += dimension.variability;
            if(rand_number <= variability_sum){
                final_dim = dimension;
                return false; // break the loop
            }
        });
        return final_dim;
    }
    function parseOptions(options, required){
        for(var i=0, l= required.length; i < l; i++)
        if(!options.hasOwnProperty(required[i]))
            throw new Error("ERROR: ['" + "'] is a required value")
    }
    function getSizeIndex(dimensions){
        var primary = dimensions[0]
        $sizes[primary] = $sizes[primary] || 1
        return $sizes[primary]++
    }
    function getId(container, dimensions){
        var 
             ngsad = container.getAttribute($ngsidattr)
        ,dims = getDimensions(dimensions)
            ,id = [dims[0].join('x'),1]
        ;
        if(ngsad) 
            return ngsad

        while(id.join('_') in $slots)
            id[1]++
        return id.join('_')
    }
    function getContainer(options){
        var 
            ctx = options.ctx || awe
           ,ctxd =  ctx.document
           ,container = null
        ;
        if(options.container) 
              container = typeof options.container == 'string' ? 
                 ctxd.getElementById(options.container) : 
                 ctxd.container 
        else
              container = findCaller(ctx)

        if(!container)
              return $log.error('unable to find container for ad')

        options.id = options.id || getId(container, options.dimensions)
        container.setAttribute($ngsidattr, options.id)
        return container
    }
    function findCaller(ctx){
        var 
             anchor = null
            ,ctxd= ctx.document 
            ,container = awe.document.createElement('ins')
        ;

        if(ctx != awe && ctx.frameElement)
              anchor = ctx.frameElement
        else if(ctxd.currentScript)
              anchor = ctxd.currentScript
        else{
            var s = ctxd.scripts || ctxd.getElementsByTagName('script') 
            for( var index=s.length-1; index>=0; --index)
            {
                if( s[index].innerHTML.indexOf('this.WPF_admanager.displayAd')>=0){
                    anchor=s[index];
                    break;
                }
            }
            if( anchor==null)
                anchor=s[s.length-1];
        }
    return anchor.parentNode
    }
    function clearElement(element){
        while(element.hasChildNodes())
            element.removeChild(element.lastChild)
        return element
    }
    function adFrameFactory(){
        var $htmlTemplate= ['<!DOCTYPE html><html><body>'
                            ,'<script>window["inDapIf"]=true;<\/script>'
                                ,null
                            ,'<script src="', 
                                null, 
                            '"><\/script>'
                            ,'<\/body><\/html>'
           ],
        $scriptSrcIndex=4,
        $encode=encodeURIComponent,
        $hostName=window.location.hostname;
        return function(parent, adUrl, callback, adSlot){ 
            callback= callback || new Function
            var iframe= document.createElement('iframe');
            // set the default size of the iframe using the slot dimensions
            if(adSlot == undefined){
                adSlot = this.slot;
            }
            var width = adSlot.dimensions[0][0];
            var height = adSlot.dimensions[0][1];
            var attributes= {
                height: height,
                width: width,
                frameBorder: 0,
                vSpace: 0,
                hSpace: 0,
                marginHeight: 0,
                marginWidth: 0,
                scrolling: 'no'
             };
            var html= $htmlTemplate.slice() ;
            var iframeSrc= [ 'javascript:decodeURIComponent("', null, '")' ];
            html[$scriptSrcIndex]= adUrl
            if(document.domain != $hostName) 
                html[2]= '<script>try{document.domain= "'+ document.domain+'"}catch(e){}<\/script>'
            else     
                html[2]= ''
    
            iframeSrc[1]= $encode($encode(html.join("")))
            iframeSrc= iframeSrc.join("")
    
            for( var attribute in attributes ){ 
                if(attributes.hasOwnProperty(attribute))
                    iframe[attribute]= attributes[attribute]
            }
    
            parent.appendChild(iframe)
            iframe.src= iframeSrc 
            iframe.onload= iframe.onreadystatechange= iframeLoadHandler
    
            return iframe
            function iframeLoadHandler() {  
                if(
                    this.readyState && 
                    this.readyState != "loaded" && 
                    this.readyState != "complete"
                ) 
                    return 
                this.onload= this.onreadystatechange= null 
                //resize(this)
                callback.apply(this, arguments)
            }
        }
        function resize(iframe){
            var doc = iframe.contentDocument || iframe.contentWindow.document;
            var body = doc.body; 
            doc=doc.documentElement
            iframe.width= Math.max( 
                body.scrollWidth, doc.scrollWidth, 
                body.offsetWidth, body.offsetWidth
            ) 
            iframe.height= Math.max( 
                body.scrollHeight, doc.scrollHeight, 
                body.offsetHeight, doc.offsetHeight
            )
        }
    }
;

})(this));
