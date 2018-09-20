// ------------------------------------------------------------------------
//   Stay Alive for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init Language Plz');
        initStyle ();
        window.cleanchat = false;
        window.chatline = '';
        window.chatlinetext = '';
        window.cleanchatscrollbottom = false;
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );

    }
    
    SWAM.on ( 'gameLoaded', init );
    
    //var chatline = '';
    //var chatlinetext = '';
    //var newchatline = '';
    
    function initStyle () {

        const cleanchatStyle = `
                    <style id='cleanchatStyle'>
                        
                        
                        .cleanchatmode .line:not(.cleanchatline) {display:none;}
                        .cleanchatmode .cleanchatline {display:block;}
                        
                    </style>
                `
        $('head').append ( cleanchatStyle );
    }
    
    
    
    $('#chatbox').mouseenter(function() {
        if (cleanchat == true) {
            window.cleanchatscrollbottom = false;
        }
    });
    $('#chatbox').mouseleave(function() {
         if (cleanchat == true) {   
            window.cleanchatscrollbottom = true;
         }
    });
    
    SWAM.on ( 'gamePrep', function () {
        if (cleanchat == true) {
            $('#chatlines > .line').each(function( index ) {
                //$(this).delay(1000).fadeOut("slow");
            });
        }
    });
    
    
    
    function cleanthechat(chatline,chatlinetext){
        
            wordArray = chatlinetext.split(' ');

            cleanwordstr = '';
            function checker(value) {
                var prohibited = ['asshole', 'bitch', 'cunt', 'dick', 'fag', 'fuck', 'fucker', 'pussy', 'fuckoff', 'moron', 'shit', 'stfu', 'shutup', 'shut up', 'whore'];
				
                var regex = new RegExp(prohibited.map(function(s) {
                    //return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
                    return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
                }).join('|'));
                
                if (!regex.test(value)){
                    // console.log("not test value " + value);
                    
                    if (value == "ass"){
                        var replacewith = '🍑';
                        cleanwordstr = cleanwordstr + ' ' + replacewith;
                    }
                    else {
                        cleanwordstr = cleanwordstr + ' ' + value;
                    }
                }
                else {
                    // console.log("test value " + value);
                    // X mark : ❌
                    // love letter : 💌
                    // sparkling heart : 💖
                    // hibiscus : 🌺
                    // blossom : 🌼
                    // sunflower : 🌻
                    // bouquet : 💐
                    // rose : 🌹
                    // cherry blossow : 🌸
                    var replacewitharray = ['❌','💌','💖','🌺','🌼','🌻','💐','🌹','🌸'];
                    
                    
                    var replacewith = replacewitharray[Math.floor(Math.random()*replacewitharray.length)];
                    
                    if (['asshole', 'assholes'].indexOf(value) >= 0) {
                        replacewith = '🌺';
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
                    else if (['pussy', 'pussies', 'cunt', 'cunts'].indexOf(value) >= 0){
                        
                        replacewith = '🐱';
                    }
                    else if (['bitch', 'bitches','whore'].indexOf(value) >= 0){
                       replacewith = '👿';
                    }
                    else if (['stfu', 'shutup', 'shut up'].indexOf(value) >= 0){
                        
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
    
    
    
    SWAM.on ( 'chatLineAdded', function () {
        if (cleanchat == true) {

            function cleanchatscrollbottomornot () {
                
                if (cleanchatscrollbottom == true) {
                    
                    var chatbox    = $('#chatbox');
                    var cbheight = chatbox[0].scrollHeight;
                    chatbox.scrollTop(cbheight);
                }
                
            }
            
            chatline = $('#chatlines > .line:last')[0].outerHTML;
            $('#chatlines > .line:last').addClass('defaultchat');

            
            chatlinetext = $('#chatlines > .line:last > .text').text();
            
            
            chatline = cleanthechat(chatline,chatlinetext);
            
            
            $(chatline).insertAfter( "#chatlines > .line:last" ).addClass('cleanchatline');
            // TODO : add a num id and limit chatlines added
            // or replace default chatline, and insert invisible divs for replaced words
            // and display them when back to default chat mode
            
            // prevent scroll when chatbox is hovered
            
            cleanchatscrollbottomornot();
            
        }
        
    });   
    
    
    /* GUI */
    
    $('#minimizechatcontainer').append ("<div id='cleanchatGUIcontainer' style='display: block;'><div id='cleanchatbtn' style='display: block; position: absolute; right: 150px; width: 80px; height: 15px; padding: 5px; background: rgba(0, 0, 0, 0.5); border-radius: 5px; text-align: center; color: #EEE; font-size: 10px; cursor: pointer;'>CleanChat</div></div>");

    
    $("#cleanchatbtn").click(function (){
        if (cleanchat == false) {
            cleanchat = true;

            // add a cleanchatmode class to #chatlines
            $('#chatlines').addClass('cleanchatmode');
            
            $('#chatlines > .line:not(.cleanchatline)').each(function() {
                //$(this).delay(1000).fadeOut("slow");
                // TODO : clean up all defaultchat lines 
                // wich doesnt have defaultchat class added (yet)
                // cleanthechat(chatline,chatlinetext)
                if ($(this).hasClass('defaultchat')){
                    // already cleaned up
                } 
                else {
                    window.chatline = $(this).outerHTML;
                    $(this).addClass('defaultchat');


                    chatlinetext = $(this).find('.text').text();


                    window.chatline = cleanthechat(chatline,chatlinetext);


                    $(chatline).insertAfter( "#chatlines > .line:last" ).addClass('cleanchatline');
                    
                }
                
                
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
     
    /* REGISTER */

    SWAM.registerExtension ({
        name: 'CleanChat',
        id: 'CleanChat',
        description: '',
        version: '0.0.1',
        author: 'xplay'
    });
    
}();