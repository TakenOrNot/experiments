// ------------------------------------------------------------------------
//   Stay Alive for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init Focus');
        initStyle ();
        window.focusmode = false;
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );

    }
    
    SWAM.on ( 'gameLoaded', init );
    
    
    function initStyle () {

        const focusStyle = `
                    <style id='focusmodeStyle'>
                        
                        .focusmode > #chatbox > #chatlines > .line {opacity:1; -webkit-animation: fadeaway .5s forwards; animation-iteration-count: 1;}
                        
                        

                        @-webkit-keyframes fadeaway {
                              from {

                                opacity: 1;
                              }
                              to {

                                opacity: 0;
                              }
                            }

                    </style>
                `
        $('head').append ( focusStyle );
    }
    
    /* GUI */
    
    $('body').append ("<div id='focuscontainer' style='display: block;'><div id='focus' style='display: block; position: absolute; right: 150px; margin: 0px 0px 0px 125px; top: 14px; width: 80px; height: 15px; padding: 5px; background: rgba(0, 0, 0, 0.5); border-radius: 5px; text-align: center; color: #EEE; font-size: 10px; cursor: pointer;'>Focus Mode</div></div>");

    $("#focus").click(function (){
        if (focusmode == false) {
            focusmode = true;
            //$('body').addClass('focusmode');
            $('#logosmall').toggle( "slide" );
            $('#scorebig').toggle( "slide" );
            $('#roomnamecontainer').fadeToggle( "fast");
            $('#scoreboard').toggle( "slide" );
            $('#sidebar').fadeToggle( "fast");
            $('#menu').fadeToggle( "fast");
            // $('#chatbox').toggle( "slide" );
            $('#settings').fadeToggle( "fast");
            
            $('#chatlines > .line').each(function( index ) {
                $(this).delay(1000).fadeOut("slow");
            });
            
            $("#focus").html('Stop Focus');

        }
        else {
            focusmode = false;
            //$('body').removeClass('focusmode');
            $('#logosmall').toggle( "slide" );
            $('#scorebig').toggle( "slide" );
            $('#roomnamecontainer').fadeToggle( "fast");
            $('#scoreboard').toggle( "slide" );
            $('#sidebar').fadeToggle( "fast");
            $('#menu').fadeToggle( "fast");
            // $('#chatbox').toggle( "slide" );
            $('#settings').fadeToggle( "fast");
            
            $('#chatlines > .line').each(function( index ) {
                $(this).delay(1000).fadeIn("slow");
            });
            $("#focus").html('Focus Mode');
        }
    });
    
    SWAM.on ( 'gamePrep', function () {
        if (focusmode == true) {
            $('#chatlines > .line').each(function( index ) {
                $(this).delay(1000).fadeOut("slow");
            });
        }
    });
    
    var chatline = '';
    var newchatline = '';
    SWAM.on ( 'chatLineAdded', function () {
        if (focusmode == true) {
            
            //$('#chatlines > .line:last').delay(10000).fadeToggle( "slow");
            chatline = $('#chatlines > .line:last')[0].outerHTML;
            
            //newchatline = $('#chatlines > .line:first').prepend(chatline);
            //$('#chatlines > .line:last').delay(10000).slideUp("slow");
            //$('#chatlines > .line:first').delay(10000).slideDown("slow");
            $(chatline).insertBefore( "#chatlines > .line:first" );
            $('#chatlines > .line:last').remove();
            
            // TODO : dont only fadeToggle first line, target all visible lines
            //$('#chatlines > .line:first').delay(10000).fadeToggle("slow");
            //$('#chatlines > .line:visible').not( ".focushiden" ).delay(10000).fadeToggle("slow", function() {$(this).addClass('focushiden').css({display: "none"});});
            $('#chatlines > .line:visible').not( ".focushiden" ).addClass('focushiden').delay(10000).fadeToggle("slow", function() {$(this).css({display: "none"});});
            
            //.not( ".focushiden" )
            //$('#chatlines > .line:first').delay(10000).slideDown("slow");
            //$(newchatline).delay(10000).slideDown("slow");
            
            // TODO if firstchild hasclass whisper / team
            // delay 30
            // else 
            // delay 10
        }
    });
    
    function onKeydown ( event ) {
        
        if ( event.originalEvent.key === 'v' ) { //note: This is not reliable to know if player is actually spectating

            event.stopImmediatePropagation ();
               
            
        }

        
    }
    
    
    /* REGISTER */

    SWAM.registerExtension ({
        name: 'Focus',
        id: 'Focus',
        description: '',
        version: '1.0.0',
        author: 'xplay'
    });
    
}();