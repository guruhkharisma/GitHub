var reference = false;
var _getViewPort = function () {
    var e = window, a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    }
}

var viewport = _getViewPort();

$(document).ready(function() {
   

    //------------------------------------------------------------------------
//                      WOW ANIMATION SETTINGS
//------------------------------------------------------------------------  
    var wow = new WOW({
        offset:100,        // distance to the element when triggering the animation (default is 0)
        mobile:true       // trigger animations on mobile devices (default is true)
    });
    wow.init();

    // $(".checkbox").each(function (index) {
    //     var $this = $(this);
    var id = 0;
        $('input:checkbox').on('change' , function() {
            id++;
            
            var $this = $(this);
            var sn = $this.closest('.panel-group').find('.sn'),
                desc = $this.closest('.panel-group').find('.description');
            var len = $('input:checkbox:checked').length;

            var arr = [],
                lis = "";

                
// alert(len);
            // if(len > 0)
            // {

                $("#cd-cart").addClass('speed-in');

                if ( $this.is(':checked') ) {
                    // alert('status tidak di cek');
                    // add list to in cart
                    lis += "<li>"  +
                          "<strong class='col-md-12 description'>" + desc.text() + "</strong>" + 

                          "<span class='col-md-12 sn'>" + sn.text() + "</span>" + 
                     
                          "<div class='form-group'>" + 
                             
                            "<div class='input-group col-md-9 col-xs-12'>" +
                                 
                                "<input id='datepicker" + id+1  + "' value='' class='form-control' placeholder='Termination Date'/>" + 
                                "<script type='text/javascript'>" + 
                                "$(document).ready(function() {" + 
                                    "$('#datepicker" + id+1 + "').kendoDatePicker();" + 
                                "})" + 
                                "</script>" + 
                                 
                            "</div>" + 
                           
                        "</div>" +
                     
                        "<a href='#' class='cd-item-remove cd-img-replace border-circle'><i class='fa fa-minus'></i></a>" + 
                    "</li>";
                    $(".cd-cart-items").append(lis);
                }  else {
                    // alert(2);
                      $(".cd-cart-items li").each(function () {
                        var $this = $(this),
                            sn_list = $this.find('span.sn');

                       
                        if ( sn_list.text() == sn.text() ) {
                            $this.remove();
                        }

                    });
                    
                }


                if ( len == 0 ) {
                    $("#cd-cart").removeClass('speed-in');
                }

            // } else {
            //         // remove list in cart

            //         $(".cd-cart-items li").each(function () {
            //             var $this = $(this),
            //                 sn_list = $this.find('span.sn');

            //             alert( sn_list.text() );

            //             // if ( sn_list.text() == sn.text() ) {
            //             //     $this.remove();
            //             // }

            //         });

                


            // } 

                 
            
            
            // console.log(arr);
            //  if( arr.length > 0 ) {
                
               
            //     for ( var $i = 0; $i < arr.length; $i++ )  {
                   

            //     }
               
             // } else {
             //   
             // }
        });

$(".progress-button").on('click', function() {
    $(this).addClass('state-loading');

    var progress = 0,
    interval = setInterval( function() {
        progress = Math.min( progress + Math.random() * 0.1, 1 );
        _setProgress( progress );

        if( progress === 1 ) {
            _stop(1);
            clearInterval( interval );
        }
    }, 200 );
})


function _stop (flag) {
    if ( flag ) {
        $(".progress-button").removeClass('state-loading').addClass('state-success');
        setTimeout(function(){
            $(".progress-button").removeClass('state-success');
     
        }, 2000);
        
        // setTimeout( function() {
        //     $(".progress-button").removeClass('state-success');
        // }, 500)

    }
}

function _setProgress ( val ) {
    $(".progress-inner").css('width', 100 * val + '%' );
        //this.progress.style[ this.progressProp ] = ;
};

    $(document).on('click', ".cd-item-remove",function(e) {
         
        e.stopPropagation();
        e.preventDefault();
        var $this = $(this);
        var sn = $this.closest('li').find('span.sn');
        $(".cd-cart-items li").each(function () {
            var $this = $(this),
                sn_list = $this.find('span.sn');

           
            if ( sn_list.text() == sn.text() ) {
                $this.remove();
            }

        });

        

       
        $('.input-checkbox').each( function () {
            var sns = $(this).closest('.item-request').find('span.sn');
            
            if ( sn.text() == sns.text() ) {
                sns.text()
                $(this).prop('checked',false).parent().removeClass('checked');
            }

        });

        if ( $(".cd-cart-items").find('li').length == 0 ) 
            $("#cd-cart").removeClass('speed-in');


       
    })
        
    // });

//  alert(viewport.width);

// $('.collapse').on('shown.bs.collapse', function (e) {
   
//    var id = $(e.target).prop('id'), 

//    $this = $(this);
//    // alert(id);
//     // alert( $('#accordion1').find('.collapse').length ) ;
     
//     $('#accordion1').find('.collapse').each(function(index) {
//       var ids = $(this).prop('id');
//       // alert(ids + ' looping');
//       // alert(id);
//       if ( ids != id ) {
//         $("#"+ids).removeClass('in');
//       }

//     });
//     // To scroll to panel-body (untested)
//     // var id = $(e.target).children('.panel-body').prop('id');
//    navigateToElement(id);
// })

// $('.collapse').on('hidden.bs.collapse', function (e) {
   
//    var id = $(e.target).prop('id');
   
//     // To scroll to panel-body (untested)
//     // var id = $(e.target).children('.panel-body').prop('id');
//    ClosenavigateToElement(id);
// })

// function ClosenavigateToElement(id) {
//     $("#" + id).closest('.portfolio-item').removeClass('panel-fullscreen');
// $('body').removeClass('page-panel-fullscreen');
//     // $('html, body').animate({
//     //     scrollTop: $("#" + id).closest('.portfolio-item').offset().top - 200
//     // }, 1000);
// }

// function navigateToElement(id) {
// $("#" + id).closest('.portfolio-item').addClass('panel-fullscreen');
// $('body').addClass('page-panel-fullscreen');
    
//     // $('html, body').animate({
//     //     scrollTop: $("#" + id).offset().top - 200
//     // }, 1000);
    
// }

  var elements = [
                    "esc", 
                    "f1","f2","f3","f4","f6","f7","f8","f9","f10"
                ];

    $.each(elements, function(i, e) { // i is element index. e is element as text.
       var newElement = ( /[\+]+/.test(elements[i]) ) ? elements[i].replace("+","_") : elements[i];
       
       // Binding keys
       $(document).bind('keydown', elements[i], function assets() {
           alert(newElement + ' clicked !');
           return false;
       });
    });

    addShadow();

    if ( $('#quick-link').length > 0 ) {
        var $quick_link = $('#quick-link'),
        // var $quick_link = $('#navbar'),
            initMenu = function( refresh ){     
                $quick_link.fanmenu({
                    'initAngle':0,
                    'angleDisplay' : '-90',
                    'radius':110,
                    'hideOnClick':true,
                    'hideOnClickExcept':'fm_antihide'
                }, refresh);
            }, 
            reset = function(){
                
                 $quick_link.fanmenu('close');
                 $("#info").fadeIn("slow").fadeOut("slow");
                 initMenu(true);
                // $quick_link.fanmenu('open');
            };
            //$quick_link.draggable();
            initMenu();


        $(".overlay").on('click', function() {
        //$("#overlay").removeClass('on-overlay');
         $quick_link.fanmenu('close');
        })
    }

    
    if ( $('.dataTable').length > 0 ) {
        $('#example2').dataTable();
        // $('#example2').dataTable({
        //   "bPaginate": true,
        //   "bLengthChange": false,
        //   "bFilter": false,
        //   "bSort": true,
        //   "bInfo": true,
        //   "bAutoWidth": false
        // });
    }

    if ($(".datepicker").length > 0) {
        // $(".datepicker").datepicker({
        // format: 'dd-mm-yy'
        // });
        $('.datepicker').datepicker({ format: 'dd-mm-yyyy', autoclose: true });
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
            //panel.removeClass('panel-fullscreen').parent().removeClass('panel-fullscreen');
            panel.removeClass('panel-fullscreen');//.parent().removeClass('panel-fullscreen');
            $('body').removeClass('page-panel-fullscreen');

        } else {
            $(this).addClass('on').find("i").removeClass("icon-resize-full").addClass("icon-resize-small");
            //panel.addClass('panel-fullscreen').parent().addClass('panel-fullscreen');
            panel.addClass('panel-fullscreen');//.parent().addClass('panel-fullscreen');
            $('body').addClass('page-panel-fullscreen');

        }
    });


    //set main navigation aside
    /* global employee_token */
    function navSidebar() {
        var sidebar = $('#nav-sidebar');

        sidebar.find('.menu').addClass('sm sm-simple sm-vertical sm-simple-vertical menu').attr('id', 'main-menu');
        $('#main-menu').smartmenus({
            mainMenuSubOffsetX: 0,
            mainMenuSubOffsetY:-9,
            // subMenusSubOffsetX: -1,
             subMenusSubOffsetY: -9,
             subIndicatorsText:'',
             subMenusMinWidth:'16em'
        });
    }

    function navTopbarReset() {
        ellipsed = [];
        $('#ellipsistab').remove();
        $('#nav-topbar ul.menu').find('li.maintab').each(function() {
            $(this).removeClass('hide');
        });
    }

    function navSidebarReset() {
        if ( $('body').hasClass('page-sidebar')) {
            $('#main').find('.navigation').attr('id', "nav-sidebar");
            // navSidebar();
        } else if ($('body').hasClass('page-topbar')) {
           // navigation.attr('id', "nav-topbar");
           // navTopbar();
        }
       
    }

    //agregate out of bounds items from top menu into ellipsis dropdown
    function navTopbarEllipsis() {
        navTopbarReset();
        $('#nav-topbar ul.menu').find('li.maintab').each(function() {
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

    function navTopbar() {
        $(".menu").addClass('sm sm-simple').attr('id', 'main-menu');
        // $('#main-menu').smartmenus({
        //         subMenusSubOffsetX: 1,
        //         subMenusSubOffsetY: -8
        //     });
    }
    //set main navigation on top
   // function navTopbar() {

        // navTopbarReset();
        // $('#nav-sidebar').attr('id', 'nav-topbar');
        // var topbar = $('#nav-topbar');
        // topbar.off();
        // $('span.submenu_expand').remove();
        // $('.expanded').removeClass('expanded');
        // // expand elements with submenu
        // topbar.on('mouseenter', 'li.has_submenu', function() {
        //    // alert(1);
        //     $(this).addClass('expanded');
        // });
        // topbar.on('mouseenter', 'li.has_submenu > ul.submenu li', function() {
        //    // alert(1);
        //     $(this).addClass('expanded');
        // });
        // topbar.on('mouseleave', 'li.has_submenu', function() {
        //    // alert(2);
        //     $(this).removeClass('expanded');
        // });
        // // hide element over menu width on load
        // navTopbarEllipsis();
        // //hide element over menu width on resize
        // $(window).on('resize', function() {
        //     navTopbarEllipsis();
        // });
    //}

    //set main navigation for mobile devices
    function mobileNav() {
        // if ( $('body').hasClass('mobile-nav') ) 
        //     alert('ada class mobile-nav');
        navTopbarReset();
        // clean actual menu type
        // get it in navigation whatever type it is
        var navigation = $('#nav-sidebar, #nav-topbar, #navbar-header');
        navigation.addClass('navigation');
        $('body.mobile-nav').find('.navigation').attr('id','');
        
        navigation.find('.menu').hide();
        var submenu = "";
        var arr = [];
        // clean trigger
        navigation.off().attr('id', 'nav-mobile');
        navigation.find('> ul').off();
        $('span.menu-collapse').off();
        navigation.find('.menu').attr('id','').removeClass('sm sm-simple sm-vertical sm-simple-vertical');
        navigation.on('click.collapse', 'span.menu-collapse', function() {
            if ($(this).hasClass('expanded')) {
                $(this).html('<i class="icon-align-justify"></i>');
                navigation.find('ul.menu').hide();
                navigation.removeClass('expanded');
                $(this).removeClass('expanded');
                //remove submenu when closing nav
                $('#nav-mobile-submenu').remove();
                arr.length = 0;
                console.log(arr);
            } else {
                $(this).html('<i class="icon-remove"></i>');
                navigation.find('ul.menu').removeClass('menu-close').show();
                arr.push($(this).parent().find('ul.menu').html());
                // alert(arr.length);
                console.log(arr);
              //  navigation.find('.icon-chevron-right').removeClass('hide');
                navigation.addClass('expanded');
                $(this).addClass('expanded');
            }
        });
        //get click for item which has submenu
        navigation.on('click', '.maintab.has_submenu a.title', function(e) {
        //$("a.title").livequery('click', function(e) {
            e.preventDefault();
            navigation.find('.menu').addClass('menu-close').hide();
            $('#nav-mobile-submenu').remove();
            // navigation.find('.icon-chevron-right').addClass('hide');
            //navigation.find('.icon-chevron-right');
        
            //create submenu
            submenu = $('<ul id="nav-mobile-submenu" class="menu"><li><a href="#" id="nav-mobile-submenu-back"><i class="icon-arrow-left"></i>' + 'Back' + '</a></li></ul>');
            arr.push($(this).closest('.maintab').find('.submenu').html());
            // alert(arr.length);
            console.log(arr);
            submenu.append($(this).closest('.maintab').find('.submenu').html());
            //show submenu'
            //console.log(navigation);
            navigation.append(submenu);
            submenu.show();

            $('#nav-mobile-submenu-back').find('.icon-chevron-right').addClass('hide');
        });
        navigation.on('click.back', '#nav-mobile-submenu-back', function(e) {

            //alert(arr.length);
            //alert(arr.length);
            //console.log(arr);

            e.preventDefault();
            arr.pop();
            submenu.remove();
            //navigation.find('.icon-chevron-right').removeClass('hide');
            if ( arr.length == 1 ) {
                navigation.find('.menu').removeClass('menu-close').show();
            } else {
                // submenu = $('<ul id="nav-mobile-submenu" class="menu"><li><a href="#" id="nav-mobile-submenu-back"><i class="icon-arrow-left"></i>' + $(this).html() + '</a></li></ul>');
                submenu = $('<ul id="nav-mobile-submenu" class="menu"><li><a href="#" id="nav-mobile-submenu-back"><i class="icon-arrow-left"></i>' + 'Back' + '</a></li></ul>');
                submenu.append(arr[arr.length-1]);
                console.log(submenu);
                navigation.append(submenu);
                submenu.show();
            }
            


            //navigation.find('.menu').removeClass('menu-close').show();
        });
    }

    //unset mobile nav
    function removeMobileNav() {
        var navigation = $('#nav-mobile, #nav-sidebar');
        $('#nav-mobile-submenu').remove();
        $('span.menu-collapse').html('<i class="icon-align-justify"></i>');
        navigation.off();
        if ($('body').hasClass('page-sidebar')) {
            navigation.attr('id', "nav-sidebar");
            navSidebarReset();
            navSidebar();
            // alert('dipanggil');
        } else if ($('body').hasClass('page-topbar')) {
           // navigation.attr('id', "nav-topbar");
           // navTopbar();
        }
        navigation.find('.menu').show();
    }

    //init main navigation
    function initNav() {
        if ($('body').hasClass('page-sidebar')) {
            navSidebar();
        } else if ($('body').hasClass('page-topbar')) {
            //navTopbar();
        }
    }

    //show footer when reach bottom
    function animateFooter() {
        if ($(window).scrollTop() + $(window).height() === $(document).height()) {
            $('#footer:hidden').removeClass('hide');
        } else {
            $('#footer').addClass('hide');
        }
    }

    function scrollTo(el, offeset) {
         pos = (el && el.length > 0) ? el.offset().top : 0;
            $('html,body').animate({
                scrollTop: pos + (offeset ? offeset : 0)
        }, 'slow');
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
    // $('li.maintab.has_submenu').hover(function() {
    //     var submenu = $(this);
    //     if (submenu.is('.active') && submenu.children('ul.submenu').is(':visible')) {
    //         return;
    //     }
    //    // clearTimeout(openingMenu);
    //    // clearTimeout(closingMenu);
    //     openingMenu = setTimeout(function() {
    //         $('li.maintab').removeClass('hover');
    //         $('ul.submenu.outOfBounds').removeClass('outOfBounds').css('top', 0);
    //         submenu.addClass('hover');
    //         var h = $(window).height();
    //         var x = submenu.find('.submenu li').last().offset();
    //         var l = x.top + submenu.find('.submenu li').last().height();
    //         var f = 25;
    //         if ($('#footer').is(':visible')) {
    //             f = $('#footer').height() + f;
    //         }
    //         var s = $(document).scrollTop();
    //         var position = h - l - f + s;
    //         var out = false;
    //         if (position < 0) {
    //             out = true;
    //             submenu.find('.submenu').addClass('outOfBounds').css('top', position);
    //         }
    //     }, 50);
    // }, function() {
    //     var submenu = $(this);
    //     closingMenu = setTimeout(function() {
    //         submenu.removeClass('hover');
    //     }, 250);
    // });

    $('ul.submenu').on('mouseenter', function() {
        //clearTimeout(openingMenu);
    });

    //media queries - depends of enquire.js
    /*global enquire*/
    enquire.register('screen and (max-width: 765px)', {
        match: function() {
            $('body').addClass('mobile-nav');
            mobileNav();
            $('#quick-link').show();
        },
        unmatch: function() {
            // $('body').removeClass('mobile-nav');
            // removeMobileNav();
        }
    });
    enquire.register('screen and (min-width: 768px)', {
        match: function() {
            
            // $('body.page-sidebar').addClass('page-sidebar-closed');
            $('body').addClass('mobile-nav');
            mobileNav();
            $('#quick-link').hide();
            console.log('min-width: 768px');
        },
        unmatch: function() {
          
            $('body').removeClass('mobile-nav');
             removeMobileNav();
        }
    });

     enquire.register('screen and (min-width: 992px)', {
        match: function() {
             $('body').removeClass('mobile-nav');

            removeMobileNav();
            //  $('body').removeClass('mobile-nav');
            // var navigation = $('#nav-mobile, #nav-topbar');
            // navigation.attr('id','').attr('id','nav-topbar');
            // navigation.find('.menu').show();
            // navTopbar();
            $('#quick-link').hide();
            
            console.log('min-width: 992px');
             
        },
        unmatch: function() {
            $('body').addClass('mobile-nav');
            mobileNav();
          
        }
    });

    enquire.register('screen and (min-width: 1200px)', {
        match: function() {
            $('body').removeClass('mobile-nav');
            removeMobileNav();

            //  $('body').removeClass('mobile-nav');
            // var navigation = $('#nav-mobile, #nav-topbar');
            // navigation.attr('id','').attr('id','nav-topbar');
            // navigation.find('.menu').show();
            // navTopbar();
            $('#quick-link').hide();
            

        },
        unmatch: function() {
           // alert( 'viewport = ' + viewport.width );
           if ( $(window).width() >= 768 ) {
            removeMobileNav();
           }
            
        }
    });

    $(window).on('resize', function() {
       
        if ( $(window).width() >= 768 ) {
          
            removeMobileNav();
        }
    });

    //bootstrap components init
    if ($(".dropdown-toggle").length > 0)
        $('.dropdown-toggle').dropdown();

    if ($(".label-tooltip, .help-tooltip").length > 0)
        $('.label-tooltip, .help-tooltip').tooltip();
    if ($(".textarea-autosize").length > 0)
        $('.textarea-autosize').autosize();
    $('input[type=checkbox]').uniform();

    //init footer
    animateFooter();

    // go on top of the page
    $('#go-top').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });

    var timer;
    $(window).scroll(function() {
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout(function() {
            animateGoTop();
            animateFooter();
        }, 100);

        if ( $('body').hasClass('mobile-nav') ) {
            // alert(1);
            // alert($(".page-head").height());
            if ($(window).scrollTop() > $(".page-head").height() ) {
                $("body").addClass("hide-menu");
            } else {
                $("body").removeClass("hide-menu");
                // $(".navbar-slide .navMenuCollapse").collapse({toggle: false});
                // $(".navbar-slide .navMenuCollapse").collapse("hide");
                // $(".navbar-slide .navbar-toggle").addClass("collapsed");
            }
        }

        if ($(window).scrollTop() > 100 ) {
            $("body").addClass("fly-menu");
            // $(".fly-checkout").removeClass('display-none');
        } else {
            $("body").removeClass("fly-menu");
            // $(".fly-checkout").addClass('display-none');
        //     // $(".navbar-slide .navMenuCollapse").collapse({toggle: false});
        //     // $(".navbar-slide .navMenuCollapse").collapse("hide");
        //     // $(".navbar-slide .navbar-toggle").addClass("collapsed");
        }

    });

    // search with nav sidebar closed
    $(document).on('click', '.page-sidebar-closed .searchtab', function() {
        $(this).addClass('search-expanded');
        $(this).find('#bo_query').focus();
    });

    $("#minimize").on( 'click' , function(e) {
        e.preventDefault();
        $(".fly-checkout").addClass('shortcut-circle');
    })

    $('.page-sidebar-closed').click(function() {
        $('.searchtab').removeClass('search-expanded');
    });

    $('#header_search button').on('click', function(e) {
        e.stopPropagation();
    });

    //erase button search input
    if ($('#bo_query').val() !== '') {
        $('.clear_search').removeClass('hide');
    }

    $('.clear_search').on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var id = $(this).closest('form').attr('id');
        $('#' + id + ' #bo_query').val('').focus();
        $('#' + id + ' .clear_search').addClass('hide');
    });
    $('#bo_query').on('keydown', function() {
        if ($('#bo_query').val() !== '') {
            $('.clear_search').removeClass('hide');
        }
    });

    //search with nav sidebar opened
    $('.page-sidebar').click(function() {
        $('#header_search .form-group').removeClass('focus-search');
        $('.searchtab').removeClass('search-expanded');
    });

    $('#header_search #bo_query').on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        if ($('body').hasClass('mobile-nav')) {
            return false;
        }
        $('#header_search .form-group').addClass('focus-search');
    });

    //select list for search type
    $('#header_search_options').on('click', 'li a', function(e) {
        e.preventDefault();
        $('#header_search_options .search-option').removeClass('active');
        $(this).closest('li').addClass('active');
        $('#bo_search_type').val($(this).data('value'));
        $('#search_type_icon').removeAttr("class").addClass($(this).data('icon'));
        $('#bo_query').attr("placeholder", $(this).data('placeholder'));
        $('#bo_query').focus();
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
// var $btn_edit = $(".btn-edit");
$(".btn-edit").on( "click", function(e) {
    e.preventDefault();

    var btn_save_undo = ".btn-save, .btn-undo",
        btn_edit_delete = ".btn-edit, .btn-del",
        $this =  $(this);
    // hide button edit * delete 
    // show button save * cancel    
    $this.closest('.actions').find(btn_save_undo).removeClass('hide');
    $this.closest('.actions').find(btn_edit_delete).addClass('hide');
    // hide form 
    var el = $this.closest(".timeline-item").find(".holder_information");
    el.addClass('wow fadeOutUp animated pos-absolute');
    // add overlay
    $(".overlay").addClass('on-overlay');
    // show form
    var el_edit = $this.closest(".timeline-item").find(".upgrade_specification"); 
    // add z-index 9999 above overlay 9998
    $this.closest(".timeline-item").css("z-index", "9999");

    el_edit.removeClass('hide').addClass('wow fadeInUp animated pos-relative');

    // alert($this.parents('.timeline').find('.timeline-wrap').length);
    // var index = $btn_edit.index(this);
    // alert(index);

   // scroll_if_anchor( $this.closest('.timeline-wrap').attr('id') );
    var id = $this.closest('.timeline-wrap').attr('id');//.replace('timeline-wrap-','')
    var el = $this.closest('.timeline-wrap');


    var slideOffeset = -100;
    scrollTo(el, slideOffeset);

    // $('html, body').animate({
    //     scrollTop: $("#" + id).closest('.time-label').offset().top
    // }, 1000);

   // alert($this.closest('.timeline-wrap').attr('id').replace('timeline-wrap-',''));

});

$(".btn-undo").on( "click", function(e) {
    e.preventDefault();
    var btn_save_undo = ".btn-save, .btn-undo",
        btn_edit_delete = ".btn-edit, .btn-del";
    // remove overlay
    $(".overlay").removeClass('on-overlay');

    var el = $(this).closest(".timeline-item").find(".holder_information");


    el.removeClass('wow fadeOutUp animated pos-absolute');     
    el.addClass('wow fadeInDown animated');

    var el_edit = $(this).closest(".timeline-item").find(".upgrade_specification"); 
    $(this).closest(".timeline-item").css("z-index", "2");

    el_edit.removeClass('wow fadeInUp animated pos-relative').addClass('hide');

    $(this).closest('.actions').find(btn_save_undo).addClass('hide');
    $(this).closest('.actions').find(btn_edit_delete).removeClass('hide');

    // btn_save_undo.addClass('hide');
    // btn_edit_delete.removeClass('hide');
});

$('.show_hide_inner_timeline').on("click", function(e) {
        e.preventDefault();
        var el = $(this).closest(".timeline-item").children(".timeline-body, .timeline-footer"),
        header;
        

        // if ($(this).closest(".time-label").find('.panel-footer').length > 0)
        //     var el_footer = $(this).closest(".time-label").children(".panel-footer");

        if (el.is(":visible")) {
            $(this).find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
            header = $(this).closest(".timeline-item").addClass("open");
            el.slideUp(200);
            // if ($(this).closest(".time-label").find('.sub-title').length > 0)
            //     $(this).closest(".time-label").find('.sub-title').show();
            // if ($(this).closest(".time-label").find('.panel-footer').length > 0)
            //     el_footer.slideUp(200);
        } else {
            $(this).find("i").removeClass("icon-chevron-up").addClass("icon-chevron-down");
            header = $(this).closest(".timeline-item").removeClass("open");
            el.slideDown(200);
            // if ($(this).closest(".time-label").find('.sub-title').length > 0)
            //     $(this).closest(".time-label").find('.sub-title').hide();
            // if ($(this).closest(".time-label").find('.panel-footer').length > 0)
            //     el_footer.slideDown(200);
        }
    });//.trigger('click');

$('.show_hide_timeline').on("click", function(e) {
        e.preventDefault();
        var el = $(this).closest(".time-label").children(".timeline-wrap");

        // if ($(this).closest(".time-label").find('.panel-footer').length > 0)
        //     var el_footer = $(this).closest(".time-label").children(".panel-footer");

        if (el.is(":visible")) {
            $(this).find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
            el.slideUp(200);
            // if ($(this).closest(".time-label").find('.sub-title').length > 0)
            //     $(this).closest(".time-label").find('.sub-title').show();
            // if ($(this).closest(".time-label").find('.panel-footer').length > 0)
            //     el_footer.slideUp(200);
        } else {
            $(this).find("i").removeClass("icon-chevron-up").addClass("icon-chevron-down");
            el.slideDown(200);
            // if ($(this).closest(".time-label").find('.sub-title').length > 0)
            //     $(this).closest(".time-label").find('.sub-title').hide();
            // if ($(this).closest(".time-label").find('.panel-footer').length > 0)
            //     el_footer.slideDown(200);
        }
    });//.trigger('click');

    $('.panel .show_hide').on("click", function(e) {
        e.preventDefault();
        var el = $(this).closest(".panel").children(".panel-body");

        if ($(this).closest(".panel").find('.panel-footer').length > 0)
            var el_footer = $(this).closest(".panel").children(".panel-footer");

        if (el.is(":visible")) {
            $(this).find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
            el.slideUp(200);
            if ($(this).closest(".panel").find('.sub-title').length > 0)
                $(this).closest('.panel').find('.sub-title').show();
            if ($(this).closest(".panel").find('.panel-footer').length > 0)
                el_footer.slideUp(200);
        } else {
            $(this).find("i").removeClass("icon-chevron-up").addClass("icon-chevron-down");
            el.slideDown(200);
            if ($(this).closest(".panel").find('.sub-title').length > 0)
                $(this).closest('.panel').find('.sub-title').hide();
            if ($(this).closest(".panel").find('.panel-footer').length > 0)
                el_footer.slideDown(200);
        }
    });//.trigger('click');

if ( $("#tabelRouting").length > 0 ) {

    $("#tabelRouting tbody").sortable().bind('sortupdate', function(e, ui) {
        var id = 0;
        //var ids = ui.item.attr('id').replace('tr_','');
        //alert(ids);

        //var data;
        $.each(e.target.children, function(index, element) {
            $(element).find('.step').val(++id);
        });
    });
    }
}); //end dom ready


