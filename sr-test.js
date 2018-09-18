// ------------------------------------------------------------------------
//   Stay Alive for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init SR');
        // initEvents ();
        
    }

    SWAM.on ( 'gameLoaded', init );
    
    
    
    
function smartrotate(targetangle,donext){ 
    goonornot = getgoon();
    if ((goonornot == true) && (targetangle !== 0)){
        
        rot = Players.getMe().rot;

        // onedeg = 360 / 6250000000000000;
        onedeg = (6283185307180000 / 360) / 1000000000000000;
        
        rotint = rot * 1000000000000000;
        // rotdeg = onedeg * rotint;
        rotdeg = rot / onedeg;

        targetangleint = targetangle * 1000000000000000;
        targetangledeg = onedeg * targetangleint;

        targetangledegtoamrot = targetangle * onedeg;
        
        console.log("rotdeg = " + rotdeg + " targetangledeg = " + targetangle);
        console.log("dif " + (rotdeg - targetangle) + "," + (targetangle - rotdeg))
        toturn = '';
        
        if (rotdeg > 180){

            if (targetangle > 180){ 

                 if (targetangle > rotdeg){

                        toturn = 'RIGHT';


                 }
                 else {
                    if (((360 - targetangle) + rotdeg) > (targetangle - rotdeg)){
                        toturn = 'RIGHT';
                    }

                    toturn = 'LEFT';

                 }

            }
            else if (targetangle < 180){ 
                 console.log("targ < 180")   
                 if ((rotdeg - targetangle) < ((360 - rotdeg) + targetangle)){
                    console.log((rotdeg - targetangle) + " < " + ((360 - rotdeg) + targetangle))
                    toturn = 'LEFT';
                 }
                 else {

                    toturn = 'RIGHT';

                 }

            }
            else if (targetangle == 180){
                
                toturn = 'LEFT';
            
            }

        }
        else if ((rotdeg < 180) && (rotdeg !== 0)){

            if (targetangle > 180){ 



                        if (((360 - targetangle) + rotdeg) < (targetangle - rotdeg)){

                            toturn = 'LEFT';
                        }
                        else {

                            toturn = 'RIGHT';

                        }



            } 
            else if (targetangle < 180){ 
                if (targetangle < rotdeg){    
                    toturn = 'LEFT';
                }
                else if (targetangle > rotdeg){
                    toturn = 'RIGHT';
                }

             }
            else if (targetangle == 180){
                toturn = 'RIGHT';
            }

        }
        else if (rotdeg == 180) {
            
            if (targetangle > 180){ 
                toturn = 'RIGHT';
            }
            else if (targetangle < 180){
                toturn = 'LEFT';    
            }
            
        }
        else if (rotdeg == 0) {
           if (targetangle > 180){ 
                toturn = 'LEFT';
            }
            else if (targetangle < 180){
                toturn = 'RIGHT';    
            } 
            
        }




        if (toturn){
            
            console.log(Date.now() + " rot " + toturn + " " + targetangledegtoamrot )

            Network.sendKey(toturn,!0);

            function repeatMe(){ 
                precision = 0.05;
                donexttoggle = false;
                rot = Players.getMe().rot;
                console.log(rot);
                if (toturn == 'RIGHT'){
                    if((rot > targetangledegtoamrot) && (rot < (targetangledegtoamrot + precision))){
                        clearInterval(rotcheck);
                        Network.sendKey(toturn,!1);
                        $(this).dequeue();
                        console.log("stop rot =" + rot + " targetangle = " + targetangledegtoamrot + " toturn = " + toturn)

                        // call next
                        donextornot = getdonext();
                        if (donextornot == true){
                            $(this).delay(1000).queue(function() { smartrotate('6')});
                        }
                    }
                } else {
                    if((rot < targetangledegtoamrot) && (rot > (targetangledegtoamrot - precision))){
                        clearInterval(rotcheck);
                        Network.sendKey(toturn,!1);
                        $(this).dequeue();
                        console.log("stop rot =" + rot + " targetangle = " + targetangledegtoamrot + " toturn = " + toturn)

                        // call next
                        donextornot = getdonext();
                        if (donextornot == true){
                            $(this).delay(1000).queue(function() { smartrotate('6')});
                        }
                    }

                }
            }
            var rotcheck = setInterval(repeatMe, 10);
        }
    }
}

