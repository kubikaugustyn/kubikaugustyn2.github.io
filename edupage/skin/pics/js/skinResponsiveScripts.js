$j(document).ready(function($) {	
	var edubarMainSkin = null;
	if (!edubarMainSkin) edubarMainSkin = $('.edubarMainSkin').last();
	var zoom = edubarMainSkin.hasClass('blindFriendly') ? 2 : 1;
	var fixedSidebars = null;
	function initFixedHeaderWidth() {		
		if (!edubarMainSkin) edubarMainSkin = $('.edubarMainSkin').last();
		$('.skgd.skgdFixedHeader').each(function() {
			if ($(this).hasClass('fixed') || $(this).hasClass('forceFixed')) {				
				var left = $('.edubarMainSkin').first().offset().left/zoom;
				var right = ($(window).width() - ($('.edubarMainSkin').first().offset().left + $('.edubarMainSkin').first().outerWidth()))/zoom;
				$(this).css('left',left+'px');
				$(this).css('right',right+'px');
			} else {
				$(this).css('left','0');
				$(this).css('right','0');
			}
		});
		
		
		fixedSidebars = $('.skgd.skgdFixedSidebar').each(function() {
			if (!edubarMainSkin.hasClass('wmaxL1') || $(this).hasClass('forceFixed')) {				
				var left = edubarMainSkin.offset().left/zoom;
				var top = edubarMainSkin.offset().top/zoom;
				$(this).css('left',left+'px');
				$(this).css('top',top+'px');
			} 
		});
	}
	
	function initResponsiveDivs() {
		if (!edubarMainSkin) edubarMainSkin = $('.edubarMainSkin').last();
		var divs = edubarMainSkin; 		
		var ww = window.innerWidth;
		
		
		divs.toggleClass('wmaxL1', ww<=980 || edubarMainSkin.hasClass('blindFriendly')).toggleClass('wmaxL2', ww<=500 || edubarMainSkin.hasClass('blindFriendly'));		
	}
	
	function initFixedHeader() {		
		//if (!edubarMainSkin) edubarMainSkin = $('.edubarMainSkin').last();
		var fixedHeader = $('.skgd.skgdFixedHeader');	
		
		
		if (fixedHeader.length > 0) {
			var headerPos =  $('.edubarMainSkin').first().offset().top;			
			var offset = fixedHeader.offset();		
			offset.top = offset.top/zoom;
			offset.left = offset.left/zoom; 
			var s = '<div class="skgdFixedHeaderReplacement"></div>';
			fixedHeader.parent().find('.skgdFixedHeaderReplacement').remove();
			var headerReplacement = $(s).appendTo(fixedHeader.parent());
			headerReplacement.height(fixedHeader.outerHeight());
			$(window).off('scroll.skgdFixedHeader').on('scroll.skgdFixedHeader',function() {				
					
				
				var posY = $(window).scrollTop();
				var isFixed = offset.top < posY+headerPos;
				
				
				if (fixedHeader.hasClass('forceFixed')) isFixed = true;			
					
				fixedHeader.toggleClass('fixed',isFixed);
			
				fixedHeader.css('top',isFixed ? ((headerPos*(1/zoom))+'px') : '');
				headerReplacement.toggle(isFixed);
				initFixedHeaderWidth();
				if (isFixed) {
					fixedHeader.find('.skgdSubmenuDiv').css('max-height',(($(window).innerHeight()-fixedHeader.outerHeight()-2)/(zoom))+'px');
				} else {				
					fixedHeader.find('.skgdSubmenuDiv').css('max-height','none');
				}							
			});
		}	
	}
	function reflowMasonry() {
		$('.skgdMasonryList').each(function() {
			var that = this;
			setTimeout(function() {
				$(that).css('width','');									
				$(that).masonry();
			}, 100);
		});
	}
	
	function initFullWidthContainers() {
		if (!edubarMainSkin) edubarMainSkin = $('.edubarMainSkin').last();
		var pageOffset = $(edubarMainSkin).offset();
		$('.skgdFullWidthContainer').each(function() {
			var offset = $(this).offset();			
			offset.left = pageOffset.left;
			
			var w = $(edubarMainSkin).width();
			if (!edubarMainSkin.hasClass('wmaxL1') && fixedSidebars && fixedSidebars.length > 0) {
				var fw = fixedSidebars.first().width();
				w = w - fw;
				offset.left += fw;
			}
			$(this).css('width',w/zoom);
			$(this).offset(offset);			
		});
	}
		
	function initElements() {
		var origW = $(window).width(); 
		$(window).off('resize.skgdResponsive').on('resize.skgdResponsive',function() {
			if ($(window).width() == origW) return;		
			origW = $(window).width()
			
			initResponsiveDivs();
			
			initFixedHeaderWidth();
			
			
			
			reflowMasonry();
			
			initFullWidthContainers();
		});
		
		
		$('.skgd.menub').each(function() {
			if (!$(this).data('responsiveMenuSkinGadget')) {
				$(this).responsiveMenuSkinGadget({});
			}
		});
		
		$('.skgd.menu .skgdToggleMenuBtn').off('click.skgdResponsive').on('click.skgdResponsive',function(event) {
			event.stopPropagation();
			var menuElem = $(this).closest('.skgd.menu');
			
			if (menuElem.hasClass('opened')) {
				closeMenu(menuElem);
			} else {
				var origWindowWidth = $(window).width();
				menuElem.toggleClass('opened',true);
				menuElem.find('.skgdToggleMenu').toggleClass('nav_submenuSliding', true);				
				menuElem.find('.skgdToggleMenu .menuOpen').toggleClass('menuOpen_x',true).toggleClass('menuOpen',false);
				$(document).on('click.skgdMenu',function(event) {				
					if ($(event.target).closest('.skgd.menu').attr('id') != menuElem.attr('id')) {
						closeMenu(menuElem);
					}
				});
				$(window).on('resize.skgdMenu',function() {
					if (origWindowWidth != $(window).width()) {					
						closeMenu(menuElem);
					}
				});
			}
			
			function closeMenu(menuElem) {			
				menuElem.toggleClass('opened',false);
				menuElem.find('.skgdToggleMenu').toggleClass('nav_submenuSliding', false).toggleClass('menuOpen',true);
				menuElem.find('.skgdToggleMenu .menuOpen_x').toggleClass('menuOpen_x',false).toggleClass('menuOpen',true);				
				$(document).off('click.skgdMenu');
				$(window).off('resize.skgdMenu');
			}		
		});
		
		$('.skgd.vmenu .skgdSubmenuNoLink > a').off('click.skgdResponsive').on('click.skgdResponsive',function(event) {
			var li = $(this).closest('.skgdSubmenuNoLink').get(0);
			var ul = $(li).closest('ul');				
			var cls1 = ul.attr('data-cls1');
			var cls2 = ul.attr('data-cls2');
			ul.children('li').each(function() {
				var that = this;
				if (this == li && !$(this).hasClass('opened')) {
					
					$(that).children('ul').show('fast',function() {
						$(that).toggleClass('opened',true);						
						$(that).find(' > a > i.submenuIconIndicator').toggleClass('fa-'+cls1,false).toggleClass('fa-'+cls2,true);
					});				
				} else {
					$(that).children('ul').hide('fast', function() {
						$(that).toggleClass('opened',false);
						$(that).find(' > a > i.submenuIconIndicator').toggleClass('fa-'+cls1,true).toggleClass('fa-'+cls2,false);
					});		
				}
			});	
			
		});
		
		$('.skgdMasonryList').each(function() {
			var that = this;
			var origMargin = 'auto';
			$(this).imagesLoaded( function() {							
	 			$(that).masonry({
					itemSelector: 'li.skgdLi',		
					percentPosition: false,
					transitionDuration: 0,
					fitWidth: false		
				});				
			});			
		});
		
		
		$('.skgdFitText').each(function() {
			var overlow = $(this).css('overflow');		
			$(this).css('overflow','auto');	
			var ww = $(this).outerWidth();
			var cw = this.scrollWidth;
			
			var wh = $(this).outerHeight();
			var ch = this.scrollHeight;
			
			var fs = parseFloat($(this).css('font-size').replace('px',''));
			
			var fitWidth = $(this).hasClass('skftfitWidth') || $(this).hasClass('skftfitBoth');
			var fitHeight = $(this).hasClass('skftfitHeight') || $(this).hasClass('skftfitBoth');
			function isOk(cw, ww, ch, wh) {
				if (fitWidth && cw > ww) return false;
				if (fitHeight && ch > wh) return false;
				return true;
			}
			
			var i = 0;							
			while (i < 20 && fs > 7 && !isOk(cw, ww, ch, wh)) {
				fs = fs-1;
				$(this).css('font-size',(fs).toFixed(2)+'px');
				
				var ww = $(this).outerWidth();
				var cw = this.scrollWidth;
				var wh = $(this).outerHeight();
				var ch = this.scrollHeight;
				
				if (isOk(cw, ww, ch, wh)) break;
				i++;
			}
			$(this).css('overflow',overlow);
		});
		
		var edubarMainSkinHeight = edubarMainSkin.height();
		var edubarMainSkinWidth = edubarMainSkin.width();
		$('.skgdChangeFontSize').off('click.skgdResponsive').on('click.skgdResponsive',function() {
			
			var add = $(this).attr('data-change')*1;
			var zoomInd = edubarMainSkin.data('zoomInd') ? edubarMainSkin.data('zoomInd') : 0;
			var zooms = [1, 1.5, 2, 2.5];
			zoomInd += add;
			zoomInd = Math.max(0,Math.min(zooms.length-1, zoomInd));
			edubarMainSkin.data('zoomInd', zoomInd);
			edubarMainSkin.data('zoomVal', zooms[zoomInd]);
			
			
			
			edubarMainSkin.css('font-size', zooms[zoomInd].toFixed(1)+'em');
			edubarMainSkin.toggleClass('fontResized',zoomInd != 0);
			/*$('#skin_main').css('transform', 'scale('+zooms[zoomInd].toFixed(1)+')');
				
			edubarMainSkin.css('min-height',zooms[zoomInd] == 1 ? '' : Math.round(edubarMainSkinHeight*zooms[zoomInd])+'px');
			
			edubarMainSkin.css('overflow-x',zoomInd == 0 ? '' : 'auto');
			edubarMainSkin.scrollLeft((edubarMainSkin.get(0).scrollWidth - edubarMainSkin.width())/2);		*/
		});
		
		
		
		
		edubarMainSkin.find('.edupage-gallery-link').off('click.skgdResponsive').on('click.skgdResponsive',function() {
			var itemElem = $(this);
			var albumid = itemElem.attr('data-albumid');
			var dirid = itemElem.attr('data-dirid');
			var id = itemElem.attr('data-id');
			 
			SkinResponsive.openGallery(albumid, dirid, id);	
		});
		
		
		edubarMainSkin.find('.edupage-image-link').off('click.skgdResponsive').on('click.skgdResponsive',function() {
			var itemElem = $(this);			
			var id = itemElem.attr('data-id');
			
			var ids = []
			
			$(this).closest('.erte-photos').find(".edupage-image-link").each(function() {
				ids.push($(this).attr('data-id'));	
			});
			
			
			 
			SkinResponsive.openGallery('clipart', '', id, ids);	
		});
		
		
		initFullWidthContainers();
		
	}
	
	$(document).on('skinUpdated',function() {
		initFixedHeaderWidth();
		initResponsiveDivs();
		initFixedHeader();
		initElements();	
		reflowMasonry();
		
	});
	initFixedHeaderWidth();
	initResponsiveDivs();
	initFixedHeader();
	initElements();	
});

