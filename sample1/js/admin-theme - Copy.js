var multiply = 1;
var id_r = 1;
var reference = false;

//build confirmation modal
function confirm_modal(heading, question, left_button_txt, right_button_txt, left_button_callback, right_button_callback) {
	var confirmModal =
		$('<div class="bootstrap modal hide fade">' +
			'<div class="modal-dialog">' +
			'<div class="modal-content">' +
			'<div class="modal-header">' +
			'<a class="close" data-dismiss="modal" >&times;</a>' +
			'<h3>' + heading + '</h3>' +
			'</div>' +
			'<div class="modal-body">' +
			'<p>' + question + '</p>' +
			'</div>' +
			'<div class="modal-footer">' +
			'<a href="#" id="confirm_modal_left_button" class="btn btn-primary">' +
			left_button_txt +
			'</a>' +
			'<a href="#" id="confirm_modal_right_button" class="btn btn-primary">' +
			right_button_txt +
			'</a>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>');
	confirmModal.find('#confirm_modal_left_button').click(function () {
		left_button_callback();
		confirmModal.modal('hide');
	});
	confirmModal.find('#confirm_modal_right_button').click(function () {
		right_button_callback();
		confirmModal.modal('hide');
	});
	confirmModal.modal('show');
}

//build error modal
/* global error_continue_msg */
function error_modal(heading, msg) {
	var errorModal =
		$('<div class="bootstrap modal hide fade">' +
			'<div class="modal-dialog">' +
			'<div class="modal-content">' +
			'<div class="modal-header">' +
			'<a class="close" data-dismiss="modal" >&times;</a>' +
			'<h4>' + heading + '</h4>' +
			'</div>' +
			'<div class="modal-body">' +
			'<p>' + msg + '</p>' +
			'</div>' +
			'<div class="modal-footer">' +
			'<a href="#" id="error_modal_right_button" class="btn btn-default">' +
			error_continue_msg +
			'</a>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>');
	errorModal.find('#error_modal_right_button').click(function () {
		errorModal.modal('hide');
	});
	errorModal.modal('show');
}

//move to hash after clicking on anchored links
function scroll_if_anchor(href) {
	href = typeof(href) === "string" ? href : $(this).attr("href");
	var fromTop = 120;
	if(href.indexOf("#") === 0) {
		var $target = $(href);
		if($target.length) {
			$('html, body').animate({ scrollTop: $target.offset().top - fromTop });
			if(history && "pushState" in history) {
				history.pushState({}, document.title, window.location.pathname + href);
				return false;
			}
		}
	}
}

