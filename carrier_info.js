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
                
                #sidebar #selectaircraft-1 {
    background-size: 70%;
            
    
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
                        
                        console.log(carriername + " carrying blue flag with ship : " + Players.get(carrierid).type + " and health : " + Players.get(carrierid).health);
                    }
                    else {
                        console.log("noone carrying red flag");
                        clearInterval(checkcarryinterval);
                    }
                    
                }
                else {
                    var carriername = $( "#blueflag-name" ).justtext();
                    
                    if (carriername.length > 0){ 
                        carrierobj = Players.getByName(carriername); 
                        carrierid = carrierobj['id'];
                        
                        
                        console.log(carriername + " carrying blue flag with ship : " + Players.get(carrierid).type + " and health : " + Players.get(carrierid).health);
                    }
                    else {
                        console.log("noone carrying blue flag");
                        
                        
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