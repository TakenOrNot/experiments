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
    
    $('body').append("<div id='blueflagcarrierinfo' style='position: absolute;left: 33%; top: 1em;color: white;height: 35px;width: 100px;text-align: right;'></div><div id='redflagcarrierinfo' style='position: absolute;right: 33%; top: 1em;color: white;height: 35px;width: 100px;'></div>");
    
    
    
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
    
    
    SWAM.on ( 'gamePrep', function () {
        
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
                    var carrierhealth = Players.get(carrierid).health;
                    $('#blueflagcarrierinfo').html(carrierhealth);
                    $('#blueflagcarrierinfo').css({background: "'" + shipstylearray[carriership] + "'"});
                    console.log(carriername + " carrying blue flag with ship : " + Players.get(carrierid).type + " and health : " + Players.get(carrierid).health);
                    console.log(shipstylearray[carriership]);
                }
                else {
                    console.log("noone carrying blue flag");
                    $('#blueflagcarrierinfo').html('');
                        
                    clearInterval(checkblueflaginterval);
                }
                
            }
        
        
            function checkredcarry(){
                var carriername = $( "#redflag-name" ).justtext();
                if (carriername.length > 0){ 
                    
                    var carrierobj = Players.getByName(carriername); 
                    var carrierid = carrierobj['id'];
                    var carrierteam = carrierobj['team'];
                    var carriership = Players.get(carrierid).type;
                    var carrierhealth = Players.get(carrierid).health;
               
                    $('#redflagcarrierinfo').html(carrierhealth); 
                    $('#redflagcarrierinfo').css({background: "'" + shipstylearray[carriership] + "'"});
                    console.log(carriername + " carrying red flag with ship : " + Players.get(carrierid).type + " and health : " + Players.get(carrierid).health);
                    console.log(shipstylearray[carriership]);
                }
                else {
                    console.log("noone carrying red flag");
                    $('#redflagcarrierinfo').html('');
                    clearInterval(checkredflaginterval);
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