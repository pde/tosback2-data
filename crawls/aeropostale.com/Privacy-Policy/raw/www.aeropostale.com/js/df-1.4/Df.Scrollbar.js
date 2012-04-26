//add element methods
/*
 ref:		Element.scrollbar
 returns:	Df.Scrollbar
 delegate:	Df.Scrollbar
 type:		Method
 arg:		Object pars
 example:	<script type="text/javascript">
			$('xxx').scrollbar();
		</script>
*/
Element.addMethods({
	scrollbar: function(element, pars){
		return new Df.Scrollbar($(element), pars)
	}
});

/*
 ref:		Df.Scrollbar
 type:		Class
 extends:	Df.Ui
 returns:	Df.Scrollbar
 event:		this.element scrollX {instance: this}
 event:		this.element scrollY {instance: this}
*/
Df.Scrollbar = Class.create(Df.Ui, {
	
	_initPars: function($super, pars){
		$super()
		this.setPars({
			scroll: {},
			classNames: {
				y: {
					holder: 'yHolder',
					prev: 'ArrowUp',
					next: 'ArrowDown',
					area: 'SlideArea',
					marker: 'marker'
				},
				x: {
					holder: 'xHolder',
					prev: 'ArrowLeft',
					next: 'ArrowRight',
					area: 'SlideArea',
					marker: 'marker'
				}
			},
			clickPercent:10,
			clickPixel:false,
			clickPause: 500,
			clickRepeat: 25,
			holder: document.body,
			positionY: true,
			positionX: true
		});
		this.setPars(pars)
	},
	
	_setup: function($super){
		
		this.yDrag;
		this.xDrag;
		this.yClickMove;
		this.xClickMove;
		this.maxY;
		this.maxX;
		this.yClickStatusNext = false;
		this.yClickStatusPrev = false;
		this.xClickStatusNext = false;
		this.xClickStatusPrev = false;
		this.eles = {
			y: {},
			x: {}
		}
		this.dems = {
			holder:{},
			content:{},
			offset:{},
			x: {
				holder: {},
				prev: {},
				next: {},
				area: {},
				marker: {}
			},
			y: {
				holder: {},
				prev: {},
				next: {},
				area: {},
				marker: {}
			}
		}
		this.yDragging = false;
		this.xDragging = false;
		
		this._wheelControl = this.wheelControl.bind(this)
		
		$super()
		
		this.element.scrollTop = 0;
		this.element.scrollLeft = 0
		
		this.getElement().observe(':resize', this.adjustToContent.bind(this))
		
		this.getElement().observe(':reposition', function(e){
			this.setPositions()
			if(this.eles.y.holder)
				this.positionBarY()
				
			if(this.eles.x.holder)
				this.positionBarX()
		}.bind(this));
		
		Event.observe(document.body, 'mouseup', function(e){
				Event.stop(e)
				this.yClickStatusNext = false;
				this.xClickStatusNext = false;
				this.yClickStatusPrev = false;
				this.xClickStatusPrev = false;
		}.bind(this));
		
		this.adjustToContent()
	},
	
	/*
	 ref:		Df.Scrollbar.getElements
	 type:		Method
	 returns:	{
				y: {
					holder,
					prev,
					area,
					marker,
					next
				},
				x: {
					holder,
					prev,
					area,
					marker,
					next
				}
			}
	*/
	getElements: function(){
		return this.eles;
	},
	
	adjustToContent: function(e){
		this.setDems();
		this.setPositions();
		
		this.element.stopObserving(':mousewheel', this._wheelControl);
		
		if (this.dems.content.height > this.dems.holder.height) {
			this.buildYBar();
			this.element.observe(':mousewheel', this._wheelControl);
			this.sizeDemsY();
			this.setIterationY();
			try{
				this.scrollY(parseInt(this.eles.y.marker.getStyle('top')))
			}catch(e){
				
			}
			
		}
		else if(this.eles.y.holder) {
			this.eles.y.holder.remove()
			this.eles.y = {}
		}
		
		if (this.dems.content.width > this.dems.holder.width) {
			this.buildXBar();
			this.sizeDemsX();
			this.setIterationX();
			try{
				this.scrollX(parseInt(this.eles.x.marker.getStyle('left')))
			}catch(e){
				
			}
		}
		else if(this.eles.x.holder) {
			this.eles.x.holder.remove()
			this.eles.x = {}
		}
	},
	
	setIterationY: function(){
		
		if (this.pars.clickPixel) {
			this.yClickMove = Math.ceil((this.pars.clickPixel/this.dems.content.height) * this.dems.y.area.height);
		}
		
		else if(this.pars.clickPercent){
			this.yClickMove = Math.ceil((this.pars.clickPercent/100) * this.dems.y.area.height);
		}
	},
	
	setIterationX: function(){
		
		if (this.pars.clickPixel) {
			this.xClickMove = Math.ceil((this.pars.clickPixel/this.dems.content.width) * this.dems.x.area.width);
		}
		
		else if(this.pars.clickPercent){
			this.xClickMove = Math.ceil((this.pars.clickPercent/100) * this.dems.x.area.width);
		}
	},
	
	scrollY: function(y){
		if (y > this.maxY) {
			y = this.maxY;
		}
		else if (y < 0) {
			y = 0;
		}
		this.eles.y.marker.style.top = y + 'px';
		this.moveContentY();
		
		return this
	},
	
	scrollX: function (x) {
		if (x < 0) {
			x = 0;
		}
		if (x > this.maxX) {
			x = this.maxX;
		}
		this.eles.x.marker.style.left = x + 'px'
		this.moveContentX();
	},
	
	scrollYNext: function(){
		var y = parseInt(this.eles.y.marker.getStyle('top')) + this.yClickMove;
		this.scrollY(y);
		return this
	},
	
	scrollYPrev: function(){
		var y = parseInt(this.eles.y.marker.getStyle('top')) - this.yClickMove;
		this.scrollY(y);
		return this
	},
	
	scrollXNext: function(){
		var x = parseInt(this.eles.x.marker.getStyle('left')) + this.xClickMove;
		this.scrollX(x);
		return this
	},
	
	scrollXPrev: function(){
		var x = parseInt(this.eles.x.marker.getStyle('left')) - this.xClickMove;
		this.scrollX(x);
		return this
	},
	
	scrollYBy: function(y){
		y = parseInt(this.eles.y.marker.getStyle('top')) - y;
		this.scrollY(y);
		return this
	},
	
	scrollXBy: function(x){
		x = parseInt(this.eles.x.marker.getStyle('left')) + x;
		this.scrollX(x);
		return this
	},
	
	setDems: function(){
		this.dems.holder = this.element.getDimensions();
		this.dems.content = {height: this.element.scrollHeight, width: this.element.scrollWidth};
		return this
	},
	
	setPositions: function(){
		this.dems.offset = {x:parseInt(Position.cumulativeOffset(this.element)[0]), y:parseInt(Position.cumulativeOffset(this.element)[1])};
		return this
	},
	
	sizeDemsY: function(){
		this.dems.y.holder = {width: parseInt(this.eles.y.holder.getStyle('width')), height: this.dems.holder.height};
		this.dems.y.prev = {width: parseInt(this.eles.y.prev.getStyle('width')), height: parseInt(this.eles.y.prev.getStyle('height'))};
		this.dems.y.next = {width: parseInt(this.eles.y.next.getStyle('width')), height: parseInt(this.eles.y.next.getStyle('height'))};
		this.dems.y.area.width = parseInt(this.eles.y.area.getStyle('width'));
		this.dems.y.area.height = this.dems.holder.height - this.dems.y.prev.height - this.dems.y.next.height;
		this.dems.y.marker.width = parseInt(this.eles.y.marker.getStyle('width'));
		this.dems.y.marker.height = Math.ceil((this.dems.holder.height/this.dems.content.height) * this.dems.y.area.height);
		
		//size elements
		this.eles.y.holder.style.height = this.dems.y.holder.height + 'px';
		this.eles.y.area.style.height = this.dems.y.area.height + 'px';
		this.eles.y.marker.style.height = this.dems.y.marker.height + 'px';
		
		//position elements
		if(this.pars.positionY){
			this.positionBarY()
		}
		
		this.maxY = this.dems.y.area.height - this.dems.y.marker.height;
		
		this.yDrag.pars.dirY.max = this.maxY
	},
	
	positionBarY: function(){
		this.eles.y.holder.style.left = this.barYLeft() + 'px';
		this.eles.y.holder.style.top = this.barYTop() + 'px';
	},
	
	barYLeft: function(){
		return this.dems.offset.x + this.dems.holder.width
	},
	
	barYTop: function(){
		return this.dems.offset.y
	},
	
	buildYBar: function(){
		if(!this.eles.y.holder){
			//create elements
			this.buildBarHTML('y');
			
			this.yDrag = new Df.Drag(this.eles.y.marker, {
				dirX: false,
				onStart: function(){
					this.yDragging = true;
				}.bind(this),
				onDrag: this.moveContentY.bind(this),
				onStop: function(){
					this.yDragging = false;
				}.bind(this),
				dirY: {
					min:0
				}
			}).enable();
			
			this.eles.y.holder.observe('click', function(e){
				Event.stop(e)
			});
			
			//apply actions to Buttons
			Event.observe(this.eles.y.next, 'mousedown', this.yNext.bind(this));
			Event.observe(this.eles.y.prev, 'mousedown', this.yPrev.bind(this));
			
			//apply actions to scroll area
			Event.observe(this.eles.y.area, 'mousedown', this.yMakeScrollDecision.bind(this));
		}
		return this
	},
	
	sizeDemsX: function(){
		//set dem vars
		this.dems.x.holder = {height: parseInt(this.eles.x.holder.getStyle('height')), width: this.dems.holder.width};
		this.dems.x.prev = {width: parseInt(this.eles.x.prev.getStyle('width')), height: parseInt(this.eles.x.prev.getStyle('height'))};
		this.dems.x.next = {width: parseInt(this.eles.x.next.getStyle('width')), height: parseInt(this.eles.x.next.getStyle('height'))};
		this.dems.x.area.height = parseInt(this.eles.x.area.getStyle('height'));
		this.dems.x.area.width = this.dems.holder.width - this.dems.x.prev.width - this.dems.x.next.width;
		this.dems.x.marker.height = parseInt(this.eles.x.marker.getStyle('height'));
		this.dems.x.marker.width = Math.ceil((this.dems.holder.width/this.dems.content.width) * this.dems.x.area.width);
		
		//size elements
		this.eles.x.holder.style.width = this.dems.x.holder.width + 'px';
		this.eles.x.area.style.width = this.dems.x.area.width + 'px';
		this.eles.x.marker.style.width = this.dems.x.marker.width + 'px';
		
		//position elements
		if(this.pars.positionX){
			this.positionBarX()
		}
		
		this.maxX = this.dems.x.area.width - this.dems.x.marker.width;
		
		this.xDrag.pars.dirX.max = this.maxX
		
	},
	
	positionBarX: function(){
		this.eles.x.holder.style.top = this.barXLeft() + 'px';
		this.eles.x.holder.style.left = this.barXTop() + 'px';
	},
	
	barXLeft: function(){
		return this.dems.offset.y + this.dems.holder.height
	},
	
	barXTop: function(){
		return this.dems.offset.x
	},
	
	buildXBar: function(){
		if(!this.eles.x.holder){
			
			//create elements
			this.buildBarHTML('x');
			
			this.xDrag = new Df.Drag(this.eles.x.marker, {
				dirY: false,
				onStart: function(){
					this.xDragging = true;
				}.bind(this),
				onDrag: this.moveContentX.bind(this),
				onStop: function(){
					this.xDragging = false;
				}.bind(this),
				dirX: {
					min:0
				}
			}).enable();
			
			this.eles.x.holder.observe('click', function(e){
				Event.stop(e)
			});
			
			//apply actions to Buttons
			Event.observe(this.eles.x.next, 'mousedown', this.xNext.bind(this));
			Event.observe(this.eles.x.prev, 'mousedown', this.xPrev.bind(this));
			
			//apply actions to scroll area
			Event.observe(this.eles.x.area, 'mousedown', this.xMakeScrollDecision.bind(this));
		}
		return this
	},
	
	wheelControl: function(e){
		if(e.memo.delta > 0){
			this.scrollYPrev();
		}
		else if(e.memo.delta < 0){
			this.scrollYNext();
		}
		
		return this
	},
	
	xMakeScrollDecision: function(event){
		if(!this.xDragging){
			this.xTo(event);
		}
	},
	
	yMakeScrollDecision: function(event){
		if(!this.yDragging){
			this.yTo(event);
		}
	},
		
	yNext: function(event){
		this.yClickStatusNext = true
		this.yNextClick(this.pars.clickPause);
	},
		
	/** @private */
	yPrev: function(event){
		this.yClickStatusPrev = true
		this.yPrevClick(this.pars.clickPause);
	},
		
	/** @private */
	xNext: function(event){
		this.xClickStatusNext = true
		this.xNextClick(this.pars.clickPause);
	},
		
	/** @private */
	xPrev: function(event){
		this.xClickStatusPrev = true
		this.xPrevClick(this.pars.clickPause);
	},
		
	/** @private */
	yPrevClick: function(i){
		if(this.yClickStatusPrev){
			this.scrollYPrev();
			setTimeout(function(){
				this.yPrevClick(this.pars.clickRepeat);
			}.bind(this), i);
		}
	},
		
	/** @private */
	yNextClick: function(i){
		if(this.yClickStatusNext){
			this.scrollYNext();
			setTimeout(function(){
				this.yNextClick(this.pars.clickRepeat)
			}.bind(this), i);
		}
	},
		
	/** @private */
	xPrevClick: function(i){
		if(this.xClickStatusPrev){
			this.scrollXPrev();
			setTimeout(function(){
				this.xPrevClick(this.pars.clickRepeat);
			}.bind(this), i);
		}
	},
		
	/** @private */
	xNextClick: function(i){
		if(this.xClickStatusNext){
			this.scrollXNext();
			setTimeout(function(){
				this.xNextClick(this.pars.clickRepeat);
			}.bind(this), i);
		}
	},
		
	/** @private */
	yTo: function(event){
		Event.stop(event);
		var top = (Event.pointerY(event) - this.dems.offset.y - this.dems.y.prev.height) - parseInt((this.dems.y.marker.height/2));
		if(top<0){
			top = 0;
		}else if(top > this.maxY){
			top = this.maxY;
		}
		this.eles.y.marker.style.top = top + 'px';
		this.moveContentY();
	},
		
	/** @private */
	xTo: function(event){
		Event.stop(event);
		var left = (Event.pointerX(event) - this.dems.offset.x - this.dems.x.prev.width) - parseInt((this.dems.x.marker.width/2));
		if(left<0){
			left = 0;
		}else if(left > this.maxX){
			left = this.maxX;
		}
		this.eles.x.marker.style.left = left + 'px';
		this.moveContentX();
	},
		
	/** @private */
	moveContentY: function(){
		var percent = parseInt(this.eles.y.marker.getStyle('top')) / (this.dems.y.area.height - this.dems.y.marker.height);
		this.element.scrollTop =  parseInt((this.dems.content.height - this.dems.holder.height) * percent);
		
		this.element.fire(':scrollY', {instance: this})
		
		return this;
	},
		
	/** @private */
	moveContentX: function(){
		var percent = parseInt(this.eles.x.marker.getStyle('left')) / (this.dems.x.area.width - this.dems.x.marker.width);
		this.element.scrollLeft =  parseInt((this.dems.content.width - this.dems.holder.width) * percent);
		
		this.element.fire(':scrollX', {instance: this})
		
		return this
	},
		
	/** @private */
	buildBarHTML: function(d){
		this.eles[d].holder = $(this.pars.holder).e('div', 'bottom', { className:this.pars.classNames[d].holder } );
		this.eles[d].prev = $(this.eles[d].holder).e('div', 'bottom', { className:this.pars.classNames[d].prev } );
		this.eles[d].area = $(this.eles[d].holder).e('div', 'bottom', { className:this.pars.classNames[d].area } );
		this.eles[d].marker = $(this.eles[d].area).e('div', 'bottom', { className:this.pars.classNames[d].marker } );
		this.eles[d].next = $(this.eles[d].holder).e('div', 'bottom', { className:this.pars.classNames[d].next } );
	}
});

