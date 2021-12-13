import {svg} from "./grid.js";
import {graphNodes} from "./index.js";
import GraphNode from "./nodes.js";
import { Tooltip } from "./grid.js";
export default class GraphEdges{
    constructor(id,source,target,weight){
        this.id=id;
        this.source=source;
        this.target=target;
        this.weight=weight;
    }

    getId(){
        return this.id;
    }
    getSource(){
        return this.source;
    }
    getTarget(){
        return this.target;
    }
    getWeight(){
        return this.weight;
    }

    mouseover(d){
        d3.select(this).attr('stroke','yellow').attr('stroke-width',5);
    }

    mouseleave(d){
        d3.select(this).attr('stroke','steelblue').attr('stroke-width',2.5);
    }
    PlotEdge(){
        var sourceX;
        var sourceY;
        var targetX;
        var targetY;
        for(var i=0;i<graphNodes.length;i++){

            if(graphNodes[i].GetId()==this.source){
                sourceX=graphNodes[i].GetX();
                sourceY=graphNodes[i].GetY();
            }
            if(graphNodes[i].GetId()==this.target){
                targetX=graphNodes[i].GetX();
                targetY=graphNodes[i].GetY();
            }
        }
            
        
        svg.append('line').attr('x1', sourceX).attr('y1', sourceY).attr('x2',targetX).attr('y2', targetY).attr('stroke', 'steelblue').attr('stroke-width',2.5).attr('id',"edge"+this.id).on("mouseover",this.mouseover).on("mouseleave",this.mouseleave);
        svg.append('text').attr('x', (sourceX+targetX)/2).attr('y', (sourceY+targetY)/2).style("font-size", 20).attr('fill','#D0dbe6').text(this.weight).attr('id','weights').attr('class','weights');
        

    }

    
}