var SkinResponsive = {};
SkinResponsive.lightboxSkinGadget = function($) {
	$.widget('edupage.lightboxskingadget', {
		options: {		
			
		},
		popupBg: null,	
		popupElem: null,	
		mainDiv: null,
		_create: function() {
			var self = this;		
			this.initProperties({});		
			this.createContent();				
		},			
		initProperties: function(obj) {
			for (var x in obj) {
				this.options[x] = obj[x];
			}					
		},	
		createContent: function() {			
			var self = this;
			
			this.mainDiv = this.element.closest('.edubarMainSkin').last();
			
			
			this.element.on('click', function(event) {				
			
				
				if (typeof SkinUtils == 'undefined' 
					|| !SkinUtils.pageEditor || SkinUtils.pageEditor.selectedGadgetid == self.element.attr('id')) {
					event.preventDefault();
					event.stopPropagation();
					self.openPopup(true);
				}
			});
			
			if (this.element.hasClass('popupOpened')) {
				this.openPopup();
			}
			
			this.element.find('.skgdLightboxPopup').on('childSelected',function() {
				self.openPopup();
			}).on('selectedGadget',function() {
				self.openPopup();
			});
						
		},		
		preparePopup: function() {
			var self = this;
			var s = '<div class="skgdLightboxBg">';
			s += '<div class="skgdPopupBox0">';
				s += '<div class="skgdPopupBoxTitle">'; 
					s += '<h1></h1>';
					s += '<a class="skgdPopupCloseBtn"><img src="/user/pics/ic_action_cancel.png" alt=""></a>';
				s += '</div>';
				s += '<div class="skgdPopupBox1 skgd"></div>';
			s += '</div>';
			s += '</div>';			
			this.popupBg = $(s).appendTo(this.mainDiv);		
			this.popupBg.find('.skgdPopupCloseBtn').click(function() {
				self.closePopup();
			});		
			
			this.popupBg.click(function(event) {				
				if (event.target == event.currentTarget || $(event.target).hasClass('skgdPopupBoxTitle')) {
					self.closePopup();
				}
			});	
		},
		openPopup: function(animate) {	
			var self = this;						
			var popupElem = this.element.find('.skgdLightboxPopup');			
			if (popupElem.length == 0) return;
			
			this.popupElem = popupElem;
			
			if (!this.popupBg) {
				this.preparePopup();
			}
			this.popupBg.find('.skgdPopupBox1').append(this.popupElem);
			
			if (animate) {
				this.popupBg.fadeIn('slow');
				this.popupElem.fadeIn('slow');
								
			} else {
				this.popupBg.show();
				this.popupElem.show();
			
			}
			this.resize(true);
			this.popupElem.find('.skgd').trigger('popupOpened');
			this.resize();
			this.element.toggleClass('popupOpened', true);
			
			
			$(window).off('resize.popup'+this.element.attr('id')).on('resize.popup'+this.element.attr('id'), function() {
				self.popupElem.css('width','');
				self.popupElem.css('height','');
				self.resize();
			});			
		},
		closePopup: function() {						
			this.popupElem.hide();
			this.popupBg.hide();
			this.element.append(this.popupElem);
			
			this.element.toggleClass('popupOpened', false);	
			this.popupElem.find('.skgd').trigger('popupClosed');				
		},
	    resize: function(skipMaxCheck) {
	    	var popupBox = this.popupBg.find('.skgdPopupBox0');	    	
	    	var maxw = this.mainDiv.width()*0.9;
	    	var maxh = $(window).height()*0.9-100;
	    	
	    	var w = this.popupElem.width();
	    	var h = this.popupElem.height();
	    		    	
		    if (w > maxw) {
	    		 this.popupElem.width(maxw);
	    	}
	    	if (!skipMaxCheck) {
	    		if (h > maxh) {
	    			this.popupElem.height(maxh);
	    		}
	    	}
	    		
	    	
	    	popupBox.width(this.popupElem.width());
	    	popupBox.height(this.popupElem.height()+60);
	    	var pos = {
	    		left: ($(window).width()-popupBox.outerWidth())/2,
	    		top: ($(window).height()-popupBox.outerHeight()-100)/2
	    	};
	    	popupBox.css('left',pos.left+'px');
	    	popupBox.css('top',pos.top+'px');
	    }
		
	});
}
SkinResponsive.lightboxSkinGadget(jQuery);

