// ------------------------------------------------------------------------
//   Carrier Info for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init HideCursor');
        initStyle ();
        //initEvents ();
        
    }

    function initEvents () {
        //SWAM.on ( 'CTF_FlagEvent', onFlagEvent );

    }
    
    SWAM.on ( 'gameLoaded', init );
    
    
    
    function initStyle () {

        const hidecursorStyle = `
                    <style id='hidecursorStyle'>
                        #gamecanvas {cursor: none;}
                        #gamecanvas .showcursor {cursor: auto;}
                        

                        
                    </style>
                `
        $('head').append ( hidecursorStyle );
    }
    
    
    
    /* GUI */
    
    
    
    
    SWAM.on ( 'gamePrep', function () {
        
        
        if ( $( "#gamecanvas" ).length ) {
            // if element already exist, dont add it again
        }
        else {
            $('canvas').attr('id', 'gamecanvas');
            if ($("#gamecanvas").css("cursor") == "auto" ||  $("#gamecanvas").css("cursor") == "inherit"){
                $( "#gamecanvas" ).css({cursor: "none"});
            }
            
        }
        
        $( "#gamecanvas" ).one('mousemove', function(e) {
        //$( "#gamecanvas" ).mousemove(function( event ) {
            /*
            if ( $(this).hasClass('showcursor') ) {
                
            }
            else {
                
                $(this).addClass('showcursor');
                
                window.setTimeout(function () {
                    $(this).removeClass('showcursor');
                },30000); 
            }
            */
            if ($("#gamecanvas").css("cursor") == "none" ){
                $( "#gamecanvas" ).css({cursor: "inherit"});
            }
            window.setTimeout(function () {
                
                if ($("#gamecanvas").css("cursor") == "auto" ||  $("#gamecanvas").css("cursor") == "inherit"){
                    $( "#gamecanvas" ).css({cursor: "none"});
                }
                
            },10000); 
        });
    
    });
   
    
    
    
    /* REGISTER */

    SWAM.registerExtension ({
        name: 'HideCursor',
        id: 'HideCursor',
        description: '',
        version: '0.0.1',
        //settingsProvider: createSettingsProvider(),
        author: 'xplay'
    });
    
}();