//move to hash after clicking on anchored links
function scroll_if_anchor(href) {
    // alert(href);
    href = typeof(href) === "string" ? href : $(this).attr("href");
    var fromTop = 10;
    if (href.indexOf("#") === 0) {
        var $target = $(href);
        if ($target.length) {
            $('html, body').animate({ scrollTop: $target.offset().top - fromTop });
            if (history && "pushState" in history) {
                history.pushState({}, document.title, window.location.pathname + href);
                return false;
            }
        }
    }
}

function addShadow() {
    if ( $(".page-sidebar").length > 0 ) {
         var shadow = $('.navbar-inverse, #header_infos');
         shadow.css({ 
                     '-webkit-boxShadow':'0 1px 10px rgba(0, 0, 0, 0.2)', 
                     '-moz-boxShadow':'0 1px 10px rgba(0, 0, 0, 0.2)', 
                     'boxShadow':'0 1px 10px rgba(0, 0, 0, 0.2)', 
                     'borderColor':'rgba(0,0,0,0.2)'
                    });
    }    
}


function displayTab(tab) {
    $('.content_tab').removeClass('active').hide().find('.content_tab_wrapper').hide();
    $('.tab-row.active').removeClass('active');
    //setTimeout( function() {
    $('#content_tab_' + tab).addClass('active').show().find('.content_tab_wrapper').show();
    //}, 25 );
    $('#tab_link_' + tab).parent().addClass('active');
    $('#currentFormTab').val(tab);
}

// function replaceList()

function download(file) {
    window.location=file;
}