SkinResponsive.responsiveMenuSkinGadget = function($) {
	$.widget('edupage.responsiveMenuSkinGadget', {
		options: {		
			
		},
		submenuItems: null,	
		hideMenuTimeout: null,
		showMenuTimeout: null,
		miniMode: false,	
		fixedHeader: null,
		menuDiv: null,
		isMenuShown: false,
		menuMode: '',
		_create: function() {		
			$(this).data('responsiveMenuSkinGadget', this);
			var self = this;					
			
			self.menuMode = '';
			if (this.element.hasClass('sidebar')) {
				self.menuMode = 'sidebar';
			}
			
			
			
			this.fixedHeader = this.element.closest('.skgdFixedHeader');
			this.menuDiv = this.element.find('.skgdFullMenu');
			
			this.submenuItems = this.element.find('.skgdMenuItem.hasSubmenu');
			this.submenuItemLinks = this.submenuItems.find('.skgdMenuItemLink');
			
			
			this.initSubmenuItemsLinks(this.submenuItemLinks);
			
			
			this.submenuItems.hover(function() {
				var that = this;		
				if (self.miniMode) return;		
				if (self.hideMenuTimeout) {clearTimeout(self.hideMenuTimeout);}
				if (self.showMenuTimeout) {clearTimeout(self.showMenuTimeout);}		
				if (self.isMenuShown) {		
					self.toggleMenu($(that), true);
				} else {
					self.showMenuTimeout = setTimeout(function() {					
						self.toggleMenu($(that), true);
					},300);
				}
			},function() {
				var that = this;
				if (self.miniMode) return;
				if (self.hideMenuTimeout) {clearTimeout(self.hideMenuTimeout);}
				if (self.showMenuTimeout) {clearTimeout(self.showMenuTimeout);}				
				self.hideMenuTimeout = setTimeout(function() {					
					self.toggleMenu($(that), false);
				},300);
			});
			
			this.element.find('.skgdMiniMenuLink').click(function() {
				self.toggleMiniMenu();
			});				
			
			
			var sideMenuBtn = this.element.find('.skgdSideMenuOpenBtn');
			if (!this.edubarMainSkin) this.edubarMainSkin = $('.edubarMainSkin').last();
			this.sideMenuBtn = sideMenuBtn;
			sideMenuBtn.appendTo(this.edubarMainSkin.find('.skgdContainer').first().parent());
			sideMenuBtn.removeAttr('tabindex');
			sideMenuBtn.click(function() {
				self.toggleSideMenu(true);
			});
			
			if (sessionStorage.getItem('skgdSideMenuVis') == '1') {
				self.toggleSideMenu(false);
			}
		},
		initSubmenuItemsLinks: function(submenuItemLinks) {
			var self = this;
			submenuItemLinks.disableSelection();
			submenuItemLinks.click(function() {
				var menuItem = $(this).closest('.skgdTopMenuItem');
				
				if (self.isMenuShown 
					&& self.isMenuShown.item.get(0) == menuItem.get(0)
					&& self.isMenuShown.since < (new Date()).getTime()-1000) {
					self.toggleMenu(menuItem, false);
				} else {
					self.toggleMenu(menuItem, true);
				}
				
			});
			
			submenuItemLinks.on('keydown',function(event) {				
				if (event.which == 13) {
					$(this).click();
				}
			});
		},
		toggleSideMenu: function(animation) {
			if (!this.edubarMainSkin) this.edubarMainSkin = $('.edubarMainSkin').last();
			
			var self = this;
			if (!this.sideMenuElem) {
				var ss = this.element.find('.skgdFullMenu').html();
				var s = '';
				
				ss = EdubarUtils.strtr(ss, {
						'skgd': 'skgd-sb-'
					 });
				
				
				s += '<div class="skgd-menu-sidebar">';
				
				var s3 = '';
				s3 += '<div class="skgd-menu-sidebar-logo">';
					s3 += '<a class="skgdSideMenuOpenBtn2">';
						s3 += '<i class="fa fa-fw fa-remove"></i>';
					s3 += '</a>';
					
					if (self.options.editable) {
						s3 += '<a class="skgdSideMenuEdit" title="{#1474}: {#2339}">';
							s3 += '<i class="fa fa-fw fa-pencil"></i>';
						s3 += '</a>';
					}
				s3 += '</div>';
				
				s += renderS(s3, {
						opts: this.options
					});
				
				s += '<ul class="level0">';
				s += ss;
				s += '</ul>';
				s += '</div>';
				
				this.sideMenuElem = $(s).appendTo(this.element);
				this.sideMenuElem.find('.skgdSideMenuOpenBtn2').click(function() {
					self.toggleSideMenu(true);
				});
				
				var menuItems = this.sideMenuElem.find('.skgd-sb-MenuItem');
				var submenuItems = this.sideMenuElem.find('.skgd-sb-MenuItem.hasSubmenu');
			 	var submenuItemLinks = submenuItems.find('.skgd-sb-MenuItemLink');
			 	
			 	submenuItemLinks.disableSelection();
			 	var ind = 0;
			 	submenuItemLinks.each(function() {
			 		$(this).data('linkIndex',ind);
			 		
			 		var sesitem = sessionStorage.getItem('skgdSubmenuVis'+$(this).data('linkIndex'));
			 		var opened = sesitem == '1';
			 		if (!opened && sesitem !== '0' && ind == 0 && menuItems.length < 10) {
			 			opened = true;
			 		}
			 		
			 		if (opened) {
			 			var menuItem = $(this).closest('.skgd-sb-TopMenuItem');
			 			var pomelem = menuItem.find('.skgd-sb-SubmenuDiv2');
			 			pomelem.show();
			 		}
			 		ind++;
			 	});
				submenuItemLinks.click(function() {
					var menuItem = $(this).closest('.skgd-sb-TopMenuItem');
					var pomelem = menuItem.find('.skgd-sb-SubmenuDiv2');
					sessionStorage.setItem('skgdSubmenuVis'+$(this).data('linkIndex'),(pomelem.is(':visible') ? '0' : '1'));
					
					pomelem.slideToggle();					
				});
				
				submenuItemLinks.on('keydown',function(event) {				
					if (event.which == 13) {
						$(this).click();
					}
				});
				
				this.sideMenuElem.on('scroll',function() {					
					sessionStorage.setItem('skgdSideMenuScroll', $(this).scrollTop());
				});
				
				if (this.options.editable) {
					this.sideMenuElem.find('.skgdSideMenuEdit').click(function() {
						barNewDialog({
							source: '/customize/modules.php'
						})
					});
				}
				
				this.resizeSideMenu();
				
				$(window).off('resize.skgdSideMenu').on('resize.skgdSideMenu',function() {
					
					self.resizeSideMenu();
				});
				
				$(document).off('skinUpdated.skgdSideMenu').on('skinUpdated.skgdSideMenu',function() {
					self.resizeSideMenu();
				});
			}
			
			var vis = this.sideMenuElem.is(':visible');
			
			this.element.find('.skgdSideMenuOpenBtn i').toggleClass('fa-bars',vis).toggleClass('fa-close',!vis);
			sessionStorage.setItem('skgdSideMenuVis',(vis  ? '0' : '1'));
			
			if (animation) {
				if (!vis) {
					this.sideMenuBtn.css('display',vis ? '' : 'none');
				} 
				this.edubarMainSkin.toggleClass('skgdSideMenuOpened', (vis  ? false : true), 200)
				this.sideMenuElem.css('margin-'+ertl('left','right'),vis ? '0' : '-300px');
				var anp = {};
				anp['margin-'+ertl('left','right')] = vis ? -300 : 0;
				this.sideMenuElem.animate(anp, {
					start: function() {
						
						if (!vis) {
							$(this).show();
						}
					},
					duration: 200,
					done: function() {
						if (vis) {
							$(this).hide();
						}
						$(document).trigger('skinUpdated');
						self.sideMenuBtn.css('display',vis ? '' : 'none');
					}
				});
			} else {
				this.sideMenuBtn.css('display',vis ? '' : 'none');
				this.sideMenuElem.css('margin-'+ertl('left','right'),'0');
				this.edubarMainSkin.toggleClass('skgdSideMenuOpened', (vis  ? false : true))				
				this.sideMenuElem.toggle();
				if (sessionStorage.getItem('skgdSideMenuScroll')) {				
					this.sideMenuElem.scrollTop(sessionStorage.getItem('skgdSideMenuScroll'));
				}
				$(document).trigger('skinUpdated');
			}			
		},
		resizeSideMenu: function() {
			if (!this.sideMenuElem) return;
			if (!this.edubarMainSkin) this.edubarMainSkin = $('.edubarMainSkin').last();
			
			var mo = this.edubarMainSkin.offset();
			var ml = this.edubarMainSkin.css('margin-left').replace('px','')*1;
			this.sideMenuElem.css('top',mo.top);
			this.sideMenuElem.css('left',mo.left-ml);
		},
		toggleMenu: function(menuItem, val) {
			if (self.hideMenuTimeout) {clearTimeout(self.hideMenuTimeout);}			
			var isOpened = menuItem.hasClass('opened');
			if (isOpened && val === true) return;
						
			if (this.isMenuShown && !isOpened && val !== false) {
				this.submenuItems.find('.skgdSubmenuDiv2').hide();
			} else {
				this.submenuItems.find('.skgdSubmenuDiv2').fadeOut('fast');
			}
			this.submenuItems.toggleClass('opened', false);
			if (!isOpened && val !== false) {
				
				
				if (this.isMenuShown) {
					menuItem.find('.skgdSubmenuDiv2').show();
				} else {
					menuItem.find('.skgdSubmenuDiv2').fadeIn('fast');
				}				
				menuItem.toggleClass('opened', true);
			}
			this.isMenuShown = val ? {since: (new Date()).getTime(), item: menuItem} : false;
		},
		toggleMiniMenu: function(val) {		
			var self  = this;				
			var fixedHeader = this.fixedHeader;			
			var menuDiv = this.menuDiv;			
			var isOpened = menuDiv.hasClass('opened');
			if (val !== false && val !== true) val = !isOpened;			
			menuDiv.toggleClass('opened', val);
			this.miniMode = val;
			
			if (val) {							
				this.element.find('.skgdSubmenuDiv').toggleClass('skgdSubmenuDivMini', true).toggleClass('skgdSubmenuDiv', false);				
				
				
				this.element.find('.skgdMiniMenuLink i').toggleClass('fa-bars', false).toggleClass('fa-close',true);
				if (this.fixedHeader.length > 0) {
					this.fixedHeader.toggleClass('fixed', true).toggleClass('forceFixed',true);				
				}  else {
					this.element.toggleClass('fixedMode', true);
				}		
				
				$('body').css('overflow','hidden');		
				this.resizeMiniMenu();				
				
				$(window).off('resize.skgdMiniMenu').on('resize.skgdMiniMenu',function() {
					if (window.innerWidth > 980) {
						self.toggleMiniMenu(false);
						return;
					}
					
					self.resizeMiniMenu();
				});
				$(window).scroll();
			} else {
				$('body').css('overflow','');
				this.element.find('.skgdSubmenuDivMini').toggleClass('skgdSubmenuDiv', true).toggleClass('skgdSubmenuDivMini', false);
				$(window).off('resize.skgdMiniMenu');
				
				if (fixedHeader.length > 0) {
					fixedHeader.toggleClass('forceFixed',false);
					$(window).scroll();
				} else {
					this.element.toggleClass('fixedMode', false);
				}
				menuDiv.css('height','');
				menuDiv.css('width','');
				menuDiv.css('left','');				
				this.element.find('.skgdMiniMenuLink i').toggleClass('fa-close', false).toggleClass('fa-bars',true);
			}
		},
		
		resizeMiniMenu: function() {
			if (!this.edubarMainSkin) this.edubarMainSkin = $('.edubarMainSkin').last();
			if (this.element.hasClass('sidebar')) return;
			var zoom = this.edubarMainSkin.hasClass('blindFriendly') ? 2 : 1;	
			
			if (!this.edubarMainSkin) this.edubarMainSkin = $('.edubarMainSkin').last();
			
			var mo = this.edubarMainSkin.offset();
			
					
			var offset =  this.menuDiv.offset()
			var h = $(window).height()-offset.top;
			if (this.fixedHeader.length > 0) {				
				h = $(window).innerHeight()-this.fixedHeader.outerHeight()*zoom;
			}  else {				
				h = $(window).innerHeight()-this.element.outerHeight()*zoom;
			}
			this.menuDiv.outerHeight(h/zoom);
			
			offset.left = mo.left;
			this.menuDiv.offset(offset);
			this.menuDiv.outerWidth(($(window).innerWidth()-offset.left)/zoom);
		}
	});
}
SkinResponsive.responsiveMenuSkinGadget(jQuery);