$(document).ready(function() {
    

    /* modify datatable control inputs */
   // tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown

    /* Add event listener for opening and closing details
     * Note that the indicator for showing which row is open is not controlled by DataTables,
     * rather it is done here
     */
    // table.on('click', ' tbody td .row-details', function () {
    //     var nTr = $(this).parents('tr')[0];
    //     if (oTable.fnIsOpen(nTr)) {
    //         /* This row is already open - close it */
    //         $(this).addClass("row-details-close").removeClass("row-details-open");
    //         oTable.fnClose(nTr);
    //     } else {
    //         /* Open this row */
    //         $(this).addClass("row-details-open").removeClass("row-details-close");
    //         oTable.fnOpen(nTr, fnFormatDetails(oTable, nTr), 'details');
    //     }
    // });

// datatable init
	 
	if ( $(".datepicker").length > 0 ) {
		 // $(".datepicker").datepicker({
			// format: 'dd-mm-yy'
		 // });
		$('.datepicker').datepicker({   format: 'dd-mm-yyyy', autoclose: true });
		var nowDate = new Date();
		nowDate.setDate(nowDate.getDate());
		$(".datepicker").datepicker("setDate", nowDate);
		$(".datepicker").datepicker('update');
	}

    $('body').on('click', '.dropdown-menu.hold-on-click', function(e) {
            e.stopPropagation();
    });

    $('.toggle-menu').on('click', function() {
    	$('body').toggleClass('page-sidebar-closed');
    })

    

     // handle panel fullscreen
    $('body').on('click', '.panel > .panel-heading > .actions  .fullscreen', function(e) {
        e.preventDefault();
        var panel = $(this).closest(".panel");
       
        //panel.attr('data', 'tester');
        if (panel.hasClass('panel-fullscreen')) {
        	 
             $(this).removeClass('on').find("i").removeClass("icon-resize-small").addClass("icon-resize-full");
             panel.removeClass('panel-fullscreen').parent().removeClass('panel-fullscreen');
             $('body').removeClass('page-panel-fullscreen');
         
        } else {
             $(this).addClass('on').find("i").removeClass("icon-resize-full").addClass("icon-resize-small");
             panel.addClass('panel-fullscreen').parent().addClass('panel-fullscreen');
             $('body').addClass('page-panel-fullscreen');
           
        }
    });

	
	//set main navigation aside
	/* global employee_token */
	function navSidebar(){
		var sidebar = $('#nav-sidebar'), 
		header = $("#header");
		sidebar.off();
		$('.expanded').removeClass('expanded');
		$('.maintab').not('.active').closest('.submenu').hide();
		sidebar.on('click','.submenu_expand', function(){
			var $navId = $(this).parent();
			$('.submenu-collapse').remove();
			if($('.expanded').length ){
				$('.expanded > ul').slideUp('fast', function(){
					var $target = $('.expanded');
					$target.removeClass('expanded');
					$($navId).not($target).not('.active').addClass('expanded');
					$($navId).not($target).not('.active').children('ul:first').hide().slideDown();
				});
			}
			else {
				$($navId).not('.active').addClass('expanded');
				$($navId).not('.active').children('ul:first').hide().slideDown();
			}
		});
		//sidebar menu collapse
		sidebar.find('.menu-collapse').on('click',function(){
			$('body').toggleClass('page-sidebar-closed');
			$('.expanded').removeClass('expanded');
			$.ajax({
				url: "index.php",
				cache: false,
				data: "token="+employee_token+'&ajax=1&action=toggleMenu&tab=AdminEmployees&collapse='+Number($('body').hasClass('page-sidebar-closed'))
			});
		});
	}

	function navTopbarReset() {
		ellipsed = [];
		$('#ellipsistab').remove();
		$('#nav-topbar ul.menu').find('li.maintab').each(function(){
			$(this).removeClass('hide');
		});
	}

	//agregate out of bounds items from top menu into ellipsis dropdown
	function navTopbarEllipsis() {
		navTopbarReset();
		$('#nav-topbar ul.menu').find('li.maintab').each(function(){
			if ($(this).position().top > 0) {
				ellipsed.push($(this).html());
				$(this).addClass('hide');
			}
		});
		if (ellipsed.length > 0) {
			$('#nav-topbar ul.menu').append('<li id="ellipsistab" class="subtab has_submenu"><a href="#"><i class="icon-ellipsis-horizontal"></i></a><ul id="ellipsis_submenu" class="submenu"></ul></li>');
			for (var i = 0; i < ellipsed.length; i++) {
				$('#ellipsis_submenu').append('<li class="subtab has_submenu">' + ellipsed[i] + '</li>');
			}
		}
	}

	//set main navigation on top
	function navTopbar() {
		navTopbarReset();
		$('#nav-sidebar').attr('id','nav-topbar');
		var topbar = $('#nav-topbar');
		topbar.off();
		$('span.submenu_expand').remove();
		$('.expanded').removeClass('expanded');
		// expand elements with submenu
		topbar.on('mouseenter', 'li.has_submenu', function(){
			$(this).addClass('expanded');
		});
		topbar.on('mouseleave', 'li.has_submenu', function(){
			$(this).removeClass('expanded');
		});
		// hide element over menu width on load
		navTopbarEllipsis();
		//hide element over menu width on resize
		$(window).on('resize', function() {
			navTopbarEllipsis();
		});
	}

	//set main navigation for mobile devices
	function mobileNav() {
		navTopbarReset();
		// clean actual menu type
		// get it in navigation whatever type it is
		var navigation = $('#nav-sidebar,#nav-topbar, #navbar-header');
		navigation.find('.menu').hide();
		var submenu = "";
		// clean trigger
		navigation.off().attr('id','nav-mobile');
		$('span.menu-collapse').off();
		navigation.on('click.collapse','span.menu-collapse',function(){
			if ($(this).hasClass('expanded')){
				$(this).html('<i class="icon-align-justify"></i>');
				navigation.find('ul.menu').hide();
				navigation.removeClass('expanded');
				$(this).removeClass('expanded');
				//remove submenu when closing nav
				$('#nav-mobile-submenu').remove();
			}
			else {
				$(this).html('<i class="icon-remove"></i>');
				navigation.find('ul.menu').removeClass('menu-close').show();
				navigation.find('.icon-chevron-right').removeClass('hide');
				navigation.addClass('expanded');
				$(this).addClass('expanded');
			}
		});
		//get click for item which has submenu
		navigation.on('click.submenu','.maintab.has_submenu a.title', function(e){
			e.preventDefault();
			navigation.find('.menu').addClass('menu-close');
			$('#nav-mobile-submenu').remove();
			navigation.find('.icon-chevron-right').addClass('hide');
			
			//create submenu
			submenu = $('<ul id="nav-mobile-submenu" class="menu"><li><a href="#" id="nav-mobile-submenu-back"><i class="icon-arrow-left"></i>'+ $(this).html() +'</a></li></ul>');
			submenu.append($(this).closest('.maintab').find('.submenu').html());
			//show submenu
			navigation.append(submenu);
			submenu.show();
		});
		navigation.on('click.back','#nav-mobile-submenu-back',function(e){
			e.preventDefault();
			submenu.remove();
			navigation.find('.menu').removeClass('menu-close').show();
			navigation.find('.icon-chevron-right').removeClass('hide');
		});
	}

	//unset mobile nav
	function removeMobileNav(){
		var navigation = $('#nav-mobile');
		$('#nav-mobile-submenu').remove();
		$('span.menu-collapse').html('<i class="icon-align-justify"></i>');
		navigation.off();
		if ($('body').hasClass('page-sidebar')){
			navigation.attr('id',"nav-sidebar");
			navSidebar();
		} else if ($('body').hasClass('page-topbar')){
			navigation.attr('id',"nav-topbar");
			navTopbar();
		}
		navigation.find('.menu').show();
	}

	//init main navigation
	function initNav(){
		if ($('body').hasClass('page-sidebar')){
			navSidebar();
		}
		else if ($('body').hasClass('page-topbar')) {
			navTopbar();
		}
	}

	//show footer when reach bottom
	function animateFooter(){
		if($(window).scrollTop() + $(window).height() === $(document).height()) {
			$('#footer:hidden').removeClass('hide');
		} else {
			$('#footer').addClass('hide');
		}
	}

	//scroll top
	function animateGoTop() {
		if ($(window).scrollTop()) {
			$('#go-top:hidden').stop(true, true).fadeIn();
			$('#go-top:hidden').removeClass('hide');
		} else {
			$('#go-top').stop(true, true).fadeOut();
		}
	}

	var ellipsed = [];
	initNav();

	// prevent mouseout + direct path to submenu on sidebar uncollapsed navigation + avoid out of bounds
	var closingMenu, openingMenu;
	$('li.maintab.has_submenu').hover(function() {
		var submenu = $(this);
		if (submenu.is('.active') && submenu.children('ul.submenu').is(':visible')) {
			return;
		}
		clearTimeout(openingMenu);
		clearTimeout(closingMenu);
		openingMenu = setTimeout(function(){
			$('li.maintab').removeClass('hover');
			$('ul.submenu.outOfBounds').removeClass('outOfBounds').css('top',0);
			submenu.addClass('hover');
			var h = $( window ).height();
			var x = submenu.find('.submenu li').last().offset();
			var l = x.top + submenu.find('.submenu li').last().height();
			var f = 25;
			if ($('#footer').is(':visible')){
				f = $('#footer').height() + f;
			}
			var s = $(document).scrollTop();
			var position = h - l - f + s;
			var out = false;
			if ( position < 0) {
				out = true;
				submenu.find('.submenu').addClass('outOfBounds').css('top', position);
			}
		},50);
	}, function() {
		var submenu = $(this);
		closingMenu = setTimeout(function(){
			submenu.removeClass('hover');
		},250);
	});

	$('ul.submenu').on('mouseenter', function(){
		clearTimeout(openingMenu);
	});

	//media queries - depends of enquire.js
	/*global enquire*/
	enquire.register('screen and (max-width: 1200px)', {
		match : function() {
			if( $('#main').hasClass('helpOpen')) {
				$('.toolbarBox a.btn-help').trigger('click');
			}
		},
		unmatch : function() {
			
		}
	});
	enquire.register('screen and (max-width: 768px)', {
		match : function() {

			$('body.page-sidebar').addClass('page-sidebar-closed');
		},
		unmatch : function() {
			$('body.page-sidebar').removeClass('page-sidebar-closed');
		}
	});
	enquire.register('screen and (max-width: 480px)', {
		match : function() {
			$('body').addClass('mobile-nav');
			mobileNav();
		},
		unmatch : function() {
			$('body').removeClass('mobile-nav');
			removeMobileNav();
		}
	});

	//bootstrap components init
	$('.dropdown-toggle').dropdown();
	$('.label-tooltip, .help-tooltip').tooltip();
	$('#error-modal').modal('show');
	$('input[type=checkbox]').uniform();

	//init footer
	animateFooter();

	// go on top of the page
	$('#go-top').on('click',function() {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
		return false;
	});

	var timer;
	$(window).scroll(function() {
		if(timer) {
			window.clearTimeout(timer);
		}
		timer = window.setTimeout(function() {
			animateGoTop();
			animateFooter();
		}, 100);
	});

	// search with nav sidebar closed
	$(document).on('click', '.page-sidebar-closed .searchtab' ,function() {
		$(this).addClass('search-expanded');
		$(this).find('#bo_query').focus();
	});

	$('.page-sidebar-closed').click(function() {
		$('.searchtab').removeClass('search-expanded');
	});

	$('#header_search button').on('click', function(e){
		e.stopPropagation();
	});

	//erase button search input
	if ($('#bo_query').val() !== '') {
		$('.clear_search').removeClass('hide');
	}

	$('.clear_search').on('click', function(e){
		e.stopPropagation();
		e.preventDefault();
		var id = $(this).closest('form').attr('id');
		$('#'+id+' #bo_query').val('').focus();
		$('#'+id+' .clear_search').addClass('hide');
	});
	$('#bo_query').on('keydown', function(){
		if ($('#bo_query').val() !== ''){
			$('.clear_search').removeClass('hide');
		}
	});

	//search with nav sidebar opened
	$('.page-sidebar').click(function() {
		$('#header_search .form-group').removeClass('focus-search');
	});

	$('#header_search #bo_query').on('click', function(e){
		e.stopPropagation();
		e.preventDefault();
		if($('body').hasClass('mobile-nav')){
			return false;
		}
		$('#header_search .form-group').addClass('focus-search');
	});
	
	//select list for search type
	$('#header_search_options').on('click','li a', function(e){
		e.preventDefault();
		$('#header_search_options .search-option').removeClass('active');
		$(this).closest('li').addClass('active');
		$('#bo_search_type').val($(this).data('value'));
		$('#search_type_icon').removeAttr("class").addClass($(this).data('icon'));
		$('#bo_query').attr("placeholder",$(this).data('placeholder'));
		$('#bo_query').focus();
	});

	// reset form
	/* global header_confirm_reset, body_confirm_reset, left_button_confirm_reset, right_button_confirm_reset */
	$(".reset_ready").click(function () {
		var href = $(this).attr('href');
		confirm_modal( header_confirm_reset, body_confirm_reset, left_button_confirm_reset, right_button_confirm_reset,
			function () {
				window.location.href = href + '&keep_data=1';
			},
			function () {
				window.location.href = href + '&keep_data=0';
		});
		return false;
	});

	

	//scroll_if_anchor(window.location.hash);

	$("body").on("click", "a.anchor", scroll_if_anchor);

	// open / hide menu
//	var effect = "effect-3";
//	$('#header_toggle_menu').on("click", function(){
//			
//			if ($("#main").hasClass('menu-open')) {
//				$("#main").removeClass(effect);
//				setTimeout( function() {
//					$("#main").removeClass('menu-open');
//					//resetDrillDown();
//				}, 25 );
//								
//			} else {
//				$("#main").addClass(effect);
//				setTimeout( function() {
//					$("#main").addClass('menu-open');
//				}, 25 );
//			}
//	});

	$('.panel .show_hide').on("click",function () {
            var el = $(this).closest(".panel").children(".panel-body");

            if ( $(this).closest(".panel").find('.panel-footer').length > 0 )
            	var el_footer = $(this).closest(".panel").children(".panel-footer");

            if (el.is(":visible")) {
            	$(this).find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
                el.slideUp(200);
                if ( $(this).closest(".panel").find('.panel-footer').length > 0 )
                	el_footer.slideUp(200);
            } else {
            	$(this).find("i").removeClass("icon-chevron-up").addClass("icon-chevron-down");
                el.slideDown(200);
                if ( $(this).closest(".panel").find('.panel-footer').length > 0 )
                	el_footer.slideDown(200); 
            }
     });

	$("#Scenario_listbox").on("click",function () {	 
			var str = "", str_issued_by,
			ServiceRequest = $("#ServiceRequest_listbox"), 
			ServiceRequestChild = ServiceRequest.children('li'); 
			str = $(this).find('.k-state-selected').text();
			str_issued_by = $("#ServiceRequest").closest('.k-dropdown').find('.k-input');
			//alert(str_issued_by);
			chainingStr(str, str_issued_by, ServiceRequest, ServiceRequestChild);
			 
	}).trigger( "click" );
	 

	// $("#tabelRouting").on( 'click','.btnModify', function(e) {
	// 	e.preventDefault();
	// 	var $this   = $(this);
	// 		$tr     = $this.closest("tr");
	// 	var allTrs = $tr.closest("table").find("tr");
	// 	var id_sel = $tr.index() + 1;
 //        var lastTr = allTrs[id_sel];
 //        var $clone  = $(lastTr).clone(); 
 //        $clone.find('td').each(function(){
 //            var el = $(this).find(':first-child');
 //            var id = el.attr('id') || null;
 //            alert(id);
 //            if(id) {
 //                var i = id.substr(id.length-1);
 //                var prefix = id.substr(0, (id.length-1));
 //                el.attr('id', prefix+(+i+1));
 //                el.attr('name', prefix+(+i+1));
 //            }
 //        });
        
 //        $tr.closest('table').append($clone);
	// })

    $("#tabelRouting").on( 'click','.btnModify', function(e) {
		e.preventDefault();
		$('.datepicker').datepicker('destroy');
		var $this   = $(this);
			$tr     = $this.closest("tr");
		var allTrs = $tr.closest("table").find("tr");
		var id_sel = $tr.index() + 1;
		//var id_sel = $tr.attr('id').replace('tr_','');
        var lastTr = allTrs[id_sel];
        var $clone  = $(lastTr).clone(false); 
        //var i = allTrs.length;
        var i = add();
        
        $tr.closest('table').append($clone);
        updateElementIndex($clone, 'form', 1); 



        $clone.attr('id','tr_'+(i)).find('.step').val(i);    
        // td 2
        var value = $tr.find('select option:selected').val();
        $clone.find('td').find('select').val( value );
    	// td 2
    	// td 2
        var value = $tr.find('.instruction').val();
        $clone.find('td').find('.instruction').val( value );
    	// td 2
    	// td 3
        var value = $tr.find('.response').val();
        $clone.find('td').find('.response').val( value );
    	// td 3
    	// td 4
        var value = $tr.find('.baseline').val();
        $clone.find('td').find('.baseline').val( value );

        var value = $tr.find('.plan').val();
        $clone.find('td').find('.plan').val( value );

        var value = $tr.find('.actual').val();
        $clone.find('td').find('.actual').val( value );
    	// td 4
    	// td 5
    	var value = $tr.find('.divisionStatus').val();
        $clone.find('td').find('.divisionStatus').val( value );
    	// td 5
    	// td 6
    	var value = $tr.find('.rountingStatus').val();
        $clone.find('td').find('.rountingStatus').val( value );

        $('.datepicker').datepicker({   format: 'dd-mm-yyyy', autoclose: true  });
		 

    	// td 6
	});
	
	$("#tabelRouting").on( 'click','.btnRemove', function(e) {
		e.preventDefault();
		var answer = confirm("Are you sure you want to remove?");
        if (answer) {
        	var tr = $(this).closest('tbody').find('tr').length;
        	if(tr < 2) {
        		alert ('minimal satu');
        		return false;
        	}        	 
        	
        	min();
			$(this).closest('tr').remove();

			$("#tabelRouting tbody tr").each(function(e,init){
            	var id = (e) * multiply;
            	$(this).find('.step').val(id + 1);
            	//$(this).attr(id, 'tr_' + (parseInt(id) + 1));
            });

	    }
	});

	if ( $(".textarea-autosize").length > 0 ) {
		 $('.textarea-autosize').autosize(); 
	}
 
 	$(".event-switch").on('change', function() {
 		var $switch = $(this).find('input:checked');
 		$(this).find('input:not(:checked)').removeAttr('checked');
 	 
		$(this).find('input:checked').attr('checked','checked');
		  
		 if ( $switch.val() == 0 )  {
		 	$('#wrapper_service').hide();
		 	$('#wrapper_ticket').hide();
		 	$('#wrapper_notification').hide();
		 	reference = false;
		 }
		 else {
		 	reference = true;
		 	$("#Scenario_listbox").trigger( 'click' );
		 	// $('#wrapper_service').show();
		 	// $('#wrapper_ticket').show();
		 	// $('#wrapper_notification').show();
		 }
	}).trigger( 'change' );

	$(".only-one-service").keyup(function() {
		$(".only-one-service").removeAttr('disabled');
		if ( $(this).val().length == 0 ) {
			$(this).closest('div').find('.form-control-feedback').addClass('hide');
			$(".only-one-ticket").removeAttr('disabled');
			$(".only-one-notification").removeAttr('disabled');
		}
		else {
			$(this).closest('div').find('.form-control-feedback').removeClass('hide');
			$(".only-one-ticket").attr('disabled','disabled');
			$(".only-one-notification").attr('disabled','disabled');
		}
	});

	$(".only-one-ticket").keyup(function() {
		$(".only-one-ticket").removeAttr('disabled');
		if ( $(this).val().length == 0 ) {
			$(this).closest('div').find('.form-control-feedback').addClass('hide');
			$(".only-one-service").removeAttr('disabled');
		}
		else{
			$(this).closest('div').find('.form-control-feedback').removeClass('hide');
			$(".only-one-service").attr('disabled','disabled');
		}
	});

	$(".only-one-notification").keyup(function() {
		$(".only-one-notification").removeAttr('disabled');
		if ( $(this).val().length == 0 ) {
			$(this).closest('div').find('.form-control-feedback').addClass('hide');
			$(".only-one-service").removeAttr('disabled');
		}
		else{
			$(this).closest('div').find('.form-control-feedback').removeClass('hide');
			$(".only-one-service").attr('disabled','disabled');
		}
	})

	$("#wrapper_service .fa-close").on('click', function() {
		$(".only-one-service").val('');
		$(".only-one-service").keyup();
	});

	$("#wrapper_ticket .fa-close").on('click', function() {
		$(".only-one-ticket").val('');
		$(".only-one-ticket").keyup();
	});

	$("#wrapper_notification .fa-close").on('click', function() {
		$(".only-one-notification").val('');
		$(".only-one-notification").keyup();
	})


	$(document).on("click", "#link-routing", function () {
     	var url = $(this).attr('data-rel'),
     	mod = $(this).attr('data-mod');
     	alert(mod);
        // sample data
        var json = [
			        {
			            "name": "Tiger Nixon",
			            "position": "System Architect",
			            "salary": "$320,800",
			            "start_date": "2011\/04\/25",
			            "office": "Edinburgh",
			             
			        },
			        {
			            "name": "Garrett Winters",
			            "position": "Accountant",
			            "salary": "$170,750",
			            "start_date": "2011\/07\/25",
			            "office": "Tokyo",
			           
			        },
			        {
			            "name": "Ashton Cox",
			            "position": "Junior Technical Author",
			            "salary": "$86,000",
			            "start_date": "2009\/01\/12",
			            "office": "San Francisco",
			            
			        },
			        {
			            "name": "Cedric Kelly",
			            "position": "Senior Javascript Developer",
			            "salary": "$433,060",
			            "start_date": "2012\/03\/29",
			            "office": "Edinburgh",
			             
			        }
		     	];

		     	console.log(json);
		     	$.each(json, function(idx, obj) {
					console.log(obj.name);
				});
	        // $.ajax({
         //    type: "POST",
         //    url: base_url + 'material/search_list_material',
         //    data :value,
         //    dataType: "html",
         //    beforeSend: function() {
         //    	$('#content-routing').html('Loading data please wait ..');
         //    },
         //    success: function(data) {
         //        $('#content-routing').empty().html(data);
         //    }
        //});

        $('#modal-routing').modal();
     //   // $('#submit-accAss').attr('onclick', 'return_acc_ass(\'account_assignment/view\', \'accAss\',' + id + ')');
     //    $('#submit-mat').attr('onclick', 'return_material(\'material/view\', \'matid\',' + id_plant + ')');
    });

}); //end dom ready