function getdonext(){

    donext = window.donext;
    return donext
}
    
function getgoon(){

    goon = window.goon;
    return goon
}  
     
// use :
window.goon = true;
window.donext = false;
// smartrotate('3');    
    
    
//SWAM.getClosestPlayer(Players.getMe().pos.x,Players.getMe().pos.y).pos.x    
function beaware(){ 
    var closestplayerid = SWAM.getClosestPlayer(Players.getMe().pos.x,Players.getMe().pos.y).id;
    //var targetplayerid = closestplayerid;
    var targetplayerid = 4;
    
    console.log("be aware " + targetplayerid + " formula =" + "Math.atan2(" + Players.get(targetplayerid).pos.y + " - " + Players.getMe().pos.y + "(=" + (Players.get(targetplayerid).pos.y - Players.getMe().pos.y) + "), " + Players.get(targetplayerid).pos.x + " - " + Players.getMe().pos.x + "( =" + (Players.get(targetplayerid).pos.x - Players.getMe().pos.x) + ") * 360 / Math.PI");
    var p1 = {
        x: Players.getMe().pos.x,
        y: Players.getMe().pos.y
    };

    var p2 = {
        x: Players.get(targetplayerid).pos.x,
        y: Players.get(targetplayerid).pos.y
    };

    // angle in radians
    // var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

    // angle in degrees
    // var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI; 
    var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 360 / Math.PI; 

    // onedeg = 360 / 6250000000000000;

    // tangle = angleDeg * onedeg; 
    // tangle = Math.abs(tangle);
    // tangle = tangle.toFixed(2);
    
    var tangle = Math.abs(angleDeg);
    
    console.log("be aware tangle abs " + tangle + " (angleDeg) " + angleDeg);
    //window.donext = false;
    if (tangle !== 0){
        smartrotate(tangle);   
    }

}
    
var awarecheck = setInterval(beaware, 10000); 
    
    
    
clearInterval(beaware);    
    
--------
    
    
  Players.getMe().pos; 
    
//$( "#scoreboard .line" ).attr('player-id');    
gameplayers = []; 
gameplayers = [Players.getIDs()];   
var data = {};    
gameplayers.push(Players.getIDs() );
var gameplayers = Players.getIDs();
var gameplayersarray = gameplayers.split(',');      
    
    
var gameplayers = Players.getIDs();    
Object.keys(gameplayers).each(function(key, i) {
  console.log('player')

});    
    
------
    
playas = [];
points = [];
var data = {};
plid = game.myID;
data.playerid = plid;
data.playerposx = Players.getMe().pos.x; 
data.playerposy = Players.getMe().pos.y;
playas.push(data);
    
var data = {};
data.x = Players.getMe().pos.x;
data.y = Players.getMe().pos.y;    
points.push(data);
    
    
   
$( "#scorecontainer .item" ).each(function( index ) {
// Players.getIDs().each(function( index ) {
    console.log( index + ": " + $( this ) );
    var data = {};
    plid = $( this ).attr('player-id');
    if ((plid !== game.myID) && (plid !== 'undefined')){
        data.playerid = plid;
        data.playerposx = Players.get(data.playerid).pos.x;
        data.playerposy = Players.get(data.playerid).pos.y;
        playas.push(data);
    }
        
});  
   


$.each(playas, function (index, value) {
    var data = {};
    data.x = playas[index].playerposx;
    data.y = playas[index].playerposy;
    points.push(data);
});
    
    
function d(point) {
  return Math.pow(point.x, 2) + Math.pow(point.y, 2);
}

var closest = points.slice(1).reduce(function(min, p) {
  if (d(p) < min.d) min.point = p;
  return min;
}, {point: points[0], d:d(points[0])}).point;

closest;    
    
    /* REGISTER */

    SWAM.registerExtension ({
        name: 'SR',
        id: 'SR',
        description: '',
        version: '1.0.0',
        author: 'xplay'
    });
    
}();