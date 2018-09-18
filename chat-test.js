// ------------------------------------------------------------------------
//   Stay Alive for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init FancyChat');
        initStyle ();
        window.fancychat = false;
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );

    }
    
    SWAM.on ( 'gameLoaded', init );
    
    
    function initStyle () {

        const focusStyle = `
                    <style id='fancychatStyle'>
                        
                        .fancychatmode > #chatbox > #chatlines > .line {opacity:1; -webkit-animation: fadeaway .5s forwards; animation-iteration-count: 1;}
                        
                        

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
    
    $('#minimizechatcontainer').append ("<div id='fancychatGUIcontainer' style='display: block;'><div id='fancychatbtn' style='display: block; position: absolute; right: 150px; width: 80px; height: 15px; padding: 5px; background: rgba(0, 0, 0, 0.5); border-radius: 5px; text-align: center; color: #EEE; font-size: 10px; cursor: pointer;'>FancyChat</div></div>");

    $("#fancychatbtn").click(function (){
        if (fancychat == false) {
            fancychat = true;

            
            $('#chatlines > .line').each(function( index ) {
                $(this).delay(1000).fadeOut("slow");
            });
            
            $("#fancychatbtn").html('Disable FC');

        }
        else {
            fancychat = false;

            $('#chatlines > .line').each(function( index ) {
                $(this).delay(1000).fadeIn("slow");
            });
            $("#fancychatbtn").html('FancyChat');
        }
    });
    
    SWAM.on ( 'gamePrep', function () {
        if (fancychat == true) {
            $('#chatlines > .line').each(function( index ) {
                $(this).delay(1000).fadeOut("slow");
            });
        }
    });
    
    var chatline = '';
    var newchatline = '';
    SWAM.on ( 'chatLineAdded', function () {
        if (fancychat == true) {
            
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
            $('#chatlines > .line:visible').not( ".fancychathiden" ).addClass('fancychathiden').delay(10000).fadeToggle("slow", function() {$(this).css({display: "none"});});
            
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
        name: 'FancyChat',
        id: 'FancyChat',
        description: '',
        version: '0.0.1',
        author: 'xplay'
    });
    
}();