function displayTab(tab)
{
	$('.content_tab').removeClass('active').hide().find('.content_tab_wrapper').hide();
	$('.tab-row.active').removeClass('active');
	//setTimeout( function() {
		$('#content_tab_' + tab).addClass('active').show().find('.content_tab_wrapper').show();
	//}, 25 );
	$('#tab_link_' + tab).parent().addClass('active');
	$('#currentFormTab').val(tab);
}

function updateElementIndex(el, prefix, index){
     var id_regex = new RegExp('(' + prefix + '-\\d+)');
     var replacement = prefix + '-' + index;
     if ($(el).attr("for")) $(el).attr("for", $(el).attr("for").replace(id_regex, replacement));    
     if (el.id) el.id = el.id.replace(id_regex, replacement);
     if (el.name) el.name = el.name.replace(id_regex, replacement);    
    
}

function add() {
    id_r++;
    return (id_r * multiply);
}

function min() {
    id_r--;
    return id_r;
}
function chainingStr(str, replace, obj, obj_child) {
	var selected = "";
	obj.find('li').removeClass('k-state-selected k-state-focused');
	if ( str == 'Transfer Asset' ) {
		selected = 'Helpdesk';

		if ( reference == true ) {
			$("#wrapper_ticket").fadeIn();
			$("#wrapper_notification").fadeOut();
			$("#wrapper_service").fadeIn();
		}
	} else if ( str == 'Termination') {
		selected = 'Helpdesk';
		if ( reference == true ) {
			$("#wrapper_ticket").fadeOut();
			$("#wrapper_notification").fadeOut();
			$("#wrapper_service").fadeIn();
		}
	} else if( str == 'Broken' ) {
		selected = 'Workshop';
		if ( reference == true ) {
			$("#wrapper_ticket").fadeOut();
			$("#wrapper_notification").fadeIn();
			$("#wrapper_service").fadeIn();
		}
	} else if( str == 'Return Device' ) {
		selected = 'Warehouse';
		if ( reference == true ) {
			$("#wrapper_ticket").fadeOut();
			$("#wrapper_notification").fadeOut();
			$("#wrapper_service").fadeIn();
		}
	} else {
		selected = 'Sales Admin';
		if ( reference == true ) {
			$("#wrapper_ticket").fadeOut();
			$("#wrapper_notification").fadeOut();
			$("#wrapper_service").fadeIn();
		}
	}

	replace.text(selected);

	obj_child.each(function() {
		if ( $(this).text() == selected ) {
		 
			$(this).attr('id', 'ServiceRequest_option_selected').addClass('k-state-selected k-state-focused');
		} else if ( $(this).text() == selected ) {
			 alert(2);
			$(this).attr('id', 'ServiceRequest_option_selected').addClass('k-state-selected k-state-focused');
		} else if ( $(this).text() == selected ) {
			 
			$(this).attr('id', 'ServiceRequest_option_selected').addClass('k-state-selected k-state-focused')
		} else if ( $(this).text() == selected ) {
			$(this).attr('id', 'ServiceRequest_option_selected').addClass('k-state-selected k-state-focused')
		} else {
			$(this).attr('id', '').removeClass('k-state-selected k-state-focused');
		}
	})
	
 
}

// function replaceList()
