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
    }

    function initEvents () {
        SWAM.on ( 'CTF_FlagEvent', onFlagEvent );

    }
    
    SWAM.on ( 'gameLoaded', init );
    
    
    
    function initStyle () {

        const carrierinfoStyle = `
                    <style id='carrierinfoStyle'>
                        
                    

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
    
    $('body').append("<div id='blueflagcarrierinfo' style='position: absolute;left: 50%;margin-left: -205px; top: 1em; padding: 0 1em 0 0; color: white;height: 35px;width: 100px;text-align: right;'></div><div id='redflagcarrierinfo' style='position: absolute;right: 50%; margin-right: -205px; top: 1em; padding: 0 1em 0 0; color: white;height: 35px;width: 100px;text-align: right;'></div>");
    
    
    
    
    
    
    SWAM.on ( 'gamePrep', function () {
        let ship1 = document.querySelector('#sidebar #selectaircraft-1');
        let ship1compStyles = window.getComputedStyle(ship1);
        var ship1bg = ship1compStyles.getPropertyValue('background');

        let ship2 = document.querySelector('#sidebar #selectaircraft-2');
        let ship2compStyles = window.getComputedStyle(ship2);
        var ship2bg = ship2compStyles.getPropertyValue('background');

        let ship3 = document.querySelector('#sidebar #selectaircraft-3');
        let ship3compStyles = window.getComputedStyle(ship3);
        var ship3bg = ship3compStyles.getPropertyValue('background');

        let ship4 = document.querySelector('#sidebar #selectaircraft-4');
        let ship4compStyles = window.getComputedStyle(ship4);
        var ship4bg = ship4compStyles.getPropertyValue('background');

        let ship5 = document.querySelector('#sidebar #selectaircraft-5');
        let ship5compStyles = window.getComputedStyle(ship5);
        var ship5bg = ship5compStyles.getPropertyValue('background');


        shipstylearray = [ship1bg, ship2bg, ship3bg, ship4bg, ship5bg];
    });
    
    
    
    
    var carriername = '';
    function onFlagEvent ( event, team, verb ) {
        
            console.log('FLAG EVENT : ' + team + ' ' + verb);
        
            if ( team == 1) {
                carriername = $( "#blueflag-name" ).justtext();
                if (carriername.length > 0){
                    if (!window.checkblueflag){
                        window.checkblueflag = true;
                        var checkblueflaginterval = setInterval(checkbluecarry, 1000);

                    }
                }
            }
            else if ( team == 2){
                carriername = $( "#redflag-name" ).justtext();
                
                if (carriername.length > 0){ 
                    if (!window.checkredflag){
                        window.checkredflag = true;
                        var checkredflaginterval = setInterval(checkredcarry, 1000);

                    }
                }
                
            }
        
            // check if still beeing carried (no drop event...)
            
            function checkbluecarry(){
                var carriername = $( "#blueflag-name" ).justtext();
                if (carriername.length > 0){ 
                    
                    var carrierobj = Players.getByName(carriername); 
                    var carrierid = carrierobj['id'];
                    var carrierteam = carrierobj['team'];
                    var carriership = Players.get(carrierid).type;
                    var carrierhealth = Math.round(Players.get(carrierid).health * 100) / 100;
                    var carriershiparrindex = (carriership - 1);
                    $('#blueflagcarrierinfo').html(carrierhealth);
                    $('#blueflagcarrierinfo').css({background: shipstylearray[carriershiparrindex] });
                    console.log(carriername + " carrying blue flag with ship : " + Players.get(carrierid).type + " and health : " + Players.get(carrierid).health);
                    
                }
                else {
                    console.log("noone carrying blue flag");
                    $('#blueflagcarrierinfo').html('');
                    $('#blueflagcarrierinfo').css({background: "none"});    
                    clearInterval(checkblueflaginterval);
                    window.checkblueflag = '';
        
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
                    var carriershiparrindex = (carriership - 1);
                    $('#redflagcarrierinfo').html(carrierhealth); 
                    $('#redflagcarrierinfo').css({background: shipstylearray[carriershiparrindex]});
                    console.log(carriername + " carrying red flag with ship : " + Players.get(carrierid).type + " and health : " + Players.get(carrierid).health);
                    
                }
                else {
                    console.log("noone carrying red flag");
                    $('#redflagcarrierinfo').html('');
                    $('#redflagcarrierinfo').css({background: "none"}); 
                    clearInterval(checkredflaginterval);
                    window.checkredflag = '';
                }
                    
                
            }
                
                
            
    };
    
    
    
    
    
    
    /* REGISTER */

    SWAM.registerExtension ({
        name: 'CarrierInfo',
        id: 'CarrierInfo',
        description: '',
        version: '0.0.1',
        author: 'xplay'
    });
    
}();