SkinResponsive.accordionMenuSkinGadget = function($) {
	$.widget('edupage.accordionMenuSkinGadget', {
		options: {		
			
		},
		submenuItems: null,	
		hideMenuTimeout: null,
		showMenuTimeout: null,
		miniMode: false,	
		fixedHeader: null,
		menuDiv: null,
		isMenuShown: false,
		_create: function() {		
			var self = this;					
			this.submenuItems = this.element.find('.skgdMenuItem.hasSubmenu');
			this.submenuItemLinks = this.submenuItems.find('.skgdMenuItemLink');
			
			this.fixedHeader = this.element.closest('.skgdFixedHeader');
			this.menuDiv = this.element.find('.skgdFullMenu');
			this.submenuItemLinks.disableSelection();
			this.submenuItemLinks.click(function() {				
				var menuItem = $(this).closest('.skgdTopMenuItem');
				
				if (self.isMenuShown 
					&& self.isMenuShown.item.get(0) == menuItem.get(0)
					&& self.isMenuShown.since < (new Date()).getTime()-1000) {
					self.toggleMenu(menuItem, false);
				} else {
					self.toggleMenu(menuItem, true);
				}
			});
			
			this.submenuItemLinks.on('keydown',function(event) {				
				if (event.which == 13) {
					$(this).click();
				}
			});
			
			this.submenuItems.hover(function() {
				var that = this;		
				if (self.miniMode) return;		
				if (self.hideMenuTimeout) {clearTimeout(self.hideMenuTimeout);}
				if (self.showMenuTimeout) {clearTimeout(self.showMenuTimeout);}		
				if (self.isMenuShown) {		
					self.toggleMenu($(that), true);
				} else {
					self.showMenuTimeout = setTimeout(function() {					
						self.toggleMenu($(that), true);
					},300);
				}
			},function() {
				var that = this;
				if (self.miniMode) return;
				if (self.hideMenuTimeout) {clearTimeout(self.hideMenuTimeout);}
				if (self.showMenuTimeout) {clearTimeout(self.showMenuTimeout);}				
				self.hideMenuTimeout = setTimeout(function() {					
					self.toggleMenu($(that), false);
				},300);
			});
			
			this.element.find('.skgdMiniMenuLink').click(function() {
				self.toggleMiniMenu();
			});				
		},
		toggleMenu: function(menuItem, val) {
			if (self.hideMenuTimeout) {clearTimeout(self.hideMenuTimeout);}			
			var isOpened = menuItem.hasClass('opened');
			if (isOpened && val === true) return;
						
			if (this.isMenuShown && !isOpened && val !== false) {
				this.submenuItems.find('.skgdSubmenuDiv').hide();
			} else {
				this.submenuItems.find('.skgdSubmenuDiv').fadeOut('fast');
			}
			this.submenuItems.toggleClass('opened', false);
			if (!isOpened && val !== false) {
				
				
				if (this.isMenuShown) {
					menuItem.find('.skgdSubmenuDiv').show();
				} else {
					menuItem.find('.skgdSubmenuDiv').fadeIn('fast');
				}				
				menuItem.toggleClass('opened', true);
			}
			this.isMenuShown = val ? {since: (new Date()).getTime(), item: menuItem} : false;
		},
		toggleMiniMenu: function(val) {		
			var self  = this;				
			var fixedHeader = this.fixedHeader;			
			var menuDiv = this.menuDiv;
			
			var isOpened = menuDiv.hasClass('opened');
			if (val !== false && val !== true) val = !isOpened;			
			menuDiv.toggleClass('opened', val);
			this.miniMode = val;
			
			if (val) {							
				this.element.find('.skgdSubmenuDiv').toggleClass('skgdSubmenuDivMini', true).toggleClass('skgdSubmenuDiv', false);				
				
				
				this.element.find('.skgdMiniMenuLink i').toggleClass('fa-bars', false).toggleClass('fa-close',true);
				if (this.fixedHeader.length > 0) {
					this.fixedHeader.toggleClass('fixed', true).toggleClass('forceFixed',true);				
				}  else {
					this.element.toggleClass('fixedMode', true);
				}
				
				this.resizeMiniMenu();				
				
				$(window).off('resize.skgdMiniMenu').on('resize.skgdMiniMenu',function() {
					if (window.innerWidth > 980) {
						self.toggleMiniMenu(false);
						return;
					}
					
					self.resizeMiniMenu();
				});
			} else {
				this.element.find('.skgdSubmenuDivMini').toggleClass('skgdSubmenuDiv', true).toggleClass('skgdSubmenuDivMini', false);
				$(window).off('resize.skgdMiniMenu');
				
				if (fixedHeader.length > 0) {
					fixedHeader.toggleClass('forceFixed',false);
					$(window).scroll();
				} else {
					this.element.toggleClass('fixedMode', false);
				}
				menuDiv.css('height','');
				menuDiv.css('width','');
				menuDiv.css('left','');				
				this.element.find('.skgdMiniMenuLink i').toggleClass('fa-close', false).toggleClass('fa-bars',true);
			}
		},
		resizeMiniMenu: function() {
			var offset =  this.menuDiv.offset()
			var h = $(window).height()-offset.top;
			if (this.fixedHeader.length > 0) {				
				h = $(window).innerHeight()-this.fixedHeader.outerHeight();
			}  else {				
				h = $(window).innerHeight()-this.element.outerHeight();
			}
			this.menuDiv.outerHeight(h);
			
			offset.left = 0;
			this.menuDiv.offset(offset);
			this.menuDiv.width($(window).innerWidth());
		}
	});
}
SkinResponsive.responsiveMenuSkinGadget(jQuery);