/*
 ref:		Df.PagingScrollbar
 type:		Class
 extends:	Df.Scrollbar
 returns:	Df.PagingScrollbar
 event:		this.element page {rowsInView: [], colsInView: []}
*/
Df.PagingScrollbar = Class.create(Df.Scrollbar, {
    
    _initPars: function($super, pars){
	$super()
	this.setPars({
		rowsOverlap: 2,
		colsOverlap: 2,
		delay: 100,
		rowHeight: 100,
		colWidth: false,
		rows: 50,
		cols: 1,
		useCache: true,
		onCreateCell: function(node, row, col){
			if((row%2 && col%2) || (row%2 == 0 && col%2 == 0)){
				node.setStyle({backgroundColor:'#cccccc'})
			}
			node.update(row + ' _ ' + col)
		}
        })
	this.setPars(pars)
    },
    
    _setup: function($super){
        
	this.cellsToShow = []
	this.cellCache = {}
	
        this.rowsInView
	this.colsInView
	
	this.cellHeight
	this.cellWidth
	
        this.recHolder = this.element.e('div', 'bottom').setStyle({
		position:'relative', top:0
	}).update('&nbsp;')
	
	this.element.observe(':scrollY', this.scrollAction.bind(this))
	this.element.observe(':scrollX', this.scrollAction.bind(this))
	
	$super()
    },
    
    clearCells: function(){
	loopie:
	for(p in this.cellCache){
		this.recHolder.childElements().each(function(n){
			n.remove()
		})
		this.cellCache = {}
		this.cellsToShow = []
		break loopie
	}
    },
    
    adjustToContent: function($super, e){
	
	this.clearCells()
	
	if(this.pars.rowHeight){
		this.cellHeight = this.pars.rowHeight
		this.recHolder.setStyle({height: (this.pars.rows * this.cellHeight ) + 'px'})
        } else {
		this.cellHeight = parseInt(this.element.getStyle('height'))
		this.recHolder.setStyle({height: this.cellHeight + 'px'})
        }
	this.rowsInView = parseInt(this.element.getStyle('height')) / this.pars.rowHeight
        
        if(this.pars.colWidth){
		this.cellWidth = this.pars.colWidth
		this.recHolder.setStyle({width: (this.pars.cols * this.cellWidth ) + 'px'})
        } else {
		this.cellWidth = parseInt(this.element.getStyle('width'))
		this.recHolder.setStyle({width: this.cellWidth + 'px'})
        }
	this.colsInView = parseInt(this.element.getStyle('width')) / this.pars.colWidth
	
	$super(e)
	
	this.element.fire(':scrollY', {instance: this})
	
	return this
    },
    
    scrollAction: function(e){
        var t = setTimeout(
            this.changePageLogic.bind(this, this.element.scrollTop, this.element.scrollLeft),
            this.pars.delay
        )
    },
    
    changePageLogic: function(oldScrollTop, oldScrollLeft){
        if(this.element.scrollTop == oldScrollTop && this.element.scrollLeft == oldScrollLeft){
            
		var rowTop = parseInt(oldScrollTop / this.pars.rowHeight) + 1
		var rowLeft = parseInt(oldScrollLeft / this.pars.colWidth) + 1 
		
		var rows = $A($R(
			(rowTop - this.pars.rowsOverlap).toRange(1, this.pars.rows),
			(rowTop - 1 + this.rowsInView + this.pars.rowsOverlap).toRange(1, this.pars.rows)
		))
		
		var cols = $A($R(
			(rowLeft - this.pars.colsOverlap).toRange(1, this.pars.cols),
			(rowLeft - 1 + this.colsInView + this.pars.colsOverlap).toRange(1, this.pars.cols)
		))
		
		var newCellsToShow = []
		
		for(var i=0; i<rows.length; i++){
			for(var j=0; j<cols.length; j++){
				newCellsToShow.push([rows[i],cols[j]])
			}	
		}
		
		if(Object.toJSON(this.cellsToShow) != Object.toJSON(newCellsToShow)){
			
			if(this.pars.useCache){
				var dropCells = []
				for(var i=0; i<this.cellsToShow.length; i++){
					if(!newCellsToShow.any(function(a){return Object.toJSON(a) == Object.toJSON(this)}.bind(this.cellsToShow[i])))
						dropCells.push(this.cellsToShow[i])
				}
				if(dropCells.length > 0){
					this.dropCells(dropCells)
				}
			}
			
			var addCells = []
			for(var i=0; i<newCellsToShow.length; i++){
				if(!this.cellsToShow.include(function(a){return Object.toJSON(a) == Object.toJSON(this)}.bind(newCellsToShow[i])))
					if(this.pars.useCache || (!this.pars.useCache && !(this.cellCache[(newCellsToShow[i][0] + '_' + newCellsToShow[i][1])]))){
						addCells.push(newCellsToShow[i])
					}
			}
			if(addCells.length > 0){
				this.addCells(addCells)
			}
			
			this.cellsToShow = newCellsToShow 
			this.element.fire(':page', {cellsInView: this.newCellsToShow})
		}
	}
    },
    
    dropCells: function(dropCells){
	dropCells.each(function(v){
		this.cellCache[(v[0]+'_'+v[1])].remove()
	}.bind(this))
	
	this.element.fire(':dropCells', {cells: dropCells})
    },
    
    addCells: function(addCells){
	
	addCells.each(function(v){
		
		if(this.cellCache[(v[0]+'_'+v[1])]){
			this.recHolder.insert(this.cellCache[(v[0]+'_'+v[1])])
		} else {
			
			this.cellCache[(v[0]+'_'+v[1])] = $(this.recHolder).e('div', 'bottom').setStyle({
				position: 'absolute',
				left: ((v[1]-1) * this.cellWidth) + 'px',
				top: ((v[0]-1) * this.cellHeight) + 'px',
				height: this.cellHeight + 'px',
				width: this.cellWidth + 'px'
			})
			
			if(this.pars.onCreateCell){
				this.pars.onCreateCell(this.cellCache[(v[0]+'_'+v[1])], v[0], v[1])
			}
			
			this.element.fire(':createCell', {cell: this.cellCache[(v[0]+'_'+v[1])], row: v[0], col: v[1]})
		}
	
	}.bind(this))
	
	this.element.fire(':addCells', {cells: addCells})
    }
});