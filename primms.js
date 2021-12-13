import GraphNode from "./nodes.js";
import GraphEdges from "./edges.js";
import {svg} from "./grid.js";
import { Tooltip } from "./grid.js";
export let graphNodes=[];
let graphEdges=[];
var showWeights=true;
fetch("./data.json")
.then(response => {
   return response.json();
})
.then(function(data){
  
  for(var key of Object.keys(data["nodes"])){
    var id=data["nodes"][key].id;
    var x=data["nodes"][key].x;
    var y=data["nodes"][key].y;
    graphNodes.push(new GraphNode(id,x,y));
    graphNodes[key].PlotNode();
    
  }
  
  for(var key of Object.keys(data["edges"])){
    var id=data["edges"][key].id;
    var source=data["edges"][key].source;
    var target=data["edges"][key].target;
    var weight=data["edges"][key].weight;
    graphEdges.push(new GraphEdges(id,source,target,weight));
    graphEdges[key].PlotEdge();
  }

  
  
  document.getElementById("showHide").addEventListener("click",()=>{
    showWeights=!showWeights;
    
    if(showWeights){
        d3.selectAll("text").style("opacity",1)
        document.getElementById("showHide").innerHTML="Hide Weights";
        
    }
    else{
        d3.selectAll("text").style("opacity",0)
        document.getElementById("showHide").innerHTML="Show Weights";
    }
  });

  Primms();

  
});

 async function Primms(){
    var visited=[];
    var slow=2000;
    visited.push(1);
    var source=[];
    var target=[];
    var cost=[];
    var currentNode=1;
    var shortestEdgeId;
    var targetNode;
    var minCost;
    var covered=[];
    animateNode(1);
    
   
    while(!AllIncluded(visited)){


        for(var j=0;j<visited.length;j++){
            console.log("Visited array"+visited[j]);
            for(var i=0;i<graphEdges.length;i++){
                if(graphEdges[i].getSource()==visited[j] && visited.indexOf(graphEdges[i].getTarget()==-1)){
                    source.push(graphEdges[i].getSource());
                    target.push(graphEdges[i].getTarget());
                    cost.push(graphEdges[i].getWeight());
                    console.log("source: "+graphEdges[i].getSource());
                    console.log("target:"+graphEdges[i].getTarget());
                    console.log("cost:"+graphEdges[i].getWeight());
                }
            }
        }
       
        var min=cost[0];
        var minIndex=0;
        
        for(var i=0;i<cost.length;i++){
            if(cost[i]<min){
                min=cost[i];
                minIndex=i;
                
            }

        }

       
        
        

        for(var i=0;i<graphEdges.length;i++){
            if(graphEdges[i].getSource()==source[minIndex] && graphEdges[i].getTarget()==target[minIndex]){
                shortestEdgeId=graphEdges[i].getId();
                currentNode=graphEdges[i].getSource();
                targetNode=graphEdges[i].getTarget();
                visited.push(targetNode);
                console.log("Visited");
                console.log("vis source: "+currentNode);
                console.log("vis target"+targetNode);
                console.log("vis cost"+min);
            }
        }

        await new Promise(r => setTimeout(r, slow));
        coverEdge(shortestEdgeId);
        resetNode(currentNode);
        animateNode(targetNode);
        
    }

        
        
        
    
    
}

function notIn(id,mstSet){
    if(mstSet.indexOf(id)==-1){
        return true;
    }
}

function coverEdge(id){
    d3.select("#edge"+id).attr('stroke','green').attr('stroke-width',5);
}

async function animateNode(id){
    for(var i=0;i<10;i++){
        await new Promise(r => setTimeout(r, 50));
        d3.select("#node"+id).attr("r",10+i).attr("stroke","white").attr('stroke-width',1).attr('fill','yellow');
    }
}

async function resetNode(id){
    for(var i=0;i<10;i++){
        await new Promise(r => setTimeout(r, 50));
        d3.select("#node"+id).attr("r",20-i).attr("stroke","green").attr('stroke-width',2).attr('fill','yellow');
    }
}






function AllIncluded(mstSet){
    for(var i=0;i<graphNodes.length;i++){
        if(mstSet.indexOf(graphNodes[i].GetId())==-1){
            return false;
        }
    }
    return true;
}











       
        

        

       
        
