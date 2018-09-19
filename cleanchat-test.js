// ------------------------------------------------------------------------
//   Stay Alive for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init Language Plz');
        initStyle ();
        window.cleanchat = false;

    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );

    }
    
    SWAM.on ( 'gameLoaded', init );
    
    var chatline = '';
    var chatlinetext = '';
    
    function initStyle () {

        const cleanchatStyle = `
                    <style id='cleanchatStyle'>
                        
                        
                        .cleanchatmode .line:not(.cleanchatline) {display:none;}
                        .cleanchatmode .cleanchatline {display:block;}
                        
                    </style>
                `
        $('head').append ( cleanchatStyle );
    }
    
    /* GUI */
    
    $('#minimizechatcontainer').append ("<div id='cleanchatGUIcontainer' style='display: block;'><div id='cleanchatbtn' style='display: block; position: absolute; right: 150px; width: 80px; height: 15px; padding: 5px; background: rgba(0, 0, 0, 0.5); border-radius: 5px; text-align: center; color: #EEE; font-size: 10px; cursor: pointer;'>CleanChat</div></div>");

    
    
    
    
    $("#cleanchatbtn").click(function (){
        if (cleanchat == false) {
            cleanchat = true;

            // add a cleanchatmode class to #chatlines
            $('#chatlines').addClass('cleanchatmode');
            
            $('#chatlines > .line').each(function() {
                //$(this).delay(1000).fadeOut("slow");
            });
            
            $("#cleanchatbtn").html('Dirty Chat');

        }
        else {
            cleanchat = false;
            
            // remove cleanchatmode class to #chatlines
            $('#chatlines').removeClass('cleanchatmode');
            /*
            $('#chatlines > .line').each(function( index ) {
                $(this).delay(1000).fadeIn("slow");
            });
            */
            $('#chatlines > .cleanchatline').css({display: "none"});
            $('#chatlines > .line').not('.cleanchatline').each(function( index ) {
                //$(this).delay(1000).fadeIn("slow");
            });
            
            
            
            $("#cleanchatbtn").html('Clean Chat');
        }
    });
    
    SWAM.on ( 'gamePrep', function () {
        if (cleanchat == true) {
            $('#chatlines > .line').each(function( index ) {
                //$(this).delay(1000).fadeOut("slow");
            });
        }
    });
    
    function cleanchat(chatline,chatlinetext){
        
            wordArray = chatlinetext.split(' ');

            cleanwordstr = '';
            function checker(value) {
                var prohibited = ['asshole', 'bitch', 'cunt', 'dick', 'fag', 'fuck', 'fucker', 'pussy', 'fuckoff', 'moron', 'shit', 'stfu', 'shutup'];
				
                var regex = new RegExp(prohibited.map(function(s) {
                    //return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
                    return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
                }).join('|'));
                
                if (!regex.test(value)){
                    console.log("not test value " + value);
                    cleanwordstr = cleanwordstr + ' ' + value;
                }
                else {
                    console.log("test value " + value);
                    //X mark : ❌
                    // love letter : 💌
                    // sparkling heart : 💖
                    // hibiscus : 🌺
                    var replacewitharray = ['❌','💌','💖','🌺'];
                    // var replacewith = '💌';
                    
                    var replacewith = replacewitharray[Math.floor(Math.random()*replacewitharray.length)];
                    
                    if (value == 'asshole') {
                        replacewith = '🍑';
                    }
                    if (value == 'shit') {
                        replacewith = '💩';
                    }
                    else if (value == 'bullshit'){
                        replacewith = '🐮💩';
                    }
                    else if (value == 'dick'){
                        replacewith = '🍌';
                    }
                    else if (['fag', 'faggot', 'faggots'].indexOf(value) >= 0){
                        
                        replacewith = '🌈';
                    }
                    else if (['pussy', 'cunt'].indexOf(value) >= 0){
                        
                        replacewith = '🐱';
                    }
                    else if (['bitch', 'bitches'].indexOf(value) >= 0){
                       replacewith = '🚺';
                    }
                    else if (['stfu', 'shutup'].indexOf(value) >= 0){
                        
                        replacewith = '🙊';
                    }
                    
                
                    cleanwordstr = cleanwordstr + ' ' + replacewith;
                }
                
                return cleanwordstr;
                //return !regex.test(value);
            }
            
	

            wordArray = wordArray.filter(checker);
 
            
            chatline = chatline.replace(chatlinetext,cleanwordstr);
            
            return chatline
    }   
    
    
    var chatline = '';
    var chatlinetext = '';
    var newchatline = '';
    SWAM.on ( 'chatLineAdded', function () {
        if (cleanchat == true) {

            
            
            chatline = $('#chatlines > .line:last')[0].outerHTML;
            $('#chatlines > .line:last').addClass('defaultchat');

            
            chatlinetext = $('#chatlines > .line:last > .text').text();
            
            
            cleanchat(chatline,chatlinetext);
            
            $(chatline).insertAfter( "#chatlines > .line:last" ).addClass('cleanchatline');


        }
        
    });   
     
    /* REGISTER */

    SWAM.registerExtension ({
        name: 'CleanChat',
        id: 'CleanChat',
        description: '',
        version: '0.0.1',
        author: 'xplay'
    });
    
}();