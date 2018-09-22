// ------------------------------------------------------------------------
//   Stay Alive for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init Language Plz');
        initStyle ();
        window.cleanchat = false;
        //window.chatline = '';
        //window.chatlinetextcontent = '';
        window.cleanchatscrollbottom = false;
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );

    }
    
    SWAM.on ( 'gameLoaded', init );
    
    //var chatline = '';
    //var chatlinetextcontent = '';
    //var newchatline = '';
    
    
    /* .cleanchatline {display:none;}
                        .cleanchatmode .line:not(.cleanchatline) {display:none;}
                        .cleanchatmode .cleanchatline {display:block;}
                        */
    
    
    function initStyle () {

        const cleanchatStyle = `
                    <style id='cleanchatStyle'>
                        
                        
                        .replacedby {display:none;}
                        .replacedword {display:inline-block;}
                        .cleanchatmode .replacedword {display:none;}
                        .cleanchatmode .replacedby {display:inline-block;}
                    
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
    
    
    
    function cleanthechat(chatline,chatlinetextcontent){
            console.log('CleantheChat :' + chatline + ' & text :' + chatlinetextcontent)
            
            var wordArray = chatlinetextcontent.split(' ');

            
            var cleanwordstr = '';
        
            // run checker on every word of the chatline
            function checker(word) {
                
                var prohibited = ['asshole', 'bitch', 'cunt', 'cock', 'dick', 'fag', 'fuck', 'f*ck', 'wtf', 'motherfucker', 'pussy', 'moron', 'shit', 'stfu', 'shutup', 'shut up', 'whore'];
                
                var replacewitharray = ['🌺','👿','🐱','🍌','🍌','🌈','💖','💖','💖','👿','🐱','👿','💩','🙊','🙊','🙊','👿'];
				/*
                var regex = new RegExp(prohibited.map(function(s) {
                    //return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
                    return s.replace(/[-/\\^$*+?.()|[\]{}]/gi, '\\$&')
                }).join('|'));
                */
                // var index = 0;
                // searching every prohibited word inside tested word
                var tester = prohibited.map(function(s) {
                    console.log(word.toLowerCase().search(s));
                    
                    var testresult = word.toLowerCase().search(s);
                    return testresult
                }); 
                
                
                if (tester.indexOf(0) >= 0){
                    
                    
                    console.log(word + " match a prohibited word ! i:" + tester.indexOf(0));
                    // X mark : ❌
                    // love letter : 💌
                    // sparkling heart : 💖
                    // hibiscus : 🌺
                    // blossom : 🌼
                    // sunflower : 🌻
                    // bouquet : 💐
                    // rose : 🌹
                    // cherry blossow : 🌸
                   
                    var replacewith = "<div class='replacedword'>" + word + "</div><div class='replacedby'>" + replacewitharray[tester.indexOf(0)] + "</div>";
                    
                    
                    
                
                    cleanwordstr = cleanwordstr + ' ' + replacewith;
                }
                else {
                    console.log(word + " doesnt match any prohibited word");
                    /*
                    if (word == "ass"){
                        var replacewith = '🍑';
                        cleanwordstr = cleanwordstr + ' ' + replacewith;
                    }
                    else {
                        cleanwordstr = cleanwordstr + ' ' + word;
                    }
                    */
                    cleanwordstr = cleanwordstr + ' ' + word;
                }
                
                //if (!regex.test(word)){
                
                
                
                return cleanwordstr;
                //return !regex.test(word);
            }
            
	

            wordArray = wordArray.filter(checker);
 
            // TODO : parse chatline to replace only inside text div
            // chatlinetextelem.text(cleanwordstr);
            //chatline = chatline.replace(chatlinetextcontent,cleanwordstr);
            chatlinecleantextcontent = cleanwordstr;
        
            //return chatline
            return chatlinecleantextcontent
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
            //$('#chatlines > .line:last').addClass('defaultchat');

            chatlinetextelem = $('#chatlines > .line:last > .text');
            chatlinetextcontent = $('#chatlines > .line:last > .text').text();
            
            
            //chatline = cleanthechat(chatline,chatlinetextcontent);
            chatlinecleantextcontent = cleanthechat(chatline,chatlinetextcontent);
            
            
            //$(chatline).insertAfter( "#chatlines > .line:last" ).addClass('cleanchatline');
            $('#chatlines > .line:last > .text').html(chatlinecleantextcontent);
            $('#chatlines > .line:last').addClass('cleanchatline');
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
                // cleanthechat(chatline,chatlinetextcontent)
                //if ($(this).hasClass('defaultchat')){
                if ($(this).hasClass('cleanchatline')){
                    // already cleaned up
                } 
                else {
                    chatline = $(this)[0].outerHTML;
                    chatlinetextcontent = $(this).find('.text').text();
                    //$(this).addClass('defaultchat');
                        
                    
                    console.log(chatline + ' text :' + chatlinetextcontent)
                    
                    //chatline = cleanthechat(chatline,chatlinetextcontent);
                    chatlinecleantextcontent = cleanthechat(chatline,chatlinetextcontent);    

                    //$(chatline).insertAfter( "#chatlines > .line:last" ).addClass('cleanchatline');
                    $(this).find('.text').html(chatlinecleantextcontent);
                    $(this).addClass('cleanchatline');             
                }
                
                
            });
            
            $("#cleanchatbtn").html('Dirty Chat');

        }
        else {
            cleanchat = false;
            
            // remove cleanchatmode class from #chatlines
            $('#chatlines').removeClass('cleanchatmode');
            /*
            $('#chatlines > .line').each(function( index ) {
                $(this).delay(1000).fadeIn("slow");
            });
            */
            //$('#chatlines > .cleanchatline').css({display: "none"});
            //$('#chatlines > .line').not('.cleanchatline').each(function( index ) {
                //$(this).delay(1000).fadeIn("slow");
            //});
            
            
            
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