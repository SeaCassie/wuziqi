$(function () {
    let box=$(".box")
    let write={},black={};
    let blank={}
    for (let i=0;i<15;i++){
        for (let j=0;j<15;j++){
            $("<div>").addClass("chess").appendTo(box).attr("id",i+"_"+j);
            blank[i+"_"+j]=true;
        }
    }


    box.on("click",".chess",function () {

        if ($(this).hasClass("write")||$(this).hasClass("black")) {
            return;
        }
        let coode=$(this).attr("id");
        let flag=true;
        if (flag){
            $(this).css({backgroundColor:"#ffffff"}).addClass("write");
            write[coode]=true;
            delete blank[coode];
            // console.log(blank)
            if(check(write,coode)==5){
                setTimeout(alert("白方获胜"),1000);
                box.off("click")
            }
            AIfn(coode);
        }

    })

function AIfn(coode) {
        if ($(".black").length==0){
            let [i,j]=coode.split("_");
            let id=i+"_"+(j*1+1);
            let arr1=$(".chess").filter(function (index,value) {
                return value.id==id;
            });
            arr1.css("backgroundColor","#000000").addClass("black")
            black[id]=true;
            delete blank[id];
        }else{
        console.log("123")
        let blanksore=0;
        let pos1="";
        let fangshou=0;
        let pos2="";
        for (let i in blank){
            let num=check(black,i);
            if (num>blanksore){
                blanksore=num;
                pos1=i;
            }
            let num1=check(write,i);
            if (num1>fangshou){
                fangshou=num1;
                pos2=i;
             }
            }


        if (blanksore>=fangshou){
            let arr=$(".chess").filter(function (index,value) {
                return value.id==pos1;
            });
            console.log(arr);
            arr.css("backgroundColor","#000000").addClass("black").removeClass("blank");
            black[pos1]=true;
            delete blank[pos1];
            if(check(black,pos1)==5){
                setTimeout(alert("黑方获胜"),1000);
                box.off("click")
            }
            } else{
            let arr=$(".chess").filter(function (index,value) {
                return value.id==pos2;
            });
            arr.css("backgroundColor","#000000").addClass("black").removeClass("blank");
            black[pos2]=true;
            delete blank[pos2];
             }
        }

    }








    function check(obj,id) {
        // console.log(obj, id);
        let [x,y]=id.split("_");
        // console.log(j,k)
        let i=x*1,j=y*1;

        let sp=1,cz=1,yx=1,zx=1;
        while(obj[i+"_"+(++j)]){
            sp++;
        }
        j=y*1;
        while(obj[i+"_"+(--j)]){
            sp++;
        }

        j=y*1;
        // console.log("水平"+sp);
        while(obj[(++i)+"_"+j]){
            cz++;
        }
        i=x*1;
        while(obj[--i+"_"+j]){
            cz++;
        }
        i=x*1;
        // console.log("垂直"+cz)
        while(obj[(--i)+"_"+(--j)]){
            zx++;
        }
        i=x*1;
        j=y*1;
        while(obj[(++i)+"_"+(++j)]){
            zx++;
        }
        i=x*1;
        j=y*1;
        // console.log("左斜"+zx);
        while(obj[(--i)+"_"+(++j)]){
            yx++;
        }
        i=x*1;
        j=y*1;
        while(obj[(++i)+"_"+(--j)]){
            yx++;
        }
        i=x*1;
        j=y*1;
            // console.log("右斜"+yx)

        let num=Math.max(sp,zx,cz,yx)
        // console.log(num);
        return num;

    }




})