SkinResponsive.openGallery = function(albumid, galleryid, fileid, files) {		
	
	if (MobileAppBridge.isV2Active()) {
		EdupageApp.pushReactComponentView("/app/pics/jsw/views/noticeboard/GalleryView.js",{
			albumid: albumid,
			galleryid: galleryid,
			fileid: fileid, 
			files: files,
			noTransitions: true
		})
		return;
	}

	if (window.edupageOpenedGallery == albumid+':'+galleryid) {
		return;
	}

	if (MobileAppBridge.isActive() && !MobileAppBridge.isIOS()) {
		if ($(window).width() > $(window).height()) {
			window.ascFullscreenOpened = true;
			MobileAppBridge.runFlexMethod('fullScreenOpen',[]);
			
		}	
	}
	
	var elements =  [];
	inner = false;
	var parentElem = !inner ? $j('body') : elem;

	var origScrollTop = $(window).scrollTop();
	
	$j(parentElem).children().each(function() {
		if ($j(this).is(':visible')) {							
			elements.push({elem: $j(this), display: $j(this).css('display')});
			$j(this).css('display','none');
		}
	});
	var $div = $j('<div class="photos-galleryWindow photos-outerWindow '+et(MobileAppBridge.isActive() ? 'photos-galleryWindow-mobile' : '')+'"></div>').appendTo(parentElem);
	
	fileid = fileid ? fileid : ''
	
	var postData = {};
	if (files) {
		postData['files'] = files.join(';');
	}
	$j.post('/photos/?jwgc=EdupageGalleryViewer&photo='+albumid+'&gallery='+galleryid+'&fileid='+fileid, postData, function(data) {              
     	if (data != '') {
			$div.html(data);
			if (!MobileAppBridge.isActive()) { 
				 $div.css('background-image','none');            			                                             
			}
        }                         
    }); 
    shownGalleryDialog = $div;
    
    $div.on('remove',function() {			    	        			
		window.location.hash = '';
		shownGalleryDialog = null;
		for (var i=0;i<elements.length;i++) {
			elements[i].elem.css('display', elements[i].display);
		}

		$(window).scrollTop(origScrollTop);
	});					
    return $div;
}

