// ------------------------------------------------------------------------
//   Carrier Info for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init FancyChat');
        initStyle ();
        initEvents ();
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
    
    $('#gamespecific').insertBefore("<div id='blueflagcarrierinfo' style='position: absolute;left: 33%; top: 1em;color: white;height: 35px;width: 100px;text-align: right;'></div>");
    
    $('#gamespecific').insertAfter("<div id='redflagcarrierinfo' style='position: absolute;right: 33%; top: 1em;color: white;height: 35px;width: 100px;'></div>");
    
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
    
    shipstylearray = [ship1bg, ship2bg, ship3bg, ship4bg, ship5bg]
    
    
    SWAM.on ( 'gamePrep', function () {
        
    });
    
    
    function onFlagEvent ( event, team, verb ) {
        
            var carriername = '';
        
            if ( team === 1) {
                carriername = $( "#redflag-name" ).justtext();
            }
            else {
                carriername = $( "#blueflag-name" ).justtext();
            }
                
                
            
    
            if (carriername.length > 0){ 
                
                var carrierobj = Players.getByName(carriername); 
                var carrierid = carrierobj['id'];
                var carrierteam = carrierobj['team'];
            }
            
            
            // check if still beeing carried (no drop event...)
            var checkcarryinterval = setInterval(checkcarry, 1000);
            function checkcarry(){
                if (carrierteam == 1){
                    var carriername = $( "#redflag-name" ).justtext();
                    
                    if (carriername.length > 0){ 
                        carrierobj = Players.getByName(carriername); 
                        carrierid = carrierobj['id'];
                        $('#redflagcarrierinfo').html();
                        
                        
                        $('#redflagcarrierinfo').html(Players.get(carrierid).health);    $('#redflagcarrierinfo').css(shipstylearray[Players.get(carrierid).type]);
                        //console.log(carriername + " carrying blue flag with ship : " + Players.get(carrierid).type + " and health : " + Players.get(carrierid).health);
                    }
                    else {
                        console.log("noone carrying red flag");
                        $('#redflagcarrierinfo').html();
                        clearInterval(checkcarryinterval);
                    }
                    
                }
                else {
                    var carriername = $( "#blueflag-name" ).justtext();
                    
                    if (carriername.length > 0){ 
                        carrierobj = Players.getByName(carriername); 
                        carrierid = carrierobj['id'];
                        
                        $('#blueflagcarrierinfo').html(Players.get(carrierid).health); $('#blueflagcarrierinfo').css(shipstylearray[Players.get(carrierid).type]);
                        //console.log(carriername + " carrying blue flag with ship : " + Players.get(carrierid).type + " and health : " + Players.get(carrierid).health);
                    }
                    else {
                        console.log("noone carrying blue flag");
                        $('#blueflagcarrierinfo').html();
                        
                        clearInterval(checkcarryinterval);
                    }
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