// ------------------------------------------------------------------------
//   Carrier Info for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init CarrierInfo');
        initStyle ();
        initEvents ();
        window.checkblueflag = '';
        window.checkredflag = '';
        window.redcarriership = '';
        window.redcarrierhealth = '';
        window.bluecarriership = '';
        window.bluecarrierhealth = '';
        window.sauron = '';
    }

    function initEvents () {
        SWAM.on ( 'CTF_FlagEvent', onFlagEvent );

    }
    
    SWAM.on ( 'gameLoaded', init );
    
    
    
    function initStyle () {

        const carrierinfoStyle = `
                    <style id='carrierinfoStyle'>
                        #blueflagcarrierinfo {position: absolute;left: 50%; top: 49px; padding: 0 105px 0 0; color: white;height: 35px;min-width: 80px;text-align: right; line-height: 35px; vertical-align: middle; border-radius:100px;z-index:1;}
                        #redflagcarrierinfo {position: absolute;right: 50%; top: 49px; padding: 0 0 0 105px; color: white;height: 35px;min-width: 80px;text-align: left; line-height: 35px; vertical-align: middle; border-radius:100px;z-index:1;}
                        #gamespecific .blueflag {z-index: 2;}
                        #gamespecific .blueflag-player {z-index: 2;}
                        #gamespecific #blueflag-name {z-index: 2;}
                        #gamespecific #blueflag-name .rounds {margin-left: 50px;z-index: 2;}
                        #gamespecific .redflag {z-index: 2}
                        #gamespecific #redflag-name {z-index: 2;}
                        #gamespecific .redlag-player {z-index: 2;}
                        #gamespecific #redflag-name .rounds {margin-right: 50px;z-index: 2;}
                    </style>
                `
        $('head').append ( carrierinfoStyle );
    }
    
    jQuery.fn.justtext = function() {
  
        return $(this)	.clone()
                .children()
                .remove()
                .end()
                .text();

    };
    
    /* GUI */
    
    $('body').append("<div id='blueflagcarrierinfo'><div class='ship'></div><div class='health'></div></div><div id='redflagcarrierinfo'><div class='health'></div><div class='ship'></div></div>");
    
    
    
    
    
    
    // check if still beeing carried (no drop event...)
            
            function checkbluecarry(){
                var carriername = $( "#blueflag-name" ).justtext();
                if (carriername.length > 0){ 
                    
                    
                    var carrierobj = Players.getByName(carriername); 
                    var carrierid = carrierobj['id'];
                    var carrierteam = carrierobj['team'];
                    var carriership = Players.get(carrierid).type;
                    
                     
                    var carrierhealth = Math.round(Players.get(carrierid).health * 100) / 100;
                    carrierhealth = Math.trunc(carrierhealth * 100);
                    
                    if (window.redcarrierhealth != carrierhealth){
                        //$('#blueflagcarrierinfo').html(carrierhealth);
                        $('#blueflagcarrierinfo > .health').html("[" + carrierhealth + "]");
                        
                        $('#blueflagcarrierinfo').width($('#blueflag-name').width() - 20);
                        $('#blueflagcarrierinfo').css( {marginLeft : "-" + ($('#blueflag-name').width() + 90) + "px"});
                    }
                    
                    if (window.redcarriership != carriership) {
                        //$('#blueflagcarrierinfo').addClass('ship-' + carriership);
                        var carriershiparrindex = (carriership - 1);
                        $('#blueflagcarrierinfo > .ship').css({background: shipstylearray[carriershiparrindex] }).css("background-color", "rgba(255,0,0,.25)");
                    }
                    
                    
                    
                    window.redcarriership = carriership;
                    window.redcarrierhealth = carrierhealth;
                    
                    
                    console.log(carriername + " carrying blue flag with ship : " + Players.get(carrierid).type + " and health : " + Players.get(carrierid).health);
                    
                }
                else {
                    console.log("noone carrying blue flag");
                    //$('#blueflagcarrierinfo').html('').removeClass();
                    $('#blueflagcarrierinfo > .health').html('');
                    $('#blueflagcarrierinfo').css({background: "none"});    
                    clearInterval(window.checkblueflaginterval);
                    window.checkblueflag = '';
                    window.redcarriership = '';
                    window.redcarrierhealth = '';
        
                }
                
            }
        
        
            function checkredcarry(){
                var carriername = $( "#redflag-name" ).justtext();
                if (carriername.length > 0){ 
                    
                    var carrierobj = Players.getByName(carriername); 
                    var carrierid = carrierobj['id'];
                    var carrierteam = carrierobj['team'];
                    var carriership = Players.get(carrierid).type;
                    
                    var carrierhealth = Math.round(Players.get(carrierid).health * 100) / 100;
                    carrierhealth = Math.trunc(carrierhealth * 100);
                    
                    if (window.bluecarrierhealth != carrierhealth){
                        $('#redflagcarrierinfo > .health').html("[" + carrierhealth + "]");
                        
                        $('#redflagcarrierinfo').width($('#redflag-name').width() - 20);
                        $('#redflagcarrierinfo').css( {marginRight : "-" + ($('#redflag-name').width() + 90) + "px"});
                    }
                    
                    if (window.bluecarriership != carriership) {
                        //$('#redflagcarrierinfo').addClass('ship-' + carriership);
                        var carriershiparrindex = (carriership - 1);
                        $('#redflagcarrierinfo > .ship').css({background: shipstylearray[carriershiparrindex] }).css("background-color", "rgba(0,255,255,.25)");
                        
                        //$('#redflagcarrierinfo').css('background-position',($('#redflag-name').width() - 58) + "px" + " 44px");
                    } 
                    
                    
                    
                    window.bluecarriership = carriership;
                    window.bluecarrierhealth = carrierhealth;
                    
                    console.log(carriername + " carrying red flag with ship : " + Players.get(carrierid).type + " and health : " + Players.get(carrierid).health);
                    
                }
                else {
                    console.log("noone carrying red flag");
                    //$('#redflagcarrierinfo').html('').removeClass();
                    $('#redflagcarrierinfo > .health').html('')
                    $('#redflagcarrierinfo').css({background: "none"}); 
                    clearInterval(window.checkredflaginterval);
                    window.checkredflag = '';
                    window.bluecarriership = '';
                    window.bluecarrierhealth = '';
                }
                    
                
            }
    
    
    
    
    var carriername = '';
    function onFlagEvent ( event, team, verb ) {
        
            console.log('FLAG EVENT : ' + team + ' ' + verb);
            // check game.myTeam (?)
            if ((team == 1 && game.myTeam == 2) || (team == 1 && window.sauron == true)){
                carriername = $( "#blueflag-name" ).justtext();
                if (carriername.length > 0){
                    if (!window.checkblueflag){
                        window.checkblueflag = true;
                        window.checkblueflaginterval = setInterval(checkbluecarry, 1000);

                    }
                }
            }
            else if ((team == 2 && game.myTeam == 1) || (team == 2 && window.sauron == true)){
                carriername = $( "#redflag-name" ).justtext();
                
                if (carriername.length > 0){ 
                    if (!window.checkredflag){
                        window.checkredflag = true;
                        window.checkredflaginterval = setInterval(checkredcarry, 1000);

                    }
                }
                
            }
        
            
                
                
            
    };
    
    
    SWAM.on ( 'gamePrep', function () {
        setTimeout(()=>{
            //$('#blueflagcarrierinfo').html('').removeClass();
            $('#blueflagcarrierinfo').css({background: "none"}); 
            //$('#redflagcarrierinfo').html('').removeClass();
            $('#redflagcarrierinfo').css({background: "none"}); 

            // if gametype is ctf, set checkblueflag and checkredflag to true 
            // so we can check if flag is already out
            if (game.gameType == SWAM.GAME_TYPE.CTF) {
                if (game.myTeam == 2){
                    window.checkblueflag = true;
                    window.checkblueflaginterval = setInterval(checkbluecarry, 1000);
                }
                else {
                    window.checkredflag = true;
                    window.checkredflaginterval = setInterval(checkredcarry, 1000);
                }
            }
            else {
                window.checkblueflag = '';
                window.checkredflag = '';
            }
            window.redcarriership = '';
            window.redcarrierhealth = '';
            window.bluecarriership = '';
            window.bluecarrierhealth = '';

            //let ship1 = document.querySelector('#sidebar #selectaircraft-1');
            //let ship1compStyles = window.getComputedStyle(ship1);
            //var ship1bg = ship1compStyles.getPropertyValue('background');
            var ship1bg = $('#selectaircraft-1').css("background");

            //let ship2 = document.querySelector('#sidebar #selectaircraft-2');
            //let ship2compStyles = window.getComputedStyle(ship2);
            //var ship2bg = ship2compStyles.getPropertyValue('background');
            var ship2bg = $('#selectaircraft-2').css("background");


            //let ship3 = document.querySelector('#sidebar #selectaircraft-3');
            //let ship3compStyles = window.getComputedStyle(ship3);
            //var ship3bg = ship3compStyles.getPropertyValue('background');
            var ship3bg = $('#selectaircraft-3').css("background");

            //let ship4 = document.querySelector('#sidebar #selectaircraft-4');
            //let ship4compStyles = window.getComputedStyle(ship4);
            //var ship4bg = ship4compStyles.getPropertyValue('background');
            var ship4bg = $('#selectaircraft-4').css("background");

            //let ship5 = document.querySelector('#sidebar #selectaircraft-5');
            //let ship5compStyles = window.getComputedStyle(ship5);
            //var ship5bg = ship5compStyles.getPropertyValue('background');
            var ship5bg = $('#selectaircraft-5').css("background");

            shipstylearray = [ship1bg, ship2bg, ship3bg, ship4bg, ship5bg];
        },0);    
    });
    
    
    
    /* REGISTER */

    SWAM.registerExtension ({
        name: 'CarrierInfo',
        id: 'CarrierInfo',
        description: '',
        version: '0.0.1',
        author: 'xplay'
    });
    
}();