function AscMasonry() {


	/*!
	* Masonry PACKAGED v4.0.0
	* Cascading grid layout library
	* http://masonry.desandro.com
	* MIT License
	* by David DeSandro
	*/

	!function(t,e){"use strict";"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,a){function h(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,h){var u=a.data(h,i);if(!u)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var d=u[e];if(!d||"_"==e.charAt(0))return void s(r+" is not a valid method");var c=d.apply(u,n);o=void 0===o?c:o}),void 0!==o?o:t}function u(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return h(this,t,e)}return u(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}(this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||[];return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;u>e;e++){var i=h[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);r.isBoxSizeOuter=s=200==t(o.width),i.removeChild(e)}}function r(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var r=n(e);if("none"==r.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==r.boxSizing,c=0;u>c;c++){var l=h[c],f=r[l],m=parseFloat(f);a[l]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,y=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,E=a.borderTopWidth+a.borderBottomWidth,z=d&&s,b=t(r.width);b!==!1&&(a.width=b+(z?0:p+_));var x=t(r.height);return x!==!1&&(a.height=x+(z?0:g+E)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(g+E),a.outerWidth=a.width+y,a.outerHeight=a.height+v,a}}var s,a="undefined"==typeof console?e:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],u=h.length,d=!1;return r}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i||100)}},i.docReady=function(t){"complete"==document.readyState?t():document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var r=i.toDashed(o),s="data-"+r,a=document.querySelectorAll("["+s+"]"),h=document.querySelectorAll(".js-"+r),u=i.makeArray(a).concat(i.makeArray(h)),d=s+"-options",c=t.jQuery;u.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(d);try{i=r&&JSON.parse(r)}catch(a){return void(n&&n.error("Error parsing "+s+" on "+t.className+": "+a))}var h=new e(t,i);c&&c.data(t,o,h)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t,t.EvEmitter,t.getSize))}(window,function(t,e,i){"use strict";function n(t){for(var e in t)return!1;return e=null,!0}function o(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function r(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var s=document.documentElement.style,a="string"==typeof s.transition?"transition":"WebkitTransition",h="string"==typeof s.transform?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[a],d=[h,a,a+"Duration",a+"Property"],c=o.prototype=Object.create(e.prototype);c.constructor=o,c._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},c.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},c.getSize=function(){this.size=i(this.element)},c.css=function(t){var e=this.element.style;for(var i in t){var n=d[i]||i;e[n]=t[i]}},c.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],r=this.layout.size,s=-1!=n.indexOf("%")?parseFloat(n)/100*r.width:parseInt(n,10),a=-1!=o.indexOf("%")?parseFloat(o)/100*r.height:parseInt(o,10);s=isNaN(s)?0:s,a=isNaN(a)?0:a,s-=e?r.paddingLeft:r.paddingRight,a-=i?r.paddingTop:r.paddingBottom,this.position.x=s,this.position.y=a},c.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",r=i?"left":"right",s=i?"right":"left",a=this.position.x+t[o];e[r]=this.getXValue(a),e[s]="";var h=n?"paddingTop":"paddingBottom",u=n?"top":"bottom",d=n?"bottom":"top",c=this.position.y+t[h];e[u]=this.getYValue(c),e[d]="",this.css(e),this.emitEvent("layout",[this])},c.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},c.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},c._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,h=e-n,u={};u.transform=this.getTranslate(a,h),this.transition({to:u,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},c.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},c.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},c.moveTo=c._transitionTo,c.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},c._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},c._transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+r(d.transform||"transform");c.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:l,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(u,this,!1))},c.transition=o.prototype[a?"_transition":"_nonTransition"],c.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},c.onotransitionend=function(t){this.ontransitionend(t)};var f={"-webkit-transform":"transform"};c.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,i=f[t.propertyName]||t.propertyName;if(delete e.ingProperties[i],n(e.ingProperties)&&this.disableTransition(),i in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[i]),i in e.onEnd){var o=e.onEnd[i];o.call(this),delete e.onEnd[i]}this.emitEvent("transitionEnd",[this])}},c.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},c._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var m={transitionProperty:"",transitionDuration:""};return c.removeTransitionStyles=function(){this.css(m)},c.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},c.remove=function(){return a&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},c.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},c.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},c.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},c.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},c.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},c.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function r(t,e){var i=n.getQueryElement(t);if(!i)return void(a&&a.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++d;this.element.outlayerGUID=o,c[o]=this,this._create();var r=this._getOption("initLayout");r&&this.layout()}function s(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}var a=t.console,h=t.jQuery,u=function(){},d=0,c={};r.namespace="outlayer",r.Item=o,r.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var l=r.prototype;return n.extend(l,e.prototype),l.option=function(t){n.extend(this.options,t)},l._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},r.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},l._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},l.reloadItems=function(){this.items=this._itemize(this.element.children)},l._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var r=e[o],s=new i(r,this);n.push(s)}return n},l._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},l.getItemElements=function(){return this.items.map(function(t){return t.element})},l.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},l._init=l.layout,l._resetLayout=function(){this.getSize()},l.getSize=function(){this.size=i(this.element)},l._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},l.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},l._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},l._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},l._getItemLayoutPosition=function(){return{x:0,y:0}},l._processLayoutQueue=function(t){t.forEach(function(t){this._positionItem(t.item,t.x,t.y,t.isInstant)},this)},l._positionItem=function(t,e,i,n){n?t.goTo(e,i):t.moveTo(e,i)},l._postLayout=function(){this.resizeContainer()},l.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},l._getContainerSize=u,l._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},l._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){s++,s==r&&i()}var o=this,r=e.length;if(!e||!r)return void i();var s=0;e.forEach(function(e){e.once(t,n)})},l.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),h)if(this.$element=this.$element||h(this.element),e){var o=h.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},l.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},l.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},l.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},l.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},l._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},l._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},l._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},l._manageStamp=u,l._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),r={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return r},l.handleEvent=n.handleEvent,l.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},l.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},l.onresize=function(){this.resize()},n.debounceMethod(r,"onresize",100),l.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},l.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},l.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},l.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},l.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},l.reveal=function(t){this._emitCompleteOnItems("reveal",t),t&&t.length&&t.forEach(function(t){t.reveal()})},l.hide=function(t){this._emitCompleteOnItems("hide",t),t&&t.length&&t.forEach(function(t){t.hide()})},l.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},l.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},l.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},l.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},l.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},l.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete c[e],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},r.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&c[e]},r.create=function(t,e){var i=s(r);return i.defaults=n.extend({},r.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},r.compatOptions),i.namespace=t,i.data=r.data,i.Item=s(o),n.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i},r.Item=o,r}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");return i.compatOptions.fitWidth="isFitWidth",i.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0},i.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,r=o/n,s=n-o%n,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},i.prototype.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},i.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this._getColGroup(n),r=Math.min.apply(Math,o),s=o.indexOf(r),a={x:this.columnWidth*s,y:r},h=r+t.size.outerHeight,u=this.cols+1-o.length,d=0;u>d;d++)this.colYs[s+d]=h;return a},i.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++){var o=this.colYs.slice(n,n+t);e[n]=Math.max.apply(Math,o)}return e},i.prototype._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),r=o?n.left:n.right,s=r+i.outerWidth,a=Math.floor(r/this.columnWidth);a=Math.max(0,a);var h=Math.floor(s/this.columnWidth);h-=s%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var u=this._getOption("originTop"),d=(u?n.top:n.bottom)+i.outerHeight,c=a;h>=c;c++)this.colYs[c]=Math.max(d,this.colYs[c])},i.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},i.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},i.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i});
}

AscMasonry()